import React from 'react';

import { ScalingMath } from '../utils/scalingMath';
import { Knob } from '../controls/Knob';


export class VolumeControl extends React.Component {
  	constructor(props) {
        super(props);
  		this.scalingMath = new ScalingMath();

        this.setVol=this.setVol.bind(this);
        this.scaleVol=this.scaleVol.bind(this);
  	}
    
    state = { vol: 0.75 };
      
    descaleVol = (value) => {
        return this.scalingMath.revLinScale(value, 1);
    }

    scaleVol = (value) => {
        let val = this.scalingMath['linScale'](value, 1);
        this.setVol(val);
    }

    setVol = (val) => {
        this.props.swarmVol.gain.value=val;
        this.setState({ vol: val });
    }

    render() {
        return(
            <Knob returnRawValue={this.scaleVol}
                returnScaledValue={this.setVol}
                setKnobAngle={this.descaleVol(this.state.vol)}
                setScaledValue={this.state.vol}>V
            </Knob>
        );
    }
}
