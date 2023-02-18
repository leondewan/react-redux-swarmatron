import { Voice } from './voice';

export class Voices {

  constructor(context) {
    this.context = context;
  }

  createVoices() {
    let voiceMerger = this.context.createChannelMerger(8);

    var voices = [];

    for (let i = 0; i < 8; i++) {
      let voice = new Voice(100, 0.125, this.context);
      voice.voiceConnect(voiceMerger, 0, 0);
      voices.push(voice);
    }

    return {
      voices: voices,
      voiceMerger: voiceMerger
    }
  }
}
