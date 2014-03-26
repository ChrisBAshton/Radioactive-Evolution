define(['_helpers/browser', 'bootstrap'], function (browser, bs) {

    // images
    var img_tick = new Image();
    img_tick.src = "images/tick.png";
    var img_cross = new Image();
    img_cross.src = "images/cross.png";
    // http://medialoot.com/images/thumbs/640x440x1_Clouds_Preview2.jpg
    var img_cloud_1 = new Image();
    img_cloud_1.src = "images/cloud1.png";
    var img_cloud_2 = new Image();
    img_cloud_2.src = "images/cloud2.png";
    // http://findicons.com/icon/38004/sun?id=38015
    var img_sun = new Image();
    img_sun.src = "images/sun.png";
    // http://www.mayang.com/textures/Nature/images/Sand/
    var img_sand = new Image();
    img_sand.src = "images/sand.jpg";
    // http://www.vectoropenstock.com/previews/3437-Underwater-Vector-Background-.jpg
    var img_water = new Image();
    img_water.src = "images/water.jpg";

    // update loading screen when downloaded
    img_tick.onload = function() {
        bs.pubsub.emitEvent('regame:loaded:file');
    }
    img_cross.onload = function() {
        bs.pubsub.emitEvent('regame:loaded:file');
    }
    img_cloud_1.onload = function() {
        bs.pubsub.emitEvent('regame:loaded:file');
    }
    img_cloud_2.onload = function() {
        bs.pubsub.emitEvent('regame:loaded:file');
    }
    img_sun.onload = function() {
        bs.pubsub.emitEvent('regame:loaded:file');
    }
    img_sand.onload = function() {
        bs.pubsub.emitEvent('regame:loaded:file');
    }
    img_water.onload = function() {
        bs.pubsub.emitEvent('regame:loaded:file');
    }

    return {
        img_tick: img_tick,
        img_cross: img_cross,
        img_cloud_1: img_cloud_1,
        img_cloud_2: img_cloud_2,
        img_sun: img_sun,
        img_sand: img_sand,
        img_water: img_water
    };
});