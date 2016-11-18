Queller-AI
==========

Improved AI for [Planetary Annihilation: TITANS](http://www.uberent.com/pa)

I love AI. To put my old person comfy jumper on for a moment, back in the day I modded Total Annihilation's AI and ran a site called [AI Central](http://aicentral.tauniverse.com) (WARNING: very 90's site design) for AI mods, and I ran an AI league for Kohan II to identify the best. I've been an enthusiast in AI for as long as I've been gaming. This Queller AI will be a continuation of my Queller AI for Total Annihilation & Core Contingency.

This mod is a total overhaul of the AI (as much as can be done with the exposed files) designed to leverage the systems Sorian has created, while playing a game better suited to the meta. It is primarily designed with 1v1 in mind, but should prove to be an improvement in other modes too. It covers a wider range of difficulties than vanilla, from easier to harder, all of which play in a more humanlike fashion than their vanilla counterparts.

The mod offers complete support for the [Legion Expansion](https://github.com/Legion-Expansion/Legion-Expansion).

Please ensure that if you use this work you credit Quitch's Queller AI.

## INSTALLATION

You should download and install this mod via the Planetary Annihilation TITANS in-game Community Mod Manager.

## FEEDBACK

Any feedback based on playing the AI is greatly appreciated. Please include a link to the game on [PA Stats](http://www.pastats.com/) or the replay ID and any time codes of interest. Failing that, please provide the system name, the number of AIs, their difficulty setting, and which slot(s) the players occupied. Remember to set Local Server to OFF in settings otherwise you won't get an entry in PA Stats or a replay ID.

Be aware that Queller will produce more units and fabbers than the vanilla AI, especially on multi-planet systems. I have optimised the AI as best as I can, but it is a bigger performance hog than vanilla. If you are encountering performance issues try setting Local Server to OFF.

The difficulty levels are designed to reflect the dominant playstyle of each league. I'm always eager to garner feedback on any improvements that can be made here.

The only feedback which isn't useful is AI vs. AI feedback. Believe me, I see a million of these games. I want feedback from AI vs human games.

## DIFFICULTY

Queller offers a range of difficulties designed to try and mimic the style of human players at particular levels of play. Later in this readme you can find recommendations on which difficulty you should try.

Normal through Absurd are the standard difficulties and will use the vanilla AI rather than Queller.

- Casual
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
 - Poor economy handling
 - No micro
 - Terrible threat assessments

 - Bronze
  - Factory first opening
  - One army
  - Techs as soon as possible
  - Will go orbital if it can
  - Expands slowly
  - Poor troop selection
  - Barely scouts
  - Doesn't react to what the enemy is doing
  - Loves fabbers
  - Loves static defence/offence
  - Poor use of fabbers
  - Average economy handling
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
 - OK troop selection
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
 - Good troop selection
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

- Aggressive
 - More willing to engage in battle

- Air
 - Much greater use of air

- Bot
 - Doesn't build vehicle factories
 - MLA will build a vehicle factory for Skitters if it detects the possibility of mines

- Cautious
 - Looks for overwhelming odds in battle
 - Goes T2 as soon as it can afford to
 - Will get orbital as soon as possible on multi-planet systems

- Land
 - Won't build naval factories

- Naval
 - Attempts to build a naval factory first
 - Ignores naval factory limits

- Rush
 - Favours bots
 - Techs late

- Tank
 - Doesn't build bot factories

- Tech
 - Goes T2 as soon as it can afford to
 - Will get orbital as soon as possible on multi-planet systems

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

The spawn the AI starts in and the profile used can make a big difference, even for symmetrical 1v1s. If you find the AI too easy on a map, try a different spawn point for it.

## KNOWN ISSUES

#### TOFIX

- Takes too long transition from a naval start to a land game on mixed maps
- Doesn't understand when it needs to build units in preparation for an attack versus when it should shutdown factories so it can build super weapons
- Doesn't build enough fabbers to support building an orbital titan

#### WONTFIX

- Ignores the factory and fabber preferences of client/UI AI personality mods

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
- Legion won't build a different tier of mass extractor on a metal spot that already has a mass extractor
- Legion can't use orbital transports
- Doesn't use Helios teleporter
- Spikes in AI fabber performance
- Naval factories sometimes stop producing units

## THANKS TO

- Sorian of Uber Entertainment for
 - making his AI moddable
 - answering my questions
 - taking on suggestions
 - fixing bugs as they come up
 - adding cool new features which make the AI increasingly smart
- wondible for his creation of the [AI Showdown](https://github.com/JustinLove/ai_showdown/) tool which allows easy setup of matches between different AIs
