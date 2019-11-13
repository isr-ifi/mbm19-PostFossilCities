const Reflux = require('reflux');
const Utils = require('../Utils');
const SessionStoreActions = require('../actions/SessionStoreActions');

/**
 * Stores validity of the token and checks it
 */
class SessionStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = SessionStoreActions;
        let cookieVal = Utils.getCookie('token');
        if (cookieVal) {
            this.state = { loading: true };
            Utils.checkToken(cookieVal);
        } else {
            this.state = {loading: false, valid: false };
        }
    }

    onInvalidToken() {
        this.setState({ loading: false, valid: false });
    }

    onValidToken(token) {
        document.cookie = "token=" + token;
        this.setState({ loading: false, valid: true, token: token });
    }

    onSetToken(token) {
        this.setState({loading: true});
        Utils.checkToken(token);
    }

}

module.exports = SessionStore;