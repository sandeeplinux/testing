'use strict';

angular.module("app").controller('NodeAdminCtrl', ['NodeAdminService', '$state', function(NodeAdminService, $state) {
  var self = this;
  self.model = {};
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
    _.each(self.stateList, function(item, index) {
      NodeAdminService.getStatusAPI(item.IpAddress)
        .success(function(response) {
          if (response.responseMetaData.statusCode == "0000") {
            if (response.responsePayloadData.scriptResponseDesc == "DOWN") {
              item.status = 0;
            } else if (response.responsePayloadData.scriptResponseDesc == "UP") {
              item.status = 1;
            }
          }
          console.log('____________________________________________________________________');
          console.log(response);
          self.stateList = self.stateList;
          console.log('____________________________________________________________________');
        })
        .error(function(error) {
          console.log(error);
        });
      // self.selectedIds.push(item._id);
    }); // self.statesCount = 0;
    // self.pagesCount = 0;

  }

  (function() {
    getAll();
  })();

  self.checkAll = function(sourceArr, isChecked) {
    NodeAdminService.checkAll(sourceArr, isChecked);
    if (isChecked) {
      _.each(sourceArr, function(item, index) {
        self.selectedIds.push(item._id);
      });
    } else {
      self.selectedIds = [];
    }
  };

  self.checkItem = function(sourceArr, index, isChecked, selected) {
    self.selectAll = NodeAdminService.checkItem(sourceArr, index, isChecked);
    if (isChecked) {
      self.selectedIds.push(selected._id);
    } else {
      _.each(self.selectedIds, function(item, index) {
        if (item === selected._id) {
          self.selectedIds.splice(index, 1);
        }
      });
    }
  };

  function restartSelected(ids) {
    NodeAdminService.restartAPI(ids)
      .success(function(response) {
        getAll();
        console.log(response);
      })
      .error(function(error) {
        console.log(error);
      });
  }

  function startSelected(ids) {
    NodeAdminService.startAPI(ids)
      .success(function(response) {
        getAll();
        console.log(response);
      })
      .error(function(error) {
        console.log(error);
      });
  }

  function stopSelected(ids) {
    NodeAdminService.stopAPI(ids)
      .success(function(response) {
        getAll();
        console.log(response);
      })
      .error(function(error) {
        console.log(error);
      });
  }

  self.actions = function(type, ip) {
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
