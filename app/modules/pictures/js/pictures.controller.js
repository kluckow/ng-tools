var pictures = angular.module('pictures.controller', []);

pictures.controller('PicturesController', ['$scope', 'ViewService',
                                                 function($scope, ViewService) {
	ViewService.setView("pictures");
	
}]);
