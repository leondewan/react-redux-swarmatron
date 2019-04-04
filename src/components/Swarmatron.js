import React from 'react';
import VoiceControl from './oscillators/VoiceControl';
import VoicesToggleControl from './oscillators/VoicesToggleControl';
import EnvelopeControl from './envelopes/EnvelopeControl';
import ToneControl from './tone/ToneControl';
import { PowerSwitch } from './controls/ToggleSwitch';
import { VolumeControl } from './vol/VolumeControl';
import PresetControl from './presets/PresetControl';
import { RecSwitch } from './record/RecSwitch.js'
import { VuMeter } from './record/VuMeter';
import SwarmEngine from './utils/SwarmEngine'
import './Swarmatron.css'

class Swarmatron extends React.Component {
    state = { deviceOn: true }

	componentWillMount() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.swarmEngine = new SwarmEngine(this.audioContext);
    }

    componentDidMount(){
        this.swarmEngine.swarmVol.connect(this.swarmEngine.vuMeter.plugIn());
        document.addEventListener("touchstart", () => {
            document.activeElement.blur();
        });
    }

    componentWillUnmount() {
        this.audioContext.close();
    }

    togglePower = () => {
        const powerState = this.state.deviceOn;
        const { voices } = this.swarmEngine.voices;
        this.setState({deviceOn: !this.state.deviceOn});
        if(!powerState) {
            voices.forEach((v, i) => {
                voices[i].voiceOn();
            });
        } else {
            voices.forEach((v, i) => {
                voices[i].voiceOff();
            });
            this.resetEnvelopes();
        }
    }

    resetEnvelopes = () => {
        var now=this.audioContext.currentTime;
        this.swarmEngine.envNode.gain.cancelScheduledValues(now);
        this.swarmEngine.envNode.gain.value=0;
        this.swarmEngine.filter.detune.cancelScheduledValues(now);
        this.swarmEngine.filter.detune.value=0;
    }

    render(){
      	return(
            <div id="swarmatron">
          		<form id="mainpanel" className="group">
                    <label className="voices">VOICES 1 - 8 </label>
                    <ul className="mainswitchrow group">
                        <VolumeControl
                            swarmVol={this.swarmEngine.swarmVol}
                            setVolume={this.swarmEngine.setVol}
                            volume={1}
                        />
                        <VoicesToggleControl
                            voices={this.swarmEngine.voices}
                            deviceOn={this.state.deviceOn}
                        />
                        <PowerSwitch togglePower={this.togglePower} />
                    </ul>
                    <ToneControl
                        filter={this.swarmEngine.filter}
                        filtenv={this.swarmEngine.filtenv}
                        swOverdrive={this.swarmEngine.swOverdrive}
                        distortionCurve={this.swarmEngine.distortionCurve} />

                    <EnvelopeControl
                        volumeEnv={this.swarmEngine.volumeEnv}
                     />
                    <RecSwitch
                         deviceOn={this.state.deviceOn}
                         recorder={this.swarmEngine.recorder}
                    />
                    <VuMeter audioContext={this.audioContext}
                    ref={instance => { this.swarmEngine.vuMeter = instance; }}
                    />
          		</form>
                <div id="ribbonpanel" className="group">
                    <PresetControl />
                    <VoiceControl
                        voices={this.swarmEngine.voices}
                        volumeEnv={this.swarmEngine.volumeEnv}
                        filtenv={this.swarmEngine.filtenv}
                    />
                </div>
          	</div>
        );
    }
}

export default Swarmatron;
