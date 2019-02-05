import { SET_ATTACKTIME, SET_DECAYTIME, SET_SUSTAINLEVEL, SET_RELEASETIME }  from '../actions/types';

const initState = { attackTime:0.1, decayTime:0.2, sustainLevel:0.3, releaseTime:4.5 }

export default (state = initState, action) => {
    switch(action.type) {
        case SET_ATTACKTIME:
            return {...state, attackTime: action.payload};
        case SET_DECAYTIME:
            return {...state, decayTime: action.payload};
        case SET_SUSTAINLEVEL:
            return {...state, sustainLevel: action.payload};
        case SET_RELEASETIME:
            return {...state, releaseTime: action.payload};
        default:
            return state;
    }
}