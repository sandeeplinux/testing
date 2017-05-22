'use strict';

angular.module('app').factory('DashboardService', ['$http', '$rootScope', function($http, $rootScope) {

  var service = {};
  var base_url = $rootScope.base_url;

  function getUserID() {
    return $rootScope.globals.currentUser.id;
  }

  service.getAllApi = function() {
    return $http.get(base_url + '/newsfeeds/' + getUserID() + '/listallnewsfeeds');
  };

  service.getByCategory = function() {
    return $http.get(base_url + '/newsfeeds/' + getUserID() + '/categorynewsfeeds');
  };
  service.getcputime = function() {
    // var randonNumber = Math.floor(Math.random()*119537664+1);
    return $http.get("http://10.124.30.35:5080/dep/devops/systemHealth");
  };
  return service;

}]);
