'use strict';

angular.module('app').factory('NodeAdminService', ['$http', '$cookieStore', '$rootScope', '$localStorage', '$state', function($http, $cookieStore, $rootScope, $localStorage, $state) {


  return {
    getStatusAPI: function(selected) {
      console.log("CheckStatus IP.... " + selected);
      var url = "http://" + selected + ":5080/dep/devops/nodeStatus?operation=status";
      return $http.get(url);
    },
    stopAPI: function(selected) {
      console.log("stopping IP.... " + selected);
      var url = "http://" + selected + ":5080/dep/devops/stopNode?operation=stopNode";
      return $http.get(url);
    },
    startAPI: function(selected) {
      console.log("starting IP.... " + selected);
      var url = "http://" + selected + ":5080/dep/devops/startNode?operation=startNode";
      return $http.get(url);
    },
    restartAPI: function(selected) {
      console.log("Restarting IP.... " + selected);
      var url = "http://" + selected + ":5080/dep/devops/restartNode?operation=restartNode";
      return $http.get(url);
    }
  };

}]);
