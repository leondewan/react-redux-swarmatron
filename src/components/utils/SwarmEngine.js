import { Voices } from '../oscillators/voices';
import { VolumeEnv } from '../envelopes/volumeEnvelope';
import { Filtenv } from '../envelopes/filterEnvelope';
import { Recorder } from '../record/recorder.js';

export const SwarmEngine = audioContext => {
  const _swarmEngine = {
    audioContext,
    recorderNode: audioContext.createGain(),
    voices: new Voices(audioContext).createVoices(),
    envNode: audioContext.createGain(),
    filter: audioContext.createBiquadFilter(),
    swOverdrive: audioContext.createWaveShaper(),
    swarmVol: audioContext.createGain(),
  }

  _swarmEngine.recorder = Recorder(_swarmEngine.recorderNode);
  _swarmEngine.volumeEnv = VolumeEnv(audioContext, _swarmEngine.envNode, _swarmEngine.linearEnv);
  _swarmEngine.filtenv = new Filtenv(audioContext, _swarmEngine.filter, _swarmEngine.volumeEnv.envSettings, _swarmEngine.linearEnv);
  _swarmEngine.envNode.gain.value = 0;

  _swarmEngine.voices.voiceMerger.connect(_swarmEngine.envNode);
  _swarmEngine.envNode.connect(_swarmEngine.filter);
  _swarmEngine.filter.connect(_swarmEngine.swOverdrive);
  _swarmEngine.swOverdrive.connect(_swarmEngine.swarmVol);
  _swarmEngine.swarmVol.connect(_swarmEngine.recorderNode);
  _swarmEngine.swarmVol.connect(_swarmEngine.audioContext.destination);
  return _swarmEngine;
}