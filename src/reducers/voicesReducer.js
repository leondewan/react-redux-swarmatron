import { SET_CENTERTONE, SET_SWARMINTERVAL } from '../actions/types';

const initialState = {centerTone: 100, swarmInterval: 0}

export default (state =  initialState, action) => {
    switch(action.type) {
        case SET_CENTERTONE:
            return {...state, centerTone: action.payload}
        case SET_SWARMINTERVAL:
            return {...state, swarmInterval: action.payload} 
        default:
            return state;       
    }
}