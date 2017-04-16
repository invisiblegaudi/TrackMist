'use strict';

const request = require('request');

const location = {
    protocol: 'https:',
    baseUrl: 'www.mixcloud.com'
};	


const getTracklist = function(mixPath){

    return new Promise((resolve,reject) => {
	
	request({
	    "uri": "/player/details",
	    "baseUrl": location.protocol + "//" + location.hostname,
	    "qs": { "key": mixPath },
	    "json": true
	}, (error, response, data) => {
	    if (!error && response.statusCode === 200 && data.cloudcast.sections.length > 0) {
		data.cloudcast.sections.forEach((track)=>{
		    tracklist.push({artist:track.artist,title:track.title});
 		}).then(()=>{
		   resolve(tracklist); 
		});
	    } else {
		reject(new Error(error));
	    }
	});
	
    });
}

(async () => {
    try {
	let tracklist = await getTracklist();
	console.log(tracklist);
    } catch(e) {
	console.log(error);
    }
});
