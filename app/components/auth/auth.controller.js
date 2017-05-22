'use strict';

angular.module("app").controller('AuthCtrl', ['AuthService', '$state', function(AuthService, $state) {
  var self = this;
  self.model = {};
  // self.formSubmitHandler = function(form){
  //     AuthService.authoriseAPI(self.model)
  //         .success(function(response){
  //             AuthService.SetCredentials(response);
  //             $state.go("app.dashboard");
  //         })
  //         .error(function(error){
  //             console.log(error);
  //         });
  // };

  self.formSubmitHandler = function(form) {
    var handleError = function(error) {

      if (error) {
        alert(error.responseMetaData.statusDesc);
      }
    };

    AuthService.authoriseAPI(self.model)
      .success(function(response) {
        AuthService.SetCredentials(response);
        $state.go("app.dashboard");
      })
      .error(handleError);
  };


}]);
