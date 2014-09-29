var expect = require("chai").expect;

describe('Mongoose Schemas', function(){
  	describe('Table', function(){
    	it('should have an ID', function(){
      		expect(-1).to.equal([1,2,3].indexOf(5));
    	});
  	});
  	describe('Entry', function(){
    	it('should return -1 when the value is not present', function(){
      		expect(-1).to.equal([1,2,3].indexOf(5));
    	});
  	});
  	describe('User', function(){
    	it('should return -1 when the value is not present', function(){
      		expect(-1).to.equal([1,2,3].indexOf(5));
    	});
  	});

});