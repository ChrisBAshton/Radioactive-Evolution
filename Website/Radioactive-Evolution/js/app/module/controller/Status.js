define(['bootstrap'], function (bs) {

    var Status = function () {
        
        var Status = this;
        
        this.status;
        this.score = 0;

        bs.pubsub.addListener('regame:status', function (status) {
            Status.status = status;
        });

        bs.pubsub.addListener('regame:status:score', function (score) {
            Status.score = score;
        });

        this.get = function () {
            return Status.status;
        }

        this.getScore = function () {
            return Status.score + ' XP';
        }
    }

    return new Status();

});