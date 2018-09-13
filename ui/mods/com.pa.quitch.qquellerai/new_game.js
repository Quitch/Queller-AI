var qQuellerAILoaded;

function qQuellerAI() {
    if (qQuellerAILoaded) {
        return;
    }

    qQuellerAILoaded = true;

    api.debug.log('Adding Queller AI Personalities');

    var aiPersonalities = model.aiPersonalities();

    var newPersonalities = {
        'Q-Casual': {
            display_name: '!LOC:Q-Casual',
            metal_drain_check: 0.64,
            energy_drain_check: 0.77,
            metal_demand_check: 1.05,
            energy_demand_check: 0.92,
            micro_type: 0,
            go_for_the_kill: false,
            priority_scout_metal_spots: false,
            enable_commander_danger_responses: false,
            neural_data_mod: 2.0,
            adv_eco_mod: 0.5,
            adv_eco_mod_alone: 0.5,
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
            adv_eco_mod_alone: 0.5,
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
            adv_eco_mod_alone: 0.85,
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
            adv_eco_mod_alone: 0.85,
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
            adv_eco_mod_alone: 0.85,
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
            neural_data_mod: 1.2,
            adv_eco_mod: 1.0,
            adv_eco_mod_alone: 0,
            personality_tags:
                [
                    "uber"
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
                    "cautious"
                ],
            min_basic_fabbers: 4,
            min_advanced_fabbers: 1
        },
        'Q-Uber Naval': {
            display_name: '!LOC:Q-Uber Naval',
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
                    "naval"
                ],
            min_basic_fabbers: 3,
            min_advanced_fabbers: 1
        },
        'Q-Uber Orbital': {
            display_name: '!LOC:Q-Uber Orbital',
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
                    "orbital"
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
                    "bot",
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
        },
        'Q-Uber Old': {
            display_name: '!LOC:Q-Uber Old',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.82,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 1.0,
            adv_eco_mod_alone: 0,
            personality_tags:
                [
                    "uberold"
                ],
            min_basic_fabbers: 3,
            min_advanced_fabbers: 1
        },
        'Q-Uber Aggressive Old': {
            display_name: '!LOC:Q-Uber Aggressive Old',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.2,
            adv_eco_mod: 1.0,
            adv_eco_mod_alone: 0,
            personality_tags:
                [
                    "uberold"
                ],
            min_basic_fabbers: 3,
            min_advanced_fabbers: 1,
        },
        'Q-Uber Air Old': {
            display_name: '!LOC:Q-Uber Air Old',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 1.0,
            adv_eco_mod_alone: 0,
            personality_tags:
                [
                    "uberold",
                    "airold"
                ],
            min_basic_fabbers: 3,
            min_advanced_fabbers: 1
        },
        'Q-Uber Bot Old': {
            display_name: '!LOC:Q-Uber Bot Old',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 0.5,
            adv_eco_mod: 1.0,
            adv_eco_mod_alone: 0,
            personality_tags:
                [
                    "uberold",
                    "botold"
                ],
            min_basic_fabbers: 3,
            min_advanced_fabbers: 1
        },
        'Q-Uber Free For All Old': {
            display_name: '!LOC:Q-Uber Free For All Old',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 0.75,
            adv_eco_mod: 0.85,
            adv_eco_mod_alone: 0,
            personality_tags:
                [
                    "uberold",
                    "cautiousold"
                ],
            min_basic_fabbers: 4,
            min_advanced_fabbers: 1
        },
        'Q-Uber Naval Old': {
            display_name: '!LOC:Q-Uber Naval Old',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 1.0,
            adv_eco_mod_alone: 0,
            personality_tags:
                [
                    "uberold",
                    "navalold"
                ],
            min_basic_fabbers: 3,
            min_advanced_fabbers: 1
        },
        'Q-Uber Orbital Old': {
            display_name: '!LOC:Q-Uber Orbital Old',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 1.0,
            adv_eco_mod_alone: 0,
            personality_tags:
                [
                    "uberold",
                    "orbitalold"
                ],
            min_basic_fabbers: 3,
            min_advanced_fabbers: 1
        },
        'Q-Uber Rush Old': {
            display_name: '!LOC:Q-Uber Rush Old',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 2.0,
            adv_eco_mod_alone: 0,
            personality_tags:
                [
                    "uberold",
                    "botold",
                    "rushold"
                ],
            min_basic_fabbers: 2,
            min_advanced_fabbers: 1
        },
        'Q-Uber Tank Old': {
            display_name: '!LOC:Q-Uber Tank Old',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 1.0,
            adv_eco_mod_alone: 0,
            personality_tags:
                [
                    "uberold",
                    "tankold"
                ],
            min_basic_fabbers: 3,
            min_advanced_fabbers: 1
        }
    }

    var baseline = {
        display_name: '!LOC:Absurd',
        percent_vehicle: 0.45,
        percent_bot: 0.25,
        percent_air: 0.2,
        percent_naval: 0.05,
        percent_orbital: 0.05,
        personality_tags:
            [
                "PreventsWaste"
            ],
        metal_drain_check: 0.54,
        energy_drain_check: 0.65,
        metal_demand_check: 0.71,
        energy_demand_check: 0.8,
        micro_type: 2,
        go_for_the_kill: true,
        priority_scout_metal_spots: true,
        enable_commander_danger_responses: true,
        neural_data_mod: 1.0,
        adv_eco_mod: 1.3,
        adv_eco_mod_alone: 0.85,
        fabber_to_factory_ratio_basic: 1.0,
        fabber_to_factory_ratio_advanced: 1.0,
        fabber_alone_on_planet_mod: 2.0,
        basic_to_advanced_factory_ratio: 0,
        factory_alone_on_planet_mod: 0.5,
        min_basic_fabbers: 2,
        max_basic_fabbers: 20,
        min_advanced_fabbers: 3,
        max_advanced_fabbers: 50
    }

    newPersonalities = _.mapValues(newPersonalities, function (personality, name) {
        var result = _.extend(_.clone(baseline), personality);
        result['name'] = name;
        return result;
    });

    _.extend(aiPersonalities, newPersonalities);

    model.aiPersonalities.valueHasMutated();

    _.defer(function () {
        model.localChatMessage(loc("!LOC:Queller AI"), loc("!LOC:by Quitch. Version DEV. My difficulties are prefixed with a Q.  Don't make AI teams larger than human teams, either increase the difficulty or the eco modifier. I support the Legion Expansion."));
    });

}

try {
    qQuellerAI();
}
catch (e) {
    console.error(e);
}