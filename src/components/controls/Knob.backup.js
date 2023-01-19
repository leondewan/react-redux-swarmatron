import React from 'react';

import "./Knob.css";

//refactor to hooks syntax

export class Knob extends React.Component {
	state = { ctlVal: 1 };

	componentDidMount(){
		this.setState({ctlVal:this.props.setScaledValue});
		this.turnValue=this.props.setKnobAngle;
		this.rotateKnob();
	}


    componentDidUpdate(prevProps, prevState) {
		if(prevProps.setScaledValue!==this.props.setScaledValue){
			 this.updateCtlValue();
		}
	 }

	initiateDrag = (event) => {
		event.preventDefault();
		event.gesture.preventDefault();
		this.prevTurnValue=this.turnValue;
		if(event.touches) this.turnStart=event.changedTouches[0].clientY;
		else this.turnStart=event.clientY;

		document.addEventListener('mousemove', this.operate);
		document.addEventListener('touchmove', this.operate);
		document.addEventListener("mouseup", () => {
			document.removeEventListener("mousemove", this.operate);
			document.removeEventListener("touchmove", this.operate);
		});

		document.addEventListener("touchend", () => {
			document.removeEventListener("touchmove", this.operate);
			document.removeEventListener("mousemove", this.operate);
		});
	}

	operate = (event) => {
		let turn;
		if(event.touches) turn = event.changedTouches[0].clientY;
		else turn=event.clientY;
       	let currTurn=Math.round(this.prevTurnValue - turn + this.turnStart);

       	if(currTurn>=-150&&currTurn<=150){
       		this.turnValue=currTurn;
       		this.rotateKnob();
       		this.props.returnRawValue(this.turnValue, this.props.param);
			this.setState({ctlVal:this.props.setScaledValue});
       	}
	}

	rotateKnob = () => {
		if(this.turnValue>150) this.turnValue=150;
		if(this.turnValue<-150) this.turnValue=-150;
		this.knobEl.style.webkitTransform = 'rotate(' + this.turnValue + 'deg)';
		this.knobEl.style.transform = 'rotate(' + this.turnValue + 'deg)';

	}

	handleOnChange = (event) => {
		let val=parseFloat(event.target.value);
		this.setState({ctlVal:val});
		setTimeout(() => {this.delayedUpdate()}, 750);
	}

	delayedUpdate = () => {
		this.props.returnScaledValue(this.state.ctlVal, this.props.param);
		this.turnValue=this.props.setKnobAngle;
		this.rotateKnob();
	}

	updateCtlValue = () => {
		this.setState({ctlVal:this.props.setScaledValue});
		this.turnValue=this.props.setKnobAngle;
		this.rotateKnob();
	}



	render() {
		return (
			<li className="knob">
				<label>{this.props.children}</label>
				<div className="body" onMouseDown={this.initiateDrag}
					onTouchStart={this.initiateDrag}
					ref={(knobElement) => { this.knobEl=knobElement; }} >
					<div className="pointer"></div>
				</div>
				<input type="text" value={this.state.ctlVal}
				onChange={this.handleOnChange}/>
			</li>
		);
	}
}
