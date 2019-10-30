function fetchData(path, methodArguments) {
    const adress = "http://" + window.location.host + path;
    return fetch(adress, methodArguments).then(response => {
        return response.json();
    })
}

const Utils = {};
Utils.fetchData = fetchData;

module.exports = Utils;