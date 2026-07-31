"use strict";

// Locating the base game install, and resolving runtime `/pa/...` paths against it.
//
// The install is not part of this repo and sits somewhere different on every machine -
// and on none at all in CI. Everything here is therefore best-effort: callers get null
// when it cannot be found and are expected to skip, not fail. Checks that need it say
// so out loud when they skip, so a green run never quietly means "we did not look".

const fs = require("node:fs");
const path = require("node:path");

const CANDIDATES = [
  process.env.PA_MEDIA_PATH,
  "C:/Program Files (x86)/Steam/steamapps/common/Planetary Annihilation Titans/media",
  "C:/Program Files/Steam/steamapps/common/Planetary Annihilation Titans/media",
  "/Applications/Planetary Annihilation Titans.app/Contents/Resources/media",
  `${process.env.HOME || ""}/.steam/steam/steamapps/common/Planetary Annihilation Titans/media`,
];

function isMedia(candidate) {
  return (
    !!candidate &&
    fs.existsSync(path.join(candidate, "pa")) &&
    fs.existsSync(path.join(candidate, "pa_ex1"))
  );
}

// Explicit argument wins, then $PA_MEDIA_PATH, then the usual install locations.
function findBaseInstall(explicit) {
  for (const candidate of [explicit, ...CANDIDATES]) {
    if (isMedia(candidate)) {
      return candidate;
    }
  }
  return null;
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) {
    return out;
  }
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

// A spec id is written the way the running game addresses it - "/pa/units/...". The
// TITANS expansion is overlaid onto the same namespace, so a `/pa/x` id can be
// satisfied by either `media/pa/x` or `media/pa_ex1/x`, with the expansion winning.
// Returns the on-disk path, or null.
function resolveSpecPath(mediaPath, specId) {
  const relative = String(specId).replace(/^\//, "");
  const candidates = [
    path.join(mediaPath, "pa_ex1", relative.replace(/^pa\//, "")),
    path.join(mediaPath, relative),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

module.exports = { findBaseInstall, walk, resolveSpecPath };
