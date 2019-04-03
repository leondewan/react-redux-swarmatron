
import React from 'react';
import "./PushSwitch.css"

export class PushSwitch extends React.Component {
	state = { powered: this.props.ext, pushed: this.props.ext }
	toggleVoice = (event) => {
		event.preventDefault();
		this.setState({ powered: !this.state.powered, pushed: !this.state.pushed }, () => this.switchVoice());
	}

	setSwitch = () => {
		this.setState({ powered: this.props.ext, pushed: this.props.ext }, () => this.switchVoice());
	}

	switchVoice = () => {
		if(this.state.powered){
 				this.props.power(this.state.pushed, this.props.voice);
		} else {
			this.props.power(false, this.props.voice);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.deviceOn!==this.props.deviceOn){
			 this.powerVoice(this.props.deviceOn);
		}
		if(prevProps.ext!==this.props.ext){
			 this.setSwitch(this.props.ext);
		}
	 }

	powerVoice = (on) => {
		if (on && this.state.pushed) {
			this.setState({powered: true});
			this.props.power(true, this.props.voice);
		} else {
			this.props.power(false, this.props.voice);
			this.setState({
				powered:false
			});
		}
	}

	styleButtonState = () => {
		return `pushswitch ${this.state.pushed ? 'pushed': ''} ${this.state.powered? 'on': ''}`;
	}

	render() {
		const buttonStateStyle = this.styleButtonState();
		return(
			<li className={buttonStateStyle}
				onClick={this.toggleVoice}
				onTouchStart={this.toggleVoice}></li>
		);
	}
}
