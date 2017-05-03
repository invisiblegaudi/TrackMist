import config from './lastfm.config.json'
import qs from 'query-string'
import request from 'request'
import React, { Component } from 'react'

/* 
 *  Login Panel for LastFM credentials
 *  @author john@invisiblearchitects.com
 * 
 */

class LastFMLogin extends Component {

    constructor(props){
	super(props)
	this.style = {
	    // hide by default
	    hidden: { display: 'none' },
	    visible: { display: 'inline'}	    
	}
	const query = qs.parse(location.search)
	this.buttonText = 'Login to LastFM'
	this.isAuth = query.token !== undefined ? true : false
	this.buttonText = this.isAuth ? 'Add tracks to LastFM' : 'Login to LastFM'

    }

    action = () => {
	if(this.isAuth) {
	    this.scrobble()
	}
	else {
	    this.auth()	    
	}
    }
    
    auth() {
	let cb = location.origin
	location.href = `http://www.last.fm/api/auth/?api_key=${config.key}&cb=${cb}`
    }
    
    render(){
	return (
	    <div className="buttons">
	    <button style={this.style[this.props.display]} onClick={this.action}>{this.buttonText}</button>
	    </div>
	)
    }
    
}

export default LastFMLogin;
