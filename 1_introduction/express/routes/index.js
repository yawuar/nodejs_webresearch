var express = require('express');
var router = express.Router();

var flights = require('../data');

var flight = require('../flight');

for(var number in flights) {
	flights[number] = flight(flights[number]);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('hallo');
});

router.get('/flight/:number', function(req, res, next) {
  var number = req.params.number;
  if(typeof flights[number] === undefined) {
  	req.status(404).json({status: 'error'});
  } else {
  	res.json(flights[number].getInformation());
  }
});

router.put('/flight/:number/arrived', function(req, res, next) {
  var number = req.params.number;
  if(typeof flights[number] === undefined) {
  	req.status(404).json({status: 'error'});
  } else {
  	flights[number].triggerArrive();
  	res.json({status: 'arrived'});
  }
});

router.get('/list', function(req, res, next) {
  res.render('list', {title: 'All Flights', flights: flights});
});

module.exports = router;
