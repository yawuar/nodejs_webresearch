var mongoose = require('mongoose');

mongoose.connect('mongodb://yawuar:test123@ds111876.mlab.com:11876/project');

module.exports = mongoose.connection;