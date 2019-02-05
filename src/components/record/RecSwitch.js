import React, { Component } from 'react';
var FileSaver = require('file-saver');
import { CSSTransition } from 'react-transition-group'; 

import "../controls/RecSwitch.css"

export class RecSwitch extends Component {
	
	state = {powered: true, recordOn: false, savePending: false, performanceName: ''}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.deviceOn!==this.props.deviceOn){  
			 this.setState({powered: this.props.deviceOn});
			 
		}
	 }

	toggleRecordButton = (event) => {
		event.preventDefault();
		this.setState({recordOn: !this.state.recordOn}, () => this.operateRecorder());
		console.log('this on click', this);
	}	

	operateRecorder = () => {
		if(this.state.recordOn) { 
			this.props.recorder.record(); 
		} else {
			this.props.recorder.stop();
			this.props.recorder.exportWAV( (blob) => {
				this.setState({savePending: true}); 
				this.performancefile = blob;             
			});
            
            this.props.recorder.clear();
		}
		this.styleRecButtonState();        
	}

	handleOnChange = (event) => {
		this.setState({performanceName: event.target.value});
	}
	
	savePerformance = () => {
		FileSaver.saveAs(this.performancefile, this.state.performanceName || 'unnamed swarm performance');
  		this.setState({savePending: false});
  		
	}

	styleRecButtonState = () => {
		return `recswitch ${(this.state.recordOn && this.state.powered) ? 'pushed on': ''}`;
	}

	styleSaveButtonState = () => {
		return `saveswitch ${this.state.savePending ? '': 'disabled'}`;
	}
	
	render() {
		const {
			savePending
		  } = this.state;
		return(
			<div className="record">
				<label>REC</label>
				<div
					className={this.styleRecButtonState()}
					onClick={this.toggleRecordButton}
					onTouchStart={this.toggleRecordButton}>
				</div>
				<CSSTransition
					 in={savePending}
					 timeout={2000}
					 classNames="save-as"
					 unmountOnExit
				>
					<div className='save'>
						<label>Save Performance as:</label>
						<input type="text" value={this.state.performanceName} onChange={this.handleOnChange}/>
						<div
							className={this.styleSaveButtonState()}
							onClick={this.savePerformance}
						/>
						<label className="sublabel">save</label>
					</div>
				</CSSTransition>
				

			</div>
		);
	}
}	




