// initialize local variables
var number, origin, destination;

// setter
exports.setNumber = function(num) {
	number = num;
};

// setter
exports.setOrigin = function(o) {
	origin = o;
};

// setter
exports.setDestination = function(d) {
	destination = d;
};

exports.getInfo = function() {
	return {
		number: number,
		origin: origin,
		destination: destination
	};
};