define(['bootstrap'], function (bs) {

    var AudioController = function () {

        this.init = function () {
            var background = createAudio('sounds/background.wav'),
                crunch = createAudio('sounds/crunch.wav'),
                success = createAudio('sounds/success.wav'),
                death = createAudio('sounds/death.wav');

            initiateBackgroundNoise(background);

            bs.pubsub.addListener('regame:action:user_died', function () {
                playAudio(death);
            });

            bs.pubsub.addListener('regame:action:killed_fish', function () {
                playAudio(crunch);
            });

            bs.pubsub.addListener('regame:action:ate_plankton', function () {
                playAudio(crunch);
            });

            bs.pubsub.addListener('regame:upgrade:purchased', function () {
                playAudio(success);
            });
        }

        var createAudio = function (file) {
            var audioFile = document.createElement('audio');
            audioFile.setAttribute('src', file);
            return audioFile;
        };

        var playAudio = function (audioFile) {
            audioFile.currentTime = 0;
            audioFile.play();
        };

        var initiateBackgroundNoise = function (background) {
            background.volume = 0.5;
            background.addEventListener('ended', function() {
                playAudio(this);
            }, false);
            background.play();
        };
    };

    return new AudioController();
});