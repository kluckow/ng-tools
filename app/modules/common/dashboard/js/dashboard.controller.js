var dashboardCtrl = angular.module('dashboard.controller', ['navigation.services', 'module.constants']);

dashboardCtrl.controller('DashboardCtrl', ['$rootScope', '$scope', 'ViewService', 'ModuleList', function($rootScope, $scope, ViewService, ModuleList) {
	ViewService.setView("dashboard");
	$scope.moduleList = ModuleList;
}]);