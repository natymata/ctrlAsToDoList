angular.module('toDoList', ['ngRoute', 'toDoList.controllers', 'toDoList.services'])
.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: "front-end/views/main.html",
			controller: 'mainController',
			controllerAs: 'main'
		})
		.when('/detail/:id', {
			templateUrl: "front-end/views/detail.html",
			controller: 'detailController',			
			controllerAs: 'detail'
		})
		.otherwise({
			redirectTo: '/'
		});
});

angular.module('toDoList.controllers', []);
angular.module('toDoList.services', []);


