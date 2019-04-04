import { SET_TRACK, SET_Q, SET_KNOB_CUTOFF,
    SET_FILTERENV, SET_DR,  SET_ATTACKTIME,
    SET_DECAYTIME, SET_SUSTAINLEVEL,
    SET_RELEASETIME, SET_CENTERTONE,
    SET_SWARMINTERVAL,
    SET_VOICESTOGGLE,
    LOAD_PRESETS} from "./types";

export const setTrack = (val) => {
    return {
        type: SET_TRACK,
        payload: val
    };
}

export const setQ = (val) => {
    return {
        type: SET_Q,
        payload: val
    };
}

export const setKnobCutoff = (val) => {
    return {
        type: SET_KNOB_CUTOFF,
        payload: val
    };
}

export const setFilterEnv = (val) => {
    return {
        type: SET_FILTERENV,
        payload: val
    };
}

export const setDr = (val) => {
    return {
        type: SET_DR,
        payload: val
    };
}

export const setAttackTime = (val) => {
    return {
        type: SET_ATTACKTIME,
        payload: val
    };
}

export const setDecayTime = (val) => {
    return {
        type: SET_DECAYTIME,
        payload: val
    };
}

export const setSustainLevel = (val) => {
    return {
        type: SET_SUSTAINLEVEL,
        payload: val
    }
}

export const setReleaseTime = (val) => {
    return {
        type: SET_RELEASETIME,
        payload: val
    }
}

export const setCenterTone = (val) => {
    return {
        type: SET_CENTERTONE,
        payload: val
    };
}

export const setSwarmInterval = (val) => {
    return {
        type: SET_SWARMINTERVAL,
        payload: val
    }
}

export const setVoicesToggle = (val) => {
    return {
        type: SET_VOICESTOGGLE,
        payload: val
    }
}

export const loadPresets = (val) => {
    return {
        type: LOAD_PRESETS,
        payload: val
    }
}
