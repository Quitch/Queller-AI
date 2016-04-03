var qQuellerAILoaded;

function qQuellerAI() {
    if (qQuellerAILoaded) {
        return;
    }

    qQuellerAILoaded = true;

    model.qQuellerAIServerModIsLoaded = ko.observable(false);

    model.qQuellerAIIsHost = ko.computed(function() {
        return model.isGameCreator() && model.qQuellerAIServerModIsLoaded();
    });

    model.qQuellerAIServerModCheckLoaded = function() {
        api.mods.getMountedMods('server', function(mods) {

            // check to see if server mod (and optionally a dev version) are loaded

            var loaded = _.intersection(_.pluck(mods, 'identifier'), ['com.pa.quitch.qQuellerAI', 'com.pa.quitch.qQuellerAI-dev']).length > 0;

            model.qQuellerAIServerModIsLoaded(loaded);
        });
    }

    // once mod data is sent check if server mod is actually loaded

    if (window.scene_server_mod_list && window.scene_server_mod_list.new_game) {
        model.qQuellerAIServerModCheckLoaded();
    }
    else {
        var server_mod_info_updated_handler = handlers.server_mod_info_updated;

        handlers.server_mod_info_updated = function(payload) {
            server_mod_info_updated_handler(payload);

            model.qQuellerAIServerModCheckLoaded();
        }
    }

    model.qQuellerAIServerModIsLoaded.subscribe(function(qQuellerAIServerModIsLoaded) {
        if (qQuellerAIServerModIsLoaded) {
            loadScript("coui://ui/mods/com.pa.quitch.qquellerai/personalities.js");
        }
    });

    model.qQuellerAIServerModIsHost.subscribe(function(qQuellerAIServerModIsHost) {
        if (qQuellerAIServerModIsHost) {
            loadScript("coui://ui/mods/com.pa.quitch.qquellerai/personalities.js");
        }
    });
}

try {
    qQuellerAI();
}
catch (e) {
    console.error(e);
}