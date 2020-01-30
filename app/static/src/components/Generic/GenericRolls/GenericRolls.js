import React, { Component } from 'react';

import RollBars from './RollBars';

// Import Redux
import {useSelector, useDispatch} from "react-redux";

/**
 *
 * Generic Rolls
 * -------------
 *
 * This component loads the generic rolls visualization from an external file
 * This component subscribes to a storage for updating data
 *
 * @props id                String:     ID of the generic roll chart
 * @props title             String:     Title of the generic roll chart (e.g. "actions per role")
 * @props yAxis             String:     Label of the y-axis (e.g. "number of actions")
 * @props settings          List:       Defines rolls and its colors
 *
 * settings dictionary:
 * --------------------
 *
 * example:
 * {
 *      politics:       ["rgba(199, 70, 40, 1)", "rgba(225, 116, 47, 1)"],
 *      energy:         ["rgba(249, 200, 52, 1)", "rgba(255, 248, 86, 1)"],
 *      investor:       ["rgba(90, 98, 100, 1)", "rgba(162, 170, 172, 1)"],
 *      population:     ["rgba(38, 111, 46, 1)", "rgba(167, 193, 85, 1)"],
 *      planer:         ["rgba(27, 73, 191, 1)", "rgba(106, 180, 236, 1)"],
 *      niche:          ["rgba(85, 44, 244, 1)", "rgba(146, 28, 227, 1)"],
 *      industry:       ["rgba(79, 54, 36, 1)", "rgba(181, 143, 96, 1)"],
 * }
 *
 * if the color element is not given, then standard colors for the rolls are used.
 * - politics:          red
 * - energy:            yellow
 * - investor:          grey
 * - population:        green
 * - planer:            blue
 * - niche:             violet
 * - industry           brown
 *
 * @storage data        Dictionary:     Defined the roll data
 *
 * data dictionary:
 * ----------------
 *
 * example:
 * {
 *      politics:       15,
 *      energy:         5,
 *      investor:       8,
 *      population:     13,
 *      planer:         16,
 *      niche:          10,
 *      industry:       4,
 * }
 *
 * If a datapoint is not defined, the roll isn't displayed on the visualization
 *
 *
 *
 * @returns {*}
 * @constructor
 *
 * @visComp
 * @props {string} component_id [generic_rolls_1]
 * @props {string} component_title [Getätigte klimarelevante Massnahmen]
 * @props {string} yAxis [Anzahl]
 * @props {dictionary} settings [{"politics": ["rgba(199, 70, 40, 1)", "rgba(225, 116, 47, 1)"], "energy": ["rgba(249, 200, 52, 1)", "rgba(255, 248, 86, 1)"], "investor": ["rgba(90, 98, 100, 1)", "rgba(162, 170, 172, 1)"], "population": ["rgba(38, 111, 46, 1)", "rgba(167, 193, 85, 1)"], "planer": ["rgba(27, 73, 191, 1)", "rgba(106, 180, 236, 1)"], "niche": ["rgba(85, 44, 244, 1)", "rgba(146, 28, 227, 1)"], "industry": ["rgba(79, 54, 36, 1)", "rgba(181, 143, 96, 1)"]}]
 */
function GenericRolls (props){

    // Load values from props
    // ----------------------
    const id            = props.component_id;
    const title         = props.component_title;
    const yAxis         = props.yAxis;
    const settings      = props.settings;


    // Subscribe to storage
    // --------------------

    // Patricks Version
    // const genericRolls  = useSelector(state => state.genericRolls);
    // const min           = useSelector(state => state.genericRolls[id].min);
    // const max           = useSelector(state => state.genericRolls[id].max);
    // const data          = useSelector(state => state.genericRolls[id].data);

    // const politics      = useSelector(state => state.genericRolls[id].data.politics);
    // const energy        = useSelector(state => state.genericRolls[id].data.energy);
    // const investor      = useSelector(state => state.genericRolls[id].data.investor);
    // const population    = useSelector(state => state.genericRolls[id].data.population);
    // const planer        = useSelector(state => state.genericRolls[id].data.planer);
    // const niche         = useSelector(state => state.genericRolls[id].data.niche);
    // const industry      = useSelector(state => state.genericRolls[id].data.industry);

    const min           = useSelector(state => state.data[id].data.min);
    const max           = useSelector(state => state.data[id].data.max);
    const data          = useSelector(state => state.data[id].data.data);

    const politics      = useSelector(state => state.data[id].data.politics);
    const energy        = useSelector(state => state.data[id].data.energy);
    const investor      = useSelector(state => state.data[id].data.investor);
    const population    = useSelector(state => state.data[id].data.population);
    const planer        = useSelector(state => state.data[id].data.planer);
    const niche         = useSelector(state => state.data[id].data.niche);
    const industry      = useSelector(state => state.data[id].data.industry);


        return (
            <div className={"card card-medium"}>

                    <RollBars
                        id              = {id}
                        settings        = {settings}
                        title           = {title}
                        yAxis           = {yAxis}
                        min             = {min}
                        max             = {max}
                        data            = {data}
                    />

            </div>
        )

}

export default GenericRolls
