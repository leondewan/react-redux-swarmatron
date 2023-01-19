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
import { SwarmEngine } from './utils/SwarmEngine'
import './Swarmatron.css'

const Swarmatron = () => {
  const [deviceOn, setDeviceOn] = React.useState(true);
  const [audioContext, setAudioContext] = React.useState(null)
  const [swarmEngine, setSwarmEngine] = React.useState(null)


  React.useEffect(() => {
    const _audioContext = new window.AudioContext;
    setAudioContext(_audioContext);
    setSwarmEngine(SwarmEngine(_audioContext));
    return () => audioContext && audioContext.close();
  }, [])

  React.useEffect(() => {
    swarmEngine && swarmEngine.swarmVol.connect(swarmEngine.vuMeter.plugIn());
    document.addEventListener("touchstart", () => {
      document.activeElement.blur();
    });
  }, [swarmEngine])

  const togglePower = () => {
    const powerState = deviceOn;
    const { voices } = swarmEngine.voices;
    setDeviceOn(!deviceOn);
    if (!powerState) {
      voices.forEach((v, i) => {
        voices[i].voiceOn();
      });
    } else {
      voices.forEach((v, i) => {
        voices[i].voiceOff();
      });
      resetEnvelopes();
    }
  }

  const resetEnvelopes = () => {
    var now = audioContext.currentTime;
    swarmEngine.envNode.gain.cancelScheduledValues(now);
    swarmEngine.envNode.gain.value = 0;
    swarmEngine.filter.detune.cancelScheduledValues(now);
    swarmEngine.filter.detune.value = 0;
  }

  return renderSwarmatron();

  function renderSwarmatron() {
    if (audioContext && swarmEngine) {
      return (
        <div id="swarmatron">
          <form id="mainpanel" className="group">
            <label className="voices">VOICES 1 - 8 </label>
            <ul className="mainswitchrow group">
              <VolumeControl
                swarmVol={swarmEngine.swarmVol}
                setVolume={swarmEngine.setVol}
                volume={1}
              />
              <VoicesToggleControl
                voices={swarmEngine.voices || {}}
                deviceOn={deviceOn}
              />
              <PowerSwitch togglePower={togglePower} />
            </ul>
            <ToneControl
              filter={swarmEngine.filter}
              filtenv={swarmEngine.filtenv}
              swOverdrive={swarmEngine.swOverdrive}
              distortionCurve={swarmEngine.distortionCurve} />
  
            <EnvelopeControl
              volumeEnv={swarmEngine.volumeEnv}
            />
            <RecSwitch
              deviceOn={deviceOn}
              recorder={swarmEngine.recorder}
            />
            <VuMeter audioContext={audioContext}
              ref={instance => { swarmEngine.vuMeter = instance; }}
            />
          </form>
          <div id="ribbonpanel" className="group">
            <PresetControl />
            <VoiceControl
              voices={swarmEngine.voices}
              volumeEnv={swarmEngine.volumeEnv}
              filtenv={swarmEngine.filtenv}
            />
          </div>
        </div>
      )
    };
    return <div>no swarm engine</div>;
  }
}

export default Swarmatron;
