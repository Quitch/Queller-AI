"use strict";

// Regenerates scripts/lib/engine-vocabulary.json - the whitelists scripts/validate/*
// check the AI data's enum-valued fields against.
//
// Run this after a PA patch:
//     node scripts/refresh-engine-vocabulary.js ["<path to>\Planetary Annihilation Titans\media"]
//
// Why a snapshot rather than reading the game live: the validators have to run on a
// machine with no PA install (CI, a contributor who only has the repo). The snapshot is
// committed, the validators read it, and this script is the documented way to refresh it.
//
// Where the values come from, in order of authority:
//
//  1. `bin_x64/server.exe`. The engine's enum tables are laid out as runs of adjacent
//     NUL-terminated strings, each run bounded by a landmark this script anchors on -
//     the build-condition run, for instance, ends at "IsMainBase" and is immediately
//     followed by "BuildCondition: Unknown condition type: %s". Extracting the run gives
//     the enumeration the engine actually switches on.
//
//  2. The base game's own AI data (`pa/ai`, `pa_ex1/ai`). Needed because step 1
//     under-reports: the linker de-duplicates identical strings, so an enum member that
//     is spelled the same as a member of some *other* enum does not get its own copy in
//     the run. `task_type: "Nuke"` and `"Artillery"` and squad `"Artillery"` are all
//     missing from their runs for exactly this reason - they are shared with the
//     influence-type table - yet the stock AI uses all three, which settles it. Anything
//     the shipped base game does is by definition valid, so its values are unioned in
//     and recorded under `fromBaseDataOnly` so the gap stays visible.
//
//  3. DOCUMENTED below - a hand-maintained list for values that neither source yields.
//     Kept deliberately tiny; every entry carries its justification.
//
// The output records which values came from where, so a reviewer can audit the whitelist
// without re-running the extraction.

const fs = require("node:fs");
const path = require("node:path");
const { findBaseInstall, walk } = require("./lib/base-install.js");
const prettier = require("prettier");
const { renderMarkdown } = require("./lib/vocabulary-reference.js");

const REPO_ROOT = path.join(__dirname, "..");
const AI_ROOT = path.join(REPO_ROOT, "pa", "ai_queller");
const OUTPUT = path.join(__dirname, "lib", "engine-vocabulary.json");
const MARKDOWN_OUTPUT = path.join(REPO_ROOT, "docs", "engine-vocabulary.md");

// Values that are genuinely valid but appear in neither the binary runs nor the base
// game's own AI data. Each needs a reason - this list is where a wrong entry would hide.
const DOCUMENTED = {
  influence_type: {
    // Listed in the influence-type table on planetaryannihilation.com/ai/ and used 6
    // times by this repo. It is absent from the binary's influence run only because of
    // linker tail-merging: "CEconomy" sits immediately before that run, and a pointer
    // one byte into it yields exactly "Economy", so the enum entry shares storage with
    // a longer string instead of getting its own. The engine does diagnose a bad value
    // ("BuildCondition: Unknown influence type %s" is in the binary), so this is worth
    // re-confirming with --ai-log if it is ever in doubt.
    Economy: "docs + tail-merged in binary with CEconomy",
  },
  compare: {
    // Comparison operators are 1-2 characters, below the minimum length the string
    // scanner can distinguish from binary noise, so they cannot be recovered from the
    // executable at all. The base game uses <, <=, > and >=; == is used by this repo
    // and != is included for symmetry. The engine diagnoses a bad one
    // ("BuildCondition: Unknown comparison type: %s").
    "==": "engine diagnoses unknown operators; used by this repo",
    "!=": "symmetry with ==; unused today",
  },
};

// Each run is a contiguous slice of the extracted string list, [first .. last]
// inclusive. `after` is a string that must immediately follow the run - a cheap
// assertion that the layout has not shifted under a patch. If any anchor stops
// matching, this script fails loudly rather than emitting a truncated whitelist.
const RUNS = {
  test_type: {
    first: "PotentialEnergyEfficiency",
    last: "IsMainBase",
    after: "BuildCondition: Unknown condition type: %s",
  },
  task_type: { first: "None", last: "GiveUp", after: "Platoon::position" },
  squad: { first: "General", last: "Suicide", after: "None" },
  placement_and_sort: {
    first: "FromBaseCenter",
    last: "FromPerimeter",
    after: "Ally",
  },
  influence_type: {
    first: "Commander",
    last: "AntiPlanet",
    after: "platoon_templates",
  },
  world_layer: {
    first: "LandHorizontal",
    last: "AnyLayer",
    after: "WL_",
    prefix: "WL_",
  },
  alliance: { first: "Ally", last: "Enemy", after: "buffer" },
  build_spec_key: {
    first: "to_build",
    last: "build_conditions",
    after: "AIBuildSpecList: Invalid format in ",
  },
  condition_key: {
    first: "test_type",
    last: "boolean",
    after: "FromBaseCenter",
  },
  // One run covering `placement_rules` and both of its nested blocks - the engine keeps
  // the keys of `threat` and of a `unit_count_rules` element adjacent to the outer ones,
  // so they are checked as a single "known anywhere under placement_rules" set rather
  // than split by nesting level, which the layout gives no basis for.
  placement_key: {
    first: "buffer",
    last: "range",
    after: "AIPlacementSpec: Unit count rule range above max of: ",
  },
  template_unit_key: {
    first: "unit_types",
    last: "percent",
    after: "canSupportUnit",
  },
};

// Minimum run of printable ASCII treated as a string. 3 is low enough to catch short
// enum members ("Air", "Sub", "Nuke") and high enough to keep the noise manageable.
const MIN_STRING = 3;

function extractStrings(buffer) {
  const strings = [];
  let start = -1;
  for (let i = 0; i < buffer.length; i++) {
    const c = buffer[i];
    if (c >= 0x20 && c < 0x7f) {
      if (start < 0) {
        start = i;
      }
      continue;
    }
    if (start >= 0 && i - start >= MIN_STRING) {
      strings.push(buffer.toString("latin1", start, i));
    }
    start = -1;
  }
  return strings;
}

function extractRun(strings, name, spec) {
  const from = strings.indexOf(spec.first);
  if (from < 0) {
    throw new Error(
      `${name}: run start "${spec.first}" not found in server.exe - the layout has ` +
        `changed, re-anchor RUNS before trusting anything this script emits`
    );
  }
  const to = strings.indexOf(spec.last, from);
  if (to < 0) {
    throw new Error(
      `${name}: run end "${spec.last}" not found after "${spec.first}"`
    );
  }
  if (strings[to + 1] !== spec.after) {
    throw new Error(
      `${name}: expected "${spec.after}" immediately after "${spec.last}", found ` +
        `"${strings[to + 1]}" - the run has grown or moved`
    );
  }
  const values = strings.slice(from, to + 1);
  return spec.prefix ? values.map((v) => spec.prefix + v) : values;
}

const CATEGORY_KEYS = [
  "test_type",
  "task_type",
  "squad",
  "base_sort",
  "placement_type",
  "influence_type",
  "world_layer",
  "alliance",
  "compare",
  "build_spec_key",
  "condition_key",
  "placement_key",
  "template_unit_key",
];

// Tallies every vocabulary value an AI tree uses, and - for build conditions - which
// parameter keys each test_type is actually written with.
//
// Run over the base game's data it serves two purposes: the value set recovers enum
// members the binary scan missed (everything the shipped game does is valid by
// construction), and the counts go into the reference document. Run over this repo it
// is purely descriptive: which of the engine's vocabulary Queller actually reaches for.
function tallyTree(roots) {
  const counts = {};
  CATEGORY_KEYS.forEach((key) => {
    counts[key] = new Map();
  });
  const parameters = new Map();

  const bump = (map, value) => map.set(value, (map.get(value) || 0) + 1);
  const add = (category, value) => {
    if (value !== undefined && value !== null) {
      bump(counts[category], value);
    }
  };
  const addKeys = (category, object) => {
    if (object && typeof object === "object") {
      Object.keys(object).forEach((k) => bump(counts[category], k));
    }
  };
  const addLayer = (value) => {
    if (typeof value === "string" && value.startsWith("WL_")) {
      bump(counts.world_layer, value);
    }
  };

  const observePlacement = (rules) => {
    if (!rules) {
      return;
    }
    addKeys("placement_key", rules);
    add("placement_type", rules.placement_type);
    if (rules.threat) {
      addKeys("placement_key", rules.threat);
      add("influence_type", rules.threat.influence_type);
      add("compare", rules.threat.compare_type);
    }
    for (const rule of rules.unit_count_rules || []) {
      addKeys("placement_key", rule);
      add("alliance", rule.alliance);
      add("compare", rule.compare_type);
    }
  };

  const observeCondition = (condition) => {
    addKeys("condition_key", condition);
    add("test_type", condition.test_type);
    add("compare", condition.compare0);
    add("compare", condition.compare1);
    addLayer(condition.string0);
    addLayer(condition.string1);
    addLayer(condition.string2);
    // Which parameters this test_type is written with in practice. The engine's key
    // table says what a condition object *may* contain; this says what each condition
    // type actually does contain, which is the more useful thing to document.
    if (condition.test_type) {
      if (!parameters.has(condition.test_type)) {
        parameters.set(condition.test_type, new Set());
      }
      const seen = parameters.get(condition.test_type);
      Object.keys(condition).forEach((k) => {
        if (k !== "test_type") {
          seen.add(k);
        }
      });
    }
  };

  const observeBuild = (entry) => {
    addKeys("build_spec_key", entry);
    add("task_type", entry.task_type);
    add("base_sort", entry.base_sort);
    observePlacement(entry.placement_rules);
    for (const group of entry.build_conditions || []) {
      if (Array.isArray(group)) {
        group.forEach(observeCondition);
      }
    }
  };

  const observeTemplate = (template) => {
    if (!Array.isArray(template.units)) {
      return;
    }
    for (const unit of template.units) {
      addKeys("template_unit_key", unit);
      add("squad", unit.squad);
    }
  };

  for (const root of roots) {
    for (const file of walk(root)) {
      let json;
      try {
        json = JSON.parse(fs.readFileSync(file, "utf8"));
      } catch {
        continue;
      }
      (json.build_list || []).forEach(observeBuild);
      Object.values(json.platoon_templates || {}).forEach(observeTemplate);
    }
  }
  return { counts, parameters };
}

// Applies the repo's own Prettier settings to generated output, so a regenerated file
// never lands the repo in a state where `npm run format:check` fails. Prettier is
// already a dev dependency and this script is dev-only tooling, so the coupling costs
// nothing that is not already paid.
function format(text, file, parser) {
  return prettier
    .resolveConfig(file)
    .then((config) => prettier.format(text, { ...config, parser }));
}

// The merge step wants sets, not counts.
function valueSets(tally) {
  const sets = {};
  CATEGORY_KEYS.forEach((key) => {
    sets[key] = new Set(tally.counts[key].keys());
  });
  return sets;
}

// Plain codepoint order. Not localeCompare: the output is committed and diffed, so it
// has to sort identically on every contributor's machine regardless of locale.
function byText(a, b) {
  if (a < b) {
    return -1;
  }
  return a > b ? 1 : 0;
}

function merge(binaryValues, observedSet, documented) {
  const binary = new Set(binaryValues);
  const reasons = documented || {};
  const fromBaseDataOnly = [...observedSet]
    .filter((v) => !binary.has(v))
    .sort(byText);
  const documentedOnly = Object.keys(reasons)
    .filter((v) => !binary.has(v) && !observedSet.has(v))
    .sort(byText);
  return {
    values: [
      ...new Set([...binary, ...observedSet, ...Object.keys(reasons)]),
    ].sort(byText),
    fromBinary: [...binary].sort(byText),
    fromBaseDataOnly,
    documentedOnly,
    documentedReasons: reasons,
  };
}

async function main() {
  const mediaPath = findBaseInstall(process.argv[2]);
  if (!mediaPath) {
    console.error(
      "Could not find the base game. Pass its media folder as an argument:\n" +
        '    node scripts/refresh-engine-vocabulary.js "C:\\...\\Planetary Annihilation Titans\\media"'
    );
    process.exit(1);
  }
  const exe = path.join(path.dirname(mediaPath), "bin_x64", "server.exe");
  if (!fs.existsSync(exe)) {
    console.error(`No server.exe at ${exe}`);
    process.exit(1);
  }

  const strings = extractStrings(fs.readFileSync(exe));
  const runs = {};
  for (const [name, spec] of Object.entries(RUNS)) {
    runs[name] = extractRun(strings, name, spec);
  }

  // The binary keeps placement types and base-sort modes in one run; the two fields
  // draw from overlapping halves of it. Split by what the base game actually puts in
  // each field, and let anything else in the run be legal for either - the run as a
  // whole is the engine's vocabulary for "where does this go", and being stricter than
  // that would be guessing.
  const baseTally = tallyTree([
    path.join(mediaPath, "pa", "ai"),
    path.join(mediaPath, "pa_ex1", "ai"),
  ]);
  const modTally = tallyTree([AI_ROOT]);
  const observed = valueSets(baseTally);
  const placementRun = runs.placement_and_sort;

  const vocabulary = {
    test_type: merge(runs.test_type, observed.test_type, null),
    task_type: merge(runs.task_type, observed.task_type, null),
    squad: merge(runs.squad, observed.squad, null),
    base_sort: merge(placementRun, observed.base_sort, null),
    placement_type: merge(placementRun, observed.placement_type, null),
    influence_type: merge(
      runs.influence_type,
      observed.influence_type,
      DOCUMENTED.influence_type
    ),
    world_layer: merge(runs.world_layer, observed.world_layer, null),
    alliance: merge(runs.alliance, observed.alliance, null),
    compare: merge([], observed.compare, DOCUMENTED.compare),
    build_spec_key: merge(runs.build_spec_key, observed.build_spec_key, null),
    condition_key: merge(runs.condition_key, observed.condition_key, null),
    placement_key: merge(runs.placement_key, observed.placement_key, null),
    template_unit_key: merge(
      runs.template_unit_key,
      observed.template_unit_key,
      null
    ),
  };

  const output = {
    _comment:
      "Generated by scripts/refresh-engine-vocabulary.js - do not hand-edit. " +
      "`fromBaseDataOnly` are values the binary scan missed because the linker " +
      "de-duplicated them against an identically spelled member of another enum; " +
      "they are valid because the shipped base game uses them. `documentedOnly` are " +
      "values neither source yields - see DOCUMENTED in the generator for why each " +
      "is trusted.",
    generatedFrom: {
      server: path.basename(exe),
      strings: strings.length,
    },
    vocabulary,
  };

  // Both outputs go through Prettier before being written. JSON.stringify puts every
  // array element on its own line; Prettier keeps short arrays inline. Writing the
  // stringify form would leave two generated files that fail `npm run format:check`
  // the moment anyone regenerated them.
  fs.writeFileSync(
    OUTPUT,
    await format(JSON.stringify(output), OUTPUT, "json")
  );

  // The same whitelists as prose, for people rather than for the validator: what each
  // one governs, how heavily this repo uses each value, and what it means where that is
  // documented. See scripts/lib/vocabulary-reference.js for the curated half.
  const usage = {};
  for (const key of CATEGORY_KEYS) {
    usage[key] = {
      here: Object.fromEntries(modTally.counts[key]),
      base: Object.fromEntries(baseTally.counts[key]),
    };
  }
  const parameters = Object.fromEntries(
    [...modTally.parameters].map(([test, keys]) => [
      test,
      [...keys].sort(byText),
    ])
  );
  const markdown = renderMarkdown({
    vocabulary,
    usage,
    parameters,
    generatedFrom: output.generatedFrom,
  });
  fs.mkdirSync(path.dirname(MARKDOWN_OUTPUT), { recursive: true });
  fs.writeFileSync(
    MARKDOWN_OUTPUT,
    await format(markdown, MARKDOWN_OUTPUT, "markdown")
  );

  console.log(`Wrote ${path.relative(process.cwd(), OUTPUT)}`);
  console.log(`Wrote ${path.relative(process.cwd(), MARKDOWN_OUTPUT)}`);
  for (const [name, entry] of Object.entries(vocabulary)) {
    const extras = [];
    if (entry.fromBaseDataOnly.length) {
      extras.push(`+${entry.fromBaseDataOnly.length} from base data`);
    }
    if (entry.documentedOnly.length) {
      extras.push(`+${entry.documentedOnly.length} documented`);
    }
    console.log(
      `  ${name.padEnd(19)} ${String(entry.values.length).padStart(3)} values` +
        (extras.length ? `  (${extras.join(", ")})` : "")
    );
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
