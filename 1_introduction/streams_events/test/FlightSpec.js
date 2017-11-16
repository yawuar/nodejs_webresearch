var app = require('./helpers/app');
var should = require('should'),
	supertest = require('supertest');

describe('flights', function() {
	it('it should return valid flight data for flight 1', function(done) {
		supertest(app)
			.get('/flight/1')
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				done();
			});
	});

	it('should return an error for invalid flight', function(done) {
		supertest(app)
			.get('/flight/999999999')
			.expect(500)
			.end(function(err, res) {
				res.status.should.equal(500);
				done();
			});
	});

	it('should mark a flight as arrived', function(done) {
		supertest(app)
			.put('/flight/1/arrived')
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.status.should.equal('arrived');
				
				supertest(app)
					.get('flight/1')
					.expect(200)
					.end(function(err, res) {
						res.status.should.equal(200);
						res.body.actualArrive.should.not.equal(undefined);
						done();
					});
			});
	});
});