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
npm run validate:docs         # docs/ freshness and cross-references
npm run validate:base-install # spec_ids, unit types, shadow coverage - needs the base game, skips without it
npm test                      # node --test (runs every validator, plus unit tests for the scanner)
npm run refresh:vocabulary    # regenerate the engine enum snapshot after a PA patch
npm run refresh:inventory     # regenerate docs/tier-inventory.md after a pa/** change
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

The same command also writes **`docs/engine-vocabulary.md`** — the human-readable half.
Every whitelist, the JSON keys it governs, how often each value is used here versus in
the base game's own AI data, the parameters each build condition is actually written
with, and what the value means where a cited source says so. Read it when you need to
know whether the engine has a condition for something before writing one; the "Used
here" column doubles as a map of which engine features Queller has never reached for.

Both generated files are written through Prettier by the generator, so regenerating
never breaks `format:check`. Meanings live in `scripts/lib/vocabulary-reference.js`,
which is curated by hand and follows one rule: a note exists only where a cited source
says it, never inferred from a value's name — a blank means nobody has documented it,
not that the value does nothing. Primary source is the palobby wiki's AI Build
Conditions page; its AI Build Specs sibling was down when the notes were compiled, which
is why the build-spec-side categories carry structural notes rather than per-value prose.

`validate:conditions` reports **warnings**, not errors. Nothing it finds is wrong today —
a duplicated OR-branch changes no behaviour — but it is the fingerprint of an edit
applied to one copy of a branch and not the other, so the eight it currently reports are
worth reading rather than clearing.

`validate:base-install` needs a PA install and skips without one, saying so in its
output. Point it somewhere specific with an argument or `$PA_MEDIA_PATH`.

`validate:docs` regenerates `docs/tier-inventory.md` in memory and fails if the committed
copy differs, then checks that every relative link and heading anchor in `docs/`,
`README.md` and this file resolves. It cannot check `docs/engine-vocabulary.md` for
freshness — that one is generated from `bin_x64/server.exe`, which CI does not have — and
it prints that it skipped rather than passing quietly. Refresh that one after a PA patch.

`npm run refresh:vocabulary` does one more thing besides emitting whitelists: it asserts
the `server.exe` string-layout claims that `docs/ai-engine.md` cites as evidence but that
produce no whitelist, listed in that script's `ADJACENCY` table. If a patch moves them
the refresh fails and names the documentation section that has become unsourced. Add an
entry there whenever the docs come to rest on a new layout observation.

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
`docs/architecture.md` explains the mechanism; these are the rules that follow from it.

The mod's tree at `pa/ai_queller/...` and the install's at `media/pa_ex1/ai_queller/...`
are **the same runtime path** — `/pa/ai_queller/...` — so shipping a file there shadows
the base game's copy. But PA's VFS **unions directory listings across mounts**, so a
file the mod _deletes_ does not disappear; the base install's copy is still listed and
still loaded.

- Removing a build entry: edit the file, do not delete it.
- Deleting a whole file is not a way to remove behaviour from a stock install; it just
  reverts that file to whatever the base game shipped.
- Adding a _new_ file is safe and behaves as expected.

The personalities are in the same position: the base game already defines
`qCasual` … `qUberTurtle` (gated behind `api.content.usingTitans()`, which is why
`modinfo.json` sets `titansOnly: true`), and `new_game.js` supersedes all of them. Any
field you drop from a personality here reverts to the `Absurd` clone the mod builds
from — **not** to the base game's Queller definition.

## Architecture

`docs/ai-engine.md` covers the engine; `docs/architecture.md` covers this mod's data and
walks two real build entries end to end. What follows is only what bites while editing.

### Repository layout

```text
modinfo.json                    entry point; scenes.new_game -> the one UI script
ui/mods/com.pa.quitch.qquellerai/new_game.js
                                registers the qXxx personalities in the lobby
                                (the only file under ui/ - see "Localisation")
pa/ai_queller/q_{casual,bronze,silver,gold,platinum,uber}/
                                one complete AI tree per difficulty
images/                         badges used by README.md, plus the mod icon
docs/                           see "Documentation"
```

The tiers are **independent copies**, not a base plus overrides. A fix that applies to
more than one tier has to be applied to each of them separately, and the tiers have
genuinely diverged: Casual/Bronze/Silver keep a single `fabber_builds/*/defense.json`
and a `land.json`, while Gold/Platinum/Uber split those into
`defense_{air,land,naval,orbital,super}.json` plus `bot.json`/`vehicle.json`.
Only `q_uber` has `subpersonalities/` directories. `docs/tier-inventory.md` has the
presence matrix and every count; do not restate a count here.

### How the engine consumes a tier

`docs/ai-engine.md` explains the load pipeline. The parts that bite when editing this
repo:

`ai_config.json` sits at the root of an AI tree and is read **per `ai_path`, with no
fallback**. A fallback to the base game's `/pa/ai/ai_config.json` was intended but never
implemented, so a tier that omits the file simply runs with no unit cap. Every tier now
ships its own copy (`4fe4946b`), currently `{"unit_cap":3000}` — the same value the base
game uses. Treat this as the model for anything else that lives at the tree root: assume
it does not inherit until proven otherwise.

The `mla/`, `legion/` and `subpersonalities/` subdirectories are a Queller organisational
convention, not an engine concept — the engine scans an `ai_path` recursively and merges
every `.json` it finds. So a new filename **adds**, and a filename matching a base-game
file **replaces**.

`neural_networks/` was the open case here. Queller ships none, and the three attack
networks exist only at the base game's `/pa/ai/neural_networks/`. The evidence now points
to an `ai_path`-relative lookup with a fallback to that fixed path — see
`docs/ai-engine.md`, "Where the networks load from", which states the evidence, marks it
as layout inference rather than fact, and names the experiment that would settle it.
`npm run refresh:vocabulary` asserts that evidence still holds. Queller otherwise
influences the networks only through the per-personality `neural_data_mod` scalar. **`1.0`
is neutral, not the bottom of a difficulty ramp** — above it handicaps, below it makes the
AI more conservative with its forces, and every tier from Uber up sits at exactly `1.0`.
The lone exception, qUberFFA's `0.85`, is a deliberate FFA behaviour choice rather than a
strength increase. The underlying mechanism is undocumented, so do not tune this on a
theory of what it does; see `docs/ai-engine.md`, "`neural_data_mod`".

### The unit map is the indirection layer

Nothing in a build list names a `.json` unit spec directly — `to_build` and `builders`
name **unit map keys**, resolved by each tier's `unit_maps/` to a `spec_id` or a
`unit_types` expression. That indirection is what makes the faction split work, and the
four maps are identical across tiers (`validate:refs` asserts it).

The consequence to hold on to: `UNITTYPE_Custom58` is the MLA/base-game faction tag and
`UNITTYPE_Custom1` is Legion's, so with Legion absent its `spec_id`s do not resolve, its
`Custom1` aggregates match nothing, and the whole `legion/` half of every tree is inert.
That is why `fabber_builds/legion/` and `fabber_builds/mla/` sit side by side under one
`ai_path` with **no gating condition between them** — do not add one. Legion expressions
also reference a `Shield` unit type only Legion defines; expected, not a typo.

### Build specs

The item schema is in `docs/ai-engine.md`; the legal values of every enum-valued field
are in `docs/engine-vocabulary.md`, generated from the engine's own tables. Three things
specific to this repo:

- `cross_planet_shared_count` is live and load-bearing here, and absent from every
  published doc.
- `task_type` is documented as a platoon-build field, but Queller also puts it on
  **fabber** build specs — `AreaBuild` on the metal-extractor entries in
  `q_uber/fabber_builds/{mla,legion}/economy.json`.
- For a `task_type` that forms a platoon, `to_build` names a **platoon template**; for
  `AreaBuild` it names a **unit map key**. Both namespaces are in play on the same field,
  which is why `validate:refs` accepts a hit in either.

### Build conditions

`build_conditions` is an array of **groups**, and a group is an array of conditions:
groups are OR'd, conditions within a group are AND'd. A build with five groups fires if
any one group is fully satisfied. This is the mechanism behind most of Queller's
"one opening when alone on the planet, another when contested" structure — almost every
entry leads with an `AloneOnPlanet` test in each branch.

Note what is **not** used: none of the `Need*Factory` / `Need*Fabber` conditions appear
anywhere in this repo. Those are driven by the personality's `percent_vehicle` /
`percent_bot` / `percent_air` / `percent_naval` / `percent_orbital` and
`fabber_to_factory_ratio_*` fields, which Queller inherits unchanged from `Absurd` and
then bypasses — it drives factory and fabber mix with explicit `UnitRatioOnPlanet` /
`UnitCountOnPlanet` / `UnitCountPerPlanetRadius` conditions instead. Changing a
`percent_*` on a Queller personality will therefore do almost nothing. `min_basic_fabbers`
and `min_advanced_fabbers` _are_ live, via `MetMinBasicFabberCount` and
`MetMinAdvancedFabberCount`.

Per-value usage counts, for this repo and for the base game's own AI data, are in
`docs/engine-vocabulary.md`.

### Platoon templates

`{"platoon_templates": {Name: {"units": [ {unit_types, min_count, max_count | percent,
squad} ]}}}`. `units` is the only key any template uses; `target_priorities` is documented
and supported by the engine but appears nowhere in this repo or in the base game's AI
data.

Template names are the contract between `platoon_templates/` and `platoon_builds/`;
they are plain strings with no validation, so a rename in one place and not the other
fails silently (see "Data integrity").

### Personalities and subpersonality tags

`docs/architecture.md` has the mechanism. The traps:

Each personality is `_.assign(_.clone(model.aiPersonalities().Absurd), overrides)`, so
**anything not overridden comes from `Absurd`** — including `percent_*` and
`fabber_to_factory_ratio_*`, which Queller then bypasses entirely (see "Build
conditions"). `personality_tags` is an **array replacement, not a merge**, so Queller
personalities deliberately drop `Absurd`'s `Default` and `PreventsWaste`.

Polarity matters as much as presence: most tags are tested **negatively**, to exclude a
subpersonality from a build rather than to enable one. A tag no personality declares
therefore makes its negative tests unconditionally **true**, not false — which is why
`validate:refs` treats an undeclared tag as an error rather than dead weight. The
per-tag table is generated into `docs/tier-inventory.md`.

`qUberTurtle` declares only `"queller"`; its "turtle" behaviour comes entirely from its
lowered `metal_demand_check` / `energy_demand_check`. The README's list of
subpersonalities is written from the player's point of view and does not map one-to-one
onto tags.

`qRandom` and `qUberRandom` are mod-only sentinels with no `ai_path`, resolved by a
wrapper around `model.startGame`. `qRandom` samples all non-Uber difficulties plus
_one_ sampled Uber variant, deliberately, so Uber is not oversampled.

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

## Documentation

`docs/` holds the reference material, and is `export-ignore`d so none of it ships. Read
the one that matches the question rather than loading all of it:

| File                        | Answers                                                  | Generated |
| --------------------------- | -------------------------------------------------------- | --------- |
| `docs/README.md`            | Which document holds which fact; the confidence markers. | no        |
| `docs/ai-engine.md`         | How PA's AI engine works, independent of this mod.       | no        |
| `docs/architecture.md`      | How this mod is built; two end-to-end worked examples.   | no        |
| `docs/engine-vocabulary.md` | Every legal enum value and its meaning.                  | yes       |
| `docs/tier-inventory.md`    | What is in each tier; **every count**.                   | yes       |

**Counts live only in `docs/tier-inventory.md`.** A number written into this file or any
other hand-written document is a bug: the per-tier table that used to sit in
"Repository layout" had already drifted from the data before anyone noticed, and
`docs/engine-vocabulary.md` was separately found to be recording hundreds of uses of a
`base_sort` value that `f6ce9466` had removed entirely. `npm run validate:docs` now
checks the inventory against the data and checks every cross-reference in `docs/`,
`README.md` and this file still resolves.

`docs/architecture.md` is the fastest way into the data for a new contributor; the two
worked examples trace a real build entry from the lobby pick to the placed unit.

### Documentation sources

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
