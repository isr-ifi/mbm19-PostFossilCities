import React, { Component } from 'react';





//// Create StyleKit Object
var CarbonArea = {};
(function() {

    //// Drawing Methods

    function drawTimeseries(canvas, title, y_label_text, min_value, max_value, today, settings, data, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 600, 500), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 600, resizedFrame.h / 500);


        // ----------------------------------------------------
        // Define Colors & Font
        // ----------------------------------------------------

        // Font
        var font_bold_s     = 'bold 11px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        var font_bold_m     = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        var font_bold_l     = 'bold 16px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';

        // Icon & Font Color
        var text_Color_Secondary = 'rgba(99, 105, 110, 1)';
        var text_Color_Secondary_Light = 'rgba(220, 221, 222, 1)';
        var icon_Color = 'rgba(45, 47, 49, 1)';



        //// Default Timeseries colors
        var a_Color = 'rgba(62, 165, 220, 1)';
        var a_Color_Light = 'rgba(214, 233, 246, 1)';

        var b_Color = 'rgba(213, 71, 71, 1)';
        var b_Color_Light = 'rgba(244, 214, 215, 1)';

        var c_Color = 'rgba(59, 220, 123, 1)';
        var color = 'rgba(215, 247, 225, 1)';

        var d_Color = 'rgba(242, 206, 49, 1)';
        var d_Color_light = 'rgba(251, 244, 212, 1)';



        // ----------------------------------------------------
        // Data Declaration
        // ----------------------------------------------------


        var line_thickness  = 3;

        if (settings.thickness) {
            line_thickness = settings.thickness;
        }


        // Data
        var data_1          = data[0].values;
        var data_2          = data[1].values;
        var data_3          = data[2].values;
        var data_4          = data[3].values;
        var data_z          = data[4].values;



        //// Date Labels
        var date_list = [];

        var gap = (data_1.length - 1) / 8;

        var date_1 = new Date(data_1[0].date);

        var i;
        for(i = 0; i <= data_1.length; i += gap) {
            data_1[Math.round(i)] && date_list.push(new Date(data_1[Math.round(i)].date))
        }


        //// Today Date to Pixel

        // Define start and end date
        var start_date = date_list[0];

        var end_date = date_list[date_list.length - 1];

        var today_date = new Date(today);

        // Calculate Percentage
        var date_percentage = (today_date.getTime() - start_date.getTime()) / (end_date.getTime() - start_date.getTime());

        var today = date_percentage * 520;


        // Declaration of Statistics

        // Calculate current netto emissions
        var data_position = Math.round(date_percentage * (data_1.length - 1));

        // FIX Julian Make more resilient, avoid out of bounds error
        data_position = Math.min(data_position, data_1.length - 1);

        var netto_emissions = data_1[data_position].value + data_2[data_position].value + data_3[data_position].value + data_4[data_position].value + data_z[data_position].value;

        // Calculate total netto emissions
        var cumulated_emissions = 0;

        var i = 0;
        for (i = 0; i < data_position; i++) {
            cumulated_emissions += data_1[i].value + data_2[i].value + data_3[i].value + data_4[i].value + data_z[i].value;
        }



        // ----------------------------------------------------
        // Draw Legend
        // ----------------------------------------------------


        // Data Declaration
        // ----------------

        var n_label             = settings.lines;

        var position_x          = 59;
        var position_y          = 400;

        var oval_size           = 13;
        var font                = font_bold_m;

        var n_emission          = 0;
        var n_capturing         = 0;

        settings.colors.forEach( entry => {
            if (entry.capturing) {
                n_capturing     += 1;
            }
            else {
                n_emission      += 1;
            }
        });

        var current_position    = 0;

        if (n_emission >= 5 || n_capturing >= 5) {
            position_y          -= 7;
            oval_size           -= 2;
            font                = font_bold_s
        }

        // Draw Function
        // -------------
        function draw_legend_entry(label, index) {

            // New Line
            // --------
            if (current_position > 1 && current_position % 4 == 0) {
                position_x      = 59;
                position_y      += 20;
            }

            // Draw Bubble
            // -----------
            oval(context, position_x, position_y, oval_size, oval_size);
            context.fillStyle = settings.colors[index].color;
            context.fill();

            // Draw Label
            // ----------
            var labelRect = makeRect(position_x + 19, position_y + 2, 89, oval_size);
            context.fillStyle = icon_Color;
            context.font = font;
            context.textAlign = 'left';
            var labelTotalHeight = oval_size * 1.3;
            context.fillText(label, labelRect.x, labelRect.y + 11 + labelRect.h / 2 - labelTotalHeight / 2);

            // Change Values
            // -------------
            position_x          += 135;
            current_position    += 1;

        }

        // Carbon Emissions
        // ----------------
        settings.colors.forEach( (entry, index) => {
            if(!entry.capturing) {
                draw_legend_entry(entry.label, index);
            }
        });


        // Gap Line
        // --------

        position_y              += 30;

        context.beginPath();
        context.moveTo(59, position_y);
        context.lineTo(579, position_y);
        context.strokeStyle = icon_Color;
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.stroke();


        // Carbon Capturing
        // ----------------
        position_x          = 58.5;
        position_y          += 15;
        current_position    = 0;
        settings.colors.forEach( (entry, index) => {
            if(entry.capturing) {
                draw_legend_entry(entry.label, index);
            }
        });





        // ----------------------------------------------------
        // Draw Y Axis
        // ----------------------------------------------------


        // Data Declaration
        // ----------------
        var width               = 520;
        var label_height        = 283;
        var n_neg_labels        = Math.round(0.25 * n_label);
        var n_pos_labels        = Math.round(0.75 * n_label);
        var label_space         = label_height / (settings.lines - 1);
        var label_position      = 339;


        // Negative Labels
        // ---------------
        var i;
        for (Math.round(i = (n_neg_labels)); i > 0; i--) {
            var text = '' + Math.round(-1 *(max_value - min_value) / (n_pos_labels - 1) * i + min_value);

            var y_LabelRect = makeRect(6, label_position, 41, 10);
            context.fillStyle = icon_Color;
            context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
            context.textAlign = 'right';
            var y_Label_TotalHeight = 13 * 1.3;
            context.fillText(text, y_LabelRect.x + y_LabelRect.w, y_LabelRect.y + 13 + y_LabelRect.h / 2 - y_Label_TotalHeight / 2);

            label_position -= label_space;
        }

        // Positive Labels
        // ---------------
        var i;
        for (i = 0; i < n_pos_labels; i++) {
            var text = '' + Math.round((max_value - min_value) / (n_pos_labels - 1) * i + min_value);


            var y_LabelRect = makeRect(6, label_position, 41, 10);
            context.fillStyle = icon_Color;
            context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
            context.textAlign = 'right';
            var y_Label_TotalHeight = 13 * 1.3;
            context.fillText(text, y_LabelRect.x + y_LabelRect.w, y_LabelRect.y + 13 + y_LabelRect.h / 2 - y_Label_TotalHeight / 2);

            label_position -= label_space;

        }


        // ----------------------------------------------------
        // Draw Timeseries Lines
        // ----------------------------------------------------

        // Data Declaration
        // ----------------


        // Draw Forecast
        // -------------
        function draw_timeseries_forecast(index, area) {

            context.save();
            context.translate(61, 190);

            context.beginPath();
            if (area) {
                context.moveTo(520, 75.5);
                context.lineTo(0, 75.5);
            }

            // Draw Datapoints
            var point_space = width / (data[index].values.length - 1);
            var point_position = 0;

            data[index].values.forEach(function (v, i) {

                var stacked_values = 0

                var j;
                for (j = 0; j <= index; j++) {
                    if (settings.colors[index].capturing == settings.colors[j].capturing)
                    stacked_values += data[j].values[i].value;
                }

                let y = 74;

                if (settings.colors[index].capturing) {
                    y = (-1 * (stacked_values - min_value) / (max_value - min_value) * -201 + 77);
                }
                else {
                    y = ((stacked_values - min_value) / (max_value - min_value) * -201) + 74;
                }

                context.lineTo(point_position, y);

                point_position += point_space;

            });

            if (area) {
                context.fillStyle = settings.colors[index].color[1];
                context.fill();
            }

            context.strokeStyle = settings.colors[index].color[0];
            context.lineWidth = line_thickness;
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
        function draw_timeseries_past(index, area){


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
                context.beginPath();

                if (area) {
                    context.moveTo(61, 264);
                }

                // Draw Datapoints
                var point_space = 520 / (data[index].values.length - 1);
                var point_position = 61;

                data[index].values.forEach(function (v, i) {

                    var stacked_values = 0

                    var j;
                    for (j = 0; j <= index; j++) {
                        if (settings.colors[index].capturing == settings.colors[j].capturing)
                            stacked_values += data[j].values[i].value;
                    }

                    let y = 264;

                    if (settings.colors[index].capturing) {
                        y = (-1 * (stacked_values - min_value) / (max_value - min_value) * -201 + 267);
                    }
                    else {
                        y = ((stacked_values - min_value) / (max_value - min_value) * -201) + 264;
                    }

                    context.lineTo(point_position, y);

                    point_position += point_space;

                });



                context.lineTo(581, 264);

                if (area) {
                    context.fillStyle = settings.colors[index].color[0];
                    context.fill();
                }

                context.strokeStyle = settings.colors[index].color[0];
                context.lineWidth = line_thickness;
                context.lineCap = 'round';
                context.lineJoin = 'round';
                context.stroke();


                // Draw Hide Layer
                // ---------------
                context.save();
                context.translate(61, 49);


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
                    context.rect(today, -47, 524, 500);
                    context.fillStyle = 'rgb(128, 128, 128)';
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

        var i;
        for (i = (data.length - 1); i >= 0; i--) {
            draw_timeseries_forecast(i, true);
            draw_timeseries_past(i, true);
        }


        // ----------------------------------------------------
        // Draw Grid
        // ----------------------------------------------------

        //// Grid_Pattern Drawing
        context.save();
        context.translate(59, 346);

        var grid_PatternRect = makeRect(0, -284, 522, 284);
        context.save();
        context.beginPath();
        context.rect(grid_PatternRect.x, grid_PatternRect.y, grid_PatternRect.w, grid_PatternRect.h);
        context.clip();
        context.translate(grid_PatternRect.x, grid_PatternRect.y);

        CarbonArea.drawGridpattern(canvas, settings.lines, makeRect(0, 0, grid_PatternRect.w, grid_PatternRect.h), 'stretch');
        context.restore();

        context.restore();

        // ----------------------------------------------------
        // Draw Timeseries Area
        // ----------------------------------------------------

        var i;
        for (i = (data.length - 1); i >= 0; i--) {
            draw_timeseries_past(i, true);
        }

        var i;
        for (i = (data.length - 1); i >= 0; i--) {
            draw_timeseries_forecast(i, false);
            draw_timeseries_past(i, false);
        }

        // ----------------------------------------------------
        // Draw Base Grid Line
        // ----------------------------------------------------

        roundedRect(context, 58, 264, 526, 3, 1.5);
        context.fillStyle = icon_Color;
        context.fill();


        // ----------------------------------------------------
        // Draw Today Symbol
        // ----------------------------------------------------
        context.save();
        context.translate(12, -8);

        var today_SymbolRect = makeRect(today, 40, 100, 320);
        context.save();
        context.beginPath();
        context.rect(today_SymbolRect.x, today_SymbolRect.y, today_SymbolRect.w, today_SymbolRect.h);
        context.clip();
        context.translate(today_SymbolRect.x, today_SymbolRect.y);

        CarbonArea.drawDateMarker(canvas, 'Heute', makeRect(0, 0, today_SymbolRect.w, today_SymbolRect.h), 'stretch');
        context.restore();

        context.restore();


        // ----------------------------------------------------
        // Draw Y Label
        // ----------------------------------------------------
        context.save();
        context.translate(6, 346);
        context.rotate(-90 * Math.PI / 180);

        var y_LabelRect = makeRect(0, 0, 284, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var y_LabelTotalHeight = 13 * 1.3;
        context.fillText(y_label_text, y_LabelRect.x + y_LabelRect.w/2, y_LabelRect.y + 13 + y_LabelRect.h / 2 - y_LabelTotalHeight / 2);

        context.restore();


        // ----------------------------------------------------
        // Draw Chart Title
        // ----------------------------------------------------
        var chart_TitleRect = makeRect(0, 0, 600, 41);
        context.fillStyle = 'rgb(0, 0, 0)';
        context.font = 'bold 16px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var chart_TitleTotalHeight = 16 * 1.3;
        context.fillText(title, chart_TitleRect.x + chart_TitleRect.w/2, chart_TitleRect.y + 16 + chart_TitleRect.h / 2 - chart_TitleTotalHeight / 2);


        //// Symbol Drawing
        context.save();
        context.translate(43, 372);

        var symbolRect = makeRect(0, -13, 557, 13);
        context.save();
        context.beginPath();
        context.rect(symbolRect.x, symbolRect.y, symbolRect.w, symbolRect.h);
        context.clip();
        context.translate(symbolRect.x, symbolRect.y);



        CarbonArea.drawXLabels(canvas, date_list, makeRect(0, 0, symbolRect.w, symbolRect.h), 'stretch');
        context.restore();

        context.restore();


        context.restore();

    }

    function drawDateMarker(canvas, today_label_text, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 100, 320), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 100, resizedFrame.h / 320);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Oval Drawing
        oval(context, 43, 226, 15, 15);
        context.fillStyle = icon_Color;
        context.fill();


        //// Rectangle Drawing
        roundedRect(context, 49, 25, 3, 295, 1.5);
        context.fillStyle = icon_Color;
        context.fill();


        //// Text Drawing
        var textRect = makeRect(0, 3, 100, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var textTotalHeight = 13 * 1.3;
        context.fillText(today_label_text, textRect.x + textRect.w/2, textRect.y + 13 + textRect.h / 2 - textTotalHeight / 2);

        context.restore();

    }

    function drawGridpattern(canvas, n_grid_lines = 8, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 520, 284), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 520, resizedFrame.h / 284);

        // Color Declarations
        // ------------------
        var line_Color = 'rgba(223, 223, 223, 1)';

        // Data Declaration
        // ----------------
        var height        = resizedFrame.h - 2;


        var line_position = {
            x:      0,
            y:      0
        };

        var i;
        for (i = 0; i < n_grid_lines; i++) {


            context.beginPath();
            context.rect(line_position.x, line_position.y, 520, 2);
            context.fillStyle = line_Color;
            context.fill();

            line_position.y = line_position.y + (height / (n_grid_lines - 1));
        }

        context.restore();



    }

    function drawXLabels(canvas, date_list, targetFrame, resizing) {

        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 557, 13), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 557, resizedFrame.h / 13);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// X_Label_Group
        //// X_Label_01 Drawing
        var x_Label_01Rect = makeRect(0, 0, 37, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_01TotalHeight = 13 * 1.3;
        context.fillText(date_list[0].getFullYear(), x_Label_01Rect.x + x_Label_01Rect.w/2, x_Label_01Rect.y + 13 + x_Label_01Rect.h / 2 - x_Label_01TotalHeight / 2);


        //// X_Label_02 Drawing
        var x_Label_02Rect = makeRect(65, 0, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_02TotalHeight = 13 * 1.3;
        context.fillText(date_list[1].getFullYear(), x_Label_02Rect.x + x_Label_02Rect.w/2, x_Label_02Rect.y + 13 + x_Label_02Rect.h / 2 - x_Label_02TotalHeight / 2);


        //// X_Label_ 2 Drawing
        var x_Label_2Rect = makeRect(130, 0, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_2TotalHeight = 13 * 1.3;
        context.fillText(date_list[2].getFullYear(), x_Label_2Rect.x + x_Label_2Rect.w/2, x_Label_2Rect.y + 13 + x_Label_2Rect.h / 2 - x_Label_2TotalHeight / 2);


        //// X_Label_ 3 Drawing
        var x_Label_3Rect = makeRect(195, 0, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_3TotalHeight = 13 * 1.3;
        context.fillText(date_list[3].getFullYear(), x_Label_3Rect.x + x_Label_3Rect.w/2, x_Label_3Rect.y + 13 + x_Label_3Rect.h / 2 - x_Label_3TotalHeight / 2);


        //// X_Label_ 4 Drawing
        var x_Label_4Rect = makeRect(260, 0, 37, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_4TotalHeight = 13 * 1.3;
        context.fillText(date_list[4].getFullYear(), x_Label_4Rect.x + x_Label_4Rect.w/2, x_Label_4Rect.y + 13 + x_Label_4Rect.h / 2 - x_Label_4TotalHeight / 2);


        //// X_Label_ 5 Drawing
        var x_Label_5Rect = makeRect(324, 0, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_5TotalHeight = 13 * 1.3;
        context.fillText(date_list[5].getFullYear(), x_Label_5Rect.x + x_Label_5Rect.w/2, x_Label_5Rect.y + 13 + x_Label_5Rect.h / 2 - x_Label_5TotalHeight / 2);


        //// X_Label_ 6 Drawing
        var x_Label_6Rect = makeRect(389, 0, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_6TotalHeight = 13 * 1.3;
        context.fillText(date_list[6].getFullYear(), x_Label_6Rect.x + x_Label_6Rect.w/2, x_Label_6Rect.y + 13 + x_Label_6Rect.h / 2 - x_Label_6TotalHeight / 2);


        //// X_Label_ 7 Drawing
        var x_Label_7Rect = makeRect(454, 0, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_7TotalHeight = 13 * 1.3;
        context.fillText(date_list[7].getFullYear(), x_Label_7Rect.x + x_Label_7Rect.w/2, x_Label_7Rect.y + 13 + x_Label_7Rect.h / 2 - x_Label_7TotalHeight / 2);


        //// X_Label_ 8 Drawing
        var x_Label_8Rect = makeRect(519, 0, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_8TotalHeight = 13 * 1.3;
        context.fillText(date_list[8].getFullYear(), x_Label_8Rect.x + x_Label_8Rect.w/2, x_Label_8Rect.y + 13 + x_Label_8Rect.h / 2 - x_Label_8TotalHeight / 2);

        context.restore();

    }

    //// Infrastructure

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

    // Drawing Methods
    CarbonArea.drawTimeseries   = drawTimeseries;
    CarbonArea.drawDateMarker   = drawDateMarker;
    CarbonArea.drawGridpattern  = drawGridpattern;
    CarbonArea.drawXLabels      = drawXLabels;

    // Utilities
    CarbonArea.clearCanvas      = clearCanvas;
    CarbonArea.makeRect         = makeRect;

})();


/**
 *
 * CarbonAreaChart
 * ---------------
 *
 * This Component renders the html canvas for the timeseries area chart (right side of the carbon budget)
 *
 * @props id            String:     ID of the carbon area chart
 * @props title         String:     Title of the carbon area chart
 * @props y_axis        String:     Label of the y-axis
 * @props min           Integer:    Minimum of the positive area
 * @props max           Integer:    Maximum of the positive area
 * @props today         Date:       Current Date of the simulation
 * @props settings      Dictionary: Defines settings for the appereance of the carbon area chart (colors, data appereance, lines)
 * @props timeseries    List:       Defines the values of the timeseries
 *
 *
 * settings Dictionary:
 * --------------------
 *
 * example:
 *
 * {
 *      colors: [
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
 *      lines:              8,
 *      thickness:          2
 * }
 *
 * - colors:                        Dictionary: Defines the labels, colors and appereance of each timeseries.
 * - lines:                         Integer:    Deinfes the number of lines the chart has
 * - thickness:                     Integer:    Defines the line thickness of the timeseries
 *
 *
 * timeseries List:
 * ----------------
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
 *
 */
class CarbonAreaChartNew extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id:             props.id,
            title:          props.title,
            y_axis:         props.y_axis,
            settings:       props.settings,
        };

    }

    componentDidMount() {

        CarbonArea.clearCanvas(this.state.id);
        CarbonArea.drawTimeseries(
            this.state.id,
            this.state.title,
            this.state.y_axis,

            this.props.min,
            this.props.max,
            this.props.today,

            this.state.settings,
            this.props.timeseries,

        );

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        CarbonArea.clearCanvas(this.state.id);
        CarbonArea.drawTimeseries(
            this.state.id,
            this.state.title,
            this.state.y_axis,

            this.props.min,
            this.props.max,
            this.props.today,

            this.state.settings,
            this.props.timeseries

        );

    }


    render() {
        return (
            <div>
                <canvas id={this.state.id} width="600" height="500"/>
            </div>
        )
    }
}

export default CarbonAreaChartNew
