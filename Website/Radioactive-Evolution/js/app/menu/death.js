define(['bootstrap', 'menu/_menu', 'module/controller/Game', 'module/controller/Achievements', 'module/model/Layout', 'module/model/Assets'], function (bs, Menu, game, Achievements, layout, assets) {

    /**
    * The menu shown when the user dies; offers them the chance to restart or 
    * return to the main menu.
    *
    * @class DeathMenu
    * @extends Menu
    * @constructor
    */
    var DeathMenu = function () {
        
        bs.extend(Menu, this);
        
        // add custom buttons   
        this.createButton("restart", "Restart", (layout.getWidth()/4)-50, layout.getHeight()/2, this.button_width, this.button_height);
        this.createButton("mainMenu", "Return to main menu",(layout.getWidth()/2)+50, (layout.getHeight()/2), this.button_width, this.button_height);

        // custom menu stuff TODO
        //sound_death.play();
        notification = "You died! Final Score: "+final_score;


        /**
        * Checks for button presses and responds appropriately.
        *
        * @override
        * @method mouseClicked
        * @param {Number} mouseX    The mouse's X co-ordinate
        * @param {Number} mouseY    The mouse's Y co-ordinate
        */
        this.mouseClicked = function(mouseX,mouseY) {
            for(var i = 0; i < this.buttons.length; i++) {
                if(this.buttons[i].isSelected()) {
                    switch(this.buttons[i].getKey()) {
                        case "restart":
                            bs.pubsub.emitEvent('regame:game:reset', [function () {
                                bs.pubsub.emitEvent('regame:game:start');
                            }]);
                            break;
                        case "mainMenu":
                            bs.pubsub.emitEvent('regame:game:reset');
                            bs.pubsub.emitEvent('regame:menu:new', ['main']);
                            break;
                    }
                }
            }
        }
    }

    return DeathMenu;
});