var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://test:test@ds157158.mlab.com:57158/tododb');

//create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

//model
var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'walk the dog'}, {item: 'kick some ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false });

module.exports = function(app){

    app.get('/', function(req, res){
        //get data from mongodb and pss it to the view
        Todo.find({}, function(err, data){
            if(err) throw err;
        res.render('todo.ejs', {todos: data});
    });
});

    app.post('/', urlencodedParser, function(req, res){
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/:item', function(req, res){
        //delete requested item form mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
};