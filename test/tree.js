var supertest = require('supertest');
var assert = require('assert');
var port = process.env.PORT || 3000;

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:' + port);

// Tree Unit Test
describe('Tree Unit Test', function() {

    it('Get All Tree', function(done) {
        server
            .get('/tree')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                done();
            });
    });

    it('Get Tree under certain Category', function(done) {
        server
            .get('/tree/Top Wear')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                done();
            });
    });

});