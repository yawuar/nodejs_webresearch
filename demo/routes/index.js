var express = require('express');
var router = express.Router();
// require mongoose
// var mongoose = require('mongoose');

// mongoose.connect('mongodb://yawuar:test123@ds111876.mlab.com:11876/project');

// module.exports = mongoose.connection;

// var userSchema = new mongoose.Schema({
// 	firstname: String,
// 	lastname: String,
// 	address: String
// });

// create a model
// var User = mongoose.model('User', userSchema);

/* GET home page. */
router.get('/', function(req, res) {
 //  	User.find({}, function(err, data) {
	// 	if(err) console.log(err);
	// 	res.render('index', {users: data})
	// });
});

module.exports = router;
