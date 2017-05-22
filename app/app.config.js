'use strict';
app.config(['$windowProvider', '$translateProvider', '$httpProvider', function ($windowProvider, $translateProvider, $httpProvider) {

  $translateProvider.useStaticFilesLoader({
    prefix: 'assets/i18n/',
    suffix: '.json'
  });

  var bnavigator = $windowProvider.$get().navigator;
  var browserLanguage = (bnavigator.language) ? bnavigator.language : bnavigator.browserLanguage;
  browserLanguage = (browserLanguage === undefined) ? 'en' : browserLanguage.toLowerCase();
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('escape');

  var interceptors = function ($q, $location, $localStorage, $rootScope) {
		$rootScope.ajaxProgress = 0;
		if (!String.prototype.contains) {
			String.prototype.contains = function (str) {
				return (this.indexOf(str) !== -1);
			};
		}

		return {
			request: function (config) {
				config.headers = config.headers || {};
				if ($localStorage.token) {
					config.headers.Authorization = $localStorage.token;
				}

				$rootScope.ajaxProgress++;
				return config;
			},
			response: function (response) {
				$rootScope.ajaxProgress--;
				return response;
			},
			responseError: function (rejection) {
				$rootScope.ajaxProgress--;

				if (rejection.status === 403) {
					$location.path('/login');
				}

				return $q.reject(rejection);
			}
		}
  }

  $httpProvider.interceptors.push(interceptors);
  //$httpProvider.interceptors.push('sessionRecoverer');
}]);
