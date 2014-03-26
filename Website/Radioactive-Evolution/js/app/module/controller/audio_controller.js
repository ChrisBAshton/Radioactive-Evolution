define(['bootstrap'], function (bs) {

    var AudioController = function () {

        this.init = function () {
            var crunch = document.createElement('audio');
            crunch.setAttribute('src', "sounds/crunch.wav");
            var success = document.createElement('audio');
            success.setAttribute('src', "sounds/success.wav");
            var death = document.createElement('audio');
            death.setAttribute('src', "sounds/death.wav");

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