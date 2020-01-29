import Utils from '../Utils';
import io from 'socket.io-client';
let socket;

export const VALID_TOKEN = "VALID_TOKEN";
export const INVALID_TOKEN = "INVALID_TOKEN";
export const SET_TOKEN = "SET_TOKEN";

export const REQUEST_CONFIG = "REQUEST_CONFIG";
export const SET_CONFIG = "SET_CONFIG";

export const REQUEST_DATA = "REQUEST_DATA";
export const UPDATE_DATA = "UPDATE_DATA";

export function validToken(token) {
    return {
        type: VALID_TOKEN,
        token: token,
    }
}

export function invalidToken(token) {
    return {
        type: INVALID_TOKEN,
        token: token
    }
}

export function setToken(token) {
    return {
        type: SET_TOKEN,
        token: token
    }
}

export function requestConfig(token) {
    return {
        type: REQUEST_CONFIG,
        token: token,
    }
}

export function setConfig(token, config) {
    return {
        type: SET_CONFIG,
        token: token,
        config: config,
    }
}

export function requestData(id) {
    return {
        type: REQUEST_DATA,
        id: id,
    }
}

export function updateData(id, data) {
    return {
        type: UPDATE_DATA,
        id: id,
        data: data,
    }
}

export function fetchData(id) {
    return function (dispatch) {
        dispatch(requestData(id));
        return Utils.fetchGameData(id).then(res => {
            dispatch(updateData(id, res));
        })
    }
}

export function fetchConfig(token) {
    return function(dispatch) {
        dispatch(requestConfig(token));
        return Utils.fetchGameSetup().then(res => {
            dispatch(setConfig(token, res));
        })
    }
}

export function checkToken(token) {
    return function (dispatch, getState) {
        dispatch(setToken(token))
        Utils.checkToken(token).then(res => {
            if (res.valid) {
                socket = io({query: 
                    {token: token}
                });
                socket.on('connect', () => {
                    dispatch(validToken(token));
                    dispatch(fetchConfig(token));
                    console.log('Connected');
                });
                socket.on('update', (data) => {
                    console.log("Current Year: " + data.year);
                    Object.keys(getState().data).forEach(key => {
                        dispatch(fetchData(key))
                    })
                })
            } else {
                dispatch(invalidToken(token));
            }
        })
    }
}