"use strict";

// The prose half of the engine vocabulary: what each whitelist governs, and what the
// individual values mean where that is actually documented somewhere.
//
// Kept apart from scripts/refresh-engine-vocabulary.js because the two halves have
// different provenance and different reasons to change. That script extracts *which
// values exist* from the engine binary and the base game's data - facts, regenerated
// after a PA patch. This file records *what they mean* - curated prose that only
// changes when someone learns something new.
//
// SOURCING RULE, and the reason this file is worth trusting: nothing here is inferred
// from a value's name. A note exists only where a cited source says it, and the source
// is named per category in `sources`. A value with no documented meaning gets no note
// rather than a plausible guess - the tables still carry its observed parameters and
// usage counts, which are facts derived from the data.
//
// Primary source is the palobby wiki, archived 2021-09-05:
//   https://wiki.palobby.com/wiki/Planetary_Annihilation_AI_Build_Conditions (oldid 3483)
// Its sibling page, .../Planetary_Annihilation_AI_Build_Specs, was unreachable when this
// was compiled (HTTP 500), which is why the build-spec-side categories below carry
// structural notes rather than per-value prose. Fill them in if it comes back up.

// Section headings the wiki files each build condition under. Reproduced because "which
// part of the AI does this ask about" is most of what a reader needs, and the engine's
// own string table has no such grouping.
const TEST_TYPE_GROUPS = {
  Personality: ["HasPersonalityTag"],
  Economy: [
    "PotentialEnergyEfficiency",
    "PotentialMetalEfficiency",
    "CurrentEnergyEfficiency",
    "CurrentMetalEfficiency",
    "DesireMetal",
    "DesireEnergy",
    "MetalStorageFrac",
    "EnergyStorageFrac",
    "MetalStorageToProductionRatio",
    "EnergyStorageToProductionRatio",
    "HaveEcoForAdvanced",
  ],
  "Unit ratios and counts": [
    "UnitRatio",
    "UnitRatioOnPlanet",
    "UnitPoolRatio",
    "UnitCount",
    "UnitCountOnPlanet",
    "UnitPoolCount",
    "UnitCountPerPlanetRadius",
    "AlliedUnitCountOnPlanet",
    "UnitCountInCelestialTransit",
    "UnitCountInBase",
    "UnitCountAroundBase",
  ],
  Presence: [
    "AloneOnPlanet",
    "EnemyPresenceOnPlanet",
    "EnemySurfacePresenceOnPlanet",
    "EnemyAirPresenceOnPlanet",
    "EnemyOrbitalPresenceOnPlanet",
    "HaveFullPlanetIntel",
    "PlanetWithoutPresence",
    "SafePlanetWithoutPresence",
    "PlanetOrGasGiantWithoutPresence",
    "SafePlanetOrGasGiantWithoutPresence",
    "PlanetWithoutFabberWithTeleporter",
    "PresenceOnOtherPlanet",
  ],
  Commander: [
    "WantCommanderOffPlanet",
    "WantCommanderOffPlanetByTeleporter",
    "NoWhereToRun",
  ],
  Planets: [
    "PlanetHasUseablePlanetWeapon",
    "PlanetCanBeUsedAsKineticWeapon",
    "HaveThrustToMovePlanet",
    "PlanetCount",
    "SpawnablePlanetCount",
    "PlanetIsGasGiant",
    "PlanetIsMainEcoBase",
    "PlanetIsRespawnable",
  ],
  Metal: [
    "UnableToExpand",
    "BaseHasEmptyMetalSpotForBasic",
    "BaseHasEmptyMetalSpotForAdvanced",
    "CanFindMetalSpotToBuildBasic",
    "CanFindMetalSpotToBuildAdvanced",
    "AllMetalSpotsFull",
  ],
  Catalysts: ["CanFindControlPointToBuild"],
  Bases: [
    "IsMainBase",
    "BaseThreatened",
    "DistFromMainBase",
    "DistFromNearestEnemyThreat",
  ],
  Building: [
    "CanAffordPotentialDrain",
    "CanAffordBuildDemand",
    "CanFindPlaceToBuild",
    "CanDeployLandFromBase",
    "CanDeployNavalFromBase",
  ],
  Factories: [
    "FactoryHasOpenSlot",
    "FactorySlotsEmpty",
    "NeedBasicLandFactory",
    "NeedAdvancedLandFactory",
    "NeedBasicVehicleFactory",
    "NeedAdvancedVehicleFactory",
    "NeedBasicBotFactory",
    "NeedAdvancedBotFactory",
    "NeedBasicAirFactory",
    "NeedAdvancedAirFactory",
    "NeedBasicNavalFactory",
    "NeedAdvancedNavalFactory",
    "NeedOrbitalLauncher",
    "NeedOrbitalFactory",
  ],
  Fabbers: [
    "NeedBasicVehicleFabber",
    "NeedAdvancedVehicleFabber",
    "NeedBasicBotFabber",
    "NeedAdvancedBotFabber",
    "NeedBasicAirFabber",
    "NeedAdvancedAirFabber",
    "MetMinBasicFabberCount",
    "MetMinAdvancedFabberCount",
  ],
  "Strategic assistance": [
    "OtherPlanetNeedsReconAssistance",
    "OtherPlanetNeedsLandUnitAssistance",
    "OtherPlanetNeedsOrbitalUnitAssistance",
    "OtherPlanetCanReceiveLandUnitAssistance",
    "OtherPlanetCanProvideLandUnitAssistance",
    "CanProvideLandUnitAssistance",
    "ThisPlanetNeedsLandUnitAssistance",
    "ThisPlanetNeedsReconAssistance",
    "ThisPlanetNeedsOrbitalUnitAssistance",
  ],
  Threats: [
    "GravWellThreat",
    "SystemThreat",
    "PlanetThreat",
    "BaseThreat",
    "FocusTargetThreat",
    "PlanetHighestEnemyArmyThreat",
  ],
  "Threat ratios": [
    "GravWellToPlanetThreatRatio",
    "SystemToPlanetThreatRatio",
    "PlanetThreatRatio",
    "BaseThreatRatio",
    "FocusTargetThreatRatio",
    "PlanetHighestEnemyArmyThreatRatio",
  ],
  "Threat vision": ["HaveSeenEnemyUnits", "HaveHadANukeEvent"],
  "Attacks (neural network)": [
    "CanAttackWithPoolUnitsLand",
    "CanAttackWithPoolUnitsBomber",
    "CanAttackWithPoolUnitsFighter",
  ],
  "Attacks (direct)": ["CanAttackWithPoolUnits"],
  Assistance: ["CanProvideAirSupportWithPoolUnits", "OnTaskType"],
};

const THREAT_NOTE =
  "`string0` is an influence type, `compare0` a comparison and `value0` a number.";
const NEURAL_ATTACK_NOTE =
  "Neural-network backed. `string0` friendly world layer, `string1` enemy world layer, " +
  "`string2` optional target layer (defaults to the friendly layer), `boolean` use naval " +
  "rally point. Max weapon range comes from the target layer; search range is 50% of the " +
  "platoon radius plus max weapon range.";

const NOTES = {
  test_type: {
    HasPersonalityTag:
      "True when the personality declares the tag in `string0`. The wiki names the " +
      "parameter `string8`, which is a typo - the engine, the base game and this repo " +
      "all use `string0`.",
    CanAffordPotentialDrain:
      "`string0` names the unit whose drain is being tested, as a unit map key.",
    CanAffordBuildDemand:
      "Based on the build arm with tool type `TOOL_BuildArm`.",
    UnitRatio:
      "Ratio of `unit_type_string0` to `unit_type_string1`. Includes partially built units.",
    UnitRatioOnPlanet:
      "Ratio of `unit_type_string0` to `unit_type_string1`. Includes partially built units.",
    UnitCount: "`boolean` restricts the count to fully built units.",
    UnitCountOnPlanet: "`boolean` restricts the count to fully built units.",
    UnitPoolCount: "`boolean` restricts the count to fully built units.",
    AlliedUnitCountOnPlanet:
      "`boolean` restricts the count to fully built units.",
    UnitCountInBase: "`value1` is an optional alliance and defaults to allies.",
    UnitCountAroundBase:
      "`string0` is the alliance (defaults to allies), `value0` the radius (defaults to " +
      "the outer base radius) and `value1` the count.",
    AloneOnPlanet:
      "Checks armies on the planet using land, naval and air only - subs, orbital, " +
      "economy, nuke, anti-nuke and anti-planet units do not count towards it.",
    AllMetalSpotsFull:
      "A planet-wide check of the main base and any non-threatened bases.",
    DistFromNearestEnemyThreat:
      "Based on economy influence, so per the wiki it may not be a good threat indicator.",
    MetMinBasicFabberCount:
      "Applies only to tank, bot and air, using " +
      "`min_basic_fabbers * fabber_alone_on_planet_mod` from the personality.",
    MetMinAdvancedFabberCount:
      "Applies only to tank, bot and air, using " +
      "`min_advanced_fabbers * fabber_alone_on_planet_mod` from the personality.",
    GravWellThreat: THREAT_NOTE,
    SystemThreat: THREAT_NOTE,
    PlanetThreat: THREAT_NOTE,
    BaseThreat: THREAT_NOTE,
    FocusTargetThreat: THREAT_NOTE,
    PlanetHighestEnemyArmyThreat: THREAT_NOTE,
    HaveSeenEnemyUnits: "Takes `unit_type_string0`.",
    CanAttackWithPoolUnitsLand: NEURAL_ATTACK_NOTE,
    CanAttackWithPoolUnitsBomber: NEURAL_ATTACK_NOTE,
    CanAttackWithPoolUnitsFighter: NEURAL_ATTACK_NOTE,
    CanAttackWithPoolUnits:
      "`string0` attack world layer, `boolean` use naval rally point. Bypasses the " +
      "neural network the `...Land`/`...Bomber`/`...Fighter` variants go through.",
  },
  alliance: {
    Ally: "Also accepted as `Allied`.",
    Enemy: "Also accepted as `Hostile`.",
  },
  compare: {
    "<": "Less than.",
    "<=": "Less than or equal to.",
    ">": "Greater than.",
    ">=": "Greater than or equal to.",
    "==": "Equal to.",
    "!=": "Not equal to.",
  },
};

// One entry per whitelist. `fields` is the whole point of the document: which JSON keys
// the whitelist actually governs.
const CATEGORIES = [
  {
    key: "test_type",
    title: "Build condition types",
    fields: ["`build_list[].build_conditions[][].test_type`"],
    summary:
      "The question a single build condition asks. Conditions within a group are " +
      "AND'd and the groups are OR'd, so a build fires when any one group is fully " +
      "satisfied.",
    grouped: TEST_TYPE_GROUPS,
    extra:
      "Evaluation cadence, per the wiki: every 2 seconds for every base by default. " +
      "Some conditions are real time (every tick), some planet wide (once per planet) " +
      "and some system fixed (evaluated once at start).",
    source: "palobby wiki, AI Build Conditions (oldid 3483)",
  },
  {
    key: "condition_key",
    title: "Build condition keys",
    fields: ["`build_list[].build_conditions[][].*`"],
    summary:
      "Every key the engine reads from a condition object. Which of them a given " +
      "condition uses depends on its `test_type` - see the parameter columns above.",
    source: "engine string table",
  },
  {
    key: "build_spec_key",
    title: "Build spec keys",
    fields: ["`build_list[].*`"],
    summary: "Every key the engine reads from a build list entry.",
    source: "engine string table, plus the base game's own AI data",
  },
  {
    key: "task_type",
    title: "Task types",
    fields: ["`build_list[].task_type`"],
    summary:
      "What the thing being built is then told to do. On a platoon build, `to_build` " +
      "names a platoon template; on `AreaBuild` it names a unit map key instead.",
    source:
      "engine string table (the wiki's AI Build Specs page was unreachable)",
  },
  {
    key: "base_sort",
    title: "Base sort modes",
    fields: ["`build_list[].base_sort`"],
    summary:
      "Which point build locations are ordered from. `FromMainBase` is the default.",
    shareNote:
      "The engine keeps base sort modes and placement types in a single run of " +
      "adjacent strings, so the extraction cannot tell which values belong to which " +
      "field and both whitelists get all seven. The Used columns show which are " +
      "actually used where.",
    source: "engine string table; default per this repo's CLAUDE.md",
  },
  {
    key: "placement_type",
    title: "Placement types",
    fields: ["`build_list[].placement_rules.placement_type`"],
    summary: "What the `buffer` distance in a placement rule is measured from.",
    shareNote:
      "Shares its string run with base sort modes - see the note there.",
    source: "engine string table",
  },
  {
    key: "placement_key",
    title: "Placement rule keys",
    fields: [
      "`build_list[].placement_rules.*`",
      "`...placement_rules.threat.*`",
      "`...placement_rules.unit_count_rules[].*`",
    ],
    summary:
      "Every key the engine reads anywhere under `placement_rules`. The engine keeps " +
      "the outer keys and both nested blocks' keys in one run, so they are whitelisted " +
      "as a single set rather than split by nesting level.",
    source: "engine string table, plus the base game's own AI data",
  },
  {
    key: "influence_type",
    title: "Influence types",
    fields: [
      "`build_list[].placement_rules.threat.influence_type`",
      "`...build_conditions[][].string0` on the threat conditions",
    ],
    summary:
      "Which threat map a threat test or placement rule reads. The engine diagnoses an " +
      "unknown one - `BuildCondition: Unknown influence type %s` is in the binary.",
    source: "engine string table; `Economy` per this repo's CLAUDE.md",
  },
  {
    key: "world_layer",
    title: "World layers",
    fields: ["`build_list[].build_conditions[][].string0`/`string1`/`string2`"],
    summary:
      "Which layer of the world an attack condition looks at. The engine stores these " +
      "without the prefix and prepends `WL_`, which is why the extraction adds it back.",
    source: "engine string table",
  },
  {
    key: "alliance",
    title: "Alliance filters",
    fields: [
      "`build_list[].placement_rules.unit_count_rules[].alliance`",
      "`...build_conditions[][].string0` on `UnitCountAroundBase`",
    ],
    summary: "Whose units a count includes.",
    extra:
      "The wiki additionally documents `Self`. It is absent from the engine's alliance " +
      "string run and unused by the base game, so it is not whitelisted.",
    source: "engine string table; spellings per the wiki",
  },
  {
    key: "compare",
    title: "Comparison operators",
    fields: [
      "`build_list[].build_conditions[][].compare0`/`compare1`",
      "`...placement_rules.threat.compare_type`",
      "`...placement_rules.unit_count_rules[].compare_type`",
    ],
    summary:
      "How a condition's measured value is compared against its threshold. The engine " +
      "diagnoses an unknown one - `BuildCondition: Unknown comparison type: %s`.",
    extra:
      "These are one or two characters, below the minimum length the binary string " +
      "scanner can tell from noise, so unlike every other whitelist here they cannot be " +
      "recovered from the executable. The set comes from the base game's own usage.",
    source: "base game AI data; `==`/`!=` documented in the generator",
  },
  {
    key: "squad",
    title: "Squad types",
    fields: ["`platoon_templates.<name>.units[].squad`"],
    summary: "The role a squad plays inside a platoon.",
    source:
      "engine string table (the wiki's AI Build Specs page was unreachable)",
  },
  {
    key: "template_unit_key",
    title: "Platoon template squad keys",
    fields: ["`platoon_templates.<name>.units[].*`"],
    summary:
      "Every key the engine reads from a squad entry in a platoon template.",
    source: "engine string table",
  },
];

const escape = (text) => String(text).replace(/\|/g, String.raw`\|`);
const code = (text) => "`" + String(text).replace(/`/g, "") + "`";

function provenance(entry, value) {
  if (entry.fromBaseDataOnly.includes(value)) {
    return "base data";
  }
  if (entry.documentedOnly.includes(value)) {
    return "documented";
  }
  return "binary";
}

function renderRows(category, entry, usage, parameters, notes, values) {
  const rows = [];
  const withParameters = category.key === "test_type";
  for (const value of values) {
    const used = usage.here[value] || 0;
    const base = usage.base[value] || 0;
    const cells = [
      code(value),
      provenance(entry, value),
      used ? String(used) : "-",
      base ? String(base) : "-",
    ];
    if (withParameters) {
      const observed = parameters[value];
      cells.push(
        observed && observed.length
          ? observed.map((p) => code(p)).join(", ")
          : "-"
      );
    }
    cells.push(escape(notes[value] || "-"));
    rows.push(`| ${cells.join(" | ")} |`);
  }
  return rows;
}

function renderCategory(category, entry, usage, parameters) {
  const notes = NOTES[category.key] || {};
  const withParameters = category.key === "test_type";
  const header = withParameters
    ? "| Value | Source | Used here | Base AI | Parameters used here | Notes |"
    : "| Value | Source | Used here | Base AI | Notes |";
  const divider = withParameters
    ? "| --- | --- | --- | --- | --- | --- |"
    : "| --- | --- | --- | --- | --- |";

  const out = [`## ${category.title}`, ""];
  out.push(`**Governs:** ${category.fields.join(", ")}`, "");
  out.push(category.summary, "");
  if (category.shareNote) {
    out.push(`**Note:** ${category.shareNote}`, "");
  }
  if (category.extra) {
    out.push(category.extra, "");
  }

  const rowFor = (values) =>
    renderRows(category, entry, usage, parameters, notes, values);

  if (category.grouped) {
    const grouped = new Set();
    for (const [groupName, values] of Object.entries(category.grouped)) {
      const present = values.filter((v) => entry.values.includes(v));
      if (!present.length) {
        continue;
      }
      present.forEach((v) => grouped.add(v));
      out.push(`### ${groupName}`, "", header, divider, ...rowFor(present), "");
    }
    const ungrouped = entry.values.filter((v) => !grouped.has(v));
    if (ungrouped.length) {
      out.push(
        "### Ungrouped",
        "",
        "Present in the engine but not filed under any heading on the wiki.",
        "",
        header,
        divider,
        ...rowFor(ungrouped),
        ""
      );
    }
  } else {
    out.push(header, divider, ...rowFor(entry.values), "");
  }
  out.push(`<sub>Meanings: ${category.source}.</sub>`, "");
  return out;
}

function renderMarkdown({ vocabulary, usage, parameters, generatedFrom }) {
  const lines = [
    "# Engine vocabulary",
    "",
    "Every whitelist `scripts/validate/ai-schema.js` enforces against " +
      "`pa/ai_queller/**`, what each one governs, and what the values mean where that " +
      "is documented.",
    "",
    "**Generated - do not hand-edit.** Run `npm run refresh:vocabulary` to rebuild " +
      "this and `scripts/lib/engine-vocabulary.json` together, and do it after a PA " +
      "patch. Prose lives in `scripts/lib/vocabulary-reference.js`; edit it there.",
    "",
    "## How to read these tables",
    "",
    "- **Source** - where the value was recovered from. `binary` means it was read out " +
      "of the engine's own enum string table. `base data` means the binary scan missed " +
      "it because the linker de-duplicated it against an identically spelled member of " +
      "another enum, and it is known good because the shipped base game uses it. " +
      "`documented` means neither source yields it and the generator trusts it for a " +
      "stated reason.",
    "- **Used here** - occurrences in `pa/ai_queller/**`. A `-` means this mod does not " +
      "use the value; it is still legal.",
    "- **Base AI** - occurrences in the base game's own `pa/ai` and `pa_ex1/ai`.",
    "- **Notes** - only present where a cited source says something. A `-` means no " +
      "documented meaning was found, not that the value does nothing. Nothing in this " +
      "column is inferred from the value's name.",
    "",
    `Extracted from \`${generatedFrom.server}\` (${generatedFrom.strings.toLocaleString(
      "en-GB"
    )} strings scanned).`,
    "",
  ];
  for (const category of CATEGORIES) {
    const entry = vocabulary[category.key];
    if (!entry) {
      continue;
    }
    lines.push(
      ...renderCategory(category, entry, usage[category.key], parameters)
    );
  }
  return lines.join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
}

module.exports = { CATEGORIES, NOTES, TEST_TYPE_GROUPS, renderMarkdown };
