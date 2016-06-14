var strUtils = angular.module('string.utils', []);

strUtils.service('StringUtils', function() {
	this.trim = function(str) {
		var trimmedStr = str.trim();
		return trimmedStr.replace(/\s+/g, ' ');
	};
});