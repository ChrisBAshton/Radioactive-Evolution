define(function() {
    return {
        game: {
            countdown:   5,    // number of seconds per level
            minFish:     1,
            maxFish:     false,
            minPlankton: 3,
            maxPlankton: 15,
            minPoison:   0,
            maxPoison:   5,
            planktonXP:  1
        },
        canvas: {
            width:       780,
            height:      500,
            elements: {
                console: 50,
                water:   140,
                sand:    420
            }
        },
        menu: {
            button: {
                width:   240,
                height:  90
            }  
        }
    };
});