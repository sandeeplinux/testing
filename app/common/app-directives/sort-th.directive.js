'use strict';
angular.module("app").directive('sortTh', ['$timeout', function($timeout){

    var template = function(){        
        return '<div>'+
               '<span>{{colName}} </span>' +
               '<span data-ng-if="dataLength > 0" class="fa" data-ng-class="{\'fa-sort-desc\': (sortOptions.sort == sortProp && sortOptions.order == 1),\'fa-sort-asc\': (sortOptions.sort == sortProp && sortOptions.order == -1),\'fa-sort\':(sortOptions.sort != sortProp)}"></span>'+
               '</div>';
    };

    return {
        scope: {
            sortOptions: '=options',
            sortProp: '@',
            colName: '@',
            dataLength: '=slength',
            callback: '&sortCallback'
        },
        replace: 'true',
        restrict: 'AE',    
        template: template,
        link: function(scope, elem, attrs){
            elem.on("click", function() {                
                scope.sortOptions.sort = scope.sortProp;
                scope.sortOptions.order = (scope.sortOptions.order === 1)? -1 : 1;
                scope.callback();
            });
        }
    };
}]);


