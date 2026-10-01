# The Planetary Annihilation AI engine

How PA: TITANS runs an AI army, from the moment a personality is picked in the lobby to
the moment a platoon chooses a target.

This document is about the **engine**, not about Queller. It applies equally to the
stock difficulties, to Queller, to Legion Expansion and to any other mod that ships AI
data. Queller appears only as a worked example, and is marked as such when it does. For
Queller's own data, see [architecture](architecture.md).

Claims here are sourced. Anything not directly readable from a cited artefact carries a
confidence marker - see [how to read these documents](README.md#confidence-markers).

---

## 1. Where the AI lives

**The AI is entirely C++.** There is no AI logic in `server-script/`, and none in the
UI. Build planning, base placement, platoon formation, threat evaluation and neural
inference all happen inside `bin_x64/server.exe`.

The entire JavaScript-to-AI surface is one call, in
`media/server-script/states/playing.js`:

```js
_.forEach(armies, function (army) {
  var desc = army.desc;
  if (desc.ai) army.sim.createAIBrain(desc.personality);
});
```

That is it. A personality object goes in; nothing comes back out. Everything the AI
subsequently does is decided by C++ reading JSON.

**The scriptable surface is therefore exactly:**

| What                   | Where                               |
| ---------------------- | ----------------------------------- |
| Five data directories  | under a personality's `ai_path`     |
| `ai_config.json`       | at the root of that `ai_path`       |
| `neural_networks/`     | see [section 9](#9-neural-networks) |
| The personality object | built in UI JavaScript              |

Nothing else. There is no AI scripting API, no hook, no callback. A mod changes AI
behaviour by changing data, or by changing the personality object that selects which
data is read.

This is the single most important thing to understand before trying to modify PA's AI,
and it is why every other section of this document is about a JSON format.

### Engine components

These class names appear in `server.exe`'s symbol strings, so the components exist and
are named as below. The binary says nothing about which owns which. The hierarchy here
follows the one published source that does: the palobby wiki's "AI Implementation"
outline, which nests the components exactly as drawn below. **Inferred (behaviour).**
Every "Scope" cell rests on that outline plus the method names the binary carries for
each class; nothing in the binary contradicts it, and nothing in the binary states it.

```text
Game Server --createAIBrain--> AIBrain (one per AI army) <.. signals .. Army
                               |-- EconomyManager
                               |-- interplanetary request manager
                               `-- PlanetManager (one per planet)
                                   |-- FabberManager
                                   |-- StrategicManager
                                   |   |-- InfluenceMap
                                   |   `-- recon manager (ReconDatabase / IntelManager)
                                   |-- PlatoonManager
                                   |   `-- Platoon (one per platoon)
                                   `-- BaseManager (one per base)
                                       `-- FactoryManager
```

The solid edges are ownership. The dashed edge is not: the brain is created by the server
(section 2) and then observes its army, and the outline draws that as signals flowing from
the army into the brain rather than as the brain owning the army.

| Component                          | Scope                                | Consumes                                                 |
| ---------------------------------- | ------------------------------------ | -------------------------------------------------------- |
| `AIBrain`                          | One per army                         | `ai_path`, everything below                              |
| `AIPersonality::adjustPersonality` | One per army                         | the personality object                                   |
| `EconomyManager`                   | Per army                             | backs the economy conditions                             |
| interplanetary request manager     | Per army                             | cross-planet unit and recon requests - see below         |
| `PlanetManager`                    | Per planet                           | recon and land-unit need, base creation, main-base moves |
| `FabberManager`                    | Per planet                           | `fabber_builds/`                                         |
| `StrategicManager`                 | Per planet                           | attack targets, threat, expansion sites, planet weapons  |
| `InfluenceMap`                     | Per planet, under `StrategicManager` | backs every threat condition                             |
| `ReconDatabase` / `IntelManager`   | Per planet, under `StrategicManager` | backs the intel conditions                               |
| `PlatoonManager` / `Platoon`       | Per planet / per platoon             | `platoon_builds/`, `platoon_templates/`                  |
| `BaseManager`                      | Per base                             | `placement_rules`, build locations, metal spots, rally   |
| `FactoryManager`                   | Per base                             | `factory_builds/`                                        |
| `NeuralNetwork::feedForward`       | Per army                             | `neural_networks/*.json`                                 |

Read scope from the outline, not from method names. `StrategicManager::chooseFocusTarget`
and `StrategicManager::evaluatePlanetAsKineticWeapon` read as system-wide decisions, and
an earlier version of this table put the manager at army scope on that basis; the outline
puts it under the planet manager, with the per-planet `InfluenceMap` beneath it, which is
the simpler reading. Likewise `FabberManager` sits beside the base managers, not inside
one: a planet's fabbers are one pool, and `FabberManager::findUnitToAssist` picks across
the planet's bases.

Two boxes in the outline have no class string of their own. The **interplanetary request
manager** is visible only through what it would carry: `AVInterplanetaryRequest`,
`AVLandUnitRequest`, `AVOrbitalUnitRequest`, `AVOrbitalReconRequest` and
`AVAirSupportRequest` are all present, as are the recon-assistance signals
`ThisPlanetNeedsReconAssistance` and `OtherPlanetNeedsReconAssistance`. **Inferred
(layout).** The **recon manager** has no `ReconManager` string either; `ReconDatabase` and
`IntelManager::tick` are the nearest, and `InfluenceMap::onReconChange` is the point where
recon feeds threat. Whether those are one class or two is an **open question**; an
`--ai-log` run grepped for either name would settle it.

The JSON parsers are separate and named too: `AIBuildSpecList`, `AIPlacementSpec`,
`UnitMapSpec`, `PlatoonTemplateSpecList`, and `BuildCondition::checkCondition`. Their
error strings are the most useful thing in the list, because they are what you will see
in a server log - see [section 12](#12-diagnostics).

### Supporting server-script files

These handle AI _plumbing_, not AI decisions:

| Path                                     | Role                                                              |
| ---------------------------------------- | ----------------------------------------------------------------- |
| `server-script/states/playing.js`        | `createAIBrain(personality)` - the only entry point               |
| `server-script/states/lobby.js`          | owns `player.personality`, `setAIPersonality`, `landing_policy`   |
| `server-script/states/playing_shared.js` | copies `army.personality` into the sim army descriptor            |
| `server-script/states/landing.js`        | `selectAISpawnsAndStartGame()`, honours `landing_policy`          |
| `server-script/ai_names_table.js`        | flavour names for AI players                                      |
| `server-script/states/neural_net.js`     | the headless training state - see [section 9](#9-neural-networks) |
| `server-script/states/gw_lobby.js`       | Galactic War AI slot validation and naming                        |

---

## 2. How a personality reaches the sim

A personality is a plain JavaScript object. It is never validated, never filtered, and
never converted on its way to the engine.

1. `ui/main/game/new_game/js/ai.js` - `ai_types()` returns the personality map.
2. `ui/main/game/new_game/new_game.js` - `self.aiPersonalities = ko.observable(ai_types())`.
3. `addAI` sends `add_ai` with `options: {ai: true, personality: <the whole object>}`;
   changing the dropdown sends `set_ai_personality {id, ai_personality: <the whole object>}`.
4. `server-script/states/lobby.js` - `playerMsg_setAIPersonality` stores it verbatim as
   `self.personality`.
5. `lobby.js` `finalize()` puts `personality` into the army descriptor.
6. `server-script/states/playing_shared.js` copies it into `armyDesc.personality`.
7. `server-script/states/playing.js` - `army.sim.createAIBrain(desc.personality)`.
8. C++ `AIPersonality::adjustPersonality` reads the fields it knows.

**Nothing in that chain inspects the object.** Keys the engine does not recognise are
ignored; any field it does recognise is honoured, whoever set it.

That single fact is the whole AI-personality extension mechanism. A mod adds a new AI
difficulty by registering a scene script for `new_game` that mutates the personality map
and points `ai_path` at data it ships. No server-side code is required to _define_ a
personality - though shipping the data under `pa/` is a server mod concern.

---

## 3. The load pipeline

When `AIBrain` starts, it reads seven locations, rooted at `personality.ai_path`. A
personality with no `ai_path` uses `/pa/ai`, which is how every stock difficulty works.

The order is fixed:

1. `<ai_path>/ai_config.json`
2. neural networks `land_attack`, `bomber_attack`, `fighter_attack`
3. `<ai_path>/unit_maps`
4. `<ai_path>/platoon_templates`
5. `<ai_path>/fabber_builds`
6. `<ai_path>/factory_builds`
7. `<ai_path>/platoon_builds`

followed by a resolution pass that looks up the `BasicMetalExtractor` and
`AdvancedMetalExtractor` unit-map keys and logs a "faction replacement" if a mod
redirected either.

The evidence is a contiguous run of strings in `server.exe`, in exactly that order:
`/ai_config.json`, `Failed to load AI Config file!`, `land_attack`, `bomber_attack`,
`fighter_attack`, `/unit_maps`, `Loading unit map %s`, `/platoon_templates`,
`/fabber_builds`, `/factory_builds`, `/platoon_builds`, then the two
`Found faction replacement '...MetalExtractor' => '` messages. That run is asserted by
`npm run refresh:vocabulary`, so a PA patch that reorders it fails the refresh rather
than silently invalidating this section.

### Three consequences worth internalising

**The five data directories are recursive scans, and every `.json` found is merged.**
There is no index file, no manifest and no load order within a directory. This is why
mods add AI data by dropping files in rather than by editing a registry - and it is
unlike `pa/units/unit_list.json`, which _is_ an index a mod must reproduce wholesale.

**Every subdirectory name is a human convention the loader flattens away.** Queller's
`mla/`, `legion/` and `subpersonalities/` directories mean nothing to the engine; nor
do the base game's `_additional` and `_x1` filename suffixes. A tier is one flat
namespace of unit-map keys, template names and build entries, regardless of which file
or folder each came from.

**Adding and shadowing are different operations.** Because PA's VFS resolves a path to
one winning file but merges directory _listings_:

- A file at the same relative path as a base-game file **replaces** it.
- A file with a **new name** in the same directory is **added**, and its `build_list`
  concatenates with the others.

`fabber_defense_builds.json` and `fabber_defense_builds_additional.json` both load.
`pa/ai/fabber_builds/fabber_land_builds.json` and its `pa_ex1/` counterpart do not -
the overlay wins. That is the entire reason the `_additional` / `_x1` convention exists.

### What does not inherit

`ai_config.json` is read per `ai_path`, **with no fallback**. A tree that omits it runs
with no unit cap rather than picking up `/pa/ai/ai_config.json`. A fallback appears to
have been intended and was never implemented; the missing file shows up in the server
log under `--ai-log`, which is how it was found.

Generalise from that: **assume nothing at the root of an AI tree inherits until proven
otherwise.** The one place that rule is currently in tension is neural networks, in
[section 9](#9-neural-networks).

---

## 4. `ai_config.json`

The whole of `media/pa/ai/ai_config.json`:

```json
{ "unit_cap": 3000 }
```

`unit_cap` is the only key the engine reads, and it caps how many units this AI army
keeps alive. TITANS does not override the file - there is no `pa_ex1/ai/ai_config.json`.

---

## 5. Build lists

`fabber_builds/`, `factory_builds/` and `platoon_builds/` all use **one** format and
**one** parser. What differs is who executes the resulting item. The top level is always:

```json
{ "build_list": [ { ...item... }, { ...item... } ] }
```

### Item fields

| Field                       | Type     | Meaning                                                                                                                   |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `name`                      | string   | Label, and what `--ai-log` prints. **Not an identifier** - duplicates are legal.                                          |
| `to_build`                  | string   | A unit-map key, or a platoon template name. Optional - an item without one is a pure task.                                |
| `instance_count`            | int      | Maximum simultaneous live-plus-queued instances of _this item_. `-1` is unlimited.                                        |
| `shared_instance_count`     | string   | A **named counter**, not a number. Every item declaring the same string competes for one budget.                          |
| `cross_planet_shared_count` | bool     | Count the shared counter across all planets rather than per planet.                                                       |
| `priority`                  | int      | Higher wins. Only ever compared within the same consumer, so the scales differ between fabber, factory and platoon lists. |
| `builders`                  | string[] | Unit-map keys naming which units may execute this item. Fabber and factory lists only.                                    |
| `min_num_assisters`         | int      | Lower bound on extra fabbers pulled onto the build.                                                                       |
| `max_num_assisters`         | int      | Upper bound.                                                                                                              |
| `base_sort`                 | enum     | Which reference point orders candidate build sites.                                                                       |
| `task_type`                 | enum     | What the resulting platoon does, or what kind of construction task this is.                                               |
| `placement_rules`           | object   | Where the thing may go. See [section 7](#7-placement).                                                                    |
| `build_conditions`          | array    | When the item may fire. See below.                                                                                        |
| `enabled`                   | bool     | Parsed by the engine and used by no stock data - a free on/off switch.                                                    |

For the legal values of `base_sort` and `task_type`, see
[engine vocabulary](engine-vocabulary.md).

Two traps in that table:

- **`shared_instance_count` is a group name.** Writing a number there does not cap
  anything; it creates a counter group named `"3"`.
- **`priority: 0` means the item is never selected.** It is not "lowest priority". A
  shipped entry at 0 is dead data.

### `to_build` spans two namespaces

For a task that forms a platoon, `to_build` names a **platoon template**. For
`AreaBuild` - which sits on fabber entries - it names a **unit-map key**. The same field
addresses two different namespaces depending on the task, and nothing in the file says
which.

### Items with no `to_build`

An item can omit `to_build` entirely and exist only to issue a task. The stock
economy-dump valve is the clearest example:

```json
{
  "name": "Fabber Assist",
  "instance_count": -1,
  "priority": 1,
  "builders": [
    "Commander",
    "AnyBasicFabber",
    "AnyAdvancedFabber",
    "OrbitalFabber"
  ],
  "build_conditions": [
    [{ "test_type": "CanAffordBuildDemand" }],
    [
      { "test_type": "CurrentMetalEfficiency", "compare0": ">", "value0": 1 },
      { "test_type": "MetalStorageFrac", "compare0": ">", "value0": 0.2 },
      { "test_type": "CurrentEnergyEfficiency", "compare0": ">=", "value0": 1 }
    ]
  ],
  "task_type": "BuilderAssist"
}
```

---

## 6. Build conditions

```text
build_conditions : [ AND-group, AND-group, ... ]   // groups are OR'd
AND-group        : [ condition, condition, ... ]   // conditions are AND'd
```

An item fires when **any one group** has **all** its conditions true. This is the
mechanism behind most "one opening when alone on the planet, another when contested"
structures.

A condition object uses only these keys:

| Key                                      | Meaning                                                         |
| ---------------------------------------- | --------------------------------------------------------------- |
| `test_type`                              | Required. Which question to ask.                                |
| `boolean`                                | For predicate tests, the expected answer. Omitted means `true`. |
| `unit_type_string0`, `unit_type_string1` | Unit-type expressions - see [section 8](#8-unit-maps).          |
| `string0`, `string1`, `string2`          | Threat layer, unit-map key, world layer, tag or network name.   |
| `compare0`, `compare1`                   | Comparison operators.                                           |
| `value0`, `value1`                       | Right-hand side of the comparison.                              |

There is no `!=`. Negation is `boolean: false`.

**The complete list of condition types, what each one means, and how heavily the stock
AI and this repo use each, is in [engine vocabulary](engine-vocabulary.md#build-condition-types).**
That document is generated from the engine's own enum table, so it is the authority; this
one deliberately does not duplicate it.

Two things about it worth knowing up front:

- The engine supports condition types that no shipped data uses. The "Base AI" and
  "Used here" columns in that table are a map of which engine features have never been
  reached for.
- An unrecognised `test_type` is not a load error. The engine logs
  `BuildCondition: Unknown condition type: %s` under `--ai-log` and the condition simply
  never passes, which is indistinguishable from a condition that is merely unmet. This
  is why a casing typo like `UnitCountonPlanet` can survive for years.

---

## 7. Placement

`placement_rules` decides _where_ a structure may go. It sits on fabber build items.

```json
"placement_rules": {
  "buffer": 2,
  "placement_type": "FromMainBasePerimeter",
  "unit_count_rules": [
    { "unit_type_string": "Structure & MetalProduction", "alliance": "Ally", "compare_type": ">=", "range": 50, "count": 1 },
    { "unit_type_string": "Structure & Basic & AirDefense", "alliance": "Ally", "compare_type": "<", "range": 100, "count": 1 }
  ],
  "threat": { "influence_type": "AntiSurface", "compare_type": "<", "radius": 35, "value": 5 }
}
```

| Key                | Meaning                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| `placement_type`   | The origin the search radiates from. Optional.                                                            |
| `buffer`           | Extra clearance around the footprint.                                                                     |
| `threat`           | Rejects candidate sites where summed threat inside `radius` fails the comparison.                         |
| `unit_count_rules` | Each rule counts allied or enemy units of a type within `range` and rejects sites failing the comparison. |

The example above reads: _place this within 50 of a metal extractor, but not within 100
of existing basic air defence, and not where anti-surface threat is 5 or more._ That is
how the stock AI spreads anti-air over its economy instead of stacking it.

`CanFindPlaceToBuild` runs an item's own `placement_rules` speculatively - it asks "is
there anywhere legal to put this?" without committing. It is one of the two most-used
conditions in all of PA's AI data, and it is the reason a build with impossible
placement rules fails silently rather than looping.

---

## 8. Unit maps

A unit map is the **indirection layer between build lists and unit specs**. Every
`to_build`, every entry in `builders`, and the `string0` of `CanFindPlaceToBuild` and
`CanAffordPotentialDrain` is a _friendly name_ resolved here. **Nothing in a build list
ever names a `.json` spec path directly.**

```json
{
  "unit_map": {
    "BasicBotFabber": {
      "spec_id": "/pa/units/land/fabrication_bot/fabrication_bot.json"
    },
    "AnyBasicFabber": { "unit_types": "(Fabber & (Basic | Debug)) - Orbital" }
  }
}
```

Two mutually exclusive forms:

| Form         | Resolves to                                                                     |
| ------------ | ------------------------------------------------------------------------------- |
| `spec_id`    | Exactly one unit. The engine warns if a set is used where one spec is required. |
| `unit_types` | A _set_, resolved at runtime against every unit's `unit_types` array.           |

That indirection is what lets one build list serve multiple factions. It is also what
lets a faction be _absent_ without breaking anything: an unresolvable `spec_id` and a
`unit_types` expression matching nothing both just mean the builds that used them never
fire.

Some keys are **required by the engine**, because C++ looks them up by name:
`BasicMetalExtractor` and `AdvancedMetalExtractor` (the faction-replacement pass, which
logs `One or both metal extractor names did not resolved to a spec. This is bad!`), plus
`ControlModule` and the basic factory and launcher keys.

### Unit-type expressions

Used by `unit_types`, `unit_type_string0/1`, `unit_type_string`, and the networks'
`outputToTypes`.

| Operator | Meaning              |
| -------- | -------------------- |
| `&`      | AND                  |
| `\|`     | OR                   |
| `-`      | set difference (NOT) |
| `( )`    | grouping             |

Tokens are unit-type names with the `UNITTYPE_` prefix stripped. The source of truth is
each unit spec's own `unit_types` array - for example
`media/pa/units/land/assault_bot/assault_bot.json` carries `UNITTYPE_Bot`,
`UNITTYPE_Mobile`, `UNITTYPE_Offense`, `UNITTYPE_Land`, `UNITTYPE_Basic` and others.

A canonical expression, meaning "raid-capable bots":

```text
(Bot & Mobile) - Fabber - AirDefense - Construction - Artillery - Heavy - SelfDestruct
```

**Faction tags are just unit types.** `Custom58` marks MLA/base-game units; `Custom1`
marks Legion units. Gating content by faction is done by adding the tag to the unit
map's `unit_types` entries, not by adding conditions to build lists.

---

## 9. Neural networks

Three networks, named in the engine and therefore not renameable: `land_attack.json`,
`bomber_attack.json`, `fighter_attack.json`. Each is a few megabytes.

### What they are

Serialised feed-forward multilayer perceptrons, run by `NeuralNetwork::feedForward`.
The topology is readable from the files' own top-level keys, which makes this the
best-evidenced part of this document:

| Field                  | `land_attack` | `bomber_attack` | `fighter_attack` |
| ---------------------- | ------------- | --------------- | ---------------- |
| `inputNodes`           | 77            | 77              | 77               |
| `hiddenNodes`          | 385           | 385             | 385              |
| `hiddenLayers`         | 2             | 2               | 2                |
| `outputNodes`          | 46            | 14              | 9                |
| `hiddenActivationType` | `Exponential` | `Exponential`   | `Exponential`    |
| `outputActivationType` | `Sigmoid`     | `Sigmoid`       | `Sigmoid`        |

### What they decide

**Target selection, not strategy.** This is the most commonly misunderstood part of PA's
AI: the networks do not decide what to build, when to expand or where to attack. They
choose how a platoon picks its target once it already has one to pick from.

Each output is a _targeting policy_, and the parallel `outputToTypes` array gives the
unit-type filter that policy applies. `land_attack`'s 46 outputs are roughly 15 target
classes crossed with three engagement modes (plain, kiting, actively microing), plus
`RunAway`. Representative entries:

| Output                        | `outputToTypes`                                              |
| ----------------------------- | ------------------------------------------------------------ |
| `Attack Weakest`              | `(Mobile - Air - Orbital) \| (Structure - (Orbital - Land))` |
| `Attack Fabber`               | `Fabber - Air - Orbital`                                     |
| `Attack Resource`             | `Structure & (MetalProduction \| EnergyProduction)`          |
| `Attack Anti Surface Defense` | `Structure & SurfaceDefense`                                 |
| `Attack Commander`            | `Commander`                                                  |
| `RunAway`                     | _(empty)_                                                    |

The `CanProvideAirSupportWithPoolUnits` condition passes a network name in `string0`, so
build data can query a network directly.

### `neural_data_mod`

**`1.0` is neutral.** The scale is centred, not monotonic - which is the thing to get
right before touching it, because the values look like a difficulty ramp and are not one.

| Value   | Effect                                                                 |
| ------- | ---------------------------------------------------------------------- |
| `> 1.0` | Handicap. The higher, the worse the AI plays.                          |
| `= 1.0` | Neutral. Every top difficulty settles here.                            |
| `< 1.0` | More conservative with its forces. Not a further increase in strength. |

The values: vanilla Easy `2.0`, Normal / Normal+ / Hard `1.5`, Relentless `1.2`, Absurd
`1.0`; Queller qCasual `2`, qBronze `1.6`, qSilver `1.45`, qGold `1.3`, qPlatinum `1.15`,
qUber `1`. Galactic War's table mirrors the vanilla figures.

**The ramp terminates at `1.0` rather than passing through it.** Absurd, qUber and nine
of the ten qUber\* subpersonalities sit at exactly `1.0`. The single sub-`1.0` value -
qUberFFA's `0.85` - was set deliberately by this mod's author to make that personality
**more conservative with its forces in a free-for-all**, where committing an army leaves
you exposed to a third party. It is a behavioural adjustment, not an extra notch of
difficulty. Reading the sequence as "lower is stronger" and pushing a personality to
`0.5` does not produce a better AI.

**Open question - the mechanism.** No source describes it. The engine reads the field
(it is in `AIPersonality`'s field table), and the authoritative schema - the comment
block at the top of `media/ui/main/game/new_game/js/ai.js` - gives its range as
`[0 ... )` and nothing else. The official AI page is unreachable and the wiki has no
entry for it.

The reading most consistent with the observed behaviour is that the value scales the
threat data the network reasons over: below `1.0` the AI overestimates threat and holds
its forces back, above `1.0` it underestimates threat and overcommits, which is what a
handicap looks like in play. The field name - `neural_data_mod`, not
`neural_output_weight` - fits that. The competing reading, that it weights how much the
network's output influences the decision against some fallback heuristic, is not ruled
out.

**Settled by:** running a personality at extreme values (`0` and, say, `10`) on a fixed
map and watching platoon target selection under `--ai-log`. `0` is a legal value, and
the two readings predict different things there - an all-zero threat picture versus the
network being ignored entirely.

### Where the networks load from

**Inferred (layout).** In `server.exe`'s string table, the literal `ai_path` sits
immediately before a _relative_ suffix `/neural_networks/`, while a separate _absolute_
`/pa/ai/neural_networks/` exists elsewhere in the table. The three network names are
loaded between `/ai_config.json` and `/unit_maps` in the tree-loading run. Together
that is consistent with "try `<ai_path>/neural_networks/`, fall back to
`/pa/ai/neural_networks/`" - but string adjacency is not control flow, and this has not
been confirmed by disassembly.

It matters because it is the one apparent exception to
[what does not inherit](#what-does-not-inherit): every stock AI tree except `/pa/ai`
ships no networks, yet the conditions that consult them behave in play.

Both halves of that evidence are asserted by `npm run refresh:vocabulary`, so if a PA
patch changes the layout the refresh fails and says this section is now unsourced.

**Settled by:** shipping a tree with its own `neural_networks/land_attack.json` -
deliberately malformed is enough - and reading the server log under `--ai-log`. If the
engine reports a load attempt or failure for that path, the `ai_path`-relative lookup is
confirmed.

### How they are produced

PA ships the trainer. `server-script/states/neural_net.js` is a dedicated headless
server state that loads `server-script/neural_net_config.js` - two commanders on a
single small moon at double economy - and hands off to `neural_net_playing.js`, which
marks both armies as AI and lets them fight to a defeat check. The engine writes results
(`Saved neural network: `) under `--neuralnetdatadir`, tuned by `--neural-learnrate`,
`--neural-momentum` and `--neural-randomrate`.

So the format is not the obstacle to a mod shipping its own networks. The load path is
the open question.

---

## 10. Personalities

Personalities are **JavaScript object literals, not data files.** The single source for
the stock roster is `media/ui/main/game/new_game/js/ai.js`, whose opening comment block
is the authoritative schema and whose `paAI` object is the authoritative set of
defaults.

### Field schema

The engine's own list is a contiguous string table in `server.exe`, parsed by
`AIPersonality::adjustPersonality`. It agrees with the comment block in `ai.js`, which
is the cross-check that makes this table trustworthy. `ai_path` is read separately, by
`AIBrain` rather than by `AIPersonality`.

| Field                                                                                               | Controls                                                                                  |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `ai_path`                                                                                           | Root for all seven load locations. Default `/pa/ai`.                                      |
| `idle`                                                                                              | AI does nothing at all.                                                                   |
| `percent_land`, `percent_vehicle`, `percent_bot`, `percent_air`, `percent_naval`, `percent_orbital` | Share of factory output by type.                                                          |
| `percent_open_vehicle`, `_bot`, `_air`, `_naval`, `_orbital`                                        | Separate ratios for unopposed situations. Engine-supported, unused by stock data.         |
| `personality_tag`                                                                                   | Singular form. Engine-supported, unused; everything uses the plural.                      |
| `personality_tags`                                                                                  | Free-form flags read by `HasPersonalityTag`. **The primary hook for swapping behaviour.** |
| `metal_drain_check`, `energy_drain_check`                                                           | How deep into a stall the AI will commit. Backs `CanAffordBuildDemand`.                   |
| `metal_demand_check`, `energy_demand_check`                                                         | Backs `CanAffordPotentialDrain`.                                                          |
| `micro_type`                                                                                        | `0` none, `1` platoon-level, `2` squad-level.                                             |
| `go_for_the_kill`                                                                                   | Commit to finishing rather than consolidating.                                            |
| `priority_scout_metal_spots`                                                                        | Scouting prioritises metal spots.                                                         |
| `enable_commander_danger_responses`                                                                 | Commander flees when threatened.                                                          |
| `neural_data_mod`                                                                                   | Affects the neural networks. `1.0` is neutral, not an endpoint - see above.               |
| `adv_eco_mod`, `adv_eco_mod_alone`                                                                  | How much economy before teching. Backs `HaveEcoForAdvanced`.                              |
| `factory_build_delay_min`, `factory_build_delay_max`                                                | Random stall between factory builds - the main handicap dial.                             |
| `unable_to_expand_delay`, `per_expansion_delay`                                                     | Cooldowns on expansion.                                                                   |
| `fabber_to_factory_ratio_basic`, `_advanced`                                                        | Back the `Need*Fabber` conditions.                                                        |
| `fabber_alone_on_planet_mod`, `factory_alone_on_planet_mod`                                         | Multipliers applied when alone on a planet.                                               |
| `basic_to_advanced_factory_ratio`                                                                   | Backs the `NeedAdvanced*Factory` conditions.                                              |
| `min_basic_fabbers`, `max_basic_fabbers`                                                            | Back `MetMinBasicFabberCount`.                                                            |
| `min_advanced_fabbers`, `max_advanced_fabbers`                                                      | Back `MetMinAdvancedFabberCount`.                                                         |
| `intel_spacing`                                                                                     | Radar spacing. Engine-supported, unused by stock data.                                    |
| `starting_location_evaluation_radius`                                                               | Radius for start-location scoring.                                                        |

`display_name` and `name` are UI-only and never reach the engine.

`econ_rate` is **not** a personality field - it is a raw economy multiplier attached to
the army. Galactic War uses it heavily, and the neural-net training config sets it to 2.

### The stock roster

Eight vanilla personalities: `Idle`, `Easy`, `Normal`, `NormalPlus`, `Hard`,
`Relentless`, `Absurd`, and `Random` (resolved client-side at game start). Difficulty is
expressed almost entirely through the numeric fields - `Easy` stalls factories for
60-180 seconds and barely micros; `Absurd` has no delay and micros per squad.

TITANS additionally defines the Queller personalities in the same file, gated behind
`api.content.usingTitans()`. They are the only stock personalities that set `ai_path`.

Galactic War does not use this table. It has its own difficulty schema in
`ui/main/game/galactic_war/shared/js/gw_balance.js`, with camelCase fields that
`gw_start.js` maps onto the engine's snake_case ones, plus GW-only concepts (economy
scaling by distance from the capital, minion counts, galaxy-size modifiers).

### `personality_tags` and `HasPersonalityTag`

This is how one `ai_path` serves many personalities. A build entry gates itself on a
tag, and a personality declares which tags it has.

The essential and easily-missed property is **polarity**. A tag tested with
`boolean: false` _excludes_; tested with `boolean: true` it _includes_. Because most
tests in practice are negative, **a tag that no personality declares does not disable
anything - it makes every negative test of it unconditionally true.** A deleted
personality can therefore leave live tests behind that now always pass.

Stock data gates on `Tutorial`, `SlowerExpansion`, `PreventsWaste`, `GalacticWar`,
`GWAlly` and the Queller tags. `Default` is set on every vanilla personality and tested
by nothing - it is inert.

---

## 11. The stock AI tree

`/pa/ai` is a complete, working AI tree and the best reference implementation available.
It is worth reading before writing a new one.

- `media/pa/ai/` - the base game's tree. Files are named `<consumer>_<domain>_builds.json`:
  `fabber_air_builds.json`, `factory_orbital_builds.json`, `platoon_land_builds.json`,
  and so on, plus `platoon_templates.json` and `ai_unit_map.json`.
- `media/pa_ex1/ai/` - the TITANS overlay. Shadows some of the above under identical
  names, and _adds_ alongside them with `_additional` and `_x1` suffixes. It also carries
  `tutorial/` subdirectories gated by the `Tutorial` personality tag.
- `media/pa/ai/neural_networks/` - the three networks.

`ai_unit_map_x1.json` is the clearest illustration of the additive convention: it
contains the TITANS units and nothing else, and because the engine merges every `.json`
in the directory it simply concatenates onto `ai_unit_map.json`.

TITANS' delta to the base unit map is also instructive - beyond adding units, it adds
the `Custom58` faction guard to every set-valued entry, turning `Factory & Basic` into
`Factory & Basic & Custom58`. That change is what makes a second faction possible at all.

For per-value usage counts across the stock tree, see the "Base AI" column in
[engine vocabulary](engine-vocabulary.md).

---

## 12. Diagnostics

The engine will tell you when a name does not resolve, but only if asked.

| Flag         | Effect (the engine's own description) |
| ------------ | ------------------------------------- |
| `--ai-log`   | "Enables AI logging."                 |
| `--ai-debug` | "Enables AI debugging."               |
| `--no-ai`    | "Prevents ticking of AI armies."      |

`--ai-log` writes AI diagnostics to the server log, including files the AI tried to load
and could not. **It is the authoritative answer to "did that name resolve?"** - it sees
the engine's real resolution rather than a reimplementation of it. Reach for it before
concluding a build entry works because nothing visibly broke.

Error strings worth grepping a server log for:

| String                                                  | Means                                            |
| ------------------------------------------------------- | ------------------------------------------------ |
| `Failed to load AI Config file!`                        | no `ai_config.json` at this `ai_path`            |
| `AIBuildSpecList: Invalid format in `                   | a malformed build list                           |
| `BuildCondition: Unknown condition type: %s`            | a `test_type` typo                               |
| `BuildCondition: Unknown comparison type: %s`           | a bad `compare0`/`compare1`                      |
| `BuildCondition: Unknown influence type %s`             | a bad threat layer name                          |
| `BuildCondition: Unknown alliance type %s`              | a bad `alliance` in a placement rule             |
| `Friendly name %s did not resolve to a singlular spec.` | a `unit_types` set used where one spec is needed |
| `PlatoonManager: Unknown task type %s.`                 | a bad `task_type`                                |
| `PlatoonTemplateSpecList: invalid format!`              | a malformed `platoon_templates` file             |
| `PlatoonTemplateSpecList: invalid item found for `      | a malformed slot inside a template               |
| `PlatoonTemplateSpecList: No units specified for `      | a template with an empty or missing `units`      |
| `active count higher than instance count`               | an `instance_count` was exceeded                 |

Note the engine's own typos - `singlular`, and `did not resolved` in the metal-extractor
message. Grep for them as spelled.

---

## Sources

In decreasing order of currency. Where they disagree, the game files win.

1. `bin_x64/server.exe` string tables - the enum vocabularies, the load order, the
   personality field list, and every error message above. Extracted and re-asserted by
   `npm run refresh:vocabulary`.
2. `media/server-script/**` and `media/ui/main/game/new_game/js/ai.js` - the personality
   schema and the whole UI-to-sim path, readable as source.
3. <https://planetaryannihilation.com/ai/> - the current official page.
4. The palobby wiki (`wiki.palobby.com/wiki/Planetary_Annihilation_AI_*`; the
   `_Implementation` page is the component hierarchy in section 1), archived
   2021-09-05 - still the only published source for some full enumerations. Fetch with
   `curl` and strip the HTML; `action=raw` 404s there.
