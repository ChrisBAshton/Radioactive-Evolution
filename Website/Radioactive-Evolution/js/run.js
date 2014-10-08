(function () {

    var config = {
            baseUrl: "js/app",
            paths: {
                // relative to baseUrl
                "lib": "../lib"
            }
        },
        canvasName = document.getElementById('radioactive-evolution-script').getAttribute('data-container-div'),
        canvasElement = document.createElement('canvas');

    document.getElementById(canvasName).appendChild(canvasElement);
    loadRadioactiveEvolution(canvasElement);

    function loadRadioactiveEvolution(canvas) {
        require(config, ['bootstrap'], function (bs) {
            bs.canvas = canvas;
            
            require(config, ['app'], function (app) {
                app.init();
            });
        });
    };

}());