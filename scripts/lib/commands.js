"use strict";

// Process runners for the release scripts. Every argument list is built from constants
// and git's own output, never from user text.

const { spawnSync } = require("node:child_process");
const { REPO_ROOT } = require("./ai-data.js");

const withEnv = (env) => (env ? { ...process.env, ...env } : process.env);

function gitRaw(args, options = {}) {
  const result = spawnSync("git", args, {
    cwd: options.cwd || REPO_ROOT,
    env: withEnv(options.env),
    input: options.input,
    maxBuffer: 512 * 1024 * 1024,
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0 && !options.allowFailure) {
    throw new Error(
      "git " + args.join(" ") + " failed: " + String(result.stderr).trim()
    );
  }
  return result;
}

// stdout as text, trailing newline removed.
function git(args, options) {
  return String(gitRaw(args, options).stdout).replace(/\r?\n$/, "");
}

// The commit a ref names, or null when it does not exist.
function revParse(ref) {
  const result = gitRaw(["rev-parse", "-q", "--verify", ref + "^{commit}"], {
    allowFailure: true,
  });
  return result.status === 0 ? String(result.stdout).trim() : null;
}

function tagExists(tag) {
  if (revParse("refs/tags/" + tag)) {
    return "locally";
  }
  const remote = git(["ls-remote", "--tags", "origin", "refs/tags/" + tag]);
  return remote ? "on origin" : null;
}

// npm is npm.cmd on Windows, which spawn only runs through a shell, and a shell takes
// one string. Every command line passed here is a constant.
function run(commandLine, options = {}) {
  console.log("\n> " + commandLine);
  const result = spawnSync(commandLine, {
    cwd: options.cwd || REPO_ROOT,
    env: withEnv(options.env),
    stdio: "inherit",
    shell: true,
  });
  if (result.status !== 0) {
    throw new Error(commandLine + " failed");
  }
}

// A Node script by path, without a shell, so the path needs no quoting.
function runNode(args, options = {}) {
  console.log("\n> node " + args.join(" "));
  const result = spawnSync(process.execPath, args, {
    cwd: options.cwd || REPO_ROOT,
    env: withEnv(options.env),
    stdio: "inherit",
  });
  if (result.status !== 0) {
    throw new Error("node " + args.join(" ") + " failed");
  }
}

module.exports = { git, gitRaw, revParse, run, runNode, tagExists };
