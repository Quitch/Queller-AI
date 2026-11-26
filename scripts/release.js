"use strict";

// `npm run release`: regenerates the generated docs, stamps the version CHANGELOG.md
// names into modinfo.json with today's date and the install's PA build, then runs
// `verify`. Stops at the first failing step. Commits nothing: the diff is the review.
// Run it on develop. `npm run release:master` is the next step. See docs/releasing.md.

const fs = require("node:fs");
const path = require("node:path");
const { REPO_ROOT } = require("./lib/ai-data.js");
const { findBaseInstall } = require("./lib/base-install.js");
const { run, tagExists } = require("./lib/commands.js");
const { localDate, releaseHeading, stampModinfo } = require("./lib/release.js");

const MODINFO = "modinfo.json";

const REFRESH = [
  // Needs bin_x64/server.exe, so validate:docs cannot check it; this is where it is
  // brought up to date. Fails loudly if a patch moved the evidence docs/ai-engine.md
  // cites.
  "npm run refresh:vocabulary",
  "npm run refresh:inventory",
];

const read = (file) => fs.readFileSync(path.join(REPO_ROOT, file), "utf8");
const write = (file, text) =>
  fs.writeFileSync(path.join(REPO_ROOT, file), text);

function installBuild() {
  const media = findBaseInstall(process.argv[2]);
  if (!media) {
    throw new Error("no PA install found; set PA_MEDIA_PATH");
  }
  const file = path.join(path.dirname(media), "build.txt");
  if (!fs.existsSync(file)) {
    throw new Error("no PA build number at " + file);
  }
  return fs.readFileSync(file, "utf8").trim();
}

function main() {
  const heading = releaseHeading(read("CHANGELOG.md"));
  const tag = "v" + heading.version;
  const tagged = tagExists(tag);
  if (tagged) {
    // Immutable releases are on: a tag name stays used even after its release is
    // deleted, so a used version cannot be shipped again.
    throw new Error(
      tag + " is already tagged " + tagged + "; pick a new version"
    );
  }
  const build = installBuild();

  for (const commandLine of REFRESH) {
    run(commandLine);
  }

  const date = localDate(new Date());
  write(
    MODINFO,
    stampModinfo(read(MODINFO), { version: heading.version, date, build })
  );
  console.log(
    "\nrelease: stamped " + tag + ", date " + date + ", PA build " + build
  );

  run("npm run verify");
  run("git status --short");

  if (heading.date !== date) {
    console.warn(
      "\nrelease: CHANGELOG.md dates " +
        tag +
        " " +
        heading.date +
        ", modinfo.json now says " +
        date
    );
  }
  console.log(
    "\nrelease: " +
      tag +
      " ready. Review the diff, commit and push it to develop, then run" +
      " `npm run release:master`."
  );
}

try {
  main();
} catch (error) {
  console.error("\nrelease: " + error.message);
  process.exitCode = 1;
}
