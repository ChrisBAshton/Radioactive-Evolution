define(['bootstrap', 'module/model/Layout', 'module/model/Browser'], function (bs, layout, browser) {

    var LoadingScreen = function (TOTAL_FILES) {

        var self = this;

        bs.pubsub.addListener('regame:loaded:file', function () {
            self.updateLoadingScreen(1);
        });

        /*
            updateLoadingScreen() is called when the Google Fonts has finished downloading,
            and when each image downloads. Therefore, we increment TOTAL_FILES to represent 
            not only the script files but the data that is loaded in GoogleFonts.js and Includes.js.
            
            GoogleFonts.js - Events fired how many times:   1
            Includes.js - Images downloaded:                7
            New value for TOTAL_FILES:                      TOTAL_FILES + 8
            
            This seems a lot of effort(!), but ensures that all of the rich data has fully downloaded before the
            user sees the main menu. Without this, we'd see glitches such as the system text defaulting to Arial
            before changing to its Google font a couple of seconds later.
            
            I'd like to extend this to include the sound file downloads, but this broke the robustness of the 
            program as Safari doesn't like audio!
        */

        TOTAL_FILES += 8;

        // track the number of files that have downloaded so far - used to calculate the loading bar
        var LOADED_FILES = 0;

        // Updates the loading screen, launching the game when all required files have been downloaded
        this.updateLoadingScreen = function (numberOfFiles) {
            // update number of files downloaded so far
            LOADED_FILES += numberOfFiles;
            // calculate percentage loaded
            var LOADED = Math.floor(((LOADED_FILES/TOTAL_FILES)*100));
            
            // draw background colour
            context.fillStyle = "#EDEDED";
            context.fillRect(0, 0, layout.getWidth(), layout.getHeight());
            // draw loading bar background
            var lingrad = context.createLinearGradient((layout.getWidth()/4), (layout.getHeight()/2)-10, (layout.getWidth()/4), (layout.getHeight()/2)+10);
            lingrad.addColorStop(0, '#7d7e7d');
            lingrad.addColorStop(1, '#0e0e0e');
            context.fillStyle = lingrad;
            context.fillRect((layout.getWidth()/4), (layout.getHeight()/2)-10, (layout.getWidth()/2), 10);
            // draw loading bar
            var highlightGrad = context.createLinearGradient((layout.getWidth()/4), (layout.getHeight()/2)-10, (layout.getWidth()/4), (layout.getHeight()/2)+10);
            highlightGrad.addColorStop(0, '#333333');
            highlightGrad.addColorStop(1, '#666666');
            context.fillStyle = highlightGrad;
            context.fillRect((layout.getWidth()/4), (layout.getHeight()/2)-10, ((layout.getWidth()/2)/100) * LOADED, 10);
            
            // set up text
            context.fillStyle = "#737373";
            context.font = "12px Verdana";
            context.textAlign = 'center';
            
            // display message regarding user's browser
            switch(browser) {
                case "firefox":
                    var message = "You appear to be using Firefox. Radioactive Evolution is fully functional in this browser!";
                    break;
                case "chrome":
                    var message = "You appear to be using Chrome. Radioactive Evolution is fully functional in this browser!";
                    break;
                case "opera":
                    var message = "You appear to be using Opera. Radioactive Evolution is mostly functional in this browser.";
                    break;
                case "safari":
                    context.fillStyle = "#CF0000";
                    var message = "You appear to be using Safari. Unfortunately, the audio in this game will not work for you.";
                    break;
                case "msie":
                    context.fillStyle = "#CF0000";
                    var message = "You appear to be using Safari. Unfortunately, the audio in this game will not work for you.";
                    break;
                case "unknown":
                    context.fillStyle = "#CF0000";
                    var message = "Your browser has not been recognised, so the game might not work as expected.";
                    break;
            }
            context.fillText(message, (layout.getWidth()/2), layout.getSandLevel());
            // reset color
            context.fillStyle = "#737373";
            
            // display message regarding download progress
            context.fillText("Loading... "+LOADED+"%", (layout.getWidth()/2), (layout.getHeight()/2)-30);

        }
    };

    return new LoadingScreen();
})