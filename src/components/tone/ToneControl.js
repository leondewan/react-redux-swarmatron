import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { ScalingMath } from '../utils/scalingMath';
import { Knob } from '../controls/Knob';
import { Distortioncurve } from '../utils/distortionCurve';


class ToneControl extends React.Component {
    
    componentWillMount () {
        this.scalingMath = new ScalingMath();
        
        this.scalingMap={
  			'cutoff':['binScale', 'revBinScale', 156, 6], 
  			'q': ['linScale', 'revLinScale', 24],
  			'track': ['linScale', 'revLinScale', 1],
            'filterEnv': ['linScale', 'revLinScale', 1],
            'dr': ['linScale', 'revLinScale', 400]
        }
    }    
    
    componentDidMount () {
        this.ribbonCutoff = 1;
        this.distortionCurve=new Distortioncurve(); 
        this.props.swOverdrive.oversample = '4x';
        this.props.swOverdrive.curve=this.distortionCurve.drawCurve(0);
    }
     
    componentDidUpdate(prevProps, prevState) {
       if(prevProps.centerTone!==this.props.centerTone){  
            this.setRibCut();
       }
    }

  	scaleParameter = (value, src) => {
  		let x=this.scalingMath[this.scalingMap[src][0]](value, this.scalingMap[src][2], this.scalingMap[src][3]);
		this.setParameter(x, src);
  	}

    descaleParameter = (value, src) => {
        return this.scalingMath[this.scalingMap[src][1]](value, this.scalingMap[src][2], this.scalingMap[src][3]);
    }

  	setParameter = (val, src) => { 
  		switch (src) {
  			case "cutoff":
  				this.setFilterKnobCutoff(val);
  				break;

  			case "q":
  				this.setFilterQ(val);
  				break;

  			case "track":
  				this.setFilterTrack(val);
  				break;

            case "filterEnv":
                this.setFilterEnv(val);
                break;

            case "dr":
                this.setDr(val);
                break;
  			
  			default:
  				break;
  		}
    }

    setRibCut = () => {
        this.ribbonCutoff= Math.pow(2,(this.props.s_filterTrack*this.props.centerTone/166.7));
        this.props.filter.frequency.value=this.props.s_filterKnobCutoff*this.ribbonCutoff; 
    }

    setFilterTrack = (val) => {
        this.props.setTrack(val);
    }

    setFilterQ = (val) => {
        this.props.setQ(val);
        this.props.filter.Q.value=val;
    }

    setFilterKnobCutoff = (val) => {
        this.knobCutoff=val;
        this.props.setKnobCutoff(val);
        this.props.filter.frequency.value=this.knobCutoff*this.ribbonCutoff;
    }

    setFilterEnv = (val) => {
        this.props.setFilterEnv(val);
        this.props.filtenv.envSettings.setFilterEnv(val);
    }

    setDr = (val) => { 
        this.props.setDr(val);
        this.props.swOverdrive.curve=this.distortionCurve.drawCurve(val); }
    
    render() {
        return(
            <div>
                <ul className="mainknobrow group">
                    <Knob
                        returnRawValue={this.scaleParameter}
                        returnScaledValue={this.setParameter}
                        setKnobAngle={this.descaleParameter(this.props.s_filterTrack, 'track')}
                        setScaledValue={this.props.s_filterTrack}
                        param="track">TR
                    </Knob>

                    <Knob
                        returnRawValue={this.scaleParameter}
                        returnScaledValue={this.setParameter}
                        setKnobAngle={this.descaleParameter(this.props.s_filterQ, 'q')}
                        setScaledValue={this.props.s_filterQ}
                        param="q">Q            
                    </Knob>

                    <Knob
                        returnRawValue={this.scaleParameter}
                        returnScaledValue={this.setParameter}
                        setKnobAngle={this.descaleParameter(this.props.s_filterKnobCutoff, 'cutoff')}
                        setScaledValue={this.props.s_filterKnobCutoff}
                        param="cutoff">FRQ            
                    </Knob>

                    <Knob 
                        returnRawValue={this.scaleParameter}
                        returnScaledValue={this.setParameter}
                        setKnobAngle={this.descaleParameter(this.props.s_filterEnv, 'filterEnv')}
                        setScaledValue={this.props.s_filterEnv}
                        param="filterEnv">N
                    </Knob>

                    <Knob
                        returnRawValue={this.scaleParameter}
                        returnScaledValue={this.setParameter}
                        setKnobAngle={this.descaleParameter(this.props.s_dr, 'dr')}
                        setScaledValue={this.props.s_dr}
                        param="dr">DR
                    </Knob>
                </ul>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        s_filterTrack: state.filterTrack,
        s_filterQ: state.filterQ,
        s_filterEnv: state.filterEnv,
        s_filterKnobCutoff: state.filterKnobCutoff,
        s_dr: state.dr,
        centerTone: state.centerTone
    }
}

export default connect(mapStateToProps, actions)(ToneControl);


