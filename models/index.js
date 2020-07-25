var mongoose = require("mongoose");//connecting to mongoose
mongoose.set('debug', true); // allows us to see if something went wrong upon sending any data to the DB
mongoose.connect('mongodb://localhost/todo-api');//connecting to the DB


//this will allow us to use the promise syntex!
mongoose.Promise = Promise;


module.exports.Todo = require("./todo");