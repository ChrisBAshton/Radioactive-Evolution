define(['lib/event_emitter/EventEmitter.min'], function (EventEmitter) {
    return {
        // $:      jQuery,
        // etc:    new ExampleThingy,
        pubsub: new EventEmitter()
    };
});