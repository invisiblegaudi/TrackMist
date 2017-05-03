import React, { Component } from 'react'
import MixCloudLogin from './MixCloudLogin/MixCloudLogin'
import LastFMLogin from './LastFMLogin/LastFMLogin'
import Dashboard from './Dashboard/Dashboard'
import './App.css'

/*
 * TrackMist React Appx
 * @description main app container
 * @author john@invisiblearchitects
 * @version 1.0
*/

class App extends Component {

    constructor(props) {
	super(props)
	this.state = {}
	this.state.introText = 'To get started, enter your MixCloud account username'
	this.mixcloudData = []
	this.lastfmLogin = 'hidden'
	if(localStorage.mixcloudUserData){
	    this.mixcloudData = JSON.parse(localStorage.mixcloudUserData)
	}
    }
    
    changeIntroText = (text) => {
	this.setState({introText:text})
    }

    loadMixcloudData = (userData) => {
	this.mixcloudData = userData
	localStorage.mixcloudUserData = JSON.stringify(userData)
	this.lastfmLogin = 'visible'
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
	    <MixCloudLogin showMessage={this.changeIntroText} sendData={this.loadMixcloudData} />
	    <LastFMLogin authButton={this.auth} />
	    <Dashboard mixcloud={this.mixcloudData} />
	    </div>
	)
  }
}

export default App
