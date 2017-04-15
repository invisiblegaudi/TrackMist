import React, { Component } from 'react';

class SoundCloudLogin extends Component {

    constructor(props) {
	super(props);
	this.state = { username: ''};	

	this.handleChange = this.handleChange.bind(this);
	this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(event) {
	this.setState({username: event.target.value});
    }
    
    handleLogin() {
	console.log('login to soundcloud');
    }
    
    render(){
	return (
	    <div className="SoundCloudLogin">
	    <input className="username" type="text" value={this.state.username} />
	    <input className="password" type="password" />
	    <button onClick={this.handleLogin}>Login to SoundCloud</button>
	    </div>
	);
    }
}

export default SoundCloudLogin;
