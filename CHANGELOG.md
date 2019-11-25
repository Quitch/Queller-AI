# CHANGELOG

#### DEV

- Casual through Platinum show more variance in which planets they choose to expand to
- Resolve issue with some levels failure to expand when starting with a naval factory
- Uber requires less air dominance to use the Horsefly
- Gold and Platinum prefer the Horsefly over the Kestrel
- Silver no longer uses the Hornet

#### v4.54.0 - 2019-11-23

- Stop Uber immediately moving an orbital fabber away from a planet it just arrived at
- Don't run teleporter checks on gas giants
- Uber will switch off land and air factories on planets it owns if it cannot afford to run them

#### v4.53.0 - 2019-11-19

- Uber makes greater use of the Horsefly
- Silver through Uber will now build the Typhoon

#### v4.52.0 - 2019-10-05

- Added support for Horsefly
- Gold uses less Hornets

#### v4.51.0 - 2019-09-04

- Further fiddling of Uber's Unit Cannons. We're rearranging the deck chairs, people!
- Uber won't build up factory infrastructure on an asteroid if an ally has an engine
- Uber more likely to assist builds on asteroids
- Added support for the Stryker
- Uber completely avoids Skitters for scouting if it has Fireflies

#### v4.50.0 - 2019-07-24

- Expanded naval factory builds to encompass all fabbers
- Uber uses more land scouts and combat fabbers once it has confirmed the existence of mines
- Slight improvement of mine vision distribution among platoons
- Uber Naval will use Investigators to spot mines
- Uber recognises that Investigators built to sweep mines are amphibious
- Properly attempt to exclude hover tanks from land attack platoons
- Uber builds Catapults in bases under naval threat
- Uber prioritises building a naval factory when the enemy has naval and it doesn't
- Removed island torpedo launcher builds to avoid builds too far inland

#### v4.49.1 - 2019-07-19

- Changed again how Uber decides when to build a Unit Cannon
- Fixed Uber using the wrong platoons

#### v4.49.0 - 2019-07-18

- Uber Bot and Uber Rush can now start double bot
- Updated Turkish (tr-TR) translation
- Tidied up the formation of orbital platoons
- Corrected an issue that was causing Uber to go orbital much later than it should
- Updated Uber to ensure similar timing issues weren't occurring elsewhere
- Updated Uber 1v1 and Uber Rush to ensure they don't prematurely enter orbital now the timing issues are fixed
- Uber no longer attacks with Icarus as they would merge with bomber platoons and slow them down
- Uber and its subpersonalities now use the same approach for most land platoons as the base game AI
- Resolve issue where too many land platoons could be sent off world during an enemy invasion
- Only build troops and factories for other planets if those planets can receive them
- Improved Uber's checks on when to build a Unit Cannon
- Uber responds faster to nukes when the Commander is in danger
- Corrected error in Uber's Scythe build when responding to air threats
- Corrected error in Uber's Praetorian build when responding to air titans
- Improved reliability of Uber's anti-nuke builds to protect the Commander
- Uber is less panicked by minor orbital threats
- Updated new Uber platoons to more closely align them to the old Uber platoon squad assignments
- Removed the tank opening from Uber FFA
- Uber Bot and Uber Tank don't check whether they can form platoons of the other's type

#### v4.48.0 - 2019-07-14

- Added Turkish (tr-TR) translations with thanks to fera
- Uber Aggressive now named Uber 1v1

#### v4.47.0 - 2019-07-13

- Cleaned up some unnecessary personality duplication
- Removed Uber Aggressive
- Uber Neural renamed Uber Aggressive

#### v4.46.3 - 2019-07-12

- Uber uses less Locusts
- Ensure Uber always puts bots in the right squad

#### v4.46.2 - 2019-07-09

- Bronze through Uber try to build air and orbital titans somewhere safe

#### v4.46.1 - 2019-07-08

- Fix for Uber not properly defending its Commander against low orbital threat
- Correctly recognises the Unit Cannon as requiring anti-orbital land defences

#### v4.46.0 - 2019-05-25

- Reintroduced Uber Neural which uses large numbers of small platoons and leans more heavily on the neural net

#### v4.45.1 - 2019-04-09

- Fixed Uber Legion trying to use MLA fabbers for some builds
- Fixed error in Uber MLA anti-nuke paranoia build

#### v4.45.0 - 2019-04-09

- Loosened restrictions on Silver building interplanetary weapons and defences
- Bronze and Silver correctly handle spreading anti-nukes across a planet
- Reduced Uber's paranoia about the possibility of nukes on other planets that it hasn't scouted
- Silver has more freedom to build anti-orbital defences
- Bronze through Platinum send orbital units in slightly larger groups than before
- Silver through Platinum will keep their Commander closer to the main base
- More willing to place defences if a Commander is in the area
- Silver puts more effort into protecting planets they own from orbital attack
- Silver avoids building base defences against non-existent threats
- Less strict placement of anti-orbital defences when locking down a planet
- Fabbers try to be more efficient in where they go to place anti-orbital defences when locking down planet
- Fixed Silver not always using orbital fighters to attack orbital threats
- Fixed Silver not moving Booms between planets
- Fixed Gold MLA not using air scouts on multi-planet systems to check if it was alone on its planet
- Gold only land scouts when it thinks a local enemy exists
- Fixed Platinum building too many advanced air factories when alone
- Uber more aggressive in using the Icarus to correct energy issues on multi-planet systems
- Uber will build the Gustav as a defensive weapon where it has shields in its base
- Uber uses more Panzers
- Puts the Panzer in land armies not hover raids
- Uber gets more aggressive about maintaining mine vision once it has confirmed mines are in play
- Uber is more reliable at transitioning to orbital when alone

#### v4.44.2 - 2019-04-01

- Uber gives higher priority to Ares and Thor titans
- Updated French translation with thanks to sevmek
- Corrected error with T1 fabbers trying to build T2 Locust defences

#### v4.44.1 - 2019-03-28

- Uber won't assign Skitters and Investigators to scouting when they're being built for minesweeping
- Uber's Commander places anti-snipe defences closer to itself

#### v4.44.0 - 2019-03-27

- Gold will rush an orbital launcher on multi-planet systems when it cannot expand and has no orbital
- Platinum and Uber more reliable at rushing an orbital launcher on multi-planet systems when they cannot expand and have no orbital
- Fixed error when Uber played as Legion where it might tech to T2 naval first when there were no enemies on the planet
- Reintroduce behaviour for Uber that was incorrectly removed designed to handle multi-naval planet systems
- Uber uses a lot more Monstrosities
- Uber Legion puts more priority on getting its T2 fabbers out before producing T2 troops
- Uber builds T2 air later
- Uber FFA techs slightly later
- Uber takes a proactive approach to orbital
- All difficulties tech as soon as possible if alone on a planet
- Uber will build orbital launchers on the water
- Avoid building duplicate orbital launchers in shared armies
- Resolved edge case where Uber wouldn't replace its lost orbital launcher
- Silver and higher can no longer get trapped on asteroids
- Commander tries to build around the main base where it's theoretically safer
- Silver uses less air
- Uber produces more Investigators and Skitters to spot mines
- Uber uses slightly less Storms
- Monstrosity and Spark moved into main bot squad

#### v4.43.0 - 2019-03-08

- Updated translations (https://poeditor.com/join/project/avPZrv6yyE)
- Uber counts Novas towards bomber-gunship platoon formation
- Uber Aggressive and Uber Rush can open two bot factories
- Corrected Uber not putting enough assistants on its first air factory
- Further improve Uber's pond build behaviour
- Updated Uber's use of Bluehawks and Gil-Es in response to the evolution of the meta
- Uber builds the Sheller independent of the amount of Gil-Es it has
- Moved heavy tanks back into the Close squad
- Suicide bot platoons are formed earlier in high threat scenarios
- Don't try and put Locusts in bot scout platoons
- Uber has a higher bot factory minimum for its opening build
- Removed aggressive naval scouting behaviour as shore bombardment behaviour appears to have been improved in 112686
- Fixed errors in placement of advanced torpedo launchers for base defence
- Uber will attempt to defend islands from ships using shore-based torpedo launchers
- Corrected error preventing the building of the Tsunami
- Uber won't produce more Piranhas than it can use
- Base defence will be put in smaller bases
- Uber's Locust attacks are back in the hands of the neural net
- Uber Rush no longer builds suicide bots
- Uber Rush no longer overestimates its strength
- Removed restriction on number of air platoons at all difficulties
- Introduced minimum bomber-gunship platoon size requirements at all difficulties
- Gold, Platinum and Uber will build the Stingray for vision
- Ensure naval unit pool check matches platoon squad criteria for Casual, Bronze and Silver
- Corrected Uber building too much T1 naval
- Removed redundant builds following spawn pathing detection improvement
- Silver, Gold and Platinum ensure they don't produce more Sparks than used by their platoons
- Uber no longer builds orbital transports on gas giants
- Silver gives a higher priority to anti-orbital defences
- Bronze will build Catapults when alone
- Uber gives a much lower priority to building radar
- Bronze and Silver produce Sparks later
- Allow for "good enough" placement when trying to place defences to protect the Commander
- Improve ground anti-orbital placement
- Uber will place anti-Kaiju Catapults on water as well as land
- Reduce the number of anti-orbital Catapults that Gold, Platinum and Uber will build in one base
- Allow Casual to scout from orbit on any system size
- Casual scouts smarter
- Behaviour updated for gas giant combat fix
- Fixed Casual, Gold and Platinum sometimes not transferring orbital anti-ground lasers between planets
- Platinum and Uber avoid using orbital battleships as anti-orbital weapons where possible
- Uber Naval will only build hover or amphibious units from vehicle factories
- Changed how Uber decides when to start producing Sparks
- Casual won't build an orbital launcher first on arrival at a new planet
- Casual no longer uses the Manhattan
- Disabled usage of self-destruct titans
- Fixed error preventing Silver building Bluehawks
- When alone on a planet only build land troops if another planet wants them
- Uber Air and Uber Free For All and Uber playing as Legion will now always build air no later than second to avoid issues with the AI expansion routine on maps like PAX
- Fixed Uber Tank not building air second
- Uber will produce more orbital resource extractors when it is energy or metal blocked
- Uber gives priority to getting a factory on a gas giant
- Uber gives higher priority to anti-orbital defences when alone
- Uber will build orbital defences on gas giants
- Uber scales the amount of anti-orbital defence placed around the Commander in accordance with the threat
- Fixed issue with Uber Legion rushing Tolas at the wrong time
- Uber tries to be smarter about assessing orbital threats
- Subpersonalities now always use the correct fabber type for factories
- Uber avoids building expensive recon units on gas giants
- Fixed error delaying orbital scouting
- Uber builds less defence in orbit
- Made correction so Gold and Platinum may build orbital defences on gas giants
- Uber tries to avoid losing its Commander to single orbital lasers even if its eco is struggling
- Uber Orbital removed and its behaviour moved into Uber baseline
- Standardised behaviour for getting stuck on a single planet and removed excess build conditions
- Bronze and above will no longer move the Commander by orbital transport because of excessive stupidity
- Fixed an error preventing Uber making the correct number of T1 bot fabbers
- All difficulties excluding Casual return to a more conservative placement strategy for expensive builds
- Uber uses more Storms
- Look at friendly Air threat rather than AntiAir when making AA fabber and factory decisions
- Restore old search behaviour for how locations for MEX defence are found
- Check for Catalyst build points from builders not bases
- Uber builds less air factories when alone
- Uber builds more orbital fabbers on gas giants
- Gold, Platinum and Uber Free For All are faster to build orbital
- Gold and Platinum have reverted to a more proactive approach to orbital
- Avoid instances of idle orbital recon
- Platinum no longer builds the Wyrm
- Uber builds the correct ratio of Spinners when alone
- Improved how Uber decides when to build a Unit Cannon
- Removed Uber Neural
- Commander less likely to accept build assistance
- Commander continues to build energy even after teching to advanced buildings
- Removed Uber Rush's alternate approach to shared armies for ease of maintenance
- Removed offensive Catapult build for performance reasons as it was almost never used
- Don't build more factories if there's nowhere that wants the troops
- Uber Commander more aggressive at correcting energy issues
- Uber puts more priority on metal expansion when alone
- Ensure Unit Cannons don't stop building until full
- Always assume land factories have a land route to the teleporter when alone on a planet
- If a factory has hover units it's assumed that land blockages are water or lava and not CSG
- Updated difficulty recommendations for new leaderboard system
- Silver, Gold, Platinum and Uber grow their fabber presence when alone according to planet size not factory count
- Bronze, Silver, Gold and Platinum attack earlier with hover and amphibious platoons
- Bronze slightly less likely to place light artillery
- Silver slightly more likely to place light artillery but places less of it per base
- Bronze, Silver, Gold and Uber build less ground orbital factories
- Casual, Bronze and Silver no longer build Titans in response to an enemy air or orbital presence
- Casual will now correctly build the Helios regardless of the absence of enemy threats
- Fixed a bug that could cause Gold, Platinum and Uber to put all their bots on scouting duty when playing as Legion
- Corrected misalignment between criteria for building an anti-nuke and placing an anti-nuke
- Corrected misalignment between criteria for building Ramparts and placing Ramparts
- More aggressive about putting engines on asteroids
- Casual and Bronze won't build land and air titans on asteroids
- Updated or removed placement checks to comply with new max supported range
- Changed radius of Platinum threat checks for placing structures to match all other difficulties
- Bronze slightly more likely to use nukes and anti-nukes
- Bronze assigns much more importance to creating teleporters
- Gold, Platinum and Uber less likely to build radar when alone
- Fixed incorrectly including orbital satellites in base radar presence checks
- Uber more likely to build a bot factory when arriving on a new world with an air
- Ensured Uber Bot will build enough factories in all conditions
- Platinum and Uber are more aggressive about maintaining local intel when they think they're alone
- Correctly preclude Uber Naval from building bots when playing as Legion
- Correctly allow naval fabbers to expand air factory presence
- Fixed Uber Naval not properly expanding its T1 Naval Foundry presence
- Uber produces Bowheads sooner when facing a naval threat
- Avoid unnecessary torpedo defence checks when there's no enemy present
- Uber Naval techs as aggressively as land personalities
- Gold and Platinum build less advanced radars
- Radar no longer built as much for naval due to Stingray changes
- Tweaked radar placements
- Uber Rush will now use tanks
- Improvements to how Gold, Platinum and Uber decide when to send orbital fabbers to other planets
- Uber is a little less predictable in its orbital expansion
- Uber will use T1 energy to climb out of an energy stall
- Uber uses cheaper Laser Defense Tower to defend against Locusts now they've been nerfed
- Uber is much better about spending a boosted economy
- Expanded Locust defence behaviour to Legion Uber
- Casual will send orbital recon offworld to ensure its interplanetary weapons are used
- Fixed error which meant Casual and Bronze would almost never send orbital fabbers to other planets when playing as Legion
- Bronze sends orbital fabbers offworld a little earlier

#### v4.42.1 - 2019-01-21

- Uber Free For All works correctly again

#### v4.42.0 - 2019-01-18

- Uber will once again build Colonels and Praetorians when it has heavily lost air control
- Casual will build the Mend
- Uber only uses Colonels and Praetorians for AA once it has met its minimum advanced fabber requirements
- Most builds now done in the base closest to the fabber allowing for shorter pathing, riskier builds and greater variety of play
  - This can also result in some stupid, consider it a major change that will be monitored carefully
- Remove cap from how many Bluehawks Uber can make at once
- Uber will use a wider variety of fabbers to build AA structures
- Fix issue where Uber would build endless Advanced Torpedo Launchers by MEX
- Uber Rush will build suicide bots
- Uber will only send out bombers and gunships when it has enough fighters to escort them
- Added new personality Uber Neural which uses the neural net for all platoon creation decisions
- Uber Aggressive has been reverted to a slightly more aggressive version of its old form
- Uber is smarter about balancing Spinners and Storms in its platoons
- Uber Rush is more aggressive
- Updated Korean translation to ensure its presentation matches other translations
- Uber will use slightly more Spinners when losing air on a planet
- Uber less likely to expand its T1 naval presence
- Uber Naval more likely to expand its T1 naval presence
- Uber will use Legion advanced air fabbers to build T1 Ship Foundries
- Uber will prioritise getting T2 naval on land maps once it has T1
- Uber will only prioritise naval T2 on single planet systems

#### v4.41.0 - 2019-01-06

- Allow Uber FFA to open tanks
- Minor performance improvements for Legion Uber Tank
- Uber will build the Firebird now that it has been fixed
- Platinum and Uber more likely to build the Infiltrator

#### v4.40.1 - 2019-01-02

- It's no longer 2018 and we should not date our releases with this year

#### v4.40.0 - 2019-01-01

- Removed caps on air platoons for Uber
- Capped Uber's air scout platoons to stop it sending all fighters on scouting at the same time
- Uber Aggressive may delay its first air factory

#### v4.39.0 - 2018-12-31

- Limit the number of teleporter troop transfer platoons formed when not alone
- Uber allowed to build T2 air factories earlier
- Made hover platoon creation more efficient
- Fixed Uber not using the correct AA ratio in naval platoons
- Uber uses less fabbers to assist economy builds
- Uber invests less heavily in naval on multi-planet maps
- Uber Free For All invests in orbital earlier on multi-planet maps
- Uber Aggressive no longer over-estimates its strength
- Uber Aggressive will form larger numbers of small platoons to increase its activity on the map
- Uber will now always use any Icarus it has to defend its planet if it can
- Casual is slightly more metal aggressive in its spending

#### v4.38.0 - 2018-11-29

- Bronze is slightly more proactive at orbital scouting
- Unified how Bronze handles local orbital scouting for MLA and Legion
- Don't try and force AI to orbital scout if it doesn't want to
- Build Avengers and Vipers from orbital factories at all levels
- Fixed Uber MLA potentially teching to T2 naval slightly later than it should
- Bronze and Silver will ensure they have enough fabbers on a planet before building an advanced factory
- Corrected error where Gold Legion wouldn't tech to T2 vehicles when it couldn't expand
- Tidied up some redundancies and ordering inefficiencies in checks
- Corrected Platinum not properly checking for routes from T2 bot factories
- Corrected error where Platinum MLA wouldn't tech to T2 bots when it couldn't expand
- Platinum Legion was incorrectly using old code for teching to T2 air and bots
- Fixed all instances of placement and drain checks being performed against the wrong factory or unit
- Fixed Gold and Platinum not always counting a naval factory build against their concurrent build limit
- Removed limits imposed on Bronze and Silver for orbital scouting
- Removed AA factory builds from Uber Legion to match MLA
- Fixed Gold being unable to build the Astraeus
- Fixed Iron Dome rush builds being broken for Casual, Bronze and Silver
- Fixed Uber being unable to teleport its Commander when playing as Legion
- Fixed Platinum not scouting with Investigators
- Fixed Gold teching to T2 bots even when it couldn't afford it
- Added specialised asteroid builds which focus on getting a Halley online
- Fixed Silver Legion building a Walker Foundry without a land route
- Fixed an issue which could cause Uber to fail to scale up its fabber presence when alone
- Gold, Platinum and Uber are much faster at building their first orbital launcher if they're alone on a planet
- Platinum and Uber build more scouts if they can't find an enemy on their planet
- All levels more generous in determining valid bases for placement of ground anti-orbital
- Unified Uber MLA and Legion approach to ground anti-orbital
- Fixed error preventing Legion sometimes placing ground anti-orbital by superweapons
- Uber and Platinum maintain more scouts when alone on a planet
- MLA and Legion orbital launchers and factories are built near the fabber rather than the main base
- Fixed errors preventing Uber Legion from expanding properly
- Fixed all duplicate build condition names

#### v4.37.1 - 2018-11-19

- Introduced workaround for AI placement bug in 112176 onwards by allowing air opening if all else fails

#### v4.37.0 - 2018-11-15

- Uber transitions to T1 vehicles as game progresses
- Removed Uber's factory AA rules due to greater use of vehicles
- Uber correctly builds T1 vehicles when alone on a planet
- Booms now use dedicated platoons only
- Adjusted flexibility Silver and Gold have in sending out Booms
- Greater Gil-E usage by Platinum and Uber

#### v4.36.0 - 2018-11-08

- Check for presence of water rather than absence when forming hover platoons
- Fix Uber not properly checking T2 requirements before teching to T2 naval when floating eco and playing MLA
- Bluehawk built as part of standard army at all levels
- Uber builds Gil-E even without sighting tactical missiles
- Hover attacks always handled by land neural network
- Platinum and Uber scout with bots later into the game
- Uber more likely to stop using Single Laser Towers

#### v4.35.1 - 2018-10-17

- Fixed error preventing Uber forming bombing platoons after the early game

#### v4.35.0 - 2018-10-06

- Uber properly handles the overlap between Investigator and Guardian for mine detection
- Better spread of unit types between platoons
- Put Sparks back in the Fast squad
- Uber is more accurate in checking its AA needs when a shared army has MLA and Legion Commanders
- Fixed my most embarrassing error so far as I found factories were being counted in combat fabber checks
- Silver, Gold, Platinum and Uber minesweeper ratios changed in light of this bug but may need more work
- All difficulties understand that land scouts can see mines
- Gold will use the Guardian more often
- Bronze, Silver will build the Barnacle and Remora
- Gold, Platinum and Uber will build the Barnacle and Remora to detect mines
- Uber correctly searches from the perimeter inwards when looking to place Laser Turrets to defend MEX
- Allow Uber more freedom to use Catapults for base defence
- Uber rushes its anti-orbital based on the location of its fabbers
- Updated difficulty recommendations in readme
- Fixed Platinum not building the Stitch when needing minesweepers

#### v4.34.0 - 2018-09-30

- Changed how Uber decides to bring out Sparks which will lead to it using them more often
- Uber Bot will use Sparks
- Platinum and Uber will use Stitches to detect mines
- Fixed Uber Bot building vehicle factories when alone on a planet
- Uber gets out a fighter earlier

#### v4.33.0 - 2018-09-29

- Added Polish translation with thanks to Craeox

#### v4.32.0 - 2018-09-26

- Uber Naval won't build bot factories
- Don't build bot factories specifically for amphibious usage
- Uber uses less Narwhals
- Cleaned up some odd bot conditions in Gold and Platinum that I have no idea what I was doing with
- Translation adjustments to better align with official translations
- Uber no longer prematurely techs when using an elevated econ rate
- Uber Naval uses less Kaiju
- Uber no longer idles T2 naval factories when switching to hover units and playing as Legion
- Uber will build Advanced Torpedo Launchers outside the base
- Uber more likely to build Tsunamis outside the base
- Uber includes the Stingray in its anti-air ratio
- Uber Naval doesn't use pond builds
- Fixed Uber spamming Stingrays in ponds
- Added Swedish translation with thanks to Linus Petersson and Spassky
- Added partial Norwegian translation with thanks to Spassky

#### v4.31.0 - 2018-09-25

- Fix version numbers not displaying in Chinese (Simplified)
- Unified Chinese (Traditional) and Chinese (HK) translations
- Update Korean translation with Judou marks
- Updated Italian translation with thanks to Fred
- Updated Spanish translation with thanks to Fred
- Added Portuguese (Brazil) translation with thanks to CmdrEdem
- Added Russian translation with thanks to something more than human

#### v4.30.1 - 2018-09-25

- Removed empty strings from translations so they properly failback to the source text

#### v4.30.0 - 2018-09-24

- Eliminated situation where Bronze and Silver would try to go naval when alone
- Uber will build a battleship in a pond and defend it with anti-air to control the area
- Stopped Uber building more Narwhals than it should
- Uber requires greater sub dominance before producing battleships
- Changed how factory build checks are performed at Casual and Bronze to match the other levels
- Fixed some factory checks for Silver not having been properly updated for the changes in 4.27.0
- Ensure opening naval factory checks are used in the opening only
- Bronze properly only uses naval units when sharing a planet
- Changes to how all levels below Uber handle naval builds which should help performance but may make them slower to get in the water
- Fixed Uber Naval still trying to build naval with land fabbers
- Fixed Uber Naval not building Naval Foundries using air fabbers and floating eco
- Ensure advanced air fabbers try to build naval factories too
- Fixed Uber Naval being unable to use Legion naval fabber to ensure the second factory is air
- Help performance by limiting second air builds to the only fabber types that could exist
- Gold, Platinum and Uber won't wait so long to form Locust platoons
- Added behaviour to help prevent Queller getting stuck with only a single factory if it went naval first on certain planet layouts

#### v4.29.2 - 2018-09-20

- Fixed a bug which caused Uber Naval to sometimes start bots

#### v4.29.1 - 2018-09-15

- Uber Tank will go second air when playing as Legion
- Fixed priority Uber Air gives to additional air factories when floating eco
- Made changes to how Gold, Platinum and Uber handle not understanding the landing zone terrain
- Uber will properly handle a naval opening - you should still use Uber Naval for these though
- Fixed incorrect build condition name
- Fixed some personality assignment errors
- Updated the translation files

#### v4.29.0 - 2018-09-13

- Panzer builds at Uber level properly updated for changes to anti-air ratios
- Uber builds less Deathmarks
- Uber builds more Scorpions
- Improved checks for lava
- Uber builds less Monstrosities
- Increased chance of Uber building an Ares
- Fix for Gold, Platinum and Uber getting in situations where they wouldn't scout in the orbital layer
- Tweak to teleporter placement
- Gold won't build Locusts in Unit Cannon to work around an issue which caused them not to fire
- Uber builds more Minimen in response to Scorpions
- Uber won't build Praetorians in response to non-Titan air
- Uber Naval puts greater emphasis on T1 naval when it's fighting a sub war
- Don't look for naval build locations using land fabbers as it's rare enough that it's not worth the performance cost
- Capped the number of naval scouts Uber will use
- Uber won't build Hammerheads when it's losing the sub war
- Uber forms larger naval platoons for Legion when using Catfish
- Don't treat Kaijus as artillery
- Don't count Talos when forming offensive naval scout platoons
- Fixed hover units not being excluded from offensive naval scout platoons by Silver and Uber
- Uber uses a higher number of Peacekeepers in its early game forces and maintains a small amount later on
- Expanded lobby message to cover AI best practice
- Removed remaining references to Uber Land
- Fix for Gold, Platinum and Uber building too many Marauders at once
- Fixed Uber Tank not working correctly when playing as Legion
- Prevent Corsairs being put in the wrong squad
- Uber Naval will build air second with Legion as it doesn't have access to Patriots
- Uber Naval is smarter about meeting its fabber requirements

#### v4.28.1 - 2018-09-07

- Bronze, Silver and Gold now always make sure to check if a naval route is available from a naval factory
- Allow Uber to build advanced air a little earlier

#### v4.28.0 - 2018-09-03

- Casual, Bronze and Silver won't build most defences or artillery when alone
- Casual places less Umbrellas in bases
- Bronze won't grow its air presence when alone on a planet
- Casual, Bronze and Silver won't grow their naval presence when alone on a planet
- Casual and Bronze won't build Halleys on their main eco planet
- Casual more likely to build Unit Cannon
- Casual will send Manhattans through teleporters
- Casual, Bronze and Silver now rush anti-nukes when necessary
- Fixed the amount of anti-orbital being placed by Legion at low difficulty levels
- Reduced the amount of orbital defence placed by Casual
- Fixed Causal, Bronze and Silver not properly using hover units
- Properly exclude hover units from offensive scout platoons

#### v4.27.1 - 2018-08-28

- Fixed issue causing Silver, Gold and Platinum to keep orbital fighters on gas giants too long
- Fixed more build condition naming errors
- Fixed lobby version chat message being incorrect

#### v4.27.0 - 2018-08-27

- Uber doesn't run its energy as tight
- Corrected an error in Uber's energy handling
- Lowered priority of building factories specifically for AA
- Check Advanced Vehicle Fabricators can move around before Uber builds them
- Improve how Uber's Commander protects itself from air snipes
- Uber MLA uses far less Gil-Es
- Uber MLA uses less Bluehawks
- Reduce the amount of T1 factories constructed as an AA measure
- Uber Legion won't build more T1 bot factories for AA if it has a T2 bot factory
- Uber MLA Free-For-All uses less Locusts
- Uber MLA never uses Gil-E for AA
- Uber MLA less likely to build Colonels
- Changed how factory build checks are performed from Silver upwards to encourage more builds and help performance
- Corrected some build condition name errors
- Uber's Commander attempts to better protect itself against Boom and Purger snipes
- Uber avoids building land factories using air fabbers as the initiating builder
- Uber more consistent at teching
- Uber will build more advanced naval factories in ponds
- Uber MLA more willing to go tanks on planets it owns so as to increase likelihood of Levelers
- Removed Uber Tech personality
- Removed Uber Land personality
- Uber Free For All won't use fighters for scouting
- Remove some checks which stopped Uber Free For All from using tanks when it should
- Uber Naval uses more Krakens
- Separate Kaiju from naval platoons again to prevent hording when facing sub fleets
- Uber assigns less fabbers to metal expansion when alone than it did before
- Fixed Uber Legion not properly checking for advanced metal extractor possibilities when alone
- Uber Naval builds an advanced naval fabber before advanced offensive ships
- Further delayed Uber's building of advanced air
- Uber prioritises metal expansion over energy
- Uber Free For All is a little less expansive
- Uber Air won't open with air
- Uber more likely to produce Spinners when sighting air
- Reduced the percentage of Uber's land forces comprised of mobile AA

#### v4.26.3 - 2018-06-23

- Mod icon correctly linked using HTTPS
- Corrections and updates for Chinese (Traditional) with thanks to IPWIW

#### v4.26.2 - 2018-05-02

- Corrections and updates for Chinese (Traditional) with thanks to IPWIW

#### v4.26.1 - 2018-04-24

- Corrections to Chinese translations with thanks to omylist

#### v4.26.0 - 2018-04-17

- Added translations for:
  - Chinese (Simplified) (zh-CN)
  - Chinese (Traditional) (zh-TW)
  - Chinese (Hong Kong) (zh-HK)

#### v4.25.2 - 2018-04-08

- Updated German translation with thanks to tunsel
- Corrected some issues with Uber Legion's nuke builds
- Uber won't build long range artillery in reaction to naval any more

#### v4.25.1 - 2018-04-03

- Increased priority Uber gives to going orbital

#### v4.25.0 - 2018-04-03

- Fixed an error in Uber Air's economy handling
- Updated Uber Rush to make use of multiple Commanders
- Fix for Legion Commanders not leaving their starting planet
- Continue to build basic energy into the late game
- Uber Legion checks it has enough fabbers before having them build energy
- Uber more likely to throw additional resources at building nukes
- Uber less likely to throw additional resources at anti-nukes with a missile in the silo

#### v4.24.0 - 2018-03-27

- Corrected issue on naval maps which could cause Bronze and Silver to not produce fabbers
- Bronze now spaces its defences
- Corrected inconsistencies in defence spacing
- Allowed tighter placement of anti-orbital defences
- Bronze will build the Hive on the perimeter
- Fixed Uber not building the Laser Defence Tower when it was supposed to
- Corrected errors preventing defence placement in certain circumstances
- Changed how each difficulty detects where it can place defences
- Bronze and Silver try to avoid placing laser turrets on water
- Consider more than just land threats when placing Ramparts
- Push Uber's MEX defence further from the base again
- Uber slightly more likely to use the Single Laser Defence Tower and Jackal
- Fix Uber Legion not putting Tolas by super weapons
- Uber more likely to put AA by MEX

#### v4.23.0 - 2018-03-24

- Additional language translations:
  - Korean (ko) translation courtesy of R.O.S.S
- Uber Legion will use a small number of Monstrosities balanced against its advanced bots
- Fixed subpersonalities not teching at the same speed as Uber
- Uber Cautious will tech as quickly as Uber Tech
- Properly exclude hover titans and Locusts from hover platoons
- Changed how Locusts are used to avoid them engaging units
- Uber less likely to use support commanders
- Lower the number of factories Gold, Platinum and Uber can use to make Locusts
- Uber makes greater use of turrets around its MEX
- Uber doesn't place MEX defences as close to the main base
- Uber tries to place defences to deal with Locust threats
- Gold, Platinum and Uber properly check energy before building orbital scouts
- Uber favours the Catapult over the Advanced Laser Turret
- Uber checks advanced units are around before building Decimators
- Casual through Silver should never get stuck on their starting island
- Don't rush for a T1 naval factory if a T2 naval factory still remains
- Won't keep building units to clear mines when the enemy's planetary presence has been removed
- Corrected Gold Legion not building certain units for invasions
- Gold Legion is a little more selective with its advanced unit mix
- Casual will build fabbers even when under attack
- Bronze won't build fabbers when its base is threatened
- Platinum uses less Deathmarks
- Platinum and Uber no longer build Locusts in the Unit Cannon
- Uber produces less Bluehawks in response to orbital threats
- When thinking about Bluehawks and Panzers Uber will only worry about the local orbital threat when still fighting for the planet
- Platinum and Uber check that an air threat exists before building AA for invasion forces
- If alone on a planet don't build troops unless there is somewhere to send them so as to save the sim and free up resources for other purposes
- Corrected what appeared to be errors in Uber Bot's T2 Legion choices
- Ensure proper chance of Uber MLA teching to T2 tanks when alone
- Move Locusts between planets
- Minor changes made to various checks to try and help performance
- Fixed difficulties below Uber not assigning Levelers to platoons
- Fixed Levelers not being sent through teleporters
- Uber no longer requires a base amount of vehicle fabbers
- Allow Uber to build Tyrs on multiple planets at the same time
- Reduced Uber's usage of Anchors and Centurions to defend ground bases
- Allow Gold, Platinum and Uber to use Anchors and Centurions across more of a planet
- Stopped Umbrellas including anti-ground defence in their placement calculations
- Uber tries be smarter about when it needs certain anti-orbital units
- Never have orbital scouts or radar perform recon on a gas giant
- Allow building of amphibious bots again due to land pathfinding detection sometimes failing causing factories to idle
- Restore old defence placement method to reduce undercounting of defences
- Uber won't use more orbital fabbers when alone
- Setup lobby messages to work with translations
- Fix for orbital units never leaving gas giants
- Gold more aggressive about their gas giant expansion
- Combined some orbital defence checks for performance
- Less orbital defence at most levels
- Uber uses less orbital fabbers outside gas giants
- Orbital factory builds no longer block land factory builds
- Gold, Platinum and Uber choose between T2 factories or Unit Cannons to ensure focused builds
- Uber Cautious is now Uber Free For All
- Uber Free For All is less cautious
- Don't build a transport for Commander evac if a teleporter is available
- Won't allow gas giant attack bug to trap it in an anti-orbital build loop
- Gold, Platinum and Uber no longer increase the naval fabber to factory ratio when alone on a planet
- Uber Free For All doesn't prioritise early air as highly
- Place artillery slightly within max range to account for interference from planet curvature
- Uber less likely to build Solar Arrays
- Gold will tech if it can't expand
- Gold won't rush a nuke as early
- Gold and Platinum prioritise a teleporter over a factory when arriving on a new world
- Uber uses a new method to determine the risk of nukes it hasn't scouted on other worlds existing
- Casual, Platinum and Uber more likely to use a planet splitter titan
- Uber Legion fabbers now properly aligned with the Commander on when vehicle factory builds should occur
- Don't form a land platoon if the only thing available to attack is naval
- Uber doesn't mistake T1 artillery for T2 when placing Ramparts
- Uber accounts for the difference in range between MLA and Legion artillery when placing Ramparts
- Don't make the Odin turn as much due to low turret speed preventing it from tracking
- Fixed error where Uber was placing defences outside of shields instead of inside them
- Uber Legion uses less T2 defence at each location
- Uber more likely to use Decimators when it has Ramparts
- Ensure that on arriving at a new world a teleporter is always placed before a factory

#### v4.22.0 - 2018-03-16

- Properly exclude naval units from land and air scout ratio checks
- Prevent Platinum over scouting with Fighters
- Allow all levels to be much freer with their bombers and gunships to try and help prevent air sitting in base
- Limit the splitting of air forces again
- Largest Locust platoon made smaller to allow for quicker deployment
- Uber allowed to build nukes and Titans a little earlier again
- Less Locusts built by Uber
- Uber now has the option to try for a nuke when it's losing on the land
- Properly exclude Locusts from army available unit checks
- Scout with fighters only when there's nothing they're needed for right now

#### v4.21.2 - 2018-03-10

- Fixed issue where naval production was intermittent early on mixed sea/land maps
- Fixed issue causing Queller Legion to build too many turrets in one place

#### v4.21.1 - 2018-03-09

- Fixed issue causing Bronze and Silver to build orbital factories on the ground. Thanks to Xangi for tracking this one down.

#### v4.21.0 - 2018-03-04

- Silver and above only use area builds for metal which will help sim performance
- Uber builds MEX more aggressively once it owns a planet
- Updated for changes to the AI Mod Compatibility Framework

#### v4.20.3 - 2018-03-02

- Uber Naval won't build laser towers by MEX to avoid uselessly building them on water
- Uber properly considers subs in addition to ships when considering torpedo base defence
- Fixed error where Gold would not build torpedo launchers in response to subs

#### v4.20.2 - 2018-03-01

- Introduce failback behaviour for Uber Naval to prevent idle factories due to misdetection of ability to deploy naval

#### v4.20.1 - 2018-02-28

- Correct lobby version number

#### v4.20.0 - 2018-02-28

- Uber builds a tiny number of Vanguards to provide radar for Shellers
- Uber less likely to produce as many Gil-E when alone and Shellers are an option
- Uber won't build advanced specialist units until it has its advanced fabbers out
- Owing to AI targeting issues Queller will now stop building Dox when it realises it can't path by land
- Uber Naval properly limits basic factory building
- Uber will use a small amount of Locusts and more when dealing with naval maps
- Send out Locust swarms earlier in the late game
- Uber won't build Pelters and Theodors to counter naval any more
- Fix Uber Naval making too many air fabbers
- Uber uses less Shellers
- Bronze uses less Pelters and Theodors
- Bronze more likely to use Catapults near the front
- Catapults always properly included in base defence counts
- Ramparts always properly excluded from base defence counts
- Uber prioritises getting out an early Firefly
- Uber puts out more early Piranhas and Catfish
- Uber far less likely to use bots on island maps unless it can push to advanced bots
- Uber will no longer get stuck on naval maps (though you should still use Uber Naval)
- Corrected Uber Naval over producing T1 factories when floating
- Allow Uber to use more T2 naval when floating eco
- Uber Naval much more aggressive about teching
- Corrected Uber failing to expand T1 naval to counter subs
- Unified a lot of Uber and Uber Naval behaviours as Uber was performing better in the water
- Uber Naval always assigns hover units to its naval attack behaviours

#### v4.19.0 - 2018-01-27

- Uber will use a small number of Gil-Es as a counter to Catapults
- Uber more willing to scout with the Firefly
- Let Casual build the Manhattan because why not
- Properly exclude orbital fabbers from fabber counts where appropriate
- Platinum and Uber will develop more fabbers before trying to build nukes
- Gold through Uber will develop more fabbers before trying to build Titans
- Gold through Uber will check how the ground war is going before trying to build nukes
- All levels allow more fabbers to assist building a planet splitter Titan
- Adjusted handling of Sparks and Monstrosities
- Fixed broken behaviour for building more factories when floating
- Uber prefers Hermes and Spectre for local orbital scouting
- Uber Naval can now correctly expand its naval presence with naval fabbers
- Platinum no longer has behaviours for spending excess eco
- Uber won't use excess eco to expand its T1 presence outside of specialised subpersonality behaviour
- Only Uber Naval will now use excess eco to expand its naval presence
- Uber won't use T2 fabbers to build T1 factories outside of some specialised circumstances
- Fix possible issue with Platinum and Uber Commanders escaping by orbital transport
- Removed experimental give up behaviour that shouldn't have been in release
- Uber no longer makes more factories than intended when building for AA
- Uber uses a small number of Shellers as standard
- Uber uses less Gil-Es and Storms in invasion forces

#### v4.18.0 - 2018-01-19

- No longer prioritises nukes over Holkins
- Increased priority of Ares Titan
- Uber techs a little earlier
- Tone down Uber's love of nukes slightly
- All difficulties give Titans more space when building them

#### v4.17.2 - 2018-01-16

- Corrected how many fabbers Uber Legion puts on building nukes when alone
- Uber prioritises nukes over Holkins if the target has no anti-nukes
- Correctly checks whether an ally is building planet engines or Catalysts when playing as Legion
- Capped the number of factories Uber can build at once when floating eco
- Removed rarely used Platinum and Uber metal expansion routines to improve performance
- Fixed bug interfering with Bronze through Platinum properly forming new armies
- Fixed bug preventing Silver building orbital factories in certain situations
- Fixed bug preventing Platinum rushing orbital when other players do
- Fixed bug which could delay Uber closing out a game as it required anti-air units to form large armies
- Exclude scouts from unit counts when forming armies
- Better division of air defence between armies

#### v4.17.1 - 2018-01-13

- Resolved an issue that would cause Gold to sometimes idle its naval factories
- Lobby message now includes version number

#### v4.17.0 - 2018-01-12

- Increase spacing between Uber radar builds
- Uber more likely to build additional radars when using ships
- Casual MLA now correctly builds orbital fabbers from orbital factories
- Casual MLA will now build Avengers from orbital factories
- Casual Legion will not build T1 recon from T2 orbital factories
- Casual through Silver won't build orbital transports on gas giants
- Fixed building a transport for the Commander to retreat
- Fixed not always moving orbital radar away from gas giants should they somehow end up there
- No longer tries to transfer orbital scouts which don't exist
- Casual and Bronze now scout with orbital on single planet systems
- Casual will build the Helios
- Air and Orbital Titans react to the presence of air and orbital units at all difficulties
- Prevent low levels bouncing orbital scouts and radars between planets

#### v4.16.1 - 2018-01-09

- Resolved an issue that could cause Bronze and Silver to stop expanding on island maps
- Casual through Silver may now open naval first on maps like Pacific
- Bronze and Silver will always open air or naval on island spawns to prevent expansion issues from occurring
- Fixed errors in Legion naval foundry placement
- Additional checks to stop low levels crippling expansion with naval fabbers

#### v4.16.0 - 2018-01-06

- Casual slower to expand
- Casual builds Titans further from the base to avoid blocking them in with future builds
- Modified recommended difficulty levels in readme
- Uber Bot no longer builds vehicle factories when low on AA
- Uber Tank no longer builds bot foundries when low on AA
- Uber just as likely to tech to bots as vehicles when playing MLA
- Fixed error preventing Uber Bot from properly spending its eco on T2 factories
- Uber prioritises T2 over the need for more AA for the most part

#### v4.15.0 - 2017-11-18

- Platinum will build the Gil-E
- Uber will build Shellers in response to Gil-Es
- Uber will build Gil-E in response to advanced air
- Fixed error in Uber's Gustav placement
- Uber doesn't build the Monstrosity again
- Tweaks to which base a structure is placed in and where in the base it's placed
- Gold through Uber must be losing a planet more heavily before building a planet splitter
- Casual will continue to use its Commander to build metal extractors throughout the game
- Fixed error with lower levels checking how many radar satellites were moving through space
- Fixed Platinum building nothing but Catfish from its naval factories
- Uber is more likely to build defence by its MEXs
- Fixed Uber not building AA by MEX expansions close to the main base
- Properly exclude orbital factories from checks related to moving to T2
- Bronze and Silver faster to get orbital factories once they've gone orbital
- Bronze and Silver will scout with Marauders
- Moved Novas into a valid air squad
- Platinum and Uber will now rush orbital on multi-planet maps if other players have done so
- Gold no longer builds the Necromancer
- Uber builds more Catfish
- Ensure Sparks are in the proper squad when teleporting
- Ensure Bluehawks are always treated as a long-range unit
- Removed the amphibious platoon
- Less willing to disengage with short-range units like Infernos and Mauls
- Uber places greater emphasis on protecting the Commander against nukes
- Uber avoids spamming Barracudas just because it saw some Stokes
- Uber more likely to build Iron Domes
- Uber more likely to build the Tyr
- Uber favours the Tyr over other Titans
- Uber more likely to build Catalysts
- Silver won't build Catalysts when the enemy is on the planet
- Bronze and Silver won't put their only fabber to building a Catalyst
- Fixed error which might have stopped some difficulties moving the Tyr between planets
- Silver, Gold, Platinum and Uber require more orbital units before moving between planets
- Stopped lower levels sometimes arriving and immediately leaving with orbital
- Uber better about switching between Barracudas and Orcas as needed
- Properly account for sub threats when building torpedo launchers
- Gold, Platinum and Uber more likely to build torpedo launchers to defend MEX
- Gold and Platinum more likely to build base defence
- Uber builds less base defence
- Build additional radars at the outskirts of territory rather than the interior
- Uber will use Pelters only on land
- Platinum and Uber won't build air on asteroids
- Uber will correctly move to T2 naval in lakes without enemies when playing as Legion
- Uber more willing to tech for hover ships in lakes
- Fixed issue where Uber was sometimes unable to place MEX AA even though it wanted to
- Bronze, Silver and Gold are a tiny bit worse at threat assessments than before
- Uber Cautious no longer produces more initial advanced fabbers than Uber
- Uber faster to build advanced factories in response to excess income
- Uber more cautious in use of solar arrays
- Uber will use more Avengers and Vipers
- Uber will use the Imperator more
- Uber will use support commanders when losing the air
- Uber is more willing to use Novas
- Uber places its base defences around Ramparts when playing as Legion
- Properly account for Catapults when spacing defences
- Uber brings out Mauls earlier when facing bots
- Ensure Ramparts built to defend things are in range to actually defend them
- When Uber is losing to air it prioritises getting factories which can produce anti-air
- Uber gives greater weight to producing mobile T2 AA when required
- Don't build multiple factories at once on a new world
- Bronze through Uber won't build offensive structures on asteroids
- All difficulties will use Catapults as an anti-orbital defence
- Uber prioritises orbital if there's an orbital threat on a multi-planet map and it hasn't gone orbital yet
- Uber won't build air Titans when alone
- Uber and Platinum properly tech up naval when they can't expand
- Always meets minimum fabber count regardless of terrain
- Platinum and Uber are more aggressive about teching when they can't expand

#### v4.14.1 - 2017/09/10

- Lobby message tells players how to select a Queller AI

#### v4.14.0 - 2017/04/21

- Fixed Ramparts getting built too close to one another at higher levels
- Casual and Bronze now build the Typhoon
- Bronze and Silver push faster to get an anti-nuke if there's a nuke threat
- New amphibious platoon for mixed faction armies
- Properly micro Stokes in their own platoon
- Uber uses less Legion AA ships
- Uber makes greater use of Catfish against naval threats
- Fixed issue causing Uber Legion factories to pause production prior to enemy contact
- Uber can use more fabbers to assist nuke production
- Uber MLA can build tanks earlier
- When unable to expand Platinum and Uber will tech if they haven't already
- Uber Cautious less likely to scout in an antagonistic way
- Changed how Uber Legion performs its initial scouting
- Uber will use Skitter to scout if it hasn't found an enemy yet
- Gold will scout with the Investigator
- Uber no longer idles scouts sent to other planets
- Uber builds Corsairs earlier
- Smarter limit on the number of Talos built by Casual through Platinum
- Platinum uses less Monstrosities
- Gold no longer patrols all its Marauders when alone on a planet

#### v4.13.0 - 2017/04/02

- Increased distance between Jigs and Rigs at higher difficulties
- Platinum uses more bots
- Platinum uses less Sparks
- Uber MLA slightly more likely to to tech vehicles
- Platinum no longer uses Grenadiers
- Platinum will always prefer to open with bots over vehicles
- Uber Legion never goes T2 air first
- Platinum no longer uses the Gil-E

#### v4.12.3 - 2017/03/24

The Queller AI **Client** is no longer required and should be uninstalled.

- mikeyh updated personality script to account for changes in 99377
- Additional language translations:
  - Español (es) translation added courtesy of gmase
  - Nederlands (nl) and Nederlands (België) (nl-BE) added courtesy of PRoeleert
- Fixed Queller translations breaking PA translations

#### v4.12.2 - 2017/03/17

- Uber requires less air dominance before building a Zeus
- Properly use client mod as companion and not only a dependency
- Fix an issue that might cause the vanilla AI to tech earlier than it was supposed to

#### v4.12.1 - 2017/02/28

- Disabled translations owing to PA translations breaking with them active

#### v4.12.0 - 2017/01/22

- Translated Queller difficulties to local languages as best I can
  - Deutsch (de)
  - Français (fr)
    - Thanks to K-Orthic | Gamax
  - Italiano (it)
- Uber builds support commanders in response to air titans
- Silver is no longer capped on sending troops off-world
- Bronze and Silver won't build an orbital factory as their first factory on a new world
- Silver gives a higher priority to building a teleporter on new planets
- Silver doesn't produce air when alone
- Silver more likely to go orbital on multi-planet systems even when not alone
- Tweaked when Silver, Gold and Platinum tech when alone
- Silver will move fabbers by orbital transport a little quicker
- Stopped Silver from wrecking its early economy by going orbital too quickly
- Silver sends orbital fabbers off-world earlier
- Fixed error with Silver not always forming bombing platoons when it should
- Fixed error preventing Uber from using the Infiltrator in some situations
- Silver produces less early orbital fabbers
- Gold now sends basic AA with its invasion forces
- Gold and Platinum will use the Grenadier as part of their invasions
- Bronze can form an attacking platoon earlier
- Gold no longer crashes its energy
- Won't build an orbital factory unless it has established a meaningful fabber presence
- Gold will build more fabbers when alone
- Platinum uses less Shellers and Gil-Es
- Fixed error in Uber Legion T1 energy builds
- Platinum uses less Grenadiers
- Silver will no longer go all air
- All difficulties more likely to build Catalysts
- Gold uses less Shellers
- Gold uses more Vanguards
- Gold will use Sparks in invasions
- Updated difficulty recommendations
- Uber can build tanks earlier
- Uber will build more fabbers when alone
- Implemented change to reduce chance of Uber wrecking its economy when going orbital alone
- Uber faster to respond to late game energy shortages

#### v4.11.1 - 2017/01/20

- Prefixed all difficulties with Q for ease of identification

#### v4.11.0 - 2017/01/19

- Build artillery and Catapults in response to naval near the base
- Restored Uber Tech
- Check the right threat when assessing whether to build Catapults in response to Kaiju
- When alone Uber limits the number of T1 factories to help the sim and focus on saving for higher tech items
- Avoid running certain checks when alone to help performance
- Less air factories when alone
- Uber Legion won't try and force early air
- Uber is a bit more willing to commit to Omegas when assaulting other worlds
- Uber Air correctly builds T1 air when alone
- Uber more reliably builds air second and does so in a more performance friendly way
- Uber gives higher priority to defending its Commander from orbital snipes
- Uber focuses on producing Spinners from its vehicle factories when alone
- Cap on how many factories Uber will use for the production of Storms
- Revoked change to Uber's building of Catalysts
- Give a higher priority to assisting nuke production when alone on a planet and put more fabbers on the job
- Uber will only send orbital reinforcements in force now rather than dribs and drabs
- Uber gets orbital battleships off gas giants quickly
- Uber focuses solely on clearly local orbit before committing to any other orbital military operations
- Uber won't over-micro Levelers
- Fixed Legion not building advanced fabbers when alone for many factories
- The numbers of advanced fabbers Uber builds are now based on enemy layer presence
- Uber more likely to produce Spinners as needed
- All Uber personalities except Tank require larger land platoons before moving out
- No upper limit on platoon sizes to better allow combining multiple forces into one
- Uber no longer builds the Gil-E
- Fixed scouting with fighters being broken
- Loosened restrictions on orbital travel for lower levels a little
- Silver willing to move more troops at a time via teleporter
- All system-wide counts replaced with planetary ones for performance reasons
- Platinum will tech faster
- Uber gets tanks a little later on larger planets

#### v4.10.1 - 2017/01/14

- Uber Tank will use Skitters to scout
- Uber Bot will use Investigators to scout
- Uber no longer fails to scout on small maps like Forge
- Stopped non-naval Uber profiles building naval scouts they won't use
- Corrected mistake stopping Uber Legion from using Marauders to scout more than once
- Fixed sub-personalities using the wrong number of fabbers
- Correct Uber Legion T2 vehicle factories not operating correctly if they never saw bots
- Uber Bot Legion works again
- Allow land fabbers to build torpedo launchers in naval bases
- Uber Land will never build naval defences
- Uber Bot can build the Miniman
- Properly capped Investigator scout platoons

#### v4.10.0 - 2017/01/13

- Uber MLA focuses on T1 bots rather than tanks
- Uber MLA will use T2 bots as well as tanks
- Uber decides between factories on a new planet based on enemy layer presence
- Don't bring out the Spark until after teching and only in limited numbers
- Uber will use advanced fabbers to build defences by MEX
- Uber uses less Gil-Es to shoot down tactical missiles
- Uber gets naval fabbers out without waiting to confirm that they can travel
- Uber no longer gets confused and stops producing offensive land units from T2 land factories
- Uber builds more orbital fabbers when alone
- Uber won't build advanced naval without a surface threat
- Uber Legion will build advanced naval if it's being stopped from expanding
- Tweaks to help Uber recognise faster that it's safe to rush orbital
- Made some changes to help Silver avoid getting stuck on a single planet
- Bronze and Silver will go orbital faster in multi-planet games
- Casual and Bronze less selective in their orbital unit builds
- Casual, Bronze and Silver take longer to send orbital fabbers to other worlds
- Casual, Bronze far more restricted in moving orbital units between planets
- Casual, Bronze and Silver are slower to scout other worlds
- Added minimum fabber requirements to Catalysts at almost all levels so they don't stop interplanetary expansion
- Properly exclude orbital fabbers from Catalyst build checks
- Uber much more likely to go orbital if the enemy does and it has no orbital presence
- Uber gives higher priority to its first anti-nuke on multi-planet maps
- Uber less likely to build Catalysts when it can't commit to all five

#### v4.9.0 - 2016/12/22

- Moved Sparks and Monstrosities into the fast squad for land attacks
- Fixed error causing Uber to produce Deathmarks when it shouldn't
- Fixed errors in build condition names
- Correctly ignore Storms when considering Miniman ratios
- Update Uber Legion builds for Legion Expansion 1.0
- Uber better about avoiding an early energy stall
- Uber uses an additional early fabber
- Reverted change to minimum distance from base required for MEX defences
- Uber Cautious starts with more fabbers
- Uber much more likely to build metal storage when required
- Increased chance of defences being built by MEX at Uber level when playing as Legion

#### v4.8.0 - 2016/12/06

- Bronze Legion no longer spams OmniSilos
- Fixed Silver building less storage than intended
- Uber no longer builds the Meteor
- Uber builds the Salamander again
- Uber chooses between Salamander and Lockheed based on the AA types it has seen
- Fixed errors in number of Uber air scouts
- Corrected error which could cause Uber Legion to prematurely go T2 air
- Uber Legion gives priority to air scouts over combat units
- Uber Legion will scout with combat bots again
- Uber only uses Scorpion if it has seen bots otherwise it favours the Deathmark
- Uber won't build Fireflies if it doesn't need scouting intel
- Uber MLA only triggers its anti-bot behaviour on maps with land routes to the enemy
- Uber MLA will go T2 tanks against all bots in anticipation of advanced bots
- Uber won't build T2 tanks in areas with no land routes to the enemy
- Uber more flexible in where its land fabbers come from
- Uber will build Catapults to defend against tanks
- Uber uses Advanced Laser Defense Towers as an anti-bot weapons
- Uber counts Advanced Laser Defense towards total base defence rather than separately

#### v4.7.0 - 2016/12/02

- Gold through Uber tech faster though Uber Rush remains unchanged
- Uber Tech has become Uber Orbital
- Uber Rush's one fabber preference no longer overridden
- Uber MLA will use a limited amount of T2 air
- Increased chance Uber Legion will use T2 air
- Uber Cautious correctly rushes orbital on multi-planet maps
- Every level will now use no more than one bomber group and one fighter group at a time
- Gold through Uber always use the largest fighter or bomber platoon possible
- Corrected error where Silver formed a bomber platoon smaller than it wanted to
- Uber uses less air scouts
- Uber uses less fighters to scout
- Uber won't scout a planet with Skitters or Investigators but will still send them to scout other planets

#### v4.6.0 - 2016/11/29

- Uber no longer builds the Wyrm
- Fixed error where Uber Air MLA Commander was not properly building T1 air factories
- Uber more likely to build Phoenix
- Uber only builds fighters when alone if there is an air threat somewhere in the system
- Uber will use basic radar to support T1 artillery
- Ensure everything works as well as possible in a mixed faction shared army setup
- Fixed overproduction of Angels
- Fixed issue leading to little to no Kestrels at Gold, Platinum and Uber
- Restored air dominance Uber requires before building Kestrels
- Uber no longer builds the Angel
- Uber Air favours the Zeus and Loki titans
- Gold and Platinum build less Angels

#### v4.5.0 - 2016/11/22

- Silver techs later when alone
- Platinum techs earlier when alone
- Uber has a smaller sized planet requirement for additional bot factories
- Uber slower to go orbital when there's a ground threat but Uber Tech rushes orbital
- Fixed Uber Cautious not teching as quick as it's supposed to
- Uber no longer thinks a teleporter it built in its main base represents a beachhead
- Casual and Bronze will build the Icarus
- Bronze and Uber can use the Icarus to attack
- Uber favours the Meteor as its Legion T2 air choice
- Removed caps on Meteor builds across all levels
- Meteors can be used to form bomber platoons
- Uber slightly more likely to use T2 Legion air
- Fixed Uber Air MLA not teching when it can't expand
- Uber places its orbital factories further away from Jigs and Rigs
- Uber won't send land scouts intended for mine spotting off scouting
- Uber will build a transport for Commander evac if it wants to run and its teleporter is about to run of energy
- Uber won't build a Tyr unless it has enough fabbers to do it quickly
- Uber less likely to build defences around a teleporter unless it has spotted a threat
- Uber only anticipates nukes on other worlds if it's likely someone is on that other world

#### v4.4.0 - 2016/11/18

- Corrected and unified heavy unit checks
- Amount of Miniman units depends on what Uber has seen and has been reduced overall
- Uber doesn't use the Monstrosity
- Numerous personality updates to reflect changes in human playstyles:
  - Casual
    - New personality which takes on the role of the old Bronze
  - Bronze
    - Prioritise defence at the perimeter rather than inside the base
    - Much lower chance of orbital factories and Unit Cannons on single planet maps
    - More T1 before teching
    - Better economy handling
    - Expand a little better
    - Use a small amount of land units on naval maps
    - Less fabbers though still a lot
    - Builds a factory first
    - Less opening fabbers
    - Make Titans later
    - More likely to enter the water
    - Can send out smaller bomber/gunship platoons
    - Smaller delay between units being produced by factories
    - Sends some units early on to check whether it has land or naval routes to you
    - Produces less initial advanced fabbers
  - Silver
    - No delay between units being produced by factories
    - Expands more aggressively
    - Less likely to use orbital on a single planet map
    - No longer builds Unit Cannons on single planet maps
    - More early fabbers
    - Make Titans later
    - Slightly more flexibility building factories
    - Will use a small land presence on naval maps
    - More scouting options
    - Can send out smaller bomber/gunship platoons
    - Less T1 static artillery
    - Less defence in the main base but more on the front lines
    - Uses Booms and Purgers
    - Produces more initial advanced fabbers
  - Gold
    - No longer builds Unit Cannons on single planet maps
    - More early fabbers
    - Techs earlier
    - Builds Booms later
    - Builds Purgers
    - Produces more initial advanced fabbers
  - Platinum
    - Techs earlier
    - Produces less initial advanced fabbers
  - Uber
    - Legion has a much greater focus on bots
    - Produces less initial advanced fabbers
- Fixed my misunderstanding in storage ratios which led to most levels not building storage
- Prioritise Catalyst over Halley/Diplomat where a planet supports both
- Silver properly excludes all invalid units from its scout platoon
- Uber Rush is now a T1 focused Uber Bot with less opening fabbers
- Uber Bot now uses the same fabber opening as Uber
- Apparently MetMinAdvancedFabberCount is a real test so I've used it to improve check speeds and personality individuality
- If Uber can't expand then it will try to tech if it hasn't already
- Further measures introduced to reduce instances of entire naval fleets camping their base on mixed land/naval maps
- Fixed Silver trying to form bomber platoons without enough bombers to do so
- Never form platoons in response to a wall
- Only build the Unit and Star Cannons in situations where the AI will probably use them
- Remove restrictions on which fabbers can build a naval factory
- Fixed bug preventing Stingrays from leaving the base
- Uber deploys Orbweavers in response to enemy air build-up
- Uber Bot Legion no longer builds AA when enemy has a larger air force than it because it doesn't build one
- Uber Legion only builds T2 air on planets it completely owns
- Uber Legion puts less priority on an early air factory
- Disabled Starcannon owing to multiple server crashes linked to the unit

#### v4.3.0 - 2016/11/07

- Sparks counted towards platoon formation
- Uber builds Sparks later
- Tweak to when Inferno/Mauls built
- Uber Bot no longer uses Sparks
- Uber less likely to spam storage or build it early
- Uber less cautious about teching
- Uber uses more bots on larger worlds
- Won't build T2 air for fast expand if it's floating or if it's unable to expand
- Slight tweak to Uber to try and focus on expanding land presence when no naval threat
- Uber Naval ignores the limits on naval expansion
- Increased space around naval factories to reduce chance of them getting blocked off
- Spark properly excluded from heavy unit checks

#### v4.2.0 - 2016/11/04

- Legion Uber Bot no longer uses air unless alone on the planet
- Doesn't use Panzers for AA if it has access to Orbweavers
- Corrected error where AI might try to form its largest air platoon too early
- Remove workaround for BomberAttack as it's now fixed
- No longer requires an enemy surface presence to deploy its air titans against air threats
- Tactical units properly excluded from squads other than Artillery
- Angels will now leave base
- Bronze will build Catapults even when alone
- Fixed error preventing placement of ground-to-orbital defence in some situations
- Bronze more likely to use Ramparts
- Bronze is slower to expand to other planets
- Silver will expand to other planets a little faster
- Fixed error where Uber was overly cautious when forming air platoons
- Fixed error where Uber was incorrectly checking AA threat instead of air
- Uber will no longer stop building advanced factories and float heavily
- Better about placing Advanced Bot Factories
- When floating heavily Uber can start multiple advanced factories
- Legion and Bronze no longer spam naval fabbers
- Artillery can form a larger part of a platoon
- No longer invades with huge AA armies
- Uber makes less Corsairs
- Uber Legion will now mix tanks and bots
- Correctly include Corsairs in artillery squad when forming hover platoons
- Uber Tech is more aggressive about building T2 factories
- Correctly looks only at surface enemy presence when evaluating how many surface troops to teleport
- Fixed cap not being correctly applied to metal expansion in some instances
- Uber Cautious and Tech favour T2 vehicles over bots
- Uber requires more fabbers before trying to build a titan
- Uber won't start risky build projects when the base is under attack
- No longer rushes artillery to Commander snipe as the AI won't target the Commander
- Uber throws more fabbers at ground-to-orbital defence rushes
- Uber builds more ground-to-orbital defences as the orbital threat grows
- Fix error in anti-nuke placement checks
- Check to place artillery is no longer greater than the requirements to build it
- Don't build Gil-E in response to missile ships
- Corrected range on Gustav placement checks
- Fixed and increased priority of Uber's air snipe defences
- Uber smarter about not leaving itself so vulnerable after teching
- Requires a minimum force size before building Storms
- Prioritise Commander building AA to protect against air snipes
- Greater priority given to T2 long-range weapons
- Uber more likely to build Titans
- Uber more likely to use Metal Storage as required
- Uber will build advanced naval just to get to hover naval ships
- Uber overlaps anti-nukes but doesn't build as many
- Uber more aggressive with forming bomber platoons
- Uber will only build Ramparts on the outskirts if it protects against artillery
- Uber only builds Monstrosity once it has a large enough army
- Uber uses the Nova less
- Corrected bug causing Uber to confuse Unit Cannons for artillery and build Ramparts in response
- Small reduction in amount of ground orbital factories Silver will make on single planet systems
- Uber won't build Stingrays to defend against air and orbital unless it has somewhere to send its fleet
- Uber won't use Lancers until it sees tanks
- Adjusted Uber T2 Legion unit ratios
- Uber Legion advanced air has slightly higher requirements
- Uber Rush Legion uses standard Legion tech path
- Lower focus on air for Uber Rush
- Uber Air builds slightly more air
- Bronze and Silver will scout with the Hermes and Spectre
- Bronze and Silver no longer allow ground/orbital fabbers to interfere with the other's defensive builds
- Bronze more likely to build orbital defences
- Legion Bronze no longer spams radar
- Bronze more likely to send its armies out
- Suicide units now included in land armies
- Uber more likely to places defences by MEX
- Uber uses Support Commanders when building on islands
- Uber will use Catapults to attack nearby structures
- Uber panic grabs slightly less metal to try and avoid overextending too much
- Uber more aggressive in breaking out nuke spam during multi-planet games
- Uber brings out Kestrels slightly earlier

#### v4.1.0 - 2016/07/28

- Decreased use of Miniman by Uber
- Decreased use of Monstrosities by Uber
- Integrated Novas into air squads
- Novas now use escort behaviour in place of suicide
- Improved Uber checks for unit ratios
- Platinum and Uber use the Nova again
- Bronze, Silver and Gold use less Novas
- Increased minimum army size requirements for some Legion units used by Uber while widening the units counted
- Lancers moved to the fast squad

#### v4.0.5 - 2016/07/11

- Fixed bug which could result in Legion not scouting at Gold and higher

#### v4.0.4 - 2016/07/07

- Fix for issue where Queller would do nothing on certain maps
  - thanks to MrTBSC for reporting this
- Gold and Platinum move into the water faster at the expense of sometimes starting naval when they should start land

#### v4.0.3 - 2016/06/12

- MetMinBasicFabberCount now works for naval and is utilised by Uber to ensure personalities work the same on water as in other theatres
- Updated for changes to which units the Starcannon can build
- Platinum can now build Advanced Bot Factories with the Colonel

#### v4.0.2 - 2016/05/14

- Uber no longer uses the Nova
- Uber will use more Meteors
- Uber will only use Legion T2 bombers and gunships when it has air dominance
- Increased chance of Uber Legion teching to T2 bots
- Uber produces Panzers earlier in response to air and orbital threats
- Uber stops producing Havocs once advanced units hit the field
- No longer keeps the Thor at range

#### v4.0.1 - 2016/04/29

- Uber builds OmniSilos a little further away from its buildings
- mikeyh fixed error in way personalities were passed between hosts which also makes it compatible with PA's stable release
- mikeyh removed dependency on AI Compatibility Mod Personalities Patch

#### v4.0.0 - 2016/04/25

- Added support for the Legion Expansion
  - Big thanks to Alpha2546 and Graushwein for their help
- Sub-Personality changes:
  - Removed Uber Eco
  - Uber Dox renamed Uber Rush
  - Added Uber Land: ignores the water completely
  - Added Uber Naval: gets in the water as fast as it can
  - Added Uber Tank: no bots used
  - Added Uber Aggressive: it's Uber but a little more rash
  - Uber Air is now Uber but without the air limits
  - Uber Turtle is now Uber Cautious: a more conservative and tech happy Uber
- Smarter spacing between defences for Uber
- Uber looks to have a greater air presence before bringing out bombers and gunships
- No more idle scouts in base
- Implemented a nasty hack to work around the bomber_attack neural net being broken so that bombers and gunships will leave the base
- Uber doesn't use scouts for artillery vision any more
- Check if fighters are needed somewhere before attaching them to bombers
- No longer sacrifices air defence for mine vision in its platoons
- Uber doesn't wait for you to go orbital before building Orbital Factories
- Errors in T1 bot and T2 vehicle factory placement fixed
- Resolved issue which prevented the building of vehicle factories when alone
- Uber switches to Kaijus if getting overwhelmed by subs
- Uber properly defends its orbital lasers with fighters like it's supposed to
- Uber uses Sparks to fight tanks not bots
- Uber is better at hoarding its air force
- Uber only goes advanced bots for torpedoes or to counter orbital or when bot rushed
- Uber favours the Ares and Zeus over the Atlas
- Uber won't build the Zeus when it doesn't have a strong lead in the air
- Uber more cautious about rushing a nuke when it has a planetary threat to deal with but throws more resources at building it
- Properly checks air factory ratios
- Fixed bug preventing Platinum properly building Hummingbirds
- Fix for Zeus stopping Gold reinforcing its Kestrels
- Gold is more active with its fighters
- Bronze and Silver don't clump their anti-nukes together
- Bronze and Silver send Support Commanders through teleporters
- Bronze and Silver transport Support Commanders by Astraeus
- Advanced fabbers will build Pelters at Gold or higher
- Bronze and Silver no longer position Holkins specifically to target Commanders
- Silver no longer smashes with its primary eco planet
- Some minor performance improvements
- Silver and Platinum are a little rasher with their armies, while Bronze is more conservative
- Higher levels try to be smarter about not building MEXs near threats
- Titans excluded from standard platoons as pathfinding does not play nice and it could stop the AI attacking
- Won't build orbital lasers if no surface threats remain in the system
- Uber now less predictable in the late game especially on higher resource bonuses
- Fixed a bug where Titans never left the base
- Uber gives higher priority to Commander snipes with Holkins
- Updated to work with the latest Planetary Annihilation release
  - Thanks to mikeyh and PRoeleert for their help with this
- Uber less likely to build advanced defences to allow greater focus on factories and super weapons
- Uber commits more fabbers to Titan builds if it can
- Uber updated for change in radar ranges
- Uber more aggressive about using Pelters against Commanders
- Uber tries to better protect itself against air snipes
- Bronze now better recognises existence of Drifter
- Bronze and Silver no longer build naval factories at the same time as other factories
- Bronze never area builds
- Cap on the number of Pelters Silver can build per base
- Bronze is more likely to try for a Ragnarok
- Bronze now correctly checks Advanced Air Fabber ratio
- Bronze no longer produces T1 units from T2 factories
- Bronze will include Drifters in standard armies
- Limit building of Orbital Factories by Gold and Platinum
- Fix unnecessary travel between Orbital Factory builds
- Bronze builds a broader range of units in the Unit Cannon
- Uber Tech now properly checks requirements of an Advanced Vehicle Factory
- Uber now properly checks requirements of an Advanced Bot Factory in all situations
- Uber T2 bot usage properly regulated according to whether it's a land, naval or lava map
- More specialised usage of single laser turrets for base defence
- Uber no longer builds Booms, Locusts or Grenadiers
- Uber uses less Gil-Es when it uses them at all

#### v3.3 - 2016/03/01

- Booms will now use teleporters
- Tries to figure out whether the blockage to its land forces is water or lava
- Improved amphibious checks by looking at historical enemy forces not just current ones
- Fixed Uber still trying to use Krakens alone
- Improved use of naval forces against shore targets
- Largest land and bot platoons were incorrectly capped with a maximum size
- Removed platoons that are no longer used
- Completely removed all duplicate build condition names
- Fixed issues with some personalities not sending orbital units to other planets
- Fixed issue preventing Uber from rushing nukes when the enemy has no anti-nukes
- Titans better integrated into platoons
- Fixed issue preventing Support Commanders being built

#### v3.2 - 2016/02/16

- Uber now focuses on Levelers over other T2 vehicles
- Uber no longer techs to T2 air except in special circumstances
- Uber only uses Support Commanders when it is prevented from expanding
- Uber uses Gil-Es only as a counter to missile units
- Uber now uses the Slammer as a primary T2 bot
- Uber will use more T2 bots if it thinks it's being bot rushed
- Corrected bug preventing Queller from building Levelers
- Uber no longer uses Krakens alone
- Uber favours the Kraken for naval warfare
- Where a land target cannot be found hover platoons will pursue naval targets

#### v3.1.6 - 2016/01/29

- Titans now properly excluded from teleporter platoons
- Titans now properly excluded from general squads in hover platoons
- Fixed bug where Uber would sometimes run placement checks using the T2 naval factory when trying to place a T2 air factory

#### v3.1.5 - 2016/01/22

- Fixed an issue that could cause only one Advanced Air Factory to build anything
- Resolved issue with duplicate Drifter build block names

#### v3.1.4 - 2015/10/06

- Removed an unnecessary platoon templates file
- Fixed all instances where Queller's platoons shared a name with vanilla platoons

#### v3.1.3 - 2015/10/01

- Vanilla AI split off into its own mod
- Added dependency on AI Mod Compatibility Patch

#### v3.1.2 - 2015/09/21

- Updated vanilla AI
- Booms use the new Suicide squad type

#### v3.1.1 - 2015/09/12

- Made some very minor performance optimisations
- Silver now deploys the Catapult as a defensive measure rather than an offensive one
- Silver will build the Catapult in response to orbital threats
- Platinum and Uber only build the Wyrm if they control the skies but there's a lot of AA
- Corrected a bug that could lead to Bronze and Silver stopping advanced air production
- Storms will now be correctly included in invasion forces
- Silver will use more Infernos and Vanguards
- An enemy with an orbital only presence on a planet will no longer cause inappropriate changes to build orders and unit compositions
- Fixed an error where Uber would only build the Stingray for AA where an orbital threat existed
- Silver will use the Stingray even when there's no orbital threat
- Gold will now correctly form platoons when it has enough Piranhas
- Gold won't build Piranhas unless there's an enemy surface naval presence
- Gold no longer produces more Piranhas for scouting than it can use
- Gold will no longer inappropriately go orbital on naval maps
- Fixed a bug for Gold, Platinum and Uber where T2 would never be achieved on an all naval multi planet system
- Fixed some checks preventing a factory being the first building on a new world under certain circumstances

#### v3.1 - 2015/09/09

- Silver gives higher priority to Orbital Launcher on multi planet maps
- Added support for new platoon performance savers
- Added support for tests designed to stop interference with ally Halleys, Catalysts and Ragnaroks
- Added missing personality checks for Locust platoons
- Titan support added to Bronze and Silver
- Won't try to destroy asteroids with Ragnaroks
- Won't build torpedo launchers in land bases on non-symmetrical planets
- Omegas can be used to form orbital to ground attack platoons in the same way an SXX can
- Will no longer idle Orbital Factories if there's no orbital threat and alone on the planet
- Will build SXXs at gas giants
- No longer tries to (unsuccessfully) put the Zeus in bomber platoons
- Ignores Kaiju when looking at fleet composition
- Fixed errors in Gold, Platinum and Uber causing them to only look at surface water threats when making naval build and platoon choices
- Fixed Platinum and Uber not building ships early on in certain situations
- Turned off Typhoon at all levels due to issues in the AI's handling of the unit
- Increase in threat required for Gold, Platinum and Uber to build Titans
- Uber will build a Zeus when it's alone on a planet
- Bronze and Silver avoid spamming Orbital Launchers and don't make it their first factory on a new world
- Updated vanilla AI
- Uber no longer sends orbital units off world when they're still needed on the planet
- Bronze can now send orbital units between worlds
- Only Bronze will build Titans on asteroids
- Enabled land Titans for all AI levels
- Lowered the priority for Titans at Uber and Platinum
- Titans can now be included in other hover and land platoons
- Fixed an error which led to higher levels building too many Storms
- Higher air threat required for Platinum and Uber to build Storms
- Fixed all instances of missing personality checks
- Added a new subpersonality - Bot
- Three fabber personality trait now correctly covers naval as well
- Uber will use the Icarus to correct energy issues when it's alone and metal is plentiful
- Uber will produce more Stingrays when facing a large air threat
- Uber better limits its Narwhal production
- Smarter at judging whether ships should be produced from its factories on multi planet systems

#### v3.0 - 2015/09/04

NOW DESIGNED SOLELY FOR TITANS

- Updated vanilla AI
- Removed Deep Space Radar references
- Umbrellas no longer require any kind of radar
- Focus is back on Bolos over Grenadiers at all levels
- Uber builds Grenadiers in response to spotting Walls
- Uber will build the Gil-E as a response to spotting Bluehawks
- Added support for TITANS units
- Fixed Gold so it will build Levelers as intended
- Uber properly checks placement of vehicle factories
- Updated openings for TITANS
- Updated naval ship choices for TITANS
- Uber Air has been transformed to be a more standard personality with an earlier and heavier emphasis on air
- Sends out single ship platoons at higher levels
- Uber chooses its first factory on a new planet based on whether there's an enemy presence or not
- Uber more likely to assign vehicle and naval fabbers to energy production than other types of fabber
- Capped the number of fighters produced on planets where Queller is alone
- Uber will use T2 air outside of metal planets
- Lower difficulties more likely to more poor decisions about when to commit their armies
- Fixed bug preventing Uber Tech from building advanced energy
- Uber Tech is much more aggressive about teching
- Much more sensible about which planet to pull reinforcements from via Teleporter
- Fixed bracket errors leading to improper filtering
- Uber and Platinum more aggressive about getting up anti-orbital measures where none exist but an orbital threat does
- Updated all difficulties in accordance with the latest playstyles in each league
- Naval platoon 12 now maps to the correct template
- Platinum now builds Levelers
- Uber brings out Infernos even when not winning the land war to help in base attacks or raids
- Gold's micro is a little worse
- Removed naval platoon 16
- No longer shuts down factories to bring the eco back in line
- Eco is going to need more work as this exposes some issues that were previously hidden
- Bronze and Silver favour the Astraeus for getting off planet
- Builds either Kestrels or Hornets but never both
- Bronze no longer artificially restricted on the number of factories it can build

#### v2.1 - 2015/08/09

- Gold will build the Leveler
- Uber will check there's some metal in storage in addition to looking at eco efficiency before assuming float and building more stuff
- Silver correctly checks whether it can afford to have fabbers to assist on a project
- Correctly exclude the orbital fabber from all checks it should be excluded from
- Uber will send ARKYD off world even if it's the only one if it doesn't need it on that planet
- No longer builds an Astraeus for an evacuation it doesn't perform
- Corrected errors in the advanced fabber ratios
- Uber less reluctant to build advanced fabbers
- Uber floats less energy on multi-planet systems
- Gold through Uber have been updated for the Grenadier meta
- Uber is better at building storage when it can't immediately counter an eco float
- Uber prioritises Deep Space Radar after going orbital
- Removed the building of Booms for now
- Gold is more likely to build the Unit Cannon on a multi-planet system
- Uber spaces its Jigs out more
- Uber won't assign as many fabbers to grab metal while it's floating
- Platinum more likely to tech up when it's out of expansion options
- Gold less likely to tech up when it's out of expansion options
- Uber and Platinum want more fabbers before trying for a Catalyst
- Fixed error prevent Gold and Platinum building Advanced Air Fabbers in certain situations
- Gold will sometimes go for T2 air outside of powering out a Catalyst
- Gold, Platinum and Uber will build Kestrels
- Uber smarter about assessing land threat when teching
- Uber will form squads smaller than four units again
- Uber no longer prioritises dual laser defences over others
- Uber is smarter about when to wait until it can afford a nuke missile and when to just get building
- Corrected placement check for Teleporter
- Gold expands a little slower
- Integrated vanilla AI so that it is selectable alongside Queller by choosing normal, hard, relentless or absurd
- Do not use this version to report bugs to Sorian as it might be my fault
- Fixed error in Gold vehicle fabber opening
- Bronze no longer area builds MEXs
- Fixed discrepancies between area and standard MEX building for Uber
- Uber prioritises building Umbrellas in important bases first before locking down everywhere else
- Uber is smarter about how it moves its orbital fabbers
- Gold is less sophisticated in its troop choices
- Gold is slower to react to mines
- Gold will build the Slammer
- Gold through Uber use less Dox scouts on smaller planets
- Platinum over expands
- Uber will tech if there's no one near its base and it thinks it can afford to rush it
- Uber will produce more fabbers if it can't shake its eco float
- Uber will use the Slammer when it's dealing with bots not tanks
- Uber won't tech while its base is under threat
- Checks added to stop the building of torpedo launchers in lakes with no enemy navy
- Fixed an error leading Gold through Uber to put all their advanced defence in a tiny area
- Uber rushes nukes based on the anti-nuke status of its target rather than other players
- Uber requires a higher income to tech than previously
- Uber won't build duplicate radars when looking to scout another world
- Uber is smarter about when rushing orbital on a multi planet system with a single spawnable planet is appropriate
- Uber will build Skitters to sight for mobile artillery
- No longer waits until a planet can receive assistance to build troops because this was leading to feeble invasions
- Uber is more aggressive with scouting if you might be on its planet but it can't find you
- Uber produces more Spinners when preparing an invasion
- Further work done to prevent overwhelming land threats stopping the AI from using its ships
- Uber now has sub-personalities allowing you to customise how it plays
- Adaptive
- Air
- Dox
- Eco
- Grenadier
- Infernodier
- Tech
- Turtle
- Uber sets up an Anchor defence around teleporters in response to air threat in addition to land and orbital
- Uber is smarter about transitioning in and out of the water depending on how it's doing in the relevant theatre
- Fixed error preventing the Stingray from being built
- Stripped whitespace from release to reduce server mod download time
- More likely to try for a Catalyst
- Uber uses the Astraeus if it cannot afford an orbital fabber or is already building one
- Uber doesn't cram all its anti-nukes together in a base
- Uber checks that the Commander has anti-nuke coverage
- Uber gives a higher priority to Umbrellas

#### v2.0.1 - 2015/07/09

- Bronze and Silver no longer build defences where there's nothing to defend (thanks to DarkslayerRoy for the report)
- Bronze favours dual lasers over single lasers just like the other difficulties
- Bronze correctly only builds one anti-nuke silo at a time
- Bronze correctly checks Advanced Laser Tower numbers against other land defences rather than naval ones
- Bronze can build more basic defences
- Silver no longer builds multiple basic radars in a base
- Building defences against one threat layer no longer stops Bronze building defences against a different threat type

#### v2.0 - 2015/07/03

- Integrated new AI checks to replace hacky workarounds
- Builds its factories tighter
- Slightly more cautious about artillery placement
- Won't build Halleys if the planet is its eco centre
- Won't transfer troops to another planet when its base is threatened
- Uses the new threat considerations when making fabber and army decisions so as to behave smarter in games with more than two players/teams
- Added support for the Unit Cannon
- Added Slammer support for use by the Unit Cannon
- Will use an Astraeus rather than a Teleporter to get off planet when its base is in water
- Will pursue orbital more aggressively when on multi-planet systems with only one spawnable planet
- Prioritise a factory above all else on arrival at a new world
- Will evac Commander by Astraeus if it doesn't have the energy to run its teleporters
- Use new eco checks to be more aggressive about avoiding eco floating
- Added support for the Phoenix to be built
- Throws more fabbers at advanced factory projects
- No longer rushes orbital when it has orbital elsewhere in the system
- Will consider more than just the local planet when considering whether to rush nukes
- Won't build laser towers on water any more
- Added some very beta level Boom support to counter aggressive Commander play which might be rubbish
- Looks at the air situation as a whole rather than just anti-air when considering building more air factories
- Will sometimes send Krakens off by themselves to take advantage of their stealth
- Better about getting into the water on maps like Meso
- Will scout with fighters again as a means to find and kill sneaky air fabbers
- Reduced the ratio of bot factories to planet size
- Replaced HaveSeenEnemyUnit checks with threat assessments where possible to avoid responding to threats which no longer exist
- More reactive with its naval fleet compositions
- Complete overhaul of Naval fleet platoons to make them more appropriate in size and better avoid huge fleet in base syndrome
- Forced an air presence within the first three factories
- Introduced Queller personalities to allow for a range of difficulties - Bronze is easier than Normal and Uber is harder than Absurd - see the readme for more details
- Will no longer spam defence structures within a small area
- Will no longer loop the Commander through a teleporter
- Checks it has the radar necessary for ground anti-orbital defences
- Higher priority given to getting orbital radar when orbital has come into play
- Defends Halleys and Catalysts with ground anti-orbital
- Scales platoon sizes better in the late game
- Techs when there's no other way to grow the economy
- Tighter grip on economy
- Won't let nuke launchers sit idle for minutes at a time
- Reordered all checks to optimise AI performance
- Added missing placement check for teleporters
- Now builds Advanced Torpedo Launchers
- Much faster at taking over planets it completely owns
- Fixed error introduced in 1.3.3 preventing the building of orbital radar
- Does more to protect its gas giant investments
- Tries to control the orbital space before flying expensive and vulnerable radar around the local planet
- Builds SXX to destroy naval threats in addition to land ones

#### v1.3.3 - 2015/05/29

The "oh shit new patch with new folder structure which breaks my baby!" release

- Fixed bug in checking placement of advanced naval factory
- Updated for new AI folder structure
- No longer stops building Gil-Es when there is an orbital threat

#### v1.3.2 - 2015/05/04

- Put the ai_unit_map file back because I need it for the Piranha. Derp!

#### v1.3.1 - 2015/05/03

- Now works on air only maps
- Removed dependency on ai_config (except for unit cap, but 3000 will do)
- Now checks for Commander as a means to determine whether this is a military or eco planet
- Fixed an error that allowed proxy air bases to spam air fabbers
- Dropped custom ai_unit_map file until such time as I actually use it

#### v1.3 - 2015/04/26

- More aggressive about building MEX defences
- Will build turrets to remove enemy MEX when there's no threat in the area
- Deploys Spinners at lower threat levels
- Deploys Spinners in reaction to losing the air war in anticipation of bombers to come
- A little faster at getting in the water on island maps like Meso (and at getting out of it)
- A little less energy floating
- More aggressive about getting nukes where no enemy anti-nuke exists
- Won't spam anti-nukes when there's no nuke threat unless planets exist where it has no presence
- Will no longer build Piranhas it doesn't need
- Will stop building ships after a while if it no longer has anywhere to send them
- Reduced scout spam a little
- No longer spams naval fabbers in lakes
- Invests in Hummingbirds at lower threat levels due to a tendency to underestimate the threat and not have enough of them
- Only builds land troops when alone on a planet if it has somewhere to send them

#### v1.2.4 - 2015/04/17

- When unable to expand it now checks its need for an advanced factory against the number of advanced factories not fabbers
- Inferno, Spinner and Skitter ratios are now calculated only against units which are relevant to their potential platoon makeup
- Added support for Pelters and Holkins
- Will always get at least one orbital fabber out
- Corrected error allowing the AI to build Bumblebees and air fabbers when it's losing the air war
- Less air fabber spam during the opening on naval maps
- Maintains a higher Hummingbird minimum force

#### v1.2.3 - 2015/04/10

- No longer prevented from building basic fabbers when advanced ones exist
- Advanced fabbers can now build Umbrellas
- Removed any meaningful cap on the number of fabbers used

#### v1.2.2 - 2015/04/09

- No longer builds Skitters in reaction to scouting a Commander (herp derp!)
- Will spam Umbrellas over planets it owns (this is going to need some work)
- Will attempt to protect the commander from orbital snipes using Umbrellas (might be a bit spammy right now)

#### v1.2.1 - 2015/04/08

- Now builds Skitters when it has seen mines or advanced combat fabbers
- Will now only build an orbital launcher to run away to another planet if there's another planet to run away to
- Checks ability to expand in addition to availability of metal before trying to tech during dangerous times
- Corrected minor error in Piranha build checks
- Will favour an air factory first on planets it's invading
- No longer sends orbital fabbers to planets only to immediately send them elsewhere after doing nothing
- Can now redeploy orbital fabbers from gas giants

#### v1.2 - 2015/04/07

- Removed platoon minimum requirements for frontline units to allow Queller to form land attacks faster
- Will build Bluehawks and Stingrays when there's an orbital threat
- Will try and go orbital when it has no local expansion options, even if it's not winning the battle on the planet
- If a game has gone orbital then the AI can go bots late to allow it access to Bluehawks for invasion support
- Corrected major whoopsie where AI wouldn't build advanced vehicle fabbers when it had a planet to itself
- Now builds Vanguards in relation to the number of Shellers it has
- Removed Slammers for the time being as AI needs dedicated anti-naval Slammer platoons to use them effectively
- Forced some advanced fabbers regardless of eco to get AI out of the trap of never being able to afford them
- Will keep building Hummingbirds even on empty planets so as to counter Phoenix attacks
- Stingray now correctly used as a defensive unit in all naval platoon sizes
- Will spam air fabbers faster to facilitate planet takeover
- Added support for the Phoenix (but it doesn't build it yet)
- Higher priority given to advanced radar
- Increased bomber platoon sizes by 50%
- Will build Skitters in reaction to sighting combat fabbers
- Will no longer build orbital factories and advanced factories at the same time
- Will build Skitters on multi-planet maps to use as advance scouts to avoid invasion forces sitting on their hands
- Even more aggressive producing anti-nukes

#### v1.1 - 2015/03/30

This release provides a massive overhaul in how Queller tackles the orbital layer. It also brings Queller's game up-to-speed with the latest balance changes.

- No longer builds Piranhas when its base is threatened
- Will build a small contingent of Hummingbirds when alone to shoot down air fabber invaders
- Fixed AI building the Astraeus for a Commander evac that would never happen
- Added support for moving orbital fabbers between planets
- Higher priority given to Deep Space Radar when alone
- Higher priority given to Deep Space Radar when orbital has been sighted and the AI hasn't built one yet
- Properly checks that it can afford to run the Deep Space Radar before building it
- Fixed a bug with Skitters not being assigned to the correct platoon
- Added support for Jigs
- Will no longer smash with Annihilaser planets
- Higher priority for orbital fabbers
- Can send bots through teleporters again
- Correctly uses a laser tower blueprint when checking possible placement for laser tower instead of using a laser tower single
- Normal, Hard and Relentless difficulties work again (thanks to MCXplode for the report)
- Much greater use of naval fabbers on naval maps
- No longer starts air
- Stopped the Commander spamming air factories
- More aggressive about building Hummingbirds to own the skies
- Builds orbital fabbers and Avengers from the orbital factory
- Will try to avoid building the SXX at gas giants as it can't send them off-planet and it has no use for them there
- Won't use ARKYDs for remote scouting when it has the ability to produce Advanced Radar Satellites
- AI will build anti-nukes sooner in response to a nuclear threat
- AI will now use Slammers in armies not raiding forces
- Fixed error where AI wasn't checking it could afford to run advanced fabbers before building them and thus tanking its economy after teching
- Corrected errors in checking how many Spinners it can build
- Added Boom Bot support (though the AI doesn't use them yet)
- More likely to build advanced radar

#### v1.0.2 - 2015/03/20

- No longer builds Piranhas when base is threatened
- Won't start naval if it can attack by land

#### v1.0.1 - 2015/03/20

- Fixed issue with Piranha scouting
- Fixed commander factory drain checks to use the correct factory
- Somehow broke my naval attack fix before releasing version 1. Fixed for reals this time.
- Corrected bug where commander wasn't checking drain on its first two vehicle factories

#### v1.0 - 2015/03/17

- Won't move commander by Astraeus except as a last resort
- Reduced buffer spaces from many buildings to allow tighter base packing
- More aggressive about getting an air presence
- Will ensure it has air if it's alone on a planet
- Builds orbital radar if it's alone on a planet and doesn't have any
- Fixed bug when checking if an advanced naval factory is needed
- Updated for new AI features
- Will build advanced air fabbers when alone
- Added sub support
- Commander has more flexibility in building eco structures
- Uses more fabbers
- More aggressive in using fabbers for building factories
- Only use air fabbers when the skies are somewhat safe
- Now uses Piranhas as scouts when it doesn't have full air scouting yet
- Shadowed ai_unit_map file as official version is missing the Piranha
- Can now open with air on naval maps
- Can now build a bot factory on naval maps regardless of other factory choices
- Overhauled naval platoons
- Fixed issue preventing AI attacking with naval forces
- Resolved all known issues of idle fabbers
- Will try to be aggressive about getting in the water when no land attack route exists
- Removed beta tag

#### v0.5.1 - 2015/01/08

- All fabbers can build naval again
- Removed three fabber opening

#### v0.5.0.1 - 2015/01/06

- Updated for new meta
- Wider variety of openings now possible, more responsive to what opponent is doing
- Added bot raid platoons per the updated default AI
- SXX lasers can now be accompanied by Avenger escorts
- Don't build basic fabbers if you can build advanced ones
- First pass at some proper naval play
- AI builds naval platoons at sizes relevant to the threat (will need tuning)
- Naval platoons broken down into squads
- Torpedo defences used in identical fashion to laser turrets
- Higher ratio of advanced fabbers to factories
- Bot sightings can now cause the AI to go air if it hasn't already
- Much greater spacing between radars
- At this point ignores almost all AI personality settings not relating to the economy
- Allowed to drop more defences at heavy MEX concentrations
- Tries to ensure it has advanced radar for advanced naval
- Added support for catalysts
- Updated now obsolete Need[Basic/Advanced]LandFabber to use the new Bot/Vehicle test
- Take the skies before building bombers

#### v0.4.2 - 2014/11/27

- After reverting platoons I forgot to revert the squad percentage makeup to my own. Now fixed.

#### v0.4.1 - 2014/11/11

- Reverted AI land platoon sizes to vanilla settings as it seems the AI is better with large numbers of small platoons than small numbers of large platoons

#### v0.4 - 2014/11/11

- Corrected bug where AI only used half as many Dox scouts as it was supposed to
- Updated basic factory builds to work properly in a multi-planet scenario
- Increased maximum land platoon sizes
- Removed fighter requirement from bomber platoons
- Small land platoons are now only formed for mobile targets
- Bomber platoons are now only formed for mobile targets (and teleporters)
- First pass on orbital
- Return to mandatory bot factories, but the number is based on the size of the planet
- Reverted to Firefly scouts because the AI seems severely limited when it has poor scouting
- AI shouldn't prematurely tech unless it has really bad intel
- A teleporter should always be the first thing the AI constructs on landing somewhere
- Assistance allowed on combat units again so a fabber has something to do when it has nothing to build
- Disabled storage for the time being as I just can't stop it building the things at stupid timings

#### v0.3 - 2014/11/09

- Skitter can be used to scout if AI plays a three vehicle opening (this is now actually true)
- AI will no longer go all bots
- Increased chances of MEX defence
- AI will now prefer dual lasers in place of single lasers
- Increased distance between radar installations
- Increased platoon minimum size requirements
- Further reduced use of infernos
- Slammers now used where naval has been sighted
- AI will continue to produce units regardless of whether a teleporter exists yet
- Removed advanced to basic factory ratio requirement
- Greater ratio of fighters to bombers
- Less bombers required for the AI to roll out an air attack
- Reverted to economy building rules more aligned with the default AI (this is now actually true)
- Fabbers will now construct basic factories in the "mid game"
- Higher number of advanced fabbers "required"
- AI no longer uses Catapults or Holkins
- More assistance allowed and required on various defence/offence structures

#### v0.2 - 2014/11/07

- Total overhaul of AI's opening builds
- AI now has bot, tank and air openings
- Openings are influenced by planet size
- Number of fabbers determined by opening factory choices
- Further refinements to the AI's building of defences
- Changes to air platoon sizes
- Allowed assistance on factory building to prevent opening fabber assisting troop building and then going into immediate radar
- Skitter can be used to scout if AI plays a three vehicle opening
- Reverted to economy building rules more aligned with the default AI (for now)
- AI will no longer build offensive Pelters

#### v0.1 - 2014/11/05

- Alpha release
- AI uses larger platoons
- AI produces more factories
- Unit mix completely overhauled
- Commander given responsibility for all basic factory production
- Scouting now done by Dox and Hummingbirds in place of Fireflies and Skitters
- AI builds far less turrets
- Much higher percentage of fighters to bombers in air squadrons
- Naval platoon updated to use squads - untested
- AI opens with troops immediately after its first fabber
- Drastically lowered the basic fabber to factory ratio
- Raised the fabber ratio for empty planets
- The AI will now only build the Orbital Launcher in emergencies or when it's winning on its planet
