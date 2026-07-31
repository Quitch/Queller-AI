"use strict";

// Shape and vocabulary check for every file under pa/ai_queller/**.
//
// The engine parses these files leniently: an unknown key is ignored, a misspelled
// enum value falls through to a default or logs to the server log and nowhere else,
// and a duplicate JSON key is silently resolved in favour of the last one. All three
// look exactly like working data from the outside. This check is what makes them
// visible without launching the game.
//
// Every whitelist it enforces comes from scripts/lib/engine-vocabulary.json, which is
// extracted from the engine itself - see scripts/refresh-engine-vocabulary.js. Nothing
// here is a house rule; it is all "would the engine recognise this".

const {
  findDuplicateKeys,
  loadTiers,
  runAsScript,
} = require("../lib/ai-data.js");
const { vocabulary } = require("../lib/engine-vocabulary.json");

const REQUIRED_BUILD_KEYS = [
  "name",
  "instance_count",
  "priority",
  "build_conditions",
];
const NUMERIC_BUILD_KEYS = [
  "instance_count",
  "priority",
  "min_num_assisters",
  "max_num_assisters",
];

const known = (category) => new Set(vocabulary[category].values);

const KNOWN = {
  buildKey: known("build_spec_key"),
  conditionKey: known("condition_key"),
  placementKey: known("placement_key"),
  templateUnitKey: known("template_unit_key"),
  testType: known("test_type"),
  taskType: known("task_type"),
  squad: known("squad"),
  baseSort: known("base_sort"),
  placementType: known("placement_type"),
  influenceType: known("influence_type"),
  worldLayer: known("world_layer"),
  alliance: known("alliance"),
  compare: known("compare"),
};

function checkUnitMap(tier, findings) {
  for (const [key, { file, entry }] of tier.unitMap) {
    const at = `${tier.name}/${file}`;
    const has = ["unit_types", "spec_id"].filter((k) => entry[k] !== undefined);
    // Exactly one: an entry with neither resolves to nothing, and an entry with both
    // leaves which one wins up to the engine rather than to the author.
    if (has.length !== 1) {
      findings.error(
        at,
        `unit map "${key}" has ${has.length} of unit_types/spec_id, expected exactly one`
      );
    }
    const extra = Object.keys(entry).filter(
      (k) => k !== "unit_types" && k !== "spec_id"
    );
    if (extra.length) {
      findings.error(at, `unit map "${key}" has unknown key(s): ${extra}`);
    }
  }
}

function checkTemplateSquad(at, name, squad, findings) {
  for (const key of Object.keys(squad)) {
    if (!KNOWN.templateUnitKey.has(key)) {
      findings.error(at, `template "${name}" squad has unknown key "${key}"`);
    }
  }
  if (squad.squad !== undefined && !KNOWN.squad.has(squad.squad)) {
    findings.error(at, `template "${name}" has unknown squad "${squad.squad}"`);
  }
  if (!squad.unit_types) {
    findings.error(at, `template "${name}" has a squad without unit_types`);
  }
  // max_count -1 is the engine's "no limit" sentinel, so it is deliberately not
  // compared against min_count.
  const { min_count: min, max_count: max } = squad;
  if (
    typeof min === "number" &&
    typeof max === "number" &&
    max !== -1 &&
    min > max
  ) {
    findings.error(
      at,
      `template "${name}" squad has min_count ${min} above max_count ${max}`
    );
  }
}

function checkTemplates(tier, findings) {
  for (const [name, { file, definition }] of tier.templates) {
    const at = `${tier.name}/${file}`;
    const extra = Object.keys(definition).filter((k) => k !== "units");
    if (extra.length) {
      findings.error(at, `template "${name}" has unknown key(s): ${extra}`);
    }
    // The engine reads `units` as an array. An object parses as JSON and then supplies
    // no squads at all - the platoon forms empty and nothing is reported.
    if (!Array.isArray(definition.units)) {
      findings.error(
        at,
        `template "${name}".units is ${typeof definition.units}, expected an array`
      );
      continue;
    }
    if (!definition.units.length) {
      findings.error(at, `template "${name}" has no squads`);
    }
    for (const squad of definition.units) {
      checkTemplateSquad(at, name, squad, findings);
    }
  }
}

function checkPlacement(at, name, rules, findings) {
  const report = (object) => {
    for (const key of Object.keys(object)) {
      if (!KNOWN.placementKey.has(key)) {
        findings.error(
          at,
          `"${name}" placement_rules has unknown key "${key}"`
        );
      }
    }
  };
  report(rules);
  if (
    rules.placement_type !== undefined &&
    !KNOWN.placementType.has(rules.placement_type)
  ) {
    findings.error(
      at,
      `"${name}" has unknown placement_type "${rules.placement_type}"`
    );
  }
  if (rules.threat) {
    report(rules.threat);
    if (!KNOWN.influenceType.has(rules.threat.influence_type)) {
      findings.error(
        at,
        `"${name}" threat has unknown influence_type "${rules.threat.influence_type}"`
      );
    }
    if (!KNOWN.compare.has(rules.threat.compare_type)) {
      findings.error(
        at,
        `"${name}" threat has unknown compare_type "${rules.threat.compare_type}"`
      );
    }
  }
  for (const rule of rules.unit_count_rules || []) {
    report(rule);
    if (!KNOWN.alliance.has(rule.alliance)) {
      findings.error(
        at,
        `"${name}" unit_count_rules has unknown alliance "${rule.alliance}"`
      );
    }
    if (!KNOWN.compare.has(rule.compare_type)) {
      findings.error(
        at,
        `"${name}" unit_count_rules has unknown compare_type "${rule.compare_type}"`
      );
    }
  }
}

function checkCondition(at, name, condition, findings) {
  if (!condition || typeof condition !== "object") {
    findings.error(at, `"${name}" has a condition that is not an object`);
    return;
  }
  for (const key of Object.keys(condition)) {
    if (!KNOWN.conditionKey.has(key)) {
      findings.error(at, `"${name}" condition has unknown key "${key}"`);
    }
  }
  if (!condition.test_type) {
    findings.error(at, `"${name}" has a condition with no test_type`);
  } else if (!KNOWN.testType.has(condition.test_type)) {
    findings.error(
      at,
      `"${name}" has unknown test_type "${condition.test_type}"`
    );
  }
  for (const key of ["compare0", "compare1"]) {
    if (condition[key] !== undefined && !KNOWN.compare.has(condition[key])) {
      findings.error(
        at,
        `"${name}" has unknown ${key} "${condition[key]}" (test_type ${condition.test_type})`
      );
    }
  }
  // World layers are the one string parameter with a recognisable shape, so they can
  // be checked without knowing each test_type's parameter contract.
  for (const key of ["string0", "string1", "string2"]) {
    const value = condition[key];
    if (
      typeof value === "string" &&
      value.startsWith("WL_") &&
      !KNOWN.worldLayer.has(value)
    ) {
      findings.error(at, `"${name}" has unknown world layer "${value}"`);
    }
  }
}

function checkBuildScalars(at, name, entry, findings) {
  for (const key of NUMERIC_BUILD_KEYS) {
    if (entry[key] !== undefined && typeof entry[key] !== "number") {
      findings.error(
        at,
        `"${name}" has ${key} of type ${typeof entry[key]}, expected number`
      );
    }
  }
  if (
    typeof entry.min_num_assisters === "number" &&
    typeof entry.max_num_assisters === "number" &&
    entry.min_num_assisters > entry.max_num_assisters
  ) {
    findings.error(
      at,
      `"${name}" has min_num_assisters ${entry.min_num_assisters} above ` +
        `max_num_assisters ${entry.max_num_assisters}`
    );
  }
  // Not a number - it is the name of the budget this entry shares with its siblings.
  if (
    entry.shared_instance_count !== undefined &&
    typeof entry.shared_instance_count !== "string"
  ) {
    findings.error(
      at,
      `"${name}" has shared_instance_count of type ` +
        `${typeof entry.shared_instance_count}, expected a group name string`
    );
  }
  // priority 0 is "off". GW-AI-Overhaul's gwaio_upgrade_singlelaserdefensetower.js
  // relies on exactly that, replacing a Queller entry's priority with 0 under the
  // comment "Turn off for Queller" - but it does so at runtime, from outside the data.
  // A 0 sitting in a shipped file has no such intent behind it: the entry is either a
  // build that was meant to be live and silently is not, or a leftover that reads as
  // live to every future editor. Both want the same treatment - fix the number or
  // delete the entry.
  //
  // This is not hypothetical. `Walker Foundry - Fabbers` carried priority 0 in q_gold
  // and q_platinum until f5a55850 ("Gold/Plat should build Walker Foundries with
  // fabs") set it to 376; the base install's frozen snapshot still ships the 0, so a
  // stock install without this mod is still running that dead build today. It is the
  // same class as the seven breaks in CLAUDE.md's "Data integrity" table.
  //
  // The base game does ship one itself - `Wall` in pa/ai/fabber_builds/
  // fabber_defense_builds.json - which is why the stock AI never builds walls. That is
  // a precedent for the engine accepting it, not for it being intended.
  if (entry.priority === 0) {
    findings.error(
      at,
      `"${name}" has priority 0, so it will never be built - either it wants a real ` +
        `priority or the entry is dead and should be deleted`
    );
  }
}

function checkBuildKeys(at, name, entry, findings) {
  for (const key of Object.keys(entry)) {
    if (!KNOWN.buildKey.has(key)) {
      findings.error(at, `"${name}" has unknown key "${key}"`);
    }
  }
  for (const key of REQUIRED_BUILD_KEYS) {
    if (entry[key] === undefined) {
      findings.error(at, `"${name}" is missing required key "${key}"`);
    }
  }
  checkBuildScalars(at, name, entry, findings);
  if (entry.task_type !== undefined && !KNOWN.taskType.has(entry.task_type)) {
    findings.error(at, `"${name}" has unknown task_type "${entry.task_type}"`);
  }
  if (entry.base_sort !== undefined && !KNOWN.baseSort.has(entry.base_sort)) {
    findings.error(at, `"${name}" has unknown base_sort "${entry.base_sort}"`);
  }
}

function checkBuildConditions(at, name, conditions, findings) {
  if (conditions === undefined) {
    return;
  }
  if (!Array.isArray(conditions)) {
    findings.error(at, `"${name}".build_conditions is not an array`);
    return;
  }
  for (const group of conditions) {
    if (!Array.isArray(group)) {
      findings.error(
        at,
        `"${name}" has a build_conditions group that is not an array`
      );
      continue;
    }
    for (const condition of group) {
      checkCondition(at, name, condition, findings);
    }
  }
}

function checkBuild(tier, build, findings) {
  const { file, entry } = build;
  const at = `${tier.name}/${file}`;
  const name = entry.name || `#${build.index}`;

  checkBuildKeys(at, name, entry, findings);
  // A platoon build with no task_type builds a platoon and gives it nothing to do.
  if (file.startsWith("platoon_builds/") && !entry.task_type) {
    findings.error(at, `"${name}" is a platoon build with no task_type`);
  }
  if (entry.placement_rules) {
    checkPlacement(at, name, entry.placement_rules, findings);
  }
  checkBuildConditions(at, name, entry.build_conditions, findings);
}

function run(findings) {
  const tiers = loadTiers();
  let files = 0;
  let builds = 0;

  for (const tier of tiers) {
    for (const { file, message } of tier.parseErrors) {
      findings.error(`${tier.name}/${file}`, `does not parse: ${message}`);
    }
    for (const file of tier.files) {
      files++;
      for (const duplicate of findDuplicateKeys(file.text)) {
        findings.error(
          `${tier.name}/${file.file}:${duplicate.line}`,
          `duplicate key "${duplicate.key}" (first seen on line ` +
            `${duplicate.firstLine}) - the earlier value is silently discarded`
        );
      }
    }
    // Read per ai_path with no fallback: a tier without one runs with no unit cap.
    if (!tier.config) {
      findings.error(tier.name, "has no ai_config.json");
    }
    checkUnitMap(tier, findings);
    checkTemplates(tier, findings);
    for (const build of tier.builds) {
      builds++;
      checkBuild(tier, build, findings);
    }
  }
  return `${tiers.length} tiers, ${files} files, ${builds} build entries`;
}

// checkBuildScalars is exported for test/ai_data.test.js, which exercises it against
// synthetic entries. The tree is clean, so "run() reports nothing" cannot tell a
// working check from one that never fires.
module.exports = { run, checkBuildScalars };

if (require.main === module) {
  runAsScript("ai-schema", run);
}
