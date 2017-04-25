'use strict';

const request = require('request');

class MixCloud {

    constructor(){
	this.settings = {
	    baseUrl: 'https://api.mixcloud.com',
	    json:true
	};
	this.request = request;
	
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
		this.request(this.settings,(error, response, data) => {
		    if (!error && data && data.error === undefined && response.statusCode === 200) {
			resolve(data);
		    }
		    else {
			let err = new Error('Error retrieving likes from Mixcloud user: '+user);
			if(data !== undefined && data.error !== undefined)
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
		this.request(this.settings,(error, response, data) => {
		    if (!error && response.statusCode === 200 && data.cloudcast.sections.length > 0) {
			resolve(data.cloudcast.sections);
		    }
		    else {
			let err = new Error('Error retrieving Tracklist from Mixcloud');
			err.requestError = error;
			err.statusCode = response.statusCode !== undefined ? response.statusCode : null;
			err.dataLength = data.cloudcast !==undefined && data.cloudcast.sections!==undefined ? data.cloudcast.sections.length : 0;
			reject(err);
		    }
		});
	    }
	    catch(e) {
		reject(e);		
	    }
	});
    }

}

module.exports = new MixCloud();
