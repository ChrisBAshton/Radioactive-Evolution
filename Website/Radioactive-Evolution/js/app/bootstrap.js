define(['_helpers/object_helper', 'lib/event_emitter/EventEmitter.min', 'game_config'], function (ObjectHelper, EventEmitter, GameConfig) {
    return {
        extend: ObjectHelper.extend,
        pubsub: new EventEmitter(),
        config: GameConfig
    };
});