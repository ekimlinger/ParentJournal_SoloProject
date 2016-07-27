var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

var app = require('../server/app.js');

describe('Parent Journal', function() {
    describe('Routes', function() {
        describe('User', function() {
            describe('Register', function() {
                it('should save without error', function() {
                    app.post("/register/", {firstname: "Parent", lastname: "Journal", username: "parentjournals@gmail.com", password: "testing1234"});
                });
            });
        });
        //More routes here
    });
    describe('Array', function() {
      describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
          [1,2,3].indexOf(5).should.equal(-1);
          [1,2,3].indexOf(0).should.equal(-1);
        });
      });
    });
});
