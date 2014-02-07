define(function() {
    return {
        game: {
            countdown:   30,
            minFish:     1,
            maxFish:     false,
            minPlankton: 3,
            maxPlankton: 15,
            minPoison:   0,
            maxPoison:   5,
            planktonXP:  1
        },
        canvas: {
            width:       1000,
            height:      700,
            elements: {
                console: 50,
                water:   140,
                sand:    630
            }
        },
        menu: {
            button: {
                width:   250,
                height:  120
            }  
        }
    };
});