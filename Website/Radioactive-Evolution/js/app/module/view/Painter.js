define(['bootstrap', 'module/model/Assets', 'module/model/Level', 'creatures/user', 'module/controller/Status'], function (bs, assets, level, user, status) {

    /**
    * An abstract class that paints the game environment to the canvas, including the
    * background, fish, plankton, etc.
    *
    * @class Painter
    * @constructor
    */
    var Painter = function () {
    
        var self = this;

        this.init = function () {
            canvas.width        = bs.config.canvas.width;
            canvas.height       = bs.config.canvas.height;
            canvas.style.border = "black 1px solid";

            bs.pubsub.addListener('regame:paint:redraw', function () {
                self.redraw();
            });
            self.loadFonts();
        };

        /**
         *   A script for loading Google fonts.
         *
         * See more customisable stuff at:
         * https://developers.google.com/webfonts/docs/webfont_loader#Events
         */
        this.loadFonts = function () {
            WebFontConfig = {
                google: { families: [ 'Jura::latin' ] },
                active: function() {
                    updateLoadingScreen(1);
                }
            };

            (function() {
                var wf = document.createElement('script');
                wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                wf.type = 'text/javascript';
                wf.async = 'true';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(wf, s);
            })();
        }

        /**
        * Changes the cursor to the specified type.
        *
        * @method changeCursor
        * @param {String} cursor    The cursor to change to.
        */
        this.changeCursor = function (cursor) {
            switch(cursor) {
                case "none":
                    // hide cursor (e.g. during gameplay)
                    document.getElementById(CANVAS_NAME).style.cursor = "none";
                    //document.getElementById(CANVAS_NAME).style.cursor = 'url("Radioactive-Evolution/images/blank.cur"), none';
                    break;
                case "default":
                    // show the cursor so that user can find their way around menu
                    document.getElementById(CANVAS_NAME).style.cursor = "default";
                    break;
                    // turn cursor into hand to show that something is clickable
                case "pointer":
                    document.getElementById(CANVAS_NAME).style.cursor = "pointer";
                    break;
                default:
                    document.getElementById(CANVAS_NAME).style.cursor = "auto";
            }
        }

        /**
        * Draws the entire gaming environment to the canvas.
        *
        * @method redraw
        */
        this.redraw = function() {
            this.draw_background();
            
            level.drawCreatures();
            
            user.draw();
            
            // draw level summary
            this.draw_summary();
        }

        /**
        * Draws the canvas background (i.e. sun, clouds, water etc)
        *
        * @method draw_background
        */
        this.draw_background = function() {
            context.save();

            var consoleLevel = bs.config.canvas.elements.console,
                waterLevel = bs.config.canvas.elements.water,
                sandLevel = bs.config.canvas.elements.sand,
                width = bs.config.canvas.width,
                height = bs.config.canvas.height;

            
            // Create Linear Gradients
            var lingrad = context.createLinearGradient(0,0,0,consoleLevel);
            lingrad.addColorStop(0, '#7d7e7d');
            lingrad.addColorStop(1, '#0e0e0e');
            // draw sky
            context.fillStyle="#EDEDED";
            context.fillRect(0, consoleLevel, width, (height-consoleLevel));
            context.drawImage(assets.img_cloud_1, 10, 30);
            context.drawImage(assets.img_cloud_2, 300, 40);
            context.drawImage(assets.img_sun, (width-200), 20);
            // draw system background
            context.fillStyle = lingrad;
            context.fillRect(0, 0, width, consoleLevel);
            // draw water
            context.fillStyle="#82CAFF";
            context.fillRect(0, waterLevel, width, (height-waterLevel));
            context.drawImage(assets.img_water,0,waterLevel, width, sandLevel);
            // draw sand
            context.fillStyle="#FFF380";
            context.fillRect(0, sandLevel, width, (height-sandLevel));
            context.drawImage(assets.img_sand,0,sandLevel);
            
            context.restore();
        }

        /**
        * Draws the gaming information, including level, XP, and time left.
        *
        * @method draw_summary
        */
        this.draw_summary = function() {
            context.save();
            context.fillStyle = "#FFFFFF";
            context.font = "24px Jura";
            context.textAlign = 'left';
            //context.fillText("Level "+level, 10, 30);
            
            context.textAlign = 'center';
            // if(!menu.isInView()) {
            //     if(countdown.secondsLeft() <= 5) {
            //         // set text to red
            //         context.fillStyle = "red";
            //     }
            //     context.fillText("Time Left: "+countdown.secondsLeft(), bs.config.canvas.width/2, 30);
            //     if(countdown.secondsLeft() <= 5) {
            //         // now reset to normal color
            //         context.fillStyle = "#FFFFFF";
            //     }
                
            //     // add help instructions
            //     context.save();
            //     context.font = "12px Jura";
            //     context.fillText("Press space for help", bs.config.canvas.width/2, 48);
            //     context.restore();
                
            // } else if(notification != null) {
            //     context.fillText(notification, bs.config.canvas.width/2, 30);
            // }

            context.fillText(status.get(), bs.config.canvas.width/2, 30);

            context.textAlign = 'right';
            context.fillText(level.ep() + " XP", bs.config.canvas.width-10, 30);
            context.restore();
        }
    };

    var painter = new Painter();
    painter.init();
    return painter;
});