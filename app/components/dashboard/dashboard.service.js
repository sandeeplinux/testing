'use strict';
angular.module('app').factory('DashboardService', ['$http', '$rootScope', function($http, $rootScope) {

  var service = {};
  var base_url = $rootScope.base_url;
  var seriesData = [];
  var url = 'http://10.124.30.33:5080/dep/devops/systemHealth';

  function getUserID() {
    return $rootScope.globals.currentUser.id;
  }

  function generateSeriesData() {
    var data = [];
    var time = (new Date()).getTime();

    for (var i = -19; i <= 0; i += 1) {
      data.push({
        x: time + i * 5000,
        y: Math.round(Math.random() * 2)
      });
    }

    return data;
  }

  service.setURL = function(param) {
    url = 'http://10.124.30.' + param + ':5080/dep/devops/systemHealth';
  }

  service.getcputime = function() {
    return $http.get(url);
    /*  return {
          "responseMetaData":{
              "statusCode":"0000",
              "statusDesc":"Success"
          },
          "responsePayloadData":{
              "cores":4,
              "freeMemory":199052248,
              "totalMemory":251658240,
              "osArch":"amd64",
              "osName":"Linux",
              "osVersion":"3.10.0-514.el7.x86_64",
              "loadAvg":0.0,
              "threadCount":15,
              "allThreadsCpuTime":17699544716,
              "cpuUsage":1.88,
              "diskUsage":0,
              "memoryUsage":5.2605992E7,
              "token":null
          }
        }*/
  };

  service.chartOptions = function(params) {
    var self = this;
    var options = {
      options: {
        chart: {
          type: 'line',
          // backgroundColor: '#282e3f'
        }
      },
      title: {
        text: params.title,
        style: {
          // color: '#F00',
          font: '18px Trebuchet MS, Verdana, sans-serif'
        }
      },
      xAxis: {
          type: 'datetime'
      },
      yAxis: {
        title: {
          style: {
            // color: '#f00',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'
         },
          text: params.title
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      condition: {
        maxWidth: '90%'
      },
      size: {
        height: "300"
      },
      loading: false,
      exporting: {
        enabled: false
      }
    };

    options.series = [{
      name: params.title,
      type: "line",
      data: generateSeriesData()
    }];

    return options;
  };

  return service;

}]);
