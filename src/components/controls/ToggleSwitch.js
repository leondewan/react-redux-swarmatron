	

import React from 'react';

import './ToggleSwitch.css';


export class PowerSwitch extends React.Component {

	constructor(props) {
		super(props);
		this.powerOn=true;
		this.togglePower=this.togglePower.bind(this);
	}

	togglePower(event){
		event.preventDefault();
		this.powerOn=!this.powerOn;

		if(this.powerOn){
			this.switchEl.classList.add('on');
			this.props.togglePower(true);
		} else {
			this.switchEl.classList.remove('on');
			this.props.togglePower(false);
		}
	}

	render() {
		return(
			<li className="toggleswitch on" onClick={this.togglePower}
			onTouchStart={this.togglePower}
			ref={(switchElement) => { this.switchEl=switchElement; }}>	
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


