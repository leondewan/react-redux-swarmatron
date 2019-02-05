
import React from 'react';
import { connect } from 'react-redux';
import "./PushSwitch.css"
import VoicesToggleControl from '../oscillators/VoicesToggleControl';

class PushSwitch extends React.Component {
	state = { powered: true, pushed: true }

	toggleVoice = (event) => {
		event.preventDefault();
		this.setState({powered: !this.state.powered, pushed: !this.state.pushed}, () => this.switchVoice());
	}

	switchVoice = () => {
		if(this.state.powered){
 				this.props.push(this.state.pushed, this.props.voice);
		} else {
			this.props.push(false, this.props.voice);
		}
	}

	componentDidMount(){
		console.log('from pushbutton', this);

	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.deviceOn!==this.props.deviceOn){  
			 this.powerVoice(this.props.deviceOn);
			 
		}
		if(prevProps.pushed!=this.props.pushed) {
			this.setState({powered: this.props.pushed, pushed: this.props.pushed});
		}
	 }
	
	powerVoice = (on) => {
		if (on && this.state.pushed) {
			this.setState({powered: true});
			this.props.push(true, this.props.voice);
		} else {
			this.props.push(false, this.props.voice);
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

const mapStateToProps = (state, ownProps) => {
	return {pushed: state.voicesToggle[ownProps.voice]}
}

export default connect(mapStateToProps)(PushSwitch);




