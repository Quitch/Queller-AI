"use strict";

// Documentation checks for docs/**, README.md and CLAUDE.md.
//
// Two failure modes, both of which have already happened in this repo rather than being
// hypothetical:
//
//  1. A generated document going stale. `docs/engine-vocabulary.md` is generated, and it
//     still recorded 287 uses of `base_sort: "FromMainBase"` long after f6ce9466 removed
//     every one of them - nothing re-ran the generator, and nothing noticed. The same
//     happened to CLAUDE.md's hand-written per-tier table, which is why the counts moved
//     into docs/tier-inventory.md in the first place. A generator without a freshness
//     gate just relocates the drift.
//
//  2. A cross-reference rotting. The documents link to each other heavily and to files
//     elsewhere in the repo; a rename breaks those links silently, exactly the way a
//     renamed platoon template breaks a `to_build` (see ai-refs.js).
//
// Only tier-inventory.md can be checked for freshness here. engine-vocabulary.md is
// generated from bin_x64/server.exe, which CI does not have, so this reports that it was
// skipped rather than passing quietly - same rule as Findings.note.

const fs = require("node:fs");
const path = require("node:path");
const { REPO_ROOT, runAsScript, toPosix, walk } = require("../lib/ai-data.js");
const { MARKDOWN_OUTPUT, generate } = require("../refresh-tier-inventory.js");

const DOCS_DIR = path.join(REPO_ROOT, "docs");

// Line endings are not content. `.gitattributes` sets `* text=auto` so the checkout is
// CRLF on Windows while the generator emits LF; comparing raw bytes would fail on every
// Windows machine and pass in CI, which is the worst possible split.
const normalise = (text) => text.replace(/\r\n/g, "\n");

async function checkInventoryFreshness(findings) {
  const relative = toPosix(path.relative(REPO_ROOT, MARKDOWN_OUTPUT));
  if (!fs.existsSync(MARKDOWN_OUTPUT)) {
    findings.error(
      relative,
      "does not exist - run `npm run refresh:inventory`"
    );
    return;
  }
  const { markdown } = await generate();
  const committed = normalise(fs.readFileSync(MARKDOWN_OUTPUT, "utf8"));
  if (normalise(markdown) !== committed) {
    findings.error(
      relative,
      "is out of date with pa/ai_queller/** - run `npm run refresh:inventory` and " +
        "commit the result"
    );
  }
}

// GitHub's heading anchors: lowercase, strip anything that is not a word character,
// space or hyphen, then spaces to hyphens. Backticks and punctuation vanish rather than
// becoming hyphens, which is the part that is easy to get wrong by hand.
function slug(heading) {
  return heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function headingsOf(text) {
  const anchors = new Set();
  for (const line of normalise(text).split("\n")) {
    // One whitespace char, not `\s+`, and a greedy tail rather than a lazy one: `.`
    // matches whitespace too, so either overlap gives the engine a choice of split
    // points and a line that turns out not to match costs it every one of them. Any
    // further leading or trailing space ends up inside the capture, where slug()
    // trims it.
    const heading = /^#{1,6}\s(.*)$/.exec(line);
    if (heading) {
      anchors.add(slug(heading[1]));
    }
  }
  return anchors;
}

// Every markdown file this repo owns. node_modules is excluded because it is not ours,
// and pa/** contains no markdown.
function documentationFiles() {
  const files = [
    path.join(REPO_ROOT, "README.md"),
    path.join(REPO_ROOT, "CLAUDE.md"),
  ];
  if (fs.existsSync(DOCS_DIR)) {
    files.push(...walk(DOCS_DIR).filter((f) => f.endsWith(".md")));
  }
  return files.filter((f) => fs.existsSync(f));
}

// One link: the file it names has to exist, and if it carries a fragment and lands on a
// markdown file, that file has to have a heading with the matching anchor.
function checkLink(from, at, label, target, anchorsFor, findings) {
  const [rawPath, anchor] = target.split("#");
  const resolved = rawPath
    ? path.resolve(path.dirname(from), decodeURIComponent(rawPath))
    : from;

  if (!fs.existsSync(resolved)) {
    findings.error(
      at,
      `link "${label}" points at "${target}", which does not exist`
    );
    return;
  }
  if (!anchor || !resolved.endsWith(".md")) {
    return;
  }
  if (!anchorsFor(resolved).has(anchor)) {
    findings.error(
      at,
      `link "${label}" points at "${target}", but "${path.basename(resolved)}" ` +
        `has no heading matching "#${anchor}"`
    );
  }
}

function checkLinks(findings) {
  const files = documentationFiles();
  const anchorCache = new Map();
  const anchorsFor = (file) => {
    if (!anchorCache.has(file)) {
      anchorCache.set(file, headingsOf(fs.readFileSync(file, "utf8")));
    }
    return anchorCache.get(file);
  };

  let checked = 0;
  for (const file of files) {
    const at = toPosix(path.relative(REPO_ROOT, file));
    const text = fs.readFileSync(file, "utf8");
    // Both character classes exclude their own opening delimiter as well as the
    // closing one. Without that, a stray `[` or `(` sends the match back to scan the
    // rest of the document from the next character, once per `[` in the file.
    for (const [, label, target] of text.matchAll(
      /\[([^[\]]*)]\(([^()\s]+)\)/g
    )) {
      // External links and mailto: are somebody else's problem; a bare fragment is a
      // link within the same file.
      if (/^[a-z][a-z0-9+.-]*:/i.test(target)) {
        continue;
      }
      checked++;
      checkLink(file, at, label, target, anchorsFor, findings);
    }
  }
  return { files: files.length, links: checked };
}

async function runAsync(findings) {
  await checkInventoryFreshness(findings);
  findings.note(
    "engine-vocabulary.md freshness is not checked here - it is generated from " +
      "bin_x64/server.exe, which CI does not have. Run `npm run refresh:vocabulary` " +
      "after a PA patch."
  );
  const { files, links } = checkLinks(findings);
  return `${files} document(s), ${links} internal link(s)`;
}

module.exports = { runAsync, slug };

if (require.main === module) {
  runAsScript("docs", runAsync);
}
