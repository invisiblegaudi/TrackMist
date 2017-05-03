import React, { Component } from 'react';

/* 
 *  Dashboard for user info
 *  @author john@invisiblearchitects.com
 * 
*/

class Dashboard extends Component {

    render(){
	return (
	    <div className="Dashboard">
	    <ul>
	    {this.props.mixcloud.map(mix=>{
		return <li class="mix"><strong>Mix: {mix.name}</strong>
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
