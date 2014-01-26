// TODO - use. And rename to game_config.js
define(function() {
    return {
        game {
            countdown:   30,
            minFish:     1,
            maxFish:     false,
            minPlankton: 3,
            maxPlankton: 15,
            planktonXP:  1
        },
        canvas: {
            width:       1000,
            height:      700,
            elements: {
                console: 50,
                water:   200,
                sand:    600
            }
        },
        menu {
            button {
                width:   250,
                height:  120
            }  
        }
    };
});