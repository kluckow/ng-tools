var timetrackerService = angular.module('timetracker.service', []);
/**
 * TimetrackerService
 * Description: Add task to your task list.
 */
timetrackerService.service('TimetrackerService', ['$log', 'TaskListCheckService', function($log, TaskListCheckService) {
	var taskList = new Array();
	this.addTask = function(task) {
		if (TaskListCheckService.isTaskExisting(task, taskList) === false) {
			taskList.push(task);
			return true;
		}
		return false;
	};
}]);
/**
 * TaskListCheckService
 * Description: Check if a task with the same title already exists.
 */
timetrackerService.service('TaskListCheckService', ['$log', function($log) {
	
	$log.debug("Using TaskListCheckServiceService.");
	
	this.isTaskExisting = function(task, taskList) {
		$log.debug(taskList);
		$log.debug(task);
		
	    for (var i = 0; i < taskList.length; i++) {
	        if (taskList[i].title === task.title) {
	        	$log.error("Task with title '" + taskList[i].title + "' already existing");
	            return true;
	        }
	    }
	    return false;
	};
}]);