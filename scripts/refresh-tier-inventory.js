"use strict";

// Regenerates docs/tier-inventory.md - every count this repo's documentation states
// about its own data.
//
//     node scripts/refresh-tier-inventory.js
//
// Run it after any change to pa/ai_queller/** that adds or removes a file, a build
// entry, a template or a personality tag.
//
// Why generated rather than written by hand: CLAUDE.md's per-tier table was hand
// maintained and had already drifted - it recorded 42/43/42/44/45/46 platoon templates
// where the tree held 44/45/44/46/47/48. Nothing recomputed it, so nothing caught it.
// The rule that follows is that hand-written prose in this repo states no counts at all;
// it links here.
//
// Unlike refresh-engine-vocabulary.js this needs only the repo - no PA install, no
// server.exe - so it runs anywhere, including CI. That is why it is a separate script
// with its own npm entry rather than another output of the vocabulary refresh.

const fs = require("node:fs");
const path = require("node:path");
const prettier = require("prettier");
const {
  REPO_ROOT,
  byName,
  declaredPersonalityTags,
  loadTiers,
} = require("./lib/ai-data.js");
const { byTier, renderMarkdown } = require("./lib/tier-inventory-reference.js");

const MARKDOWN_OUTPUT = path.join(REPO_ROOT, "docs", "tier-inventory.md");

// Which build-list consumer a file belongs to, from its path. The engine decides this by
// which directory it scanned the file out of, so the top-level directory name is the
// whole answer; everything below it is Queller's own filing.
const CONSUMERS = ["fabber_builds", "factory_builds", "platoon_builds"];

const consumerOf = (relative) =>
  CONSUMERS.find((c) => relative.startsWith(c + "/")) || null;

const directoryOf = (relative) => {
  const parts = relative.split("/");
  return parts.length === 1 ? "(tier root)" : parts.slice(0, -1).join("/");
};

// Sorts by count descending then name, so the table reads as "what this data leans on"
// and stays stable between runs.
function byCountThenName(rows) {
  return rows.sort((a, b) => b.total - a.total || (a.label < b.label ? -1 : 1));
}

// Collects a per-tier count keyed by label into the shape the renderer wants.
function tally(tiers, visit) {
  const rows = new Map();
  for (const tier of tiers) {
    const bump = (label, n = 1) => {
      if (!rows.has(label)) {
        rows.set(label, { label, counts: {}, total: 0, extra: {} });
      }
      const row = rows.get(label);
      row.counts[tier.name] = (row.counts[tier.name] || 0) + n;
      row.total += n;
      return row;
    };
    visit(tier, bump);
  }
  return byCountThenName([...rows.values()]);
}

// Who declares a tag, for the inventory's `Declared by` column. Every personality
// declaring it is the case worth compressing; anything else is short enough to list, and
// "nothing" is the case validate:refs fails on.
function describeDeclarers(declarers) {
  if (!declarers.length) {
    return "**nothing**";
  }
  if (declarers.length > 3) {
    return `${declarers.length} personalities`;
  }
  return declarers.map((d) => "`" + d + "`").join(", ");
}

function collect(tiers) {
  const names = tiers.map((t) => t.name);

  const summary = {};
  for (const tier of tiers) {
    summary[tier.name] = {
      files: tier.files.length,
      builds: tier.builds.length,
      templates: tier.templates.size,
      unitMap: tier.unitMap.size,
      // Rendered rather than counted - the whole point of ai_config.json is its one
      // value, and "3000" is more use in the table than "1 key".
      config: tier.config ? JSON.stringify(tier.config) : "absent",
    };
  }

  const directories = tally(tiers, (tier, bump) => {
    for (const file of tier.files) {
      bump(directoryOf(file.file));
    }
  });

  const consumers = tally(tiers, (tier, bump) => {
    for (const build of tier.builds) {
      const consumer = consumerOf(build.file);
      if (consumer) {
        bump(consumer);
      }
    }
  });

  // Presence matrix, restricted to files that are not in every tier. A file every tier
  // ships is not evidence of divergence and would bury the rows that are.
  const presence = new Map();
  for (const tier of tiers) {
    for (const file of tier.files) {
      if (!presence.has(file.file)) {
        presence.set(file.file, {});
      }
      presence.get(file.file)[tier.name] = true;
    }
  }
  const divergence = [...presence.entries()]
    .filter(([, present]) => Object.keys(present).length !== tiers.length)
    .map(([label, present]) => ({ label, present }))
    .sort((a, b) => (a.label < b.label ? -1 : 1));

  // Byte-identical is too strong a claim to make from the parsed JSON alone, and too
  // weak from the raw text - trailing-newline or CRLF differences would show as drift
  // that git never sees. Compare canonicalised JSON: same data, formatting-independent.
  const canonical = (json) => JSON.stringify(json);
  const identical = [...presence.entries()]
    .filter(([, present]) => Object.keys(present).length === tiers.length)
    .map(([file]) => file)
    .filter((file) => {
      const values = tiers.map((tier) =>
        canonical(tier.files.find((f) => f.file === file).json)
      );
      return values.every((v) => v === values[0]);
    })
    .sort(byName);

  const taskTypes = tally(tiers, (tier, bump) => {
    for (const build of tier.builds) {
      if (build.entry.task_type) {
        bump(build.entry.task_type);
      }
    }
  });

  const squads = tally(tiers, (tier, bump) => {
    for (const [, { definition }] of tier.templates) {
      for (const slot of Array.isArray(definition.units)
        ? definition.units
        : []) {
        if (slot.squad) {
          bump(slot.squad);
        }
      }
    }
  });

  // Tag uses, split by polarity. `boolean` omitted means true - the engine's default for
  // a predicate test - so only an explicit `false` counts as a negative test.
  const polarity = new Map();
  const tags = tally(tiers, (tier, bump) => {
    for (const build of tier.builds) {
      for (const group of build.entry.build_conditions || []) {
        if (!Array.isArray(group)) {
          continue;
        }
        for (const condition of group) {
          if (
            condition.test_type !== "HasPersonalityTag" ||
            !condition.string0
          ) {
            continue;
          }
          bump(condition.string0);
          if (!polarity.has(condition.string0)) {
            polarity.set(condition.string0, { positive: 0, negative: 0 });
          }
          polarity.get(condition.string0)[
            condition.boolean === false ? "negative" : "positive"
          ]++;
        }
      }
    }
  });

  const declaredBy = new Map();
  for (const [personality, personalityTags] of declaredPersonalityTags()) {
    for (const tag of personalityTags) {
      if (!declaredBy.has(tag)) {
        declaredBy.set(tag, []);
      }
      declaredBy.get(tag).push(personality);
    }
  }
  for (const row of tags) {
    row.declaredBy = describeDeclarers(declaredBy.get(row.label) || []);
    row.positive = polarity.get(row.label).positive;
    row.negative = polarity.get(row.label).negative;
  }

  // A template nothing names. `to_build` spans two namespaces - a platoon template for a
  // platoon-forming task, a unit map key for AreaBuild - so matching against the tier's
  // own template names is what decides it, not the field's presence.
  const orphans = {};
  for (const tier of tiers) {
    const referenced = new Set(
      tier.builds
        .map((b) => b.entry.to_build)
        .filter((name) => name && tier.templates.has(name))
    );
    orphans[tier.name] = {
      defined: tier.templates.size,
      orphans: [...tier.templates.keys()]
        .filter((n) => !referenced.has(n))
        .sort(byName),
    };
  }

  return {
    tiers: names,
    summary,
    directories,
    consumers,
    divergence,
    identical,
    taskTypes,
    squads,
    tags,
    orphans,
  };
}

// Applies the repo's own Prettier settings, so regenerating never lands the repo in a
// state where `npm run format:check` fails. Same reasoning, same helper shape, as
// refresh-engine-vocabulary.js.
function format(text, file, parser) {
  return prettier
    .resolveConfig(file)
    .then((config) => prettier.format(text, { ...config, parser }));
}

// The document as it should be, given the data on disk right now. Exported so
// `validate:docs` can rebuild it and compare rather than reimplementing any of this -
// the freshness check and the generator have to agree by construction, or the check is
// worse than useless.
async function generate() {
  const tiers = loadTiers().sort((a, b) => byTier(a.name, b.name));
  if (!tiers.length) {
    throw new Error(
      "no tiers found under pa/ai_queller - refusing to write an empty inventory"
    );
  }
  const parseErrors = tiers.flatMap((tier) =>
    tier.parseErrors.map((e) => `${tier.name}/${e.file}: ${e.message}`)
  );
  if (parseErrors.length) {
    // Emitting an inventory that silently omits unparseable files would understate every
    // count in it. Fail instead, the way the vocabulary extraction fails on a bad anchor.
    throw new Error(
      `${parseErrors.length} file(s) failed to parse, so any count would be ` +
        `wrong:\n  ${parseErrors.join("\n  ")}`
    );
  }

  const data = collect(tiers);
  const markdown = await format(
    renderMarkdown(data),
    MARKDOWN_OUTPUT,
    "markdown"
  );
  return { data, markdown, tiers };
}

async function main() {
  const { data, markdown, tiers } = await generate();
  fs.mkdirSync(path.dirname(MARKDOWN_OUTPUT), { recursive: true });
  fs.writeFileSync(MARKDOWN_OUTPUT, markdown);

  console.log(`Wrote ${path.relative(process.cwd(), MARKDOWN_OUTPUT)}`);
  for (const tier of tiers) {
    const s = data.summary[tier.name];
    console.log(
      `  ${tier.name.padEnd(11)} ${String(s.files).padStart(3)} files, ` +
        `${String(s.builds).padStart(3)} build entries, ` +
        `${String(s.templates).padStart(3)} templates`
    );
  }
  console.log(
    `  ${data.divergence.length} file(s) not present in every tier, ` +
      `${data.identical.length} identical across all tiers`
  );
}

module.exports = { MARKDOWN_OUTPUT, generate };

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
