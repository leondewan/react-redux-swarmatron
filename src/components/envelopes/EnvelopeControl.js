import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions' 

import { ScalingMath } from '../utils/scalingMath';
import { Knob } from '../controls/Knob';

//refactor to hooks syntax

class EnvelopeControl extends Component {
  	constructor(props) {
        super(props);
  		this.scalingMath = new ScalingMath();
  		this.scalingMap={
  			'attack': ['expScale', 'revExpScale', 10, 2], 
  			'decay': ['expScale', 'revExpScale', 5, 1],
  			'sustain': ['expScale', 'revExpScale', 1, 3],
  			'release':['expScale', 'revExpScale', 5, 2]
  		}
       
        this.scaleParameter=this.scaleParameter.bind(this);
        this.setParameter=this.setParameter.bind(this);
      }
      
    

    scaleParameter(value, src) {
        let x=this.scalingMath[this.scalingMap[src][0]](value, this.scalingMap[src][2], this.scalingMap[src][3]);
        this.setParameter(x, src);
    }

    descaleParameter(value, src) {
        return this.scalingMath[this.scalingMap[src][1]](value, this.scalingMap[src][2], this.scalingMap[src][3]);
    }

    setParameter(val, src) {
        switch (src) {
            case "attack":
                this.setAttack(val);
                break;

            case "decay":
                this.setDecay(val);
                break;

            case "sustain":
                this.setSustain(val);
                break;

            case "release":
                this.setRelease(val);
                break;
            
            default:
                break;
        }
    }

    setAttack = (val) => {
        this.props.setAttackTime(val);
        this.props.volumeEnv.envSettings.setAttack(val);
    }

    setDecay =(val) => {
        this.props.setDecayTime(val);
        this.props.volumeEnv.envSettings.setDecay(val);
    }

    setSustain = (val) => {
        this.props.setSustainLevel(val);
        this.props.volumeEnv.envSettings.setSustain(val);
    }

    setRelease = (val) => {
        this.props.setReleaseTime(val);
        this.props.volumeEnv.envSettings.setRelease(val);
    }


    render() {
        return(
            <ul className="mainknobrow group">
                <Knob
                    returnRawValue={this.scaleParameter}
                    returnScaledValue={this.setParameter}
                    setKnobAngle={this.descaleParameter(this.props.attackTime, 'attack')}
                    setScaledValue={this.props.attackTime}
                    param="attack">A
                </Knob>

                <Knob
                    returnRawValue={this.scaleParameter}
                    returnScaledValue={this.setParameter}
                    setKnobAngle={this.descaleParameter(this.props.decayTime, 'decay')}
                    setScaledValue={this.props.decayTime}
                    param="decay">D
                </Knob>

                <Knob
                    returnRawValue={this.scaleParameter}
                    returnScaledValue={this.setParameter}
                    setKnobAngle={this.descaleParameter(this.props.sustainLevel, 'sustain')}
                    setScaledValue={this.props.sustainLevel}
                    param="sustain">S
                </Knob>

                <Knob
                    returnRawValue={this.scaleParameter}
                    returnScaledValue={this.setParameter}
                    setKnobAngle={this.descaleParameter(this.props.releaseTime, 'release')}
                    setScaledValue={this.props.releaseTime}
                    param="release">R
                </Knob>
            </ul>
        );
    }  
}

const mapStateToProps = (state) => {
    return {
        attackTime: state.attackTime,
        decayTime: state.decayTime,
        sustainLevel: state.sustainLevel,
        releaseTime: state.releaseTime
    }
}

export default connect(mapStateToProps, actions)(EnvelopeControl);
