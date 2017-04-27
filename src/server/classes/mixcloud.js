'use strict';

const request = require('request');

class MixCloud {

    /*
       MixCloud API and non-API call handler
       @property {object} settings - a settings for the current api call
       @property {array} likedTrackList - compilation of tracks liked by user 
       @property {array} likedMixList - list of mixes liked by user
       @property {array} likedMixListPaths - paths of mixes liked by user
       @property {object} request - expose request @link{https://www.npmjs.com/package/request} to outside for mocking
       @requires module:https://www.npmjs.com/package/request
     */
    
    constructor(){
	this.settings = {
	    baseUrl: 'https://api.mixcloud.com',
	    json:true
	};
	this.likedTrackList = []; // compilation of tracks liked by user 
	this.likedMixList = []; // list of mixes liked by user
	this.likedMixListPaths = []; // paths of mixes liked by user
	this.request = request; // expose request to outside for mocking
  		
    }
        
    getUserLikes(user) {
	/* 
	 *  Get tracklist for mix
	 *  @author john@invisiblearchitects.com
	 *  @param{string} user - mixcloud username
	 */
	return new Promise((resolve,reject) => {
	    this.settings.uri = '/'+user+'/favorites/';
	    try {
		this.request.get(this.settings,(error, response, body) => {
		    /* const fs = require('fs');
 		       fs.writeFile('_user_likes_res.json', JSON.stringify(response), (err) => {
		       if (err) throw err;
		       console.log('The file has been saved!');
		       });
		       fs.writeFile('_user_likes_data.json',JSON.stringify(data), (err) => {
		       if (err) throw err;
		       console.log('The file has been saved!');
		       });
		       console.log(data);*/
		    if (!error) {
			this.likedMixList = body.data;
			this.likedMixListPaths = body.data.map(mix=>{return mix.key});
			resolve(body.data);
		    }
		    else {
			let err = new Error('Error retrieving likes from Mixcloud user: '+user);
			if(body !== undefined && body.error !== undefined)
			    err.requestError = data.error;
			reject(err);
		    }	    
		});
	    } catch(e) {
		reject(e);		
	    }	
	});
    }

    getTracklist(mixPath){
	/* 
	 *  Get tracklist for mix
	 *  @author john@invisiblearchitects.com
	 *  @param{string} mixPath - unique path to mix in mixcloud url
	 */
	this.settings.baseUrl = 'https://www.mixcloud.com';
	this.settings.uri = '/player/details';
	this.settings.qs = {'key': mixPath };
	return new Promise((resolve,reject) => {
	    try {
		this.request.get(this.settings,(error, response, data) => {		    
		    if (!error && response.statusCode === 200 && data.cloudcast.sections.length > 0) {
			resolve(data.cloudcast.sections);
		    }
		    else {
			let err = new Error('Error retrieving Tracklist from Mixcloud');
			err.requestError = error;
			err.statusCode = response.statusCode !== undefined ? response.statusCode : null;
			err.dataLength = data.cloudcast !== undefined && data.cloudcast.sections!==undefined ? data.cloudcast.sections.length : 0;
			reject(err);
		    }
		});
	    }
	    catch(e) {
		reject(e);		
	    }
	});
    }

    async getUserTracksLiked(user) {
	/* returns list of mixes liked by user with tracks
	   @param {string} - user
	   @returns {Object} - Mix and tracks list
	 */	
	try{
  	    for(let i=0; i<this.likedMixList.length; i++){
		this.likedTrackList = await this.getTracklist(this.likedMixList[i].key);
		this.likedMixList[i].user.name,this.likedMixList[i].name;
  		this.likedMixList[i].tracklist = this.likedTrackList;
  	    }
	    return this.likedMixList;
	} catch(e) {
	    console.log(e);
  	    ['message','requestError','statusCode','dataLength'].map(errData=>{
  		if(e[errData] !== undefined){	    
  		    console.log('MixCloud ',errData,e[errData]);
  		}
	    });
	}	
	
    };

    
}

module.exports = new MixCloud();
