var supertest = require('supertest');
var assert = require('assert');
var port = process.env.PORT || 3000;

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:' + port);

// Product Unit Test
describe('Product Unit Test', function() {
    
    // #1 Find All Products
    it('should return all products', function(done) {
        server
            .get('/product')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                // HTTP status should be 200
                assert.equal(res.status, 200);
                // Error key should be false.
                assert.equal(res.body.error, undefined);
                done();
            });
    });

    // #2 Insert Tuxedo Product
    it('should insert tuxedo product', function(done) {
        server
            .post('/product')
            .send({
                "name": "Tuxedo",
                "price": 2050000,
                "parent": "Top Wear"
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                // HTTP status should be 200
                assert.equal(res.status, 200);
                // Error key should be false.
                assert.equal(res.body.error, undefined);
                assert.equal(res.body.ok, 0);
                assert.equal(res.body.n, 0);
                done();
            });
    });


});