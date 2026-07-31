"use strict";

// Finds build_conditions branches that cannot affect whether a build fires.
//
// `build_conditions` is an array of groups; groups are OR'd and the conditions inside
// a group are AND'd. That gives three shapes that are provably inert:
//
//   duplicate-condition  the same condition twice inside one group. Evaluates twice to
//                        the same answer.
//   identical-group      two groups with the same conditions. The second can never be
//                        the reason the build fired.
//   subsumed-group       group B contains every condition of group A plus more. B is
//                        strictly harder to satisfy than A, so any time B passes, A has
//                        already passed - B never decides anything.
//   contradiction        one group asserting boolean true and false for the same test
//                        and parameters. The group can never fire.
//
// None of these change behaviour, which is exactly why they are worth reporting: they
// are the fingerprint of an edit applied to one copy of a branch and not the other, and
// the neighbouring branch that *was* meant to change is usually the real defect. The
// duplicated naval branches in q_bronze were found this way, and the reading that falls
// out of them - that all three branches require AloneOnPlanet false, so Bronze can
// never open a naval factory alone on a planet - is a live behavioural difference from
// the tiers either side of it.
//
// Reported as warnings, not errors: nothing here is wrong today, so failing a build
// over it would be noise. Contradictions are the exception and fail the run - a group
// that can never fire is dead weight with no benign reading.

const { loadTiers, runAsScript } = require("../lib/ai-data.js");

// Stable key for a condition: same test, same parameters, same order-independent shape.
function conditionKey(condition) {
  return JSON.stringify(
    Object.keys(condition)
      .sort()
      .map((k) => [k, condition[k]])
  );
}

// The same, ignoring `boolean` - two conditions with this key and opposite booleans
// contradict each other.
function conditionKeyWithoutBoolean(condition) {
  return JSON.stringify(
    Object.keys(condition)
      .filter((k) => k !== "boolean")
      .sort()
      .map((k) => [k, condition[k]])
  );
}

function checkGroup(at, name, index, group, findings) {
  const seen = new Set();
  const polarity = new Map();

  for (const condition of group) {
    if (!condition || typeof condition !== "object") {
      continue;
    }
    const key = conditionKey(condition);
    if (seen.has(key)) {
      findings.warn(
        at,
        `"${name}" group ${index} tests ${condition.test_type} twice with the ` +
          `same parameters`
      );
    }
    seen.add(key);

    if (typeof condition.boolean === "boolean") {
      const bare = conditionKeyWithoutBoolean(condition);
      const previous = polarity.get(bare);
      if (previous !== undefined && previous !== condition.boolean) {
        findings.error(
          at,
          `"${name}" group ${index} asserts ${condition.test_type} both true and ` +
            `false - the group can never fire`
        );
      }
      polarity.set(bare, condition.boolean);
    }
  }
  return seen;
}

function checkEntry(at, entry, findings) {
  const name = entry.name || "(unnamed)";
  const groups = (entry.build_conditions || []).filter(Array.isArray);
  const sets = groups.map((group, index) =>
    checkGroup(at, name, index, group, findings)
  );

  for (let i = 0; i < sets.length; i++) {
    for (let j = i + 1; j < sets.length; j++) {
      if (!sets[j].size) {
        continue;
      }
      const jSubsetOfI = [...sets[j]].every((k) => sets[i].has(k));
      const iSubsetOfJ = [...sets[i]].every((k) => sets[j].has(k));

      if (jSubsetOfI && iSubsetOfJ) {
        findings.warn(
          at,
          `"${name}" groups ${i} and ${j} are identical - group ${j} can never be ` +
            `the branch that fires`
        );
      } else if (jSubsetOfI) {
        findings.warn(
          at,
          `"${name}" group ${i} contains every condition of group ${j} and more, ` +
            `so group ${i} can never be the branch that fires`
        );
      } else if (iSubsetOfJ && sets[i].size) {
        findings.warn(
          at,
          `"${name}" group ${j} contains every condition of group ${i} and more, ` +
            `so group ${j} can never be the branch that fires`
        );
      }
    }
  }
}

function run(findings) {
  const tiers = loadTiers();
  let entries = 0;
  let groups = 0;

  for (const tier of tiers) {
    for (const { file, entry } of tier.builds) {
      entries++;
      groups += (entry.build_conditions || []).length;
      checkEntry(`${tier.name}/${file}`, entry, findings);
    }
  }
  return `${entries} build entries, ${groups} condition groups`;
}

module.exports = { run };

if (require.main === module) {
  runAsScript("ai-conditions", run);
}
