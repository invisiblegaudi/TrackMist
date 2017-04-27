'use strict';

/*
   
   TrackMist API
   @author john@invisiblearchitects.com

 */

const config = require('./config');
const MixCloud = require('./classes/mixcloud');

const express = require('express');
const api = express();

api.get('/mixcloud/user/:user?',

	async function mixcloudUser(req,res){
	    
	    /*
	       request for MixCloud User Data
	       return data for front end
	       @param {string} req - http request
	       @param {string} req.params.user - mixcloud user
	     */
	    
	    try {
		
		if(!req.params.user) throw new Error('no username specified');
		let tracks = await MixCloud.getUserTracksLiked(req.params.user);
		return res.json(tracks);
	    } catch(e) {
		return res.status(e.statusCode || 500).json(e);
	    }
	});

api.all('/',

        function defaultResponse(req,res){

            /*
              Default response if call not handled
              @author john@invsiblearchitects.com
            */

            return res.status(404).send('Not Found :/');

	});

const server = api.listen(config.TCP1,()=>{
    console.log(`TrackMist REST API started @port:${config.TCP1}`);
    if(config.TCP1===undefined) {
        error('no port defined!!');
    }

    if(process.env.test === 'true') setTimeout(test(api),0);
});

module.exports = {server,MixCloud}
