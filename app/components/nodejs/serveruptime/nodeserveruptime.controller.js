'use strict';

angular.module("app").controller('NodeUptimeCtrl', ['NodeUptimeService', '$state', function (NodeUptimeService, $state) {
    var self = this;
    self.model = {};
    self.formSubmitHandler = function(form){
        $state.go("app.dashboard");
        /*AuthService.authoriseAPI(self.model)
        .success(function(response){
            AuthService.SetCredentials(response);
            $state.go("app.dashboard");
        })
        .error(function(error){
            console.log(error);
        });*/
    };
}]);
