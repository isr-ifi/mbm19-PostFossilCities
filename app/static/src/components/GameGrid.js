import React from 'react';
import GridContainer from './GridContainer';
import {connect} from 'react-redux';

/**
 * Root Component, renders either token input or display elements
 */
class GameGridVisible extends React.Component {
    constructor(props) {
        super(props);
        this.calculateGridDimensions = this.calculateGridDimensions.bind(this);
    }

    calculateGridDimensions() {
        let maxWidth = 1;
        let maxHeight = 1;
        this.props.config.elements.components.forEach(item => {
            let x = parseInt(item.position.x);
            let y = parseInt(item.position.y);
            let height = parseInt(item.position.height);
            let width = parseInt(item.position.width);
            if (width + x > maxWidth) {
                maxWidth = width + x;
            }
            if (height + y > maxHeight) {
                maxHeight = height + y;
            }
        });
        return {width: maxWidth, height: maxHeight};
    }

    render() {
        if (this.props.loading || this.props.init) {
            return <p>loading</p>
        }
        var gridContainer = this.props.config.elements.components.map(item => {
            return <GridContainer name={item.name} key={item.name} position={item.position}/>
        })
        let gridDimensions = this.calculateGridDimensions();
        return ( 
            <div>
                {/* <h1>Game Config</h1>
                <p>{JSON.stringify(this.state)}</p> */}
                <div style={{display: 'grid', gridGap: '10px',gridTemplateColumns: 'repeat(' + gridDimensions.width + ', 1fr)', gridTemplateRows: 'repeat(' + gridDimensions.height + ', 1fr)', height: '100vh', width: '100vw'}}>
                    {gridContainer}
                </div>
            </div>
        );
    }
}

const mapStoreToProps = state => {
    return {
        loading: state.config.loading,
        init: state.config.init,
        config: state.config.config,
    }
}

const GameGrid = connect(mapStoreToProps)(GameGridVisible);
export default GameGrid;