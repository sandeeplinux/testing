'use strict';

angular.module("app").controller('dashboardCtrl', ['DashboardService', '$rootScope', '$scope', 'appService', '$state', function(DashboardService, $rootScope, $scope, appService, $state) {
  var dashboard = this;
  dashboard.userName = $rootScope.globals.currentUser;
  var defaultParams = {
    title: 'Memory Usage'
  };
  dashboard.chartOption = DashboardService.chartOptions(defaultParams);

  (function () {
    setInterval(function () {
        addSeries();
    }, 1000);
  })();

  dashboard.selectServerType = function (type) {
    var params = {};
    switch (type) {
      case 'memory':
        params.title = 'Memory Usage';
        break;
      case 'cpu':
        params.title = 'CPU Usage';
        break;
      case 'disk':
        params.title = 'Disk Usage';
        break;
    }

    dashboard.chartOption = DashboardService.chartOptions(params);
  };

  dashboard.setServer = function (param) {
    DashboardService.setURL(param);
    //addSeries()
  };

  function addSeries () {

      function successResponse (response) {
          var seriesPoint = {
            x: (new Date()).getTime(),
            y: response ? response.responsePayloadData.diskUsage : Math.round(Math.random() * 2)
          }
         dashboard.chartOption.series[0].data.push(seriesPoint);
      }
      // Enable this to get the data from server
      DashboardService.getcputime()
                      .success(successResponse)
                      .error(function (error) {
                        console.log('Error >>>', error);
                      });

  };

}]);
