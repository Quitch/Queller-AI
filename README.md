Queller AI
==========

Improved AI for [Planetary Annihilation: Titans](http://www.uberent.com/pa)

This mod is a total overhaul of the AI designed to smooth out the difficulty curve, providing more humanlike challenges that are both easier and harder than the vanilla AI. It features complete support for the [Legion Expansion](https://github.com/Legion-Expansion/Legion-Expansion).

Please ensure that if you use this work you credit Quitch's Queller AI.

Want to make your own AI? I've written [a guide to get you started](http://exodusesports.com/guides/building-your-own-planetary-annihilation-ai/).

# INSTALLATION

You should download and install this mod via the Planetary Annihilation TITANS in-game Community Mod Manager. You will need to [enable Community Mods](https://steamcommunity.com/sharedfiles/filedetails/?id=1417396826).

# DIFFICULTY

Queller offers a range of difficulties designed to try and mimic the style of human players at particular levels of play. It does not modify the vanilla difficulties.

### Casual
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

### Bronze
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

### Silver
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

### Gold
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

### Platinum
 - Smart factory first opening
 - Unlimited armies
 - Techs quickly
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

### Uber
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

## RECOMMENDED DIFFICULTY

Below are recommendations for the difficulty you may wish to start on based on what you set the vanilla AI to or your ladder ranking.

When you need to increase the challenge, but don't want to increase the difficulty, give the AI an eco boost rather than adding more AIs. Not only will this be better for the sim, it'll stop the problem of there being less resources to go around for the AI which in turn makes it easier to beat.

| Vanilla    | Queller |
| ---------- | ------- |
| Normal     | Casual  |
| Hard       | Silver  |
| Relentless | Gold    |
| Absurd     | Gold    |

| League   | Placement | Difficulty | Eco |
| -------- | --------- | ---------- | --- |
| Bronze   | Low       | Bronze     | 1.0 |
| Bronze   | High      | Silver     | 1.0 |
| Silver   | Low       | Gold       | 1.0 |
| Silver   | Mid       | Platinum   | 1.0 |
| Silver   | High      | Uber       | 1.0 |
| Gold     | Low       | Uber       | 1.3 |
| Gold     | High      | Uber       | 1.6 |
| Platinum | Any       | Uber       | 1.9 |
| Uber     | Any       | Uber       | 2.2 |

## SUBPERSONALITIES

By default, Queller at Uber level will adapt its play to try and suit the system and the opposition it faces. You can use subpersonalities to customise Queller's game to your liking, or help it play better where it's making poor strategy choices.

### Aggressive
 - More willing to engage in battle

### Air
 - Unrestricted air usage

### Bot
 - Doesn't build vehicle factories except to detect mines

### Free For All
 - More cautious about engaging in battle
 - Techs earlier

### Naval
 - Attempts to build a naval factory first
 - Unrestricted naval usage

### Orbital
 - Will get orbital as soon as possible on multi-planet systems

### Rush
 - Favours bots
 - Techs late

### Tank
 - Doesn't build bot factories

# MAP NOTES

The spawn the AI starts in and the profile used can make a big difference, even for symmetrical 1v1s. If you find the AI too easy on a map, try a different spawn point for it.

And don't use Bedlam, the AI's forces can't path find on this map.

Be sure to follow the recommended number of players for any map.

# TRANSLATIONS

If you would like to help translate Queller to one of PA's languages then please drop me a line.

Queller currently supports:
 - Chinese (Hong Kong) (zh-HK)
 - Chinese (Simplified) (zh-CN)
 - Chinese (Traditional) (zh-TW)
 - Dutch (nl)
 - English (US) (en-US)
 - French (fr)
 - German (de)
 - Italian (it)
 - Korean (ko)
 - Spanish (es-ES)

# KNOWN ISSUES

## CANTFIX

- Will sometimes take much longer than necessary routes to attack
- Doesn't defend its fabbers
- Attempts to attack with amphibious units underwater even if they don't have an underwater weapon
- Will queue buildings on the other side of obstacles despite closer locations (pathfinding wise) being available
- Won't send interplanetary aircraft between planets
- Will assign fabbers to a assist on a project that they could start earlier than the fabber they're assisting
- Won't use more than one teleporter at a time
- Won't use teleporters to move around a single planet
- Cannot reclaim
- Combat Fabbers can only be used to build mines or repair troops, not both, even across entirely different AI personalities
- Doesn't handle enemy walls well
- Legion won't build a different tier of mass extractor on a metal spot that already has a mass extractor
- Legion can't use orbital transports
- Doesn't use Helios teleporter
- Naval factories sometimes stop producing units
- Won't attack on gas giants
- All AI Commanders on a team spawn and act together using shared army mode
- Play From Here in Chronocam can cause strange AI behaviour or even break it
- Different armies will sometimes build on the same metal spot
- Naval factories occasionally built on land

# THANKS TO

- Sorian of Uber Entertainment for:
  - making his AI moddable
  - answering my questions
  - taking on suggestions
  - fixing bugs as they come up
  - adding cool new features which make the AI increasingly smart
- wondible for his creation of the [AI Showdown](https://github.com/JustinLove/ai_showdown/) tool
- mikeyh for writing the JavaScript for loading Queller's personalities
- alpha2546 for extensively playtesting Queller during Legion Expansion development
- Everyone who has helped with translations:
  - K-Orthic | Gamax
  - gmase
  - PRoeleert
  - R.O.S.S
  - DeathByDenim
  - River
  - Felix Köhler
  - tunsel
  - omylist
  - IPWIW