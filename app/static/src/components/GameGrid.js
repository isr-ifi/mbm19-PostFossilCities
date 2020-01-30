import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Index from './index';
import { fetchData } from '../actions/ReduxActions';

// Dict to save for which components we did the initial data load
let dataInit = {};

/**
 * Based on the components calculate how large the grid has to be
 * @param {Array} components
 */
function calculateGridDimensions(components) {
    let maxWidth = 1;
    let maxHeight = 1;
    components.forEach(item => {
        let x = parseInt(item.component_position.x);
        let y = parseInt(item.component_position.y);
        let height = parseInt(item.component_position.height);
        let width = parseInt(item.component_position.width);
        if (width + x > maxWidth) {
            maxWidth = width + x;
        }
        if (height + y > maxHeight) {
            maxHeight = height + y;
        }
    });
    return { width: maxWidth, height: maxHeight };
}

/**
 * Based on the defined position calcualte its styling
 * @param {Object} position
 */
function getComponentStyling(position) {
    let result = {};
    result.gridColumnStart = parseInt(position.x) + 1;
    result.gridColumnEnd = result.gridColumnStart + parseInt(position.width);
    result.gridRowStart = parseInt(position.y) + 1;
    result.gridRowEnd = result.gridRowStart + parseInt(position.height);
    return result;
}

/**
 * Renders the different components in their correct place
 * @param {Object} props
 */
export default function GameGrid(props) {
    const loading = useSelector(state => state.config.loading);
    const init = useSelector(state => state.config.init);
    const data = useSelector(state => state.data);
    if (loading || init) {
        return <p>loading</p>;
    }
    const config = useSelector(state => state.config.config.elements.component_setups);
    const dispatch = useDispatch();

    // Get Valid Containers
    let validComponents = config.filter(item => {
        // Explicitly check wether enabled is set to false or toolbox to true, if so do not show the component
        return (
            Index._componentDict[item.component_type] !== undefined &&
            item.enabled !== false &&
            item.toolbox !== true
        );
    });

    // load data if not happened yet
    validComponents.forEach(element => {
        if (!dataInit[element.component_id]) {
            dispatch(fetchData(element.component_id));
            dataInit[element.component_id] = true;
        }
    });

    // Check if all data is ready
    let ready = validComponents.reduce((previous, current) => {
        return (
            previous &&
            data &&
            data[current.component_id] &&
            data[current.component_id].loading === false
        );
    }, true);

    if (!ready) {
        return <p>loading</p>;
    }

    // Construct the components
    let components = validComponents.map(item => {
        const Component = Index[Index._componentDict[item.component_type]];
        let componentStyling = getComponentStyling(item.component_position);
        return (
            <div style={componentStyling} key={item.component_id}>
                <Component
                    component_title={item.component_title}
                    key={item.component_id}
                    component_id={item.component_id}
                    {...item.component_settings}
                />
            </div>
        );
    });

    let gridDimensions = calculateGridDimensions(validComponents);

    return (
        <div>
            <div
                style={{
                    display: 'grid',
                    gridGap: '10px',
                    gridTemplateColumns: 'repeat(' + gridDimensions.width + ', 1fr)',
                    gridTemplateRows: 'repeat(' + gridDimensions.height + ', 1fr)',
                    height: '100vh',
                    width: '100vw'
                }}
            >
                {components}
            </div>
        </div>
    );
}
