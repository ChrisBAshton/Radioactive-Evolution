define(['bootstrap', 'upgrades/camouflage', 'upgrades/flying_fish', 'upgrades/grow', 'upgrades/murky_water', 'upgrades/poison'], function (bs, upgrade_camouflage, upgrade_flying, upgrade_grow, upgrade_murkyWater, upgrade_poison) {

    var UpgradeController = function () {

        var self = this,
            grow = new upgrade_grow(),
            poison = new upgrade_poison(),
            murky_water = new upgrade_murkyWater(),
            camouflage = new upgrade_camouflage(),
            flying_fish = new upgrade_flying();

        this.upgrades = [
            grow,
            poison,
            murky_water,
            camouflage,
            flying_fish
        ];

        /**
        * Returns the upgrade instance (object) of the given string, e.g.
        * if "camouflage" is provided as a parameter, the upgrade_camouflage variable will be returned.
        * If no parameter is provided, the upgrades array is returned.
        *
        * @override
        * @method get
        * @param {String} upgradeName   The name of the upgrade whose instance (object) we want to find.
        * @return {Upgrade}             The upgrade corresponding to the given string.
        */
        this.get = function(upgradeName) {

            if (typeof upgradeName === 'undefined') {
                return self.upgrades;
            }

            var upgradeInstance = null;
            switch(upgradeName) {
                case "Camouflage":
                    upgradeInstance = camouflage;
                    break;
                case "Flying Fish":
                    upgradeInstance = flying_fish;
                    break;
                case "Grow":
                    upgradeInstance = grow;
                    break;
                case "Murky Water":
                    upgradeInstance = murky_water;
                    break;
                case "Poison":
                    upgradeInstance = poison;
                    break;
            }
            return upgradeInstance;
        };

        /**
        * Provides a description and an XP cost for the provided upgrade, ready for overlaying on top of
        * the corresponding button.
        *
        * @override
        * @method getUpgradeDescription
        * @param {Upgrade} upgrade  The mouse's X co-ordinate
        * @return {String} The description of the upgrade.
        */
        this.getUpgradeDescription = function(upgrade) {
            return (upgrade.getTitle()+" - Level "+(upgrade.getLevel()+1)+" - "+upgrade.getCost()+"XP");
        };

    };

    return new UpgradeController();

});