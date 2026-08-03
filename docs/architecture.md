# Queller AI architecture

How this mod is built, for someone about to change it.

This document assumes you know how the engine consumes AI data. If you do not, read
[the AI engine](ai-engine.md) first - it explains the load pipeline, the build-list
format and the personality schema that everything below takes for granted.

Counts live in [the tier inventory](tier-inventory.md), which is generated. Nothing
here states a number.

---

## 1. What the mod ships

```text
modinfo.json                                    entry point
ui/mods/com.pa.quitch.qquellerai/new_game.js    registers the personalities in the lobby
pa/ai_queller/q_casual/                         one complete AI tree per difficulty
pa/ai_queller/q_bronze/
pa/ai_queller/q_silver/
pa/ai_queller/q_gold/
pa/ai_queller/q_platinum/
pa/ai_queller/q_uber/
images/                                         difficulty badges, used by README.md
```

That is the whole runtime payload. Everything else in the repo - `scripts/`, `test/`,
`docs/`, the tooling dotfiles - is `export-ignore`d in `.gitattributes` and never reaches
a player.

Two properties of that list are load-bearing:

**The mod does not touch the stock AI.** There is no `pa/ai/` here. The vanilla
difficulties run the base game's tree, unmodified, exactly as they would without this
mod installed.

**The mod ships no locale files, and must not start.** See the Localisation section of
`CLAUDE.md` - a mod that supplies one file into a locale directory wins that whole
directory and collapses the base game's strings for it.

## 2. The relationship with the base install

Queller has been **upstreamed into PA: TITANS**. A snapshot of this tree ships in the
game at `media/pa_ex1/ai_queller/`, and the personalities are hard-coded in
`media/ui/main/game/new_game/js/ai.js`.

The TITANS overlay is addressed as `/pa/...` at runtime even though it is stored under
`pa_ex1/` on disk, so `pa/ai_queller/q_uber/...` here and
`media/pa_ex1/ai_queller/q_uber/...` there are **the same runtime path**. Shipping a file
at that path shadows the game's copy.

This repo is the live upstream and ships ahead of the game. The snapshot in the install
is frozen, so a player without the mod is running older data - including bugs fixed here.

**PA's VFS unions directory listings across mounts.** A file the mod ships wins over the
base copy of the same name; a file the mod _deletes_ does not disappear, because the base
install's copy is still listed and still loaded. Therefore:

- To remove a build entry, **edit the file**. Do not delete it.
- Deleting a whole file reverts that path to whatever the base game shipped.
- Adding a new file is safe and behaves as expected.

`npm run validate:base-install` enforces the consequence: every path present in the
install's snapshot must also be shipped here, or that path silently reverts.

The personalities are in the same position. `new_game.js` re-registers all of them with
`_.assign(model.aiPersonalities(), ...)`, wholesale replacing the base game's version of
each key. So the mod's job for personalities is to _supersede_ the upstreamed copy - and
any field dropped from a personality here falls back to the `Absurd` clone the mod builds
from, not to the base game's Queller definition.

## 3. Anatomy of a tier

An `ai_path` points at a tier directory. The engine reads it recursively and flattens
subdirectories away, so the layout below is organisation for humans, not structure the
engine sees.

| Path                            | Contents                                                    |
| ------------------------------- | ----------------------------------------------------------- |
| `ai_config.json`                | the unit cap; read per `ai_path` with no fallback           |
| `unit_maps/ai_unit_map.json`    | base-game units, friendly name to spec                      |
| `unit_maps/ai_unit_map_x1.json` | TITANS units, following the base game's additive convention |
| `unit_maps/mla.json`            | MLA faction aggregates, gated `& Custom58`                  |
| `unit_maps/legion.json`         | Legion faction aggregates, gated `& Custom1`                |
| `fabber_builds/mla/`            | what fabbers and the Commander construct, MLA               |
| `fabber_builds/legion/`         | the same for Legion                                         |
| `factory_builds/mla/`           | what factories produce, MLA                                 |
| `factory_builds/legion/`        | the same for Legion                                         |
| `platoon_builds/`               | which platoons form and what task each takes                |
| `platoon_templates/`            | what those platoons are made of                             |
| `*/subpersonalities/`           | `q_uber` only - builds gated on a subpersonality tag        |

Within `fabber_builds/` and `factory_builds/` the filenames are by subject - `economy`,
`intel`, `offense`, `orbital`, `titans`, and so on. `platoon_builds/` and
`platoon_templates/` share a filename set by domain: `air`, `hover`, `land`, `naval`,
`orbital`, `scout`, `structure`, `titans`, `transfer`.

The `_commander` suffix (`economy_commander`, `misc_commander`) separates builds whose
`builders` list is the Commander from the general case. That split is convention; the
engine only cares about the `builders` field.

## 4. Tiers are independent copies

**There is no inheritance between tiers.** Each is a complete tree. A fix that applies to
more than one has to be applied to each of them separately, and a change should say
explicitly which tiers it covers.

They have genuinely diverged rather than being copies of one another - the lower tiers
keep a single `defense.json` and `land.json` where the upper tiers split defence five
ways and separate `bot.json` from `vehicle.json`, and only `q_uber` has
`subpersonalities/`. The full presence matrix is in
[the tier inventory](tier-inventory.md#where-the-tiers-diverge); check it before
assuming the file you are editing exists elsewhere.

Some files _are_ identical across every tier, notably the four `unit_maps/` files.
`validate:refs` asserts that for the unit maps specifically; for the rest it is only
convention, and [the inventory](tier-inventory.md#files-identical-across-every-tier)
lists what currently holds.

## 5. The faction split

Both factions' build data sits side by side under one `ai_path` with **no gating
condition between them**. That works because the gating happens in the unit map instead:

```json
"AnyBasicFabber":       { "unit_types": "(Fabber & (Basic | Debug)) & Custom58 - Orbital" }
"AnyLegionFabberBasic": { "unit_types": "(Fabber & (Basic | Debug) & Custom1) - Orbital" }
```

`Custom58` is the base game's faction marker; `Custom1` is Legion's, supplied by the
Legion Expansion mod. With Legion not installed, its `spec_id`s do not resolve and its
`Custom1` aggregates match nothing, so every `legion/` build is inert. Nothing needs to
detect Legion or switch on it.

Legion's unit-type expressions also reference a `Shield` unit type that only Legion
defines. That is expected, not a typo, and `validate:base-install` whitelists it.

## 6. One `ai_path`, many personalities

`new_game.js` registers eighteen personalities. Six are the difficulty tiers, one per
`ai_path`. Ten more are Uber subpersonalities that **all share `q_uber`** and differ only
in `personality_tags` and a few economy scalars. Two - `qRandom` and `qUberRandom` - are
sentinels with no `ai_path` at all.

Every personality is built as:

```js
_.assign(_.clone(model.aiPersonalities().Absurd), overrides);
```

so anything not overridden comes from `Absurd`. Three consequences:

**`personality_tags` is an array replacement, not a merge.** Queller personalities
therefore drop `Absurd`'s `Default` and `PreventsWaste` tags. That is deliberate - the
base game's data gates on those, and Queller supplies a complete tree of its own.

**Inherited fields Queller does not use are still inherited.** `percent_vehicle`,
`percent_bot`, `fabber_to_factory_ratio_*` and friends come from `Absurd` and then go
unused, because none of the `Need*Factory` / `Need*Fabber` conditions they drive appear
anywhere in this repo. Queller drives its factory and fabber mix with explicit
`UnitRatioOnPlanet` / `UnitCountOnPlanet` / `UnitCountPerPlanetRadius` conditions
instead. **Changing a `percent_*` on a Queller personality will do almost nothing.**
`min_basic_fabbers` and `min_advanced_fabbers` _are_ live, through
`MetMinBasicFabberCount` and `MetMinAdvancedFabberCount`.

**Tag polarity is the mechanism.** Most `HasPersonalityTag` tests in this data are
_negative_ - they exclude a subpersonality from a build rather than enabling one. So a
tag no personality declares does not switch anything off; it makes every negative test
of it unconditionally **true**. Per-tag polarity and declaring personalities are in
[the inventory](tier-inventory.md#personality-tags), and `validate:refs` fails on any tag
the data gates on that nothing declares - a real break it was written to catch.

`qUberTurtle` is the instructive case: it declares no tag beyond `queller`. Its turtling
comes entirely from lowered `metal_demand_check` and `energy_demand_check`. The README's
subpersonality list is written for players and does **not** map one-to-one onto tags.

`qRandom` and `qUberRandom` are resolved by a wrapper around `model.startGame` that
rewrites any slot holding one into a concrete personality just before the game starts.
`qUberRandom` samples the `qUber*` variants; `qRandom` samples all non-Uber difficulties
plus _one_ sampled Uber variant, deliberately, so Uber is not oversampled.

---

## 7. Worked example: a metal extractor

This traces one real build entry end to end. Every path, key and name below is live data
you can open.

**1. The player picks Q-Uber.** `ui/mods/com.pa.quitch.qquellerai/new_game.js` has
already registered `qUber` with `ai_path: "/pa/ai_queller/q_uber"`. The whole personality
object travels to the sim unvalidated and reaches `createAIBrain`.

**2. The engine loads the tier.** `/pa/ai_queller/q_uber` resolves through the VFS to
this repo's `pa/ai_queller/q_uber/`. Its five data directories are scanned recursively -
so `fabber_builds/mla/economy.json`, `fabber_builds/legion/economy.json` and
`fabber_builds/subpersonalities/1v1.json` all merge into one flat build list.

**3. A fabber goes idle**, and `FabberManager` looks for the highest-priority item it
satisfies. One candidate, from `pa/ai_queller/q_uber/fabber_builds/mla/economy.json`:

```json
{
  "name": "Metal Extractor - Alone",
  "to_build": "BasicMetalExtractor",
  "instance_count": 3,
  "max_num_assisters": 1,
  "shared_instance_count": "BasicMetal",
  "priority": 600,
  "base_sort": "FromBuilder",
  "builders": ["AnyBasicFabber", "AnyAdvancedFabber", "OrbitalFabber"],
  "build_conditions": [
    [
      { "test_type": "PlanetIsGasGiant", "boolean": false },
      { "test_type": "AloneOnPlanet", "boolean": true },
      { "test_type": "CanFindMetalSpotToBuildBasic", "boolean": true }
    ]
  ],
  "placement_rules": {
    "placement_type": "FromBaseCenter",
    "threat": {
      "influence_type": "AntiSurface",
      "compare_type": "<",
      "radius": 10,
      "value": 50
    }
  },
  "task_type": "AreaBuild"
}
```

**4. Is this fabber eligible?** `builders` names three unit-map keys. Two are sets and
one is a single unit - all resolved in `unit_maps/ai_unit_map.json`:

```json
"AnyBasicFabber":    { "unit_types": "(Fabber & (Basic | Debug)) & Custom58 - Orbital" }
"AnyAdvancedFabber": { "unit_types": "(Fabber & (Advanced | Debug)) & Custom58 - Orbital" }
"OrbitalFabber":     { "spec_id": "/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json" }
```

The `& Custom58` is why a Legion fabber will not pick up this MLA entry.

**5. Are the conditions met?** One group, so all three must hold: not a gas giant, alone
on this planet, and a basic metal spot is available. `AloneOnPlanet` is the fork that
splits nearly every Queller opening into an uncontested and a contested branch - here it
is the _uncontested_ variant, which is why it can afford `priority: 600`.

**6. What gets built?** `to_build` is `BasicMetalExtractor`. Because `task_type` is
`AreaBuild` rather than a platoon-forming task, this name is a **unit-map key**, not a
template - the two-namespace rule from
[the engine doc](ai-engine.md#to_build-spans-two-namespaces). It resolves to:

```json
"BasicMetalExtractor": { "spec_id": "/pa/units/land/metal_extractor/metal_extractor.json" }
```

This is also one of the keys the engine looks up by name for its faction-replacement
pass, so it must exist in every tier.

**7. Where does it go?** `base_sort: "FromBuilder"` orders candidate sites from the
fabber rather than from the base. `placement_rules` then rejects any site within 10 of
50-or-more anti-surface threat. `CanFindMetalSpotToBuildBasic` already ran the same
machinery speculatively in step 5, which is what stops the AI committing a fabber to a
build it cannot place.

**8. How many at once?** `instance_count: 3` allows three of _this entry_ in flight, but
`shared_instance_count: "BasicMetal"` puts it in a budget shared with every other entry
declaring `BasicMetal` across the tier. That shared name, not the per-entry number, is
what actually paces early expansion.

## 8. Worked example: a suicide-bomber platoon

The combat path, from `pa/ai_queller/q_uber/platoon_builds/land.json`:

```json
{
  "name": "Boom Attack Platoon Small",
  "to_build": "Boom_Attack_Small_Queller",
  "instance_count": -1,
  "priority": 115,
  "build_conditions": [
    [
      {
        "test_type": "HasPersonalityTag",
        "string0": "platoon",
        "boolean": false
      },
      { "test_type": "EnemySurfacePresenceOnPlanet", "boolean": true },
      {
        "test_type": "UnitPoolCount",
        "unit_type_string0": "Bot & SelfDestruct",
        "compare0": ">=",
        "value0": 1
      },
      {
        "test_type": "CanAttackWithPoolUnitsLand",
        "string0": "WL_AnySurface",
        "string1": "WL_AnySurface",
        "unit_type_string0": "(Mobile | Structure) - Wall - (Naval - Hover)"
      }
    ]
  ],
  "task_type": "LandAttack"
}
```

**The first condition is negative polarity in the wild.** `platoon` tested `false` means
this entry is _disabled_ for `qUberPlatoon` and `qUberFFA`, the two personalities that
declare that tag. They get their own platoon behaviour from
`platoon_builds/subpersonalities/`; everyone else gets this.

**The fourth condition consults a neural network.** `CanAttackWithPoolUnitsLand` asks the
`land_attack` network whether the units available in the pool can meaningfully attack the
given target types across the given world layers. It is a build condition that runs
inference.

`to_build` here _is_ a platoon template, because `LandAttack` forms a platoon. From
`platoon_templates/land.json`:

```json
"Boom_Attack_Small_Queller": {
  "units": [
    {
      "unit_types": "(Bot & SelfDestruct) - Advanced",
      "min_count": 0,
      "max_count": 3,
      "squad": "Suicide"
    },
    {
      "unit_types": "Bot & SelfDestruct & Advanced & Custom1",
      "min_count": 0,
      "max_count": 3,
      "squad": "Artillery"
    }
  ]
}
```

Both slots are optional (`min_count: 0`), so the platoon forms with whatever exists. The
second slot is Legion-only - `& Custom1` - so on an MLA game this template is effectively
the first slot alone. That is the faction split reaching all the way into a template.

`PlatoonManager` pulls matching units from the unassigned pool, assigns each slot's
`squad` role, and hands the platoon its `LandAttack` task. From there the `land_attack`
network chooses targeting policy, affected in some way by the personality's
`neural_data_mod` - see [the engine doc](ai-engine.md#neural_data_mod) for why "in some
way" is as far as that can honestly be put.

---

## 9. Validation

Four checks, run together by `npm run validate` and again by `npm test`. They exist
because none of this data is typed: `to_build`, `builders`, template names and
`test_type` are plain strings the engine looks up at load and silently drops when they
miss. A rename applied to one file and not another produces no error and no visible
symptom beyond a build never firing.

| Check                   | Catches                                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `validate:schema`       | shapes, unknown keys, bad enum values, duplicate JSON keys, `priority: 0`                    |
| `validate:refs`         | unresolvable `to_build` / `builders` / condition targets, undeclared tags, unit-map drift    |
| `validate:conditions`   | condition groups that cannot affect the outcome                                              |
| `validate:docs`         | a generated document gone stale, a broken cross-reference                                    |
| `validate:base-install` | unresolvable `spec_id`s, unknown unit types, shadow-coverage gaps (needs the game installed) |

A July 2026 sweep found seven such breaks, all years old and all still present in the
base game's snapshot. That sweep is now these checks. `CLAUDE.md` has the detail.

None of it evaluates whether a condition is _sensible_. A threshold set too high is
still only findable with `--ai-log` and play testing.
