# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Queller AI is a **server mod** for Planetary Annihilation: TITANS that replaces the
stock skirmish AI with six difficulty tiers (Casual / Bronze / Silver / Gold /
Platinum / Uber, all displayed with a `Q-` prefix) plus Uber subpersonalities, with
full Legion Expansion support. It is almost entirely **declarative JSON data** —
`pa/ai_queller/**` is 405 files of build orders, platoon templates and unit maps —
plus one small UI script that registers the personalities in the lobby. There is no
build step and no compiled code; the tooling is lint, format, and a set of validators
that resolve the data's cross-references and enum values (see "Validating the AI data").

Queller has been **upstreamed into the base game**: a snapshot of this tree ships in
the install at `media/pa_ex1/ai_queller/`, and the personalities are hard-coded in
`media/ui/main/game/new_game/js/ai.js`. This repo is the live upstream and can ship
ahead of the game, and currently does: the base install's 399 files are a **frozen
snapshot**, and as of `develop` only 359 of them are still JSON-equal with this repo — 40
differ and 6 are new here. Expect that gap to widen, not close. It matters because a
stock install without this mod runs the old snapshot, bugs and all: the July 2026
integrity fixes (see "Data integrity") are live only for players who have the mod
installed. See "Relationship to the base install" for how the shadowing actually works.

The base game install (a `media` folder under Steam's `.../Planetary Annihilation
Titans/`) is not part of this repo and lives at a different path on every
contributor's machine. If it is set up as an additional workspace root it will appear
in the "Additional working directories" list at the start of the session, and its own
`CLAUDE.md` will identify it. Treat it as read-only reference. Never edit anything
there.

**This checkout is the live mod install.** It sits in PA's `server_mods/` directory,
so edits take effect the next time the game loads mods — there is nothing to copy or
package for local testing.

## Commands

```bash
npm ci                        # install pinned tooling (once / after deps change)
npm run verify                # everything CI checks: lint:js + format:check + validate + test
npm run lint:js               # eslint .
npm run format:check          # prettier --check .
npm run format:write          # prettier --write .
npm run validate              # all four validate:* checks below, in sequence
npm run validate:schema       # pa/ai_queller/**: shapes, key whitelists, enum values, duplicate JSON keys
npm run validate:refs         # cross-references: to_build/builders/condition targets, tags, unit_map parity
npm run validate:conditions   # build_conditions branches that cannot affect the outcome
npm run validate:base-install # spec_ids, unit types, shadow coverage - needs the base game, skips without it
npm test                      # node --test (runs every validator, plus unit tests for the scanner)
npm run refresh:vocabulary    # regenerate the engine enum snapshot after a PA patch
```

All of it passes clean on `develop`. Treat any failure as a regression from your own
change. `.github/workflows/ci.yml` runs `npm run verify` on every push to `develop` and
`master` and on every PR. (`.sonarcloud.properties` was deliberately removed in
`bca4f420` and is not coming back; that is about SonarCloud specifically, not about CI.)

Run a single test by name:
`node --test --test-name-pattern="findDuplicateKeys" test/ai_data.test.js`.

### Validating the AI data

This is the part worth understanding before editing `pa/**`. See "Data integrity" below
for what it is guarding against.

`scripts/validate/*` reads the whole tier tree and checks the things the engine will not
tell you about: every `to_build`, `builders` and unit-map-naming condition resolves
within its own tier; every `test_type`, `task_type`, `squad`, `base_sort`,
`placement_type`, world layer, influence type and comparison operator is one the engine
recognises; every object key is one the engine reads; no JSON object has a duplicate key;
no build entry sits at `priority` 0; every `HasPersonalityTag` string is declared in
`new_game.js`; and the `unit_maps/` files stay identical across tiers.

`priority: 0` means the build is never selected — GW-AI-Overhaul's
`gwaio_upgrade_singlelaserdefensetower.js` uses exactly that to switch a Queller entry
off at runtime. In a shipped file it is dead data: either the number is wrong or the
entry should go. `Walker Foundry - Fabbers` sat at 0 in Gold and Platinum until
`f5a55850`, and the base install's frozen snapshot still ships it that way, so a stock
install is running that dead build today.

The enum whitelists are not hand-written. `scripts/lib/engine-vocabulary.json` is
extracted from `bin_x64/server.exe` by `npm run refresh:vocabulary`, which walks the
engine's own enum string tables, then unions in whatever the base game's `pa/ai` data
uses — needed because the linker de-duplicates strings, so an enum member spelled the
same as a member of another enum has no separate copy to find. `task_type: "Nuke"`,
`task_type: "Artillery"` and squad `"Artillery"` are all missing from their tables for
that reason and are all valid. The generated file records which values came from where.
Re-run it after a PA patch; the extraction asserts its own anchors and fails loudly
rather than emitting a truncated whitelist.

`validate:conditions` reports **warnings**, not errors. Nothing it finds is wrong today —
a duplicated OR-branch changes no behaviour — but it is the fingerprint of an edit
applied to one copy of a branch and not the other, so the eight it currently reports are
worth reading rather than clearing.

`validate:base-install` needs a PA install and skips without one, saying so in its
output. Point it somewhere specific with an argument or `$PA_MEDIA_PATH`.

None of this evaluates whether a condition is _sensible_ — a threshold set too high is
still only findable with `--ai-log` and play testing (see "Diagnostics").

`.prettierrc` is two settings and **both are load-bearing** — do not "simplify" it back
to Prettier's defaults:

- `"trailingComma": "es5"`. The default, `"all"`, emits trailing commas in function
  arguments and parameter lists. That is ES2017 syntax; Chrome 40 cannot parse it (it
  landed in Chrome 58), so formatting
  `ui/mods/com.pa.quitch.qquellerai/new_game.js` under the default would ship a mod that
  fails to load. `eslint` does catch it, but only as a bare
  `Parsing error: Unexpected token )` from the `ecmaVersion: 6` ceiling — which aborts
  the parse and silently disables every other rule in the file, so it is a backstop, not
  a diagnosis.
- `"endOfLine": "auto"`. `.gitattributes` sets `* text=auto` and Git for Windows sets
  `core.autocrlf=true`, so the checkout is CRLF on disk while Prettier's default is
  `"lf"`. Without this setting `--check` flags **over 400 files** — effectively the whole
  repo — purely on line endings, and `--write` rewrites every one of them. That churn
  does not actually change anything Git would commit: the `text=auto` clean filter
  normalises CRLF→LF before comparing, so `git diff` stays empty. It does, however, mark
  every file modified in `git status` until the index is refreshed, and touches 400+
  mtimes. Never "fix" the warning by rewriting the repo's line endings.

`.prettierignore` covers only `node_modules` and `package-lock.json`. Unlike the sibling
GW-AI-Overhaul repo, `pa/**` here is **not** excluded and the JSON is pretty-printed
(2-space, multi-line), not minified. Keep it that way; the AI data is hand-edited
constantly and readable diffs are the point.

`ui/**` is `var`-only. `2de79d07` converted the last `const` back to `var` because
Chrome 40's handling is not to spec — it accepts sloppy-mode `const` as a legacy
function-scoped extension, so the scoping you write is not the scoping you get, and
`let` is a hard SyntaxError. `es-x/no-block-scoped-variables` enforces this.

Beyond that, the ES5/Chrome 40 rules in `eslint.config.mjs` are the same exhaustive
whitelist used by GW-AI-Overhaul: `es-x/flat/restrict-to-es5` forbids everything
post-ES5 for `ui/**`, and the block below it switches rules **off** one at a time for
what Chrome 40 genuinely has, each annotated with the Chrome release. That list is the
answer to "may I use X?" — no entry means no. `ecmaVersion` is pinned at 6 as a
parse-time backstop.

`test/` runs the AI-data validators and unit-tests the duplicate-key scanner; there is
no harness for `ui/**`, which is why lodash is **not** an npm dependency (removed in
`a35eeefe`): `_` is a PA runtime global, declared in `eslint.config.mjs`'s `globals`
block, and nothing local loads a file that uses it.

### Diagnostics

Lint and format say nothing about whether the AI data is _correct_ — no tooling here
resolves a `to_build` against a unit map or a platoon template. The engine does, and it
will tell you, but only if asked. Launch PA (or a dedicated server) with:

| flag         | effect                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `--ai-log`   | "Enables AI logging." Writes AI diagnostics to the server log, including files the AI tried to load and could not. |
| `--ai-debug` | "Enables AI debugging."                                                                                            |
| `--no-ai`    | "Prevents ticking of AI armies."                                                                                   |

(Descriptions are the engine's own, from `bin_x64/server.exe` and `bin_x64/PA.exe`.)

`--ai-log` is the tool that found the missing `ai_config.json`, and it is the right first
step whenever a name might not resolve (see "Data integrity"). Reach for it before
concluding that a build entry "works" because the AI did not visibly break.

## Relationship to the base install

This is the single most important thing to understand before touching `pa/**`.

The mod ships its tree at `pa/ai_queller/...`. On disk in the install the same tree
lives at `media/pa_ex1/ai_queller/...`, but the TITANS expansion overlay is addressed
through `/pa/...` at runtime, so `/pa/ai_queller/q_uber/...` is the path both the base
game and this mod use. Shipping a file at that path shadows the base game's copy of it.

PA's VFS **unions directory listings across mounts**. A file the mod ships wins over
the base copy of the same name, but a file the mod _deletes_ does not disappear — the
base install's copy is still listed and still loaded. Practical consequences:

- Removing a build entry: edit the file, do not delete it.
- Deleting a whole file is not a way to remove behaviour from a stock install; it just
  reverts that file to whatever the base game shipped.
- Adding a _new_ file is safe and behaves as expected.

The personalities are in the same position. `media/ui/main/game/new_game/js/ai.js`
already defines `qCasual` … `qUberTurtle` (gated behind `api.content.usingTitans()`,
which is why `modinfo.json` sets `titansOnly: true`).
`ui/mods/com.pa.quitch.qquellerai/new_game.js` re-registers all of them with
`_.assign(model.aiPersonalities(), …)`, wholesale replacing the base game's version of
each key, and adds the two the base game does not have: `qRandom` and `qUberRandom`.
So the mod's job for personalities is to _supersede_ the upstreamed copy, and any field
you drop from a personality here reverts to the `Absurd` clone the mod builds from —
not to the base game's Queller definition.

## Architecture

### Repository layout

```text
modinfo.json                    entry point; scenes.new_game -> the one UI script
ui/mods/com.pa.quitch.qquellerai/new_game.js
                                registers the qXxx personalities in the lobby
                                (the only file under ui/ - see "Localisation")
pa/ai_queller/q_{casual,bronze,silver,gold,platinum,uber}/
                                one complete AI tree per difficulty
images/                         badges used by README.md, plus the mod icon
```

Per-tier size, for orientation:

Every tier additionally carries one `ai_config.json` at its root, so file counts are one
higher than the columns below sum to.

| tier        | files | fabber | factory | platoon | templates        | unit\_maps      | build entries |
| ----------- | ----- | ------ | ------- | ------- | ---------------- | --------------- | ------------- |
| q\_casual   | 61    | 24     | 14      | 9       | 9 (42 templates) | 4 (234 entries) | 274           |
| q\_bronze   | 61    | 24     | 14      | 9       | 9 (43)           | 4               | 285           |
| q\_silver   | 61    | 24     | 14      | 9       | 9 (42)           | 4               | 271           |
| q\_gold     | 71    | 34     | 14      | 9       | 9 (44)           | 4               | 334           |
| q\_platinum | 71    | 34     | 14      | 9       | 9 (45)           | 4               | 346           |
| q\_uber     | 80    | 39     | 15      | 12      | 9 (46)           | 4               | 437           |

The tiers are **independent copies**, not a base plus overrides. A fix that applies to
more than one tier has to be applied to each of them separately, and the tiers have
genuinely diverged: Casual/Bronze/Silver keep a single `fabber_builds/*/defense.json`
and a `land.json`, while Gold/Platinum/Uber split those into
`defense_{air,land,naval,orbital,super}.json` plus `bot.json`/`vehicle.json`.
Only `q_uber` has `subpersonalities/` directories.

### How the engine consumes a tier

A personality's `ai_path` (e.g. `/pa/ai_queller/q_uber`) is the root the engine reads
these directories from, **recursively** — the `mla/`, `legion/` and `subpersonalities/`
subdirectories are a Queller organisational convention, not an engine concept, and are
flattened at load:

| directory                  | contents                                           | keyed by                                                 |
| -------------------------- | -------------------------------------------------- | -------------------------------------------------------- |
| `unit_maps/*.json`         | `{"unit_map": {Name: {spec_id \| unit_types}}}`    | friendly name → unit spec path or a unit-type expression |
| `fabber_builds/**/*.json`  | `{"build_list": [...]}`                            | what fabbers and the Commander construct                 |
| `factory_builds/**/*.json` | `{"build_list": [...]}`                            | what factories produce                                   |
| `platoon_builds/**/*.json` | `{"build_list": [...]}` with `task_type`           | what platoons form and what task they take               |
| `platoon_templates/*.json` | `{"platoon_templates": {Name: {units: [squads]}}}` | platoon composition                                      |

`ai_config.json` sits at the root of an AI tree and is read **per `ai_path`, with no
fallback**. A fallback to the base game's `/pa/ai/ai_config.json` was intended but never
implemented, so a tier that omits the file simply runs with no unit cap. Every tier now
ships its own copy (`4fe4946b`), currently `{"unit_cap":3000}` — the same value the base
game uses. Treat this as the model for anything else that lives at the tree root: assume
it does not inherit until proven otherwise.

`neural_networks/` is the open case. Queller ships none, and the three attack networks
exist only at the base game's `/pa/ai/neural_networks/`. The 219 `CanAttackWithPoolUnits`
`Land`/`Bomber`/`Fighter` conditions across this repo behave in play, which suggests the
engine loads those from a fixed path rather than from `ai_path` — but that is inference,
not a verified fact, and the `ai_config.json` case above is exactly why it is worth
checking rather than assuming. Queller otherwise influences the networks only through the
per-personality `neural_data_mod` scalar.

### The unit map is the indirection layer

Nothing in a build list names a `.json` unit spec directly. `to_build` and `builders`
name **unit map keys**, which each tier's `unit_maps/` resolves to either a concrete
`spec_id` or a `unit_types` expression:

```json
"BasicBotFabber":  { "spec_id": "/pa/units/land/fabrication_bot/fabrication_bot.json" }
"AnyBasicFabber":  { "unit_types": "(Fabber & (Basic | Debug)) & Custom58 - Orbital" }
```

Each tier ships four maps: `ai_unit_map.json` (base units), `ai_unit_map_x1.json`
(TITANS units), `mla.json` and `legion.json` (faction-scoped "any factory of type X"
aggregates). 234 entries per tier, identical across tiers.

This is what makes the faction split work. `UNITTYPE_Custom58` is the MLA/base-game
faction tag (131 base unit specs carry it); `UNITTYPE_Custom1` is Legion's, supplied by
the Legion Expansion mod. When Legion is not installed its `spec_id`s do not resolve and
its `Custom1` aggregates match nothing, so the whole `legion/` half of every build tree
is inert. That is why `fabber_builds/legion/` and `fabber_builds/mla/` can sit side by
side under one `ai_path` with no gating condition between them. Legion unit-type
expressions also reference a `Shield` unit type (87 uses) that only Legion defines —
that is expected, not a typo.

### Build specs

Every entry in a `build_list` uses this shape (key frequencies are across all 1,947
entries in the repo):

- **Always**: `name`, `instance_count`, `priority`, `build_conditions`.
- **Usually**: `to_build` (1871), `builders` (1684), `max_num_assisters` (1430).
- **Often**: `placement_rules` (792), `shared_instance_count` (712), `base_sort` (699),
  `task_type` (383), `min_num_assisters` (324).
- **Rarely**: `cross_planet_shared_count` (48) — live and load-bearing, but absent from
  every published doc.

`base_sort` is one of `FromMainBase` (default), `FromPerimeter`, `FromBuilder`.
`placement_rules` carries `placement_type` (`FromBaseCenter` / `FromBasePerimeter` are
the only two used here), `buffer`, and optionally a `threat` block
(`influence_type` / `compare_type` / `radius` / `value`) or `unit_count_rules`
(an array of `unit_type_string` / `alliance` / `compare_type` / `range` / `count`).

`task_type` is documented as a platoon-build field, but Queller also puts it on **fabber**
build specs — `AreaBuild` on the metal-extractor entries in
`q_uber/fabber_builds/{mla,legion}/economy.json`. Task types in use: `LandAttack` (111),
`AreaBuild` (44), `BomberAttack`, `FighterAttack`, `TeleportFabberToPlanet`, `Scout`,
`OrbitalLaserAttack`, `BuilderAssist`, `TransportToPlanet`,
`OrbitalFabberMoveTo{Safe,}Planet`, `NavalAttack`, `OrbitalFighterAttack`, `OrbitalRecon`,
`Nuke`, `UnitCannon`, `Artillery`, `TeleportLandToPlanet`, `TransferReconToPlanet`,
`TransferOrbitalToPlanet`.

For a `task_type` that forms a platoon, `to_build` names a **platoon template**; for
`AreaBuild` it names a **unit map key**. Both namespaces are in play on the same field.

### Build conditions

`build_conditions` is an array of **groups**, and a group is an array of conditions:
groups are OR'd, conditions within a group are AND'd. A build with five groups fires if
any one group is fully satisfied. This is the mechanism behind most of Queller's
"one opening when alone on the planet, another when contested" structure — almost every
entry leads with an `AloneOnPlanet` test in each branch.

Queller uses 82 distinct `test_type`s across 12,376 conditions. The ten heaviest:
`CanFindPlaceToBuild` (1185), `AloneOnPlanet` (1119), `UnitCountOnPlanet` (877),
`CanAffordPotentialDrain` (721), `UnitCountInBase` (698), `EnemySurfacePresenceOnPlanet`
(591), `CanAffordBuildDemand` (540), `PlanetIsRespawnable` (443), `UnitPoolCount` (439),
`CanDeployLandFromBase` (408).

Note what is **not** used: none of the `Need*Factory` / `Need*Fabber` conditions appear
anywhere in this repo. Those are driven by the personality's `percent_vehicle` /
`percent_bot` / `percent_air` / `percent_naval` / `percent_orbital` and
`fabber_to_factory_ratio_*` fields, which Queller inherits unchanged from `Absurd` and
then bypasses — it drives factory and fabber mix with explicit `UnitRatioOnPlanet` /
`UnitCountOnPlanet` / `UnitCountPerPlanetRadius` conditions instead. Changing a
`percent_*` on a Queller personality will therefore do almost nothing. `min_basic_fabbers`
and `min_advanced_fabbers` _are_ live, via `MetMinBasicFabberCount` (36) and
`MetMinAdvancedFabberCount` (57).

Influence types referenced by the threat conditions, in order of use: `Orbital`, `Air`,
`AntiSurface`, `Sub`, `Naval`, `AntiAir`, `Land`, `Nuke`, `Economy`, `Artillery`,
`AntiNuke`, `AntiOrbital`, `AntiSub`. World layers: `WL_AnySurface` (315), `WL_Air` (229),
`WL_Orbital` (14).

### Platoon templates

`{"platoon_templates": {Name: {"units": [ {unit_types, min_count, max_count | percent,
squad} ]}}}`. `units` is the only key any template uses; `target_priorities` is documented
and supported by the engine but appears nowhere in this repo or in the base game's AI
data. Squad types in use: `General` (120), `Artillery` (114), `Defense` (102), `Fast` (78),
`Close` (48), `Suicide` (42), `Escort` (12) — `Transport` is documented but unused here.

Template names are the contract between `platoon_templates/` and `platoon_builds/`;
they are plain strings with no validation, so a rename in one place and not the other
fails silently (see "Data integrity").

### Personalities and subpersonality tags

`ui/mods/com.pa.quitch.qquellerai/new_game.js` builds each personality as
`_.assign(_.clone(model.aiPersonalities().Absurd), overrides)`. Everything not listed in
the overrides comes from `Absurd`. The overrides Queller actually sets are:
`ai_path`, `display_name`, `metal_drain_check`, `energy_drain_check`,
`metal_demand_check`, `energy_demand_check`, `micro_type`, `go_for_the_kill`,
`priority_scout_metal_spots`, `enable_commander_danger_responses`, `neural_data_mod`,
`adv_eco_mod`, `adv_eco_mod_alone`, `personality_tags`, `min_basic_fabbers`,
`min_advanced_fabbers`, plus `factory_build_delay_{min,max}` on Casual and Bronze and
`per_expansion_delay` on Casual alone.

`personality_tags` is an **array replacement**, not a merge, so Queller personalities
drop `Absurd`'s `"Default"` and `"PreventsWaste"` tags. That is intentional: the base
game's own AI data gates on `Tutorial` / `SlowerExpansion` / `PreventsWaste` /
`GalacticWar` / `GWAlly`, none of which Queller's tree uses, and Queller supplies a
complete tree of its own.

The tags Queller's data gates on (via `HasPersonalityTag`, 250 uses) are the real
subpersonality mechanism. Every tier gets `"queller"`; the Uber variants add one or two
more:

| tag           | uses in data | declared by                |
| ------------- | ------------ | -------------------------- |
| `queller`     | 62           | every tier                 |
| `platoon`     | 101          | `qUberPlatoon`, `qUberFFA` |
| `tank`        | 17           | `qUberTank`                |
| `air`         | 14           | `qUberAir`                 |
| `bot`         | 14           | `qUberBot`                 |
| `land`        | 10           | `qUberLand`                |
| `ffa`         | 9            | `qUberFFA`                 |
| `orbital`     | 6            | `qUberOrbital`             |
| `lateorbital` | 4            | `qUber1v1`, `qUberRush`    |
| `1v1`         | 1            | `qUber1v1`                 |
| `naval`       | 12           | **nothing** — see below    |

Polarity matters as much as presence: most tags are tested **negatively**, to exclude a
subpersonality from a build rather than to enable one. `platoon` is 54 negative / 47
positive, `tank` 15/2, `bot` 12/2, `air` 10/4; `land` (10), `lateorbital` (4) and `naval`
(12) are tested negatively and never positively, while `queller` (62) and `1v1` (1) are
only ever positive. A tag no personality declares therefore makes its negative tests
unconditionally **true**, not false.

`qUberTurtle` declares only `"queller"`; its "turtle" behaviour comes entirely from its
lowered `metal_demand_check` / `energy_demand_check`. The README's list of
subpersonalities is written from the player's point of view and does not map one-to-one
onto tags.

`qRandom` and `qUberRandom` are mod-only sentinels with no `ai_path`. `new_game.js`
wraps `model.startGame` and rewrites any slot holding one of them to a concrete
personality just before the game starts — `qUberRandom` picks among the `qUber*`
variants, `qRandom` picks among all non-Uber difficulties plus _one_ sampled Uber
variant, deliberately, so Uber is not oversampled.

### Localisation — never ship `ui/main/_i18n/locales/`

The mod ships **no** locale files, and must not start. `new_game.js` is the only file
under `ui/`.

PA's native locale scanner binds each locale _directory_ to a single mount, so a mod
that supplies one wins it outright and the base game's ~53 files for that locale never
load. Verified by CDP repro: a mod shipping a single file into `en/` collapsed
`i18n_data.strings["en-US"]` from 3182 keys to 2. The symptom is silent for English
authors — a miss returns the key, which _is_ the English source string — so only
non-English players see the whole UI revert to English. Full write-up:
`~/.claude/plans/pa-i18n-locale-shadowing.md`.

This repo used to carry `ui/main/_i18n/locales/{no,pt-BR,sv,tr-TR}/queller.json`,
community translations for the four locales where the base install ships `{}` for
`queller.json` (every other locale has real translations from PA Inc's professional
translation project). They were removed once the mount-shadowing behaviour was
confirmed. The only working route for new translations is to upstream them into the base
install's `queller.json`, as GW-AI-Overhaul does with `gw-overhaul.json`.

Display names in `new_game.js` are `!LOC:` strings resolved against that base bundle, so
a new personality is translatable only if the base install already holds its exact key,
in that exact casing. The removed files had drifted well out of sync — they still carried
`Q-Uber Aggressive`, `Q-Uber Naval` and `Q-Uber Neural` (long-deleted personalities) and
were missing `Q-Uber Land`, `Q-Uber Platoon`, `Q-Uber Turtle`, `Q-Random` and
`Q-Uber Random` — which is the drift to expect from any translation the mod cannot
itself carry.

## Documentation sources

Three sources, in decreasing order of currency. Where they disagree, the game files win.

1. <https://planetaryannihilation.com/ai/> — the current official page. Covers the AI
   brain, unit maps, economy manager, the full influence-type table, build lists,
   base sort, build-condition types with their real-time/planet/system scoping, placement
   rules, and start-location evaluation. Items marked `(NEW)` there postdate the wiki.
2. The palobby wiki (`wiki.palobby.com/wiki/Planetary_Annihilation_AI_*`) — archived
   2021-09-05, but still the only place with the full enumerations: build conditions by
   category, platoon task types with their default target priorities, platoon/squad types,
   unit-type strings, unit types, world layers, recon types, tool types. Fetch pages with
   `curl` and strip the HTML; `action=raw` 404s on this wiki.
3. `media/ui/main/game/new_game/js/ai.js` — its opening comment block is the
   authoritative personality schema, and its `paAI` object is the authoritative default
   values for `Easy` … `Absurd`.

### Documented but absent

Per the working rule that anything documented and unfindable was planned rather than
shipped — checked against both this repo and the whole base install:

- Personality fields `min_base_radius`, `max_base_radius`, `min_intel_point_spacing`,
  `max_intel_point_spacing`, `idle_fabber_processing_limit`, `idle_fabber_build_delay`,
  `idle_fabber_pool_delay` — set nowhere, by anything.
- `starting_location_radius` (wiki) does not exist; the real field is
  `starting_location_evaluation_radius`, set to 400 on `Absurd` and inherited by every
  Queller tier.
- `percent_land` — the wiki itself flags it as historical; present in a handful of base
  files, unused here.
- Fabber build spec `include_unsafe_bases`, and the `debug` flag on build conditions —
  no occurrences anywhere.
- Platoon template `target_priorities` — supported per the docs, used by neither Queller
  nor the base game's AI data.
- The `ai_config.json` fallback to `/pa/ai/` for an AI tree that does not ship one. It
  was intended but never implemented, so a tier without one just runs uncapped. The
  engine does report it — the missing file shows up in the server log under `--ai-log`
  (see "Diagnostics"), which is how it was found. Fixed here by giving every tier its own
  copy; see "How the engine consumes a tier".

Conversely, `cross_planet_shared_count` is used 48 times here and 25 times in the base
game's AI data but appears in no published documentation.

The wiki's unit-type list is also incomplete. Base TITANS specs additionally use
`UNITTYPE_Amphibious`, `Interplanetary`, `Radar`, `RadarJammer`, `TacticalDefense`,
`Vehicle` and `WaterHover`, and the `Custom*` range goes at least to `Custom58` rather
than the documented `Custom1`–`Custom4`.

## Data integrity

`to_build`, `builders`, `test_type` and template names are plain strings the engine looks
up at load, so a rename in one file and not another is invisible to `eslint`, to
`prettier`, and to a casual read. A sweep in July 2026 found seven such breaks, all of
them years old and all still present in the base install's snapshot. They are fixed here:

| break                                                                                                                                        | fixed in               |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Boom_Attack_Large` template missing its `_Queller` suffix in all six tiers, while three tiers' builds asked for `Boom_Attack_Large_Queller` | `52f5eefd`             |
| `Swarm_Raid_Small` / `Swarm_Raid_Medium` templates absent                                                                                    | `26623b00`, `d845bb09` |
| `Teleporter_Attack_Alone_Queller` referenced by `q_casual` but never defined                                                                 | `d40cd03d`             |
| `AnyLegionBasicFabber` / `AnyLegionAirFactory` — transpositions of `AnyLegionFabberBasic` / `AnyLegionFactoryAir`                            | `9333c932`, `2a65efd9` |
| `UnitCountonPlanet` (lowercase `o`) in `q_casual/factory_builds/*/orbital.json`                                                              | `c800d3cd`             |
| `q_silver` `Teleporter_Attack_Queller.units` a JSON object where every other template uses an array                                          | `235596f8`             |
| `naval` — a `HasPersonalityTag` no personality declared, left over from a deleted `qUberNaval`                                               | `918d70ba`             |

The current tree resolves cleanly: **0** unresolved `to_build`, **0** unresolved
`builders`, no `test_type` casing typos, every template's `units` an array, and all ten
surviving personality tags declared by some personality.

That sweep is now `npm run validate` (see "Validating the AI data"), so it runs on every
push rather than when someone thinks to do it. All seven breaks above are in the class it
catches — including the `UnitCountonPlanet` casing typo, which is the one that most
looks like working data. Run it after any rename. `--ai-log` (see "Diagnostics") remains
the authoritative version of the same question and is worth reaching for when the answer
matters, since it sees the engine's actual resolution rather than a reimplementation of
it.

Two things that look like breaks and are not:

- **Templates defined but never built.** Normal, and heaviest in the lower tiers — Casual
  ships the full `Land_Attack_*` set but its `platoon_builds/land.json` only ever forms
  `Land_Attack_Max_Queller`, because Casual runs one army. The templates file is a
  superset each tier draws from.
- **`q_gold` has a `Swarm_Raid_Medium_Queller` build but no Small**, unlike Platinum and
  Uber. Deliberate. Do not "complete the set".

## Conventions

- Shipped UI code must stay Chrome 40 compatible; the `eslint.config.mjs` whitelist is
  the reference (see "Commands").
- `pa/**` JSON stays pretty-printed and Prettier-formatted. Do not minify it, and do not
  add a `.prettierignore` entry for it.
- Two-space indent throughout, camelCase for JS.
- Changes touch only what the request needs — no drive-by reformatting.
- A behaviour change usually has to be replicated across the tiers it applies to; there
  is no inheritance between them. Say explicitly which tiers a change covers.
- `CHANGELOG.md` is player-facing and hand-written, newest first, `## vX.Y.Z - YYYY-MM-DD`,
  one bullet per behaviour change in plain language ("Uber avoids over-investing in
  anti-orbital defence"). Update it for anything a player would notice.
- Licence is CC BY 4.0; the README asks that derivative work credit Quitch's Queller AI.

## Release process

Work happens on `develop`; `master` is the published state. `modinfo.json` is the only
file that differs structurally between them: `develop` carries
`"identifier": "com.pa.quitch.qQuellerAI-dev"` / `"display_name": "Queller AI DEV"` so a
dev build can be installed alongside the published mod, and `master` carries the real
`com.pa.quitch.qQuellerAI` / `Queller AI`. Releasing is a "Prep for release" commit
(bump `version`, `build` to the PA build tested against, and `date`; write the
`CHANGELOG.md` section) followed by a merge into `master` — **without** taking the
`-dev` identifier with it.

`.gitattributes` marks the tooling files `export-ignore`, so `git archive` produces a
ZIP containing only what the game needs — `modinfo.json`, `pa/`, `ui/`, `README.md`,
`CHANGELOG.md`, `LICENSE`. Any new dev-only file (config, script, docs) should be added
to that list; anything the game loads at runtime must stay out of it. Note `images/` is
export-ignored while `README.md`, which links the badge PNGs, is not — the badges resolve
on GitHub, not in the ZIP.

## Galactic War integration

Galactic War never selects a `qXxx` personality. GW-AI-Overhaul builds its own
personalities and points them at this repo's build data: `shared/referee_ai_paths.js`
resolves `/pa/ai_queller/` + a tier — `q_uber/` for enemies, `q_silver/` with Smart
Subcommanders, `q_bronze/` otherwise — and `gw_play/referee_ai.js` then rewrites those
build files in memory with tech-card-driven descriptors before handing the result to
the server. Consequences worth knowing before editing:

- **Only `q_uber`, `q_silver` and `q_bronze` are reachable from Galactic War.** Changes
  to the other three tiers are skirmish-only.
- GWO supplies the `queller` tag itself (`faction/personalities.js` sets
  `["Default", "GWAlly", "SlowerExpansion", "queller", "GalacticWar"]`), and for
  Guardian/mirror-mode enemies `gw_play/referee_config_setup.js` adds one subpersonality
  tag derived from the highest `percent_*` — `tank`, `bot`, `orbital` or `air`. Its
  `default:` branch adds nothing and carries the comment "Queller has no naval
  personality tag", which independently corroborates the vestigial `naval` tag noted
  above. GW-only tags (`GWAlly`, `GalacticWar`, `SlowerExpansion`) are live in that
  context, though nothing in this repo tests them.
- GWO's `ops` table (`append`, `prepend`, `replace`, `remove`, `new`, `squad`) matches
  build entries by `name` and by unit map key, so renaming a build entry in those three
  tiers is a cross-repo change.
