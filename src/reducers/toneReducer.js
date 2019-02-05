import { SET_TRACK, SET_Q, SET_KNOB_CUTOFF, SET_FILTERENV, SET_DR, TEST_RESET_STATE } from "../actions/types";

const initState = {filterTrack: 0.75, filterQ: 12, filterKnobCutoff: 600, filterEnv: 0.75, dr: 20}
export default (state = initState, action) => {
    switch(action.type) {
        case SET_TRACK:
            return {...state, filterTrack: action.payload};
        case SET_Q:
            return {...state, filterQ: action.payload};
        case SET_KNOB_CUTOFF:
            return {...state, filterKnobCutoff: action.payload}
        case SET_FILTERENV:
            return {...state, filterEnv: action.payload}
        case SET_DR:
            return {...state, dr: action.payload}
        default:
            return state;
    }
}