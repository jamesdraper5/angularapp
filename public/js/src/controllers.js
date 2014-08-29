var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
  	function ($scope, $http) {
    	$http.get('api/tables').success(function(data) {
      		$scope.phones = data;
    	});

    	//$scope.orderProp = 'age';
  	}]
);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
  	function($scope, $routeParams) {
    	$scope.tableId = $routeParams.tableId;
  	}]
);