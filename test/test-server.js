var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');

var should = chai.should();
var app = server.app;
chai.use(chaiHttp);

describe("Testing if a number is prime or not", function() {
	it("Should return '5 is prime' for an input of 5", function(done) {
		chai.request(app)
			.post("/")
			.send({"number": "7"})
			.end(function(err, res) {
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				res.body.message.should.equal('5 is prime.');
				done();
			});
	});
	
	it("Should return 'Please enter a positive number' for an input of 5", function(done) {
		chai.request(app)
			.post("/")
			.send({"number": "-3"})
			.end(function(err, res) {
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				res.body.message.should.equal('Please enter a positive number.');
				done();
			});
	});
	
	it("Should return 'Please enter a correct number' for an input of ABC", function(done) {
		chai.request(app)
			.post("/")
			.send({"number": "ABC"})
			.end(function(err, res) {
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				res.body.message.should.equal('Please enter a correct number.');
				done();
			});
	});
});