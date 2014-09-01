var budgetApp = angular.module('budgetApp', ['ngRoute', 'budgetAppControllers']);

budgetApp.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/home',
				controller: 'HomeCtrl'
			}).
			when('/tables', {
				templateUrl: 'partials/tableListing',
				controller: 'TableListCtrl'
			}).
			when('/tables/:id', {
				templateUrl: 'partials/table',
				controller: 'TableDetailCtrl'
			}).
			otherwise({
				redirectTo: '/' 
			});

	  	$locationProvider.html5Mode(true);
	}
]);