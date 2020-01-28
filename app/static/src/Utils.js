export function fetchData(path, methodArguments) {
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

export function fetchDataWithToken(path, methodArguments = {}) {
    methodArguments.token = getCookie('token')
    return fetchData(path, methodArguments)
}

export function fetchGameSetup() {
    return fetchDataWithToken('/setup/getSetup');
}

export function fetchGameData(name = "test") {
    return fetchDataWithToken('/progress/getValues/' + name)
}

export function checkToken(token) {
    return fetchData('/checkToken', { token: token || getCookie('token')})
}

export function getCookie(cookieName) {
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
Utils.fetchGameData = fetchGameData;

export default Utils;
