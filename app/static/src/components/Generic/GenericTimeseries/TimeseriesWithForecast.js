import React, { Component } from 'react';
// import {forEach} from "react-bootstrap/esm/utils/ElementChildren";

//// Create StyleKit Object

/**
 * GenericTimeseriesKit
 * --------------------
 *
 * Canvas for drawing canvas for generic timeseries
 *
 * @type {{}}
 */
var GenericTimeseriesKit = {};
(function() {

    //// Drawing Methods

    function drawTimeseries(canvas, title, y_label_text, settings, min_value, max_value, today, data, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 600, 320), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 600, resizedFrame.h / 320);


        // ----------------------------------------------------
        // Define Colors & Font
        // ----------------------------------------------------

        // Font
        var font_bold_s     = 'bold 11px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        var font_bold_m     = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        var font_bold_l     = 'bold 16px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';

        // Icon & Font Color
        var line_Color      = 'rgba(223, 223, 223, 1)';
        var icon_Color      = 'rgba(45, 47, 49, 1)';

        // Default Timeseries colors
        var colors          = [ 'rgba(199, 70, 40, 1)',
                                'rgba(82, 162, 204, 1)',
                                'rgba(127, 182, 74, 1)',
                                'rgba(249, 200, 52, 1)',
                                'rgba(237, 130, 42, 1)',
                                'rgba(41, 93, 164, 1)',
                                'rgba(38, 111, 46, 1)',
                                'rgba(146, 28, 227, 1)',
                               ];

        // Load defined colors
        var i = 0;
        settings.colors.forEach( element => {
            if (element.color) {
                colors[i] = element.color;
            }

            i += 1;
        });


        // ----------------------------------------------------
        // Data Declaration
        // ----------------------------------------------------

        var n_label         = settings.lines;

        // Data & Label
        // ------------

        var data_1 = data[0].values;
        var data_2 = data[1].values;
        var data_3 = data[2].values;
        var data_4 = data[3].values;

        var a_label = data[0].label;
        var b_label = data[1].label;
        var c_label = data[2].label;
        var d_label = data[3].label;



        // Date Labels
        // -----------
        var date_list = [];

        var gap = (data_1.length - 1) / 8;

        var date_1 = new Date(data_1[0].date);

        var i;

        // FIX JULIAN Check if value even exists before hand  
        for(i = 0; i < data_1.length; i += gap) {
            data_1[Math.round(i)] && date_list.push(new Date(data_1[Math.round(i)].date))
        }



        // Today Symbol
        // -------------------
        // Define start and end date
        var start_date = date_list[0];

        var end_date = date_list[date_list.length - 1];

        var today_date = new Date(today);

        // Calculate Percentage
        var date_percentage = (today_date.getTime() - start_date.getTime()) / (end_date.getTime() - start_date.getTime());

        var today = date_percentage * 520;


        //// Declaration of x labels
        var x_labels = [];


        // ----------------------------------------------------
        // Draw Legend
        // ----------------------------------------------------

        var position_x          = 56.5;
        var position_y          = 289.5;

        var oval_size           = 13;
        var font                = font_bold_m;

        var current_position    = 0;
        if (settings.colors.length >= 5) {
            position_y          -= 7;
            oval_size           -= 2;
            font                = font_bold_s
        }

        function draw_legend_entry(label, index) {

            // Draw Bubble
            // -----------
            oval(context, position_x, position_y, oval_size, oval_size);
            context.fillStyle = colors[index];
            context.fill();

            // Draw Label
            // ----------
            var labelRect = makeRect(position_x + 23, position_y, 89, oval_size);
            context.fillStyle = icon_Color;
            context.font = font;
            context.textAlign = 'left';
            var labelTotalHeight = oval_size * 1.3;
            context.fillText(label, labelRect.x, labelRect.y + 13 + labelRect.h / 2 - labelTotalHeight / 2);

            // Change Values
            // -------------
            position_x          += 135;
            current_position    += 1;

            if (current_position == 4) {
                position_x      = 56.5;
                position_y      += 18;
            }

        }

        settings.colors.forEach( (d, index) => {

            draw_legend_entry(settings.colors[index].label, index);

        });



        // ----------------------------------------------------
        // Draw Grid
        // ----------------------------------------------------

        //// Grid_Pattern Drawing
        context.save();
        context.translate(62, 62);

        var grid_PatternRect = makeRect(0, 0, 515, 190);
        context.save();
        context.beginPath();
        context.rect(grid_PatternRect.x, grid_PatternRect.y, grid_PatternRect.w, grid_PatternRect.h);
        context.clip();
        context.translate(grid_PatternRect.x, grid_PatternRect.y);

        GenericTimeseriesKit.drawGrid_Pattern(canvas, n_label, makeRect(0, 0, grid_PatternRect.w, grid_PatternRect.h), 'stretch');
        context.restore();

        context.restore();



        // ----------------------------------------------------
        // Draw Y Axis
        // ----------------------------------------------------

        // Data Declaration
        // ----------------
        var n_labels            = n_label;
        var label_space         = grid_PatternRect.h / (n_labels - 1);
        var label_position      = 246;


        // Draw Y Axis
        // -----------
        var i;
        for (i = 0; i < n_labels; i++) {
            var text = '' + Math.round((max_value - min_value) / (n_labels - 1) * i + min_value);

            var y_labelRect = makeRect(9, label_position, 41, 10);
            context.fillStyle = icon_Color;
            context.font = font_bold_m;
            context.textAlign = 'right';
            var y_Label_TotalHeight = 13 * 1.3;
            context.fillText(text, y_labelRect.x + y_labelRect.w, y_labelRect.y + 13 + y_labelRect.h / 2 - y_Label_TotalHeight / 2);

            label_position -= label_space;
        }



        // ----------------------------------------------------
        // Draw X Axis
        // ----------------------------------------------------

        // Calculate Years
        // ---------------
        var date_list           = [];
        var gap                 = (data[0].values.length - 1) / 8;

        var i;
        for(i = 0; i <= data[0].values.length; i += gap) {
            data[0].values[Math.round(i)] && date_list.push(new Date(data[0].values[Math.round(i)].date))
        }


        // Data Declaration
        // ----------------
        var position_x          = 46;
        var position_y          = 263;

        var gap                 = 64;


        // Draw X Label
        // ------------
        date_list.forEach( d => {
            var x_Label_Rect = makeRect(position_x, position_y, 36, 13);
            context.fillStyle = icon_Color;
            context.font = font_bold_m;
            context.textAlign = 'center';
            var x_Label_TotalHeight = 13 * 1.3;
            context.fillText(d.getFullYear(), x_Label_Rect.x + x_Label_Rect.w/2, x_Label_Rect.y + 13 + x_Label_Rect.h / 2 - x_Label_TotalHeight / 2);

            position_x          += gap;
        });


        // ----------------------------------------------------
        // Draw Timeseries
        // ----------------------------------------------------

        var width               = 515;




        // Draw Forecast
        // -------------
        function draw_timeseries_forecast(values, color) {

            context.save();
            context.translate(64, 250);

            context.beginPath();

            // Draw Datapoints
            var point_space = width / (data_1.length - 1);
            var point_position = 0;

            values.forEach(function (value, index) {

                    let y = (value.value - min_value) / (max_value - min_value) * -187;

                    if (index == 0) {
                        context.moveTo(point_position, y);
                    } else {
                        context.lineTo(point_position, y);
                    }

                    point_position += point_space;
                }
            );


            context.strokeStyle = color;
            context.lineWidth = 3;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.save();
            context.setLineDash([2, 6]);
            context.lineDashOffset = 0;
            context.stroke();
            context.restore();

            context.restore();

        }


        // Draw Past
        // ---------
        function draw_timeseries_past(values, color){

            function pastCanvasLayer(width, height) {
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                canvas.style.width = canvas.width/pixelRatio + 'px';
                canvas.style.height = canvas.height/pixelRatio + 'px';
                canvas.paintCodePixelRatio = pixelRatio;
                var context = canvas.getContext('2d');

                context.scale(pixelRatio, pixelRatio);


                // Draw Past Bezier
                // ----------------
                context.save();
                context.translate(64, 250);

                context.beginPath();

                // Draw Datapoints
                var point_space = 515 / (values.length - 1);
                var point_position = 0;

                values.forEach(function (value, index) {

                        let y = (value.value - min_value) / (max_value - min_value) * -187;

                        if (index == 0) {
                            context.moveTo(point_position, y);
                        } else {
                            context.lineTo(point_position, y);
                        }

                        point_position += point_space;
                    }
                );

                context.strokeStyle = color;
                context.lineWidth = 3;
                context.lineCap = 'round';
                context.lineJoin = 'round';
                context.stroke();

                context.restore();


                //// A_Past_Hide Drawing
                context.save();
                context.translate(64, 0);


                function past_HideCanvasLayer(width, height)
                {
                    var canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    canvas.style.width = canvas.width/pixelRatio + 'px';
                    canvas.style.height = canvas.height/pixelRatio + 'px';
                    canvas.paintCodePixelRatio = pixelRatio;
                    var context = canvas.getContext('2d');

                    context.scale(pixelRatio, pixelRatio);
                    context.beginPath();
                    context.rect(today, 0, 524, 320);
                    context.fillStyle = color;
                    context.fill();
                    return canvas;
                }

                context.save();
                context.globalCompositeOperation = 'destination-out';
                context.drawImage(past_HideCanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
                context.restore();

                context.restore();


                return canvas;
            }

            context.save();
            context.drawImage(pastCanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
            context.restore();


        }


        data.forEach( (d, index) => {

            draw_timeseries_forecast(d.values, settings.colors[index].color);
            draw_timeseries_past(d.values, settings.colors[index].color);


        });



        // ----------------------------------------------------
        // Draw Base Grid Line
        // ----------------------------------------------------

        context.beginPath();
        context.rect(62, 250, 515, 2);
        context.fillStyle = line_Color;
        context.fill();



        // ----------------------------------------------------
        // Draw Today Symbol
        // ----------------------------------------------------

        context.save();
        context.translate(13, -39);

        var today_SymbolRect = makeRect(today, 71, 100, 225);
        context.save();
        context.beginPath();
        context.rect(today_SymbolRect.x, today_SymbolRect.y, today_SymbolRect.w, today_SymbolRect.h);
        context.clip();
        context.translate(today_SymbolRect.x, today_SymbolRect.y);

        GenericTimeseriesKit.drawDate_Marker(canvas, 'Heute', makeRect(0, 0, today_SymbolRect.w, today_SymbolRect.h), 'stretch');
        context.restore();

        context.restore();


        //// Y_Label Drawing
        context.save();
        context.translate(5, 252);
        context.rotate(-90 * Math.PI / 180);

        var y_LabelRect = makeRect(0, 0, 202, 13);
        context.fillStyle = icon_Color;
        context.font = font_bold_m;
        context.textAlign = 'center';
        var y_LabelTotalHeight = 13 * 1.3;
        context.fillText(y_label_text, y_LabelRect.x + y_LabelRect.w/2, y_LabelRect.y + 13 + y_LabelRect.h / 2 - y_LabelTotalHeight / 2);

        context.restore();


        //// Chart_Title Drawing
        var chart_TitleRect = makeRect(0, 0, 600, 41);
        context.fillStyle = 'rgb(0, 0, 0)';
        context.font = font_bold_l;
        context.textAlign = 'center';
        var chart_TitleTotalHeight = 16 * 1.3;
        context.fillText(title, chart_TitleRect.x + chart_TitleRect.w/2, chart_TitleRect.y + 16 + chart_TitleRect.h / 2 - chart_TitleTotalHeight / 2);

        context.restore();

    }

    function drawDate_Marker(canvas, today_label_text, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 100, 225), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 100, resizedFrame.h / 225);

        var font_bold_m     = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Oval Drawing
        oval(context, 43, 210, 15, 15);
        context.fillStyle = icon_Color;
        context.fill();


        //// Rectangle Drawing
        roundedRect(context, 49, 25, 3, 194, 1.5);
        context.fillStyle = icon_Color;
        context.fill();


        //// Text Drawing
        var textRect = makeRect(0, 3, 100, 13);
        context.fillStyle = icon_Color;
        context.font = font_bold_m;
        context.textAlign = 'center';
        var textTotalHeight = 13 * 1.3;
        context.fillText(today_label_text, textRect.x + textRect.w/2, textRect.y + 13 + textRect.h / 2 - textTotalHeight / 2);

        context.restore();

    }

    function drawGrid_Pattern(canvas, n_lines = 6, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 511, 190), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 511, resizedFrame.h / 190);

        //// Color Declarations
        var line_Color = 'rgba(223, 223, 223, 1)';

        // Data Declaration

        var height        = resizedFrame.h;

        var line_position = {
            x:      0,
            y:      0
        };

        var i;
        for (i = 0; i < n_lines; i++) {
            context.beginPath();
            context.rect(line_position.x, line_position.y, 511, 2);
            context.fillStyle = line_Color;
            context.fill();

            line_position.y = line_position.y + (height / (n_lines - 1));
        }

        context.restore();

    }

    // ----------------------------------------------------
    // Infrastructure
    // ----------------------------------------------------

    function clearCanvas(canvas) {
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }

    // Possible arguments for 'resizing' parameter are:
    //   'aspectfit': The content is proportionally resized to fit into the target rectangle.
    //   'aspectfill': The content is proportionally resized to completely fill the target rectangle.
    //   'stretch': The content is stretched to match the entire target rectangle.
    //   'center': The content is centered in the target rectangle, but it is NOT resized.
    function applyResizingBehavior(resizing, rect, targetRect) {
        if (targetRect === undefined || equalRects(rect, targetRect) || equalRects(targetRect, makeRect(0, 0, 0, 0))) {
            return rect;
        }

        var scales = makeSize(0, 0);
        scales.w = Math.abs(targetRect.w / rect.w);
        scales.h = Math.abs(targetRect.h / rect.h);

        switch (resizing) {
            case 'aspectfit': {
                scales.w = Math.min(scales.w, scales.h);
                scales.h = scales.w;
                break;
            }
            case 'aspectfill': {
                scales.w = Math.max(scales.w, scales.h);
                scales.h = scales.w;
                break;
            }
            case 'stretch':
            case undefined:
                break;
            case 'center': {
                scales.w = 1;
                scales.h = 1;
                break;
            }
            default:
                throw 'Unknown resizing behavior "' + resizing + '". Use "aspectfit", "aspectfill", "stretch" or "center" as resizing behavior.';
        }

        var result = makeRect(Math.min(rect.x, rect.x + rect.w), Math.min(rect.y, rect.y + rect.h), Math.abs(rect.w), Math.abs(rect.h));
        result.w *= scales.w;
        result.h *= scales.h;
        result.x = targetRect.x + (targetRect.w - result.w) / 2;
        result.y = targetRect.y + (targetRect.h - result.h) / 2;
        return result;
    }

    function oval(context, x, y, w, h) {
        context.save();
        context.beginPath();
        context.translate(x, y);
        context.scale(w/2, h/2);
        context.arc(1, 1, 1, 0, 2*Math.PI, false);
        context.closePath();
        context.restore();
    }

    function roundedRect(context, x, y, w, h, r) {
        context.beginPath();
        context.arc(x+r, y+r, r, Math.PI, 1.5*Math.PI);
        context.arc(x+w-r, y+r, r, 1.5*Math.PI, 2*Math.PI);
        context.arc(x+w-r, y+h-r, r, 0, 0.5*Math.PI);
        context.arc(x+r, y+h-r, r, 0.5*Math.PI, Math.PI);
        context.closePath();
    }

    function makeRect(x, y, w, h) {
        return { x: x, y: y, w: w, h: h };
    }

    function equalRects(r1, r2) {
        return r1.x === r2.x && r1.y === r2.y && r1.w == r2.w && r1.h === r2.h;
    }

    function makeSize(w, h) {
        return { w: w, h: h };
    }

    function initializeCanvas(canvas) {
        if ('paintCodePixelRatio' in canvas) return canvas;
        // This function should only be called once on each canvas.
        var context = canvas.getContext('2d');

        var devicePixelRatio = window.devicePixelRatio || 1;
        var backingStorePixelRatio = context.webkitBackingStorePixelRatio
            || context.mozBackingStorePixelRatio
            || context.msBackingStorePixelRatio
            || context.oBackingStorePixelRatio
            || context.backingStorePixelRatio
            || 1;

        var pixelRatio = devicePixelRatio / backingStorePixelRatio;

        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
        canvas.width *= pixelRatio;
        canvas.height *= pixelRatio;
        canvas.paintCodePixelRatio = pixelRatio;

        context.scale(pixelRatio, pixelRatio);
        return canvas;
    }

    //// Public Interface

    // Drawing Methods for timeseries components
    GenericTimeseriesKit.drawTimeseries     = drawTimeseries;
    GenericTimeseriesKit.drawDate_Marker    = drawDate_Marker;
    GenericTimeseriesKit.drawGrid_Pattern   = drawGrid_Pattern;

    // Utilities for canvas
    GenericTimeseriesKit.clearCanvas = clearCanvas;
    GenericTimeseriesKit.makeRect = makeRect;

})();


/**
 *
 * TimeseriesWithForecast
 * ----------------------
 *
 * This Component renders the html canvas for the timeseries charts
 *
 * @props id            String:     ID of the generic timeseries chart
 * @props title         String:     Title of the generic timeseries chart (e.g. "verkehrsmittel im Personenverkehr")
 * @props today         Date:       Defines the current date of the simulation
 * @props y_axis        String:     Label of the y-axis (e.g. "Millionen Personenkilometer")
 * @props settings      Dictionary: Defines Settings for the chart (colors, labels, number of lines)
 * @props data          List:       Defines the timeseries data
 *
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
 * if the color element is not given, then standard colors for the timeseries are used.
 *
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
 */
class TimeseriesWithForecast extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id:         props.id,
            title:      props.title,
            today:      props.today,
            y_axis:     props.y_axis,
            settings:   props.settings,
        }
    }

    componentDidMount() {
        GenericTimeseriesKit.clearCanvas(this.state.id);
        GenericTimeseriesKit.drawTimeseries(
            this.state.id,
            this.state.title,
            this.state.y_axis,
            this.state.settings,
            this.props.y_min,
            this.props.y_max,
            this.props.today,
            this.props.data,

        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        GenericTimeseriesKit.clearCanvas(this.state.id);
        GenericTimeseriesKit.drawTimeseries(
            this.state.id,
            this.state.title,
            this.state.y_axis,
            this.state.settings,
            this.props.y_min,
            this.props.y_max,
            this.props.today,
            this.props.data,
        );
    }

    render() {
        return (
            <canvas id={this.state.id} width="600" height="320" />

        )
    }

}

export default TimeseriesWithForecast;
