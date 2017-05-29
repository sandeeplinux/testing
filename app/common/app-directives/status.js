app.directive('status', function() {

    var template = function(){        
        return '<div><i class="fa fa-circle" data-ng-class="{\'success\': value === 1, \'remove\': value === -1, \'pending\': value === 2, \'inactive\': value === 0}" aria-hidden="true"></i>'+
                '<span ng-if="value === -1"> Deleted </span>'+
                '<span ng-if="value === 0"> Inactive </span>'+
                '<span ng-if="value === 1"> Active </span>'+
                '<span ng-if="value === 2"> Pendiing </span>'+
                '</div>';
    };

    return {
        scope: {
            value: '=itemValue'  
        },
        replace: 'true',
        restrict: 'AE',    
        template: template
    };
});