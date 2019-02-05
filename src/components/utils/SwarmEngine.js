import { Voices } from '../oscillators/voices';
import { VolumeEnv } from '../envelopes/volumeEnvelope';
import { Filtenv } from '../envelopes/filterEnvelope';
import { Recorder } from '../record/recorder.js';

export default function (audioContext) {
    this.audioContext = audioContext;
    this.recorderNode = this.audioContext.createGain();
    this.recorder=new Recorder(this.recorderNode);

    this.voices= new Voices(this.audioContext).createVoices(); 
    this.envNode=this.audioContext.createGain();
    this.envNode.gain.value=0;
    this.volumeEnv = new VolumeEnv(this.audioContext, this.envNode, this.linearEnv);

    this.filter=this.audioContext.createBiquadFilter();
    this.filtenv=new Filtenv(this.audioContext, this.filter, 
    this.volumeEnv.envSettings, this.linearEnv);        

    this.swOverdrive = this.audioContext.createWaveShaper();

    this.swarmVol=this.audioContext.createGain();
    this.voices.voiceMerger.connect(this.envNode);
    this.envNode.connect(this.filter);
    this.filter.connect(this.swOverdrive);
    this.swOverdrive.connect(this.swarmVol);
    this.swarmVol.connect(this.recorderNode);
    this.swarmVol.connect(this.audioContext.destination);
}