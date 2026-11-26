"use strict";

// scripts/lib/release.js: the version CHANGELOG.md names, the modinfo.json stamp, and
// the edits that turn develop's tree into master's.

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  AI_ROOT,
  REPO_ROOT,
  toPosix,
  walk,
} = require("../scripts/lib/ai-data.js");
const {
  changelogSection,
  isMinifiedOnMaster,
  localDate,
  minifyJson,
  releaseHeading,
  releaseModinfo,
  releasePrettierIgnore,
  stampModinfo,
} = require("../scripts/lib/release.js");

const read = (file) => fs.readFileSync(path.join(REPO_ROOT, file), "utf8");

const CHANGELOG =
  "# CHANGELOG\n\n## v5.27.0 - 2026-12-01\n\n- One\n- Two\n\n## v5.26.5 - 2026-11-26\n\n- Old\n";

describe("releaseHeading", () => {
  it("reads the first heading's version and date", () => {
    assert.deepEqual(releaseHeading(CHANGELOG), {
      version: "5.27.0",
      date: "2026-12-01",
    });
  });

  it("refuses an Unreleased first heading", () => {
    assert.throws(
      () => releaseHeading("# CHANGELOG\n\n## Unreleased\n\n## v5.26.5 - x\n"),
      /"## Unreleased", not ## v<version> - <date>/
    );
  });

  it("refuses a changelog with no heading", () => {
    assert.throws(() => releaseHeading("# CHANGELOG\n"), /no ## heading/);
  });
});

describe("changelogSection", () => {
  it("returns the named section's body", () => {
    assert.equal(changelogSection(CHANGELOG, "5.27.0"), "- One\n- Two\n");
  });

  it("returns the last section up to the end of the file", () => {
    assert.equal(changelogSection(CHANGELOG, "5.26.5"), "- Old\n");
  });

  it("does not match a version that only shares a prefix", () => {
    assert.throws(
      () => changelogSection(CHANGELOG, "5.27"),
      /no ## v5\.27 heading/
    );
  });
});

describe("stampModinfo", () => {
  it("rewrites version, date and build and nothing else", () => {
    const before = read("modinfo.json");
    const after = stampModinfo(before, {
      version: "9.9.9",
      date: "2030-01-02",
      build: "200000",
    });
    const parsed = JSON.parse(after);
    assert.equal(parsed.version, "9.9.9");
    assert.equal(parsed.date, "2030-01-02");
    assert.equal(parsed.build, "200000");
    const beforeLines = before.split("\n");
    const changed = after
      .split("\n")
      .filter((line, i) => line !== beforeLines[i]);
    assert.ok(changed.length <= 3);
    assert.equal(after.split("\n").length, beforeLines.length);
  });

  it("refuses a file missing a key", () => {
    assert.throws(
      () =>
        stampModinfo('{\n  "version": "1.0.0",\n  "date": "x"\n}\n', {
          version: "1",
          date: "2",
          build: "3",
        }),
      /modinfo.json build: expected one match, found 0/
    );
  });
});

describe("localDate", () => {
  it("pads month and day", () => {
    assert.equal(localDate(new Date(2026, 0, 5)), "2026-01-05");
  });
});

describe("minifyJson", () => {
  it("removes whitespace between tokens only", () => {
    assert.equal(
      minifyJson('{\r\n  "a b": [ 1, "x\\" y" ],\n\t"c":\n {} }\n', "t"),
      '{"a b":[1,"x\\" y"],"c":{}}'
    );
  });

  it("keeps number literals as written", () => {
    assert.equal(
      minifyJson('{ "n": 1.0, "e": 1e3 }', "t"),
      '{"n":1.0,"e":1e3}'
    );
  });

  it("keeps a duplicate key rather than silently dropping one", () => {
    assert.equal(minifyJson('{ "a": 1, "a": 2 }', "t"), '{"a":1,"a":2}');
  });

  it("names the file it cannot parse", () => {
    assert.throws(
      () => minifyJson("{ 'a': 1 }", "pa/x.json"),
      /^Error: pa\/x\.json: not valid JSON/
    );
  });

  it("is lossless and idempotent over every file under pa/", () => {
    const files = walk(AI_ROOT).filter((file) => file.endsWith(".json"));
    assert.ok(files.length > 0);
    for (const file of files) {
      const label = toPosix(path.relative(REPO_ROOT, file));
      const text = fs.readFileSync(file, "utf8");
      const minified = minifyJson(text, label);
      assert.deepEqual(JSON.parse(minified), JSON.parse(text), label);
      assert.equal(minifyJson(minified, label), minified, label);
      assert.doesNotMatch(minified, /\n/, label);
    }
  });
});

describe("master's paths", () => {
  it("minifies JSON under pa/ only", () => {
    assert.ok(isMinifiedOnMaster("pa/ai_queller/q_uber/ai_config.json"));
    assert.ok(!isMinifiedOnMaster("modinfo.json"));
    assert.ok(!isMinifiedOnMaster("scripts/lib/engine-vocabulary.json"));
    assert.ok(
      !isMinifiedOnMaster("ui/mods/com.pa.quitch.qquellerai/new_game.js")
    );
  });
});

describe("releaseModinfo", () => {
  const master =
    '{\n  "identifier": "com.pa.quitch.qQuellerAI",\n  "display_name": "Queller AI",\n  "version": "5.26.5"\n}\n';

  it("takes master's identity and keeps the rest of develop's file", () => {
    const develop = read("modinfo.json");
    const out = releaseModinfo(develop, master);
    const parsed = JSON.parse(out);
    assert.equal(parsed.identifier, "com.pa.quitch.qQuellerAI");
    assert.equal(parsed.display_name, "Queller AI");
    assert.deepEqual(
      { ...parsed, identifier: null, display_name: null },
      { ...JSON.parse(develop), identifier: null, display_name: null }
    );
    assert.equal(out.split("\n").length, develop.split("\n").length);
  });

  it("refuses a master that carries the -dev identifier", () => {
    assert.throws(
      () =>
        releaseModinfo(read("modinfo.json"), master.replace('AI"', 'AI-dev"')),
      /should be the release identifier/
    );
  });
});

describe("releasePrettierIgnore", () => {
  it("adds pa/** once", () => {
    const once = releasePrettierIgnore("node_modules\npackage-lock.json");
    assert.match(once, /^package-lock\.json\n\n# master only.*\npa\/\*\*\n$/m);
    assert.equal(releasePrettierIgnore(once), once);
  });
});
