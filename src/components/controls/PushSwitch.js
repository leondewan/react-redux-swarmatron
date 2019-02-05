
import React from 'react';
import "./PushSwitch.css"

export class PushSwitch extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.toggleVoice = this.toggleVoice.bind(this);
	// }

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
	 }

	//factor these out

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




