var caching = require('./3_creational');

var pdxlax = {
	number: 847,
	origin: 'PDX',
	destination: 'LAX'
};

var ca = caching(pdxlax);

ca.triggerDepart();

console.log(ca.getInformation());

var ausdca = {
	number: 382,
	origin: 'AUS',
	destination: 'DCA'
};

var cac = caching(ausdca);

console.log(cac.getInformation());

console.log(ca.getInformation());