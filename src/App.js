import React, { Component } from 'react';
import SoundCloudLogin from './SoundCloudLogin/SoundCloudLogin';
import './App.css';

/* TrackMist React App
 * @description main app container
 * @author john@invisiblearchitects
 * @version 1.0
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>TrackMist</h2>
        </div>
        <p className="App-intro">
          To get started, login to your SoundCloud account
        </p>
	<SoundCloudLogin />
      </div>
    );
  }
}

export default App;
