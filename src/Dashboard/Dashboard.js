import React, { Component } from 'react';

/* 
 *  Dashboard for user info
 *  @author john@invisiblearchitects.com
 * 
*/

class Dashboard extends Component {

    render(){
	console.log(this.props.mixcloud)
	return (
	    <div className="Dashboard">
	    <ul>
	    {this.props.mixcloud.map(mix=>{
		return <li>{mix.name}
		<ul>{mix.tracklist.map(track=>{return <li>{track.artist} - {track.title}</li> })}
		</ul>
		</li>
	    })}
	    </ul>
	    </div>
	)
    }
}

export default Dashboard;
