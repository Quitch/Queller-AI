"use strict";

// Loads `pa/ai_queller/**` into the shape the validators want, and provides the
// findings collector they all report through.
//
// The engine reads an AI tree by enumerating the directories under a personality's
// `ai_path` recursively - `mla/`, `legion/` and `subpersonalities/` are a Queller
// organisational convention that the engine flattens away. Everything here follows
// that: a tier is one flat namespace of unit-map keys, template names and build
// entries, no matter which subdirectory a given file sits in.

const fs = require("node:fs");
const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..");
const AI_ROOT = path.join(REPO_ROOT, "pa", "ai_queller");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

const toPosix = (p) => p.split(path.sep).join("/");

// Codepoint order for a list of names. Sorting anything here without a comparator is a
// bug waiting to happen - the default sort compares stringified elements, which is only
// the right answer for strings by accident - and `localeCompare` is the wrong fix: it
// weights `_` and `.` differently, so `ai_unit_map_x1.json` sorts before
// `ai_unit_map.json` and generated documents reorder for no reason. This is what the
// default sort already does for strings, said out loud.
function byName(a, b) {
  if (a < b) {
    return -1;
  }
  return a > b ? 1 : 0;
}

// Finds keys that appear twice in the same JSON object. JSON.parse keeps the last one
// and says nothing, so the earlier value is silently discarded - the kind of edit that
// looks applied in the diff and is not applied in the game. Needs the raw text: by the
// time it is parsed the evidence is gone.
//
// A character scanner rather than a line scanner, because a line scanner cannot tell a
// key from a `"..."` string value that happens to contain a colon.
//
// SonarCloud reports this function as too complex (S3776, 20 against a limit of 15) and
// the finding is being left as it stands. It is a state machine over four mutable
// variables - the read position, the line counter, the pending key and the frame stack -
// that every branch reads and writes. Splitting the dispatch into per-character handlers
// would hand each one that state to mutate through a shared object, which is the same
// machine with the sequence hidden; rewriting the if/else chain as a switch would halve
// the score without changing a line of logic, because the metric discounts switches.
// Neither makes it easier to read, so neither is worth the churn on a function that has
// one job and six tests.
function findDuplicateKeys(text) {
  const duplicates = [];
  // One frame per open object; arrays push a frame too so depth stays aligned, but
  // only object frames ever collect keys.
  const stack = [];
  let i = 0;
  let line = 1;
  let pendingKey = null;

  const readString = () => {
    // Positioned on the opening quote.
    let value = "";
    i++;
    while (i < text.length) {
      const c = text[i];
      if (c === "\\") {
        value += text[i + 1];
        i += 2;
        continue;
      }
      if (c === '"') {
        i++;
        return value;
      }
      if (c === "\n") {
        line++;
      }
      value += c;
      i++;
    }
    return value;
  };

  while (i < text.length) {
    const c = text[i];
    if (c === "\n") {
      line++;
      i++;
    } else if (c === '"') {
      const startLine = line;
      const value = readString();
      pendingKey = { value, line: startLine };
    } else if (c === ":") {
      // The string just read was a key, not a value.
      const frame = stack[stack.length - 1];
      if (pendingKey && frame && frame.keys) {
        const previous = frame.keys.get(pendingKey.value);
        if (previous !== undefined) {
          duplicates.push({
            key: pendingKey.value,
            line: pendingKey.line,
            firstLine: previous,
          });
        }
        frame.keys.set(pendingKey.value, pendingKey.line);
      }
      pendingKey = null;
      i++;
    } else if (c === "{") {
      stack.push({ keys: new Map() });
      pendingKey = null;
      i++;
    } else if (c === "[") {
      stack.push({});
      pendingKey = null;
      i++;
    } else if (c === "}" || c === "]") {
      stack.pop();
      pendingKey = null;
      i++;
    } else {
      if (c === ",") {
        pendingKey = null;
      }
      i++;
    }
  }
  return duplicates;
}

// Every condition in a build entry, flattened. `build_conditions` is an array of groups
// and a group is an array of conditions - groups are OR'd, conditions inside one are
// AND'd - so the two loops and the shape guards below are the same three lines at every
// call site that does not care which group a condition came from, which is all of them
// except ai-conditions.js. Nested three deep at four call sites, they were most of what
// made those functions unreadable.
function* conditionsOf(entry) {
  for (const group of entry.build_conditions || []) {
    if (!Array.isArray(group)) {
      continue;
    }
    for (const condition of group) {
      if (condition && typeof condition === "object") {
        yield condition;
      }
    }
  }
}

// One tier: every unit-map key, template and build entry it contributes, flattened the
// way the engine flattens them, each tagged with the file it came from so a finding can
// point at a real line of a real file.
function loadTier(tierName) {
  const tierRoot = path.join(AI_ROOT, tierName);
  const tier = {
    name: tierName,
    root: tierRoot,
    files: [],
    unitMap: new Map(), // key -> { file, entry }
    templates: new Map(), // name -> { file, definition }
    builds: [], // { file, entry, index }
    config: null,
    parseErrors: [],
  };

  for (const file of walk(tierRoot)) {
    const relative = toPosix(path.relative(tierRoot, file));
    const text = fs.readFileSync(file, "utf8");
    let json;
    try {
      json = JSON.parse(text);
    } catch (error) {
      tier.parseErrors.push({ file: relative, message: error.message });
      continue;
    }
    tier.files.push({ file: relative, absolute: file, text, json });

    if (relative === "ai_config.json") {
      tier.config = json;
      continue;
    }
    for (const [key, entry] of Object.entries(json.unit_map || {})) {
      tier.unitMap.set(key, { file: relative, entry });
    }
    for (const [name, definition] of Object.entries(
      json.platoon_templates || {}
    )) {
      tier.templates.set(name, { file: relative, definition });
    }
    (json.build_list || []).forEach((entry, index) => {
      tier.builds.push({ file: relative, entry, index });
    });
  }
  return tier;
}

function loadTiers() {
  return fs
    .readdirSync(AI_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => loadTier(e.name));
}

const NEW_GAME_JS = path.join(
  REPO_ROOT,
  "ui",
  "mods",
  "com.pa.quitch.qquellerai",
  "new_game.js"
);

// Which personality declares which tags, read out of new_game.js by pattern rather than
// by executing it - the file is written against PA's runtime globals (`model`, `_`) and
// cannot be required from Node.
//
// Scanned line by line against line-anchored patterns rather than with one regex over
// the whole file: `prettier --check` is a CI gate here, so `qName: {` and
// `personality_tags: [...]` are each reliably on their own line, and anchoring keeps the
// match linear instead of backtracking across the file.
//
// A personality whose tag array ever grew long enough for Prettier to wrap it would be
// missed. `ai-refs` is the backstop - it errors on any tag the data gates on that no
// personality declares, so a miss surfaces there rather than silently.
//
// Two consumers: `validate:refs` asserts every tag the data gates on is declared
// somewhere, and the inventory generator reports which personality declares each one.
function declaredPersonalityTags() {
  const source = fs.readFileSync(NEW_GAME_JS, "utf8");
  const personalities = new Map();
  let current = null;
  for (const line of source.split("\n")) {
    const opener = /^\s*([A-Za-z_$][\w$]*):\s*\{\s*$/.exec(line);
    if (opener) {
      current = opener[1];
      continue;
    }
    const tags = /^\s*personality_tags:\s*\[(.*)],?\s*$/.exec(line);
    if (tags && current) {
      personalities.set(
        current,
        (tags[1].match(/"([^"]*)"/g) || []).map((q) => q.slice(1, -1))
      );
      current = null;
    }
  }
  return personalities;
}

// The flat set of every declared tag, for callers that only need membership.
function declaredTags() {
  return new Set([...declaredPersonalityTags().values()].flat());
}

// Findings collector. `error` fails the run; `warn` is reported and does not. The split
// exists because some checks describe data that is redundant rather than wrong - a
// duplicated OR-branch changes no behaviour, so failing a build over it would be
// noise, but leaving it unsaid is how it survives for years.
class Findings {
  constructor(checkName) {
    this.checkName = checkName;
    this.errors = [];
    this.warnings = [];
    this.notes = [];
  }

  error(location, message) {
    this.errors.push({ location, message });
  }

  warn(location, message) {
    this.warnings.push({ location, message });
  }

  // Something the run could not check, and why. Always printed - a check that quietly
  // skipped is indistinguishable from a check that passed.
  note(message) {
    this.notes.push(message);
  }

  get ok() {
    return this.errors.length === 0;
  }

  print(summary) {
    for (const note of this.notes) {
      console.log(`  note: ${note}`);
    }
    for (const warning of this.warnings) {
      console.log(`  warn: ${warning.location}: ${warning.message}`);
    }
    for (const error of this.errors) {
      console.log(`  FAIL: ${error.location}: ${error.message}`);
    }
    const counts = `${this.errors.length} error(s), ${this.warnings.length} warning(s)`;
    console.log(
      `${this.ok ? "OK  " : "FAIL"} ${this.checkName}: ${summary} - ${counts}`
    );
  }
}

// Standard entry point for a validator run directly from npm rather than from a test.
//
// `run` may return its summary directly or as a promise - the docs check has to
// regenerate a document before it can compare, and that goes through Prettier, which is
// async. Awaiting a non-promise is harmless, so the synchronous validators are unchanged.
function runAsScript(checkName, run) {
  const findings = new Findings(checkName);
  Promise.resolve()
    .then(() => run(findings))
    .then((summary) => {
      findings.print(summary);
      process.exit(findings.ok ? 0 : 1);
    })
    .catch((error) => {
      console.error(`FAIL ${checkName}: ${error.message}`);
      process.exit(1);
    });
}

module.exports = {
  AI_ROOT,
  NEW_GAME_JS,
  REPO_ROOT,
  Findings,
  byName,
  conditionsOf,
  declaredPersonalityTags,
  declaredTags,
  findDuplicateKeys,
  loadTier,
  loadTiers,
  runAsScript,
  toPosix,
  walk,
};
