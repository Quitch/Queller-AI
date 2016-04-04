(function() {
    var extensions = {
        'Bronze': {
            display_name: 'Bronze',
            metal_drain_check: 0.64,
            energy_drain_check: 0.77,
            metal_demand_check: 0.95,
            energy_demand_check: 0.92,
            micro_type: 0,
            go_for_the_kill: false,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 0.5,
            adv_eco_mod: 0.85,
            adv_eco_mod_alone: 0.85,
            factory_build_delay_min: 0,
            factory_build_delay_max: 12,
            personality_tags:
            [
                "bronze"
            ],
            fabber_to_factory_ratio_basic: 10.0,
            fabber_to_factory_ratio_advanced: 5.0,
            fabber_alone_on_planet_mod: 1.0,
            basic_to_advanced_factory_ratio: 0,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 10,
            max_basic_fabbers: 20,
            min_advanced_fabbers: 10,
            max_advanced_fabbers: 20
        },
        'Silver': {
            display_name: 'Silver',
            metal_drain_check: 0.54,
            energy_drain_check: 0.77,
            metal_demand_check: 0.95,
            energy_demand_check: 0.92,
            micro_type: 1,
            go_for_the_kill: false,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.5,
            adv_eco_mod: 1.0,
            adv_eco_mod_alone: 1.0,
            factory_build_delay_min: 0,
            factory_build_delay_max: 3,
            personality_tags:
            [
                "silver"
            ],
            fabber_to_factory_ratio_basic: 2.0,
            fabber_to_factory_ratio_advanced: 1.0,
            fabber_alone_on_planet_mod: 1.0,
            basic_to_advanced_factory_ratio: 0,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 2,
            max_basic_fabbers: 30,
            min_advanced_fabbers: 1,
            max_advanced_fabbers: 30
        },
        'Gold': {
            display_name: 'Gold',
            metal_drain_check: 0.54,
            energy_drain_check: 0.47,
            metal_demand_check: 0.85,
            energy_demand_check: 0.62,
            micro_type: 1,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.3,
            adv_eco_mod: 1.1,
            adv_eco_mod_alone: 0.75,
            personality_tags:
            [
                "gold"
            ],
            fabber_to_factory_ratio_basic: 0.5,
            fabber_to_factory_ratio_advanced: 1.0,
            fabber_alone_on_planet_mod: 3.0,
            basic_to_advanced_factory_ratio: 0,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 2,
            max_basic_fabbers: 40,
            min_advanced_fabbers: 1,
            max_advanced_fabbers: 40
        },
        'Platinum': {
            display_name: 'Platinum',
            metal_drain_check: 0.54,
            energy_drain_check: 0.77,
            metal_demand_check: 0.85,
            energy_demand_check: 0.92,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.15,
            adv_eco_mod: 1.5,
            adv_eco_mod_alone: 0.95,
            personality_tags:
            [
                "platinum"
            ],
            fabber_to_factory_ratio_basic: 1.0,
            fabber_to_factory_ratio_advanced: 3.0,
            fabber_alone_on_planet_mod: 3.0,
            basic_to_advanced_factory_ratio: 0,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 2,
            max_basic_fabbers: 50,
            min_advanced_fabbers: 3,
            max_advanced_fabbers: 50
        },
        'Uber': {
            display_name: 'Uber',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 1.3,
            adv_eco_mod_alone: 0.85,
            personality_tags:
            [
                "uber"
            ],
            fabber_to_factory_ratio_basic: 1.0,
            fabber_to_factory_ratio_advanced: 3.0,
            fabber_alone_on_planet_mod: 3.0,
            basic_to_advanced_factory_ratio: 10,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 2,
            max_basic_fabbers: 100,
            min_advanced_fabbers: 3,
            max_advanced_fabbers: 100
        },
        'Experimental': {
            display_name: 'Experimental',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 1.3,
            adv_eco_mod_alone: 0.85,
            personality_tags:
            [
                "experimental"
            ],
            fabber_to_factory_ratio_basic: 1.0,
            fabber_to_factory_ratio_advanced: 3.0,
            fabber_alone_on_planet_mod: 3.0,
            basic_to_advanced_factory_ratio: 10,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 2,
            max_basic_fabbers: 100,
            min_advanced_fabbers: 3,
            max_advanced_fabbers: 100
        },
        'Uber Air': {
            display_name: 'Uber Air',
            metal_drain_check: 0.54,
            energy_drain_check: 0.65,
            metal_demand_check: 0.85,
            energy_demand_check: 0.8,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 1.3,
            adv_eco_mod_alone: 0.85,
            personality_tags:
            [
                "uber",
                "airswarm"
            ],
            fabber_to_factory_ratio_basic: 1.0,
            fabber_to_factory_ratio_advanced: 3.0,
            fabber_alone_on_planet_mod: 3.0,
            basic_to_advanced_factory_ratio: 10,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 2,
            max_basic_fabbers: 100,
            min_advanced_fabbers: 3,
            max_advanced_fabbers: 100
        },
        'Uber Bot': {
            display_name: 'Uber Bot',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 0.5,
            adv_eco_mod: 1.4,
            adv_eco_mod_alone: 0.85,
            personality_tags:
            [
                "uber",
                "botonly"
            ],
            fabber_to_factory_ratio_basic: 1.0,
            fabber_to_factory_ratio_advanced: 3.0,
            fabber_alone_on_planet_mod: 3.0,
            basic_to_advanced_factory_ratio: 10,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 1,
            max_basic_fabbers: 100,
            min_advanced_fabbers: 3,
            max_advanced_fabbers: 100
        },
        'Uber Land': {
            display_name: 'Uber Land',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 1.3,
            adv_eco_mod_alone: 0.85,
            personality_tags:
            [
                "uber",
                "nonaval"
            ],
            fabber_to_factory_ratio_basic: 1.0,
            fabber_to_factory_ratio_advanced: 3.0,
            fabber_alone_on_planet_mod: 3.0,
            basic_to_advanced_factory_ratio: 10,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 2,
            max_basic_fabbers: 100,
            min_advanced_fabbers: 3,
            max_advanced_fabbers: 100
        },
        'Uber Naval': {
            display_name: 'Uber Naval',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 1.3,
            adv_eco_mod_alone: 0.85,
            personality_tags:
            [
                "uber",
                "navalstart"
            ],
            fabber_to_factory_ratio_basic: 1.0,
            fabber_to_factory_ratio_advanced: 3.0,
            fabber_alone_on_planet_mod: 3.0,
            basic_to_advanced_factory_ratio: 10,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 2,
            max_basic_fabbers: 100,
            min_advanced_fabbers: 3,
            max_advanced_fabbers: 100
        },
        'Uber Rush': {
            display_name: 'Uber Rush',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 0.5,
            adv_eco_mod: 1.4,
            adv_eco_mod_alone: 0.85,
            personality_tags:
            [
                "uber",
                "botonly",
                "rush"
            ],
            fabber_to_factory_ratio_basic: 1.0,
            fabber_to_factory_ratio_advanced: 3.0,
            fabber_alone_on_planet_mod: 3.0,
            basic_to_advanced_factory_ratio: 10,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 1,
            max_basic_fabbers: 100,
            min_advanced_fabbers: 3,
            max_advanced_fabbers: 100
        },
        'Uber Tank': {
            display_name: 'Uber Tank',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 1.3,
            adv_eco_mod_alone: 0.85,
            personality_tags:
            [
                "uber",
                "tankonly"
            ],
            fabber_to_factory_ratio_basic: 1.0,
            fabber_to_factory_ratio_advanced: 3.0,
            fabber_alone_on_planet_mod: 3.0,
            basic_to_advanced_factory_ratio: 10,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 2,
            max_basic_fabbers: 100,
            min_advanced_fabbers: 3,
            max_advanced_fabbers: 100
        },
        'Uber Tech': {
            display_name: 'Uber Tech',
            metal_drain_check: 0.54,
            energy_drain_check: 0.57,
            metal_demand_check: 0.85,
            energy_demand_check: 0.72,
            micro_type: 2,
            go_for_the_kill: true,
            priority_scout_metal_spots: true,
            enable_commander_danger_responses: true,
            neural_data_mod: 1.0,
            adv_eco_mod: 0,
            adv_eco_mod_alone: 0,
            personality_tags:
            [
                "uber",
                "techrush",
                "threefabber"
            ],
            fabber_to_factory_ratio_basic: 1.0,
            fabber_to_factory_ratio_advanced: 3.0,
            fabber_alone_on_planet_mod: 3.0,
            basic_to_advanced_factory_ratio: 5,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 5,
            max_basic_fabbers: 100,
            min_advanced_fabbers: 3,
            max_advanced_fabbers: 100
        },
        'Uber Turtle': {
            display_name: 'Uber Turtle',
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
            adv_eco_mod_alone: 0.65,
            personality_tags:
            [
                "uber",
                "techrush",
                "threefabber",
                "turtle"
            ],
            fabber_to_factory_ratio_basic: 3.0,
            fabber_to_factory_ratio_advanced: 5.0,
            fabber_alone_on_planet_mod: 3.0,
            basic_to_advanced_factory_ratio: 5,
            factory_alone_on_planet_mod: 0.5,
            min_basic_fabbers: 3,
            max_basic_fabbers: 100,
            min_advanced_fabbers: 3,
            max_advanced_fabbers: 100
        },
    }

    var baseline = model.aiPersonalities.Absurd || {
        percent_vehicle: 0.45,
        percent_bot: 0.25,
        percent_air: 0.2,
        percent_naval: 0.05,
        percent_orbital: 0.05,
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
        max_basic_fabbers: 6,
        min_advanced_fabbers: 3,
        max_advanced_fabbers: 20
    }
    Object.keys(extensions).forEach(function(name) {
        extensions[name] = _.extend(JSON.parse(JSON.stringify(baseline)), extensions[name])
        extensions[name].name = name
    })

    _.extend(model.aiPersonalities, extensions)

    model.aiPersonalityNames(_.keys(model.aiPersonalities));
})()