var supertest = require('supertest');
var assert = require('assert');
var port = process.env.PORT || 3000;

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:' + port);

// Product Unit Test
describe('Product Unit Test', function() {

    it('Find All Products', function(done) {
        server
            .get('/product')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                done();
            });
    });

    it('Insert Tuxedo Product', function(done) {
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
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Insert Successful
                assert.equal(res.body.ok, 1);
                assert.equal(res.body.n, 1);
                done();
            });
    });
    
    it('Update Tuxedo Price', function(done) {
        server
            .put('/product/name/Tuxedo')
            .send({
                "name": "Tuxedo",
                "price": 4050000,
                "parent": "Top Wear"
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Update Successful
                assert.equal(res.body.ok, 1);
                assert.equal(res.body.nModified, 1);
                assert.equal(res.body.n, 1);
                done();
            });
    });

    it('Find Tuxedo Product', function(done) {
        server
            .get('/product/name/Tuxedo')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "Tuxedo");
                assert.equal(res.body.price, 4050000);
                assert.equal(res.body.parent, "Top Wear");
                done();
            });
    });
    
    it('Delete Tuxedo Product', function(done) {
        server
            .delete('/product/name/Tuxedo')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Delete Successful
                assert.equal(res.body.ok, 1);
                assert.equal(res.body.n, 1);
                done();
            });
    });

});