'use strict';

const request = require('request');

const mcSettings = {
    baseUrl: 'https://www.mixcloud.com',
    json: true
};	

const mcApiSettings = {
    baseUrl: 'https://api.mixcloud.com',
    json: true
};	


function getUserLikes(user) {
/* 
 *  Get tracklist for mix
 *  @author john@invisiblearchitects.com
 *  @param{string} user - mixcloud username
*/
    return new Promise((resolve,reject) => {
	mcApiSettings.uri = '/'+user+'/favorites/';
	try {
	    request(mcApiSettings,(error, response, data) => {	    
		if (!error && data.error === undefined && response.statusCode === 200) {
		    resolve(data);
		}
		else {
		    let err = new Error('Error retrieving likes from Mixcloud user: '+user);
		    err.requestError = data.error;
		    reject(err);
		}	    
	    });
	} catch(e) {
	    reject(e);		
	}	
    });
}

function getTracklist(mixPath){

/* 
 *  Get tracklist for mix
 *  @author john@invisiblearchitects.com
 *  @param{string} mixPath - unique path to mix in mixcloud url
*/
   
    mcSettings.uri = '/player/details';
    mcSettings.qs = {'key': mixPath };
    
    return new Promise((resolve,reject) => {
	try {
	    request(mcSettings,(error, response, data) => {
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

 async function rip() {
      try{
  	var likedMixList = await getUserLikes('lyingflotus');
  	for(let i=0; i<likedMixList.data.length; i++){
  	    let likedTrackList = await getTracklist(likedMixList.data[i].key);
  	    console.log(likedMixList.data[i].user.name,likedMixList.data[i].name);
  	    console.log(likedTrackList);
  	}
      } catch(e) {
  	console.log(e);
  	['message','requestError','statusCode','dataLength'].map(errData=>{
  	    if(e[errData] !== undefined){	    
  		console.log('MixCloud',errData,e[errData]);
  	}});
      }
  
  
  };
  
  rip();
