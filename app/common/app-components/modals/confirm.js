var confirmModal = {
    template: '<a href="javascript:;" ng-click="$ctrl.showConfirm()">{{$ctrl.buttonName}}</a>',
    transclude: true,
    bindings: {
        buttonName: '@',
        okCb: '&okCallback'
    },
    controller: function($uibModal) {
        var ctrl = this;
        ctrl.showConfirm = function() {

            $uibModal.open({
                templateUrl: 'common/app-components/modals/confirm.html',
                controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {

                    $scope.ok = function() {
                        ctrl.okCb();
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                }]
            });
        }
    }
};

angular.module("app")
    .component("confirmModal", confirmModal);