angular.module('toDoList.controllers')
.controller('detailController', function(toDoService, $routeParams, $location) {
	var detail= this;

	detail.init= function() {
		var id= Number($routeParams.id);
		detail.todo= toDoService.getSelectedToDo(id);
	};

	detail.removeToDo= function(id) {
		toDoService.removeToDo(id);
		$location.path('#/');
	};










	detail.init();
});