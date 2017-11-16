var bodyParser = require('body-parser');

var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://yawuar:test123@ds163595.mlab.com:63595/web_research');

// create a schema - like a blueprint of data
var todoSchema = new mongoose.Schema({
	item: String
});

// create a model
var Todo = mongoose.model('Todo', todoSchema);

// dummy data
// var data = [
// 	{
// 		item: 'get milk'
// 	},
// 	{
// 		item: 'walk dog'
// 	},
// 	{
// 		item: 'kick some coding ass'
// 	}
// ];

// middleware
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});

module.exports = function(app) {

	// get requst for the urls
	app.get('/todo', function(req, res) {

		// get data from mongodb and pass it to the view
		// render the todo ejs & pass data as second argument

		Todo.find({}, function(err, data) {

			if(err) {

				throw err;

			}

			res.render('todo', {

				todos: data

			});

		});

	});

	// post request
	app.post('/todo', urlencodedParser, function(req, res) {

		// get data from view and add it to mongodb
		var newTodo = Todo(req.body).save(function(err, data) {

			if(err) {

				throw err;

			}

			res.json(data);

		});

	});

	// delete
	app.delete('/todo/:item', function(req, res) {
		
		// delete the request item from mongodb
		Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data) {
			
			if(err) {

				throw err;

			}

			res.json(data);
		});

	});

};