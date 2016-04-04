var supertest = require("supertest");
var assert = require("assert");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE unit test",function(){

  // #1 should return home page

  it("should return product",function(done){

    // calling home page api
    server
    .get("/product")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      assert.equal(res.status,200);
      // Error key should be false.
      assert.equal(res.body.error,undefined);
      done();
    });
  });

});