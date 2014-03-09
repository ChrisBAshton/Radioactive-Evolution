// @TODO - use this!

define(['bootstrap', 'IO/EventListener'], function (bs, EventListener) {
    var CanvasFactory = function (canvas) {
        canvas.id           = 'regame-canvas-unique-id';
        canvas.width        = bs.config.canvas.width;
        canvas.height       = bs.config.canvas.height;
        canvas.style.border = "black 1px solid";

        new EventListener(canvas);
    }

    return CanvasFactory;
});