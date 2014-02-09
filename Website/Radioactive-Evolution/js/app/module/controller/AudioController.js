define(['bootstrap'], function (bs) {

    var AudioController = function () {

        var audioAssets,
            currentAsset,
            crunch;

        this.init = function () {
            crunch = document.createElement('audio');
            crunch.setAttribute('src', "sounds/crunch.wav");
            success = document.createElement('audio');
            success.setAttribute('src', "sounds/success.wav");
            
            audioAssets = {
                "crunch": crunch,
                "success": success
            };

            bs.pubsub.addListener('regame:sound:play', function (asset) {
                currentAsset = audioAssets[asset];
                currentAsset.currentTime = 0;
                currentAsset.play();
            });   
        }
    };

    return new AudioController();
});