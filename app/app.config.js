'use strict';
<<<<<<< HEAD
app.config(['$windowProvider', '$translateProvider', '$httpProvider', function ($windowProvider, $translateProvider, $httpProvider) {
=======
app.config(['$windowProvider', '$translateProvider', '$httpProvider', function($windowProvider, $translateProvider, $httpProvider) {
>>>>>>> 8fa7dffafa17dab825e8ff09f76d1e5693adc429

  $translateProvider.useStaticFilesLoader({
    prefix: 'assets/i18n/',
    suffix: '.json'
  });

  var bnavigator = $windowProvider.$get().navigator;
  var browserLanguage = (bnavigator.language) ? bnavigator.language : bnavigator.browserLanguage;
  browserLanguage = (browserLanguage === undefined) ? 'en' : browserLanguage.toLowerCase();
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('escape');

<<<<<<< HEAD
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
=======
  var interceptors = function($q, $location, $localStorage, $rootScope) {
    $rootScope.ajaxProgress = 0;
    if (!String.prototype.contains) {
      String.prototype.contains = function(str) {
        return (this.indexOf(str) !== -1);
      };
    }

    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.Authorization = $localStorage.token;
        }
        if (config.url === "http://10.124.30.35:5080/dep/devops/systemHealth") {
          $rootScope.ajaxProgress = 0;
        } else {
          $rootScope.ajaxProgress++;
        }
        return config;

      },
      response: function(response) {
        $rootScope.ajaxProgress--;
        return response;
      },
      responseError: function(rejection) {
        $rootScope.ajaxProgress--;

        if (rejection.status === 403) {
          $location.path('/login');
        }

        return $q.reject(rejection);
      }
    }
>>>>>>> 8fa7dffafa17dab825e8ff09f76d1e5693adc429
  }

  $httpProvider.interceptors.push(interceptors);
  //$httpProvider.interceptors.push('sessionRecoverer');
}]);
