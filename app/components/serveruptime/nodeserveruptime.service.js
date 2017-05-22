'use strict';

angular.module('app').factory('NodeUptimeService', ['$http', '$cookieStore', '$rootScope', '$localStorage','$state', function ($http, $cookieStore, $rootScope, $localStorage, $state) {

  var base_url = $rootScope.base_url;  

    return {
        getAllAPI : function(params){
          params = (params) ? params : '';          
          return $http.get(base_url+'state/getAll'+ params);       
        },
        createAPI: function(data){
          return $http.post(base_url+'state/create', data);
        },
        updateAPI: function(data){
          return $http.put(base_url+'state/update/'+data._id, data);
        },
        deleteAPI: function(selected){
          return $http.post(base_url+'state/delete', selected);
        },
        getById : function(id){
            return $http.get(base_url+'state/get/'+id);
        },
    };

}]);
