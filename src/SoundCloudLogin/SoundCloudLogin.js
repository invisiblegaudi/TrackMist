import React, { Component } from 'react';
import styles from './SoundCloudLogin.css';

class SoundCloudLogin extends Component {

    constructor(props) {
	super(props);
	this.begun = false;
	this.state = { username: '', password: '', errors: []};	
	this.handleChange = this.handleChange.bind(this);
	this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(event) {
	let stateChange = {};
	this.begun = true;
	let error = this.state.errors.indexOf(event.target.name);
	if(event.target.value) {
	    if(error+1) this.state.errors.splice(error,1);
	} else {
	    if(!error+1) this.state.errors.push(event.target.name);	    
	}
	stateChange[event.target.name] = event.target.value;
	this.setState({...stateChange,...this.state});
    }

    handleLogin() {
	if(this.begun && !this.state.errors.length) {	    
	    console.log('login to soundcloud');	    	    
	}
    }
    
    render(){
	return (
	    <div className="SoundCloudLogin">
	    <p id="errors" className={this.state.errors.length ? 'show' : ''}>
	    Please correct field(s):</p>
	    <ul>{this.state.errors.map(function(field){
		return <li>{field}</li>;}
	    )}</ul>
	    <input className={this.state.errors.includes('username') ? 'error' : ''} name="username" ref="username" type="text" onChange={this.handleChange} placeholder="Username" />
	    <input className={this.state.errors.includes('password') ? 'error' : ''}  ref="password" name="password" type="password" onChange={this.handleChange} placeholder="password" />
	    <button onClick={this.handleLogin}>Login to SoundCloud</button>
	    </div>
	);
    }
}

export default SoundCloudLogin;
