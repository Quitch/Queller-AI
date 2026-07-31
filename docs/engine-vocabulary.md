# Engine vocabulary

Every whitelist `scripts/validate/ai-schema.js` enforces against `pa/ai_queller/**`, what each one governs, and what the values mean where that is documented.

**Generated - do not hand-edit.** Run `npm run refresh:vocabulary` to rebuild this and `scripts/lib/engine-vocabulary.json` together, and do it after a PA patch. Prose lives in `scripts/lib/vocabulary-reference.js`; edit it there.

## How to read these tables

- **Source** - where the value was recovered from. `binary` means it was read out of the engine's own enum string table. `base data` means the binary scan missed it because the linker de-duplicated it against an identically spelled member of another enum, and it is known good because the shipped base game uses it. `documented` means neither source yields it and the generator trusts it for a stated reason.
- **Used here** - occurrences in `pa/ai_queller/**`. A `-` means this mod does not use the value; it is still legal.
- **Base AI** - occurrences in the base game's own `pa/ai` and `pa_ex1/ai`.
- **Notes** - only present where a cited source says something. A `-` means no documented meaning was found, not that the value does nothing. Nothing in this column is inferred from the value's name.

Extracted from `server.exe` (576,520 strings scanned).

## Build condition types

**Governs:** `build_list[].build_conditions[][].test_type`

The question a single build condition asks. Conditions within a group are AND'd and the groups are OR'd, so a build fires when any one group is fully satisfied.

Evaluation cadence, per the wiki: every 2 seconds for every base by default. Some conditions are real time (every tick), some planet wide (once per planet) and some system fixed (evaluated once at start).

### Personality

| Value               | Source | Used here | Base AI | Parameters used here | Notes                                                                                                                                                                         |
| ------------------- | ------ | --------- | ------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HasPersonalityTag` | binary | 238       | 189     | `boolean`, `string0` | True when the personality declares the tag in `string0`. The wiki names the parameter `string8`, which is a typo - the engine, the base game and this repo all use `string0`. |

### Economy

| Value                            | Source | Used here | Base AI | Parameters used here | Notes |
| -------------------------------- | ------ | --------- | ------- | -------------------- | ----- |
| `PotentialEnergyEfficiency`      | binary | 56        | 4       | `compare0`, `value0` | -     |
| `PotentialMetalEfficiency`       | binary | 50        | 2       | `compare0`, `value0` | -     |
| `CurrentEnergyEfficiency`        | binary | 52        | 26      | `compare0`, `value0` | -     |
| `CurrentMetalEfficiency`         | binary | 43        | 26      | `compare0`, `value0` | -     |
| `DesireMetal`                    | binary | 48        | 14      | -                    | -     |
| `DesireEnergy`                   | binary | 53        | 14      | -                    | -     |
| `MetalStorageFrac`               | binary | 31        | 26      | `compare0`, `value0` | -     |
| `EnergyStorageFrac`              | binary | 4         | -       | `compare0`, `value0` | -     |
| `MetalStorageToProductionRatio`  | binary | 10        | 2       | `compare0`, `value0` | -     |
| `EnergyStorageToProductionRatio` | binary | 10        | 2       | `compare0`, `value0` | -     |
| `HaveEcoForAdvanced`             | binary | 156       | 56      | `boolean`            | -     |

### Unit ratios and counts

| Value                         | Source | Used here | Base AI | Parameters used here                                           | Notes                                                                                                                           |
| ----------------------------- | ------ | --------- | ------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `UnitRatio`                   | binary | -         | -       | -                                                              | Ratio of `unit_type_string0` to `unit_type_string1`. Includes partially built units.                                            |
| `UnitRatioOnPlanet`           | binary | 395       | 72      | `compare0`, `unit_type_string0`, `unit_type_string1`, `value0` | Ratio of `unit_type_string0` to `unit_type_string1`. Includes partially built units.                                            |
| `UnitPoolRatio`               | binary | -         | -       | -                                                              | -                                                                                                                               |
| `UnitCount`                   | binary | 45        | 19      | `compare0`, `unit_type_string0`, `value0`                      | `boolean` restricts the count to fully built units.                                                                             |
| `UnitCountOnPlanet`           | binary | 879       | 318     | `compare0`, `unit_type_string0`, `value0`                      | `boolean` restricts the count to fully built units.                                                                             |
| `UnitPoolCount`               | binary | 439       | 114     | `compare0`, `unit_type_string0`, `value0`                      | `boolean` restricts the count to fully built units.                                                                             |
| `UnitCountPerPlanetRadius`    | binary | 143       | 18      | `compare0`, `unit_type_string0`, `value0`                      | -                                                                                                                               |
| `AlliedUnitCountOnPlanet`     | binary | 60        | 5       | `boolean`, `compare0`, `unit_type_string0`, `value0`           | `boolean` restricts the count to fully built units.                                                                             |
| `UnitCountInCelestialTransit` | binary | 32        | 2       | `compare0`, `unit_type_string0`, `value0`                      | -                                                                                                                               |
| `UnitCountInBase`             | binary | 698       | 190     | `compare0`, `unit_type_string0`, `value0`                      | `value1` is an optional alliance and defaults to allies.                                                                        |
| `UnitCountAroundBase`         | binary | 41        | 15      | `compare0`, `string0`, `unit_type_string0`, `value0`, `value1` | `string0` is the alliance (defaults to allies), `value0` the radius (defaults to the outer base radius) and `value1` the count. |

### Presence

| Value                                 | Source | Used here | Base AI | Parameters used here | Notes                                                                                                                                               |
| ------------------------------------- | ------ | --------- | ------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AloneOnPlanet`                       | binary | 1114      | 154     | `boolean`            | Checks armies on the planet using land, naval and air only - subs, orbital, economy, nuke, anti-nuke and anti-planet units do not count towards it. |
| `EnemyPresenceOnPlanet`               | binary | 35        | 9       | `boolean`            | -                                                                                                                                                   |
| `EnemySurfacePresenceOnPlanet`        | binary | 591       | 70      | `boolean`            | -                                                                                                                                                   |
| `EnemyAirPresenceOnPlanet`            | binary | 235       | 23      | `boolean`            | -                                                                                                                                                   |
| `EnemyOrbitalPresenceOnPlanet`        | binary | 36        | 3       | `boolean`            | -                                                                                                                                                   |
| `HaveFullPlanetIntel`                 | binary | 77        | 15      | `boolean`            | -                                                                                                                                                   |
| `PlanetWithoutPresence`               | binary | 51        | 13      | `boolean`            | -                                                                                                                                                   |
| `SafePlanetWithoutPresence`           | binary | -         | -       | -                    | -                                                                                                                                                   |
| `PlanetOrGasGiantWithoutPresence`     | binary | 31        | 2       | `boolean`            | -                                                                                                                                                   |
| `SafePlanetOrGasGiantWithoutPresence` | binary | 25        | 4       | `boolean`            | -                                                                                                                                                   |
| `PlanetWithoutFabberWithTeleporter`   | binary | 12        | 4       | `boolean`            | -                                                                                                                                                   |
| `PresenceOnOtherPlanet`               | binary | 57        | 6       | `boolean`            | -                                                                                                                                                   |

### Commander

| Value                                | Source | Used here | Base AI | Parameters used here | Notes |
| ------------------------------------ | ------ | --------- | ------- | -------------------- | ----- |
| `WantCommanderOffPlanet`             | binary | 2         | 8       | `boolean`            | -     |
| `WantCommanderOffPlanetByTeleporter` | binary | 12        | 1       | `boolean`            | -     |
| `NoWhereToRun`                       | binary | -         | -       | -                    | -     |

### Planets

| Value                            | Source | Used here | Base AI | Parameters used here | Notes |
| -------------------------------- | ------ | --------- | ------- | -------------------- | ----- |
| `PlanetHasUseablePlanetWeapon`   | binary | 31        | 5       | `boolean`            | -     |
| `PlanetCanBeUsedAsKineticWeapon` | binary | 20        | 2       | `boolean`            | -     |
| `HaveThrustToMovePlanet`         | binary | 18        | 2       | `boolean`            | -     |
| `PlanetCount`                    | binary | 55        | 6       | `compare0`, `value0` | -     |
| `SpawnablePlanetCount`           | binary | -         | -       | -                    | -     |
| `PlanetIsGasGiant`               | binary | 162       | 24      | `boolean`            | -     |
| `PlanetIsMainEcoBase`            | binary | 116       | 3       | `boolean`            | -     |
| `PlanetIsRespawnable`            | binary | 442       | 4       | `boolean`            | -     |

### Metal

| Value                              | Source | Used here | Base AI | Parameters used here | Notes                                                              |
| ---------------------------------- | ------ | --------- | ------- | -------------------- | ------------------------------------------------------------------ |
| `UnableToExpand`                   | binary | 28        | 19      | `boolean`            | -                                                                  |
| `BaseHasEmptyMetalSpotForBasic`    | binary | -         | -       | -                    | -                                                                  |
| `BaseHasEmptyMetalSpotForAdvanced` | binary | -         | -       | -                    | -                                                                  |
| `CanFindMetalSpotToBuildBasic`     | binary | 58        | 32      | `boolean`            | -                                                                  |
| `CanFindMetalSpotToBuildAdvanced`  | binary | 30        | 12      | `boolean`            | -                                                                  |
| `AllMetalSpotsFull`                | binary | 2         | -       | `boolean`            | A planet-wide check of the main base and any non-threatened bases. |

### Catalysts

| Value                        | Source | Used here | Base AI | Parameters used here | Notes |
| ---------------------------- | ------ | --------- | ------- | -------------------- | ----- |
| `CanFindControlPointToBuild` | binary | 12        | 2       | `boolean`            | -     |

### Bases

| Value                        | Source | Used here | Base AI | Parameters used here | Notes                                                                              |
| ---------------------------- | ------ | --------- | ------- | -------------------- | ---------------------------------------------------------------------------------- |
| `IsMainBase`                 | binary | -         | -       | -                    | -                                                                                  |
| `BaseThreatened`             | binary | 245       | 38      | `boolean`            | -                                                                                  |
| `DistFromMainBase`           | binary | 78        | 6       | `compare0`, `value0` | -                                                                                  |
| `DistFromNearestEnemyThreat` | binary | -         | 6       | -                    | Based on economy influence, so per the wiki it may not be a good threat indicator. |

### Building

| Value                     | Source | Used here | Base AI | Parameters used here | Notes                                                                    |
| ------------------------- | ------ | --------- | ------- | -------------------- | ------------------------------------------------------------------------ |
| `CanAffordPotentialDrain` | binary | 720       | 138     | `string0`            | `string0` names the unit whose drain is being tested, as a unit map key. |
| `CanAffordBuildDemand`    | binary | 540       | 340     | -                    | Based on the build arm with tool type `TOOL_BuildArm`.                   |
| `CanFindPlaceToBuild`     | binary | 1178      | 239     | `string0`            | -                                                                        |
| `CanDeployLandFromBase`   | binary | 408       | 65      | `boolean`            | -                                                                        |
| `CanDeployNavalFromBase`  | binary | 309       | 33      | `boolean`            | -                                                                        |

### Factories

| Value                        | Source | Used here | Base AI | Parameters used here | Notes |
| ---------------------------- | ------ | --------- | ------- | -------------------- | ----- |
| `FactoryHasOpenSlot`         | binary | 28        | 3       | -                    | -     |
| `FactorySlotsEmpty`          | binary | 8         | 1       | `boolean`            | -     |
| `NeedBasicLandFactory`       | binary | -         | -       | -                    | -     |
| `NeedAdvancedLandFactory`    | binary | -         | -       | -                    | -     |
| `NeedBasicVehicleFactory`    | binary | -         | 10      | -                    | -     |
| `NeedAdvancedVehicleFactory` | binary | -         | 8       | -                    | -     |
| `NeedBasicBotFactory`        | binary | -         | 10      | -                    | -     |
| `NeedAdvancedBotFactory`     | binary | -         | 8       | -                    | -     |
| `NeedBasicAirFactory`        | binary | -         | 10      | -                    | -     |
| `NeedAdvancedAirFactory`     | binary | -         | 8       | -                    | -     |
| `NeedBasicNavalFactory`      | binary | -         | 10      | -                    | -     |
| `NeedAdvancedNavalFactory`   | binary | -         | 8       | -                    | -     |
| `NeedOrbitalLauncher`        | binary | -         | 15      | -                    | -     |
| `NeedOrbitalFactory`         | binary | -         | 2       | -                    | -     |

### Fabbers

| Value                       | Source | Used here | Base AI | Parameters used here | Notes                                                                                                              |
| --------------------------- | ------ | --------- | ------- | -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `NeedBasicVehicleFabber`    | binary | -         | 2       | -                    | -                                                                                                                  |
| `NeedAdvancedVehicleFabber` | binary | -         | 2       | -                    | -                                                                                                                  |
| `NeedBasicBotFabber`        | binary | -         | 2       | -                    | -                                                                                                                  |
| `NeedAdvancedBotFabber`     | binary | -         | 2       | -                    | -                                                                                                                  |
| `NeedBasicAirFabber`        | binary | -         | 1       | -                    | -                                                                                                                  |
| `NeedAdvancedAirFabber`     | binary | -         | 1       | -                    | -                                                                                                                  |
| `MetMinBasicFabberCount`    | binary | 36        | 5       | `boolean`            | Applies only to tank, bot and air, using `min_basic_fabbers * fabber_alone_on_planet_mod` from the personality.    |
| `MetMinAdvancedFabberCount` | binary | 57        | -       | `boolean`            | Applies only to tank, bot and air, using `min_advanced_fabbers * fabber_alone_on_planet_mod` from the personality. |

### Strategic assistance

| Value                                     | Source | Used here | Base AI | Parameters used here | Notes |
| ----------------------------------------- | ------ | --------- | ------- | -------------------- | ----- |
| `OtherPlanetNeedsReconAssistance`         | binary | 49        | 7       | `boolean`            | -     |
| `OtherPlanetNeedsLandUnitAssistance`      | binary | 292       | 6       | `boolean`            | -     |
| `OtherPlanetNeedsOrbitalUnitAssistance`   | binary | 42        | 2       | `boolean`            | -     |
| `OtherPlanetCanReceiveLandUnitAssistance` | binary | 268       | 38      | `boolean`            | -     |
| `OtherPlanetCanProvideLandUnitAssistance` | binary | -         | 2       | -                    | -     |
| `CanProvideLandUnitAssistance`            | binary | 18        | 4       | `boolean`            | -     |
| `ThisPlanetNeedsLandUnitAssistance`       | binary | 21        | 2       | `boolean`            | -     |
| `ThisPlanetNeedsReconAssistance`          | binary | 46        | 2       | `boolean`            | -     |
| `ThisPlanetNeedsOrbitalUnitAssistance`    | binary | 30        | 2       | `boolean`            | -     |

### Threats

| Value                          | Source | Used here | Base AI | Parameters used here            | Notes                                                                          |
| ------------------------------ | ------ | --------- | ------- | ------------------------------- | ------------------------------------------------------------------------------ |
| `GravWellThreat`               | binary | -         | -       | -                               | `string0` is an influence type, `compare0` a comparison and `value0` a number. |
| `SystemThreat`                 | binary | 108       | 29      | `compare0`, `string0`, `value0` | `string0` is an influence type, `compare0` a comparison and `value0` a number. |
| `PlanetThreat`                 | binary | 40        | 22      | `compare0`, `string0`, `value0` | `string0` is an influence type, `compare0` a comparison and `value0` a number. |
| `BaseThreat`                   | binary | 105       | 15      | `compare0`, `string0`, `value0` | `string0` is an influence type, `compare0` a comparison and `value0` a number. |
| `FocusTargetThreat`            | binary | 8         | -       | `compare0`, `string0`, `value0` | `string0` is an influence type, `compare0` a comparison and `value0` a number. |
| `PlanetHighestEnemyArmyThreat` | binary | 322       | -       | `compare0`, `string0`, `value0` | `string0` is an influence type, `compare0` a comparison and `value0` a number. |

### Threat ratios

| Value                               | Source | Used here | Base AI | Parameters used here                       | Notes |
| ----------------------------------- | ------ | --------- | ------- | ------------------------------------------ | ----- |
| `GravWellToPlanetThreatRatio`       | binary | -         | -       | -                                          | -     |
| `SystemToPlanetThreatRatio`         | binary | 19        | 11      | `compare0`, `string0`, `string1`, `value0` | -     |
| `PlanetThreatRatio`                 | binary | -         | -       | -                                          | -     |
| `BaseThreatRatio`                   | binary | 13        | 6       | `compare0`, `string0`, `string1`, `value0` | -     |
| `FocusTargetThreatRatio`            | binary | 8         | -       | `compare0`, `string0`, `string1`, `value0` | -     |
| `PlanetHighestEnemyArmyThreatRatio` | binary | 238       | 23      | `compare0`, `string0`, `string1`, `value0` | -     |

### Threat vision

| Value                | Source | Used here | Base AI | Parameters used here           | Notes                      |
| -------------------- | ------ | --------- | ------- | ------------------------------ | -------------------------- |
| `HaveSeenEnemyUnits` | binary | 92        | 22      | `boolean`, `unit_type_string0` | Takes `unit_type_string0`. |
| `HaveHadANukeEvent`  | binary | 20        | 5       | `boolean`                      | -                          |

### Attacks (neural network)

| Value                           | Source | Used here | Base AI | Parameters used here                      | Notes                                                                                                                                                                                                                                                                                                 |
| ------------------------------- | ------ | --------- | ------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CanAttackWithPoolUnitsLand`    | binary | 122       | 47      | `string0`, `string1`, `unit_type_string0` | Neural-network backed. `string0` friendly world layer, `string1` enemy world layer, `string2` optional target layer (defaults to the friendly layer), `boolean` use naval rally point. Max weapon range comes from the target layer; search range is 50% of the platoon radius plus max weapon range. |
| `CanAttackWithPoolUnitsBomber`  | binary | 53        | 17      | `string0`, `string1`, `unit_type_string0` | Neural-network backed. `string0` friendly world layer, `string1` enemy world layer, `string2` optional target layer (defaults to the friendly layer), `boolean` use naval rally point. Max weapon range comes from the target layer; search range is 50% of the platoon radius plus max weapon range. |
| `CanAttackWithPoolUnitsFighter` | binary | 44        | 10      | `string0`, `string1`, `unit_type_string0` | Neural-network backed. `string0` friendly world layer, `string1` enemy world layer, `string2` optional target layer (defaults to the friendly layer), `boolean` use naval rally point. Max weapon range comes from the target layer; search range is 50% of the platoon radius plus max weapon range. |

### Attacks (direct)

| Value                    | Source | Used here | Base AI | Parameters used here | Notes                                                                                                                                                  |
| ------------------------ | ------ | --------- | ------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CanAttackWithPoolUnits` | binary | 32        | 8       | `boolean`, `string0` | `string0` attack world layer, `boolean` use naval rally point. Bypasses the neural network the `...Land`/`...Bomber`/`...Fighter` variants go through. |

### Assistance

| Value                               | Source | Used here | Base AI | Parameters used here                                 | Notes |
| ----------------------------------- | ------ | --------- | ------- | ---------------------------------------------------- | ----- |
| `CanProvideAirSupportWithPoolUnits` | binary | 44        | 10      | `string0`, `string1`, `string2`, `unit_type_string0` | -     |
| `OnTaskType`                        | binary | -         | -       | -                                                    | -     |

<sub>Meanings: palobby wiki, AI Build Conditions (oldid 3483).</sub>

## Build condition keys

**Governs:** `build_list[].build_conditions[][].*`

Every key the engine reads from a condition object. Which of them a given condition uses depends on its `test_type` - see the parameter columns above.

| Value               | Source | Used here | Base AI | Notes |
| ------------------- | ------ | --------- | ------- | ----- |
| `boolean`           | binary | 5598      | 977     | -     |
| `compare0`          | binary | 3982      | 965     | -     |
| `compare1`          | binary | -         | -       | -     |
| `string0`           | binary | 3333      | 779     | -     |
| `string1`           | binary | 541       | 124     | -     |
| `string2`           | binary | 44        | 10      | -     |
| `test_type`         | binary | 12376     | 2800    | -     |
| `unit_type_string0` | binary | 3087      | 859     | -     |
| `unit_type_string1` | binary | 395       | 72      | -     |
| `value0`            | binary | 3982      | 965     | -     |
| `value1`            | binary | 41        | 15      | -     |

<sub>Meanings: engine string table.</sub>

## Build spec keys

**Governs:** `build_list[].*`

Every key the engine reads from a build list entry.

| Value                       | Source    | Used here | Base AI | Notes |
| --------------------------- | --------- | --------- | ------- | ----- |
| `base_sort`                 | binary    | 699       | 65      | -     |
| `build_conditions`          | binary    | 1947      | 405     | -     |
| `builders`                  | binary    | 1684      | 303     | -     |
| `cross_planet_shared_count` | binary    | 48        | 11      | -     |
| `enabled`                   | binary    | -         | -       | -     |
| `instance_count`            | binary    | 1947      | 405     | -     |
| `max_num_assisters`         | binary    | 1430      | 164     | -     |
| `min_num_assisters`         | binary    | 324       | 77      | -     |
| `name`                      | base data | 1947      | 405     | -     |
| `placement_rules`           | binary    | 792       | 177     | -     |
| `priority`                  | base data | 1947      | 405     | -     |
| `shared_instance_count`     | binary    | 718       | 160     | -     |
| `task_type`                 | binary    | 383       | 131     | -     |
| `to_build`                  | binary    | 1871      | 394     | -     |

<sub>Meanings: engine string table, plus the base game's own AI data.</sub>

## Task types

**Governs:** `build_list[].task_type`

What the thing being built is then told to do. On a platoon build, `to_build` names a platoon template; on `AreaBuild` it names a unit map key instead.

| Value                           | Source    | Used here | Base AI | Notes |
| ------------------------------- | --------- | --------- | ------- | ----- |
| `AreaBuild`                     | binary    | 44        | 18      | -     |
| `Artillery`                     | base data | 6         | 1       | -     |
| `BomberAttack`                  | binary    | 34        | 16      | -     |
| `Build`                         | binary    | -         | -       | -     |
| `BuilderAssist`                 | binary    | 14        | 2       | -     |
| `FighterAttack`                 | binary    | 25        | 10      | -     |
| `GiveUp`                        | binary    | -         | -       | -     |
| `LandAttack`                    | binary    | 111       | 47      | -     |
| `NavalAttack`                   | binary    | 6         | 2       | -     |
| `None`                          | binary    | -         | -       | -     |
| `Nuke`                          | base data | 6         | 1       | -     |
| `OrbitalFabberMoveToPlanet`     | binary    | 12        | 2       | -     |
| `OrbitalFabberMoveToSafePlanet` | binary    | 12        | 2       | -     |
| `OrbitalFighterAttack`          | binary    | 6         | 2       | -     |
| `OrbitalLaserAttack`            | binary    | 18        | 3       | -     |
| `OrbitalRecon`                  | binary    | 6         | 2       | -     |
| `Patrol`                        | binary    | -         | -       | -     |
| `Scout`                         | binary    | 21        | 9       | -     |
| `TeleportFabberToPlanet`        | binary    | 24        | 3       | -     |
| `TeleportLandToPlanet`          | binary    | 6         | 4       | -     |
| `ThreatResponse`                | binary    | -         | -       | -     |
| `TransferOrbitalToPlanet`       | binary    | 6         | 2       | -     |
| `TransferReconToPlanet`         | binary    | 6         | 2       | -     |
| `TransportToPlanet`             | binary    | 14        | 2       | -     |
| `TransportToSafePlanet`         | binary    | -         | -       | -     |
| `UnitCannon`                    | binary    | 6         | 1       | -     |

<sub>Meanings: engine string table (the wiki's AI Build Specs page was unreachable).</sub>

## Base sort modes

**Governs:** `build_list[].base_sort`

Which point build locations are ordered from. `FromMainBase` is the default.

**Note:** The engine keeps base sort modes and placement types in a single run of adjacent strings, so the extraction cannot tell which values belong to which field and both whitelists get all seven. The Used columns show which are actually used where.

| Value                   | Source | Used here | Base AI | Notes |
| ----------------------- | ------ | --------- | ------- | ----- |
| `FromBaseCenter`        | binary | -         | -       | -     |
| `FromBasePerimeter`     | binary | -         | -       | -     |
| `FromBuilder`           | binary | 301       | 34      | -     |
| `FromMainBase`          | binary | 287       | -       | -     |
| `FromMainBaseCenter`    | binary | -         | -       | -     |
| `FromMainBasePerimeter` | binary | -         | -       | -     |
| `FromPerimeter`         | binary | 111       | 31      | -     |

<sub>Meanings: engine string table; default per this repo's CLAUDE.md.</sub>

## Placement types

**Governs:** `build_list[].placement_rules.placement_type`

What the `buffer` distance in a placement rule is measured from.

**Note:** Shares its string run with base sort modes - see the note there.

| Value                   | Source | Used here | Base AI | Notes |
| ----------------------- | ------ | --------- | ------- | ----- |
| `FromBaseCenter`        | binary | 612       | 20      | -     |
| `FromBasePerimeter`     | binary | 53        | -       | -     |
| `FromBuilder`           | binary | -         | -       | -     |
| `FromMainBase`          | binary | -         | -       | -     |
| `FromMainBaseCenter`    | binary | -         | 64      | -     |
| `FromMainBasePerimeter` | binary | -         | 23      | -     |
| `FromPerimeter`         | binary | -         | -       | -     |

<sub>Meanings: engine string table.</sub>

## Placement rule keys

**Governs:** `build_list[].placement_rules.*`, `...placement_rules.threat.*`, `...placement_rules.unit_count_rules[].*`

Every key the engine reads anywhere under `placement_rules`. The engine keeps the outer keys and both nested blocks' keys in one run, so they are whitelisted as a single set rather than split by nesting level.

| Value              | Source    | Used here | Base AI | Notes |
| ------------------ | --------- | --------- | ------- | ----- |
| `alliance`         | binary    | 443       | 79      | -     |
| `buffer`           | binary    | 586       | 139     | -     |
| `compare_type`     | binary    | 911       | 197     | -     |
| `count`            | base data | 443       | 79      | -     |
| `influence_type`   | binary    | 468       | 118     | -     |
| `placement_type`   | binary    | 665       | 107     | -     |
| `radius`           | base data | 468       | 118     | -     |
| `range`            | binary    | 443       | 79      | -     |
| `threat`           | binary    | 468       | 118     | -     |
| `unit_count_rules` | binary    | 250       | 44      | -     |
| `unit_type_string` | binary    | 443       | 79      | -     |
| `value`            | binary    | 468       | 118     | -     |

<sub>Meanings: engine string table, plus the base game's own AI data.</sub>

## Influence types

**Governs:** `build_list[].placement_rules.threat.influence_type`, `...build_conditions[][].string0` on the threat conditions

Which threat map a threat test or placement rule reads. The engine diagnoses an unknown one - `BuildCondition: Unknown influence type %s` is in the binary.

| Value         | Source     | Used here | Base AI | Notes |
| ------------- | ---------- | --------- | ------- | ----- |
| `Air`         | binary     | -         | -       | -     |
| `AntiAir`     | binary     | -         | -       | -     |
| `AntiNuke`    | binary     | -         | -       | -     |
| `AntiOrbital` | binary     | 10        | 1       | -     |
| `AntiPlanet`  | binary     | -         | -       | -     |
| `AntiSub`     | binary     | -         | -       | -     |
| `AntiSurface` | binary     | 458       | 117     | -     |
| `Artillery`   | binary     | -         | -       | -     |
| `Commander`   | binary     | -         | -       | -     |
| `Economy`     | documented | -         | -       | -     |
| `Land`        | binary     | -         | -       | -     |
| `Naval`       | binary     | -         | -       | -     |
| `Nuke`        | binary     | -         | -       | -     |
| `Orbital`     | binary     | -         | -       | -     |
| `Sub`         | binary     | -         | -       | -     |

<sub>Meanings: engine string table; `Economy` per this repo's CLAUDE.md.</sub>

## World layers

**Governs:** `build_list[].build_conditions[][].string0`/`string1`/`string2`

Which layer of the world an attack condition looks at. The engine stores these without the prefix and prepends `WL_`, which is why the extraction adds it back.

| Value                                  | Source    | Used here | Base AI | Notes |
| -------------------------------------- | --------- | --------- | ------- | ----- |
| `WL_Air`                               | base data | 229       | 57      | -     |
| `WL_AirOrOrbital`                      | binary    | -         | -       | -     |
| `WL_AnyGround`                         | binary    | -         | -       | -     |
| `WL_AnyGroundOrWater`                  | binary    | -         | -       | -     |
| `WL_AnyHorizontalGround`               | binary    | -         | -       | -     |
| `WL_AnyHorizontalGroundOrWaterSurface` | binary    | -         | -       | -     |
| `WL_AnyLayer`                          | binary    | -         | -       | -     |
| `WL_AnySurface`                        | binary    | 315       | 115     | -     |
| `WL_AnyUnderWater`                     | binary    | -         | -       | -     |
| `WL_AnyWater`                          | binary    | -         | -       | -     |
| `WL_AnyWaterOrSeaFloor`                | binary    | -         | -       | -     |
| `WL_LandHorizontal`                    | binary    | -         | -       | -     |
| `WL_LandVertical`                      | binary    | -         | -       | -     |
| `WL_Lava`                              | binary    | -         | -       | -     |
| `WL_Orbital`                           | base data | 14        | 4       | -     |
| `WL_Seafloor`                          | binary    | -         | -       | -     |
| `WL_Unpathable`                        | binary    | -         | -       | -     |
| `WL_WaterSurface`                      | binary    | -         | -       | -     |

<sub>Meanings: engine string table.</sub>

## Alliance filters

**Governs:** `build_list[].placement_rules.unit_count_rules[].alliance`, `...build_conditions[][].string0` on `UnitCountAroundBase`

Whose units a count includes.

The wiki additionally documents `Self`. It is absent from the engine's alliance string run and unused by the base game, so it is not whitelisted.

| Value   | Source | Used here | Base AI | Notes                       |
| ------- | ------ | --------- | ------- | --------------------------- |
| `Ally`  | binary | 443       | 79      | Also accepted as `Allied`.  |
| `Enemy` | binary | -         | -       | Also accepted as `Hostile`. |

<sub>Meanings: engine string table; spellings per the wiki.</sub>

## Comparison operators

**Governs:** `build_list[].build_conditions[][].compare0`/`compare1`, `...placement_rules.threat.compare_type`, `...placement_rules.unit_count_rules[].compare_type`

How a condition's measured value is compared against its threshold. The engine diagnoses an unknown one - `BuildCondition: Unknown comparison type: %s`.

These are one or two characters, below the minimum length the binary string scanner can tell from noise, so unlike every other whitelist here they cannot be recovered from the executable. The set comes from the base game's own usage.

| Value | Source     | Used here | Base AI | Notes                     |
| ----- | ---------- | --------- | ------- | ------------------------- |
| `!=`  | documented | -         | -       | Not equal to.             |
| `<`   | base data  | 2408      | 506     | Less than.                |
| `<=`  | base data  | 255       | 34      | Less than or equal to.    |
| `==`  | documented | 35        | -       | Equal to.                 |
| `>`   | base data  | 730       | 316     | Greater than.             |
| `>=`  | base data  | 1465      | 306     | Greater than or equal to. |

<sub>Meanings: base game AI data; `==`/`!=` documented in the generator.</sub>

## Squad types

**Governs:** `platoon_templates.<name>.units[].squad`

The role a squad plays inside a platoon.

| Value       | Source    | Used here | Base AI | Notes |
| ----------- | --------- | --------- | ------- | ----- |
| `Artillery` | base data | 114       | 23      | -     |
| `Close`     | binary    | 48        | 23      | -     |
| `Defense`   | binary    | 102       | 130     | -     |
| `Escort`    | binary    | 12        | 23      | -     |
| `Fast`      | binary    | 90        | 28      | -     |
| `General`   | binary    | 120       | 25      | -     |
| `Suicide`   | binary    | 42        | 10      | -     |
| `Transport` | binary    | -         | -       | -     |

<sub>Meanings: engine string table (the wiki's AI Build Specs page was unreachable).</sub>

## Platoon template squad keys

**Governs:** `platoon_templates.<name>.units[].*`

Every key the engine reads from a squad entry in a platoon template.

| Value        | Source | Used here | Base AI | Notes |
| ------------ | ------ | --------- | ------- | ----- |
| `max_count`  | binary | 544       | 155     | -     |
| `min_count`  | binary | 587       | 316     | -     |
| `percent`    | binary | 84        | 178     | -     |
| `squad`      | binary | 528       | 262     | -     |
| `unit_types` | binary | 628       | 333     | -     |

<sub>Meanings: engine string table.</sub>
