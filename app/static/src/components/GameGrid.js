const React = require('react');
const Reflux = require('reflux');
const SetupStore = require('../stores/SetupStore');
const GridContainer = require('./GridContainer')

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
            var gridContainer = this.state.elements.map(item => {
                return <GridContainer name={item.name} key={item.name}/>
            })
            return ( 
                <div>
                    <h1>Game Config</h1>
                    <p>{JSON.stringify(this.state)}</p>
                    {gridContainer}
                </div>
            );
        }
    }
}


module.exports = GameGrid;
