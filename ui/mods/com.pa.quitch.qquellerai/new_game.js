var qQuellerAILoaded;

function qQuellerAI() {
  if (qQuellerAILoaded) {
    return;
  }

  qQuellerAILoaded = true;

  api.debug.log('Loading Queller AI Personalities');

  var aiPersonalities = model.aiPersonalities();

  var newPersonalities = {
    'Q-Casual': {
      display_name: '!LOC:Q-Casual',
      metal_drain_check: 0.64,
      energy_drain_check: 0.77,
      metal_demand_check: 0.95,
      energy_demand_check: 0.92,
      micro_type: 0,
      go_for_the_kill: false,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: false,
      neural_data_mod: 2.0,
      adv_eco_mod: 0.5,
      adv_eco_mod_alone: 0,
      factory_build_delay_min: 0,
      factory_build_delay_max: 12,
      per_expansion_delay: 60,
      personality_tags:
        [
          "casual"
        ],
      min_basic_fabbers: 10,
      min_advanced_fabbers: 3
    },
    'Q-Bronze': {
      display_name: '!LOC:Q-Bronze',
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
      personality_tags:
        [
          "bronze"
        ],
      min_basic_fabbers: 5,
      min_advanced_fabbers: 3
    },
    'Q-Silver': {
      display_name: '!LOC:Q-Silver',
      metal_drain_check: 0.54,
      energy_drain_check: 0.77,
      metal_demand_check: 0.95,
      energy_demand_check: 0.92,
      micro_type: 1,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 1.45,
      adv_eco_mod: 1.0,
      adv_eco_mod_alone: 0,
      personality_tags:
        [
          "silver"
        ],
      min_basic_fabbers: 4,
      min_advanced_fabbers: 3
    },
    'Q-Gold': {
      display_name: '!LOC:Q-Gold',
      metal_drain_check: 0.54,
      energy_drain_check: 0.77,
      metal_demand_check: 0.85,
      energy_demand_check: 0.92,
      micro_type: 1,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 1.3,
      adv_eco_mod: 1.0,
      adv_eco_mod_alone: 0,
      personality_tags:
        [
          "gold"
        ],
      min_basic_fabbers: 3,
      min_advanced_fabbers: 2
    },
    'Q-Platinum': {
      display_name: '!LOC:Q-Platinum',
      metal_drain_check: 0.54,
      energy_drain_check: 0.77,
      metal_demand_check: 0.85,
      energy_demand_check: 0.92,
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 1.15,
      adv_eco_mod: 1.0,
      adv_eco_mod_alone: 0,
      personality_tags:
        [
          "platinum"
        ],
      min_basic_fabbers: 2,
      min_advanced_fabbers: 2
    },
    'Q-Uber': {
      display_name: '!LOC:Q-Uber',
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 1.0,
      adv_eco_mod: 1.0,
      adv_eco_mod_alone: 0,
      personality_tags:
        [
          "uber"
        ],
      min_basic_fabbers: 3,
      min_advanced_fabbers: 1
    },
    'Q-Uber Aggressive': {
      display_name: '!LOC:Q-Uber Aggressive',
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 1.25,
      adv_eco_mod: 1.0,
      adv_eco_mod_alone: 0,
      personality_tags:
        [
          "uber",
          "aggressive"
        ],
      min_basic_fabbers: 3,
      min_advanced_fabbers: 1,
    },
    'Q-Uber Air': {
      display_name: '!LOC:Q-Uber Air',
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 1.0,
      adv_eco_mod: 1.0,
      adv_eco_mod_alone: 0,
      personality_tags:
        [
          "uber",
          "air"
        ],
      min_basic_fabbers: 3,
      min_advanced_fabbers: 1
    },
    'Q-Uber Bot': {
      display_name: '!LOC:Q-Uber Bot',
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 0.5,
      adv_eco_mod: 1.0,
      adv_eco_mod_alone: 0,
      personality_tags:
        [
          "uber",
          "bot"
        ],
      min_basic_fabbers: 3,
      min_advanced_fabbers: 1
    },
    'Q-Uber Free For All': {
      display_name: '!LOC:Q-Uber Free For All',
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
      personality_tags:
        [
          "uber",
          "ffa"
        ],
      min_basic_fabbers: 4,
      min_advanced_fabbers: 1
    },
    'Q-Uber Naval': {
      display_name: '!LOC:Q-Uber Naval',
      metal_drain_check: 0.64,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 1.0,
      adv_eco_mod: 1.0,
      adv_eco_mod_alone: 0,
      personality_tags:
        [
          "uber",
          "naval"
        ],
      min_basic_fabbers: 1,
      min_advanced_fabbers: 1
    },
    'Q-Uber Neural': {
      display_name: '!LOC:Q-Uber Neural',
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 1.0,
      adv_eco_mod: 1.0,
      adv_eco_mod_alone: 0,
      personality_tags:
        [
          "uber",
          "neural"
        ],
      min_basic_fabbers: 3,
      min_advanced_fabbers: 1
    },
    'Q-Uber Rush': {
      display_name: '!LOC:Q-Uber Rush',
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 1.0,
      adv_eco_mod: 2.0,
      adv_eco_mod_alone: 0,
      personality_tags:
        [
          "uber",
          "rush"
        ],
      min_basic_fabbers: 2,
      min_advanced_fabbers: 1
    },
    'Q-Uber Tank': {
      display_name: '!LOC:Q-Uber Tank',
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      enable_commander_danger_responses: true,
      neural_data_mod: 1.0,
      adv_eco_mod: 1.0,
      adv_eco_mod_alone: 0,
      personality_tags:
        [
          "uber",
          "tank"
        ],
      min_basic_fabbers: 3,
      min_advanced_fabbers: 1
    }
  }

  var baseline = aiPersonalities.Absurd

  newPersonalities = _.mapValues(newPersonalities, function (personality, name) {
    var result = _.extend(_.clone(baseline), personality);
    result['name'] = name;
    return result;
  });

  _.extend(aiPersonalities, newPersonalities);

  model.aiPersonalities.valueHasMutated();

  _.defer(function () {
    model.localChatMessage(loc("!LOC:Queller AI"), loc("!LOC:by Quitch. Version 4.46.1. My difficulties are prefixed with a Q. Don't make AI teams larger than human teams, increase the difficulty or the econ rate instead. I support the Legion Expansion."));
  });

}

try {
  qQuellerAI();
}
catch (e) {
  console.error(e);
}