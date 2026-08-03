"use strict";

// The curated half of docs/tier-inventory.md: section headings, the prose that explains
// what each table is for, and the tier ordering. The numbers themselves come from
// scripts/refresh-tier-inventory.js, which reads pa/ai_queller/** and calls
// renderMarkdown below.
//
// Same split, and for the same reason, as vocabulary-reference.js: prose belongs
// somewhere a human edits it, counts belong somewhere a script recomputes them. Nothing
// in here states a number.

// Difficulty order, not alphabetical - a reader compares adjacent tiers, and readdir
// gives bronze before casual. Anything not listed sorts after these, alphabetically, so
// a new tier appears rather than being dropped.
const TIER_ORDER = [
  "q_casual",
  "q_bronze",
  "q_silver",
  "q_gold",
  "q_platinum",
  "q_uber",
];

function byTier(a, b) {
  const ia = TIER_ORDER.indexOf(a);
  const ib = TIER_ORDER.indexOf(b);
  if (ia < 0 && ib < 0) {
    return a < b ? -1 : 1;
  }
  if (ia < 0) {
    return 1;
  }
  if (ib < 0) {
    return -1;
  }
  return ia - ib;
}

const code = (text) => "`" + text + "`";

// Prettier reflows markdown tables anyway, so cells only need to be pipe-safe.
const escape = (text) => String(text).replace(/\|/g, "\\|");

function table(header, rows) {
  return [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...rows.map((cells) => `| ${cells.map(escape).join(" | ")} |`),
    "",
  ];
}

// A count table keyed by some label, one column per tier. Used for task types, squads
// and tags, which are all "how heavily does each tier lean on this" questions.
function perTierTable(labelHeading, tiers, rows, extraColumns = []) {
  return table(
    [labelHeading, ...extraColumns.map((c) => c.heading), ...tiers],
    rows.map((row) => [
      code(row.label),
      ...extraColumns.map((c) => c.value(row)),
      ...tiers.map((tier) => row.counts[tier] || "-"),
    ])
  );
}

const SECTIONS = {
  intro: [
    "# Tier inventory",
    "",
    "What each Queller difficulty tier contains, how the tiers differ, and how heavily " +
      "each one uses the engine's vocabulary.",
    "",
    "**Generated - do not hand-edit.** Run `npm run refresh:inventory` to rebuild it. " +
      "Prose lives in `scripts/lib/tier-inventory-reference.js`; edit it there.",
    "",
    "This file is the only place in the repo that states a count of files, build " +
      "entries, templates or tag uses. Prose elsewhere - `CLAUDE.md`, " +
      "`docs/architecture.md`, `docs/ai-engine.md` - links here instead of repeating a " +
      "number, because a number in hand-written text goes stale on the next data edit " +
      "and nothing catches it.",
    "",
    "For what the values in these tables *mean*, see " +
      "[engine vocabulary](engine-vocabulary.md). For why the data is shaped this way, " +
      "see [architecture](architecture.md).",
    "",
  ],
  summary: [
    "## Tier summary",
    "",
    "One row per tier. `Build entries` counts every item across `fabber_builds/`, " +
      "`factory_builds/` and `platoon_builds/`; `Templates` counts platoon templates " +
      "defined, not templates used.",
    "",
  ],
  filesByDirectory: [
    "## Files by directory",
    "",
    "The engine scans an `ai_path` recursively and merges every `.json` it finds, so " +
      "the subdirectory names below are a Queller organisational convention that the " +
      "loader flattens away - `mla/`, `legion/` and `subpersonalities/` mean nothing to " +
      "the engine. They matter to a human deciding where an edit goes.",
    "",
  ],
  entriesByConsumer: [
    "## Build entries by consumer",
    "",
    "Which of the three build-list consumers each tier's entries belong to. All three " +
      "share one parser and one item schema; what differs is who executes the item.",
    "",
  ],
  divergence: [
    "## Where the tiers diverge",
    "",
    "Tiers are independent copies with no inheritance, and they have genuinely drifted " +
      "apart. Only files that are *not* present in every tier are listed - a file " +
      "shipped by all of them says nothing about divergence.",
    "",
    "A behaviour change usually has to be applied to each tier separately. This table " +
      "is where to check whether the file you are about to edit even exists in the " +
      "other five.",
    "",
  ],
  identical: [
    "## Files identical across every tier",
    "",
    "Same relative path, byte-identical JSON, in all tiers. Nothing keeps these in " +
      "step - `validate:refs` asserts it for `unit_maps/`, and the rest is convention - " +
      "so a file dropping off this list is either a deliberate divergence or a mistake.",
    "",
  ],
  taskTypes: [
    "## Task types in use",
    "",
    "Set on a build item to say what the resulting platoon does, or - on a fabber " +
      "item - what kind of construction task it is. See " +
      "[engine vocabulary](engine-vocabulary.md#task-types) for the full legal set, " +
      "including the ones nothing here uses.",
    "",
  ],
  squads: [
    "## Squad roles in use",
    "",
    "The role a slot's units take inside a platoon. See " +
      "[engine vocabulary](engine-vocabulary.md#squad-types) for the legal set.",
    "",
  ],
  tags: [
    "## Personality tags",
    "",
    "The subpersonality mechanism: one `ai_path` serves many personalities, and " +
      "`HasPersonalityTag` conditions select between them.",
    "",
    "**Polarity is the thing to read here.** A tag tested with `boolean: false` " +
      "*excludes* a subpersonality from a build; tested with `boolean: true` it enables " +
      "one. Because most tests are negative, a tag that no personality declares does " +
      "not disable anything - it makes every negative test of it unconditionally true. " +
      "`Declared by` is read from `ui/mods/com.pa.quitch.qquellerai/new_game.js`; a tag " +
      "with no declaring personality is one `validate:refs` will fail on.",
    "",
  ],
  orphanTemplates: [
    "## Templates defined but never built",
    "",
    "A platoon template that no `platoon_builds` entry names. Normal, not a defect: " +
      "the templates file is a superset each tier draws from, and the lower tiers draw " +
      "less from it because they field fewer distinct armies. Listed so that a template " +
      "which stopped being referenced by accident is visible rather than invisible.",
    "",
  ],
};

function renderMarkdown(data) {
  const tiers = data.tiers;
  const lines = [...SECTIONS.intro];

  lines.push(...SECTIONS.summary);
  lines.push(
    ...table(
      [
        "Tier",
        "Files",
        "Build entries",
        "Templates",
        "Unit map keys",
        "Config",
      ],
      tiers.map((tier) => [
        code(tier),
        data.summary[tier].files,
        data.summary[tier].builds,
        data.summary[tier].templates,
        data.summary[tier].unitMap,
        data.summary[tier].config,
      ])
    )
  );

  lines.push(...SECTIONS.filesByDirectory);
  lines.push(
    ...table(
      ["Directory", ...tiers],
      data.directories.map((row) => [
        code(row.label),
        ...tiers.map((tier) => row.counts[tier] || "-"),
      ])
    )
  );

  lines.push(...SECTIONS.entriesByConsumer);
  lines.push(
    ...table(
      ["Consumer", ...tiers],
      data.consumers.map((row) => [
        code(row.label),
        ...tiers.map((tier) => row.counts[tier] || "-"),
      ])
    )
  );

  lines.push(...SECTIONS.divergence);
  lines.push(
    ...table(
      ["File", ...tiers],
      data.divergence.map((row) => [
        code(row.label),
        ...tiers.map((tier) => (row.present[tier] ? "yes" : "-")),
      ])
    )
  );

  lines.push(...SECTIONS.identical);
  lines.push(...data.identical.map((file) => `- ${code(file)}`), "");

  lines.push(...SECTIONS.taskTypes);
  lines.push(...perTierTable("Task type", tiers, data.taskTypes));

  lines.push(...SECTIONS.squads);
  lines.push(...perTierTable("Squad", tiers, data.squads));

  lines.push(...SECTIONS.tags);
  lines.push(
    ...perTierTable("Tag", tiers, data.tags, [
      { heading: "Declared by", value: (row) => row.declaredBy },
      { heading: "Positive", value: (row) => row.positive || "-" },
      { heading: "Negative", value: (row) => row.negative || "-" },
    ])
  );

  lines.push(...SECTIONS.orphanTemplates);
  lines.push(
    ...table(
      ["Tier", "Defined", "Never built"],
      tiers.map((tier) => [
        code(tier),
        data.orphans[tier].defined,
        data.orphans[tier].orphans.length,
      ])
    )
  );
  // The names go in a list rather than a fourth column: Prettier pads a table column to
  // its widest cell, and one tier with 25 template names would set the width of every
  // row in the table.
  for (const tier of tiers) {
    const orphans = data.orphans[tier].orphans;
    lines.push(
      `- ${code(tier)} - ` +
        (orphans.length ? orphans.map(code).join(", ") : "none")
    );
  }
  lines.push("");

  return lines.join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
}

module.exports = { TIER_ORDER, byTier, renderMarkdown };
