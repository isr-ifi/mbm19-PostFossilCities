const React = require('react');
const Reflux = require('reflux');
const TokenInput = require('./TokenInput');
const SetupStore = require('../stores/SetupStore');

/**
 * Root Component, renders either token input or display elements
 */
class GameGrid extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.store = SetupStore;
    }

    render() {
        if (this.state.loading) {
            return <p>loading</p>
        } else {
            return ( 
                <div>
                    <h1>Game Config</h1>
                    <p>{JSON.stringify(this.state)}</p>
                </div>
            );
        }
    }
}


module.exports = GameGrid;
