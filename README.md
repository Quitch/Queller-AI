Queller-AI
==========

Improved AI for [Planetary Annihilation: TITANS](http://www.uberent.com/pa)

I love AI. To put my old person comfy jumper on for a moment, back in the day I modded Total Annihilation's AI and ran a site called [AI Central](http://aicentral.tauniverse.com) (WARNING: very 90's site design) for AI mods, and I ran an AI league for Kohan II to identify the best. I've been an enthusiast in AI for as long as I've been gaming. This Queller AI will be a continuation of my Queller AI for Total Annihilation & Core Contingency.

This mod is a total overhaul of the AI (as much as can be done with the exposed files) designed to leverage the systems Sorian has created, while playing a game better suited to the meta. It is primarily designed with 1v1 in mind, but should prove to be an improvement in other modes too. It covers a wider range of difficulties than vanilla, from easier to harder, all of which play in a more humanlike fashion than their vanilla counterparts.

## INSTALLATION

You should download and install this mod via the [PA Mod Manager (PAMM)](https://forums.uberent.com/threads/pa-mod-manager-pamm-cross-platform.59992/)

## FEEDBACK

Any feedback based on playing the AI is greatly appreciated. Please include a link to the game on [PA Stats](http://www.pastats.com/) or the replay ID and any time codes of interest. Failing that, please provide the system name, the number of AIs, their difficulty setting, and which slot(s) the players occupied. Remember to set Local Server to OFF in settings otherwise you won't get an entry in PA Stats or a replay ID.

Be aware that Queller will produce more units and fabbers than the vanilla AI, especially on multi-planet systems. I have optimised the AI as best as I can, but it is a bigger performance hog than vanilla. If you are encountering performance issues try setting Local Server to OFF.

The difficulty levels are designed to reflect the dominant playstyle of each league. I'm always eager to garner feedback on any improvements that can be made here.

The only feedback which isn't useful is AI vs. AI feedback. Believe me, I see a million of these games. I want feedback from AI vs human games.

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

Queller offers a range of difficulties designed to try and mimic the style of human players at particular levels of play. Later in this readme you can find recommendations on which difficulty you should try.

Normal through Absurd are the standard difficulties and will use the vanilla AI rather than Queller.

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
 - Terrible threat assessments

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
 - Average economy handling
 - Average micro
 - Poor threat assessments

- Gold
 - Smart factory first opening
 - Many armies
 - Will tech if it can
 - Will go orbital if it can
 - Expands OK
 - Good troop selection
 - OK scouting
 - Some reaction to opponent's play
 - Dislikes fabbers
 - Appropriate use of static defence/offence
 - Average economy handling
 - Average micro
 - OK threat assessments

- Platinum
 - Smart factory first opening
 - Unlimited armies
 - Techs smartly
 - Goes orbital smartly
 - Expands quickly
 - Best troop selection
 - Good scouting
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
 - Best scouting
 - Smartly reacts to opponent's play
 - Good fabber to troop balance
 - Appropriate use of static defence/offence
 - Best economy handling
 - Best micro
 - Best threat assessments
 - Will use eco bonuses better than other levels
 - Selectable subpersonality

### Subpersonalities

By default, Queller at Uber level will adapt its play to try and suit the system and the opposition it faces. You can use subpersonalities to customise Queller's game to your liking, or help it play better where it's making poor strategy choices.

- Air
 - Heavier use of air
 - Can go air first

- Bot
 - Doesn't build vehicle factories
 - Will build a vehicle factory for Skitters if it detects the possibility of mines

- Land
 - Won't build naval factories

- Naval
 - Attempts to build a naval factory first
 - Slightly more aggressive about getting into the water

- Rush
 - Focus on T1 land rush

- Tank
 - Doesn't build bot factories

- Tech
 - Goes T2 as soon as it can afford to
 - Will get orbital as soon as possible on multi-planet systems

- Turtle
 - Emphasis on fabbers over combat units
 - Emphasis on static weapons over factories

## RECOMMENDED DIFFICULTY

Below are recommendations for the difficulty and eco modifiers you should use.

| Vanilla    | Queller | Eco |
| ---------- | ------- | --- |
| Normal     | Bronze  | 1.0 |
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

The spawn the AI starts in and the profile used can make a big difference, even for symmetrical 1v1s. Below are some recommendations for 1v1s, but feel free to experiment as your playstyle may be challenged differently.

| Map     | Slot |
| ------- |:----:|
| Berg    | 2    |
| Blitz   | 1/2  |
| Clutch  | 2    |
| Crag    | 2    |
| Duat    | 2    |
| Forge   | 2    |
| Lock    | 1    |
| Pacific | 2    |

## KNOWN ISSUES

#### TOFIX

- Takes too long transition from a naval start to a land game on mixed maps
- Will not send all its troops through a teleporter even when there's no reason not to
- Doesn't understand when it needs to build units in preparation for an attack versus when it should shutdown factories so it can build super weapons
- Spikes in AI fabber performance
- Will sometimes build torpedo launcher defences in the starting base on non-symmetrical maps without water

#### WONTFIX

- Ignores the factory and fabber preferences of client/UI AI personality mods
- Will use fabbers to construct factories when the commander should really do it

#### CANTFIX

- Will sometimes take much longer than necessary routes to attack
- Fabbers don't always take the closest metal spot when building MEX
- Doesn't defend its fabbers
- Attempts to attack with amphibious units underwater even if they don't have an underwater weapon
- Will queue buildings on the other side of obstacles despite closer locations (pathfinding wise) being available
- Won't send interplanetary aircraft between planets
- Will assign fabbers to a assist on a project that they could start earlier than the fabber they're assisting
- Won't use more than one teleporter at a time
- Won't use telepoters to move around a single planet
- Cannot reclaim
- Combat Fabbers can only be used to build mines or repair troops, not both, even across entirely different AI personalities
- Doesn't handle enemy walls well
- Doesn't use mobile teleporters

## THANKS TO

- Sorian of Uber Entertainment for
 - making his AI moddable
 - answering my questions
 - taking on suggestions
 - fixing bugs as they come up
 - adding cool new features which make the AI increasingly smart
- wondible for his creation of the [AI Showdown](https://github.com/JustinLove/ai_showdown/) tool which allows easy setup of matches between different AIs
