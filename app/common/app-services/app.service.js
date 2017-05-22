'use strict';

angular.module('app').factory('appService', ['$rootScope', '$timeout', '$cookieStore', '$localStorage','_', function ($rootScope, $timeout, $cookieStore, $localStorage, _) {
  var service = {};

  service.checkSessionOnURLChange = function () {
    $rootScope.globals = ($cookieStore.get('globals')) ? $cookieStore.get('globals') : {};
    return ($rootScope.globals.currentUser) ? true : false;
  };

  service.onSessionRedirections = function (currentUrl) {
    var restrictedURLS = ['/login', '/register', '/forgot-password', '', '/user/confirmation'];
    return (($.inArray(currentUrl, restrictedURLS) !== -1) && service.checkSessionOnURLChange()) ? true : false;
  };

  service.setEnvironment = function (type) {
    if (type === 'dev') {
      return 'http://ec2-52-66-130-61.ap-south-1.compute.amazonaws.com:5000/api/';
    } else if (type === "local") {
      return 'http://localhost:5000/api/';
    }
  };

  service.getKeysOfCollection = function (obj) {
    obj = angular.copy(obj);
    if (!obj) {
      return [];
    }
    return Object.keys(obj);
  };

  service.queryBuilder = function(query){
      var queryString = "?";
      angular.forEach(query, function(val, key) {
          queryString += key + "=" + val + "&";
      });
      return queryString.substring(0, queryString.length-1);;
  }

  service.checkAll = function (sourceArr, isChecked) {
      if(sourceArr.length > 0){
          _.each(sourceArr, function(item){
              item.selected = isChecked;
          });
      }
  };

  service.checkItem = function (sourceArr, index, isChecked) {
      sourceArr[index].selected = isChecked;
        if(sourceArr.length > 0){
            var totalSelected = _.filter(sourceArr, function(item){ return item.selected == true; }).length;
            return (totalSelected === sourceArr.length) ? true : false;
        }
  };

  service.simpleSort = function (sourceArr, property, reverse) {
    sourceArr.sort(function (a, b) {
      if (a[property] && typeof a[property] === "string") {
        if (a[property].toLowerCase() < b[property].toLowerCase()) {
          return -1;
        }
        if (a[property].toLowerCase() > b[property].toLowerCase()) {
          return 1;
        }
      } else {
        if (a[property] < b[property]) {
          return -1;
        }
        if (a[property] > b[property]) {
          return 1;
        }
      }
      return 0;
    });

    for (var i = 0; i < sourceArr.length; i++) {
      sourceArr[i][property];
    }

    if (reverse) {
      sourceArr.reverse();
    }

    return sourceArr;
  };


  return service;

}]);
