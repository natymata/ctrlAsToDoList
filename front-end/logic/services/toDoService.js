angular.module('toDoList.services')
.factory('toDoService', function(localStorageService) {

	var savedList= [
		{
			id: 1, text: 'Empezar a programar', description: 'Volver a aprender a programae angular',  deadline: 'Nov 15 2016', done: true, state: 'Completed'
		},
		{
			id: 2, text: 'Hacer la tarea', description:'Hacer las tareas de la casa', deadline: 'Nov 25 2016', done: false, state: "Pending"
		},
		{
			id: 3, text: 'Practicar angularJS', description:'Hacer un To Do List y un Banck Account', deadline: 'Nov 18 2016', done: false, state: "Pending"
		}
	];

	//Set an initial list or get the to do list.
	var listInit= function() {
		return localStorageService.getOrSetArray('toDoList', savedList);
	};

	//get the complete to do list
	var getAll= function() {
		var list= localStorageService.getAll('toDoList');
		angular.forEach(list, function(todo) {
			var date= todo.deadline;
			date= new Date();
			todo.deadline= date;
		});

		return list;
	};

	//add a new to do
	var addToDo= function(newToDo) {
		newToDo.id= setId();
		var toDoArray= localStorageService.getAll('toDoList');
		toDoArray.push(newToDo);
		localStorageService.set('toDoList', toDoArray);
		return toDoArray;
	};

	//set an id for each new to do
	var setId= function(){
		var date= new Date();
		return date.getTime();
	};

	//update done states
	var updateDone= function(toDo, list) {
		if(toDo.done){
			toDo.state="Completed";
			toDo.done= true;
		}else{
			toDo.state= "Pending";
			toDo.done= false;
		};
		localStorageService.remove('toDoList');
		localStorageService.set('toDoList', list);
		return getAll();
	};

	//count pending to dos
	var pending= function() {	
		var pending= getAll().filter(function(item) {
			return !item.done;
		});
		return pending.length;
	};

	//clear all doen items
	var clearDone= function() {
		var allToDos= getAll();
		var	finalToDoList=[];

		angular.forEach(allToDos, function(todo) {
			if(!todo.done){
				finalToDoList.push(todo);
			};
		});

		localStorageService.set('toDoList', finalToDoList);
		return finalToDoList;
	};

	var removeToDo= function(id) {
		var allToDos= localStorageService.getAll('toDoList');
		allToDos= allToDos.filter(function(item) {
			return item.id!=id;
		});
		localStorageService.set('toDoList', allToDos);
		return allToDos;
	};

	var clearAll= function() {
		localStorageService.set('toDoList', []);
		return localStorageService.getAll('toDoList');
	};

	var getSelectedToDo= function(id) {
		var array= getAll().filter(function(item) {
			return item.id== id;
		});
		return array[0];
	};

	//access
	return{
		getAll:getAll,
		addToDo:addToDo,
		clearDone:clearDone,
		removeToDo:removeToDo,
		clearAll:clearAll,
		listInit:listInit,
		updateDone:updateDone,
		pending:pending,
		getSelectedToDo:getSelectedToDo
	};


}); //end --factory--


