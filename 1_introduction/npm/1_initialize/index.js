var http = require('http'),
express = require('express');

var app = express();

app.get('/', function(req, res) {
	res.end('Node fundamentals');
});

http.createServer(app).listen(3000);
