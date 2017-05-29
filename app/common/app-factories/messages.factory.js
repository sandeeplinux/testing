'use strict';
angular.module('app').factory('messagesFactory', ['$translate', 'flashService', 'appService', '$uibModal', '$state', function ($translate, flashService, appService, $uibModal, $state) {

  var service = {};

  function netWorkError() {
    appService.handleOffline($uibModal, $state, true);
  };
  
  
  service.addedSuccessfully = function (successObj) {    
      flashService.displayMessages($translate.instant("common.success_messages.added"), 'alert-success' ,true);    
  };
    
  service.updatedSuccessfully = function (successObj) {    
      flashService.displayMessages($translate.instant("common.success_messages.added"), 'alert-success' ,true);    
  };
    
  service.deletedSuccessfully = function () {
      flashService.displayMessages($translate.instant("common.success_messages.deleted"), 'alert-success' ,true);   
  }
  
  service.customMessagesSample = function (successObj) {
    if (successObj) {
      flashService.showCustomMessage('forgot', true);
    }
  };
  
  service.showErrorSample = function (status) {
    flashService.showError(message, false);
  };

  return service;
}]);
