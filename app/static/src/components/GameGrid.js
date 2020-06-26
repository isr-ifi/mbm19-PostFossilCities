import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { componentDict } from './index';
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
    return { width: maxWidth, height: maxHeight };
}

/**
 * Based on the defined position calcualte its styling
 * @param {Object} position
 */
function getComponentStyling(position) {
    let result = {};

    // Note that the numeration in css grid starts with 1
    result.gridColumnStart = parseInt(position.x) + 1;
    result.gridColumnEnd = result.gridColumnStart + parseInt(position.width);
    result.gridRowStart = parseInt(position.y) + 1;
    result.gridRowEnd = result.gridRowStart + parseInt(position.height);
    return result;
}

function formatParameters(parameters) {
    if (Array.isArray(parameters)) {
        return parameters.map(parameter => (getSpecificValueObject(parameter))).reduce((acc, curr) => ({ ...acc, ...curr }));
    } else {
        return parameters;
    }
}

function getSpecificValueObject(parameter) {
    const valueObject = [
        { type: ['integer'], parameterName: parameter.parameter, value: +parameter.value },
        { type: ['dynamic'], parameterName: parameter.parameter, value: getDynamicOrDepententValue(parameter.value) },
        { type: ['dependent'], parameterName: getDependentParameterName(parameter.parameter), value: getDynamicOrDepententValue(parameter.value) },
        { type: ['callback', 'string'], parameterName: parameter.parameter, value: parameter.value },
        { type: ['boolean'], parameterName: parameter.parameter, value: parameter.value.toLowerCase() === 'true' },
        { type: ['dictionary'], parameterName: parameter.parameter, value: getDictionaryValue(parameter.value) }
    ].find(config => config.type.includes(parameter.type));

    return { [valueObject.parameterName]: valueObject.value };
}

function getDynamicOrDepententValue(value) {
    const machtingValue = [
        {condition: parseInt(value, 10), value: +value},
        {condition:  value.toLowerCase() === 'true', value: true},
        {condition: value.toLowerCase() === 'false', value: false}
    ].find(obj => !!obj.condition);

    return machtingValue ? machtingValue.value : value;
}

function getDictionaryValue(value) {
    try {
        return JSON.parse(parameter.value);
    } catch {
        return {};
    }
}

function getDependentParameterName(name) {
    const match = name.match(/(.*?)--(.*?)--(.*)/);
    return match ? match[1] : undefined;
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
    const config = useSelector(state => state.config.config.elements.gameConfiguration.find(config =>
        config.id === '1').views.find(view => view.id === '1').components);
    const dispatch = useDispatch();

    // Get Valid Containers
    let validComponents = config.filter(item => {
        // Explicitly check wether enabled is set to false or toolbox to true, if so do not show the component
        return (
            componentDict[item.type] !== undefined &&
            item.enabled !== false &&
            item.toolbox !== true
        );
    });

    // load data if not happened yet
    validComponents.forEach(element => {
        if (!dataInit[element.id]) {
            dispatch(fetchData(element.id));
            dataInit[element.id] = true;
        }
    });

    // Check if all data is ready
    let ready = validComponents.reduce((previous, current) => {
        return (
            previous &&
            data &&
            data[current.id] &&
            data[current.id].loading === false
        );
    }, true);

    if (!ready) {
        return <p>loading</p>;
    }

    // Construct the components
    let components = validComponents.map(item => {
        const Component = componentDict[item.type];
        let componentStyling = getComponentStyling(item.position);
        return (
            <div style={componentStyling} key={item.id}>
                <Component
                    title={item.title}
                    key={item.id}
                    id={item.id}
                    {...formatParameters(item.parameters)}
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
