"use strict";

// The checks that need the base game on disk.
//
// Kept apart from the other validators because the install is not in this repo and is
// not in CI, so these have to be skippable. When the game cannot be found the run says
// so and passes - a skipped check must never be mistaken for a passing one, so the
// reason is always printed.
//
// Point it at a specific install with an argument or $PA_MEDIA_PATH:
//     node scripts/validate/ai-base-install.js "C:\...\Planetary Annihilation Titans\media"

const fs = require("node:fs");
const path = require("node:path");
const {
  conditionsOf,
  loadTiers,
  runAsScript,
  toPosix,
} = require("../lib/ai-data.js");
const {
  findBaseInstall,
  resolveSpecPath,
  walk,
} = require("../lib/base-install.js");

// Legion Expansion's units are not in the base install and are not meant to be. Every
// one of its unit specs is `l_`-prefixed, which is what makes "unresolved but expected"
// mechanically separable from "unresolved and broken". When Legion is absent its
// spec_ids resolve to nothing and its Custom1 aggregates match nothing, so the whole
// legion/ half of every build tree is inert - the documented design.
const isLegionSpec = (specId) => path.basename(specId).startsWith("l_");

// Unit-type tokens Legion supplies. Custom1 is Legion's faction tag, the counterpart of
// the base game's Custom58; Shield has no base-game equivalent at all.
const LEGION_UNIT_TYPES = new Set(["Custom1", "Shield"]);

function baseUnitTypes(mediaPath) {
  const types = new Set();
  for (const dir of ["pa/units", "pa_ex1/units"]) {
    for (const file of walk(path.join(mediaPath, dir))) {
      if (!file.endsWith(".json")) {
        continue;
      }
      let json;
      try {
        json = JSON.parse(fs.readFileSync(file, "utf8"));
      } catch {
        continue;
      }
      for (const type of json.unit_types || []) {
        types.add(String(type).replace(/^UNITTYPE_/, ""));
      }
    }
  }
  return types;
}

function checkSpecIds(tiers, mediaPath, findings) {
  const seen = new Map(); // spec id -> first place it was named
  for (const tier of tiers) {
    for (const [key, { file, entry }] of tier.unitMap) {
      if (entry.spec_id && !seen.has(entry.spec_id)) {
        seen.set(entry.spec_id, `${tier.name}/${file} ("${key}")`);
      }
    }
  }
  let legion = 0;
  let resolved = 0;
  for (const [specId, at] of seen) {
    if (isLegionSpec(specId)) {
      legion++;
      continue;
    }
    if (resolveSpecPath(mediaPath, specId)) {
      resolved++;
    } else {
      findings.error(
        at,
        `spec_id "${specId}" does not exist in the base install - a PA patch may ` +
          `have moved or removed the unit`
      );
    }
  }
  findings.note(
    `${resolved} base-game spec_id(s) resolved; ${legion} Legion (l_*) spec_id(s) ` +
      `skipped - they resolve only with Legion Expansion installed`
  );
}

// Every place a unit-type expression can appear in a tier, paired with the location a
// finding about it should point at. Four unrelated shapes - unit map entries, platoon
// template squads, placement rules and build conditions - and the caller cares about
// none of that, only that it has seen all of them.
function* unitTypeExpressions(tier) {
  for (const [key, { file, entry }] of tier.unitMap) {
    yield [entry.unit_types, `${tier.name}/${file} ("${key}")`];
  }
  for (const [name, { file, definition }] of tier.templates) {
    for (const squad of definition.units || []) {
      yield [squad.unit_types, `${tier.name}/${file} ("${name}")`];
    }
  }
  for (const { file, entry } of tier.builds) {
    const at = `${tier.name}/${file} ("${entry.name}")`;
    for (const rule of entry.placement_rules?.unit_count_rules || []) {
      yield [rule.unit_type_string, at];
    }
    for (const condition of conditionsOf(entry)) {
      yield [condition.unit_type_string0, at];
      yield [condition.unit_type_string1, at];
    }
  }
}

function collectUnitTypeTokens(tiers) {
  const tokens = new Map(); // token -> first place it was used
  for (const tier of tiers) {
    for (const [expression, at] of unitTypeExpressions(tier)) {
      if (typeof expression !== "string") {
        continue;
      }
      for (const token of expression.split(/[()&|\-+!\s,]+/)) {
        if (token && !tokens.has(token)) {
          tokens.set(token, at);
        }
      }
    }
  }
  return tokens;
}

function checkUnitTypes(tiers, mediaPath, findings) {
  const known = baseUnitTypes(mediaPath);
  const tokens = collectUnitTypeTokens(tiers);
  let unknown = 0;
  for (const [token, at] of tokens) {
    if (known.has(token) || LEGION_UNIT_TYPES.has(token)) {
      continue;
    }
    unknown++;
    findings.error(
      at,
      `unit type "${token}" is carried by no unit spec in the base install and is ` +
        `not one of Legion's (${[...LEGION_UNIT_TYPES].join(", ")}) - an ` +
        `expression naming it matches nothing`
    );
  }
  findings.note(
    `${tokens.size - unknown} of ${tokens.size} unit-type token(s) resolve against ` +
      `${known.size} types carried by base-game unit specs`
  );
}

// PA's VFS unions directory listings across mounts. A file this mod ships wins over the
// base copy of the same name - but a file it stops shipping does not disappear, it
// reverts to whatever the base install froze. So every path in the snapshot has to keep
// an override here, or that path silently starts running the old data again.
function checkShadowCoverage(mediaPath, findings) {
  const snapshot = path.join(mediaPath, "pa_ex1", "ai_queller");
  if (!fs.existsSync(snapshot)) {
    findings.note(
      "the base install has no pa_ex1/ai_queller snapshot - shadow coverage not checked"
    );
    return;
  }
  const shipped = new Set(
    walk(path.join(__dirname, "..", "..", "pa", "ai_queller")).map((f) =>
      toPosix(
        path.relative(path.join(__dirname, "..", "..", "pa", "ai_queller"), f)
      )
    )
  );
  let covered = 0;
  for (const file of walk(snapshot)) {
    const relative = toPosix(path.relative(snapshot, file));
    if (shipped.has(relative)) {
      covered++;
    } else {
      findings.error(
        `pa/ai_queller/${relative}`,
        `is in the base install's snapshot but not shipped here, so the base ` +
          `install's frozen copy loads in its place`
      );
    }
  }
  findings.note(
    `${covered} base-snapshot file(s) still overridden; ${shipped.size - covered} ` +
      `file(s) here are new`
  );
}

function run(findings) {
  const mediaPath = findBaseInstall(process.argv[2]);
  if (!mediaPath) {
    findings.note(
      "SKIPPED - no base game install found. Pass its media folder as an argument " +
        "or set $PA_MEDIA_PATH to run the spec_id, unit-type and shadow-coverage checks."
    );
    return "skipped";
  }
  const tiers = loadTiers();
  checkSpecIds(tiers, mediaPath, findings);
  checkUnitTypes(tiers, mediaPath, findings);
  checkShadowCoverage(mediaPath, findings);
  return `against ${mediaPath}`;
}

module.exports = { run };

if (require.main === module) {
  runAsScript("ai-base-install", run);
}
