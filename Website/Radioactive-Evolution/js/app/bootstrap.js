define(['module/model/ClassExtender', 'lib/event_emitter/EventEmitter.min'], function (ClassExtender, EventEmitter) {
    return {
        // $:      jQuery,
        // etc:    new ExampleThingy,
        extend: ClassExtender.extend,
        pubsub: new EventEmitter()
    };
});