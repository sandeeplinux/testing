'use strict';

angular.module('app').factory('AuthService', ['$http', '$cookieStore', '$rootScope', '$localStorage', '$state', function($http, $cookieStore, $rootScope, $localStorage, $state) {

  var service = {};
  var base_url = $rootScope.base_url;
  var cookieName = 'tiauses';

  function urlBase64Decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  function getUserFromToken() {
    var token = $localStorage.token;
    var user = {};
    if (typeof token !== 'undefined') {
      var encoded = token.split('.')[1];
      user = JSON.parse(urlBase64Decode(encoded));
    }
    return user;
  }

  service.getCurrectUser = function() {
    return getUserFromToken();
  };

  service.authoriseAPI = function(login) {
    var url = "https://localhost:3443/depservices/securitymanagement/authenticateService/1.0.0";
    var data = {
      "requestMetaData": {
        "appName": "campaignmanagement",
        "operationName": "authenticateService",
        "conversationId": "Id-bf3edc3c4c0ef0b6c42a3d074759c8bd"
      },
      "requestPayloadData": {
        "credentials": {
          "login": login.loginid,
          "password": login.password
        }
      }
    };
    return $http.post(url, data);
  };

  service.SetCredentials = function(data) {
    if ($cookieStore.get(cookieName)) {
      service.ClearCredentials();
    }
    $localStorage.token = data.responsePayloadData.tokenID;
    $rootScope.session = data;
    $rootScope.globals = {
      currentUser: data.responsePayloadData.firstName + " " + data.responsePayloadData.lastName,
      token: data.responsePayloadData.tokenID

    };
    //$cookieStore.put(cookieName, $rootScope.session);
    $cookieStore.put('globals', $rootScope.globals);
  };

  service.ClearCredentials = function() {
    $rootScope.session = {};
    $cookieStore.remove(cookieName);
    delete $localStorage.token;
    //$http.defaults.headers.common.Authorization = 'Bearer';
  };

  service.generateNewToken = function(cb) {
    $http.post($rootScope.base_url + 'auth/token', {
      token: $localStorage.token
    }).success(function(data) {
      if (data.token && cb) {
        $localStorage.token = data.token;
      }
      if (cb) {
        cb(data.token);
      }
    }).error(function() {
      service.ClearCredentials();
      $state.go("login");
    });
  };

  return service;

}]);
