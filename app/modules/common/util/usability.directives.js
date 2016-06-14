var usability = angular.module('usability.directives', []);

/**
 * focus
 * Used additionally to html attribute "autofocus", because "autofocus"
 * did not work on the search in the global toolbar and the modal in
 * at the timetracker at the same time
 */
usability.directive('focus', function($timeout) {
     return {
         scope : {
             trigger : '@focus'
         },
         link : function(scope, element) {
             scope.$watch('trigger', function(value) {
                 if (value === "true") {
                     $timeout(function() {
                         element[0].focus();
                     });
                 }
             });
         }
    };
});