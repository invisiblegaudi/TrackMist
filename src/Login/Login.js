import React, { Component } from 'react';
import styles from './Login.css';

/* 
 *  Configurable Login Panel for all logins
 *  @author john@invisiblearchitects.com
 * 
*/

class Login extends Component {

    constructor(props) {
	super(props);
	this.state = {username: '', errors: ['username'], showErrors: false};
	this.config = { username : { placeholder : 'Username'  } }
	this.title = 'TrackMist';
	this.handleChange = this.handleChange.bind(this);
	this.handleLogin = this.handleLogin.bind(this);
    }
    
    handleChange(event) {
	let stateChange = {};
	let error = this.state.errors.indexOf(event.target.name) >= 0 ? true : false; // field has error?
	if(event.target.value.length) { // field valid if field not empty
	    if(error) this.state.errors.splice(this.state.errors.indexOf(error),1); // remove error for that field
	} else {
	    if(!error) this.state.errors.push(event.target.name); // add error for that field
	    this.state.showErrors = true;
	}
	stateChange[event.target.name] = event.target.value; // update field value
	this.setState({...this.state,...stateChange}); // update state
    }

    handleLogin() {
	if(!this.state.errors.length) {
	    this.props.passedValidation(this.state.username);
	} else {
	    this.setState({...this.state,...{showErrors: true}});
	}
    }
    
    render(){
	return (
	    <div className="Login">
	    <div id="errors" className={this.state.errors.length && this.state.showErrors ? 'show' : ''}>
	    <p>Please correct field(s):{this.state.errors}</p>
	    <ul id="errorList">{this.state.errors.map(field => {
		return <li key={field.toString()}>{field}</li>;}
	    )}</ul>
	    </div>	    
	    {Object.keys(this.config).map(field=>{
		return <input className={this.state.errors.includes(field) ? 'error' : ''} name={field} ref={field} type="text" onChange={this.handleChange} placeholder={this.config[field].placeholder} />
	    })}
	    <button onClick={this.handleLogin}>{this.props.title}</button>
	    </div>
	);
    }
}

export default Login;
