var timetracker = angular.module('timetracker.controller',
		['angularModalService', 'timetracker.service']);

timetracker.controller('TimetrackerController', ['$scope', 'ModalService', '$log', 'TimetrackerService', 'ViewService',
                                                 function($scope, ModalService, $log, TimetrackerService, ViewService) {
	$scope.modalActive = false;
	$scope.showTaskDescription = true;
	ViewService.setView("timetracker");
	
	$scope.openCreateTaskModal = function() {
		// deactivate open create modal button
		$scope.modalActive = true;
		$log.debug("Loading 'Create Timer' modal...")
		ModalService.showModal({
			templateUrl : "app/modules/timetracker/templates/timetracker-modal-create.html",
			controller : "ModalController"
		}).then(function(modal) {
			modal.element.modal();
			// reset open create modal button to enabled state after modal is closed
			modal.close.then(function(task) {
				$scope.modalActive = false;
			});
		});
	};
	$scope.getTaskList = function() {
		return TimetrackerService.getTaskList();
	};
	$scope.deleteTask = function(index) {
		TimetrackerService.deleteTask(index);
	};
	$scope.finishTask = function(index) {
		// TODO: implement finish dialog
	};
}]);

timetracker.controller('ModalController',
		['$scope', 'close', '$element', '$log', 'TimetrackerService', '$timeout', function($scope, close, $element, $log, TimetrackerService, $timeout) {
	$log.debug("Loading ModalController...")
	$scope.taskAlreadyExists = false;
	$scope.taskCreateSuccess = false;
	$scope.taskNoName = false;
	$scope.taskCreationFinished = false;
	$scope.task = {
		created : "",
		running : false,
		title : ""
	};
	$scope.addTask = function(task) {
		return TimetrackerService.addTask(task);
	};
	$scope.cancel = function() {
		$timeout(function() {
			$element.modal('hide');
			close();
		}, 100);
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
				$scope.taskCreateSuccess = true;
				$scope.taskCreationFinised = true;
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
