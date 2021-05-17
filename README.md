# Queller AI

> _"Your Queller AI is literally best teacher there is when it comes to pure learning how to play this game, especially \[the\] basics" - B13, Uber rank #2_

Improved AI for [Planetary Annihilation: TITANS](https://planetaryannihilation.com/)

This mod is a total overhaul of the AI designed to smooth out the difficulty curve, providing more humanlike challenges that are both easier and harder than the vanilla AI. It features complete support for the [Legion Expansion](https://github.com/Legion-Expansion/Legion-Expansion).

You must install [Galactic War Overhaul](https://forums.planetaryannihilation.com/threads/client-galactic-war-overhaul.72360/) if you want Queller AI in your Galactic War.

Please ensure that if you use this work you credit Quitch's Queller AI.

## INSTALLATION

You should download and install this mod via the Planetary Annihilation TITANS in-game [Community Mods](https://steamcommunity.com/sharedfiles/filedetails/?id=1417396826).

## DIFFICULTY

Queller offers a range of difficulties designed to try and mimic the style of human players at particular levels of play. It does not modify the vanilla difficulties.

### ![Casual badge](./images/badge_level_0_28px.png) Casual

- Economy first opening
- One army
- Techs as soon as possible
- Goes orbital as soon as possible
- Turtles
- Poor troop selection
- Barely scouts
- Doesn't adapt to what the enemy is doing
- Loves fabbers
- Loves static defence/offence
- Poor use of fabbers
- Poor economy handling
- No micro
- Terrible threat assessments

### ![Bronze badge](./images/badge_level_1_28px.png) Bronze

- Factory first opening
- One army
- Techs as soon as possible
- Will go orbital if it can
- Expands slowly
- Poor troop selection
- Barely scouts
- Doesn't adapt to what the enemy is doing
- Loves fabbers
- Loves static defence/offence
- Poor use of fabbers
- Average economy handling
- No micro
- Terrible threat assessments

### ![Silver badge](./images/badge_level_2_28px.png) Silver

- Factory first opening
- Few armies
- Will tech if it can
- Will go orbital if it can
- Expands slowly
- Poor troop selection
- Barely scouts
- Doesn't adapt to what the enemy is doing
- Likes fabbers
- Likes static defence/offence
- Average economy handling
- Average micro
- Poor threat assessments

### ![Gold badge](./images/badge_level_3_28px.png) Gold

- Smart factory first opening
- Many armies
- Will tech if it can
- Will go orbital if it can
- Expands OK
- OK troop selection
- OK scouting
- Some adaption to its opponent's play
- Dislikes fabbers
- Appropriate use of static defence/offence
- Average economy handling
- Average micro
- OK threat assessments

### ![Platinum badge](./images/badge_level_4_28px.png) Platinum

- Smartest factory first opening
- Unlimited armies
- Techs quickly
- Goes orbital smartly
- Expands quickly
- Good troop selection
- Good scouting
- Smartly adapts to its opponent's play
- Good fabber to troop balance
- Appropriate use of static defence/offence
- Good economy handling
- Best micro
- Great threat assessments

### ![Uber badge](./images/badge_level_5_28px.png) Uber

- Smartest factory first opening
- Unlimited armies
- Techs smartly
- Goes orbital smartly
- Expands quickly
- Best troop selection
- Best scouting
- Smartly adapts to its opponent's play
- Good fabber to troop balance
- Appropriate use of static defence/offence
- Best economy handling
- Best micro
- Best threat assessments
- Will use eco bonuses better than other levels
- Selectable subpersonality

## RECOMMENDED DIFFICULTY

Below are recommendations for the difficulty you may wish to start on based on what you set the vanilla AI to or your ladder ranking.

When you need to increase the challenge, but don't want to increase the difficulty, give the AI an eco-boost rather than adding more AIs. Not only will this be better for the sim, but will also stop the problem of there being fewer resources to go around for the AI which in turn makes it easier to beat. Alternatively, put the AI into shared armies.

Comparison between vanilla difficulty and Queller difficulty:

| Vanilla    | Queller | Eco |
| ---------- | ------- | --- |
| Normal     | Casual  | 1.0 |
| Hard       | Silver  | 1.0 |
| Relentless | Gold    | 0.8 |
| Absurd     | Gold    | 1.0 |

Suggestions based on 1v1 ranked position or challenge sought:

| League   | Placement | Difficulty | Eco |
| -------- | --------- | ---------- | --- |
| Bronze   | Low       | Bronze     | 1.0 |
| Bronze   | Mid       | Silver     | 1.0 |
| Bronze   | High      | Gold       | 1.0 |
| Silver   | Low       | Platinum   | 1.0 |
| Silver   | Mid       | Uber       | 1.0 |
| Silver   | High      | Uber       | 1.2 |
| Gold     | Any       | Uber       | 1.4 |
| Platinum | Any       | Uber       | 1.6 |
| Uber     | Any       | Uber       | 1.8 |

## SUBPERSONALITIES

By default, Queller at Uber level will adapt its play to try and suit the system and the opposition it faces. You can use subpersonalities to customise Queller's game to your liking or help it play better where it's making poor strategy choices.

### 1v1

- Optimised for 1v1 play

### Bot

- Doesn't build vehicle factories

### Free-For-All

- More cautious about engaging in battle
- Techs earlier
- Orbital earlier
- Avoids antagonistic scouting raids

### Rush

- Techs late
- Slower to enter orbital

### Tank

- Doesn't build bot factories

### Turtle

- More likely to build defences at its expansions
- More likely to build titans

## MAP NOTES

The spawn the AI starts in and the profile used can make a big difference, even for symmetrical 1v1s. If you find the AI too easy on a map, try a different spawn point for it. And don't use Bedlam, the AI's forces can't pathfind on this map.

Be sure to follow the recommended number of players for any map.

## KNOWN ISSUES

### CANTFIX

- Will sometimes take much longer than necessary routes to attack
- Doesn't defend its fabbers
- Attempts to attack with amphibious units underwater even if they don't have an underwater weapon
- Will queue buildings on the other side of obstacles despite closer locations (pathfinding wise) being available
- Won't send interplanetary aircraft between planets
- Will assign fabbers to assist on a project that they could start earlier than the fabber they're assisting
- Won't use more than one teleporter at a time
- Won't use teleporters to move around a single planet
- Cannot reclaim
- Combat Fabbers can only be used to build mines or repair troops, not both, even across entirely different AI personalities
- Legion won't build a different tier of mass extractor on a metal spot that already has a mass extractor
- Legion can't use orbital transports
- Doesn't use the Helios teleporter
- Naval factories sometimes stop producing units
- All AI Commanders on a team spawn and act together using shared army mode
- Play From Here in Chronocam can cause strange AI behaviour or even break it
- Different armies will sometimes build on the same metal spot
- Naval factories occasionally built on land
- Attempts to attack land targets with underwater units even if they don't have a weapon which can attack land
- Slow to start moving troops between planets

### WONTFIX

- Mistakes respawning planets for asteroids and won't behave properly on them

## THANKS TO

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
  - Fred
  - CmdrEdem
  - something more than human
  - Linus Petersson
  - Spassky
  - Craeox
  - sevmek
  - fera
- PA Inc for including Queller in its professional translation project
