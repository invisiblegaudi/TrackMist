import React, { Component } from 'react';
import MixCloudLogin from './MixCloudLogin/MixCloudLogin';
import Dashboard from './Dashboard/Dashboard';
import './App.css';

/* TrackMist React App
 * @description main app container
 * @author john@invisiblearchitects
 * @version 1.0
*/

class App extends Component {

    constructor(props) {
	super(props)
	this.state = {};
	this.state.introText = 'To get started, enter your MixCloud account username';
    }
    
    changeIntroText = (text) => {
	
	this.setState({introText:text})
    }

    loadDashboard = (userData) => {
	console.log(userData)
    }
    
    render() {
	return (
	    <div className="App">
            <div className="App-header">
            <h2>TrackMist</h2>
            </div>
            <p className="App-intro">
	    {this.state.introText}
            </p>
	    <MixCloudLogin showMessage={this.changeIntroText} />
	    <Dashboard />
	    </div>
	);
  }
}

export default App;
