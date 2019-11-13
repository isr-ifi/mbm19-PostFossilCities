const SessionStoreActions = require('./actions/SessionStoreActions');

function fetchData(path, methodArguments) {
    let adress = "http://" + window.location.host + path;
    if (methodArguments) {
        let queryArgs = "";
        Object.keys(methodArguments).forEach(key => {
            queryArgs += key + '=' + methodArguments[key] + '&'
        });
        adress += '?' + queryArgs;
    }
    return fetch(adress, methodArguments).then(response => {
        return response.json();
    })
}

function fetchGameSetup() {
    return fetchData('/setup/getSetup', { token: getCookie('token') }).then(res => {
        if (!res.valid) {
            SessionStoreActions.invalidToken(res.token);
        }
        return res;
    })
}

function checkToken(token) {
    return fetchData('/checkToken', { token: token || getCookie('token')}).then(res => {
        if (res.valid) {
            SessionStoreActions.validToken(res.token);
        } else {
            SessionStoreActions.invalidToken(res.token);
        }
    })
}

function getCookie(cookieName) {
    var name = cookieName + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

const Utils = {};
Utils.fetchGameSetup = fetchGameSetup;
Utils.getCookie = getCookie;
Utils.checkToken = checkToken;

module.exports = Utils;
