// require the express package
var express = require('express');
// require the controller
var todoController = require('./controllers/todoController');

// set up express app
var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
// localhost:3000/assets/styles.css instead of entering the public folder
app.use(express.static('./public'));

// fire controllers
todoController(app);

// listen to port
app.listen(3000);
console.log('You are listening to port 3000');