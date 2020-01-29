import React, { Component } from 'react';



//// Create StyleKit Object
var GenericRollsAbsolute = {};
(function() {

    //// Drawing Methods

    function drawGenericRollsAbsoluteCanvas(canvas, title, settings, max_value, min_value, y_label, data, targetFrame, resizing) {
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
        // Define Colors
        // ----------------------------------------------------

        // Icon & Font Color
        var icon_Color = 'rgba(45, 47, 49, 1)';
        var text_Color_White = 'rgba(255, 255, 255, 1)';

        // Default Roll Colors
        var politics_colors     = ['rgba(199, 70, 40, 1)', 'rgba(225, 116, 47, 1)'];
        var population_colors   = ['rgba(127, 182, 74, 1)', 'rgba(214, 225, 154, 1)'];
        var planer_colors       = ['rgba(82, 162, 204, 1)', 'rgba(167, 193, 85, 1)'];
        var niche_colors        = ['rgba(41, 93, 164, 1)', 'rgba(53, 144, 187, 1)'];
        var investor_colors     = ['rgba(249, 200, 52, 1)', 'rgba(255, 248, 86, 1)'];
        var industry_colors     = ['rgba(90, 98, 100, 1)', 'rgba(162, 170, 172, 1)'];
        var energy_colors       = ['rgba(237, 130, 42, 1)', 'rgba(255, 214, 85, 1)'];

        // Load defined colors
        var settings_keys = Object.keys(settings);

        settings_keys.forEach(key => {

                switch (key) {

                    case "politics":
                        politics_colors[0]      = settings.politics[0];
                        politics_colors[1]      = settings.politics[1];

                    case "energy":
                        energy_colors[0]        = settings.energy[0];
                        energy_colors[1]        = settings.energy[1];

                    case "investor":
                        investor_colors[0]      = settings.investor[0];
                        investor_colors[1]      = settings.investor[1];

                    case "population":
                        population_colors[0]    = settings.population[0];
                        population_colors[1]    = settings.population[1];

                    case "planer":
                        planer_colors[0]        = settings.planer[0];
                        planer_colors[1]        = settings.planer[1];

                    case "niche":
                        niche_colors[0]         = settings.niche[0];
                        niche_colors[1]         = settings.niche[1];

                    case "industry":
                        industry_colors[0]      = settings.industry[0];
                        industry_colors[1]      = settings.industry[1];

                }

        });


        // Gradient Declarations
        function population_Gradient(g) {
            g.addColorStop(0, population_colors[0]);
            g.addColorStop(1, population_colors[1]);
            return g;
        }
        function politics_Gradient(g) {
            g.addColorStop(0, politics_colors[0]);
            g.addColorStop(1, politics_colors[1]);
            return g;
        }
        function planer_Gradient(g) {
            g.addColorStop(0, planer_colors[0]);
            g.addColorStop(1, planer_colors[1]);
            return g;
        }
        // energy
        function energy_Gradient(g) {
            g.addColorStop(0, energy_colors[0]);
            g.addColorStop(1, energy_colors[1]);
            return g;
        }
        function investor_Gradient(g) {
            g.addColorStop(0, investor_colors[0]);
            g.addColorStop(1, investor_colors[1]);
            return g;
        }
        function niche_Gradient(g) {
            g.addColorStop(0, niche_colors[0]);
            g.addColorStop(1, niche_colors[1]);
            return g;
        }
        // industry
        function industry_Gradient(g) {
            g.addColorStop(0, industry_colors[0]);
            g.addColorStop(1, industry_colors[1]);
            return g;
        }




        // ----------------------------------------------------
        // Variable Declarations
        // ----------------------------------------------------

        var y_label_0_text = ('' + Math.round(Math.round((max_value - min_value) / 10 * 0 + min_value)));
        var y_label_2_text = ('' + Math.round(Math.round((max_value - min_value) / 10 * 2 + min_value)));
        var y_label_4_text = ('' + Math.round(Math.round((max_value - min_value) / 10 * 4 + min_value)));
        var y_label_6_text = ('' + Math.round(Math.round((max_value - min_value) / 10 * 6 + min_value)));
        var y_label_8_text = ('' + Math.round(Math.round((max_value - min_value) / 10 * 8 + min_value)));
        var y_label_10_text = ('' + Math.round(Math.round((max_value - min_value) / 10 * 10 + min_value)));

        // Data definition test
        // --------------------


        // ----------------------------------------------------
        // Draw Grid
        // ----------------------------------------------------

        function draw_grid() {
            //// Grid_Line_2 Drawing
            context.save();
            context.translate(81, 228);

            var grid_Line_2Rect = makeRect(0, -1.51, 500, 1.51);
            context.save();
            context.beginPath();
            context.rect(grid_Line_2Rect.x, grid_Line_2Rect.y, grid_Line_2Rect.w, grid_Line_2Rect.h);
            context.clip();
            context.translate(grid_Line_2Rect.x, grid_Line_2Rect.y);

            GenericRollsAbsolute.drawGridLineCanvas(canvas, makeRect(0, 0, grid_Line_2Rect.w, grid_Line_2Rect.h), 'stretch');
            context.restore();

            context.restore();


            //// Grid_Line_3 Drawing
            context.save();
            context.translate(81, 190.32);

            var grid_Line_3Rect = makeRect(0, -1.51, 500, 1.51);
            context.save();
            context.beginPath();
            context.rect(grid_Line_3Rect.x, grid_Line_3Rect.y, grid_Line_3Rect.w, grid_Line_3Rect.h);
            context.clip();
            context.translate(grid_Line_3Rect.x, grid_Line_3Rect.y);

            GenericRollsAbsolute.drawGridLineCanvas(canvas, makeRect(0, 0, grid_Line_3Rect.w, grid_Line_3Rect.h), 'stretch');
            context.restore();

            context.restore();


            //// Grid_Line_4 Drawing
            context.save();
            context.translate(81, 151.88);

            var grid_Line_4Rect = makeRect(0, -1.51, 500, 1.51);
            context.save();
            context.beginPath();
            context.rect(grid_Line_4Rect.x, grid_Line_4Rect.y, grid_Line_4Rect.w, grid_Line_4Rect.h);
            context.clip();
            context.translate(grid_Line_4Rect.x, grid_Line_4Rect.y);

            GenericRollsAbsolute.drawGridLineCanvas(canvas, makeRect(0, 0, grid_Line_4Rect.w, grid_Line_4Rect.h), 'stretch');
            context.restore();

            context.restore();


            //// Grid_Line_5 Drawing
            context.save();
            context.translate(81, 114.19);

            var grid_Line_5Rect = makeRect(0, -1.51, 500, 1.51);
            context.save();
            context.beginPath();
            context.rect(grid_Line_5Rect.x, grid_Line_5Rect.y, grid_Line_5Rect.w, grid_Line_5Rect.h);
            context.clip();
            context.translate(grid_Line_5Rect.x, grid_Line_5Rect.y);

            GenericRollsAbsolute.drawGridLineCanvas(canvas, makeRect(0, 0, grid_Line_5Rect.w, grid_Line_5Rect.h), 'stretch');
            context.restore();

            context.restore();


            //// Grid_Line_6 Drawing
            context.save();
            context.translate(81, 76.51);

            var grid_Line_6Rect = makeRect(0, -1.51, 500, 1.51);
            context.save();
            context.beginPath();
            context.rect(grid_Line_6Rect.x, grid_Line_6Rect.y, grid_Line_6Rect.w, grid_Line_6Rect.h);
            context.clip();
            context.translate(grid_Line_6Rect.x, grid_Line_6Rect.y);

            GenericRollsAbsolute.drawGridLineCanvas(canvas, makeRect(0, 0, grid_Line_6Rect.w, grid_Line_6Rect.h), 'stretch');
            context.restore();

            context.restore();


        }

        draw_grid();

        // ----------------------------------------------------
        // Draw Bars
        // ----------------------------------------------------

        // Load defined colors
        var data_keys = Object.keys(data);

        var bar_width = 50;
        var bar_height = 189;
        var bar_space = (500 - (data_keys.length * bar_width)) / (data_keys.length) + bar_width;

        var bar_position = 131 + (bar_space - bar_width) / 2;

        // Draw Bar Function
        // -----------------
        function draw_bar(data, gradient) {

            // Variable Declaration
            var fraction        = (data - min_value) / (max_value - min_value);
            var value_height    = fraction * bar_height;
            var value           = data;

            // Bar
            context.save();
            context.translate(bar_position, 264);
            context.rotate(-180 * Math.PI / 180);

            var valueRect = makeRect(0, 0, bar_width, value_height);
            var valueCornerRadius = 25;
            var valueInnerRect = insetRect(valueRect, valueCornerRadius, valueCornerRadius);
            context.beginPath();
            context.moveTo(valueRect.x, valueRect.y);
            context.lineTo(valueRect.x + valueRect.w, valueRect.y);
            context.arc(valueInnerRect.x + valueInnerRect.w, valueInnerRect.y + valueInnerRect.h, valueCornerRadius, 0, 0.5*Math.PI);
            context.arc(valueInnerRect.x, valueInnerRect.y + valueInnerRect.h, valueCornerRadius, 0.5*Math.PI, Math.PI);
            context.closePath();
            context.fillStyle = gradient(context.createLinearGradient(valueRect.x, valueRect.y, valueRect.x, valueRect.y + valueRect.h));
            context.fill();
            context.restore();

            // Bubble
            context.save();
            context.translate(bar_position - 50, 252);

            var bubbleRect = makeRect(0, (-1 * value_height - 22), bar_width, 30);
            context.save();
            context.beginPath();
            context.rect(bubbleRect.x, bubbleRect.y, bubbleRect.w, bubbleRect.h);
            context.clip();
            context.translate(bubbleRect.x, bubbleRect.y);

            GenericRollsAbsolute.drawBubble(canvas, 1, makeRect(0, 0, bubbleRect.w, bubbleRect.h), 'stretch');
            context.restore();
            context.restore();

            // Label
            context.save();
            context.translate(bar_position - 50, 252);

            var value_LabelRect = makeRect(0, (-1 * value_height - 22), 50, 26);
            context.fillStyle = text_Color_White;
            context.font = 'bold 17px HelveticaNeue-CondensedBlack, "Helvetica Neue", Helvetica, Arial, sans-serif';
            context.textAlign = 'center';
            var value_LabelTotalHeight = 17 * 1.3;
            context.fillText(value, value_LabelRect.x + value_LabelRect.w/2, value_LabelRect.y + 17 + value_LabelRect.h / 2 - value_LabelTotalHeight / 2);
            context.restore();

            // increase bar position
            bar_position += bar_space;
        }


        data_keys.forEach(key => {

            switch (key) {

                case "politics":
                    draw_bar(data.politics, politics_Gradient);
                    break;

                case "energy":
                    draw_bar(data.energy, energy_Gradient);
                    break;

                case "investor":
                    draw_bar(data.investor, investor_Gradient);
                    break;

                case "population":
                    draw_bar(data.population, population_Gradient);
                    break;

                case "planer":
                    draw_bar(data.planer, planer_Gradient);
                    break;

                case "niche":
                    draw_bar(data.niche, niche_Gradient);
                    break;

                case "industry":
                    draw_bar(data.industry, industry_Gradient);
                    break;

            }

        });



        //// Y_Label_Group
        //// Y_Label_0 Drawing
        var y_Label_0Rect = makeRect(40, 260, 30, 11);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var y_Label_0TotalHeight = 13 * 1.3;
        context.fillText(y_label_0_text, y_Label_0Rect.x + y_Label_0Rect.w, y_Label_0Rect.y + 13 + y_Label_0Rect.h / 2 - y_Label_0TotalHeight / 2);


        //// Y_Label_2 Drawing
        var y_Label_2Rect = makeRect(40, 222, 30, 11);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var y_Label_2TotalHeight = 13 * 1.3;
        context.fillText(y_label_2_text, y_Label_2Rect.x + y_Label_2Rect.w, y_Label_2Rect.y + 13 + y_Label_2Rect.h / 2 - y_Label_2TotalHeight / 2);


        //// Y_Label_4 Drawing
        var y_Label_4Rect = makeRect(40, 184, 30, 11);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var y_Label_4TotalHeight = 13 * 1.3;
        context.fillText(y_label_4_text, y_Label_4Rect.x + y_Label_4Rect.w, y_Label_4Rect.y + 13 + y_Label_4Rect.h / 2 - y_Label_4TotalHeight / 2);


        //// Y_Label_6 Drawing
        var y_Label_6Rect = makeRect(40, 146, 30, 11);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var y_Label_6TotalHeight = 13 * 1.3;
        context.fillText(y_label_6_text, y_Label_6Rect.x + y_Label_6Rect.w, y_Label_6Rect.y + 13 + y_Label_6Rect.h / 2 - y_Label_6TotalHeight / 2);


        //// Y_Label_8 Drawing
        var y_Label_8Rect = makeRect(40, 108, 30, 11);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var y_Label_8TotalHeight = 13 * 1.3;
        context.fillText(y_label_8_text, y_Label_8Rect.x + y_Label_8Rect.w, y_Label_8Rect.y + 13 + y_Label_8Rect.h / 2 - y_Label_8TotalHeight / 2);


        //// Y_Label_10 Drawing
        var y_Label_10Rect = makeRect(40, 70, 30, 11);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var y_Label_10TotalHeight = 13 * 1.3;
        context.fillText(y_label_10_text, y_Label_10Rect.x + y_Label_10Rect.w, y_Label_10Rect.y + 13 + y_Label_10Rect.h / 2 - y_Label_10TotalHeight / 2);



        //// Rectangle Drawing

        function rectangleCanvasLayer(width, height)
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
            context.rect(81, 264, 500, 56);
            context.fillStyle = 'rgb(128, 128, 128)';
            context.fill();
            return canvas;
        }

        context.save();
        context.globalCompositeOperation = 'destination-out';
        context.drawImage(rectangleCanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
        context.restore();


        //// Y_Axis Drawing
        context.save();
        context.translate(13, 293);
        context.rotate(-90 * Math.PI / 180);

        var y_AxisRect = makeRect(0, 0, 263, 27);
        context.fillStyle = 'rgb(0, 0, 0)';
        context.font = 'bold 15px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var y_AxisTotalHeight = 15 * 1.3;
        context.fillText(y_label, y_AxisRect.x + y_AxisRect.w/2, y_AxisRect.y + 15 + y_AxisRect.h / 2 - y_AxisTotalHeight / 2);

        context.restore();


        // ----------------------------------------------------
        // X-Axis Icons
        // ----------------------------------------------------


        var icon_width      = 50;
        var icon_space      = (500 - (data_keys.length * icon_width)) / (data_keys.length ) + icon_width;

        var icon_position_x   = 81 + (icon_space - icon_width) / 2;
        var icon_position_y   = 303;


        function draw_icons(icon_canvas, w, h) {

            context.save();
            context.translate(icon_position_x, icon_position_y);

            var iconRect = makeRect(0, -35, w, h);
            context.save();
            context.beginPath();
            context.rect(iconRect.x, iconRect.y, iconRect.w, iconRect.h);
            context.clip();
            context.translate(iconRect.x, iconRect.y);

            icon_canvas(canvas, makeRect(0, 0, iconRect.w, iconRect.h), 'stretch');
            context.restore();

            context.restore();

            icon_position_x += icon_space;

        }

        data_keys.forEach(key => {

            switch (key) {

                case "politics":
                    draw_icons(GenericRollsAbsolute.drawPoliticsCanvas, 50, 50);
                    break;

                case "energy":
                    draw_icons(GenericRollsAbsolute.drawEnergyCanvas, 50, 50);
                    break;

                case "investor":
                    draw_icons(GenericRollsAbsolute.drawInvestorCanvas, 50, 50);
                    break;

                case "population":
                    draw_icons(GenericRollsAbsolute.drawPopulationCanvas, 50, 50);
                    break;

                case "planer":
                    draw_icons(GenericRollsAbsolute.drawPlanerCanvas, 50, 50);
                    break;

                case "niche":
                    draw_icons(GenericRollsAbsolute.drawNicheCanvas, 50, 50);
                    break;

                case "industry":
                    draw_icons(GenericRollsAbsolute.drawIndustryCanvas, 50, 50);
                    break;

            }

        });



        //// Grid_Line_1 Drawing
        context.save();
        context.translate(81, 266);

        var grid_Line_1Rect = makeRect(0, -2, 500, 2);
        context.save();
        context.beginPath();
        context.rect(grid_Line_1Rect.x, grid_Line_1Rect.y, grid_Line_1Rect.w, grid_Line_1Rect.h);
        context.clip();
        context.translate(grid_Line_1Rect.x, grid_Line_1Rect.y);

        GenericRollsAbsolute.drawGridLineCanvas(canvas, makeRect(0, 0, grid_Line_1Rect.w, grid_Line_1Rect.h), 'stretch');
        context.restore();

        context.restore();


        //// Text Drawing
        var textRect = makeRect(0, 0, 600, 41);
        context.fillStyle = 'rgb(0, 0, 0)';
        context.font = 'bold 16px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var textTotalHeight = 16 * 1.3;
        context.fillText(title, textRect.x + textRect.w/2, textRect.y + 16 + textRect.h / 2 - textTotalHeight / 2);

        context.restore();

    }

    function drawArrowCanvas(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 11, 8), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 11, resizedFrame.h / 8);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Planer_Value_Arrow Drawing
        context.beginPath();
        context.moveTo(5.5, 8);
        context.lineTo(11, 4);
        context.lineTo(5.5, 0);
        context.lineTo(0, 4);
        context.lineTo(5.5, 8);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();

        context.restore();

    }

    function drawPopulationCanvas(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 50, 50), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 50, resizedFrame.h / 50);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Population_Icon
        //// Population_Elements_3 Drawing
        context.beginPath();
        context.moveTo(28.12, 24.81);
        context.bezierCurveTo(30.32, 23.55, 31.8, 21.19, 31.8, 18.47);
        context.bezierCurveTo(31.8, 14.44, 28.53, 11.17, 24.5, 11.17);
        context.bezierCurveTo(20.48, 11.17, 17.21, 14.44, 17.21, 18.47);
        context.bezierCurveTo(17.21, 21.19, 18.69, 23.55, 20.89, 24.81);
        context.bezierCurveTo(16.38, 25.52, 12.92, 29.42, 12.92, 34.13);
        context.lineTo(12.92, 35.35);
        context.lineTo(12.92, 35.35);
        context.bezierCurveTo(12.92, 35.71, 13.21, 36, 13.57, 36);
        context.lineTo(35.44, 36);
        context.lineTo(35.44, 36);
        context.bezierCurveTo(35.8, 36, 36.09, 35.71, 36.09, 35.35);
        context.lineTo(36.09, 34.13);
        context.bezierCurveTo(36.09, 29.42, 32.63, 25.52, 28.12, 24.81);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Population_Elements_2 Drawing
        context.beginPath();
        context.moveTo(16.42, 24);
        context.lineTo(16.37, 23.93);
        context.bezierCurveTo(14.26, 20.91, 13.99, 16.98, 15.66, 13.71);
        context.bezierCurveTo(15.5, 13.74, 15.37, 13.73, 15.23, 13.73);
        context.bezierCurveTo(12.02, 13.73, 9.42, 16.34, 9.42, 19.55);
        context.bezierCurveTo(9.42, 21.72, 10.6, 23.6, 12.35, 24.61);
        context.bezierCurveTo(8.75, 25.17, 6, 28.28, 6, 32.04);
        context.lineTo(6, 33.01);
        context.lineTo(6, 33.01);
        context.bezierCurveTo(6, 33.29, 6.23, 33.52, 6.52, 33.52);
        context.lineTo(10.56, 33.52);
        context.lineTo(10.56, 32.73);
        context.bezierCurveTo(10.56, 28.78, 12.98, 25.4, 16.42, 24);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Population_Elements_1 Drawing
        context.beginPath();
        context.moveTo(36.66, 24.61);
        context.bezierCurveTo(38.41, 23.6, 39.59, 21.72, 39.59, 19.55);
        context.bezierCurveTo(39.59, 16.34, 36.99, 13.73, 33.78, 13.73);
        context.bezierCurveTo(33.64, 13.73, 33.51, 13.74, 33.38, 13.75);
        context.lineTo(33.35, 13.71);
        context.bezierCurveTo(35.02, 16.98, 34.75, 20.91, 32.64, 23.93);
        context.bezierCurveTo(36.03, 25.4, 38.45, 28.78, 38.45, 32.73);
        context.lineTo(38.45, 33.52);
        context.lineTo(42.49, 33.52);
        context.lineTo(42.49, 33.52);
        context.bezierCurveTo(42.78, 33.52, 43.01, 33.29, 43.01, 33.01);
        context.lineTo(43.01, 32.04);
        context.bezierCurveTo(43.01, 28.28, 40.26, 25.17, 36.66, 24.61);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();

        context.restore();

    }

    function drawInvestorCanvas(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 50, 50), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 50, resizedFrame.h / 50);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Investor_Icon
        //// Group 3
        //// Oval Drawing
        oval(context, 27, 27.52, 13.84, 6.44);
        context.fillStyle = icon_Color;
        context.fill();


        //// Bezier Drawing
        context.beginPath();
        context.moveTo(33.92, 42.77);
        context.bezierCurveTo(30.57, 42.77, 27.78, 41.72, 27.14, 40.31);
        context.bezierCurveTo(27.05, 40.51, 27, 40.72, 27, 40.93);
        context.bezierCurveTo(27, 42.62, 30.1, 44, 33.92, 44);
        context.bezierCurveTo(37.74, 44, 40.84, 42.62, 40.84, 40.93);
        context.bezierCurveTo(40.84, 40.72, 40.79, 40.51, 40.7, 40.31);
        context.bezierCurveTo(40.06, 41.72, 37.27, 42.77, 33.92, 42.77);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Bezier 2 Drawing
        context.beginPath();
        context.moveTo(33.92, 40.72);
        context.bezierCurveTo(30.57, 40.72, 27.78, 39.67, 27.14, 38.26);
        context.bezierCurveTo(27.05, 38.46, 27, 38.67, 27, 38.88);
        context.bezierCurveTo(27, 40.58, 30.1, 41.95, 33.92, 41.95);
        context.bezierCurveTo(37.74, 41.95, 40.84, 40.58, 40.84, 38.88);
        context.bezierCurveTo(40.84, 38.67, 40.79, 38.46, 40.7, 38.26);
        context.bezierCurveTo(40.06, 39.67, 37.27, 40.72, 33.92, 40.72);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Bezier 3 Drawing
        context.beginPath();
        context.moveTo(33.92, 38.86);
        context.bezierCurveTo(30.57, 38.86, 27.78, 37.8, 27.14, 36.4);
        context.bezierCurveTo(27.05, 36.6, 27, 36.8, 27, 37.01);
        context.bezierCurveTo(27, 38.71, 30.1, 40.08, 33.92, 40.08);
        context.bezierCurveTo(37.74, 40.08, 40.84, 38.71, 40.84, 37.01);
        context.bezierCurveTo(40.84, 36.8, 40.79, 36.6, 40.7, 36.4);
        context.bezierCurveTo(40.06, 37.8, 37.27, 38.86, 33.92, 38.86);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Bezier 4 Drawing
        context.beginPath();
        context.moveTo(33.92, 36.72);
        context.bezierCurveTo(30.57, 36.72, 27.78, 35.66, 27.14, 34.26);
        context.bezierCurveTo(27.05, 34.46, 27, 34.66, 27, 34.87);
        context.bezierCurveTo(27, 36.57, 30.1, 37.95, 33.92, 37.95);
        context.bezierCurveTo(37.74, 37.95, 40.84, 36.57, 40.84, 34.87);
        context.bezierCurveTo(40.84, 34.66, 40.79, 34.46, 40.7, 34.26);
        context.bezierCurveTo(40.06, 35.66, 37.27, 36.72, 33.92, 36.72);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Bezier 5 Drawing
        context.beginPath();
        context.moveTo(33.92, 34.67);
        context.bezierCurveTo(30.57, 34.67, 27.78, 33.61, 27.14, 32.21);
        context.bezierCurveTo(27.05, 32.41, 27, 32.61, 27, 32.82);
        context.bezierCurveTo(27, 34.52, 30.1, 35.9, 33.92, 35.9);
        context.bezierCurveTo(37.74, 35.9, 40.84, 34.52, 40.84, 32.82);
        context.bezierCurveTo(40.84, 32.61, 40.79, 32.41, 40.7, 32.21);
        context.bezierCurveTo(40.06, 33.61, 37.27, 34.67, 33.92, 34.67);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();




        //// Bezier 6 Drawing
        context.beginPath();
        context.moveTo(26.31, 40.98);
        context.lineTo(26.31, 28.85);
        context.lineTo(24.21, 28.85);
        context.bezierCurveTo(23.88, 28.85, 23.61, 28.58, 23.61, 28.25);
        context.lineTo(23.61, 24.09);
        context.bezierCurveTo(23.61, 23.76, 23.88, 23.49, 24.21, 23.49);
        context.lineTo(28.41, 23.49);
        context.bezierCurveTo(28.74, 23.49, 29.01, 23.76, 29.01, 24.09);
        context.lineTo(29.01, 25.7);
        context.bezierCurveTo(30, 25.28, 31.2, 24.97, 32.53, 24.83);
        context.lineTo(32.53, 9.66);
        context.bezierCurveTo(32.53, 8.39, 31.5, 7.37, 30.23, 7.37);
        context.lineTo(13.3, 7.37);
        context.bezierCurveTo(12.03, 7.37, 11, 8.39, 11, 9.66);
        context.lineTo(11, 38.7);
        context.bezierCurveTo(11, 39.96, 12.03, 40.98, 13.3, 40.98);
        context.lineTo(18.87, 40.98);
        context.lineTo(18.87, 34.69);
        context.bezierCurveTo(18.87, 34.36, 19.14, 34.09, 19.47, 34.09);
        context.lineTo(24.39, 34.09);
        context.bezierCurveTo(24.72, 34.09, 24.99, 34.36, 24.99, 34.69);
        context.lineTo(24.99, 40.98);
        context.lineTo(26.31, 40.98);
        context.lineTo(26.31, 40.98);
        context.closePath();
        context.moveTo(14.65, 14.74);
        context.bezierCurveTo(14.65, 14.41, 14.92, 14.14, 15.25, 14.14);
        context.lineTo(19.44, 14.14);
        context.bezierCurveTo(19.77, 14.14, 20.04, 14.41, 20.04, 14.74);
        context.lineTo(20.04, 18.9);
        context.bezierCurveTo(20.04, 19.23, 19.77, 19.5, 19.44, 19.5);
        context.lineTo(15.25, 19.5);
        context.bezierCurveTo(14.92, 19.5, 14.65, 19.23, 14.65, 18.9);
        context.lineTo(14.65, 14.74);
        context.closePath();
        context.moveTo(20.21, 28.25);
        context.bezierCurveTo(20.21, 28.58, 19.94, 28.85, 19.61, 28.85);
        context.lineTo(15.41, 28.85);
        context.bezierCurveTo(15.08, 28.85, 14.81, 28.58, 14.81, 28.25);
        context.lineTo(14.81, 24.09);
        context.bezierCurveTo(14.81, 23.76, 15.08, 23.49, 15.41, 23.49);
        context.lineTo(19.61, 23.49);
        context.bezierCurveTo(19.94, 23.49, 20.21, 23.76, 20.21, 24.09);
        context.lineTo(20.21, 28.25);
        context.lineTo(20.21, 28.25);
        context.closePath();
        context.moveTo(23.45, 14.74);
        context.bezierCurveTo(23.45, 14.41, 23.72, 14.14, 24.05, 14.14);
        context.lineTo(28.24, 14.14);
        context.bezierCurveTo(28.58, 14.14, 28.84, 14.41, 28.84, 14.74);
        context.lineTo(28.84, 18.9);
        context.bezierCurveTo(28.84, 19.23, 28.58, 19.5, 28.24, 19.5);
        context.lineTo(24.05, 19.5);
        context.bezierCurveTo(23.72, 19.5, 23.45, 19.23, 23.45, 18.9);
        context.lineTo(23.45, 14.74);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();

        context.restore();

    }

    function drawBubble(canvas, investor_fraction, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 51, 30), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 51, resizedFrame.h / 30);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Variable Declarations
        var investor_height = investor_fraction * 189;
        var investor_value_height = -1 * investor_height - 21;

        //// Investor_Value_Box Drawing
        context.save();
        context.translate(0, 26);

        roundedRect(context, 0, -26, 51, 26, 10);
        context.fillStyle = icon_Color;
        context.fill();

        context.restore();


        //// Investor_Value_Arrow Drawing
        context.save();
        context.translate(20, 232);

        var investor_Value_ArrowRect = makeRect(0, investor_value_height, 11, 8);
        context.save();
        context.beginPath();
        context.rect(investor_Value_ArrowRect.x, investor_Value_ArrowRect.y, investor_Value_ArrowRect.w, investor_Value_ArrowRect.h);
        context.clip();
        context.translate(investor_Value_ArrowRect.x, investor_Value_ArrowRect.y);

        GenericRollsAbsolute.drawArrowCanvas(canvas, makeRect(0, 0, investor_Value_ArrowRect.w, investor_Value_ArrowRect.h), 'stretch');
        context.restore();

        context.restore();

        context.restore();

    }

    function drawPoliticsCanvas(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 50, 50), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 50, resizedFrame.h / 50);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Politics_Icon
        //// Politics_Elements_10 Drawing
        context.beginPath();
        context.moveTo(8.74, 37.22);
        context.lineTo(41.85, 37.22);
        context.lineTo(41.85, 37.22);
        context.bezierCurveTo(42.26, 37.22, 42.59, 37.57, 42.59, 38.01);
        context.lineTo(42.59, 39.96);
        context.lineTo(42.59, 39.96);
        context.bezierCurveTo(42.59, 39.98, 42.57, 40, 42.56, 40);
        context.lineTo(8.01, 40);
        context.lineTo(8.01, 40);
        context.bezierCurveTo(8, 40, 8, 39.99, 8, 39.99);
        context.lineTo(8, 38.01);
        context.lineTo(8, 38.01);
        context.bezierCurveTo(8, 37.57, 8.33, 37.22, 8.74, 37.22);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_9 Drawing
        context.beginPath();
        context.moveTo(10.54, 34.77);
        context.lineTo(40.05, 34.77);
        context.lineTo(40.05, 34.77);
        context.bezierCurveTo(40.46, 34.77, 40.79, 35.13, 40.79, 35.56);
        context.lineTo(40.79, 36.84);
        context.lineTo(40.79, 36.84);
        context.bezierCurveTo(40.79, 36.86, 40.77, 36.88, 40.76, 36.88);
        context.lineTo(9.81, 36.88);
        context.lineTo(9.81, 36.88);
        context.bezierCurveTo(9.8, 36.88, 9.8, 36.87, 9.8, 36.87);
        context.lineTo(9.8, 35.56);
        context.lineTo(9.8, 35.56);
        context.bezierCurveTo(9.8, 35.13, 10.13, 34.77, 10.54, 34.77);
        context.lineTo(10.54, 34.77);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_7 Drawing
        context.beginPath();
        context.moveTo(12.2, 32.31);
        context.lineTo(38.43, 32.31);
        context.lineTo(38.43, 32.31);
        context.bezierCurveTo(38.84, 32.31, 39.17, 32.67, 39.17, 33.1);
        context.lineTo(39.17, 34.38);
        context.lineTo(39.17, 34.38);
        context.bezierCurveTo(39.17, 34.4, 39.16, 34.42, 39.14, 34.42);
        context.lineTo(11.47, 34.42);
        context.lineTo(11.47, 34.42);
        context.bezierCurveTo(11.46, 34.42, 11.46, 34.41, 11.46, 34.41);
        context.lineTo(11.46, 33.1);
        context.lineTo(11.46, 33.1);
        context.bezierCurveTo(11.46, 32.67, 11.79, 32.31, 12.2, 32.31);
        context.lineTo(12.2, 32.31);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_5 Drawing
        roundedRect(context, 20.39, 17.99, 2.37, 13.8, 1.19);
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_2 Drawing
        context.beginPath();
        context.moveTo(11.44, 15.22);
        context.lineTo(39.11, 15.22);
        context.lineTo(39.11, 15.22);
        context.bezierCurveTo(39.13, 15.22, 39.14, 15.24, 39.14, 15.26);
        context.lineTo(39.14, 16.54);
        context.lineTo(39.14, 16.54);
        context.bezierCurveTo(39.14, 16.97, 38.81, 17.33, 38.4, 17.33);
        context.lineTo(12.17, 17.33);
        context.lineTo(12.17, 17.33);
        context.bezierCurveTo(11.76, 17.33, 11.43, 16.97, 11.43, 16.54);
        context.lineTo(11.43, 15.23);
        context.lineTo(11.43, 15.23);
        context.bezierCurveTo(11.43, 15.22, 11.43, 15.22, 11.44, 15.22);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_1 Drawing
        context.beginPath();
        context.moveTo(24.96, 6.03);
        context.lineTo(8.72, 14.06);
        context.bezierCurveTo(8.33, 14.25, 8.46, 14.88, 8.89, 14.88);
        context.lineTo(41.67, 14.88);
        context.bezierCurveTo(42.1, 14.88, 42.23, 14.25, 41.84, 14.05);
        context.lineTo(25.3, 6.03);
        context.lineTo(25.3, 6.03);
        context.bezierCurveTo(25.19, 5.98, 25.07, 5.98, 24.96, 6.03);
        context.lineTo(24.96, 6.03);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_ Drawing
        roundedRect(context, 13.39, 17.99, 2.37, 13.8, 1.19);
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_ 3 Drawing
        roundedRect(context, 28.39, 17.99, 2.37, 13.8, 1.19);
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_ 6 Drawing
        roundedRect(context, 35.39, 17.99, 2.37, 13.8, 1.19);
        context.fillStyle = icon_Color;
        context.fill();

        context.restore();

    }

    function drawEnergyCanvas(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 50, 50), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 50, resizedFrame.h / 50);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Energy_Element_1 Drawing
        context.beginPath();
        context.moveTo(36.89, 23.99);
        context.lineTo(21.55, 42.8);
        context.bezierCurveTo(21.2, 43.23, 20.5, 42.92, 20.6, 42.37);
        context.lineTo(23.3, 27.74);
        context.lineTo(23.3, 27.74);
        context.bezierCurveTo(23.36, 27.45, 23.16, 27.17, 22.86, 27.12);
        context.bezierCurveTo(22.83, 27.12, 22.8, 27.11, 22.77, 27.11);
        context.lineTo(14.54, 27.11);
        context.bezierCurveTo(14.1, 27.11, 13.84, 26.62, 14.11, 26.27);
        context.lineTo(28.62, 7.21);
        context.bezierCurveTo(28.95, 6.78, 29.66, 7.05, 29.59, 7.59);
        context.lineTo(27.75, 22.54);
        context.lineTo(27.75, 22.54);
        context.bezierCurveTo(27.72, 22.83, 27.93, 23.09, 28.22, 23.13);
        context.bezierCurveTo(28.25, 23.13, 28.27, 23.13, 28.29, 23.13);
        context.lineTo(36.46, 23.13);
        context.bezierCurveTo(36.92, 23.13, 37.17, 23.65, 36.89, 23.99);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();

        context.restore();

    }

    function drawPlanerCanvas(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 50, 50), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 50, resizedFrame.h / 50);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Planer_Icon
        //// Planer_Element_14 Drawing
        context.beginPath();
        context.moveTo(42.05, 34.68);
        context.lineTo(13.65, 7.77);
        context.lineTo(13.65, 7.77);
        context.bezierCurveTo(13.16, 7.31, 12.36, 7.31, 11.87, 7.77);
        context.bezierCurveTo(11.87, 7.77, 11.86, 7.78, 11.86, 7.78);
        context.lineTo(6.37, 13.03);
        context.lineTo(6.37, 13.03);
        context.bezierCurveTo(5.88, 13.49, 5.87, 14.24, 6.36, 14.72);
        context.lineTo(34.69, 41.65);
        context.lineTo(34.69, 41.65);
        context.bezierCurveTo(35.18, 42.12, 35.98, 42.12, 36.47, 41.65);
        context.lineTo(42.05, 36.38);
        context.lineTo(42.04, 36.39);
        context.bezierCurveTo(42.54, 35.92, 42.54, 35.15, 42.04, 34.68);
        context.lineTo(42.05, 34.68);
        context.closePath();
        context.moveTo(40.82, 35.56);
        context.lineTo(35.9, 40.31);
        context.lineTo(35.9, 40.31);
        context.bezierCurveTo(35.77, 40.44, 35.55, 40.45, 35.41, 40.32);
        context.bezierCurveTo(35.41, 40.32, 35.41, 40.32, 35.41, 40.32);
        context.lineTo(7.77, 14.09);
        context.lineTo(7.77, 14.09);
        context.bezierCurveTo(7.63, 13.96, 7.63, 13.75, 7.77, 13.62);
        context.lineTo(12.68, 8.9);
        context.lineTo(12.68, 8.9);
        context.bezierCurveTo(12.81, 8.77, 13.03, 8.77, 13.17, 8.9);
        context.bezierCurveTo(13.17, 8.9, 13.17, 8.9, 13.18, 8.9);
        context.lineTo(40.82, 35.09);
        context.lineTo(40.82, 35.09);
        context.bezierCurveTo(40.95, 35.22, 40.96, 35.43, 40.82, 35.56);
        context.lineTo(40.82, 35.56);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_13 Drawing
        context.beginPath();
        context.moveTo(6.09, 41.09);
        context.lineTo(8.19, 33.55);
        context.lineTo(14.73, 39.67);
        context.lineTo(6.76, 41.72);
        context.lineTo(6.76, 41.72);
        context.bezierCurveTo(6.47, 41.79, 6.17, 41.63, 6.09, 41.36);
        context.bezierCurveTo(6.07, 41.27, 6.07, 41.18, 6.09, 41.09);
        context.lineTo(6.09, 41.09);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_12 Drawing
        context.beginPath();
        context.moveTo(41.97, 13.96);
        context.lineTo(40.41, 15.41);
        context.lineTo(33.97, 9.29);
        context.lineTo(35.55, 7.82);
        context.lineTo(35.55, 7.82);
        context.bezierCurveTo(36.05, 7.36, 36.85, 7.37, 37.33, 7.85);
        context.lineTo(41.99, 12.26);
        context.lineTo(41.98, 12.26);
        context.bezierCurveTo(42.48, 12.73, 42.48, 13.48, 41.98, 13.95);
        context.lineTo(41.97, 13.96);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_11 Drawing
        context.beginPath();
        context.moveTo(31.72, 23.68);
        context.lineTo(38.82, 16.99);
        context.lineTo(32.38, 10.87);
        context.lineTo(25.26, 17.59);
        context.lineTo(31.72, 23.68);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_10 Drawing
        context.beginPath();
        context.moveTo(16.59, 25.54);
        context.lineTo(8.79, 32.89);
        context.lineTo(15.29, 38.96);
        context.lineTo(23.03, 31.66);
        context.lineTo(16.59, 25.54);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_9 Drawing
        context.beginPath();
        context.moveTo(35.5, 36.52);
        context.lineTo(33.98, 37.95);
        context.lineTo(33.08, 37.1);
        context.lineTo(34.6, 35.66);
        context.lineTo(34.6, 35.65);
        context.bezierCurveTo(34.71, 35.56, 34.88, 35.56, 34.98, 35.65);
        context.lineTo(35.5, 36.14);
        context.lineTo(35.5, 36.14);
        context.bezierCurveTo(35.61, 36.25, 35.61, 36.42, 35.5, 36.52);
        context.lineTo(35.5, 36.52);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_8 Drawing
        context.beginPath();
        context.moveTo(32.67, 33.86);
        context.lineTo(31.15, 35.29);
        context.lineTo(30.25, 34.44);
        context.lineTo(31.78, 33);
        context.lineTo(31.78, 33);
        context.bezierCurveTo(31.88, 32.9, 32.05, 32.9, 32.15, 33);
        context.lineTo(32.67, 33.49);
        context.lineTo(32.67, 33.49);
        context.bezierCurveTo(32.78, 33.59, 32.78, 33.76, 32.67, 33.86);
        context.lineTo(32.67, 33.86);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_7 Drawing
        context.beginPath();
        context.moveTo(29.85, 31.23);
        context.lineTo(28.34, 32.66);
        context.lineTo(27.44, 31.8);
        context.lineTo(28.96, 30.36);
        context.lineTo(28.96, 30.36);
        context.bezierCurveTo(29.07, 30.26, 29.23, 30.26, 29.34, 30.36);
        context.lineTo(29.85, 30.85);
        context.lineTo(29.85, 30.85);
        context.bezierCurveTo(29.96, 30.95, 29.96, 31.12, 29.85, 31.23);
        context.lineTo(29.85, 31.23);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_6 Drawing
        context.beginPath();
        context.moveTo(27.07, 28.57);
        context.lineTo(25.55, 30);
        context.lineTo(24.65, 29.15);
        context.lineTo(26.18, 27.71);
        context.lineTo(26.18, 27.71);
        context.bezierCurveTo(26.28, 27.61, 26.45, 27.61, 26.55, 27.71);
        context.lineTo(27.07, 28.2);
        context.lineTo(27.07, 28.2);
        context.bezierCurveTo(27.18, 28.3, 27.18, 28.47, 27.07, 28.57);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_5 Drawing
        context.beginPath();
        context.moveTo(24.25, 25.94);
        context.lineTo(22.74, 27.36);
        context.lineTo(21.84, 26.51);
        context.lineTo(23.36, 25.07);
        context.lineTo(23.36, 25.07);
        context.bezierCurveTo(23.47, 24.97, 23.63, 24.97, 23.74, 25.07);
        context.lineTo(24.25, 25.56);
        context.lineTo(24.25, 25.56);
        context.bezierCurveTo(24.36, 25.66, 24.36, 25.83, 24.25, 25.94);
        context.lineTo(24.25, 25.94);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_4 Drawing
        context.beginPath();
        context.moveTo(21.4, 23.26);
        context.lineTo(19.89, 24.69);
        context.lineTo(18.98, 23.84);
        context.lineTo(20.51, 22.4);
        context.lineTo(20.51, 22.4);
        context.bezierCurveTo(20.61, 22.3, 20.78, 22.3, 20.88, 22.4);
        context.lineTo(21.4, 22.89);
        context.lineTo(21.4, 22.89);
        context.bezierCurveTo(21.51, 22.99, 21.51, 23.16, 21.4, 23.26);
        context.lineTo(21.4, 23.26);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_3 Drawing
        context.beginPath();
        context.moveTo(18.68, 20.67);
        context.lineTo(17.17, 22.1);
        context.lineTo(16.26, 21.24);
        context.lineTo(17.79, 19.8);
        context.lineTo(17.79, 19.8);
        context.bezierCurveTo(17.89, 19.71, 18.06, 19.71, 18.16, 19.8);
        context.lineTo(18.68, 20.29);
        context.lineTo(18.68, 20.29);
        context.bezierCurveTo(18.79, 20.4, 18.79, 20.56, 18.68, 20.67);
        context.lineTo(18.68, 20.67);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_2 Drawing
        context.beginPath();
        context.moveTo(15.9, 18.06);
        context.lineTo(14.38, 19.49);
        context.lineTo(13.48, 18.64);
        context.lineTo(15, 17.2);
        context.lineTo(15, 17.2);
        context.bezierCurveTo(15.11, 17.1, 15.27, 17.1, 15.38, 17.2);
        context.lineTo(15.9, 17.69);
        context.lineTo(15.89, 17.69);
        context.bezierCurveTo(16.01, 17.79, 16.01, 17.96, 15.89, 18.06);
        context.lineTo(15.9, 18.06);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_1 Drawing
        context.beginPath();
        context.moveTo(12.99, 15.33);
        context.lineTo(11.47, 16.76);
        context.lineTo(10.57, 15.91);
        context.lineTo(12.09, 14.47);
        context.lineTo(12.09, 14.47);
        context.bezierCurveTo(12.2, 14.37, 12.36, 14.37, 12.47, 14.47);
        context.lineTo(12.99, 14.96);
        context.lineTo(12.99, 14.96);
        context.bezierCurveTo(13.1, 15.06, 13.1, 15.23, 12.99, 15.33);
        context.lineTo(12.99, 15.33);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();

        context.restore();

    }

    function drawIndustryCanvas(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 50, 50), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 50, resizedFrame.h / 50);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Industry_Icon
        //// Industry_Element_1 Drawing
        context.beginPath();
        context.moveTo(9.91, 42);
        context.lineTo(9.91, 42);
        context.bezierCurveTo(8.86, 42, 8, 41.14, 8, 40.08);
        context.lineTo(8, 9.91);
        context.lineTo(8, 9.92);
        context.bezierCurveTo(8, 8.86, 8.86, 8, 9.91, 8);
        context.lineTo(16.88, 8);
        context.lineTo(16.88, 8);
        context.bezierCurveTo(17.93, 8, 18.79, 8.86, 18.79, 9.92);
        context.lineTo(18.79, 24.6);
        context.lineTo(27.29, 17.73);
        context.lineTo(27.29, 17.72);
        context.bezierCurveTo(27.63, 17.45, 28.05, 17.3, 28.48, 17.3);
        context.bezierCurveTo(29.54, 17.3, 30.4, 18.16, 30.4, 19.22);
        context.lineTo(30.4, 24.73);
        context.lineTo(38.89, 17.86);
        context.lineTo(38.9, 17.86);
        context.bezierCurveTo(39.23, 17.59, 39.65, 17.44, 40.08, 17.44);
        context.bezierCurveTo(41.14, 17.44, 42, 18.3, 42, 19.35);
        context.lineTo(42, 40.09);
        context.lineTo(42, 40.08);
        context.bezierCurveTo(42, 41.14, 41.14, 42, 40.09, 42);
        context.lineTo(9.91, 42);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();

        context.restore();

    }

    function drawGridLineCanvas(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 398, 2), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 398, resizedFrame.h / 2);


        //// Color Declarations
        var line_Color = 'rgba(223, 223, 223, 1)';

        //// Grid_Line_5 Drawing
        context.beginPath();
        context.rect(0, 0, 398, 2);
        context.fillStyle = line_Color;
        context.fill();

        context.restore();

    }

    function drawNicheCanvas(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 50, 50), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 50, resizedFrame.h / 50);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Niche_Icon_Group
        //// Niche_Icon_Element_3 Drawing
        context.beginPath();
        context.moveTo(27.27, 9);
        context.bezierCurveTo(19.69, 9, 13.55, 15.15, 13.55, 22.73);
        context.bezierCurveTo(13.55, 30.31, 19.69, 36.45, 27.27, 36.45);
        context.bezierCurveTo(34.85, 36.45, 41, 30.31, 41, 22.73);
        context.bezierCurveTo(41, 15.15, 34.85, 9, 27.27, 9);
        context.closePath();
        context.moveTo(27.27, 33.79);
        context.bezierCurveTo(21.16, 33.79, 16.21, 28.84, 16.21, 22.73);
        context.bezierCurveTo(16.21, 16.62, 21.16, 11.66, 27.27, 11.66);
        context.bezierCurveTo(33.38, 11.66, 38.34, 16.62, 38.34, 22.73);
        context.bezierCurveTo(38.34, 28.84, 33.38, 33.79, 27.27, 33.79);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Niche_Icon_Element_2 Drawing
        context.beginPath();
        context.moveTo(29.46, 22.22);
        context.lineTo(29.48, 22.21);
        context.bezierCurveTo(30.85, 21.42, 31.69, 19.96, 31.69, 18.39);
        context.bezierCurveTo(31.69, 15.95, 29.71, 13.97, 27.28, 13.97);
        context.bezierCurveTo(24.84, 13.97, 22.86, 15.95, 22.86, 18.38);
        context.lineTo(22.86, 18.39);
        context.bezierCurveTo(22.86, 19.96, 23.7, 21.42, 25.07, 22.21);
        context.bezierCurveTo(22.36, 22.65, 20.27, 25.01, 20.27, 27.86);
        context.lineTo(20.27, 28.59);
        context.lineTo(20.27, 28.59);
        context.bezierCurveTo(20.27, 28.81, 20.44, 28.99, 20.66, 28.99);
        context.lineTo(33.89, 28.99);
        context.lineTo(33.89, 28.99);
        context.bezierCurveTo(34.11, 28.99, 34.28, 28.81, 34.28, 28.59);
        context.lineTo(34.28, 27.86);
        context.bezierCurveTo(34.28, 25.01, 32.2, 22.65, 29.46, 22.22);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Niche_Icon_Element_1 Drawing
        context.beginPath();
        context.moveTo(15.17, 31.5);
        context.lineTo(8.5, 38.17);
        context.lineTo(8.5, 38.17);
        context.bezierCurveTo(7.84, 38.83, 7.84, 39.9, 8.5, 40.55);
        context.lineTo(9.45, 41.5);
        context.lineTo(9.45, 41.5);
        context.bezierCurveTo(10.1, 42.16, 11.17, 42.16, 11.83, 41.5);
        context.lineTo(18.5, 34.83);
        context.lineTo(18.51, 34.84);
        context.bezierCurveTo(17.24, 33.92, 16.11, 32.79, 15.18, 31.52);
        context.lineTo(15.17, 31.5);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();

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

    function insetRect(rect, insetX, insetY) {
        return {x: rect.x + insetX, y: rect.y + insetY, w: rect.w - 2*insetX, h: rect.h - 2*insetY};
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
    GenericRollsAbsolute.drawGenericRollsAbsoluteCanvas = drawGenericRollsAbsoluteCanvas;
    GenericRollsAbsolute.drawArrowCanvas = drawArrowCanvas;
    GenericRollsAbsolute.drawPopulationCanvas = drawPopulationCanvas;
    GenericRollsAbsolute.drawInvestorCanvas = drawInvestorCanvas;
    GenericRollsAbsolute.drawBubble = drawBubble;
    GenericRollsAbsolute.drawPoliticsCanvas = drawPoliticsCanvas;
    GenericRollsAbsolute.drawEnergyCanvas = drawEnergyCanvas;
    GenericRollsAbsolute.drawPlanerCanvas = drawPlanerCanvas;
    GenericRollsAbsolute.drawIndustryCanvas = drawIndustryCanvas;
    GenericRollsAbsolute.drawGridLineCanvas = drawGridLineCanvas;
    GenericRollsAbsolute.drawNicheCanvas = drawNicheCanvas;

    // Utilities
    GenericRollsAbsolute.clearCanvas = clearCanvas;
    GenericRollsAbsolute.makeRect = makeRect;

})();


/**
 * Rollbar Component
 * -----------------
 *
 * This Component renders the html canvas for the generic rolls barchart
 *
 * @param id                String:     ID of the generic roll chart
 * @param title             String:     Title of the generic roll chart (e.g. "actions per role")
 * @param settings          Dictionary: Settings for the rolls
 * @param yAxis             String:     Label of the y-axis (e.g. "number of actions")
 * @param min               Integer:    Min value on the y-axis
 * @param max               Integer:    Max value on the y-axis
 * @param data              Dictionary: Values of the rolls
 *
 *
 * settings dictionary:
 * -------------------------
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
 * important: with the order of the color definition, the order of the displayed values are determined
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
 *
 *
 */
class RollBars extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title:          this.props.title,
            id:             this.props.id,
            settings:  this.props.settings,
            yAxis:          this.props.yAxis,

        };

    }

    componentDidMount() {
        GenericRollsAbsolute.clearCanvas(this.state.id);
        GenericRollsAbsolute.drawGenericRollsAbsoluteCanvas(
            this.state.id,
            this.state.title,
            this.state.settings,
            this.props.max,
            this.props.min,
            this.state.yAxis,
            this.props.data,
            GenericRollsAbsolute.makeRect(0, 0, 600, 320));

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        GenericRollsAbsolute.clearCanvas(this.state.id);
        GenericRollsAbsolute.drawGenericRollsAbsoluteCanvas(
            this.state.id,
            this.state.title,
            this.state.settings,
            this.props.max,
            this.props.min,
            this.state.yAxis,
            this.props.data,
            GenericRollsAbsolute.makeRect(0, 0, 600, 320));
    }

    render() {
        return (
            <div>
                <canvas id={this.state.id} width="600" height="344"/>
            </div>
        )
    }

}


export default RollBars
