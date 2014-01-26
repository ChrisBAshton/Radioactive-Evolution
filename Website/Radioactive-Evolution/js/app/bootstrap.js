define(['_helpers/object_helper', 'lib/event_emitter/EventEmitter.min'], function (ObjectHelper, EventEmitter) {
    return {
        extend: ObjectHelper.extend,
        pubsub: new EventEmitter()
    };
});