export class Distortioncurve {
	amount:number;
	k:number;
	n_samples:number;
	curve: Float32Array;
	x:number;

	constructor(){
		this.n_samples=44100;
		this.curve=new Float32Array(this.n_samples);
	}

    drawCurve(amount) {  
    	this.k=amount;   
	    for (var i=0; i<this.n_samples; i++) {
	        this.x = i*2/this.n_samples-1;
	        this.curve[i] = (3+this.k)*this.x/(3*(3+this.k*Math.abs(this.x)));	        
	    }

		return this.curve; 
	}
}


