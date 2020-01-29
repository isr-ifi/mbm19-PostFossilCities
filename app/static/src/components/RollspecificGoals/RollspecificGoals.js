import React from 'react';

import RollspecificRadialCharts from './RollspecificRadialCharts';

// Import Redux
import {useSelector, useDispatch} from "react-redux";


/**
 * RollspecificGoals
 * -----------------
 *
 * This component loads the rollspecific settings visualization from an external file
 * This component subscribes to a storage for updating data
 *
 * @param id                String:     ID of the rollspecific goal chart
 * @param title             String:     Title of the rollspecific goal chart (e.g. "Rollenziele")
 * @param goals             Dictionary: Defines the rolls and it rollspecific goal titles (e.g. "Rollenziele")
 * @param settings          Dictionary: Defines the rolls colors
 *
 * goals dictionary:
 * -----------------
 *
 * example:
 * {
 *      politics:           'Belietheit der Politik',
 *      energy:             'Energieversorgungsgrad',
 *      investor:           'ROI',
 *      population:         'Wohlbefinden',
 *      niche:              'Einfluss der Nischenspieler',
 *      industry:           'Profit der Industrie'
 *  }
 *
 * if the goal title is not given, then the roll isn't displayed
 *
 * important: with the order of the titles, the order of the displayed values are determined
 *
 * settings dictionary:
 * --------------------
 *
 * example:
 * {
 *      colors: {
 *          politics:       ["rgba(199, 70, 40, 1)", "rgba(225, 116, 47, 1)"],
 *          energy:         ["rgba(249, 200, 52, 1)", "rgba(255, 248, 86, 1)"],
 *          investor:       ["rgba(90, 98, 100, 1)", "rgba(162, 170, 172, 1)"],
 *          population:     ["rgba(38, 111, 46, 1)", "rgba(167, 193, 85, 1)"],
 *          planer:         ["rgba(27, 73, 191, 1)", "rgba(106, 180, 236, 1)"],
 *          niche:          ["rgba(85, 44, 244, 1)", "rgba(146, 28, 227, 1)"],
 *          industry:       ["rgba(79, 54, 36, 1)", "rgba(181, 143, 96, 1)"],
 *      },
 *      round_caps:         true,
 *      high_contrast:      false
 * }
 *
 * if the color element is not given, then standard colors for the rolls are used.
 * - politics:              red
 * - energy:                yellow
 * - investor:              grey
 * - population:            green
 * - planer:                blue
 * - niche:                 violet
 * - industry               brown
 *
 * Desription of other values:
 *
 * - round_caps:            Boolean:    Defines if the goal lines should have round or flat caps
 * - high_contast:          Boolean:    If true, there is no gradient in the lines
 *
 *
 * @storage data            Dictionary: Defines the roll data
 *
 * data dictionary:
 * ----------------
 *
 * example:
 * {
 *      politics:           { value: 0.30, speed: 2 },
 *      energy:             { value: 0.90, speed: 4 },
 *      investor:           { value: 0.50, speed: 5 },
 *      population:         { value: 0.80, speed: 3 },
 *      planer:             { value: 0.40, speed: 2 },
 *      niche:              { value: 0.60, speed: 2 },
 *      industry:           { value: 0.75, speed: 1 },
 * }
 *
 * In the dictionary there is an entry for every roll.
 * key: rollnames,  value: Dictionary (value, speed)
 *
 * The dictionary that defines the values for a roll consists of value and speed:
 *
 * value                    Float:      Percentage of the goal fulfillment (0.0 - 1.0)
 * speed                    Integer:    Defines the growing speed of the future goal fulfillment:
 *                                      1:  fast decrease
 *                                      2:  decrease
 *                                      3:  no significant change
 *                                      4:  increase
 *                                      5:  fast increase
 *
 * @returns {*}
 * @constructor
 *
 * @visComp
 * @props {string} component_id [rollspecific_goals_1]
 * @props {string} component_title [Erfüllungsgrad der Rollenziele]
 * @props {dictionary} goals [{"politics": "Belietheit der Politik", "energy": "Energie-_versorgungsgrad", "investor": "ROI", "population": "Wohlbefinden", "planer": "Ökologische Infrastuktur", "niche": "Einfluss der Nischenspieler", "industry": "Profit der Industrie"}]
 * @props {dictionary} settings [{"colors": {"politics": ["rgba(199, 70, 40, 1)", "rgba(225, 116, 47, 1)"], "energy": ["rgba(249, 200, 52, 1)", "rgba(255, 248, 86, 1)"], "investor": ["rgba(90, 98, 100, 1)", "rgba(162, 170, 172, 1)"], "population": ["rgba(38, 111, 46, 1)", "rgba(167, 193, 85, 1)"], "planer": ["rgba(27, 73, 191, 1)", "rgba(106, 180, 236, 1)"], "niche": ["rgba(85, 44, 244, 1)", "rgba(146, 28, 227, 1)"], "industry": ["rgba(79, 54, 36, 1)", "rgba(181, 143, 96, 1)"]}, "round_caps": "true", "high_contrast": "true"}]
 */
function RollspecificGoals (props) {

    // Load values from props
    // ----------------------
    const id            = props.component_id;
    const title         = props.component_title;
    const goals         = props.goals;
    const settings      = props.settings;

    // Subscribe to storage
    // --------------------
    const data          = useSelector(state => state.data[id].data);

    return (
        <div className={"card card-medium"}>
            <RollspecificRadialCharts
                id                      = { id }
                title                   = { title }
                goals                   = { goals }
                settings                = { settings }
                data                    = { data }
            />
        </div>
    )
}

export default RollspecificGoals
