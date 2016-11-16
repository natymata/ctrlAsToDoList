angular.module('toDoList.controllers')
.controller('mainController', function(toDoService){
	var main= this;

	main.init= function() {
		toDoService.listInit();
		main.list= toDoService.getAll();
		main.newTodo= {id:"", text:"", description: "", deadline: "", done: false, state: "Pending"};
	};

	main.addToDo= function() {
		var newTodo= main.newTodo;
		main.list= toDoService.addToDo(newTodo);
		main.newTodo= {id:"", text:"", description: "", deadline: "", done: false, state: "Pending"};
	};

	main.updateDone= function(toDo) {
		toDoService.updateDone(toDo, main.list);
	};

	main.pending= function() {	
		return pending= toDoService.pending();
	};

	main.clearDone= function() {
		main.list= toDoService.clearDone();

	};

	main.removeToDo= function(id) {
		main.list= toDoService.removeToDo(id);
	};

	main.clearAll= function() {
		main.list= toDoService.clearAll();
	};

	main.init();
});