var ngToolsApp = angular.module('ngToolsApp', [
		 	// external modules
		 	'ui.router', 'ngAnimate',
		 	// dashboard
		 	'dashboard.controller',
		 	// timetracker
		 	'timetracker.controller',
		 	]);

ngToolsApp.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
	
	$urlRouterProvider.otherwise('/dashboard');
	
	$stateProvider
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: 'app/modules/common/dashboard/templates/dashboard.html',
			controller: 'DashboardCtrl'
		})
		.state('timetracker', {
			url: '/timetracker',
			templateUrl: 'app/modules/timetracker/templates/timetracker.html',
			controller: 'TimetrackerController'
		})
}]);
ngToolsApp.controller('DateCtrl', ['$scope', '$interval', function($scope, $interval) {
	
	// set time before intervals to have it shown immediately after page load
	$scope.currentTime = new Date();
	$scope.color = "#222222";
	
	// refresh time every 1000ms
	$interval(function() {
		$scope.currentTime = new Date();
	if ($scope.currentTime.getHours() >= 0) {
		$scope.color = "#AF0082";
		if ($scope.currentTime.getHours() >= 9) {
			$scope.color = "#0A17EA";
			if ($scope.currentTime.getHours() >= 12) {
				$scope.color = "36ECBD";
				if ($scope.currentTime.getHours() >= 15) {
					$scope.color = "#FCB814";
					if ($scope.currentTime.getHours() >= 18) {
						$scope.color = "#AA0114";
					}
				}
			}
		}
	}
	}, 1000);
}]);









