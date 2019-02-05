
export class Filtenv {

	constructor(context, filter, envSettings, linearEnv){
		this.context=context;
		this.filter=filter;
		this.envSettings= envSettings;
        this.linearEnv= linearEnv;
	}

	filtEnvelope(n){
		var param=this.filter.detune;
        var now=this.context.currentTime;
        var lastValue;
        
        var envScale=4000;

        var filterPeak=this.envSettings.peakLevel*envScale*this.envSettings.filterEnv;
        var floor= -(filterPeak);

        if(n){
            lastValue=param.value;
            param.cancelScheduledValues(now);
            param.setValueAtTime(lastValue, now);
            param.linearRampToValueAtTime(filterPeak, now + this.envSettings.attackTime);
            if(this.linearEnv) param.linearRampToValueAtTime(this.envSettings.sustainLevel, 
                now + this.envSettings.attackTime + this.envSettings.decayTime*2);            
            else param.setTargetAtTime(this.envSettings.sustainLevel, now + this.envSettings.attackTime, this.envSettings.decayTime);
            
        } else {            
            lastValue=param.value;
            param.cancelScheduledValues(now);
            param.setValueAtTime(lastValue||this.envSettings.sustainLevel, now);
            if(this.linearEnv) param.linearRampToValueAtTime(0, now + this.envSettings.releaseTime*2);
            else param.setTargetAtTime(floor, now, this.envSettings.releaseTime);  
        }      
	}
}
