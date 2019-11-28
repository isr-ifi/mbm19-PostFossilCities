const React = require('react');
const Reflux = require('reflux');
const Utils = require('../Utils');
const GameStateStoreFactory = require('../stores/GameStateStoreFactory');

/**
 * Renders data for one given name
 */
class GridContainer extends Reflux.Component {
    constructor(props) {
        super(props);
        const storeObject = GameStateStoreFactory(props.name)
        this.store = storeObject.store;
        this.storeActions = storeObject.actions;
    }

    componentDidMount() {
        this.storeActions.loadState(2020);
    }

    render() {
        if (this.state.loading) {
            return <p>loading</p>
        } else {
            return ( 
                <div>
                    <h1>{this.props.name}</h1>
                    <p>{JSON.stringify(this.state.data)}</p>
                </div>
            );
        }
    }
}


module.exports = GridContainer;