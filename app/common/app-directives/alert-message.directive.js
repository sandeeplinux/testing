'use strict';
angular.module("app").directive('alertMessage', ['$timeout', function($timeout){

    var link = function (scope, elem, attrs){
        scope.$watch('alertObj', function (newValue, oldValue, scope) {
            if(newValue){
                $timeout(function() {
                    if(scope.alertObj){
                        scope.alertObj = "";
                    }
                }, 1500);
            }
        });
    };

    var template = function(){
        return '<div class="alert" ng-class="alertObj.type">'+
                '<a class="close" data-dismiss="alert" aria-label="close">&times;</a>{{alertObj.message}}'+
                '</div>';
    };

    return {
        scope: {
            alertObj: '=options'
        },
        replace: 'true',
        restrict: 'AE',    
        template: template,
        link: link 
    };
}]);


