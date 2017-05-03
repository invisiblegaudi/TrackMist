import request from 'request';
import React, { Component } from 'react';
import Login from '../Login/Login';

/* 
 *  Login Panel for MixCloud credentials
 *  @author john@invisiblearchitects.com
 * 
*/

class MixCloudLogin extends Component {
    
    login = (username) => {
	request(`${window.location.protocol}//${window.location.hostname}:5050/mixcloud/user/${username}`,(err,res,body)=>{
	    this.props.sendData(JSON.parse(body))
	    if(err) {
		this.props.showMessage('Error connecting to TrackMist API')
	    } else {
		if(body.length>0) {
		    this.props.showMessage(`${username}, you liked these tracks on MixCloud` )
		} else {
		    this.props.showMessage('Sorry, this user has no data')
		}
	    }
	});
    }
	
    render(){
	return (
	    <Login id="mixcloud" title="Import MixCloud User Data" passedValidation={this.login} />
	);
    };
}

export default MixCloudLogin;
