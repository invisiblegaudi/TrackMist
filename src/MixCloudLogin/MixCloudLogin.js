import React, { Component } from 'react';
import Login from '../Login/Login';

/* 
 *  Login Panel for MixCloud credentials
 *  @author john@invisiblearchitects.com
 * 
*/

class MixCloudLogin extends Component {
    
    constructor(props) {
	super(props);
    }

    login() {
	// send user to backend
    }
    
    render(){
	return (
	    <Login title="Import MixCloud User Data" passedValidation={()=>{this.login()}} />
	);
    };
}

export default MixCloudLogin;
