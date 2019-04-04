
import React from 'react';
import "./VuMeter.css"

export class VuMeter extends React.Component {
	constructor(props){
        super(props);
		this.context=props.audioContext;
        this.analyser = this.context.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.3;
        this.analyser.fftSize = 1024;
        this.javascriptNode = this.context.createScriptProcessor(2048, 1, 1);
        this.analyser.connect(this.javascriptNode);
        this.javascriptNode.connect(this.context.destination);
	}

    plugIn(){
        return this.analyser;
    }

	componentDidMount(){
        this.javascriptNode.onaudioprocess = ()=>{
            var array =  new Uint8Array(512);
            this.analyser.getByteFrequencyData(array);
            var average = getAverageVolume(array);
            this.drawSignalAmplitude(average);
        }

        function getAverageVolume(array) {
            var values = 0;
            var average;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                values += array[i];
            }

            average = values / length;
            return average;
        }

        this.ctx = this.vumeter.getContext('2d');
        this.ctx.globalAlpha = 0.8;
    }

    drawSignalAmplitude(average){
        this.ctx.clearRect(0, 2, 100, 16);
        this.ctx.fillStyle='#6ff';
        this.ctx.fillRect(100-average, 2, average, 16);
        this.ctx.fillRect(0, 2, average, 16);
    }

    render() {
        return (
            <canvas id="vu-meter" width="100" height="20" ref={(canvasEl) => {this.vumeter=canvasEl}} ></canvas>
        );
    }
}
