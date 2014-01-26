// TODO (?) - point to collision function in this class, remove from Level?





define(function () {

    var ObjectHelper = function () {

        this.extend = function (baseClass, subClass) {
            // call the parent constructor
            baseClass.call(subClass);
            // inherit from Menu
            subClass.prototype = Object.create(baseClass.prototype);
        };

        /**
        * Check two creatures' co-ordinates and sizes, return true if the two objects overlap.
        *
        * @method collision
        * @param {Creature} obj1    The first object
        * @param {Creature} obj2    The second object
        * @return {Boolean}         True if the two objects have collided
        */
        this.collision = function (obj1, obj2) {
            // x,y are the CENTRAL coordinates of the object
            // calculate side coordinates
            var obj1_left = obj1.getX() - (obj1.getWidth()/2);
            var obj1_right = obj1.getX() + (obj1.getWidth()/2);
            var obj1_top = obj1.getY() - (obj1.getHeight()/2);
            var obj1_bottom = obj1.getY() + (obj1.getHeight()/2);
            
            var obj2_left = obj2.getX() - (obj2.getWidth()/2);
            var obj2_right = obj2.getX() + (obj2.getWidth()/2);
            var obj2_top = obj2.getY() - (obj2.getHeight()/2);
            var obj2_bottom = obj2.getY() + (obj2.getHeight()/2);
            
            var Xoverlap = (obj1_right >= obj2_left && obj1_left <= obj2_right);
            var Yoverlap = (obj1_bottom >= obj2_top && obj1_top <= obj2_bottom);
            
            return (Xoverlap && Yoverlap);
        };
    };

    return new ObjectHelper();

});