import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCenterTone, setSwarmInterval } from '../../actions';

import { PitchRibbon } from '../controls/PitchRibbon';
import { SwarmRibbon } from '../controls/SwarmRibbon';
import { Cluster } from '../utils/cluster';

class VoiceControl extends Component {
  componentDidMount() {
    this.cluster = new Cluster();
    this.startup = false;
    this.setPitches(this.props.centerTone);
  }

  setPitches = (freq = this.props.centerTone) => {
    let freqArray = this.cluster.makeCluster(freq, this.props.swarmInterval);
    for (let i = 0; i < freqArray.length; i++) {
      this.props.voices.voices[i].setFrequency(freqArray[i]);
    }
  }

  setCenterTone = (freq) => {
    this.props.setCenterTone(freq);
    this.setPitches(freq);
  }

  setSwarmInterval = (val) => {
    this.props.setSwarmInterval(val);
    this.setPitches();
  }

  startTone = (freq) => {
    if (!this.startup) this.startVoices();
    this.startup = true;
    this.setPitches(freq);
    this.props.volumeEnv.volEnvelope(true);
    this.props.filtenv.filtEnvelope(true);
  }

  endTone = () => {
    this.props.volumeEnv.volEnvelope(false);
    this.props.filtenv.filtEnvelope(false);
  }

  startVoices = () => {
    for (let i = 0; i < 8; i++) {
      this.props.voices.voices[i].vco.start(0);
    }
  }

  render() {
    return (
      <div id="ribbonholder">
        <PitchRibbon
          startTone={this.startTone}
          setCenterTone={this.setCenterTone}
          endTone={this.endTone}>
        </PitchRibbon>
        <SwarmRibbon setSwarm={this.setSwarmInterval}></SwarmRibbon>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    centerTone: state.centerTone,
    swarmInterval: state.swarmInterval
  }
}

export default connect(mapStateToProps, { setCenterTone, setSwarmInterval })(VoiceControl);