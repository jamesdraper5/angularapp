var budgetApp=angular.module("budgetApp",["ngRoute","budgetAppControllers"]);budgetApp.config(["$routeProvider","$locationProvider",function(e,t){e.when("/",{templateUrl:"partials/home",controller:"HomeCtrl"}).when("/tables",{templateUrl:"partials/tableListing",controller:"TableListCtrl"}).when("/tables/:id",{templateUrl:"partials/table",controller:"TableDetailCtrl"}).otherwise({redirectTo:"/"}),t.html5Mode(!0)}]);
var budgetAppControllers=angular.module("budgetAppControllers",[]);budgetAppControllers.controller("HomeCtrl",["$scope",function(e){e.phones=[{age:0,id:"motorola-xoom-with-wi-fi",imageUrl:"img/phones/motorola-xoom-with-wi-fi.0.jpg",name:"Motorola XOOM™ with Wi-Fi",snippet:"The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."},{age:1,id:"motorola-xoom",imageUrl:"img/phones/motorola-xoom.0.jpg",name:"MOTOROLA XOOM™",snippet:"The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM, the world's first tablet powered by Android 3.0 (Honeycomb)."},{age:2,carrier:"AT&T",id:"motorola-atrix-4g",imageUrl:"img/phones/motorola-atrix-4g.0.jpg",name:"MOTOROLA ATRIX™ 4G",snippet:"MOTOROLA ATRIX 4G the world's most powerful smartphone."},{age:3,id:"dell-streak-7",imageUrl:"img/phones/dell-streak-7.0.jpg",name:"Dell Streak 7",snippet:"Introducing Dell™ Streak 7. Share photos, videos and movies together. It’s small enough to carry around, big enough to gather around."}],e.orderProp="age"}]),budgetAppControllers.controller("TableListCtrl",["$scope","$http",function(e,t){e.pageStatus="loading",setTimeout(function(){t.get("api/tables").success(function(t,o){e.pageStatus=o,e.tables=t}).error(function(t,o){e.pageStatus=o})},2e3)}]),budgetAppControllers.controller("TableDetailCtrl",["$scope","$http","$routeParams",function(e,t,o){var r=o.id;e.pageStatus="loading",setTimeout(function(){t.get("api/tables/"+r).success(function(t,o){e.pageStatus=o,e.entries=t,e.newEntry={tableId:r}}).error(function(t,o){e.pageStatus=o})},2e3),e.isEditMode=!1,e.sortOrder="date",e.total=0,e.toggleAddForm=function(){e.isEditMode=!e.isEditMode},e.addEntry=function(o){t.post("api/entries",o).success(function(){e.entries.push(o),e.newEntry={tableId:r}})},e.totalAmount=function(){var t=0;return angular.forEach(e.entries,function(e){t+=parseInt(e.amount,10)}),t}}]);