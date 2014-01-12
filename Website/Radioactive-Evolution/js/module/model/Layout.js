define([], function () {

    /**
    * A class defining canvas size and important game environment co-ordinates.
    *
    * @class Layout
    * @constructor
    */
    var Layout = function () {
        this.CANVAS_WIDTH = 1000;
        this.CANVAS_HEIGHT = 700;
        this.SYSTEM_LEVEL = 50;
        this.WATER_LEVEL = this.CANVAS_HEIGHT / 5;
        this.SAND_LEVEL = this.CANVAS_HEIGHT - (this.WATER_LEVEL/2);
        
        // set the size of the panel
        canvas.width=this.CANVAS_WIDTH;
        canvas.height=this.CANVAS_HEIGHT;
        canvas.style.border = "black 1px solid";
    }

    /**
    * Returns the width of the canvas.
    *
    * @method getWidth
    * @return {Number}  The canvas width
    */
    Layout.prototype.getWidth = function() {
        return this.CANVAS_WIDTH;
    }

    /**
    * Returns the height of the canvas.
    *
    * @method getHeight
    * @return {Number}  The canvas height
    */
    Layout.prototype.getHeight = function() {
        return this.CANVAS_HEIGHT;
    }

    /**
    * Returns the level of the bottom of the "system bar";
    * no creatures should ever be able to cross above this level.
    *
    * @method getSystemLevel
    * @return {Number}  The level of the system bar
    */
    Layout.prototype.getSystemLevel = function() {
        return this.SYSTEM_LEVEL;
    }

    /**
    * Returns the level of the surface of the water.
    *
    * @method getWaterLevel
    * @return {Number}  The level of the surface of the water
    */
    Layout.prototype.getWaterLevel = function() {
        return this.WATER_LEVEL;
    }

    /**
    * Returns the x-coordinate of where the sand begins.
    *
    * @method getSandLevel
    * @return {Number}  The sand level
    */
    Layout.prototype.getSandLevel = function() {
        return this.SAND_LEVEL;
    }

    return new Layout();

});