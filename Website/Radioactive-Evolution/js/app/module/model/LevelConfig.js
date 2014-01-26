/*

TODO - remove this class in favour of the config.js file

*/





define([], function () {

    var LevelConfig = function () {

        var self = this,
            config = {
            number_of_fish:     0,
            number_of_plankton: 5,
            number_of_poison:   0
        };

        this.update = function (obj) {
            // LOOP THROUGH JSON AND UPDATE THE ENTRY
            // for (var i = 0; i < config.length; i++) {
            //     if (config)
            // }
        }

        return {
            update:             self.update,
            number_of_fish:     config.number_of_fish,
            number_of_plankton: config.number_of_plankton,
            number_of_plankton: config.number_of_poison
        }

    };

    return new LevelConfig();

});