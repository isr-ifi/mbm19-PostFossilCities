const React = require('react');
const Reflux = require('reflux');
const TokenInput = require('./TokenInput');
const WebSocketStore = require('../stores/WebSocketHandler').webSocketStore;
const GameGrid = require('./GameGrid');
const SessionStore = require('../stores/SessionStore');

/**
 * Root Component, renders either token input or display elements
 */
class Game extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.stores = [SessionStore, WebSocketStore];
    }

    render() {
        if (this.state.loading) {
            return <p>loading</p>
        } else if (this.state.valid && !this.state.loading) {
            return <GameGrid/>
        } else {
            return <TokenInput/>
        }
    }
}


module.exports = Game;
