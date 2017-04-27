'use strict';
// TODO: run tests with:  mocha --require babel-polyfill --compilers js:babel-register
const http = require('http');

const MixCloud = require('../src/server/classes/mixcloud.js');

const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const mockMixResponse = require('./_mock/_response.json');
const mockUserResponse = require('./_mock/_user_likes_res.json');

describe('MixCloud getUserLikes', function(done) {
    before(function(){
	sinon
	    .stub(MixCloud.request, 'get')
	    .yields(null, mockUserResponse,mockUserResponse.body);
    });
    after(function(){
	MixCloud.request.get.restore();
    });
    it('should list 5 liked mixes for user lyingflotus', function(done){
	async function testUserLikes() {
	    let userLikes = await MixCloud.getUserLikes('lyingflotus');
	    userLikes.should.not.be.empty;
	    userLikes.length.should.equal(5);
	    done();
	}
	testUserLikes();
    });
 
});

describe('MixCloud getTrackList', function(done) {
    before(function(){
	sinon
	    .stub(MixCloud.request, 'get')
	    .yields(null, mockMixResponse, mockMixResponse.body);
    });
    after(function(){
	MixCloud.request.get.restore();
    });
    it('should list tracks for a given mix', function(done){
 	async function testTrackList() {
	    let userLikes = MixCloud.likedMixListPaths;
	    userLikes.should.be.a('array');
	    userLikes.should.not.be.empty;
	    userLikes.should.have.lengthOf(5);
 	    let trackList = await MixCloud.getTracklist(userLikes[1]);
	    trackList.should.be.a('array');
 	    trackList.should.not.be.empty;
	    trackList.should.have.lengthOf(16);
 	    done();			    
 	}
 	testTrackList();
    });    
    
});


describe('MixCloud getUserTracksLiked', function(done) {
    before(function(){
	sinon
	    .stub(MixCloud.request, 'get')
	    .yields(null, mockMixResponse, mockMixResponse.body);
    });
    after(function(){
	MixCloud.request.get.restore();
    });
    it('should list tracks for the mixes for user lyingfltous', function(done){
 	async function testUserTracksLiked() {
 	    let result = await MixCloud.getUserTracksLiked('lyingflotus');
	    result.map(mix=>{
		mix.tracklist.should.be.a('array');
		mix.tracklist.should.not.be.empty;
		mix.tracklist.should.be.length(16);
	    });	    
 	    done();			    
 	}
 	testUserTracksLiked();
    });    
    
});
