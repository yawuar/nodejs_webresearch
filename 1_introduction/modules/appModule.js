var createModule = require('./1_create_module');

createModule.setOrigin('Kensington');
createModule.setDestination('London');
createModule.setNumber(356);

console.log(createModule.getInfo());