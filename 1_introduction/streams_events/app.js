module.exports = function(flights, db) {

  var express = require('express');
  var session = require('express-session');
  var MongoStore = require('connect-mongo')(session);
  var passport = require('./auth');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

  var routes = require('./routes')(flights);

  var app = express();

  // view engine setup
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(function(req, res, next) {
    res.set('X-Powered-By', 'Flights Tracker');
    next();
  });
  app.use(cookieParser());
  app.use(session({
    secret: 'randomSecretKey',
    store: new MongoStore({
      mongooseConnection: db
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/flight/:number', routes.flight);
  app.put('/flight/:number/arrived', routes.arrived);
  app.get('/list', routes.list);
  app.get('/arrivals', routes.arrivals);
  
  app.get('/login', routes.login);
  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/user'
  }));
  app.get('/user', routes.user);
  

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  return app;
};
