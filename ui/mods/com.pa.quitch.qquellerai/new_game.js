var qQuellerAILoaded;

function qQuellerAI() {
  if (qQuellerAILoaded) {
    return;
  }

  qQuellerAILoaded = true;

  api.debug.log("Loading Queller AI Personalities");

  var aiPersonalities = model.aiPersonalities();

  var newPersonalities = {
    "Q-Casual": {
      ai_path: "/pa/q_casual",
      display_name: "!LOC:Q-Casual",
      starting_location_evaluation_radius: 50,
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
    "Q-Bronze": {
      ai_path: "/pa/q_bronze",
      display_name: "!LOC:Q-Bronze",
      starting_location_evaluation_radius: 100,
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
    "Q-Silver": {
      ai_path: "/pa/q_silver",
      display_name: "!LOC:Q-Silver",
      starting_location_evaluation_radius: 150,
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
    "Q-Gold": {
      ai_path: "/pa/q_gold",
      display_name: "!LOC:Q-Gold",
      starting_location_evaluation_radius: 200,
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
    "Q-Platinum": {
      ai_path: "/pa/q_platinum",
      display_name: "!LOC:Q-Platinum",
      starting_location_evaluation_radius: 250,
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
    "Q-Uber": {
      ai_path: "/pa/q_uber",
      display_name: "!LOC:Q-Uber",
      starting_location_evaluation_radius: 300,
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
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
    "Q-Uber 1v1": {
      ai_path: "/pa/q_uber",
      display_name: "!LOC:Q-Uber 1v1",
      starting_location_evaluation_radius: 300,
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 1,
      adv_eco_mod: 1,
      adv_eco_mod_alone: 0,
      personality_tags: ["queller", "1v1", "lateorbital"],
      min_basic_fabbers: 3,
      min_advanced_fabbers: 1,
    },
    "Q-Uber Bot": {
      ai_path: "/pa/q_uber",
      display_name: "!LOC:Q-Uber Bot",
      starting_location_evaluation_radius: 300,
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
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
    "Q-Uber Free-For-All": {
      ai_path: "/pa/q_uber",
      display_name: "!LOC:Q-Uber Free-For-All",
      starting_location_evaluation_radius: 300,
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 0.75,
      adv_eco_mod: 0.85,
      adv_eco_mod_alone: 0,
      personality_tags: ["queller", "ffa"],
      min_basic_fabbers: 4,
      min_advanced_fabbers: 1,
    },
    "Q-Uber Rush": {
      ai_path: "/pa/q_uber",
      display_name: "!LOC:Q-Uber Rush",
      starting_location_evaluation_radius: 300,
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.99,
      energy_demand_check: 0.99,
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 1,
      adv_eco_mod: 2,
      adv_eco_mod_alone: 0,
      personality_tags: ["queller", "1v1", "lateorbital"],
      min_basic_fabbers: 2,
      min_advanced_fabbers: 1,
    },
    "Q-Uber Tank": {
      ai_path: "/pa/q_uber",
      display_name: "!LOC:Q-Uber Tank",
      starting_location_evaluation_radius: 300,
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
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
    "Q-Uber Turtle": {
      ai_path: "/pa/q_uber",
      display_name: "!LOC:Q-Uber Turtle",
      starting_location_evaluation_radius: 300,
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.54,
      energy_demand_check: 0.65,
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
  };

  var baseline = aiPersonalities.Absurd;

  newPersonalities = _.mapValues(newPersonalities, function (
    personality,
    name
  ) {
    var result = _.extend(_.clone(baseline), personality);
    result["name"] = name;
    return result;
  });

  _.extend(aiPersonalities, newPersonalities);

  model.aiPersonalities.valueHasMutated();

  _.defer(function () {
    model.localChatMessage(
      loc("!LOC:Queller AI"),
      loc(
        "!LOC:by Quitch. My difficulties are prefixed with a Q. Don't make AI teams larger than human teams, increase the difficulty or the econ rate instead. I support the Legion Expansion."
      )
    );
  });
}

try {
  qQuellerAI();
} catch (e) {
  console.error(e);
}
