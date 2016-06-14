var navCtrl = angular.module('navigation.controller', ['navigation.services']);

navCtrl.controller('NavigationController', ['$rootScope', '$scope', 'ViewService', function($rootScope, $scope, ViewService) {
	$scope.getView = function() {
		return ViewService.getView();
	};
	$scope.filterApp = function(search) {
		// TODO: maybe do not use rootscope here
		$rootScope.searchApp = search;
	}
}]);