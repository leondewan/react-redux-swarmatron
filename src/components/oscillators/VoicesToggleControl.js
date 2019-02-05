import React, { Component, Fragment }  from 'react';
import { connect } from 'react-redux';

import PushSwitch from '../controls/PushSwitch';
import * as actions from '../../actions';

class VoicesToggleControl extends Component {
    constructor(props) {
        super(props);
        this.switchVoice = this.switchVoice.bind(this);
        this.updateVoicesFromPreset = this.updateVoicesFromPreset.bind(this);
    }

    componentWillMount() {
        this.voicesState = [true, true, true, true, true, true, true, true];
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.voicesToggle!==this.props.voicesToggle){  
             this.updateVoicesFromPreset();
        }
     }

    switchVoice = (isOn, voice ) => {
        if(isOn){
            this.props.voices.voices[voice].voiceOn();
            this.updateVoicesState(true, voice);
        } else {
            this.props.voices.voices[voice].voiceOff();
            this.updateVoicesState(false, voice);
        }
    }

    updateVoicesState = (isOn, voice) => {
        this.voicesState[voice] = isOn;
        this.props.setVoicesToggle(this.voicesState);
    }

    updateVoicesFromPreset = () => {
        this.props.voicesToggle.forEach((val, i) => this.switchVoice(val, i));
    }
    
    render () {
        return (
            <Fragment>
                {this.props.voices.voices.map((val, index) => 
                    <PushSwitch
                        push={this.switchVoice}
                        voice={index}
                        key={index.toString()}
                        deviceOn={this.props.deviceOn}
                    />         
                )}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        voicesToggle: state.voicesToggle
    }
}

export default connect(mapStateToProps, actions)(VoicesToggleControl);