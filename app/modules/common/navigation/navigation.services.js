var navService = angular.module('navigation.services', []);

/**
 * ViewService
 * Used for setting and getting the current view
 */
navService.service('ViewService', function() {
	var currentView = "";
	
	this.getView = function() {
		return currentView;
	};
	this.setView = function(view) {
		currentView = view;
	};
});