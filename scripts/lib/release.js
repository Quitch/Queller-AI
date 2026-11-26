"use strict";

// The text edits behind `npm run release` and `npm run release:master`: the version
// CHANGELOG.md names, the modinfo.json stamp, and how master's tree differs from
// develop's. Pure functions over file text, so the scripts that run git stay thin and
// everything that decides content is unit-tested. See docs/releasing.md.

const { isDeepStrictEqual } = require("node:util");

const VERSION_HEADING = /^## v(\d+\.\d+\.\d+) - (\d{4}-\d{2}-\d{2})\s*$/;

function releaseHeading(changelog) {
  const heading = changelog
    .split(/\r?\n/)
    .find((line) => line.startsWith("## "));
  if (!heading) {
    throw new Error("CHANGELOG.md has no ## heading");
  }
  const match = VERSION_HEADING.exec(heading);
  if (!match) {
    throw new Error(
      "CHANGELOG.md's first heading is " +
        JSON.stringify(heading) +
        ", not ## v<version> - <date>; retitle it before releasing"
    );
  }
  return { version: match[1], date: match[2] };
}

// The body of the `## v<version>` section, for the GitHub release notes.
function changelogSection(changelog, version) {
  const lines = changelog.split(/\r?\n/);
  const start = lines.findIndex((line) =>
    line.startsWith("## v" + version + " ")
  );
  if (start === -1) {
    throw new Error("CHANGELOG.md has no ## v" + version + " heading");
  }
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => line.startsWith("## "));
  return (end === -1 ? rest : rest.slice(0, end)).join("\n").trim() + "\n";
}

function replaceOnce(text, pattern, replacement, what) {
  const matches = text.match(new RegExp(pattern.source, pattern.flags + "g"));
  if (!matches || matches.length !== 1) {
    throw new Error(
      what + ": expected one match, found " + (matches ? matches.length : 0)
    );
  }
  return text.replace(pattern, replacement);
}

// Replaces one top-level string value in place, so the file keeps Prettier's layout.
function setModinfoString(text, key, value) {
  return replaceOnce(
    text,
    new RegExp('^( *"' + key + '": *)"[^"]*"', "m"),
    "$1" + JSON.stringify(value),
    "modinfo.json " + key
  );
}

function stampModinfo(text, stamp) {
  let out = text;
  for (const key of ["version", "date", "build"]) {
    out = setModinfoString(out, key, stamp[key]);
  }
  return out;
}

// YYYY-MM-DD in local time, as CHANGELOG.md's headings are written.
function localDate(now) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate())
  );
}

// --- master's tree -------------------------------------------------------------------

// master is develop's tree with these differences, and no others.
const MASTER_IDENTITY_KEYS = ["identifier", "display_name"];
const MASTER_PRETTIER_IGNORE =
  "\n# master only, added by `npm run release:master`: pa/** is minified there.\npa/**\n";

const isMinifiedOnMaster = (relative) =>
  relative.startsWith("pa/") && relative.toLowerCase().endsWith(".json");

// Removes the whitespace between JSON tokens and nothing else. A JSON.parse /
// JSON.stringify round trip would also rewrite number literals (`1.0` -> `1`) and drop
// duplicate keys; this cannot, because string literals are copied verbatim and nothing
// outside them but whitespace is touched. The parse comparison is the proof.
function minifyJson(text, label) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error(label + ": not valid JSON: " + error.message);
  }
  const minified = text.replace(/"(?:[^"\\]|\\.)*"|[ \t\n\r]+/g, (token) =>
    token[0] === '"' ? token : ""
  );
  if (!isDeepStrictEqual(JSON.parse(minified), parsed)) {
    throw new Error(label + ": minified JSON does not parse to the same value");
  }
  return minified;
}

// develop's modinfo.json carrying master's identifier and display name.
function releaseModinfo(developText, masterText) {
  const master = JSON.parse(masterText);
  if (/-dev$/i.test(master.identifier)) {
    throw new Error(
      "master's modinfo.json identifier is " +
        JSON.stringify(master.identifier) +
        "; it should be the release identifier"
    );
  }
  let out = developText;
  for (const key of MASTER_IDENTITY_KEYS) {
    out = setModinfoString(out, key, master[key]);
  }
  return out;
}

function releasePrettierIgnore(developText) {
  if (/^pa\/\*\*$/m.test(developText)) {
    return developText;
  }
  return developText.replace(/\n*$/, "\n") + MASTER_PRETTIER_IGNORE;
}

module.exports = {
  changelogSection,
  isMinifiedOnMaster,
  localDate,
  minifyJson,
  releaseHeading,
  releaseModinfo,
  releasePrettierIgnore,
  stampModinfo,
};
