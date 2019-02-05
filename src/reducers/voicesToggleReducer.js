import { SET_VOICESTOGGLE } from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
        case SET_VOICESTOGGLE:
            return action.payload;
        default:
            return state;
    }
}