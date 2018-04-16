var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();


//set up template engin
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));
//console.log('this works');

//fire controllers
todoController(app);

//listen to port
app.listen(process.env.PORT || 3000 , ()=>{console.log('all is okay')});
console.log('You are listening to port 3000');