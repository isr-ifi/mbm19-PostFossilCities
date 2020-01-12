const React = require('react');
const Reflux = require('reflux');
const SetupStore = require('../stores/SetupStore');
const GridContainer = require('./GridContainer')
const WebSocketHandler = require('../stores/WebSocketHandler');

/**
 * Root Component, renders either token input or display elements
 */
class GameGrid extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.store = SetupStore;

        this.calculateGridDimensions = this.calculateGridDimensions.bind(this);
    }

    calculateGridDimensions() {
        let maxWidth = 1;
        let maxHeight = 1;
        this.state.elements.components.forEach(item => {
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
        if (this.state.loading) {
            return <p>loading</p>
        }
        var gridContainer = this.state.elements.components.map(item => {
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


module.exports = GameGrid;
