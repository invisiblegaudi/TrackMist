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
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>TrackMist</h2>
        </div>
        <p className="App-intro">
          To get started, enter your MixCloud account username
        </p>
	<MixCloudLogin />
	<Dashboard />
      </div>
    );
  }
}

export default App;
