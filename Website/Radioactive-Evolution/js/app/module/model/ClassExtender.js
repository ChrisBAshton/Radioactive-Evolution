define(function () {

	var ClassExtender = function () {

		this.extend = function (baseClass, subClass) {
			// call the parent constructor
			baseClass.call(subClass);
			// inherit from Menu
			subClass.prototype = Object.create(baseClass.prototype);
 		};

	};

	return new ClassExtender();

});