var supertest = require('supertest');
var assert = require('assert');
var port = process.env.PORT || 3000;

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:' + port);

// Complex Logic Test
describe('Complex Logic Test', function() {

    it('Insert ABC Product into a non-existing A Category', function(done) {
        server
            .post('/product')
            .send({
                "name": "ABC",
                "price": 110000,
                "parent": "A"
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
    
    it('Find ABC Product, parent should be null', function(done) {
        server
            .get('/product/name/ABC')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "ABC");
                assert.equal(res.body.price, 110000);
                assert.equal(res.body.parent, null);
                done();
            });
    });
    
    it('Delete ABC Product', function(done) {
        server
            .delete('/product/name/ABC')
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
    
    it('Insert A Category into a non-existing X Category', function(done) {
        server
            .post('/category')
            .send({
                "name": "A",
                "parent": "X"
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
    
    it('Find A Category, parent should be null', function(done) {
        server
            .get('/category/name/A')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "A");
                assert.equal(res.body.parent, null);
                done();
            });
    });
    
    it('Insert ABC Product into an existing A Category', function(done) {
        server
            .post('/product')
            .send({
                "name": "ABC",
                "price": 110000,
                "parent": "A"
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
    
    it('Find ABC Product, parent should be A', function(done) {
        server
            .get('/product/name/ABC')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "ABC");
                assert.equal(res.body.price, 110000);
                assert.equal(res.body.parent, "A");
                done();
            });
    });
    
    it('Insert X Category into an existing A Category', function(done) {
        server
            .post('/category')
            .send({
                "name": "X",
                "parent": "A"
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
    
    it('Find X Category, parent should be A', function(done) {
        server
            .get('/category/name/X')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "X");
                assert.equal(res.body.parent, "A");
                done();
            });
    });
    
    // CLEAN UP
    it('Delete ABC Product', function(done) {
        server
            .delete('/product/name/ABC')
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
    
    it('Delete A Category', function(done) {
        server
            .delete('/category/name/A')
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