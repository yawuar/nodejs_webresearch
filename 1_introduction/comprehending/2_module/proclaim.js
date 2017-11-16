var whisper = function(message) {
	console.log('proclaiming: ' + message);
};

// give whisper another function name => use exports
exports.softly = whisper;

exports.loudly = function(message) {
	console.log('PROCLAIMING: ' + message);
}