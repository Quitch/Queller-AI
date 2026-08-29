# Tier inventory

What each Queller difficulty tier contains, how the tiers differ, and how heavily each one uses the engine's vocabulary.

**Generated - do not hand-edit.** Run `npm run refresh:inventory` to rebuild it. Prose lives in `scripts/lib/tier-inventory-reference.js`; edit it there.

This file is the only place in the repo that states a count of files, build entries, templates or tag uses. Prose elsewhere - `CLAUDE.md`, `docs/architecture.md`, `docs/ai-engine.md` - links here instead of repeating a number, because a number in hand-written text goes stale on the next data edit and nothing catches it.

For what the values in these tables _mean_, see [engine vocabulary](engine-vocabulary.md). For why the data is shaped this way, see [architecture](architecture.md).

## Tier summary

One row per tier. `Build entries` counts every item across `fabber_builds/`, `factory_builds/` and `platoon_builds/`; `Templates` counts platoon templates defined, not templates used.

| Tier         | Files | Build entries | Templates | Unit map keys | Config            |
| ------------ | ----- | ------------- | --------- | ------------- | ----------------- |
| `q_casual`   | 61    | 274           | 19        | 234           | {"unit_cap":3000} |
| `q_bronze`   | 61    | 285           | 22        | 234           | {"unit_cap":3000} |
| `q_silver`   | 61    | 271           | 30        | 234           | {"unit_cap":3000} |
| `q_gold`     | 71    | 334           | 39        | 234           | {"unit_cap":3000} |
| `q_platinum` | 71    | 346           | 39        | 234           | {"unit_cap":3000} |
| `q_uber`     | 80    | 437           | 48        | 234           | {"unit_cap":3000} |

## Files by directory

The engine scans an `ai_path` recursively and merges every `.json` it finds, so the subdirectory names below are a Queller organisational convention that the loader flattens away - `mla/`, `legion/` and `subpersonalities/` mean nothing to the engine. They matter to a human deciding where an edit goes.

| Directory                         | q_casual | q_bronze | q_silver | q_gold | q_platinum | q_uber |
| --------------------------------- | -------- | -------- | -------- | ------ | ---------- | ------ |
| `fabber_builds/legion`            | 12       | 12       | 12       | 17     | 17         | 17     |
| `fabber_builds/mla`               | 12       | 12       | 12       | 17     | 17         | 17     |
| `platoon_builds`                  | 9        | 9        | 9        | 9      | 9          | 9      |
| `platoon_templates`               | 9        | 9        | 9        | 9      | 9          | 9      |
| `factory_builds/legion`           | 7        | 7        | 7        | 7      | 7          | 7      |
| `factory_builds/mla`              | 7        | 7        | 7        | 7      | 7          | 7      |
| `unit_maps`                       | 4        | 4        | 4        | 4      | 4          | 4      |
| `(tier root)`                     | 1        | 1        | 1        | 1      | 1          | 1      |
| `fabber_builds/subpersonalities`  | -        | -        | -        | -      | -          | 5      |
| `platoon_builds/subpersonalities` | -        | -        | -        | -      | -          | 3      |
| `factory_builds/subpersonalities` | -        | -        | -        | -      | -          | 1      |

## Build entries by consumer

Which of the three build-list consumers each tier's entries belong to. All three share one parser and one item schema; what differs is who executes the item.

| Consumer         | q_casual | q_bronze | q_silver | q_gold | q_platinum | q_uber |
| ---------------- | -------- | -------- | -------- | ------ | ---------- | ------ |
| `fabber_builds`  | 118      | 124      | 121      | 151    | 161        | 205    |
| `factory_builds` | 135      | 133      | 118      | 135    | 135        | 148    |
| `platoon_builds` | 21       | 28       | 32       | 48     | 50         | 84     |

## Where the tiers diverge

Tiers are independent copies with no inheritance, and they have genuinely drifted apart. Only files that are _not_ present in every tier are listed - a file shipped by all of them says nothing about divergence.

A behaviour change usually has to be applied to each tier separately. This table is where to check whether the file you are about to edit even exists in the other five.

| File                                                 | q_casual | q_bronze | q_silver | q_gold | q_platinum | q_uber |
| ---------------------------------------------------- | -------- | -------- | -------- | ------ | ---------- | ------ |
| `fabber_builds/legion/bot.json`                      | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/legion/defense.json`                  | yes      | yes      | yes      | -      | -          | -      |
| `fabber_builds/legion/defense_air.json`              | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/legion/defense_land.json`             | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/legion/defense_naval.json`            | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/legion/defense_orbital.json`          | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/legion/defense_super.json`            | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/legion/land.json`                     | yes      | yes      | yes      | -      | -          | -      |
| `fabber_builds/legion/vehicle.json`                  | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/mla/bot.json`                         | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/mla/defense.json`                     | yes      | yes      | yes      | -      | -          | -      |
| `fabber_builds/mla/defense_air.json`                 | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/mla/defense_land.json`                | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/mla/defense_naval.json`               | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/mla/defense_orbital.json`             | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/mla/defense_super.json`               | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/mla/land.json`                        | yes      | yes      | yes      | -      | -          | -      |
| `fabber_builds/mla/vehicle.json`                     | -        | -        | -        | yes    | yes        | yes    |
| `fabber_builds/subpersonalities/1v1.json`            | -        | -        | -        | -      | -          | yes    |
| `fabber_builds/subpersonalities/air.json`            | -        | -        | -        | -      | -          | yes    |
| `fabber_builds/subpersonalities/bot.json`            | -        | -        | -        | -      | -          | yes    |
| `fabber_builds/subpersonalities/ffa.json`            | -        | -        | -        | -      | -          | yes    |
| `fabber_builds/subpersonalities/tank.json`           | -        | -        | -        | -      | -          | yes    |
| `factory_builds/subpersonalities/orbital.json`       | -        | -        | -        | -      | -          | yes    |
| `platoon_builds/subpersonalities/platoon_air.json`   | -        | -        | -        | -      | -          | yes    |
| `platoon_builds/subpersonalities/platoon_hover.json` | -        | -        | -        | -      | -          | yes    |
| `platoon_builds/subpersonalities/platoon_land.json`  | -        | -        | -        | -      | -          | yes    |

## Files identical across every tier

Same relative path, byte-identical JSON, in all tiers. Nothing keeps these in step - `validate:refs` asserts it for `unit_maps/`, and the rest is convention - so a file dropping off this list is either a deliberate divergence or a mistake.

- `ai_config.json`
- `platoon_builds/structure.json`
- `platoon_builds/titans.json`
- `platoon_templates/structure.json`
- `platoon_templates/titans.json`
- `platoon_templates/transfer.json`
- `unit_maps/ai_unit_map.json`
- `unit_maps/ai_unit_map_x1.json`
- `unit_maps/legion.json`
- `unit_maps/mla.json`

## Task types in use

Set on a build item to say what the resulting platoon does, or - on a fabber item - what kind of construction task it is. See [engine vocabulary](engine-vocabulary.md#task-types) for the full legal set, including the ones nothing here uses.

| Task type                       | q_casual | q_bronze | q_silver | q_gold | q_platinum | q_uber |
| ------------------------------- | -------- | -------- | -------- | ------ | ---------- | ------ |
| `LandAttack`                    | 4        | 9        | 14       | 21     | 20         | 43     |
| `AreaBuild`                     | -        | -        | 4        | 8      | 14         | 18     |
| `BomberAttack`                  | 3        | 3        | 2        | 6      | 7          | 13     |
| `FighterAttack`                 | 1        | 1        | 1        | 5      | 6          | 11     |
| `TeleportFabberToPlanet`        | 4        | 4        | 4        | 4      | 4          | 4      |
| `Scout`                         | 1        | 3        | 3        | 4      | 5          | 5      |
| `OrbitalLaserAttack`            | 3        | 3        | 3        | 3      | 3          | 3      |
| `BuilderAssist`                 | 2        | 2        | 2        | 2      | 2          | 4      |
| `TransportToPlanet`             | 4        | 2        | 2        | 2      | 2          | 2      |
| `OrbitalFabberMoveToPlanet`     | 2        | 2        | 2        | 2      | 2          | 2      |
| `OrbitalFabberMoveToSafePlanet` | 2        | 2        | 2        | 2      | 2          | 2      |
| `Artillery`                     | 1        | 1        | 1        | 1      | 1          | 1      |
| `NavalAttack`                   | 1        | 1        | 1        | 1      | 1          | 1      |
| `Nuke`                          | 1        | 1        | 1        | 1      | 1          | 1      |
| `OrbitalFighterAttack`          | 1        | 1        | 1        | 1      | 1          | 1      |
| `OrbitalRecon`                  | 1        | 1        | 1        | 1      | 1          | 1      |
| `TeleportLandToPlanet`          | 1        | 1        | 1        | 1      | 1          | 1      |
| `TransferOrbitalToPlanet`       | 1        | 1        | 1        | 1      | 1          | 1      |
| `TransferReconToPlanet`         | 1        | 1        | 1        | 1      | 1          | 1      |
| `UnitCannon`                    | 1        | 1        | 1        | 1      | 1          | 1      |

## Squad roles in use

The role a slot's units take inside a platoon. See [engine vocabulary](engine-vocabulary.md#squad-types) for the legal set.

| Squad       | q_casual | q_bronze | q_silver | q_gold | q_platinum | q_uber |
| ----------- | -------- | -------- | -------- | ------ | ---------- | ------ |
| `Defense`   | 7        | 9        | 15       | 15     | 17         | 17     |
| `General`   | 5        | 6        | 12       | 15     | 18         | 20     |
| `Artillery` | 3        | 5        | 11       | 14     | 11         | 19     |
| `Fast`      | 2        | 3        | 9        | 12     | 15         | 15     |
| `Close`     | 2        | 3        | 6        | 6      | 7          | 13     |
| `Suicide`   | 1        | 2        | 5        | 6      | 1          | 7      |
| `Escort`    | 2        | 2        | 2        | 2      | 2          | 2      |

## Personality tags

The subpersonality mechanism: one `ai_path` serves many personalities, and `HasPersonalityTag` conditions select between them.

**Polarity is the thing to read here.** A tag tested with `boolean: false` _excludes_ a subpersonality from a build; tested with `boolean: true` it enables one. Because most tests are negative, a tag that no personality declares does not disable anything - it makes every negative test of it unconditionally true. `Declared by` is read from `ui/mods/com.pa.quitch.qquellerai/new_game.js`; a tag with no declaring personality is one `validate:refs` will fail on.

| Tag           | Declared by                | Positive | Negative | q_casual | q_bronze | q_silver | q_gold | q_platinum | q_uber |
| ------------- | -------------------------- | -------- | -------- | -------- | -------- | -------- | ------ | ---------- | ------ |
| `platoon`     | `qUberFFA`, `qUberPlatoon` | 47       | 54       | -        | -        | -        | -      | -          | 101    |
| `queller`     | 16 personalities           | 62       | -        | 23       | 20       | 5        | 5      | 5          | 4      |
| `tank`        | `qUberTank`                | 2        | 15       | -        | -        | -        | -      | -          | 17     |
| `air`         | `qUberAir`                 | 4        | 10       | -        | -        | -        | -      | -          | 14     |
| `bot`         | `qUberBot`                 | 2        | 12       | -        | -        | -        | -      | -          | 14     |
| `land`        | `qUberLand`                | -        | 10       | -        | -        | -        | -      | -          | 10     |
| `ffa`         | `qUberFFA`                 | 2        | 7        | -        | -        | -        | -      | -          | 9      |
| `orbital`     | `qUberOrbital`             | 4        | 2        | -        | -        | -        | -      | -          | 6      |
| `lateorbital` | `qUber1v1`, `qUberRush`    | -        | 4        | -        | -        | -        | -      | -          | 4      |
| `1v1`         | `qUber1v1`                 | 1        | -        | -        | -        | -        | -      | -          | 1      |

## Templates defined but never built

A platoon template that no `platoon_builds` entry names. Every tier should read zero: the templates files used to be a superset each tier drew from, and the unreferenced remainder was removed. A name appearing here now is a template that stopped being referenced - either the build entry that formed it was deleted or a rename landed on one side only.

| Tier         | Defined | Never built |
| ------------ | ------- | ----------- |
| `q_casual`   | 19      | 0           |
| `q_bronze`   | 22      | 0           |
| `q_silver`   | 30      | 0           |
| `q_gold`     | 39      | 0           |
| `q_platinum` | 39      | 0           |
| `q_uber`     | 48      | 0           |

- `q_casual` - none
- `q_bronze` - none
- `q_silver` - none
- `q_gold` - none
- `q_platinum` - none
- `q_uber` - none
