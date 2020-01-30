/**
 * Request the data for the given path/slug with given method Arguments
 * @param {String} path
 * @param {Object} methodArguments
 */
export function fetchData(path, methodArguments) {
    let adress = 'http://' + window.location.host + path;
    if (methodArguments) {
        let queryArgs = '';
        Object.keys(methodArguments).forEach(key => {
            queryArgs += key + '=' + methodArguments[key] + '&';
        });
        adress += '?' + queryArgs;
    }
    return fetch(adress, methodArguments).then(response => {
        return response.json();
    });
}

/**
 * Get the current token and then fetch data
 * @param {String*} path
 * @param {Object} methodArguments
 */
export function fetchDataWithToken(path, methodArguments = {}) {
    methodArguments.token = getCookie('token');
    return checkValid(fetchData(path, methodArguments));
}

/**
 * Fetch the game setup for the token currently in the cookies
 */
export function fetchGameSetup() {
    return checkValid(fetchDataWithToken('/setup/getSetup'));
}

/**
 * Get the current data for the given id
 * @param {String} id
 */
export function fetchGameData(id) {
    return checkValid(fetchDataWithToken('/progress/getValues/' + id));
}

/**
 * Check wether the token is valid or not
 * @param {String} token
 */
export function checkToken(token) {
    return fetchData('/checkToken', { token: token || getCookie('token') });
}

/**
 * Get the value for the given cookie name, returns empty string if no value found
 * @param {String} cookieName
 */
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

/**
 * Check whether re result returned by the supplied promise is valid based on the valid flag in it
 * @param {Promise} promise
 */
function checkValid(promise) {
    return promise.then(res => {
        if (!res.valid) {
            //delete token cookie and reload page if the server sent invalid
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            location.reload();
        }
        return res;
    });
}

const Utils = {};
Utils.fetchGameSetup = fetchGameSetup;
Utils.getCookie = getCookie;
Utils.checkToken = checkToken;
Utils.fetchGameData = fetchGameData;

export default Utils;
