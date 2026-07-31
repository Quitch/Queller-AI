"use strict";

// Runs every AI-data validator as a test, so `node --test` and `npm run validate` are
// the same gate reached two ways - one for a contributor's editor, one for CI.
//
// Also unit-tests findDuplicateKeys directly. It is the only check here that reads raw
// text rather than parsed JSON, because by the time JSON.parse has run the evidence is
// gone - the second value has already overwritten the first. A scanner that is subtly
// wrong would silently stop catching the thing it exists to catch, so it gets fixtures
// rather than only being exercised against data that happens to be clean.

const test = require("node:test");
const assert = require("node:assert");
const { Findings, findDuplicateKeys } = require("../scripts/lib/ai-data.js");
const { checkBuildScalars } = require("../scripts/validate/ai-schema.js");

const VALIDATORS = [
  ["ai-schema", require("../scripts/validate/ai-schema.js")],
  ["ai-refs", require("../scripts/validate/ai-refs.js")],
  ["ai-conditions", require("../scripts/validate/ai-conditions.js")],
  ["ai-base-install", require("../scripts/validate/ai-base-install.js")],
];

for (const [name, validator] of VALIDATORS) {
  test(`${name} reports no errors`, () => {
    const findings = new Findings(name);
    const summary = validator.run(findings);
    assert.deepStrictEqual(
      findings.errors.map((e) => `${e.location}: ${e.message}`),
      [],
      `${name} (${summary})`
    );
  });
}

// The tree currently has no priority 0, so the "run() reports nothing" tests above
// cannot distinguish a working check from one that never fires. These drive the check
// directly. See f5a55850 for the real case: q_gold and q_platinum shipped
// `Walker Foundry - Fabbers` at priority 0, and the base install still does.
const scalars = (entry) => {
  const findings = new Findings("test");
  checkBuildScalars("tier/file.json", entry.name, entry, findings);
  return findings.errors.map((e) => e.message);
};

test("priority 0 is flagged as a build that can never fire", () => {
  const errors = scalars({ name: "Walker Foundry - Fabbers", priority: 0 });
  assert.strictEqual(errors.length, 1);
  assert.match(errors[0], /priority 0, so it will never be built/);
});

test("a real priority is not flagged", () => {
  assert.deepStrictEqual(
    scalars({ name: "Walker Foundry - Fabbers", priority: 376 }),
    []
  );
});

test("priority 0 is distinguished from an absent priority", () => {
  // A missing priority is checkBuildKeys' business (required key), not this check's -
  // reporting it here too would double-report every malformed entry.
  assert.deepStrictEqual(scalars({ name: "No priority at all" }), []);
});

test("min_num_assisters above max_num_assisters is flagged", () => {
  const errors = scalars({
    name: "Backwards",
    priority: 1,
    min_num_assisters: 4,
    max_num_assisters: 2,
  });
  assert.strictEqual(errors.length, 1);
  assert.match(errors[0], /min_num_assisters 4 above max_num_assisters 2/);
});

test("shared_instance_count is a group name, not a count", () => {
  const errors = scalars({
    name: "Miscounted",
    priority: 1,
    shared_instance_count: 3,
  });
  assert.strictEqual(errors.length, 1);
  assert.match(errors[0], /expected a group name string/);
});

test("findDuplicateKeys finds a repeated key in the same object", () => {
  const found = findDuplicateKeys('{\n  "a": 1,\n  "b": 2,\n  "a": 3\n}');
  assert.strictEqual(found.length, 1);
  assert.strictEqual(found[0].key, "a");
  assert.strictEqual(found[0].line, 4);
  assert.strictEqual(found[0].firstLine, 2);
});

test("findDuplicateKeys allows the same key in sibling objects", () => {
  // The whole reason this is a scanner and not a regex: "name" appearing once per
  // build entry is the norm, not a defect.
  const text = '{"build_list": [{"name": "a"}, {"name": "b"}]}';
  assert.deepStrictEqual(findDuplicateKeys(text), []);
});

test("findDuplicateKeys allows the same key at different nesting levels", () => {
  const text = '{"value": 1, "threat": {"value": 2}}';
  assert.deepStrictEqual(findDuplicateKeys(text), []);
});

test("findDuplicateKeys is not fooled by a colon inside a string value", () => {
  // A line-based scanner reads `"a"` here as a second key and reports a duplicate.
  const text = '{"a": "test_type: something", "b": "x"}';
  assert.deepStrictEqual(findDuplicateKeys(text), []);
});

test("findDuplicateKeys is not fooled by an escaped quote", () => {
  const text = '{"a": "say \\"a\\": no", "b": 1}';
  assert.deepStrictEqual(findDuplicateKeys(text), []);
});

test("findDuplicateKeys reports a duplicate nested inside an array element", () => {
  const text =
    '{\n "build_list": [\n  {\n   "name": "x",\n   "priority": 1,\n   "name": "y"\n  }\n ]\n}';
  const found = findDuplicateKeys(text);
  assert.strictEqual(found.length, 1);
  assert.strictEqual(found[0].key, "name");
  assert.strictEqual(found[0].line, 6);
});
