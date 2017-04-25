'use strict';
// TODO: run tests with:  mocha --require babel-polyfill --compilers js:babel-register
const http = require('http');

const MixCloud = require('../src/server/mixcloud.js');

const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const mockMix = require('./_mock/blackestEverBlack.json');
const mockUser = require('./_mock/likedTracksUserLyingFlotus.json');

describe('MixCloud', function(done) {
    before(function(){
	sinon
	    .stub(MixCloud.request, 'get')
	    .yields(null, null, JSON.stringify(mockUser));
    });
    after(function(){
	MixCloud.request.get.restore();
    });
    it('should list 5 liked mixes for user lyingflotus', function(done){
	async function testUserLikes() {
	    let result = await MixCloud.getUserLikes('lyingflotus');
	    result.data.should.not.be.empty;
	    result.data.length.should.equal(5);
	    done();
	}
	testUserLikes();
    });    
});


