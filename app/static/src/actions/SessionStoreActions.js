const Reflux = require('reflux');

const Actions = Reflux.createActions(['invalidToken', 'validToken', 'setToken']);
module.exports = Actions;