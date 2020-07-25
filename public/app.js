// $(document).ready is a jQuery function that any code would wait to run until the DOM is ready
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    
    $('#todoInput').keypress(function(event){
        //13 is the value of the Enter button
      if(event.which == 13) {
          //create todo
        createTodo();
      }
    });
    
    $('.list').on('click', 'li', function(){
        //this referes to the li that we clicked
      updateTodo($(this));
    })
    //add the 'span' so when we only want the click listener activates on the span it self!
    $('.list').on('click', 'span', function(e){
        //when we click the span, it wont trigger the parent toggle function for the (li)
      e.stopPropagation();
      removeTodo($(this).parent());
    })
  });
  
  function addTodos(todos) {
    //add todos to page here
    todos.forEach(function(todo){
      addTodo(todo);
    });
  }
  
  function addTodo(todo){
    var newTodo = $('<li class="task">'+todo.name +' <span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed){
      newTodo.addClass("done");
    }
    //appending to the page
    $('.list').append(newTodo);
  }
  
  function createTodo(){
    //send request to create new todo
    //the input would assigned as an empty string after adding the todos
    var usrInput = $('#todoInput').val();
    $.post('/api/todos',{name: usrInput})
    .then(function(newTodo){
      $('#todoInput').val('');
      addTodo(newTodo);
    })
    .catch(function(err){
      console.log(err);
    })
  }
  
  function removeTodo(todo){
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId; 
    $.ajax({
      method: 'DELETE',
      url: deleteUrl
    })
    .then(function(data){
      todo.remove();
    })
    .catch(function(err){
      console.log(err);
    })
  }
  
  function updateTodo(todo){
    var updateUrl = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone}
     //send the request to change the status on the server using the API
    $.ajax({
      method: 'PUT',
      url: updateUrl,
      data: updateData
    })
     // updating the todo after the above request is done
    .then(function(updatedTodo){
      todo.toggleClass("done");
      todo.data('completed', isDone);
    })
  }