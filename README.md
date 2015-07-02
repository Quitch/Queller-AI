Queller-AI
==========

Improved AI for [Planetary Annihilation](http://www.uberent.com/pa)

I love AI. To put my old person comfy jumper on for a moment, back in the day I modded Total Annihilation's AI and ran a site called [AI Central](http://aicentral.tauniverse.com) (WARNING: very 90's site design) for AI mods, and I ran an AI league for Kohan II to identify the best. I've been an enthusiast in AI for as long as I've been gaming. This Queller AI will be a continuation of my Queller AI for TA.

This mod is a total overhaul of the AI (as much as can be done with the exposed files) designed to leverage the systems sorian has created, while playing a game better suited to the meta. It will definitely be designed with 1v1 in mind, but will hopefully prove to be an improvement in other modes too.

Any feedback is greatly appreciated. For issues please include a link to the game on [PA Stats](http://www.pastats.com/) or the replay ID. Failing that, please provide the system name, the number of AIs, their difficulty setting, and which slot(s) the players occupied.

## GOALS

Some of these might prove impossible given the tooling available, only time will tell.

- Opening builds aligned with real players
- Unit mixes suited to current balance
- More aggressive early play
- Platoon and squad sizes better suited to the units contained within them
- Faster expansion on empty planets
- Much greater use of teleporters to move around
- Scouting units which can also punish lone fabbers
- Avoiding losing games through premature orbital
- Overhaul of naval play
- Targeting lone fabbers more aggressively
- Using bombers more appropriately
- Changing of strategies according to planet size
- Changing of strategies according to player density

## DIFFICULTY

Queller offers a range of difficulties designed to try and mimic the style of human players at particular levels of play. Bronze is easier than the vanilla normal difficulty while Uber is harder than absurd. The next section offers recommendations on which difficulty you should try first.

- Bronze
 - Economy first opening
 - One army
 - Techs as soon as possible
 - Goes orbital as soon as possible
 - Turtles
 - Poor troop selection
 - Doesn't scout
 - Doesn't react to what the enemy is doing
 - Loves fabbers
 - Loves static defence/offence
 - Poor use of fabbers
 - Doesn't think about running costs
 - No micro
 - Poor threat assessments

- Silver
 - Factory first opening
 - Few armies
 - Techs early
 - Goes orbital early
 - Expands slowly
 - Poor troop selection
 - Barely scouts
 - Doesn't react to what the enemy is doing
 - Likes fabbers
 - Floats economy
 - Average micro
 - OK threat assessments

- Gold
 - Smart factory first opening
 - Some armies
 - Prefers T1
 - Slow to go orbital
 - Expands OK
 - Good troop selection
 - OK scouting
 - Some reaction to opponent's play
 - Dislikes fabbers
 - Stalls economy
 - Average micro
 - Good threat assessments

- Platinum
 - Smart factory first opening
 - Numerous armies
 - Techs smartly
 - Goes orbital smartly
 - Expands quickly
 - Best troop selection
 - Smartly reacts to opponent's play
 - Good economy handling
 - Best micro
 - Great threat assessments

- Uber
 - Smart factory first opening
 - Unlimited armies
 - Techs smartly
 - Goes orbital smartly
 - Expands quickly
 - Best troop selection
 - Smartly reacts to opponent's play
 - Best economy handling
 - Best micro
 - Best threat assessments

## MAP NOTES

The spawn the AI starts in can make a big difference, even for symmetrical 1v1s. Below are some recommendations.

#### Forge

Plays better in slot 1/2

#### Pacific

Plays better in slot 2/2

#### Duat

Plays better in slot 2/2

#### Berg

Both spawns are about the same

## RECOMMENDED DIFFICULTY

| Vanilla Difficulty | Queller Difficulty |
| ------------------ | ------------------ |
| Normal | |
| Hard | |
| Relentless | |
| Absurd | 

| League | Placement | Queller Difficulty | AI Resource Modifier |
| ------------------- | ------------------- | ------------------- | ------------------- |
| Bronze | Low | Bronze | 1.0 |
| Bronze | High | Silver | 1.0 |
| Silver | Low | Gold | 1.0 |
| Silver | High | Platinum | 1.0 |
| Gold | Low | Uber | 1.2 |
| Gold | High | Uber | 1.4 |
| Platinum | Any | Uber | 1.6 |
| Uber | Any | Uber | 2.0 |

## THINGS I AM THINKING ABOUT

- Compare enemy mobile presence to static defence and adjust army ratio accordingly
- Get the Commander to build walls around itself when under threat
- Can the Commander be assigned to a platoon?
- How can I detect the AI is in a FFA and adjust decisions accordingly?
- Only tech on land when alone or unable to expand and ditch the whole idea of teching while winning? Perhaps don't tech when winning if no one else is teching?
- Better optimise the opening builds according to the map size and number of players
- Needs to be think about when to stop building at sea/land on mixed maps
- Is Kestrel play a thing?
- I really need to improve the use of Booms
- Stops rapid basic factory expansion once advanced factories appear which is poor played on occupied worlds

## KNOWN ISSUES

#### TOFIX

- Doesn't close out orbital games well even when it has an overwhelming economic advantage
- Takes too long transition from a naval start to a land game on mixed maps
- Will not send all its troops through a teleporter even when there's no reason not to
- Will overbuild on land/sea when it should be dealing with a threat in the other arena
- Too aggressive in spending excess eco when it has a lot of fabbers
- If an Advanced Fabber is sent to another planet the building of a factory can be delayed
- Doesn't understand when it needs to build units in preparation for an attack versus when it should shutdown factories so it can build super weapons

#### MAYBEFIX

- Doesn't handle enemy walls well
- Late game performance issues on planets where it has produced a lot of fabbers - might be fixed by upcoming performance improvements to AI fabber tests

#### WONTFIX

- Ignores the unit preferences of AI personalities
- Will build a late bot factory on land maps when it shouldn't
- Will use fabbers to construct factories when the commander should really do it

#### CANTFIX

- Will sometimes take much longer than necessary routes to attack
- Fabbers don't always take the closest metal spot when building MEX
- Doesn't defend its fabbers
- Attempts to attack with Dox underwater
- Will queue buildings on the other side of obstacles despite closer locations (pathfinding wise) being available
- Won't move orbital units (except fabbers and radar) between planets
- Will send orbital radar to gas giants
- Won't send Phoenixes between planets
- Will assign fabbers to a assist on a project that they could start earlier than the fabber they're assisting
- Won't send a land fabber to a planet with an orbital fabber
- Won't use more than one teleporter at a time

## THANKS TO

- Sorian of Uber Entertainment, for
 - making his AI moddable
 - answering my questions
 - taking on suggestions
 - fixing bugs as they come up
 - adding cool new features which make the AI increasingly smart