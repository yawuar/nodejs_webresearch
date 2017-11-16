var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	address: String
});

// create a model
var User = mongoose.model('User', userSchema);


// root homepage
router.get('/', function(req, res) {
	User.find({}, function(err, data) {
		if(err) console.log(err);
		res.render('', {users: data})
	});
});

router.get('/user/:id', function(req, res) {
	User.findById(req.params.id, function(err, data) {
		if(err) console.log(err);
		res.json(data);
	});
});

router.post('/user', function(req, res) {
	var newUser = User(req.body).save(function(err, data) {
		if(err) console.log(err);
		res.json(data);
	});
});

router.put('/user/:id', function(req, res) {
	console.log('id = ' + req.params.id);
	var editUser = User.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data) {
		if(err) console.log(err);
		res.json(data);
	});
});

router.delete('/user/:id', function(req, res) {
	User.find({ _id: req.params.id}).remove().exec();
});

module.exports = router;
