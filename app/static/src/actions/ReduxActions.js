import Utils from '../Utils';
import io from 'socket.io-client';

let socket;

export const VALID_TOKEN = 'VALID_TOKEN';
export const INVALID_TOKEN = 'INVALID_TOKEN';
export const SET_TOKEN = 'SET_TOKEN';

export const REQUEST_CONFIG = 'REQUEST_CONFIG';
export const SET_CONFIG = 'SET_CONFIG';

export const REQUEST_DATA = 'REQUEST_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';

// REDUX ACTIONS:
// TOKEN

// Indicated the the token is valid
export function validToken(token) {
    return {
        type: VALID_TOKEN,
        token: token
    };
}

// Indicates that the token is invalid
export function invalidToken(token) {
    return {
        type: INVALID_TOKEN,
        token: token
    };
}

// Indicates that the user entered the token
export function setToken(token) {
    return {
        type: SET_TOKEN,
        token: token
    };
}

// CONFIG

// Indicates that for the token the corresponding config is loading
export function requestConfig(token) {
    return {
        type: REQUEST_CONFIG,
        token: token
    };
}

// Indicates that the config loaded and can be set
export function setConfig(token, config) {
    return {
        type: SET_CONFIG,
        token: token,
        config: config
    };
}

// DATA

// Indicates that the data for the given component id is loading
export function requestData(id) {
    return {
        type: REQUEST_DATA,
        id: id
    };
}

// Indicated that the data has been loaded for the given token
export function updateData(id, data) {
    return {
        type: UPDATE_DATA,
        id: id,
        data: data
    };
}

// Middle Ware for asynchronous server calls

/**
 * Update the current state for the given id with the currently set token
 * @param {string} id
 */
export function fetchData(id) {
    return function(dispatch) {
        dispatch(requestData(id));
        return Utils.fetchGameData(id).then(res => {
            dispatch(updateData(id, res));
        });
    };
}

/**
 * Set the config for a given token
 * @param {string} token
 */
export function fetchConfig(token) {
    return function(dispatch) {
        dispatch(requestConfig(token));
        return Utils.fetchGameSetup().then(res => {
            dispatch(setConfig(token, res));
        });
    };
}

/**
 * Asynchronous action to check whether a given token is valid or not,
 * then open he websocket and assign the callbacks for reloading data to it
 * @param {string} token
 */
export function checkToken(token) {
    return function(dispatch, getState) {
        dispatch(setToken(token));
        Utils.checkToken(token).then(res => {
            if (res.valid) {
                socket = io({ query: { token: token } });
                socket.on('connect', () => {
                    dispatch(validToken(token));
                    dispatch(fetchConfig(token));
                    console.log('Connected');
                });
                socket.on('update', data => {
                    console.log('Current Year: ' + data.year);
                    Object.keys(getState().data).forEach(key => {
                        dispatch(fetchData(key));
                    });
                });
            } else {
                dispatch(invalidToken(token));
            }
        });
    };
}
