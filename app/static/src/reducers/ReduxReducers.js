import {
    VALID_TOKEN,
    INVALID_TOKEN,
    SET_TOKEN,
    REQUEST_CONFIG,
    SET_CONFIG,
    UPDATE_DATA,
    REQUEST_DATA
} from '../actions/ReduxActions';

import { combineReducers } from 'redux';

// Reducers related to the token
function token(state = { loading: false, init: true }, action) {
    switch (action.type) {
        case VALID_TOKEN:
            document.cookie = 'token=' + action.token;
            return { token: action.token, valid: true, loading: false, init: false };
        case INVALID_TOKEN:
            return { token: action.token, valid: false, loading: false, init: true };
        case SET_TOKEN:
            return { token: action.token, valid: false, loading: true, init: true };
        default:
            return state;
    }
}

// Reducers related to the config
function config(state = { loading: false, action: {}, init: true }, action) {
    switch (action.type) {
        case SET_CONFIG:
            return { config: action.config, loading: false, init: false };
        case REQUEST_CONFIG:
            return { loading: true, init: true };
        default:
            return state;
    }
}

// Reducers related to the data
function data(state = {}, action) {
    switch (action.type) {
        case UPDATE_DATA:
            let partialState = {};
            partialState[action.id] = action.data;
            partialState[action.id].loading = false;
            return Object.assign({}, state, partialState);
        case REQUEST_DATA:
            return state;
        default:
            return state;
    }
}

const reducers = combineReducers({
    token,
    config,
    data
});

export default reducers;
