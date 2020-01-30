import React, { Component } from 'react';

// Import Components
import CarbonGauge from './CarbonGauge'
import CarbonAreaChartNew from './CarbonAreaChartNew';

// Import Style
import './style.scss'

// Import Redux
import { useSelector } from "react-redux";

/**
 *
 * CarbonBudget
 * ------------
 *
 * This Component loads all elements of the carbon budget.
 *
 * The carbon budgets consists of two charts:
 * - Carbon Gauge (Glass)
 * - Carbon Emission Area (Area Chart)
 *
 *
 * @props id                        String:     Unique identifier of the visualization
 * @props carbon_gauge              Dictionary: Defines settings for the carbon gauge chart
 * @props carbon_area               Dictionary: Defines settings for the carbon area chart
 *
 *
 * carbon_gauge dictionaty:
 * ------------------------
 *
 * example:
 * {
 *      title:                      'Emissionen seit 2020',
 *      unit:                       'Megatonnen',
 *      emissions_label:            'Kumulierte Emissionen',
 *      critical_label:             'Kritischer Wert',
 *      year_label:                 ['Noch', 'Jahre'],
 *      settings: {
 *          colors: {
 *              light:              "rgba(94, 77, 50, 1)",
 *              dark:               "rgba(41, 21, 7, 1)"
 *          }
 *     }
 * }
 *
 * - title:                         String:     Defines the title of the chart (e.g. 'Emissionen seit 2020')
 * - unit:                          String:     Defines the unit of the emission values (e.g. 'Megatonnen')
 * - emission_label:                String:     Defines the label of the cumulated emissions (e.g. 'Kumulierte Emissionen')
 * - critical_label:                String:     Defines the label of the cricitcal value (e.g. 'Kritischer Wert')
 * - year_label:                    List:       Defines the values for display the years left to the critical value
 * - settings:                      Dictionary: Defines settings for the appereance of the carbon glass (liquid color)
 *
 *
 * carbon_area dictionary:
 * -----------------------
 *
 * example:
 *
 * {
 *      title:                      'Jährliche CO2 Quellen',
 *      y_axis:                     'Megatonnen CO2',
 *      settings: {
 *          colors: [
 *              {
 *                  label:          "Haushalte",
 *                  color:          ["rgba(106, 180, 236, 1)", "rgb(231,241,255)"],
 *                  capturing:      false,
 *              }, {
 *                  label:          "Transport",
 *                  color:          ["rgba(199, 70, 40, 1)", "rgb(255,236,234)"],
 *                  capturing:      false,
 *              }, {
 *                  label:          "Industrie",
 *                  color:          ["rgba(167, 193, 85, 1)", "rgb(243,255,240)"],
 *                  capturing:      false,
 *              }, {
 *                  label:          "Energy",
 *                  color:          ["rgba(249, 200, 52, 1)", "rgb(249,239,223)"],
 *                  capturing:      false,
 *              }, {
 *                  label:          "CO2 Rückgewinnung",
 *                  color:          ["rgba(146, 28, 227, 1)", "rgb(201,163,227)"],
 *                  capturing:      true,
 *              }],
 *              lines:              8,
 *              thickness:          2
 *      }
 *
 * }
 *
 * - title:                         String:     Defines the title of the chart (e.g. 'Emissionen seit 2020')
 * - y_axis:                        String:     Defines the title of the y_axis (e.g. 'Megatonnen CO2')
 * - settings:                      Dictionary: Defines settings for the appereance of the carbon area chart (colors, data appereance, lines)
 *
 *
 *
 * @returns {*}
 * @constructor
 *
 * @visComp
 * @props {string} component_id [carbon_budget_1]
 * @props {dictionary} carbon_gauge [{"title":"Emissionen seit 2020", "unit": "Megatonnen", "emissions_label": "Kumulierte Emissionen", "critical_label": "Kritischer Wert", "year_label": ["Noch", "Jahre"], "settings": {"colors": {"light": "rgba(94, 77, 50, 1)", "dark": "rgba(41, 21, 7, 1)"}}}]
 * @props {dictionary} carbon_area [{"title": "Jährliche CO2 Quellen", "y_axis": "Megatonnen CO2", "settings": {"colors": [{"label": "Haushalte", "color": ["rgba(106, 180, 236, 1)", "rgb(231,241,255)"], "capturing": false}, {"label": "Transport", "color": ["rgba(199, 70, 40, 1)", "rgb(255,236,234)"], "capturing": false}, {"label":"Industrie", "color": ["rgba(167, 193, 85, 1)", "rgb(243,255,240)"], "capturing": false}, {"label": "Energy", "color":["rgba(249, 200, 52, 1)", "rgb(249,239,223)"], "capturing": false}, {"label": "CO2 Rückgewinnung", "color": ["rgba(146, 28, 227, 1)", "rgb(201,163,227)"], "capturing": true}], "lines": 8, "thickness": 2}}]
 */
function CarbonBudget (props) {

    // declaration of static properties
    // --------------------------------

    // TODO: Note that I changed the code compared to Patricks so both area and gauge use the same data and differentiate by key gauge or area

    // - carbon gauge
    const carbon_gauge_id           = props.component_id;
    const carbon_gauge              = props.carbon_gauge;

    // - carbon area
    const carbon_area_id            = props.component_id;
    const carbon_area               = props.carbon_area;

    // Compiles the elements of the carbon budget
    // ------------------------------------------
    // - Carbon Gauge
    // - Carbon Emission Area Chart
    return (
        <div className={"card card-large"}>

            <div className={"card-content"}>
                <div className={"carbon-budget-left"}>

                    <CarbonGaugeLoader
                        id                      = { carbon_gauge_id }
                        carbon_gauge            = { carbon_gauge }
                    />

                </div>
                <div className={"carbon-budget-right"}>

                    <CarbonEmissionAreaChartNewLoader
                        id                      = { carbon_area_id }
                        carbon_area             = { carbon_area }
                    />

                </div>

            </div>
        </div>
    )
}

/**
 *
 * CarbonGaugeLoader
 * -----------------
 *
 * This component loads the carbon gauge from an external file.
 * This component subscribes to a storage for updating data.
 *
 * This component is separated from the carbon emission chart loader because with this architecture an independent update
 * of the components is possible without redrawing both charts.
 *
 *
 * @props id                        String:     ID of the carbon gauge
 * @props carbon_gauge              Dictionary: Defines settings for the carbon gauge chart
 *
 *
 * carbon_area dictionary:
 * -----------------------
 *
 * example:
 *
 * {
 *      title:                      'Jährliche CO2 Quellen',
 *      y_axis:                     'Megatonnen CO2',
 *      settings: {
 *          colors: [
 *              {
 *                  label:          "Haushalte",
 *                  color:          ["rgba(106, 180, 236, 1)", "rgb(231,241,255)"],
 *                  capturing:      false,
 *              }, {
 *                  label:          "Transport",
 *                  color:          ["rgba(199, 70, 40, 1)", "rgb(255,236,234)"],
 *                  capturing:      false,
 *              }, {
 *                  label:          "Industrie",
 *                  color:          ["rgba(167, 193, 85, 1)", "rgb(243,255,240)"],
 *                  capturing:      false,
 *              }, {
 *                  label:          "Energy",
 *                  color:          ["rgba(249, 200, 52, 1)", "rgb(249,239,223)"],
 *                  capturing:      false,
 *              }, {
 *                  label:          "CO2 Rückgewinnung",
 *                  color:          ["rgba(146, 28, 227, 1)", "rgb(201,163,227)"],
 *                  capturing:      true,
 *              }],
 *              lines:              8,
 *              thickness:          2
 *      }
 *
 * }
 *
 *
 * - title:                         String:     Defines the title of the chart (e.g. 'Emissionen seit 2020')
 * - y_axis:                        String:     Defines the title of the y_axis (e.g. 'Megatonnen CO2')
 * - settings:                      Dictionary: Defines settings for the appereance of the carbon area chart (colors, data appereance, lines)
 *
 *
 * settings Dictionary:
 * --------------------
 *
 * - colors:                        Dictionary: Defines the labels, colors and appereance of each timeseries.
 * - lines:                         Integer:    Deinfes the number of lines the chart has
 * - thickness:                     Integer:    Defines the line thickness of the timeseries
 *
 * colors Dictionary:
 * ------------------
 *
 * The order of the label definition in the LIst defines the order of the appereance.
 *
 * - label                          String:     Label of the timeseries
 * - color                          List:       Defines the colors of the timeseries
 *                                              - first color: Line & Past Area
 *                                              - second color: Future Area
 * - capturing                      Boolean:    Defines if the timeseries are emissions or capturing
 *
 * @storage carbonBudget            Dictionary: Defines the values that are displayed by the carbon gauge
 *
 * carbonBudget dictionary:
 * ------------------------
 *
 * - cumulated_emissions:           Integer:    Value of the Cumulated emissions
 * - critical_emissions:            Integer:    Value of the Ciritical emissions
 * - years_left:                    Integer:    Number of years for reaching the critical value
 * - year_speed:                    Integer:    Speed of emission growth 1: Fast Decrease
 *                                                                       2: Decrease
 *                                                                       3: Same Level
 *                                                                       4: Increase
 *                                                                       5: Fast Increase
 *
 *
 *
 * @returns {*}
 * @constructor
 */
function CarbonGaugeLoader (props) {

    // Load values from props
    // ----------------------
    const id                        = props.id;
    const carbon_budget_title       = props.carbon_gauge.title;
    const emission_unit             = props.carbon_gauge.unit;
    const emissions_label           = props.carbon_gauge.emissions_label;
    const carbon_budget_label       = props.carbon_gauge.critical_label;
    const settings                  = props.carbon_gauge.settings;

    // Subscribe to storage
    // --------------------

    // Patricks Version
    // const cumulated_emissions       = useSelector(state => state.carbonBudget[id].cumulated_emissions);
    // const critical_emissions        = useSelector(state => state.carbonBudget[id].critical_emissions);
    // const year_to_budget            = useSelector(state => state.carbonBudget[id].years_left);
    // const year_speed                = useSelector(state => state.carbonBudget[id].year_speed);

    const cumulated_emissions       = useSelector(state => state.data[id].data.gauge.cumulated_emissions);
    const critical_emissions        = useSelector(state => state.data[id].data.gauge.critical_emissions);
    const year_to_budget            = useSelector(state => state.data[id].data.gauge.years_left);
    const year_speed                = useSelector(state => state.data[id].data.gauge.year_speed);

    // Load Carbon Gauge
    // -----------------
    return (<CarbonGauge

            id                      = { id }
            carbon_budget_title     = { carbon_budget_title }
            emission_unit           = { emission_unit }
            emissions_label         = { emissions_label }
            carbon_budget_label     = { carbon_budget_label }
            settings                = { settings }

            cumulated_emissions     = { cumulated_emissions }
            critical_emissions      = { critical_emissions }
            year_to_budget          = { year_to_budget }
            year_speed              = { year_speed }
        />)
}

/**
 *
 * CarbonEmissionAreaChartLoader
 * -----------------------------
 *
 * This component loads the carbon area chart from an external file.
 * This component subscribes to a storage for updating data.
 *
 * This component is separated from the carbon gauge loader because with this architecture an independent update
 * of the components is possible without redrawing both charts.
 *
 * @props id                        String:     ID of the carbon area chart
 * @props carbon_area               Dictionary: ID of the carbon area chart
 *
 *
 * carbon_area dictionary:
 * -----------------------
 *
 * example:
 *
 * {
 *      title:                      'Jährliche CO2 Quellen',
 *      y_axis:                     'Megatonnen CO2',
 *      settings: {
 *          colors: [
 *              {
 *                  label:          "Haushalte",
 *                  color:          ["rgba(106, 180, 236, 1)", "rgb(231,241,255)"],
 *                  capturing:      false,
 *              }, {
 *                  label:          "Transport",
 *                  color:          ["rgba(199, 70, 40, 1)", "rgb(255,236,234)"],
 *                  capturing:      false,
 *              }, {
 *                  label:          "Industrie",
 *                  color:          ["rgba(167, 193, 85, 1)", "rgb(243,255,240)"],
 *                  capturing:      false,
 *              }, {
 *                  label:          "Energy",
 *                  color:          ["rgba(249, 200, 52, 1)", "rgb(249,239,223)"],
 *                  capturing:      false,
 *              }, {
 *                  label:          "CO2 Rückgewinnung",
 *                  color:          ["rgba(146, 28, 227, 1)", "rgb(201,163,227)"],
 *                  capturing:      true,
 *              }],
 *              lines:              8,
 *              thickness:          2
 *      }
 *
 * }
 *
 * - title:                         String:     Defines the title of the chart (e.g. 'Emissionen seit 2020')
 * - y_axis:                        String:     Defines the title of the y_axis (e.g. 'Megatonnen CO2')
 * - settings:                      Dictionary: Defines settings for the appereance of the carbon area chart (colors, data appereance, lines)
 *
 * settings Dictionary:
 * --------------------
 *
 * - colors:                        Dictionary: Defines the labels, colors and appereance of each timeseries.
 * - lines:                         Integer:    Deinfes the number of lines the chart has
 * - thickness:                     Integer:    Defines the line thickness of the timeseries
 *
 *
 * @storage today                   Date:       Defines the current date of the simulation
 * @storage min                     Integer:    Defines the minimum number on the y-axis (should be 0)
 * @storage max                     Integer:    Defines the maximum number on the y-axis
 * @storage timeseries              List:       Defines the values of the timeseries
 *
 * timeseries Dictionary:
 * ----------------------
 *
 * example:
 *
 * [{
 *      label:                      'Haushalte',
 *      values: [{
 *          date:                   1577833200000,
 *          value:                  51.31
 *      }, {
 *          date:                   1609455600000,
 *          value:                  34.35
 *      }],
 *      capturing:                  false
 * },{
 *      label:                      'CO2 Rückgewinnung',
 *      values: [{
 *          date:                   1577833200000,
 *          value:                  20.03
 *      }, {
 *          date:                   1609455600000,
 *          value:                  21.06
 *      }],
 *      capturing:                  true
 * }]
 *
 * - label:                         String:     Deifnes the label of the timeseries
 * - values:                        Dictionary: Defines the date and value of a datapoint
 * - capturing                      Boolean:    Deifnes weather a timeseries is emission or capturing
 *
 *
 * @returns {*}
 * @constructor
 */
function CarbonEmissionAreaChartNewLoader(props) {

    // Load values from props
    // ----------------------
    const id                        = props.id;
    const title                     = props.carbon_area.title;
    const y_axis                    = props.carbon_area.y_axis;
    const settings                  = props.carbon_area.settings;

    // Subscribe to storage
    // --------------------

    // Patricks Version
    // const today                     = useSelector(state => state.carbonBudget[id].today);
    // const min                       = useSelector(state => state.carbonBudget[id].min);
    // const max                       = useSelector(state => state.carbonBudget[id].max);
    // const timeseries                = useSelector(state => state.carbonBudget[id].timeseries);

    // const change                    = useSelector(state => state.carbonBudget[id].change);

    const today                     = useSelector(state => state.data[id].data.area.today);
    const min                       = useSelector(state => state.data[id].data.area.min);
    const max                       = useSelector(state => state.data[id].data.area.max);
    const timeseries                = useSelector(state => state.data[id].data.area.timeseries);

    const change                    = useSelector(state => state.data[id].data.area.change);

    return (
        <CarbonAreaChartNew
            id                      = { id }
            title                   = { title }
            y_axis                  = { y_axis }
            settings                = { settings }

            today                   = { today }
            min                     = { min }
            max                     = { max }
            timeseries              = { timeseries }
        />
    )

}

export default CarbonBudget
