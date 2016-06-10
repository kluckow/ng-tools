var timetracker = angular.module('timetracker.controller', ['angularModalService']);

timetracker.controller('TimetrackerController', ['$scope', 'ModalService', function($scope, ModalService) {

	$scope.module = {
		"title" : "Timetracker"
	};
	$scope.taskList = [];
	
	$scope.openCreateTaskModal = function() {
		ModalService.showModal({
			templateUrl : "app/modules/timetracker/templates/timetracker-modal-create.html",
			controller : "ModalController"
		}).then(function(modal) {
			modal.element.modal();
			modal.close.then(function(task) {
				console.log("Adding task to task list!");
				$scope.taskList = $scope.taskList.push(task);
			});
		});
	};
	$scope.$on('addTaskToTaskList', function (event, data) {
		  console.log("TimetrackerController hat auf 'addTaskToTaskList'-Event reagiert!"); // 'Data to send'
		  console.log(data);
		  $scope.taskList = $scope.taskList.push(data);
	});
}]);

timetracker.controller('ModalController', ['$scope', 'close', '$element', function($scope, close, $element) {
	$scope.task = {
		created : "",
		stopped : "",
		title : ""
	};
	$scope.cancel = function(task) {
		$element.modal('hide');
		close(task);
	};
	$scope.start = function() {
		if ($scope.task.title == "" || $scope.task.title == undefined) {
			alert("Please enter a title!");
			return;
		} else {
			$scope.task.created = new Date();
//			$scope.$emit('addTaskToTaskList', $scope.task);
			console.log($scope.task);
			$scope.cancel($scope.task);
		}
	};
}]);
