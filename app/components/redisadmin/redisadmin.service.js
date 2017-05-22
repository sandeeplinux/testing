'use strict';

angular.module('app').factory('redisAdminService', ['$http', '$cookieStore', '$rootScope', '$localStorage', '$state', function($http, $cookieStore, $rootScope, $localStorage, $state) {


  return {
    getStatusAPI: function(selected) {
      console.log("CheckStatus IP.... " + selected);
      var url = "http://" + selected + ":5080/dep/devops/redisStatus?operation=Status";
      return $http.get(url);
    },
    stopAPI: function(selected) {
      console.log("stopping IP.... " + selected);
      var url = "http://" + selected + ":5080/dep/devops/stopRedis?operation=stopRedis";
      return $http.get(url);
    },
    startAPI: function(selected) {
      console.log("starting IP.... " + selected);
      var url = "http://" + selected + ":5080/dep/devops/startRedis?operation=startRedis";
      return $http.get(url);
    },
    restartAPI: function(selected) {
      console.log("Restarting IP.... " + selected);
      var url = "http://" + selected + ":5080/dep/devops/restartRedis?operation=restartRedis";
      return $http.get(url);
    }
  };

}]);
