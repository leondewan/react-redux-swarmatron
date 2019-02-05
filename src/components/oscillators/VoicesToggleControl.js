import React, { Component, Fragment }  from 'react';
import { connect } from 'react-redux';

import { PushSwitch } from '../controls/PushSwitch';
import * as actions from '../../actions';

class VoicesToggleControl extends Component {
    constructor(props) {
        super(props);
        this.switchVoice = this.switchVoice.bind(this);
    }
    componentWillMount() {
        this.voicesState = [true, true, true, true, true, true, true, true];
        console.log(this.props);
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

    // updateVoicesFromPreset = () => {
    //     this.props.state.voicesToggle.forEach((voice, i) => this.switchVoice(voice, this.props.state.voicesToggle[i]));
    // }
    
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