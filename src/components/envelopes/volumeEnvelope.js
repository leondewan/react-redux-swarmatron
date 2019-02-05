import { Envsettings } from './envelopeSettings';

export class VolumeEnv {

	constructor(context, envNode, linearEnv){
		this.context=context;
		this.envNode=envNode;
		this.envSettings= new Envsettings();
        this.linearEnv=linearEnv;
	}

	volEnvelope(n){
		var param=this.envNode.gain;
        var now=this.context.currentTime;
        var lastValue;
        
        if(n){
            lastValue=param.value;
            param.cancelScheduledValues(now);
            param.setValueAtTime(lastValue, now);
            param.linearRampToValueAtTime(this.envSettings.peakLevel, now + this.envSettings.attackTime);
            
            if(this.linearEnv) param.linearRampToValueAtTime(this.envSettings.sustainLevel, 
                now + this.envSettings.attackTime + this.envSettings.decayTime*2);            
            else param.setTargetAtTime(this.envSettings.sustainLevel, now + this.envSettings.attackTime, 
                this.envSettings.decayTime);
            
        } else {
            
            lastValue=param.value;
            param.cancelScheduledValues(now);
            param.setValueAtTime(lastValue||this.envSettings.sustainLevel, now);
            if(this.linearEnv) param.linearRampToValueAtTime(0, 
                now + this.envSettings.releaseTime*2);
            else param.setTargetAtTime(0, now, this.envSettings.releaseTime);  
        }      
	}
}
