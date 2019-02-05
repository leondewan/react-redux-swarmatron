export class ScalingMath {

	//linear scaling of knob position in degrees, 0 being straight up; 'amp' represents amplitude
	linScale(knobPosition, amp){
		return this.scaleRound(amp*(knobPosition + 150)/300, amp);
	}

	revLinScale(paramval, amp) {
		return this.scaleRound(300/amp*paramval - 150, amp);
	}
	
	expScale(knobPosition, amp, curveShape){
		return this.scaleRound(amp*(Math.exp(curveShape*(knobPosition+150) / 300)-1) / (Math.exp(curveShape)-1), amp);
	}

	revExpScale(paramval, amp, curveShape){
		return this.scaleRound(300 / curveShape * Math.log(paramval / amp*(Math.exp(curveShape)-1)+1) - 150, amp);
	}

	binScale(knobPosition, base, ex){
		return Math.round( base*(Math.pow(2, ex*(knobPosition+150) / 300)-1));
	}

	revBinScale(knobPosition, base, ex){
		return Math.round(300*Math.log2(knobPosition/base + 1)/ex - 150);
	}

	noteToTone(note) {
    	return 16.35*Math.pow(2, (note/125));
    }

    scaleRound(val, a){
    	if(a>=100) return Math.round(val);
    	else if(a<100&&a>=10) return Math.round(val*10)/10;
    	else return Math.round(val*100)/100;
    } 
}