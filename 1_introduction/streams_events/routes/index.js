var FlightSchema = require('../schemas/flight');

var Emitter = require('events').EventEmitter;
var flightEmitter = new Emitter();

flightEmitter.on('arrival', function(flight) {

  var record = new FlightSchema(flight.getInformation());

  record.save(function(err) {

    if(err) {

      console.log(err);

    };

  });

});

flightEmitter.on('arrival', function(flight) {
  
  console.log('Flight Arrived: ' + flight.data.number);

});

module.exports = function(flights) {
  var flight = require('../flight');

  for(var number in flights) {
    flights[number] = flight(flights[number]);
  }

  var functions = {};

  functions.flight = function(req, res) {
    var number = req.params.number;
    req.session.lastNumber = number;

    if(typeof flights[number] === undefined) {
      req.status(404).json({status: 'error'});
    } else {
      res.json(flights[number].getInformation());
    }
  };

  functions.arrived = function(req, res) {
    var number = req.params.number;

    if(typeof flights[number] === undefined) {
      req.status(404).json({status: 'error'});
    } else {
      flights[number].triggerArrive();

      flightEmitter.emit('arrival', flights[number]);
      res.json({ status: 'success' });
    }
  };

  functions.list = function(req, res) {
    res.render('list', {title: 'All Flights', flights: flights});
  };

  functions.arrivals = function(req, res) {
    FlightSchema.find().setOptions({
      sort: 'actualArrive'
    }).exec(function(err, arrivals) {
      if(err) {
        console.log(err);
        res.status(500).json({status: 'failure'});
      } else {
        res.render('arrivals', {
          title: 'Arrival', 
          arrivals: arrivals, 
          lastNumber: req.session.lastNumber
        });
      }
    });
  };

  functions.login = function(req, res) {
    res.render('login', {title: 'Login'});
  };

  functions.user = function(req, res) {
    if(!req.session.passport.user) {
      res.redirect('/login');
    } else {
      res.render('user', {title: 'Welcome!', user: req.user});
    }
  };

  return functions;
};
