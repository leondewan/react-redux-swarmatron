export class Voice  {

  //refactor to hooks syntax

    constructor(freq, vol, ctx) {

        this.vco=ctx.createOscillator();
        this.vco.type="sawtooth";
        this.vco.frequency.value=freq;

        this.vca=ctx.createGain();
        this.vca.gain.value=vol;

        this.vco.connect(this.vca);
    }

    setFrequency(freq){
        this.vco.frequency.value=freq;
    }

    voiceOn(){
        this.vca.gain.value=0.125;
    }

    voiceOff(){
        this.vca.gain.value=0;
    }

    voiceConnect(dest, chan1, chan2) {
      this.vca.connect(dest, chan1, chan2);
    }

}