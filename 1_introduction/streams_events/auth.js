var passport = require('passport');
	LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(username, password, done) {
		// connect to the db
		// pull up the username, password
		if(username === 'admin' && password === 'admin') {
			return done(null, {username: 'admin'});
		}

		return done(null, false);
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;