import React from 'react';

import './ToggleSwitch.css';


export class PowerSwitch extends React.Component {
	constructor(props) {
		super(props);
		this.powerOn=true;
	}

	togglePower = (event) => {
		event.preventDefault();
		this.powerOn=!this.powerOn;

		if(this.powerOn) {
			this.props.togglePower(true);
		} else {
			this.props.togglePower(false);
		}
	}

	render() {
		return(
			<li className={this.powerOn ? 'toggleswitch on' : 'toggleswitch'} onClick={this.togglePower}
			onTouchStart={this.togglePower}>
				<label className="top">ON</label>
				<div className="hexnut">
					<div className="collar">
						<div className="bat"></div>
					</div>
				</div>
				<label className="bottom">OFF</label>
			</li>
		);
	}
}
