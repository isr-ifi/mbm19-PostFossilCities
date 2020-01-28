import React from 'react';
import {connect} from 'react-redux';
import {fetchData} from '../actions/ReduxActions';
import LineGraph from './GenericTimeSeries/LineGraph';

/**
 * Renders data for one given name
 */
class GridContainerVisible extends React.Component {
    constructor(props) {
        super(props);
        this.getGridStyling = this.getGridStyling.bind(this);
        this.props.initialLoad(this.props.name);
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
        if (!this.props.data || !this.props.data[this.props.name] || this.props.data[this.props.name].loading) {
            return <p>loading</p>
        } else {
            let gridStyling = this.getGridStyling();
            return ( 
                <div style={gridStyling}>
                    <LineGraph
                        title={this.props.name}
                        data={this.props.data[this.props.name]}
                    />
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        data: state.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initialLoad: token => {
            dispatch(fetchData(token))
        }
    }
}

const GridContainer = connect(mapStateToProps, mapDispatchToProps)(GridContainerVisible)
export default GridContainer;