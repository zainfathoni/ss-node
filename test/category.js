var supertest = require('supertest');
var assert = require('assert');
var port = process.env.PORT || 3000;

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:' + port);

// Category Unit Test
describe('Category Unit Test', function() {

    it('Find All Categories', function(done) {
        server
            .get('/category')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                done();
            });
    });

    it('Insert Underwear Category with no parent', function(done) {
        server
            .post('/category')
            .send({
                "name" : "Underwear",
                "parent" : null
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
    
    it('Update Underwear Category to "Bottom Wear" parent', function(done) {
        server
            .put('/category/name/Underwear')
            .send({
                "name" : "Underwear",
                "parent" : "Bottom Wear"
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

    it('Find Underwear Category', function(done) {
        server
            .get('/category/name/Underwear')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.status, 200);      // HTTP status 200
                assert.equal(res.body.error, undefined);    // No Error
                // Category Found
                assert.equal(res.body.name, "Underwear");
                assert.equal(res.body.parent, "Bottom Wear");
                done();
            });
    });
    
    it('Delete Underwear Category', function(done) {
        server
            .delete('/category/name/Underwear')
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