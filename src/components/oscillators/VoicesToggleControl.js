import React, { Component, Fragment }  from 'react';
import { connect } from 'react-redux';

import { PushSwitch } from '../controls/PushSwitch';
import * as actions from '../../actions';

class VoicesToggleControl extends Component {
    powerVoice = (isOn, voice ) => {
        if(isOn){
            this.props.voices.voices[voice].voiceOn();
        } else {
            this.props.voices.voices[voice].voiceOff();
        }
    }

    updateVoicesState = (isOn, voice) => {
        this.props.voicesToggle[voice] = isOn;
        this.props.setVoicesToggle(this.props.voicesToggle);
    }

    render () {
        return (
            <Fragment>
                {this.props.voices.voices.map((val, index) =>
                    <PushSwitch
                        ext={this.props.voicesToggle[index]}
                        power={this.powerVoice}
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
