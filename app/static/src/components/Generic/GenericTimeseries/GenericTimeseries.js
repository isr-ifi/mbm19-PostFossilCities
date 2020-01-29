import React, { Component } from 'react';

import TimeseriesWithForecast from './TimeseriesWithForecast';

// Import Redux
import {useSelector, useDispatch} from "react-redux";


/**
 *
 * GenericTimeseries
 * -----------------
 *
 * Components for collecting data and loading the canvas rendering component
 *
 * Data that do not change during the simulation are passed as props to the component.
 * Data that changes during the simulation are passed to the component with a storage.
 *
 * Data passed as props:
 * - title:         title of the component
 * - y_axis:        title of the y axis
 * - component id:  id of the instance of the timeseries chart
 *
 * Data passed by storage:
 * - min
 * - max
 * - today
 * - data
 *
 * @props id            String:     ID of the generic timeseries chart
 * @props title         String:     Title of the generic timeseries chart (e.g. "verkehrsmittel im Personenverkehr")
 * @props y_axis        String:     Label of the y-axis (e.g. "Millionen Personenkilometer")
 * @props settings      Dictionary: Defines Settings for the chart (colors, labels, number of lines)
 *
 *
 * settings Dictionary:
 * --------------------
 *
 * example:
 * {
 *      labels:  5,
 *      colors:  [{
 *              label: "Personenwagen",
 *              color: "rgba(199, 70, 40, 1)"
 *          }, {
 *              label: "Bus und Tram",
 *              color:  "rgba(27, 73, 191, 1)"
 *          }, {
 *              label: "Zug",
 *              color:  "rgba(146, 28, 227, 1)"
 *          }, {
 *              label: "Fuss und Velo",
 *              color:  "rgba(38, 111, 46, 1)"
 *          }]
 * }
 *
 *
 * if the color element is not given, then standard colors for the timeseries are used.
 *
 * @storage today       Date:       Defines the current date of the simulation
 * @storage min         Integer:    Defines the minimum value on the y axis
 * @storage max         Integer:    Defines the maximum value on the y axis
 * @storage data        List:       Defines the timeseries data
 *
 * data list:
 * ----------
 *
 * The list contains for every timeseries a dictionary.
 *
 * example
 * [{
 *     label: "Personenwagen",
 *     values: [{
 *         date: 1577833200000,
 *         value: 105.6
 *     },{
 *         date: 1609455600000,
 *         value: 106.8
 *     }]
 * },{
 *     label: "Zug",
 *     values: [{
 *         date: 1577833200000,
 *         value: 24.2
 *     },{
 *         date: 1609455600000,
 *         value: 28.4
 *     }]
 * }]
 *
 *
 * @returns {*}
 * @constructor
 *
 * @visComp
 * @props {string} component_id [generic_timeseries_1]
 * @props {string} component_title [Verkehrsmittel im Personenverkehr]
 * @props {string} y_axis [Millionen Personenkilometer]
 * @props {dictionary} settings [{"colors": [{"label": "Personenwagen", "color": "rgba(199, 70, 40, 1)"}, {"label": "Bus und Tram", "color":  "rgba(27, 73, 191, 1)"}, {"label": "Zug", "color":  "rgba(146, 28, 227, 1)"}, {"label": "Fuss und Velo", "color":  "rgba(38, 111, 46, 1)"}], "lines":  9}]
 */
function GenericTimeseries (props) {

    // Load values from props
    // ----------------------
    const id        = props.component_id;
    const title     = props.component_title;
    const y_axis    = props.y_axis;
    const settings  = props.settings;

    // Subscribe to storage
    // --------------------
    const today     = useSelector(state => state.data[id].data.today);
    const min       = useSelector(state => state.data[id].data.min);
    const max       = useSelector(state => state.data[id].data.max);
    const data      = useSelector(state => state.data[id].data.data);

    return (
        <div className={"card card-medium"}>
            <TimeseriesWithForecast
                id          = { id }
                title       = { title }
                y_axis      = { y_axis }
                settings    = { settings }
                today       = { today }

                y_min       = { min }
                y_max       = { max }
                data        = { data}
                label_1     = { data[0].label }
                data_1      = { data[0].values }
                label_2     = { data[1].label }
                data_2      = { data[1].values }
                label_3     = { data[2].label }
                data_3      = { data[2].values }
                label_4     = { data[3].label }
                data_4      = { data[3].values }
            />
        </div>
    )
}

export default GenericTimeseries
