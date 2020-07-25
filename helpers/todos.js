var db = require('../models');

exports.getTodos = function(req,res){
    // res.send("HELLO FROM TODOS ROUTES!!!");
    //find all the Todos 
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createTodo = function(req,res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.getTodo = function(req,res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.updateTodo = function(req,res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true}) //for updating we need 2 values to pass, req.body is the updated data from the post request. the data is updated in the DB but not showing, so we use {new: true} 
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
  }

  exports.deleteTodo = function(req, res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: "Todo Deleted!"})
    })
    .catch(function(err){
        res.send(err);
    })
}

module.exports = exports;
