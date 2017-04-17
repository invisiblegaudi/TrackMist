'use strict';

const request = require('request');

const mcSettings = {
    baseUrl: 'https://www.mixcloud.com',
    json: true
};	

 	
function getTracklist(mixPath){
    mcSettings.uri = '/player/details';
    mcSettings.qs = {'key': mixPath };
    
    return new Promise((resolve,reject) => {
	request(mcSettings,(error, response, data) => {
	    try {
		if (!error && response.statusCode === 200 && data.cloudcast.sections.length > 0) {
		    resolve(data);
		}
		else {
		    let err = new Error('Error retrieving Tracklist from Mixcloud');
		    err.requestError = error;
		    err.statusCode = response.statusCode;
		    err.dataLength = data.cloudcast !==undefined && data.cloudcast.sections!==undefined ? data.cloudcast.sections.length : 0;
		    reject(err);
		}	    
	    } catch(e) {
		reject(e);		
	    }
	});
    });
};

async function rip() {
    try{
	var data = await getTracklist('/BBCEssentialMix/helena-hauff-essential-mix-25022017/');
	console.log(data);
    } catch(e) {
	console.log('ERRRANU',e.requestError, e.statusCode, e.dataLength,e);		
    }
};

rip();
console.log('tracklist:');
