// import { combineReducers } from 'redux';
// import toneReducer from './toneReducer';
// import envelopeReducer from './envelopeReducer';
// import voicesReducer from './voicesReducer';
// import voicesToggleReducer from './voicesToggleReducer';

// export default combineReducers({
//     tone: toneReducer,
//     envelope: envelopeReducer,
//     voices: voicesReducer,
//     voicestoggle: voicesToggleReducer
// });

import { 
    SET_CENTERTONE, SET_SWARMINTERVAL, 
    SET_VOICESTOGGLE,  
    SET_TRACK, SET_Q, SET_KNOB_CUTOFF, SET_FILTERENV, SET_DR,
    SET_ATTACKTIME, SET_DECAYTIME, SET_SUSTAINLEVEL, SET_RELEASETIME,
    LOAD_PRESETS
} from '../actions/types';

const initialState = {centerTone: 100, swarmInterval: 0,
    voicesToggle: [], 
    filterTrack: 0.75, filterQ: 12, filterKnobCutoff: 600, filterEnv: 0.75, dr: 20,
    attackTime:0.1, decayTime:0.2, sustainLevel:0.3, releaseTime:4.5
}

export default (state =  initialState, action) => {
    switch(action.type) {
        case SET_CENTERTONE:
            return {...state, centerTone: action.payload};
        case SET_SWARMINTERVAL:
            return {...state, swarmInterval: action.payload}; 
        case SET_VOICESTOGGLE:
            return {...state, voicesToggle: action.payload};
       
        case SET_TRACK:
            return {...state, filterTrack: action.payload};
        case SET_Q:
            return {...state, filterQ: action.payload};
        case SET_KNOB_CUTOFF:
            return {...state, filterKnobCutoff: action.payload};
        case SET_FILTERENV:
            return {...state, filterEnv: action.payload};
        case SET_DR:
            return {...state, dr: action.payload};
        case SET_ATTACKTIME:
            return {...state, attackTime: action.payload};
        case SET_DECAYTIME:
            return {...state, decayTime: action.payload};
        case SET_SUSTAINLEVEL:
            return {...state, sustainLevel: action.payload};
        case SET_RELEASETIME:
            return {...state, releaseTime: action.payload};
        case LOAD_PRESETS:
            return {...state, ...action.payload};    
        default:
            return state;
    }
}