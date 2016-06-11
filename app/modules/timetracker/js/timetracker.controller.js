var timetracker = angular.module('timetracker.controller',
		['angularModalService', 'timetracker.service']);

timetracker.controller('TimetrackerController', ['$scope', 'ModalService', '$log', function($scope, ModalService, $log) {
	$scope.module = {
		"title" : "Timetracker"
	};
	
	$scope.openCreateTaskModal = function() {
		$log.debug("Loading 'Create Timer' modal...")
		ModalService.showModal({
			templateUrl : "app/modules/timetracker/templates/timetracker-modal-create.html",
			controller : "ModalController"
		}).then(function(modal) {
			modal.element.modal();
			// TODO: disable underlay functions
//			currently callback not needed			
//			modal.close.then(function(task) {
//				$scope.taskList.push(task);
//			});
		});
	};
}]);

timetracker.controller('ModalController',
		['$scope', 'close', '$element', '$log', 'TimetrackerService', '$timeout', function($scope, close, $element, $log, TimetrackerService, $timeout) {
	$log.debug("Loading ModalController...")
	$scope.taskAlreadyExists = false;
	$scope.taskCreateSuccess = false;
	$scope.task = {
		created : "",
		stopped : "",
		title : ""
	};
	$scope.addTask = function(task) {
		return TimetrackerService.addTask(task);
	};
	$scope.cancel = function() {
		$timeout(function() {
			$element.modal('hide');
			close();
		}, 500);
	};
	$scope.start = function() {
		if ($scope.task.title == "" || $scope.task.title == undefined) {
			$scope.taskNoName = true;
			$timeout(function() {
				$scope.taskNoName = false;
			}, 2000);
			return;
		} else {
			if ($scope.addTask($scope.task)) {
				// set property to hide danger alert
				$scope.taskAlreadyExists = false;
				// create date for new task
				$scope.task.created = new Date();
				// show success alert for 2s
				$scope.taskCreateSuccess = true;
				$timeout(function() {
					$scope.taskCreateSuccess = false;
				}, 2000);
				// close modal
				$scope.cancel();
			} else {
				$scope.taskCreateSuccess = false;
				$scope.taskAlreadyExists = true;
		    	$timeout(function() {
		    		$scope.taskAlreadyExists = false;
		    	}, 2000);
			}
		}
	};
}]);
