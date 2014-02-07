define(['bootstrap'], function (bs) {

    var Status = function () {
        
        var Status = this;
        
        this.status;

        bs.pubsub.addListener('regame:status', function (status) {
            Status.status = status;
        });

        this.get = function () {
            return Status.status;
        }
    }

    return new Status();

});