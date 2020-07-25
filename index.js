var express = require('express');
var app = express();
var bodyParser = require('body-parser');



//Importing Routes
var todoRoutes = require('./routes/todos'); 

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));



app.get('/', function(req, res){
    // res.send("HELLO FROM ROOT ROUTE!!!");
    res.sendFile("index.html"); 
});

//prefix
app.use('/api/todos', todoRoutes);





//Tell Express to listen for requests (start server).
app.listen(3000,function(){
    console.log("Server Started!!!");
    });