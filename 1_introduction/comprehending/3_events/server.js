// require HTTP
var http = require('http');

// request & response HTTP
var handleRequest = function(req, res) {
	// response is plain text not HTML
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Welcome to Node Training\n');
}

// variable server creates a server
var server = http.createServer(handleRequest);

// server needs to listen on port 3000 localhost => listen = event
server.listen(3000, 'localhost');