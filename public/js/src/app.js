var budgetApp = angular.module('budgetApp', [
  'ngRoute',
  'phonecatControllers'
]);

budgetApp.config(['$routeProvider',
  	function($routeProvider) {
    	$routeProvider.
      		when('/tables', {
        		templateUrl: 'partials/tableListing',
        		controller: 'PhoneListCtrl'
      		}).
      		when('/tables/:tableId', {
        		templateUrl: 'partials/phone-detail.html',
        		controller: 'PhoneDetailCtrl'
      		}).
      		otherwise({
        		redirectTo: '/tables'
      		});
  	}
]);