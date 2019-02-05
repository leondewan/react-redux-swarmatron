export class Envsettings {
    attackTime=1;
    peakLevel = 1;
    decayTime=1;
    sustainLevel=1;
    releaseTime=1;
    filterEnv=0;


    setAttack(val){
    	this.attackTime=val;
    }

    setDecay(val){
    	this.decayTime=val;
    }

    setSustain(val){
    	this.sustainLevel=val;
    }

    setRelease(val){
    	this.releaseTime=val;
    }

    setFilterEnv(val){
    	this.filterEnv=val;
    }
}
