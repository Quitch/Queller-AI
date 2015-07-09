Queller-AI
==========

Improved AI for [Planetary Annihilation](http://www.uberent.com/pa)

I love AI. To put my old person comfy jumper on for a moment, back in the day I modded Total Annihilation's AI and ran a site called [AI Central](http://aicentral.tauniverse.com) (WARNING: very 90's site design) for AI mods, and I ran an AI league for Kohan II to identify the best. I've been an enthusiast in AI for as long as I've been gaming. This Queller AI will be a continuation of my Queller AI for Total Annihilation & Core Contingency.

This mod is a total overhaul of the AI (as much as can be done with the exposed files) designed to leverage the systems Sorian has created, while playing a game better suited to the meta. It is primarily designed with 1v1 in mind, but should prove to be an improvement in other modes too. It covers a wider range of difficulties than vanilla, from easier to harder, all of which play in a more humanlike fashion than their vanilla counterparts.

## FEEDBACK

Any feedback based on playing the AI is greatly appreciated. Please include a link to the game on [PA Stats](http://www.pastats.com/) or the replay ID and any time codes of interest. Failing that, please provide the system name, the number of AIs, their difficulty setting, and which slot(s) the players occupied. Remember to set Local Server to OFF in settings otherwise you won't get an entry in PA Stats or a replay ID.

Be aware that Queller will produce more units and fabbers than the vanilla AI, especially on multi-planet systems. I have optimised the AI as best as I can, but it is a bigger performance hog than vanilla. If you are encountering performance issues try setting Local Server to OFF.

## GOALS

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

Queller offers a range of difficulties designed to try and mimic the style of human players at particular levels of play. Bronze is easier than the vanilla normal difficulty while uber is harder than absurd. Later in this readme you can find recommendations on which difficulty you should try.

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
 - Terrible economy handling
 - No micro
 - Poor threat assessments

- Silver
 - Factory first opening
 - Few armies
 - Will tech if it can
 - Will go orbital if it can
 - Expands slowly
 - Poor troop selection
 - Barely scouts
 - Doesn't react to what the enemy is doing
 - Likes fabbers
 - Likes static defence/offence
 - Poor economy handling
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
 - Appropriate use of static defence/offence
 - Average economy handling
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
 - Good fabber to troop balance
 - Appropriate use of static defence/offence
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
 - Good fabber to troop balance
 - Appropriate use of static defence/offence
 - Best economy handling
 - Best micro
 - Best threat assessments
 - Will use eco bonuses better than other levels

## RECOMMENDED DIFFICULTY

Below are recommendations for the difficulty and eco modifiers you should use.

| Vanilla    | Queller | Eco |
| ---------- | ------- | --- |
| Normal     | Silver  | 0.9 |
| Hard       | Silver  | 1.1 |
| Relentless | Gold    | 0.8 |
| Absurd     | Gold    | 0.8 |

| League   | Placement | Difficulty | Eco |
| -------- | --------- | ---------- | --- |
| Bronze   | Low       | Bronze     | 1.0 |
| Bronze   | High      | Silver     | 1.0 |
| Silver   | Low       | Gold       | 1.0 |
| Silver   | Mid       | Platinum   | 1.0 |
| Silver   | High      | Uber       | 1.0 |
| Gold     | Low       | Uber       | 1.2 |
| Gold     | High      | Uber       | 1.4 |
| Platinum | Any       | Uber       | 1.6 |
| Uber     | Any       | Uber       | 2.0 |

## MAP NOTES

The spawn the AI starts in can make a big difference, even for symmetrical 1v1s. Below are some recommendations.

#### Forge

Plays better in slot 1/2

#### Duat

Plays better in slot 2/2

#### Berg

Both spawns are about the same

#### Pacific

Slot 2/2 is riskier but leads to a stronger late game

## THINGS I AM THINKING ABOUT

- Compare enemy mobile presence to static defence and adjust army ratio accordingly. Is this even possible?
- Get the Commander to build walls around itself when under threat
- Can the Commander be assigned to a platoon?
- How can I detect the AI is in a FFA and adjust decisions accordingly?
- Only tech on land when alone or unable to expand and ditch the whole idea of teching while winning? Perhaps don't tech when winning if no one else is teching? Move to AntiSurface comparisons?
- Better optimise the opening builds according to the map size and number of players
- Needs to be think about when to stop building at sea/land on mixed maps
- Is Kestrel play a thing?
- Boom usage is terrible and needs a lot of work
- Stops rapid basic factory expansion once advanced factories appear which is poor play on occupied worlds

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
- Won't use more than one teleporter at a time

## THANKS TO

- Sorian of Uber Entertainment for
 - making his AI moddable
 - answering my questions
 - taking on suggestions
 - fixing bugs as they come up
 - adding cool new features which make the AI increasingly smart
- wondible for his creation of the [AI Showdown](https://github.com/JustinLove/ai_showdown/) tool which allows easy setup of matches between different AIs
