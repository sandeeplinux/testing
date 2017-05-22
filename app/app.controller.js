"use strict";
angular.module("app").controller("appCtrl", ['$scope', '$state', 'AuthenticationService', '$cookieStore', function($scope, $state, AuthenticationService, $cookieStore) {

$scope.logout = function() {
         //$(".sidebar").toggleClass("showmenu");
        AuthenticationService.logoutApi();
        AuthenticationService.ClearCredentials();
        $state.go('login');
        //$cookieStore.remove('globals');

    };

  $scope.toggleCustom = function() {
    $(".sidebar").toggleClass("showmenu");
  };

  $(document).on("click", ".collapse li", function(event) {
    $(".collapse li").removeClass('active');
    $(this).addClass('active');
  });

  $(document).on("click", ".metismenu li", function(event) {
    event.stopPropagation();
  });
}]);
