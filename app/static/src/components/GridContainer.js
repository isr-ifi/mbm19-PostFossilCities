const React = require('react');
const Reflux = require('reflux');
const Utils = require('../Utils');
const GameStateStoreFactory = require('../stores/GameStateStoreFactory');
const LineGraph = require('./GenericTimeSeries/LineGraph')

/**
 * Renders data for one given name
 */
class GridContainer extends Reflux.Component {
    constructor(props) {
        super(props);
        const storeObject = GameStateStoreFactory(props.name)
        this.store = storeObject.store;
        this.storeActions = storeObject.actions;

        this.getGridStyling = this.getGridStyling.bind(this);
    }

    componentDidMount() {
        this.storeActions.loadState(2020);
    }

    getGridStyling() {
        let position = this.props.position;
        let result = {};
        result.gridColumnStart = parseInt(position.x) + 1;
        result.gridColumnEnd = result.gridColumnStart + parseInt(position.width);
        result.gridRowStart = parseInt(position.y) + 1;
        result.gridRowEnd = result.gridRowStart + parseInt(position.height);
        return result;
    }

    render() {
        if (this.state.loading) {
            return <p>loading</p>
        } else {
            let gridStyling = this.getGridStyling();
            let data = {};
            data[this.props.name] = this.state.data;
            return ( 
                <div style={gridStyling}>
                    <LineGraph
                        title={this.props.name}
                        data={data}
                    />
                </div>
            );
        }
    }
}


module.exports = GridContainer;