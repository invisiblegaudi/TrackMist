'use strict';

const request = require('request');
const http = require('http');

const location = {
    protocol: 'https:',
    hostname: 'www.mixcloud.com',
    pathname: '/BBCEssentialMix/helena-hauff-essential-mix-25022017/'
    };

    request({
        "uri": "/player/details",
        "baseUrl": location.protocol + "//" + location.hostname,
        "qs": { "key": location.pathname },
        "json": true
    }, (error, response, data) => {
        if (!error && response.statusCode === 200 && data.cloudcast.sections.length > 0) {
            data.cloudcast.sections.forEach((track)=>{
		console.log(track.artist,track.title);
	    })
        } else {
            throw new Error(error);
        }
    });
