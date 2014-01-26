define([], function () {

    var browser = "unknown";
    var browser_array = ["firefox", "chrome", "safari", "opera", "msie"];
    for(var i =0; i < browser_array.length; i++) {
        var thisIsTheBrowser = navigator.userAgent.toLowerCase().indexOf(browser_array[i]) > -1;
        if(thisIsTheBrowser) {
            browser = browser_array[i];
            break;
        }
    }

    return browser;

});