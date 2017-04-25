'use strict';

const http = require('http');

const MixCloud = require('../src/server/mixcloud.js');

const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const mockMix = require('./_mock/blackestEverBlack.json');
const mockUser = require('./_mock/likedTracksUserLyingFlotus.json');

const mockData = rawJSON => {

    /*
       Tiny utility fn for saving JSON data for mocking
     */

    const fs = require('fs');
    const util = require('util');
    
    fs.writeFile('./'+likedMixList.data[i].name+'.json', JSON.stringify(util.inspect(rawJSON)) , 'utf-8', function(err) {
	if(err) {
	    return console.log(err);
	}

    }); 

    
}

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


