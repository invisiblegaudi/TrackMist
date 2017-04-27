'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const sinon = require('sinon');
const mockMix = require('./_mock/blackestEverBlack.json');
const mockUser = require('./_mock/likedTracksUserLyingFlotus.json');

const api = require('../src/server/api');

describe('API', function(done) {

    chai.use(chaiHttp);
    
    it('should return a 404 error', function(done){

	chai.request(api.server)
	    .get('/')
	    .end(function(err, res) {
		res.should.have.status(404);
		api.server.close();
		done();                               
	    });	
    });    

    it('should give error for no user', function(done){
	chai.request(api.server)
	    .get('/mixcloud/user/')	
	    .end(function(err, res) {
		res.should.have.status(500);
		res.should.be.json;
		res.should.not.be.empty;
		api.server.close();
		done();
	    });
    });    

    
    it('should list 5 liked mixes for user lyingflotus', function(done){
	chai.request(api.server)
	    .get('/mixcloud/user/lyingflotus')	
	    .end(function(err, res) {
		res.should.have.status(200);
		res.should.be.json;
		res.should.not.be.empty;
		api.server.close();
		done();
	    });
    });    
});




