var supertest = require('supertest');
var assert = require('assert');
var port = process.env.PORT || 3000;

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:' + port);

// Complex Logic Test
describe('Complex Logic Test - Add', function() {

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
    
    it('Delete ABC Product\n', function(done) {
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
    
    it('Find A Category, parent should be null\n', function(done) {
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
    
    it('Find ABC Product, parent should be A\n', function(done) {
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
    
    it('Insert XYZ Product into an existing X Category', function(done) {
        server
            .post('/product')
            .send({
                "name": "XYZ",
                "price": 220000,
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
    
    it('Find XYZ Product, parent should be X\n', function(done) {
        server
            .get('/product/name/XYZ')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "XYZ");
                assert.equal(res.body.price, 220000);
                assert.equal(res.body.parent, "X");
                done();
            });
    });
    
});

describe('Complex Logic Test - Update', function() {
    
   it('Update X Category Name into Y', function(done) {
        server
            .put('/category/name/X')
            .send({
                "name": "Y",
                "parent": "A"
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
    
    it('Find Y Category, should be under parent A', function(done) {
        server
            .get('/category/name/Y')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "Y");
                assert.equal(res.body.parent, "A");
                done();
            });
    });
    
    it('Find XYZ Product, should be under parent Y\n', function(done) {
        server
            .get('/product/name/XYZ')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "XYZ");
                assert.equal(res.body.price, 220000);
                assert.equal(res.body.parent, "Y");
                done();
            });
    });
    
    it('Update XYZ Product parent into A', function(done) {
        server
            .put('/product/name/XYZ')
            .send({
                "name": "XYZ",
                "price": 220000,
                "parent": "A"
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
    
    it('Find XYZ Product, should be under parent A\n', function(done) {
        server
            .get('/product/name/XYZ')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "XYZ");
                assert.equal(res.body.price, 220000);
                assert.equal(res.body.parent, "A");
                done();
            });
    });
    
    it('Update XYZ Product parent into Y', function(done) {
        server
            .put('/product/name/XYZ')
            .send({
                "name": "XYZ",
                "price": 220000,
                "parent": "Y"
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
    
    it('Find XYZ Product, should be under parent Y\n', function(done) {
        server
            .get('/product/name/XYZ')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "XYZ");
                assert.equal(res.body.price, 220000);
                assert.equal(res.body.parent, "Y");
                done();
            });
    });
    
    it('Update Y Category parent into null', function(done) {
        server
            .put('/category/name/Y')
            .send({
                "name": "Y",
                "parent": null
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
    
    it('Find Y Category, should be under parent null', function(done) {
        server
            .get('/category/name/Y')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "Y");
                assert.equal(res.body.parent, null);
                done();
            });
    });
    
    it('Find XYZ Product, should be under parent Y\n', function(done) {
        server
            .get('/product/name/XYZ')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "XYZ");
                assert.equal(res.body.price, 220000);
                assert.equal(res.body.parent, "Y");
                done();
            });
    });
    
    // Clean Up Mess
    
    it('Update Y Category Name into X', function(done) {
        server
            .put('/category/name/Y')
            .send({
                "name": "X",
                "parent": "A"
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
    
    it('Find XYZ Product, should be under parent X\n', function(done) {
        server
            .get('/product/name/XYZ')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "XYZ");
                assert.equal(res.body.price, 220000);
                assert.equal(res.body.parent, "X");
                done();
            });
    });
        
});

describe('Complex Logic Test - Delete', function() {
    
    it('Delete A Category, so X Category & ABC Product will lose their parent', function(done) {
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
    
    it('Find X Category, parent should be null\n', function(done) {
        server
            .get('/category/name/X')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Product Found
                assert.equal(res.body.name, "X");
                assert.equal(res.body.parent, null);
                done();
            });
    });
    
    // Clean Up Mess
    
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
    
    it('Delete XYZ Product', function(done) {
        server
            .delete('/product/name/XYZ')
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
    
    it('Delete X Category', function(done) {
        server
            .delete('/category/name/X')
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