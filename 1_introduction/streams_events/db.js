var mongoose = require('mongoose');

mongoose.connect('mongodb://yawuar:test123@ds111066.mlab.com:11066/flights');

module.exports = mongoose.connection;