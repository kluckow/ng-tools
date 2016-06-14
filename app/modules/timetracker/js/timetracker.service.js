var timetrackerService = angular.module('timetracker.service', ['string.utils']);
/**
 * TimetrackerService
 * Description: Add task to your task list.
 */
timetrackerService.service('TimetrackerService', ['$log', 'TaskListCheckService', function($log, TaskListCheckService) {
	var taskList = new Array();
	this.addTask = function(task) {
		if (TaskListCheckService.isTaskExisting(task, taskList) === false) {
			// create date for new task
			task.created = new Date();
			taskList.push(task);
			return true;
		}
		return false;
	};
	this.deleteTask = function(index) {
		if (taskList.splice(index, 1).length == 0) {
			$log.error(taskList[index] + " could not be deleted!");
			return false;
		}
		return true;
	};
	this.getTaskList = function() {
		return taskList;
	};
}]);
/**
 * TaskListCheckService
 * Description: Check if a task with the same title already exists.
 */
timetrackerService.service('TaskListCheckService', ['$log', 'StringUtils', function($log, StringUtils) {
	$log.debug("Using TaskListCheckServiceService.");
	this.isTaskExisting = function(task, taskList) {
	    for (var i = 0; i < taskList.length; i++) {
	        if (taskList[i].title === StringUtils.trim(task.title)) {
	        	$log.error("Task with title '" + taskList[i].title + "' already existing");
	            return true;
	        }
	    }
	    return false;
	};
}]);