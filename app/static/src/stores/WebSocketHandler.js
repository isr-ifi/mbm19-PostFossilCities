const GameStateAcions = require('../actions/GameStateActions');
const SessionStoreActions = require('../actions/SessionStoreActions');
const Reflux = require('reflux');
var io = require('socket.io-client');
let socket;
const updateInterval = 5000;

/**
 * Stores validity of the token and checks it
 */
class WebSocketStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = SessionStoreActions;
        this.state = {init: true}
    }

    onValidToken(token) {
        if (!this.state.init) {
            return
        }
        socket = io({query: 
            {token: token}
        });
        socket.on('connect', () => {
            console.log('Connected');
            GameStateAcions.updateState();
            this.setState({init: false});
        });
        socket.on('update', (data) => {
            GameStateAcions.updateState();
        })
    }
}

module.exports = {webSocketStore: WebSocketStore};
