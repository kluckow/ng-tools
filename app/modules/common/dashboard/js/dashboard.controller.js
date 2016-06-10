var dashboardCtrl = angular.module('dashboard.controller', []);

dashboardCtrl.controller('DashboardCtrl', ['$scope', function($scope) {
	$scope.module = {
			"title" : "Dashboard"
	};
}]);