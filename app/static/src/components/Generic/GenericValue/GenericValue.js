import React, { Component } from 'react';

import Value from './Value';
import {useSelector} from "react-redux";


/**
 * Generic Value
 * -------------
 *
 * This component loads the generic value visualization from an external file
 * This component subscribes to a storage for updating data
 *
 * @props id        String:     ID of the generic value
 * @props title     String:     Title of the generic value (e.g. "number of electric cars")
 * @props settings  Dictionary: Defines the appereance of the generic value chart
 *
 * settings dictionary:
 * --------------------
 *
 * example:
 * {
 *      min:                0,
 *      max:                400,
 *      unit:               'Tausend',
 *      separator:          '',
 *      colors: {
 *          start:          '',
 *          end:            ''
 *      },
 *      color_shift:        true,
 *      symbol_unit:        '',
 *
 *
 * }
 *
 * - min            Integer:    Defines the minimum value for the color shift (e.g. 0)
 * - max            Integer:    Defines the maximum value for the color shift (e.g. 100)
 * - unit           String:     Defines the value unit that is displayed below the value (e.g. 'millions')
 * - separator      String:     Defines the separator that separates big values -> (e.g. '\'' => 10000 -> 10'000 )
 * - colors         Dictionary: Defines the start and end color for the color shift
 * - color_shift    Boolean:    Defines if a color shift should be displayed (e.g. true)
 * - symbol_unit    Boolean:    Defines an optional symbolic unit that is displayed besides the value (e.g. '%')
 *
 *
 * colors dictionary:
 * ------------------
 *
 * example:
 *
 * {
 *      start:      {r: 0,      g: 255,     b: 0},
 *      end:        {r: 255,    g: 0,       b: 0}
 * }
 *
 * - start          Dictionary: Defines the start value of the color shift
 * - end            Dictionary: Defines the end value of the color shift
 *
 * @storage value   Float:      Defines the value that should be displayed
 *
 * @returns {*}
 * @constructor
 *
 * @visComp
 * @props {string} component_id [test_1]
 * @props {string} component_title [Anzahl Autos]
 * @props {dictionary} settings [{"settings": {"min":0, "max": 400, "unit": "Tausend", "separator": "", "colors": { "start": {"r": 191, "g": 80, "b": 81}, "end": {"r": 166, "g": 204, "b": 82}}, "color_shift": "true", "symbol_unit": ""}, "value": 300.4}]
 */
function GenericValue (props) {

    // Load values from props
    // ----------------------
    const id        = props.component_id;
    const title     = props.component_title;
    const settings  = props.settings;

    // Subscribe to storage
    // --------------------
    const value     = useSelector(state => state.data[id].data.value);

    return (
        <div className={"card card-small"}>
            <Value
                id          = { id }
                title       = { title }
                settings    = { settings }

                value       = { value }
            />
        </div>

    )


}

export default GenericValue
