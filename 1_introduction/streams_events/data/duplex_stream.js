var net = require('net'),
	fs = require('fs');

var server = net.createServer(function(connect) {
	var log = fs.createWriteStream('hfi.log');

	console.log('Connection established');

	connect.on('end', function() {
		console.log('Connection ended');
	});

	connect.write('Welcome to heathrow Flight Information');
	connect.write('We call it HFI: the Heathrow Flight Information');
	connect.write('Well get your message and display it on the board to passengers');

	connect.pipe(connect).pipe(log);
});

server.listen(7777, function() {
	console.log('server ready on port 7777');
});