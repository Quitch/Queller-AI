var quellerAILoaded;

if (!quellerAILoaded) {
  quellerAILoaded = true;

  function quellerAIPersonalities() {
    try {
      var aiPathCasual = "/pa/q_casual";
      var aiPathBronze = "/pa/q_bronze";
      var aiPathSilver = "/pa/q_silver";
      var aiPathGold = "/pa/q_gold";
      var aiPathPlatinum = "/pa/q_platinum";
      var aiPathUber = "/pa/q_uber";
      var quellerPersonalities = {
        qCasual: {
          ai_path: aiPathCasual,
          display_name: "!LOC:Q-Casual",
          metal_drain_check: 0.64,
          energy_drain_check: 0.77,
          metal_demand_check: 0.95,
          energy_demand_check: 0.92,
          micro_type: 0,
          go_for_the_kill: false,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: false,
          neural_data_mod: 2,
          adv_eco_mod: 0.5,
          adv_eco_mod_alone: 0,
          factory_build_delay_min: 0,
          factory_build_delay_max: 12,
          per_expansion_delay: 60,
          personality_tags: ["queller"],
          min_basic_fabbers: 10,
          min_advanced_fabbers: 3,
        },
        qBronze: {
          ai_path: aiPathBronze,
          display_name: "!LOC:Q-Bronze",
          metal_drain_check: 0.54,
          energy_drain_check: 0.77,
          metal_demand_check: 0.95,
          energy_demand_check: 0.92,
          micro_type: 0,
          go_for_the_kill: false,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 1.6,
          adv_eco_mod: 0.5,
          adv_eco_mod_alone: 0,
          factory_build_delay_min: 0,
          factory_build_delay_max: 6,
          personality_tags: ["queller"],
          min_basic_fabbers: 5,
          min_advanced_fabbers: 3,
        },
        qSilver: {
          ai_path: aiPathSilver,
          display_name: "!LOC:Q-Silver",
          metal_drain_check: 0.54,
          energy_drain_check: 0.77,
          metal_demand_check: 0.95,
          energy_demand_check: 0.92,
          micro_type: 1,
          go_for_the_kill: true,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 1.45,
          adv_eco_mod: 1,
          adv_eco_mod_alone: 0,
          personality_tags: ["queller"],
          min_basic_fabbers: 4,
          min_advanced_fabbers: 3,
        },
        qGold: {
          ai_path: aiPathGold,
          display_name: "!LOC:Q-Gold",
          metal_drain_check: 0.54,
          energy_drain_check: 0.77,
          metal_demand_check: 0.85,
          energy_demand_check: 0.92,
          micro_type: 1,
          go_for_the_kill: true,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 1.3,
          adv_eco_mod: 1,
          adv_eco_mod_alone: 0,
          personality_tags: ["queller"],
          min_basic_fabbers: 3,
          min_advanced_fabbers: 2,
        },
        qPlatinum: {
          ai_path: aiPathPlatinum,
          display_name: "!LOC:Q-Platinum",
          metal_drain_check: 0.54,
          energy_drain_check: 0.77,
          metal_demand_check: 0.85,
          energy_demand_check: 0.92,
          micro_type: 2,
          go_for_the_kill: true,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 1.15,
          adv_eco_mod: 1,
          adv_eco_mod_alone: 0,
          personality_tags: ["queller"],
          min_basic_fabbers: 2,
          min_advanced_fabbers: 2,
        },
        qUber: {
          ai_path: aiPathUber,
          display_name: "!LOC:Q-Uber",
          metal_drain_check: 0.54,
          energy_drain_check: 0.72,
          metal_demand_check: 0.8,
          energy_demand_check: 0.8,
          micro_type: 2,
          go_for_the_kill: true,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 1,
          adv_eco_mod: 1,
          adv_eco_mod_alone: 0,
          personality_tags: ["queller"],
          min_basic_fabbers: 3,
          min_advanced_fabbers: 1,
        },
        qUber1v1: {
          ai_path: aiPathUber,
          display_name: "!LOC:Q-Uber 1v1",
          metal_drain_check: 0.54,
          energy_drain_check: 0.72,
          metal_demand_check: 0.8,
          energy_demand_check: 0.8,
          micro_type: 2,
          go_for_the_kill: true,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 1,
          adv_eco_mod: 1.35,
          adv_eco_mod_alone: 0,
          personality_tags: ["queller", "lateorbital"],
          min_basic_fabbers: 3,
          min_advanced_fabbers: 1,
        },
        qUberAir: {
          ai_path: aiPathUber,
          display_name: "!LOC:Q-Uber Air",
          metal_drain_check: 0.54,
          energy_drain_check: 0.72,
          metal_demand_check: 0.8,
          energy_demand_check: 0.8,
          micro_type: 2,
          go_for_the_kill: true,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 1,
          adv_eco_mod: 1,
          adv_eco_mod_alone: 0,
          personality_tags: ["queller", "air"],
          min_basic_fabbers: 3,
          min_advanced_fabbers: 1,
        },
        qUberBot: {
          ai_path: aiPathUber,
          display_name: "!LOC:Q-Uber Bot",
          metal_drain_check: 0.54,
          energy_drain_check: 0.72,
          metal_demand_check: 0.8,
          energy_demand_check: 0.8,
          micro_type: 2,
          go_for_the_kill: true,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 1,
          adv_eco_mod: 1,
          adv_eco_mod_alone: 0,
          personality_tags: ["queller", "bot"],
          min_basic_fabbers: 3,
          min_advanced_fabbers: 1,
        },
        qUberFFA: {
          ai_path: aiPathUber,
          display_name: "!LOC:Q-Uber Free-For-All",
          metal_drain_check: 0.54,
          energy_drain_check: 0.72,
          metal_demand_check: 0.8,
          energy_demand_check: 0.8,
          micro_type: 2,
          go_for_the_kill: true,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 0.85,
          adv_eco_mod: 0.75,
          adv_eco_mod_alone: 0,
          personality_tags: ["queller", "ffa"],
          min_basic_fabbers: 4,
          min_advanced_fabbers: 1,
        },
        qUberLand: {
          ai_path: aiPathUber,
          display_name: "!LOC:Q-Uber Land",
          metal_drain_check: 0.54,
          energy_drain_check: 0.72,
          metal_demand_check: 0.8,
          energy_demand_check: 0.8,
          micro_type: 2,
          go_for_the_kill: true,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 1,
          adv_eco_mod: 1,
          adv_eco_mod_alone: 0,
          personality_tags: ["queller", "land"],
          min_basic_fabbers: 3,
          min_advanced_fabbers: 1,
        },
        qUberRush: {
          ai_path: aiPathUber,
          display_name: "!LOC:Q-Uber Rush",
          metal_drain_check: 0.54,
          energy_drain_check: 0.72,
          metal_demand_check: 0.99,
          energy_demand_check: 0.99,
          micro_type: 2,
          go_for_the_kill: true,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 1,
          adv_eco_mod: 2,
          adv_eco_mod_alone: 0,
          personality_tags: ["queller", "lateorbital"],
          min_basic_fabbers: 2,
          min_advanced_fabbers: 1,
        },
        qUberTank: {
          ai_path: aiPathUber,
          display_name: "!LOC:Q-Uber Tank",
          metal_drain_check: 0.54,
          energy_drain_check: 0.72,
          metal_demand_check: 0.8,
          energy_demand_check: 0.8,
          micro_type: 2,
          go_for_the_kill: true,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 1,
          adv_eco_mod: 1,
          adv_eco_mod_alone: 0,
          personality_tags: ["queller", "tank"],
          min_basic_fabbers: 3,
          min_advanced_fabbers: 1,
        },
        qUberTurtle: {
          ai_path: aiPathUber,
          display_name: "!LOC:Q-Uber Turtle",
          metal_drain_check: 0.54,
          energy_drain_check: 0.72,
          metal_demand_check: 0.54,
          energy_demand_check: 0.72,
          micro_type: 2,
          go_for_the_kill: true,
          priority_scout_metal_spots: true,
          enable_commander_danger_responses: true,
          neural_data_mod: 1,
          adv_eco_mod: 1,
          adv_eco_mod_alone: 0,
          personality_tags: ["queller"],
          min_basic_fabbers: 4,
          min_advanced_fabbers: 1,
        },
        qRandom: {
          display_name: "!LOC:Q-Random",
        },
        qUberRandom: {
          display_name: "!LOC:Q-Uber Random",
        },
      };

      var newPersonalities = _.mapValues(
        quellerPersonalities,
        function (personality, name) {
          var result = _.assign(
            _.clone(model.aiPersonalities().Absurd),
            personality
          );
          result.name = name;
          return result;
        }
      );

      _.assign(model.aiPersonalities(), newPersonalities);
      model.aiPersonalities.valueHasMutated();

      // assign personalities to Randoms when start game clicked
      model.startGame = (function () {
        var cachedFunction = model.startGame;

        return function () {
          var personalityNames = function (personalities) {
            return _.keys(personalities);
          };

          var randomPersonalityNames = function (personalities) {
            return _.filter(personalityNames(personalities), function (name) {
              return _.endsWith(name, "Random");
            });
          };

          var uberPersonalityNames = function (personalities) {
            return _.filter(personalityNames(personalities), function (name) {
              return _.startsWith(name, "qUber") && !_.endsWith(name, "Random");
            });
          };

          var selectUberPersonality = function (personalities) {
            return _.sample(uberPersonalityNames(personalities));
          };

          var selectPersonality = function (personalities) {
            var nonUberPersonalities = _.xor(
              personalityNames(personalities),
              randomPersonalityNames(personalities),
              uberPersonalityNames(personalities)
            );
            // avoid oversampling Uber
            var oneOfEachDifficulty = nonUberPersonalities.concat(
              selectUberPersonality(personalities)
            );
            return _.sample(oneOfEachDifficulty);
          };

          var assignPersonality = function (personality, personalities) {
            return personality === "qRandom"
              ? selectPersonality(personalities)
              : selectUberPersonality(personalities);
          };

          _.forEach(model.armies(), function (army) {
            _.forEach(army.slots(), function (slot) {
              if (
                slot.ai() === true &&
                _.includes(
                  randomPersonalityNames(newPersonalities),
                  slot.aiPersonality()
                )
              ) {
                var personality = assignPersonality(
                  slot.aiPersonality(),
                  newPersonalities
                );
                slot.aiPersonality(personality);
              }
            });
          });

          return cachedFunction.apply(this, arguments);
        };
      })();

      _.defer(function () {
        model.localChatMessage(
          loc("!LOC:Queller AI"),
          loc(
            "!LOC:by Quitch. My difficulties are prefixed with a Q. Don't make AI teams larger than human teams, increase the difficulty or the econ rate instead. I support the Legion Expansion."
          )
        );
      });
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  quellerAIPersonalities();
}
