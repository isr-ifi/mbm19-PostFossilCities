import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Index from './index';
import { fetchData } from '../actions/ReduxActions';

/**
 * Root Component, renders either token input or display elements
 */

let dataInit = {};

const ComponentDict = {
    GENERIC_VALUE: 'GenericValue',
    ROLLSPECIFIC_GOALS: 'RollspecificGoals',
    CARBON_BUDGET: 'CarbonBudget',
    GENERIC_ROLLS: 'GenericRolls',
    GENERIC_TIMESERIES: 'GenericTimeseries',
}

export default function GameGrid(props) {

    const loading = useSelector(state => state.config.loading);
    const init = useSelector(state => state.config.init);
    const data = useSelector(state => state.data);
    if (loading || init) {
        return <p>loading</p>
    }
    const config = useSelector(state => state.config.config.elements.component_setups);
    const dispatch = useDispatch();

    // Get Valid Containers
    let validComponents = config.filter(item => {
        return ComponentDict[item.component_type] !== undefined;
    })

    // load data if not happened yet
    validComponents.forEach(element => {
        if (!dataInit[element.component_id]) {
            dispatch(fetchData(element.component_id));
            dataInit[element.component_id] = true;
        }
    });

    // Check if all data is ready
    let ready = validComponents.reduce((previous, current) => {
        return previous && data && data[current.component_id] && (data[current.component_id].loading === false)
    }, true)

    if (!ready) {
        return <p>loading</p>
    }

    // Construct the components
    let components = validComponents.map(item => {
        const Component = Index[ComponentDict[item.component_type]]
        return <Component 
            component_title={item.component_title} 
            key={item.component_id} 
            component_id={item.component_id}
            {...item.component_settings}
        />
    })
    return ( 
        <div>
            <div>
                {components}
            </div>
        </div>
    );
}