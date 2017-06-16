'use strict';

angular.module("app").controller('redisAdminCtrl', ['redisAdminService', '$state', '$timeout', '$scope', function (redisAdminService, $state, $timeout, $scope) {
  var self = this;
  self.model = {};
  self.refreshTime = 10 * 60 * 1000;
  self.stateList = [{
    "server": "server V1",
    "IpAddress": "10.124.30.33",
    "lastUpdated": "06-05-2017",
    "status": 0
  }, {
    "server": "server V2",
    "IpAddress": "10.124.30.34",
    "lastUpdated": "06-05-2017",
    "status": 0
  }, {
    "server": "server V3",
    "IpAddress": "10.124.30.35",
    "lastUpdated": "06-05-2017",
    "status": 0
  }];

  function getAll() {
    // self.stateList = self.stateList;
    _.each(self.stateList, function (item, index) {
      redisAdminService.getStatusAPI(item.IpAddress)
        .success(function (response) {
          console.log(self.refreshTime);
          if (response.responseMetaData.statusCode == "0000") {
            if (response.responsePayloadData.scriptResponseDesc == "DOWN") {
              item.status = 0;
            } else if (response.responsePayloadData.scriptResponseDesc == "UP") {
              item.status = 1;
            }
          }
          self.stateList = self.stateList;

        })
        .error(function (error) {
          console.log(error);
        });

    });

    // Reload
    var reload = $timeout(getAll, self.refreshTime);
    $scope.$on('$destroy', function () {
      $timeout.cancel(reload);
    });
  }

  (function () {
    getAll();
  })();
  self.setRefreshTime = function (minutes) {
    self.refreshTime = minutes * 60 * 1000;
  };

  self.checkAll = function (sourceArr, isChecked) {
    redisAdminService.checkAll(sourceArr, isChecked);
    if (isChecked) {
      _.each(sourceArr, function (item, index) {
        self.selectedIds.push(item._id);
      });
    } else {
      self.selectedIds = [];
    }
  };

  self.checkItem = function (sourceArr, index, isChecked, selected) {
    self.selectAll = redisAdminService.checkItem(sourceArr, index, isChecked);
    if (isChecked) {
      self.selectedIds.push(selected._id);
    } else {
      _.each(self.selectedIds, function (item, index) {
        if (item === selected._id) {
          self.selectedIds.splice(index, 1);
        }
      });
    }
  };

  function restartSelected(ids) {
    redisAdminService.restartAPI(ids)
      .success(function (response) {
        getAll();
        console.log(response);
      })
      .error(function (error) {
        console.log(error);
      });
  }

  function startSelected(ids) {
    redisAdminService.startAPI(ids)
      .success(function (response) {
        getAll();
        console.log(response);
      })
      .error(function (error) {
        console.log(error);
      });
  }

  function stopSelected(ids) {
    redisAdminService.stopAPI(ids)
      .success(function (response) {
        getAll();
        console.log(response);
      })
      .error(function (error) {
        console.log(error);
      });
  }

  self.actions = function (type, ip) {
    switch (type) {
      case 'restart':
        restartSelected(ip);
        break;
      case 'start':
        startSelected(ip);
        break;
      case 'stop':
        stopSelected(ip);
        break;

    }
  };


}]);