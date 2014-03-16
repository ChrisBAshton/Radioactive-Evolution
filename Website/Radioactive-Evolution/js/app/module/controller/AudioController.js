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
            death = document.createElement('audio');
            death.setAttribute('src', "sounds/death.wav");
            
            // audioAssets = {
            //     "crunch": crunch,
            //     "success": success
            // };

            // // @TODO - tidy up. Audio should respond to events, not be triggered
            // // manually in this way.
            // bs.pubsub.addListener('regame:sound:play', function (asset) {
            //     currentAsset = audioAssets[asset];
            //     currentAsset.currentTime = 0;
            //     currentAsset.play();
            // });   


            bs.pubsub.addListener('regame:action:user_died', function () {
                death.play();
            });

            bs.pubsub.addListener('regame:action:killed_fish', function () {
                crunch.play();
            });

            bs.pubsub.addListener('regame:action:ate_plankton', function () {
                crunch.play();
            });

            bs.pubsub.addListener('regame:upgrade:purchased', function () {
                success.play();
            });
        }
    };

    return new AudioController();
});