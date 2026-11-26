"use strict";

// `npm run release:master`: builds the next master commit from develop, checks it, and
// moves the local master branch to it. Pushes nothing.
//
// master cannot be updated by merging develop into it: its pa/**/*.json is minified, so
// every data file develop touches would conflict. Instead master's tree is derived from
// develop's in full - every pa/**/*.json minified, master's identifier and display name
// in modinfo.json, and a .prettierignore entry for the minified data - and committed
// with master and develop as its parents. Nothing in the working tree is
// read or written: the tree is built in a temporary index, and checked in a temporary
// worktree. See docs/releasing.md.

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { REPO_ROOT } = require("./lib/ai-data.js");
const {
  git,
  gitRaw,
  revParse,
  run,
  runNode,
  tagExists,
} = require("./lib/commands.js");
const {
  changelogSection,
  isMinifiedOnMaster,
  minifyJson,
  releaseHeading,
  releaseModinfo,
  releasePrettierIgnore,
} = require("./lib/release.js");

const DEVELOP = "refs/heads/develop";
const ORIGIN_DEVELOP = "refs/remotes/origin/develop";
const MASTER = "refs/heads/master";
const ORIGIN_MASTER = "refs/remotes/origin/master";
const DROP_FLAG = "--drop-master-commits";

const show = (commit, file) => git(["cat-file", "blob", commit + ":" + file]);
const short = (commit) => commit.slice(0, 8);
const oneline = (shas) => git(["log", "--no-walk", "--oneline", ...shas]);

// The commits a `--drop-master-commits=<sha>[,<sha>]` argument names, in full. Each one
// is named on purpose, so dropping one ported hotfix cannot drop another that was not.
function droppedCommits(argv) {
  const dropped = [];
  for (const arg of argv) {
    if (!arg.startsWith(DROP_FLAG + "=")) {
      throw new Error(
        "unknown argument " +
          JSON.stringify(arg) +
          "; the only option is " +
          DROP_FLAG +
          "=<sha>[,<sha>]"
      );
    }
    for (const ref of arg.slice(DROP_FLAG.length + 1).split(",")) {
      const sha = ref && revParse(ref);
      if (!sha) {
        throw new Error(
          DROP_FLAG + ": " + JSON.stringify(ref) + " is not a commit"
        );
      }
      dropped.push(sha);
    }
  }
  return dropped;
}

function preflight(argv) {
  git(["fetch", "--tags", "origin"]);
  const dropped = droppedCommits(argv);

  const develop = revParse(DEVELOP);
  if (!develop) {
    throw new Error("there is no local develop branch");
  }
  if (develop !== revParse(ORIGIN_DEVELOP)) {
    throw new Error(
      "develop and origin/develop differ; push or pull develop first, so master is" +
        " built from the develop everyone has"
    );
  }
  const originMaster = revParse(ORIGIN_MASTER);
  if (!originMaster) {
    throw new Error("there is no origin/master");
  }
  const localMaster = revParse(MASTER);
  if (localMaster && localMaster !== originMaster) {
    throw new Error(
      "local master (" +
        short(localMaster) +
        ") is not origin/master (" +
        short(originMaster) +
        "); reset it to origin/master or delete it, then run this again"
    );
  }
  if (
    /^branch refs\/heads\/master$/m.test(
      git(["worktree", "list", "--porcelain"])
    )
  ) {
    throw new Error(
      "master is checked out in a worktree; switch that worktree away from master first"
    );
  }

  const changelog = show(develop, "CHANGELOG.md");
  const heading = releaseHeading(changelog);
  const tag = "v" + heading.version;
  const developVersion = JSON.parse(show(develop, "modinfo.json")).version;
  if (developVersion !== heading.version) {
    throw new Error(
      "develop's modinfo.json is version " +
        developVersion +
        " but CHANGELOG.md's first heading is " +
        tag +
        "; run `npm run release` and commit the result to develop first"
    );
  }
  const masterModinfo = show(originMaster, "modinfo.json");
  if (JSON.parse(masterModinfo).version === heading.version) {
    throw new Error("master is already at " + tag);
  }
  const tagged = tagExists(tag);
  if (tagged) {
    throw new Error(
      tag + " is already tagged " + tagged + "; pick a new version"
    );
  }

  // master is rebuilt from develop alone, so a hotfix committed straight to master is
  // dropped unless develop has it too. --cherry-pick passes a commit whose patch develop
  // already has, context lines included, so a ported data fix never matches. The last
  // release tag bounds the search, since master's history before then holds old commits
  // develop never had.
  const lastTag = gitRaw(
    ["describe", "--tags", "--abbrev=0", "--match", "v[0-9]*", originMaster],
    { allowFailure: true }
  );
  const since =
    lastTag.status === 0 ? ["^" + String(lastTag.stdout).trim()] : [];
  const masterOnly = git([
    "rev-list",
    "--no-merges",
    "--cherry-pick",
    "--right-only",
    develop + "..." + originMaster,
    ...since,
  ]);
  const shas = masterOnly ? masterOnly.split("\n") : [];
  const stray = dropped.filter((sha) => !shas.includes(sha));
  if (stray.length) {
    throw new Error(
      DROP_FLAG +
        " names " +
        stray.map(short).join(", ") +
        ", which master does not have since its last release, or which develop" +
        " already has"
    );
  }
  const kept = shas.filter((sha) => !dropped.includes(sha));
  if (kept.length) {
    throw new Error(
      "master has commits develop does not, which this release would drop:\n" +
        oneline(kept) +
        "\nCherry-pick each one to develop and push it, then run this again. Once a" +
        " change has reached develop another way, name its commit: " +
        DROP_FLAG +
        "=<sha>[,<sha>]. Do not merge master into develop: it would bring the" +
        " minified data with it."
    );
  }
  if (dropped.length) {
    console.warn(
      "\nrelease:master: dropping master-only commits:\n" + oneline(dropped)
    );
  }

  return {
    changelog,
    develop,
    heading,
    localMaster,
    masterModinfo,
    originMaster,
    tag,
  };
}

function lsTree(commit) {
  const out = String(gitRaw(["ls-tree", "-r", "-z", commit]).stdout);
  return out
    .split("\0")
    .filter(Boolean)
    .map((record) => {
      const tab = record.indexOf("\t");
      const [mode, type, oid] = record.slice(0, tab).split(" ");
      return { mode, type, oid, path: record.slice(tab + 1) };
    });
}

// Every blob's text in one `git cat-file --batch` call.
function readBlobs(oids) {
  const out = gitRaw(["cat-file", "--batch"], {
    input: oids.join("\n") + "\n",
  }).stdout;
  const blobs = new Map();
  let at = 0;
  while (at < out.length) {
    const headerEnd = out.indexOf(10, at);
    const [oid, type, size] = out.toString("utf8", at, headerEnd).split(" ");
    if (type !== "blob") {
      throw new Error("expected a blob for " + oid + ", got " + type);
    }
    const start = headerEnd + 1;
    blobs.set(oid, out.toString("utf8", start, start + Number(size)));
    at = start + Number(size) + 1;
  }
  return blobs;
}

function buildMasterTree(state, tmp) {
  const env = { GIT_INDEX_FILE: path.join(tmp, "index") };
  git(["read-tree", state.develop], { env });

  const entries = lsTree(state.develop).filter(
    (entry) => entry.type === "blob"
  );
  const edited = (entry) =>
    isMinifiedOnMaster(entry.path) ||
    entry.path === "modinfo.json" ||
    entry.path === ".prettierignore";
  const blobs = readBlobs(entries.filter(edited).map((entry) => entry.oid));

  const writes = [];
  let minified = 0;
  for (const entry of entries) {
    if (isMinifiedOnMaster(entry.path)) {
      writes.push({
        entry,
        text: minifyJson(blobs.get(entry.oid), entry.path),
      });
      minified++;
    } else if (entry.path === "modinfo.json") {
      writes.push({
        entry,
        text: releaseModinfo(blobs.get(entry.oid), state.masterModinfo),
      });
    } else if (entry.path === ".prettierignore") {
      writes.push({ entry, text: releasePrettierIgnore(blobs.get(entry.oid)) });
    }
  }
  if (!writes.some((write) => write.entry.path === ".prettierignore")) {
    throw new Error("develop has no .prettierignore to extend");
  }

  const files = writes.map((write, i) => {
    const file = path.join(tmp, "blob-" + i);
    fs.writeFileSync(file, write.text);
    return file;
  });
  const oids = git(["hash-object", "-w", "--no-filters", "--stdin-paths"], {
    input: files.join("\n") + "\n",
  }).split(/\r?\n/);
  const records = writes.map(
    (write, i) => write.entry.mode + " " + oids[i] + "\t" + write.entry.path
  );
  gitRaw(["update-index", "-z", "--index-info"], {
    env,
    input: records.join("\0") + "\0",
  });

  return { tree: git(["write-tree"], { env }), minified };
}

// Runs the checks CI would run on master, against the commit itself. Lint is left out:
// it needs node_modules beside eslint.config.mjs, and master's JS is develop's,
// byte for byte, which `npm run release` linted.
function verifyMaster(commit, tmp) {
  const dir = path.join(tmp, "master");
  git(["worktree", "add", "--detach", dir, commit]);
  try {
    const env = { NODE_PATH: path.join(REPO_ROOT, "node_modules") };
    runNode(
      [
        path.join(REPO_ROOT, "node_modules", "prettier", "bin", "prettier.cjs"),
        "--check",
        ".",
      ],
      {
        cwd: dir,
      }
    );
    run("npm run validate", { cwd: dir, env });
    run("npm test", { cwd: dir, env });
  } finally {
    // Can fail with "Permission denied" while another process holds the folder; the
    // temporary directory is deleted anyway and `git worktree prune` in main() tidies up.
    gitRaw(["worktree", "remove", "--force", dir], { allowFailure: true });
  }
}

function main() {
  const state = preflight(process.argv.slice(2));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "queller-master-"));
  try {
    const built = buildMasterTree(state, tmp);
    if (built.tree === git(["rev-parse", state.originMaster + "^{tree}"])) {
      throw new Error("master already has this tree; nothing to release");
    }
    const message =
      "Release " +
      state.tag +
      "\n\nBuilt by `npm run release:master` from develop at " +
      short(state.develop) +
      ": pa/**/*.json\nminified, with master's identifier and display name.\n";
    const commit = git(
      [
        "commit-tree",
        built.tree,
        "-p",
        state.originMaster,
        "-p",
        state.develop,
        "-F",
        "-",
      ],
      { input: message }
    );
    console.log(
      "\nrelease:master: built " +
        short(commit) +
        " (" +
        built.minified +
        " data files minified)"
    );

    verifyMaster(commit, tmp);

    git([
      "update-ref",
      "-m",
      "release:master " + state.tag,
      MASTER,
      commit,
      state.localMaster || "0".repeat(commit.length),
    ]);

    console.log("\nChanges to master outside pa/:");
    console.log(
      git([
        "diff",
        "--stat",
        state.originMaster,
        commit,
        "--",
        ".",
        ":(exclude)pa",
      ])
    );

    const notes = path.join(
      os.tmpdir(),
      "queller-ai-" + state.tag + "-notes.md"
    );
    fs.writeFileSync(
      notes,
      changelogSection(state.changelog, state.heading.version)
    );
    console.log(
      "\nrelease:master: local master is now " +
        short(commit) +
        ". Nothing is pushed. To ship " +
        state.tag +
        ":\n\n  git push origin master\n  gh release create " +
        state.tag +
        " --target master --title " +
        state.tag +
        ' --notes-file "' +
        notes +
        '" --discussion-category Announcements\n'
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
    gitRaw(["worktree", "prune"], { allowFailure: true });
  }
}

try {
  main();
} catch (error) {
  console.error("\nrelease:master: " + error.message);
  process.exitCode = 1;
}
