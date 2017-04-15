import React, { Component } from 'react';
import styles from './SoundCloudLogin.css';

/* 
 *  Login Panel for SoundCloud credentials
 *  @author john@invisibilearchitects.com
 * 
*/

class SoundCloudLogin extends Component {
    
    constructor(props) {
	super(props);
	this.state = {
	    username: '',
	    password: '',
	    errors: [ 'username','password' ],
	    showErrors: false
	};	
	this.handleChange = this.handleChange.bind(this);
	this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(event) {
	let stateChange = {};
	let error = this.state.errors.indexOf(event.target.name) >= 0 ? true : false; // field has error?
	if(event.target.value.length) { // field valid if field not empty
	    if(error) this.state.errors.splice(error,1); // remove error for that field
	} else {
	    if(!error) this.state.errors.push(event.target.name); // add error for that field
	}
	console.log(event.target.name,event.target.value);
	stateChange[event.target.name] = event.target.value; // update field value
	this.setState({...stateChange,...this.state}); // update state
    }

    handleLogin() {
	if(!this.state.errors.length) {
	    // TODO: call to backend
	    console.log('login to soundcloud');    
	} else {
	    this.setState({...this.state,...{showErrors: true}});
	}
    }
    
    render(){
	return (
	    <div className="SoundCloudLogin">
	    <div id="errors" className={ this.state.errors.length && this.state.showErrors ? 'show' : ''}>
	    <p>Please correct field(s):</p>
	    <ul id="errorList">{this.state.errors.map((field) => {
		return <li key={field.toString()}>{field}</li>;}
	    )}</ul>
	    </div>
	    <input className={this.state.errors.includes('username') ? 'error' : ''} name="username" ref="username" type="text" onChange={this.handleChange} placeholder="Username" />
	    <input className={this.state.errors.includes('password') ? 'error' : ''}  ref="password" name="password" type="password" onChange={this.handleChange} placeholder="password" />
	    <button onClick={this.handleLogin}>Login to SoundCloud</button>
	    </div>
	);
    }
}

export default SoundCloudLogin;
