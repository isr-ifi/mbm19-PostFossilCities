import React from 'react';


//// Create StyleKit Object
var RollspecificGoalsKit = {};
(function() {

    //// Drawing Methods

    function drawRollspecificGoals(canvas, title, goals, settings, data, targetFrame, resizing) {
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
        // Define Colors & Appereance
        // ----------------------------------------------------

        // Define high contrast
        // --------------------
        var high_contrast       = false;

        if (typeof settings.high_contrast !== 'undefined') {
            high_contrast       = settings.high_contrast;
        }

        // Icon & Font Color
        // -----------------
        var icon_Color          = 'rgba(45, 47, 49, 1)';
        var circle_color        = 'rgba(54, 54, 54, 0.27)';

        // Default Roll Colors
        // -------------------
        var politics_colors     = ['rgba(199, 70, 40, 1)', 'rgba(225, 116, 47, 1)'];
        var population_colors   = ['rgba(127, 182, 74, 1)', 'rgba(214, 225, 154, 1)'];
        var planer_colors       = ['rgba(82, 162, 204, 1)', 'rgba(167, 193, 85, 1)'];
        var niche_colors        = ['rgba(41, 93, 164, 1)', 'rgba(53, 144, 187, 1)'];
        var investor_colors     = ['rgba(249, 200, 52, 1)', 'rgba(255, 248, 86, 1)'];
        var industry_colors     = ['rgba(90, 98, 100, 1)', 'rgba(162, 170, 172, 1)'];
        var energy_colors       = ['rgba(237, 130, 42, 1)', 'rgba(255, 214, 85, 1)'];

        // Load defined colors
        // -------------------
        var settings_keys = Object.keys(settings.colors);

        settings_keys.forEach(key => {

            switch (key) {

                case "politics":
                    politics_colors[0]      = settings.colors.politics[0];
                    politics_colors[1]      = settings.colors.politics[1];

                case "energy":
                    energy_colors[0]        = settings.colors.energy[0];
                    energy_colors[1]        = settings.colors.energy[1];

                case "investor":
                    investor_colors[0]      = settings.colors.investor[0];
                    investor_colors[1]      = settings.colors.investor[1];

                case "population":
                    population_colors[0]    = settings.colors.population[0];
                    population_colors[1]    = settings.colors.population[1];

                case "planer":
                    planer_colors[0]        = settings.colors.planer[0];
                    planer_colors[1]        = settings.colors.planer[1];

                case "niche":
                    niche_colors[0]         = settings.colors.niche[0];
                    niche_colors[1]         = settings.colors.niche[1];

                case "industry":
                    industry_colors[0]      = settings.colors.industry[0];
                    industry_colors[1]      = settings.colors.industry[1];

            }

        });

        // Gradient Declarations
        // ---------------------
        function population_Gradient(g) {
            if (high_contrast) {
                g.addColorStop(0, population_colors[0]);
                g.addColorStop(1, population_colors[0]);
            } else {
                g.addColorStop(0, population_colors[0]);
                g.addColorStop(1, population_colors[1]);
            }
            return g;
        }
        function politics_Gradient(g) {
            if (high_contrast) {
                g.addColorStop(0, politics_colors[0]);
                g.addColorStop(1, politics_colors[0]);
            } else {
                g.addColorStop(0, politics_colors[0]);
                g.addColorStop(1, politics_colors[1]);
            }
            return g;
        }
        function planer_Gradient(g) {
            if (high_contrast) {
                g.addColorStop(0, planer_colors[0]);
                g.addColorStop(1, planer_colors[0]);
            } else {
                g.addColorStop(0, planer_colors[0]);
                g.addColorStop(1, planer_colors[1]);
            }
            return g;
        }
        function energy_Gradient(g) {
            if (high_contrast) {
                g.addColorStop(0, energy_colors[0]);
                g.addColorStop(1, energy_colors[0]);
            } else {
                g.addColorStop(0, energy_colors[0]);
                g.addColorStop(1, energy_colors[1]);
            }
            return g;
        }
        function investor_Gradient(g) {
            if (high_contrast) {
                g.addColorStop(0, investor_colors[0]);
                g.addColorStop(1, investor_colors[0]);
            } else {
                g.addColorStop(0, investor_colors[0]);
                g.addColorStop(1, investor_colors[1]);
            }
            return g;
        }
        function niche_Gradient(g) {
            if (high_contrast) {
                g.addColorStop(0, niche_colors[0]);
                g.addColorStop(1, niche_colors[0]);
            } else {
                g.addColorStop(0, niche_colors[0]);
                g.addColorStop(1, niche_colors[1]);
            }
            return g;
        }
        // industry
        function industry_Gradient(g) {
            if (high_contrast) {
                g.addColorStop(0, industry_colors[0]);
                g.addColorStop(1, industry_colors[0]);
            } else {
                g.addColorStop(0, industry_colors[0]);
                g.addColorStop(1, industry_colors[1]);
            }
            return g;
        }

        // Define line caps
        // ----------------
        var line_caps           = 'round';

        if (typeof settings.round_caps !== 'undefined') {
            if (!settings.round_caps) {
                line_caps       = 'butt';
            }
        }

        // ----------------------------------------------------
        // Vizualization Title
        // ----------------------------------------------------

        var visialization_TitleRect = makeRect(0, 0, 600, 41);
        context.fillStyle = icon_Color;
        context.font = 'bold 16px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var visialization_TitleTotalHeight = 16 * 1.3;
        context.fillText(title, visialization_TitleRect.x + visialization_TitleRect.w/2, visialization_TitleRect.y + 16 + visialization_TitleRect.h / 2 - visialization_TitleTotalHeight / 2);


        // ----------------------------------------------------
        // Draw Goals
        // ----------------------------------------------------
        var data_length             = Object.keys(data).length;
        var number_rows             = 1;
        var row_elements            = [data_length, 0];
        var current_element         = 1;
        var current_row             = 0;
        var width                   = 600;
        var goal_width              = 145;
        var goal_position_x         = 10;
        var goal_position_y         = 104;
        if (data_length >= 5) {
            number_rows             = 2;
            row_elements            = [Math.ceil(data_length / 2), Math.floor(data_length / 2)];
            goal_position_y         = 34;
        }
        var margin                  = ((width - 20) - (goal_width * row_elements[current_row])) / 2;
        goal_position_x             += margin;


        function draw_goal(data, goal, gradient, symbol) {

            // Variable Declaration
            // --------------------
            var circle_length           = data.value * 270;
            var icon_position           = data.value * -360;

            if (line_caps == 'butt') {
                icon_position           -= 14;
            }


            // Render Circle
            // -------------
            circle(context, goal_position_x + 30, goal_position_y + 39, 86, 86);
            context.strokeStyle = circle_color;
            context.lineWidth = 10;
            context.stroke();

            function fill_groupCanvasLayer(width, height) {
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                canvas.style.width = canvas.width/pixelRatio + 'px';
                canvas.style.height = canvas.height/pixelRatio + 'px';
                canvas.paintCodePixelRatio = pixelRatio;
                var context = canvas.getContext('2d');

                context.scale(pixelRatio, pixelRatio);
                context.save();
                context.translate(goal_position_x + 72.5, goal_position_y + 82.5);


                // Render Circle Fill
                context.beginPath();
                context.moveTo(52, -0.5);
                context.bezierCurveTo(52, 28.2, 28.74, 51.5, -0, 51.5);
                context.bezierCurveTo(-28.74, 51.5, -52, 28.2, -52, -0.5);
                context.bezierCurveTo(-52, -29.2, -28.74, -52.5, 0, -52.5);
                context.bezierCurveTo(28.74, -52.5, 52, -29.2, 52, -0.5);
                context.closePath();
                context.moveTo(34, -0.5);
                context.bezierCurveTo(34, -19.4, 18.75, -34.67, -0, -34.67);
                context.bezierCurveTo(-18.75, -34.67, -34, -19.4, -34, -0.5);
                context.bezierCurveTo(-34, 18.4, -18.75, 33.67, -0, 33.67);
                context.bezierCurveTo(18.75, 33.67, 34, 18.4, 34, -0.5);
                context.closePath();
                context.fillStyle = gradient(context.createLinearGradient(-0, -52.5, 0, 51.5));
                context.fill();


                //// Render Circle Mask
                context.save();
                context.translate(0, -0.5);
                context.rotate(-90 * Math.PI / 180);

                context.save();
                context.globalCompositeOperation = 'destination-in';
                circle(context, -43, -43, 86, 86);
                context.strokeStyle = icon_Color;
                context.lineWidth = 18;
                context.lineCap = line_caps;
                context.save();
                context.setLineDash([circle_length, 270]);
                context.lineDashOffset = 0;
                context.stroke();
                context.restore();
                context.restore();
                context.restore();
                context.restore();
                return canvas;
            }
            context.save();
            context.drawImage(fill_groupCanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
            context.restore();


            // Render Roll Symbol
            // ------------------
            var symbolRect = makeRect(goal_position_x +48, goal_position_y + 57, 50, 50);
            context.save();
            context.beginPath();
            context.rect(symbolRect.x, symbolRect.y, symbolRect.w, symbolRect.h);
            context.clip();
            context.translate(symbolRect.x, symbolRect.y);

            symbol(canvas, makeRect(0, 0, symbolRect.w, symbolRect.h), 'stretch');
            context.restore();


            // Render Flow Symbol
            // ------------------
            context.save();
            context.translate(goal_position_x + 73, goal_position_y + 82);
            context.rotate(-icon_position * Math.PI / 180);

            var arrow_symbol = makeRect(-8, -48.5, 14, 12);
            context.save();
            context.beginPath();
            context.rect(arrow_symbol.x, arrow_symbol.y, arrow_symbol.w, arrow_symbol.h);
            context.clip();
            context.translate(arrow_symbol.x, arrow_symbol.y);

            // Arrow Down x2
            if (data.speed === 1) {
                RollspecificGoalsKit.drawArrowDown2(canvas, makeRect(0, 0, arrow_symbol.w, arrow_symbol.h), 'stretch');
                context.restore();
            }
            // Arrow Down x1
            else if (data.speed === 2) {
                RollspecificGoalsKit.drawArrowDown1(canvas, makeRect(0, 0, arrow_symbol.w, arrow_symbol.h), 'stretch');
                context.restore();
            }
            // Arrow Equals
            else if (data.speed === 3) {
                RollspecificGoalsKit.drawArrowEqual(canvas, makeRect(0, 0, arrow_symbol.w, arrow_symbol.h), 'stretch');
                context.restore();
            }
            // Arrow Up x1
            else if (data.speed === 4) {
                RollspecificGoalsKit.drawArrowUp1(canvas, makeRect(0, 0, arrow_symbol.w, arrow_symbol.h), 'stretch');
                context.restore();
            }
            // Arrow Up x2
            else if (data.speed === 5) {
                RollspecificGoalsKit.drawArrowUp2(canvas, makeRect(0, 0, arrow_symbol.w, arrow_symbol.h), 'stretch');
                context.restore();
            }

            context.restore();


            // Goal Text Drawing
            // -----------------

            // Split words
            var goal_words = goal.split(/(?: |_)+/);
            var line = '';
            var i;
            var line_shift = 0;

            if (goal.length > 15) {
                line_shift = -7.5;
            }

            var words = [];
            for (i = 0; i < goal_words.length; i++) {
                if (goal_words[i].length > 15) {
                    var word_parts = goal_words[i].match(/.{1,15}/g)
                    word_parts.forEach( word => words.push(word));
                } else {
                    words.push(goal_words[i])
                }
            }

            goal_words = words;

            for (i = 0; i < goal_words.length; i++) {

                if ((line.length + goal_words[i].length) <= 15) {
                    if (line.length != 0) {
                        line += ' '
                    }
                    line += goal_words[i];

                    if (!goal_words[i+1] || (line.length + goal_words[i+1].length) > 15) {
                        var goalRect = makeRect(goal_position_x, goal_position_y, 145, 30);
                        context.fillStyle = icon_Color;
                        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
                        context.textAlign = 'center';
                        var goalTotalHeight = 13 * 1.3;
                        context.fillText(line, goalRect.x + goalRect.w/2, goalRect.y + 13 + goalRect.h / 2 - goalTotalHeight / 2 + line_shift);
                        context.restore();

                        line = '';
                        if (line_shift === -7.5){
                            line_shift += 15;
                        }
                    }

                }

                // Word Splitting
                else {
                    var word_parts = goal_words[i].match(/.{1,15}/g)

                }
            }


            // Change Values
            // -------------
            goal_position_x             += goal_width;
            current_element             += 1;

            if (current_element == row_elements[current_row] + 1){
                current_row             = 1;
                margin                  = ((width - 20) - (goal_width * row_elements[current_row])) / 2;
                goal_position_x         = margin + 10;
                goal_position_y         += 143;
            }

        }

        var data_keys = Object.keys(data);

        data_keys.forEach( key => {

            switch (key) {

                case "politics":
                    draw_goal(data.politics, goals.politics, politics_Gradient, RollspecificGoalsKit.drawPoliticsCanvas);
                    break;

                case "energy":
                    draw_goal(data.energy, goals.energy, energy_Gradient, RollspecificGoalsKit.drawEnergyCanvas);
                    break;

                case "investor":
                    draw_goal(data.investor, goals.investor, investor_Gradient, RollspecificGoalsKit.drawInvestorCanvas);
                    break;

                case "population":
                    draw_goal(data.population, goals.population, population_Gradient, RollspecificGoalsKit.drawPopulationCanvas);
                    break;

                case "planer":
                    draw_goal(data.planer, goals.planer, planer_Gradient, RollspecificGoalsKit.drawPlanerCanvas);
                    break;

                case "niche":
                    draw_goal(data.niche, goals.niche, niche_Gradient, RollspecificGoalsKit.drawNicheCanvas);
                    break;

                case "industry":
                    draw_goal(data.industry, goals.industry, industry_Gradient, RollspecificGoalsKit.drawIndustryCanvas);
                    break;

            }

        });

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
        context.moveTo(42.55, 34.68);
        context.lineTo(14.15, 7.77);
        context.lineTo(14.15, 7.77);
        context.bezierCurveTo(13.66, 7.31, 12.86, 7.31, 12.37, 7.77);
        context.bezierCurveTo(12.37, 7.77, 12.36, 7.78, 12.36, 7.78);
        context.lineTo(6.87, 13.03);
        context.lineTo(6.87, 13.03);
        context.bezierCurveTo(6.38, 13.49, 6.37, 14.24, 6.86, 14.72);
        context.lineTo(35.19, 41.65);
        context.lineTo(35.19, 41.65);
        context.bezierCurveTo(35.68, 42.12, 36.48, 42.12, 36.97, 41.65);
        context.lineTo(42.55, 36.38);
        context.lineTo(42.54, 36.39);
        context.bezierCurveTo(43.04, 35.92, 43.04, 35.15, 42.54, 34.68);
        context.lineTo(42.55, 34.68);
        context.closePath();
        context.moveTo(41.32, 35.56);
        context.lineTo(36.4, 40.31);
        context.lineTo(36.4, 40.31);
        context.bezierCurveTo(36.27, 40.44, 36.05, 40.45, 35.91, 40.32);
        context.bezierCurveTo(35.91, 40.32, 35.91, 40.32, 35.91, 40.32);
        context.lineTo(8.27, 14.09);
        context.lineTo(8.27, 14.09);
        context.bezierCurveTo(8.13, 13.96, 8.13, 13.75, 8.27, 13.62);
        context.lineTo(13.18, 8.9);
        context.lineTo(13.18, 8.9);
        context.bezierCurveTo(13.31, 8.77, 13.53, 8.77, 13.67, 8.9);
        context.bezierCurveTo(13.67, 8.9, 13.67, 8.9, 13.68, 8.9);
        context.lineTo(41.32, 35.09);
        context.lineTo(41.32, 35.09);
        context.bezierCurveTo(41.45, 35.22, 41.46, 35.43, 41.32, 35.56);
        context.lineTo(41.32, 35.56);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_13 Drawing
        context.beginPath();
        context.moveTo(6.59, 41.09);
        context.lineTo(8.69, 33.55);
        context.lineTo(15.23, 39.67);
        context.lineTo(7.26, 41.72);
        context.lineTo(7.26, 41.72);
        context.bezierCurveTo(6.97, 41.79, 6.67, 41.63, 6.59, 41.36);
        context.bezierCurveTo(6.57, 41.27, 6.57, 41.18, 6.59, 41.09);
        context.lineTo(6.59, 41.09);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_12 Drawing
        context.beginPath();
        context.moveTo(42.47, 13.96);
        context.lineTo(40.91, 15.41);
        context.lineTo(34.47, 9.29);
        context.lineTo(36.05, 7.82);
        context.lineTo(36.05, 7.82);
        context.bezierCurveTo(36.55, 7.36, 37.35, 7.37, 37.83, 7.85);
        context.lineTo(42.49, 12.26);
        context.lineTo(42.48, 12.26);
        context.bezierCurveTo(42.98, 12.73, 42.98, 13.48, 42.48, 13.95);
        context.lineTo(42.47, 13.96);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_11 Drawing
        context.beginPath();
        context.moveTo(32.22, 23.68);
        context.lineTo(39.32, 16.99);
        context.lineTo(32.88, 10.87);
        context.lineTo(25.76, 17.59);
        context.lineTo(32.22, 23.68);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_10 Drawing
        context.beginPath();
        context.moveTo(17.09, 25.54);
        context.lineTo(9.29, 32.89);
        context.lineTo(15.79, 38.96);
        context.lineTo(23.53, 31.66);
        context.lineTo(17.09, 25.54);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_9 Drawing
        context.beginPath();
        context.moveTo(36, 36.52);
        context.lineTo(34.48, 37.95);
        context.lineTo(33.58, 37.1);
        context.lineTo(35.1, 35.66);
        context.lineTo(35.1, 35.65);
        context.bezierCurveTo(35.21, 35.56, 35.38, 35.56, 35.48, 35.65);
        context.lineTo(36, 36.14);
        context.lineTo(36, 36.14);
        context.bezierCurveTo(36.11, 36.25, 36.11, 36.42, 36, 36.52);
        context.lineTo(36, 36.52);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_8 Drawing
        context.beginPath();
        context.moveTo(33.17, 33.86);
        context.lineTo(31.65, 35.29);
        context.lineTo(30.75, 34.44);
        context.lineTo(32.28, 33);
        context.lineTo(32.28, 33);
        context.bezierCurveTo(32.38, 32.9, 32.55, 32.9, 32.65, 33);
        context.lineTo(33.17, 33.49);
        context.lineTo(33.17, 33.49);
        context.bezierCurveTo(33.28, 33.59, 33.28, 33.76, 33.17, 33.86);
        context.lineTo(33.17, 33.86);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_7 Drawing
        context.beginPath();
        context.moveTo(30.35, 31.23);
        context.lineTo(28.84, 32.66);
        context.lineTo(27.94, 31.8);
        context.lineTo(29.46, 30.36);
        context.lineTo(29.46, 30.36);
        context.bezierCurveTo(29.57, 30.26, 29.73, 30.26, 29.84, 30.36);
        context.lineTo(30.35, 30.85);
        context.lineTo(30.35, 30.85);
        context.bezierCurveTo(30.46, 30.95, 30.46, 31.12, 30.35, 31.23);
        context.lineTo(30.35, 31.23);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_6 Drawing
        context.beginPath();
        context.moveTo(27.57, 28.57);
        context.lineTo(26.05, 30);
        context.lineTo(25.15, 29.15);
        context.lineTo(26.68, 27.71);
        context.lineTo(26.68, 27.71);
        context.bezierCurveTo(26.78, 27.61, 26.95, 27.61, 27.05, 27.71);
        context.lineTo(27.57, 28.2);
        context.lineTo(27.57, 28.2);
        context.bezierCurveTo(27.68, 28.3, 27.68, 28.47, 27.57, 28.57);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_5 Drawing
        context.beginPath();
        context.moveTo(24.75, 25.94);
        context.lineTo(23.24, 27.36);
        context.lineTo(22.34, 26.51);
        context.lineTo(23.86, 25.07);
        context.lineTo(23.86, 25.07);
        context.bezierCurveTo(23.97, 24.97, 24.13, 24.97, 24.24, 25.07);
        context.lineTo(24.75, 25.56);
        context.lineTo(24.75, 25.56);
        context.bezierCurveTo(24.86, 25.66, 24.86, 25.83, 24.75, 25.94);
        context.lineTo(24.75, 25.94);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_4 Drawing
        context.beginPath();
        context.moveTo(21.9, 23.26);
        context.lineTo(20.39, 24.69);
        context.lineTo(19.48, 23.84);
        context.lineTo(21.01, 22.4);
        context.lineTo(21.01, 22.4);
        context.bezierCurveTo(21.11, 22.3, 21.28, 22.3, 21.38, 22.4);
        context.lineTo(21.9, 22.89);
        context.lineTo(21.9, 22.89);
        context.bezierCurveTo(22.01, 22.99, 22.01, 23.16, 21.9, 23.26);
        context.lineTo(21.9, 23.26);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_3 Drawing
        context.beginPath();
        context.moveTo(19.18, 20.67);
        context.lineTo(17.67, 22.1);
        context.lineTo(16.76, 21.24);
        context.lineTo(18.29, 19.8);
        context.lineTo(18.29, 19.8);
        context.bezierCurveTo(18.39, 19.71, 18.56, 19.71, 18.66, 19.8);
        context.lineTo(19.18, 20.29);
        context.lineTo(19.18, 20.29);
        context.bezierCurveTo(19.29, 20.4, 19.29, 20.56, 19.18, 20.67);
        context.lineTo(19.18, 20.67);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_2 Drawing
        context.beginPath();
        context.moveTo(16.4, 18.06);
        context.lineTo(14.88, 19.49);
        context.lineTo(13.98, 18.64);
        context.lineTo(15.5, 17.2);
        context.lineTo(15.5, 17.2);
        context.bezierCurveTo(15.61, 17.1, 15.77, 17.1, 15.88, 17.2);
        context.lineTo(16.4, 17.69);
        context.lineTo(16.39, 17.69);
        context.bezierCurveTo(16.51, 17.79, 16.51, 17.96, 16.39, 18.06);
        context.lineTo(16.4, 18.06);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Planer_Element_1 Drawing
        context.beginPath();
        context.moveTo(13.49, 15.33);
        context.lineTo(11.97, 16.76);
        context.lineTo(11.07, 15.91);
        context.lineTo(12.59, 14.47);
        context.lineTo(12.59, 14.47);
        context.bezierCurveTo(12.7, 14.37, 12.86, 14.37, 12.97, 14.47);
        context.lineTo(13.49, 14.96);
        context.lineTo(13.49, 14.96);
        context.bezierCurveTo(13.6, 15.06, 13.6, 15.23, 13.49, 15.33);
        context.lineTo(13.49, 15.33);
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
        circle(context, 26, 27.52, 13.84, 6.44);
        context.fillStyle = icon_Color;
        context.fill();


        //// Bezier Drawing
        context.beginPath();
        context.moveTo(32.92, 42.77);
        context.bezierCurveTo(29.57, 42.77, 26.78, 41.72, 26.14, 40.31);
        context.bezierCurveTo(26.05, 40.51, 26, 40.72, 26, 40.93);
        context.bezierCurveTo(26, 42.62, 29.1, 44, 32.92, 44);
        context.bezierCurveTo(36.74, 44, 39.84, 42.62, 39.84, 40.93);
        context.bezierCurveTo(39.84, 40.72, 39.79, 40.51, 39.7, 40.31);
        context.bezierCurveTo(39.06, 41.72, 36.27, 42.77, 32.92, 42.77);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Bezier 2 Drawing
        context.beginPath();
        context.moveTo(32.92, 40.72);
        context.bezierCurveTo(29.57, 40.72, 26.78, 39.67, 26.14, 38.26);
        context.bezierCurveTo(26.05, 38.46, 26, 38.67, 26, 38.88);
        context.bezierCurveTo(26, 40.58, 29.1, 41.95, 32.92, 41.95);
        context.bezierCurveTo(36.74, 41.95, 39.84, 40.58, 39.84, 38.88);
        context.bezierCurveTo(39.84, 38.67, 39.79, 38.46, 39.7, 38.26);
        context.bezierCurveTo(39.06, 39.67, 36.27, 40.72, 32.92, 40.72);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Bezier 3 Drawing
        context.beginPath();
        context.moveTo(32.92, 38.86);
        context.bezierCurveTo(29.57, 38.86, 26.78, 37.8, 26.14, 36.4);
        context.bezierCurveTo(26.05, 36.6, 26, 36.8, 26, 37.01);
        context.bezierCurveTo(26, 38.71, 29.1, 40.08, 32.92, 40.08);
        context.bezierCurveTo(36.74, 40.08, 39.84, 38.71, 39.84, 37.01);
        context.bezierCurveTo(39.84, 36.8, 39.79, 36.6, 39.7, 36.4);
        context.bezierCurveTo(39.06, 37.8, 36.27, 38.86, 32.92, 38.86);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Bezier 4 Drawing
        context.beginPath();
        context.moveTo(32.92, 36.72);
        context.bezierCurveTo(29.57, 36.72, 26.78, 35.66, 26.14, 34.26);
        context.bezierCurveTo(26.05, 34.46, 26, 34.66, 26, 34.87);
        context.bezierCurveTo(26, 36.57, 29.1, 37.95, 32.92, 37.95);
        context.bezierCurveTo(36.74, 37.95, 39.84, 36.57, 39.84, 34.87);
        context.bezierCurveTo(39.84, 34.66, 39.79, 34.46, 39.7, 34.26);
        context.bezierCurveTo(39.06, 35.66, 36.27, 36.72, 32.92, 36.72);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Bezier 5 Drawing
        context.beginPath();
        context.moveTo(32.92, 34.67);
        context.bezierCurveTo(29.57, 34.67, 26.78, 33.61, 26.14, 32.21);
        context.bezierCurveTo(26.05, 32.41, 26, 32.61, 26, 32.82);
        context.bezierCurveTo(26, 34.52, 29.1, 35.9, 32.92, 35.9);
        context.bezierCurveTo(36.74, 35.9, 39.84, 34.52, 39.84, 32.82);
        context.bezierCurveTo(39.84, 32.61, 39.79, 32.41, 39.7, 32.21);
        context.bezierCurveTo(39.06, 33.61, 36.27, 34.67, 32.92, 34.67);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();




        //// Bezier 6 Drawing
        context.beginPath();
        context.moveTo(25.31, 40.98);
        context.lineTo(25.31, 28.85);
        context.lineTo(23.21, 28.85);
        context.bezierCurveTo(22.88, 28.85, 22.61, 28.58, 22.61, 28.25);
        context.lineTo(22.61, 24.09);
        context.bezierCurveTo(22.61, 23.76, 22.88, 23.49, 23.21, 23.49);
        context.lineTo(27.41, 23.49);
        context.bezierCurveTo(27.74, 23.49, 28.01, 23.76, 28.01, 24.09);
        context.lineTo(28.01, 25.7);
        context.bezierCurveTo(29, 25.28, 30.2, 24.97, 31.53, 24.83);
        context.lineTo(31.53, 9.66);
        context.bezierCurveTo(31.53, 8.39, 30.5, 7.37, 29.23, 7.37);
        context.lineTo(12.3, 7.37);
        context.bezierCurveTo(11.03, 7.37, 10, 8.39, 10, 9.66);
        context.lineTo(10, 38.7);
        context.bezierCurveTo(10, 39.96, 11.03, 40.98, 12.3, 40.98);
        context.lineTo(17.87, 40.98);
        context.lineTo(17.87, 34.69);
        context.bezierCurveTo(17.87, 34.36, 18.14, 34.09, 18.47, 34.09);
        context.lineTo(23.39, 34.09);
        context.bezierCurveTo(23.72, 34.09, 23.99, 34.36, 23.99, 34.69);
        context.lineTo(23.99, 40.98);
        context.lineTo(25.31, 40.98);
        context.lineTo(25.31, 40.98);
        context.closePath();
        context.moveTo(13.65, 14.74);
        context.bezierCurveTo(13.65, 14.41, 13.92, 14.14, 14.25, 14.14);
        context.lineTo(18.44, 14.14);
        context.bezierCurveTo(18.77, 14.14, 19.04, 14.41, 19.04, 14.74);
        context.lineTo(19.04, 18.9);
        context.bezierCurveTo(19.04, 19.23, 18.77, 19.5, 18.44, 19.5);
        context.lineTo(14.25, 19.5);
        context.bezierCurveTo(13.92, 19.5, 13.65, 19.23, 13.65, 18.9);
        context.lineTo(13.65, 14.74);
        context.closePath();
        context.moveTo(19.21, 28.25);
        context.bezierCurveTo(19.21, 28.58, 18.94, 28.85, 18.61, 28.85);
        context.lineTo(14.41, 28.85);
        context.bezierCurveTo(14.08, 28.85, 13.81, 28.58, 13.81, 28.25);
        context.lineTo(13.81, 24.09);
        context.bezierCurveTo(13.81, 23.76, 14.08, 23.49, 14.41, 23.49);
        context.lineTo(18.61, 23.49);
        context.bezierCurveTo(18.94, 23.49, 19.21, 23.76, 19.21, 24.09);
        context.lineTo(19.21, 28.25);
        context.lineTo(19.21, 28.25);
        context.closePath();
        context.moveTo(22.45, 14.74);
        context.bezierCurveTo(22.45, 14.41, 22.72, 14.14, 23.05, 14.14);
        context.lineTo(27.24, 14.14);
        context.bezierCurveTo(27.58, 14.14, 27.84, 14.41, 27.84, 14.74);
        context.lineTo(27.84, 18.9);
        context.bezierCurveTo(27.84, 19.23, 27.58, 19.5, 27.24, 19.5);
        context.lineTo(23.05, 19.5);
        context.bezierCurveTo(22.72, 19.5, 22.45, 19.23, 22.45, 18.9);
        context.lineTo(22.45, 14.74);
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
        context.moveTo(28.62, 24.81);
        context.bezierCurveTo(30.82, 23.55, 32.3, 21.19, 32.3, 18.47);
        context.bezierCurveTo(32.3, 14.44, 29.03, 11.17, 25, 11.17);
        context.bezierCurveTo(20.98, 11.17, 17.71, 14.44, 17.71, 18.47);
        context.bezierCurveTo(17.71, 21.19, 19.19, 23.55, 21.39, 24.81);
        context.bezierCurveTo(16.88, 25.52, 13.42, 29.42, 13.42, 34.13);
        context.lineTo(13.42, 35.35);
        context.lineTo(13.42, 35.35);
        context.bezierCurveTo(13.42, 35.71, 13.71, 36, 14.07, 36);
        context.lineTo(35.94, 36);
        context.lineTo(35.94, 36);
        context.bezierCurveTo(36.3, 36, 36.59, 35.71, 36.59, 35.35);
        context.lineTo(36.59, 34.13);
        context.bezierCurveTo(36.59, 29.42, 33.13, 25.52, 28.62, 24.81);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Population_Elements_2 Drawing
        context.beginPath();
        context.moveTo(16.92, 24);
        context.lineTo(16.87, 23.93);
        context.bezierCurveTo(14.76, 20.91, 14.49, 16.98, 16.16, 13.71);
        context.bezierCurveTo(16, 13.74, 15.87, 13.73, 15.73, 13.73);
        context.bezierCurveTo(12.52, 13.73, 9.92, 16.34, 9.92, 19.55);
        context.bezierCurveTo(9.92, 21.72, 11.1, 23.6, 12.85, 24.61);
        context.bezierCurveTo(9.25, 25.17, 6.5, 28.28, 6.5, 32.04);
        context.lineTo(6.5, 33.01);
        context.lineTo(6.5, 33.01);
        context.bezierCurveTo(6.5, 33.29, 6.73, 33.52, 7.02, 33.52);
        context.lineTo(11.06, 33.52);
        context.lineTo(11.06, 32.73);
        context.bezierCurveTo(11.06, 28.78, 13.48, 25.4, 16.92, 24);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Population_Elements_1 Drawing
        context.beginPath();
        context.moveTo(37.16, 24.61);
        context.bezierCurveTo(38.91, 23.6, 40.09, 21.72, 40.09, 19.55);
        context.bezierCurveTo(40.09, 16.34, 37.49, 13.73, 34.28, 13.73);
        context.bezierCurveTo(34.14, 13.73, 34.01, 13.74, 33.88, 13.75);
        context.lineTo(33.85, 13.71);
        context.bezierCurveTo(35.52, 16.98, 35.25, 20.91, 33.14, 23.93);
        context.bezierCurveTo(36.53, 25.4, 38.95, 28.78, 38.95, 32.73);
        context.lineTo(38.95, 33.52);
        context.lineTo(42.99, 33.52);
        context.lineTo(42.99, 33.52);
        context.bezierCurveTo(43.28, 33.52, 43.51, 33.29, 43.51, 33.01);
        context.lineTo(43.51, 32.04);
        context.bezierCurveTo(43.51, 28.28, 40.76, 25.17, 37.16, 24.61);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();

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
        context.moveTo(8.24, 38.23);
        context.lineTo(41.35, 38.23);
        context.lineTo(41.35, 38.23);
        context.bezierCurveTo(41.76, 38.23, 42.09, 38.58, 42.09, 39.02);
        context.lineTo(42.09, 40.97);
        context.lineTo(42.09, 40.97);
        context.bezierCurveTo(42.09, 40.99, 42.07, 41.01, 42.06, 41.01);
        context.lineTo(7.51, 41.01);
        context.lineTo(7.51, 41.01);
        context.bezierCurveTo(7.5, 41.01, 7.5, 41.01, 7.5, 41);
        context.lineTo(7.5, 39.02);
        context.lineTo(7.5, 39.02);
        context.bezierCurveTo(7.5, 38.58, 7.83, 38.23, 8.24, 38.23);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_9 Drawing
        context.beginPath();
        context.moveTo(10.04, 35.78);
        context.lineTo(39.55, 35.78);
        context.lineTo(39.55, 35.78);
        context.bezierCurveTo(39.96, 35.78, 40.29, 36.14, 40.29, 36.57);
        context.lineTo(40.29, 37.85);
        context.lineTo(40.29, 37.85);
        context.bezierCurveTo(40.29, 37.87, 40.27, 37.89, 40.26, 37.89);
        context.lineTo(9.31, 37.89);
        context.lineTo(9.31, 37.89);
        context.bezierCurveTo(9.3, 37.89, 9.3, 37.89, 9.3, 37.88);
        context.lineTo(9.3, 36.57);
        context.lineTo(9.3, 36.57);
        context.bezierCurveTo(9.3, 36.14, 9.63, 35.78, 10.04, 35.78);
        context.lineTo(10.04, 35.78);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_7 Drawing
        context.beginPath();
        context.moveTo(11.7, 33.32);
        context.lineTo(37.93, 33.32);
        context.lineTo(37.93, 33.32);
        context.bezierCurveTo(38.34, 33.32, 38.67, 33.68, 38.67, 34.11);
        context.lineTo(38.67, 35.39);
        context.lineTo(38.67, 35.39);
        context.bezierCurveTo(38.67, 35.41, 38.66, 35.43, 38.64, 35.43);
        context.lineTo(10.97, 35.43);
        context.lineTo(10.97, 35.43);
        context.bezierCurveTo(10.96, 35.43, 10.96, 35.42, 10.96, 35.42);
        context.lineTo(10.96, 34.11);
        context.lineTo(10.96, 34.11);
        context.bezierCurveTo(10.96, 33.68, 11.29, 33.32, 11.7, 33.32);
        context.lineTo(11.7, 33.32);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_5 Drawing
        roundedRect(context, 19.89, 19, 2.37, 13.8, 1.19);
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_2 Drawing
        context.beginPath();
        context.moveTo(10.94, 16.23);
        context.lineTo(38.61, 16.23);
        context.lineTo(38.61, 16.23);
        context.bezierCurveTo(38.63, 16.23, 38.64, 16.25, 38.64, 16.27);
        context.lineTo(38.64, 17.55);
        context.lineTo(38.64, 17.55);
        context.bezierCurveTo(38.64, 17.98, 38.31, 18.34, 37.9, 18.34);
        context.lineTo(11.67, 18.34);
        context.lineTo(11.67, 18.34);
        context.bezierCurveTo(11.26, 18.34, 10.93, 17.98, 10.93, 17.55);
        context.lineTo(10.93, 16.24);
        context.lineTo(10.93, 16.24);
        context.bezierCurveTo(10.93, 16.23, 10.93, 16.23, 10.94, 16.23);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_1 Drawing
        context.beginPath();
        context.moveTo(24.46, 7.04);
        context.lineTo(8.22, 15.07);
        context.bezierCurveTo(7.83, 15.26, 7.96, 15.89, 8.39, 15.89);
        context.lineTo(41.17, 15.89);
        context.bezierCurveTo(41.6, 15.89, 41.73, 15.26, 41.34, 15.07);
        context.lineTo(24.8, 7.04);
        context.lineTo(24.8, 7.04);
        context.bezierCurveTo(24.69, 6.99, 24.57, 6.99, 24.46, 7.04);
        context.lineTo(24.46, 7.04);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_ Drawing
        roundedRect(context, 12.89, 19, 2.37, 13.8, 1.19);
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_ 3 Drawing
        roundedRect(context, 27.89, 19, 2.37, 13.8, 1.19);
        context.fillStyle = icon_Color;
        context.fill();


        //// Politics_Elements_ 6 Drawing
        roundedRect(context, 34.89, 19, 2.37, 13.8, 1.19);
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
        context.moveTo(9.41, 42);
        context.lineTo(9.41, 42);
        context.bezierCurveTo(8.36, 42, 7.5, 41.14, 7.5, 40.08);
        context.lineTo(7.5, 9.91);
        context.lineTo(7.5, 9.92);
        context.bezierCurveTo(7.5, 8.86, 8.36, 8, 9.41, 8);
        context.lineTo(16.38, 8);
        context.lineTo(16.38, 8);
        context.bezierCurveTo(17.43, 8, 18.29, 8.86, 18.29, 9.92);
        context.lineTo(18.29, 24.6);
        context.lineTo(26.79, 17.73);
        context.lineTo(26.79, 17.72);
        context.bezierCurveTo(27.13, 17.45, 27.55, 17.3, 27.98, 17.3);
        context.bezierCurveTo(29.04, 17.3, 29.9, 18.16, 29.9, 19.22);
        context.lineTo(29.9, 24.73);
        context.lineTo(38.39, 17.86);
        context.lineTo(38.4, 17.86);
        context.bezierCurveTo(38.73, 17.59, 39.15, 17.44, 39.58, 17.44);
        context.bezierCurveTo(40.64, 17.44, 41.5, 18.3, 41.5, 19.35);
        context.lineTo(41.5, 40.09);
        context.lineTo(41.5, 40.08);
        context.bezierCurveTo(41.5, 41.14, 40.64, 42, 39.59, 42);
        context.lineTo(9.41, 42);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();

        context.restore();

    }

    function drawArrowUp2(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 16, 14), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 16, resizedFrame.h / 14);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Arrow 2 Drawing
        context.save();
        context.translate(7, 14);
        context.rotate(-90 * Math.PI / 180);

        context.beginPath();
        context.moveTo(13.5, 0.5);
        context.lineTo(13.49, 0.49);
        context.lineTo(13.49, 0.49);
        context.bezierCurveTo(12.86, -0.12, 11.89, -0.1, 11.28, 0.53);
        context.lineTo(7.03, 4.96);
        context.lineTo(7.03, 4.96);
        context.bezierCurveTo(7.02, 4.97, 7.01, 4.97, 7, 4.96);
        context.lineTo(2.73, 0.49);
        context.lineTo(2.72, 0.48);
        context.bezierCurveTo(2.13, -0.14, 1.17, -0.16, 0.54, 0.42);
        context.lineTo(0.53, 0.43);
        context.bezierCurveTo(-0.15, 1.06, -0.18, 2.15, 0.46, 2.83);
        context.lineTo(5.84, 8.51);
        context.bezierCurveTo(6.46, 9.16, 7.47, 9.16, 8.09, 8.52);
        context.lineTo(13.53, 2.87);
        context.bezierCurveTo(14.17, 2.22, 14.15, 1.14, 13.5, 0.5);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();

        context.restore();


        //// Arrow 1 Drawing
        context.save();
        context.translate(0, 13.99);
        context.rotate(-90 * Math.PI / 180);

        context.beginPath();
        context.moveTo(13.5, 0.5);
        context.lineTo(13.49, 0.49);
        context.bezierCurveTo(12.87, -0.12, 11.89, -0.1, 11.28, 0.53);
        context.lineTo(7.03, 4.96);
        context.lineTo(7.03, 4.96);
        context.bezierCurveTo(7.02, 4.97, 7.01, 4.97, 7, 4.96);
        context.lineTo(2.73, 0.49);
        context.lineTo(2.72, 0.48);
        context.bezierCurveTo(2.13, -0.14, 1.17, -0.16, 0.54, 0.42);
        context.lineTo(0.53, 0.43);
        context.bezierCurveTo(-0.15, 1.06, -0.18, 2.15, 0.46, 2.83);
        context.lineTo(5.84, 8.51);
        context.bezierCurveTo(6.46, 9.16, 7.47, 9.16, 8.09, 8.52);
        context.lineTo(13.53, 2.87);
        context.bezierCurveTo(14.17, 2.22, 14.15, 1.14, 13.5, 0.5);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();

        context.restore();

        context.restore();

    }

    function drawArrowUp1(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 16, 14), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 16, resizedFrame.h / 14);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Arrow 1
        context.save();
        context.translate(4, 14);
        context.rotate(-90 * Math.PI / 180);



        //// ArrowDownX2_1 Drawing
        context.beginPath();
        context.moveTo(13.51, 0.5);
        context.lineTo(13.5, 0.49);
        context.bezierCurveTo(12.88, -0.12, 11.9, -0.1, 11.29, 0.53);
        context.lineTo(7.04, 4.96);
        context.lineTo(7.04, 4.96);
        context.bezierCurveTo(7.03, 4.97, 7.02, 4.97, 7.02, 4.96);
        context.lineTo(2.74, 0.49);
        context.lineTo(2.73, 0.48);
        context.bezierCurveTo(2.14, -0.14, 1.18, -0.16, 0.55, 0.42);
        context.lineTo(0.54, 0.43);
        context.bezierCurveTo(-0.14, 1.06, -0.17, 2.15, 0.47, 2.83);
        context.lineTo(5.85, 8.51);
        context.bezierCurveTo(6.47, 9.16, 7.48, 9.16, 8.11, 8.52);
        context.lineTo(13.54, 2.87);
        context.bezierCurveTo(14.18, 2.22, 14.16, 1.14, 13.51, 0.5);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();



        context.restore();

        context.restore();

    }

    function drawArrowDown2(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 16, 14), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 16, resizedFrame.h / 14);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Arrow 1
        context.save();
        context.translate(4.5, 6.99);
        context.rotate(89.78 * Math.PI / 180);



        //// ArrowDownX2_1 Drawing
        context.beginPath();
        context.moveTo(6.5, -4);
        context.lineTo(6.49, -4.01);
        context.bezierCurveTo(5.87, -4.62, 4.89, -4.6, 4.28, -3.97);
        context.lineTo(0.03, 0.46);
        context.lineTo(0.03, 0.46);
        context.bezierCurveTo(0.02, 0.47, 0.01, 0.47, 0, 0.46);
        context.lineTo(-4.27, -4.01);
        context.lineTo(-4.28, -4.02);
        context.bezierCurveTo(-4.87, -4.64, -5.83, -4.66, -6.46, -4.08);
        context.lineTo(-6.47, -4.07);
        context.bezierCurveTo(-7.15, -3.44, -7.18, -2.35, -6.54, -1.67);
        context.lineTo(-1.16, 4.01);
        context.bezierCurveTo(-0.54, 4.66, 0.47, 4.66, 1.09, 4.02);
        context.lineTo(6.53, -1.63);
        context.bezierCurveTo(7.17, -2.28, 7.15, -3.36, 6.5, -4);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();



        context.restore();



        //// Arrow
        context.save();
        context.translate(11.5, 6.99);
        context.rotate(89.78 * Math.PI / 180);



        //// ArrowDownX2_ Drawing
        context.beginPath();
        context.moveTo(6.5, -4);
        context.lineTo(6.49, -4.01);
        context.bezierCurveTo(5.87, -4.62, 4.89, -4.6, 4.28, -3.97);
        context.lineTo(0.03, 0.46);
        context.lineTo(0.03, 0.46);
        context.bezierCurveTo(0.02, 0.47, 0.01, 0.47, 0, 0.46);
        context.lineTo(-4.27, -4.01);
        context.lineTo(-4.28, -4.02);
        context.bezierCurveTo(-4.87, -4.64, -5.83, -4.66, -6.46, -4.08);
        context.lineTo(-6.47, -4.07);
        context.bezierCurveTo(-7.15, -3.44, -7.18, -2.35, -6.54, -1.67);
        context.lineTo(-1.16, 4.01);
        context.bezierCurveTo(-0.54, 4.66, 0.47, 4.66, 1.09, 4.02);
        context.lineTo(6.53, -1.63);
        context.bezierCurveTo(7.17, -2.28, 7.15, -3.36, 6.5, -4);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();



        context.restore();

        context.restore();

    }

    function drawArrowDown1(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 16, 14), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 16, resizedFrame.h / 14);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Arrow 1
        context.save();
        context.translate(8.5, 6.99);
        context.rotate(89.78 * Math.PI / 180);



        //// ArrowDownX2_1 Drawing
        context.beginPath();
        context.moveTo(6.5, -4);
        context.lineTo(6.49, -4.01);
        context.bezierCurveTo(5.87, -4.62, 4.89, -4.6, 4.28, -3.97);
        context.lineTo(0.03, 0.46);
        context.lineTo(0.03, 0.46);
        context.bezierCurveTo(0.02, 0.47, 0.01, 0.47, 0, 0.46);
        context.lineTo(-4.27, -4.01);
        context.lineTo(-4.28, -4.02);
        context.bezierCurveTo(-4.87, -4.64, -5.83, -4.66, -6.46, -4.08);
        context.lineTo(-6.47, -4.07);
        context.bezierCurveTo(-7.15, -3.44, -7.18, -2.35, -6.54, -1.67);
        context.lineTo(-1.16, 4.01);
        context.bezierCurveTo(-0.54, 4.66, 0.47, 4.66, 1.09, 4.02);
        context.lineTo(6.53, -1.63);
        context.bezierCurveTo(7.17, -2.28, 7.15, -3.36, 6.5, -4);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();



        context.restore();

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
        context.moveTo(26.27, 7);
        context.bezierCurveTo(18.69, 7, 12.55, 13.15, 12.55, 20.73);
        context.bezierCurveTo(12.55, 28.31, 18.69, 34.45, 26.27, 34.45);
        context.bezierCurveTo(33.85, 34.45, 40, 28.31, 40, 20.73);
        context.bezierCurveTo(40, 13.15, 33.85, 7, 26.27, 7);
        context.closePath();
        context.moveTo(26.27, 31.79);
        context.bezierCurveTo(20.16, 31.79, 15.21, 26.84, 15.21, 20.73);
        context.bezierCurveTo(15.21, 14.62, 20.16, 9.66, 26.27, 9.66);
        context.bezierCurveTo(32.38, 9.66, 37.34, 14.62, 37.34, 20.73);
        context.bezierCurveTo(37.34, 26.84, 32.38, 31.79, 26.27, 31.79);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Niche_Icon_Element_2 Drawing
        context.beginPath();
        context.moveTo(28.46, 20.22);
        context.lineTo(28.48, 20.21);
        context.bezierCurveTo(29.85, 19.42, 30.69, 17.96, 30.69, 16.39);
        context.bezierCurveTo(30.69, 13.95, 28.71, 11.97, 26.28, 11.97);
        context.bezierCurveTo(23.84, 11.97, 21.86, 13.95, 21.86, 16.38);
        context.lineTo(21.86, 16.39);
        context.bezierCurveTo(21.86, 17.96, 22.7, 19.42, 24.07, 20.21);
        context.bezierCurveTo(21.36, 20.65, 19.27, 23.01, 19.27, 25.86);
        context.lineTo(19.27, 26.59);
        context.lineTo(19.27, 26.59);
        context.bezierCurveTo(19.27, 26.81, 19.44, 26.99, 19.66, 26.99);
        context.lineTo(32.89, 26.99);
        context.lineTo(32.89, 26.99);
        context.bezierCurveTo(33.11, 26.99, 33.28, 26.81, 33.28, 26.59);
        context.lineTo(33.28, 25.86);
        context.bezierCurveTo(33.28, 23.01, 31.2, 20.65, 28.46, 20.22);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();


        //// Niche_Icon_Element_1 Drawing
        context.beginPath();
        context.moveTo(14.17, 29.5);
        context.lineTo(7.5, 36.17);
        context.lineTo(7.5, 36.17);
        context.bezierCurveTo(6.84, 36.83, 6.84, 37.9, 7.5, 38.55);
        context.lineTo(8.45, 39.5);
        context.lineTo(8.45, 39.5);
        context.bezierCurveTo(9.1, 40.16, 10.17, 40.16, 10.83, 39.5);
        context.lineTo(17.5, 32.83);
        context.lineTo(17.51, 32.84);
        context.bezierCurveTo(16.24, 31.92, 15.11, 30.79, 14.18, 29.52);
        context.lineTo(14.17, 29.5);
        context.closePath();
        context.fillStyle = icon_Color;
        context.fill();

        context.restore();

    }

    function drawArrowEqual(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 16, 14), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 16, resizedFrame.h / 14);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Bezier Drawing
        context.save();
        context.translate(8, 7);
        context.rotate(-90 * Math.PI / 180);

        context.beginPath();
        context.moveTo(-4.75, 0.01);
        context.lineTo(4.75, -0.01);
        context.strokeStyle = icon_Color;
        context.lineWidth = 3.3;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();

        context.restore();

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

    function circle(context, x, y, w, h) {
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
    RollspecificGoalsKit.drawRollspecificGoals = drawRollspecificGoals;
    RollspecificGoalsKit.drawPlanerCanvas = drawPlanerCanvas;
    RollspecificGoalsKit.drawInvestorCanvas = drawInvestorCanvas;
    RollspecificGoalsKit.drawPopulationCanvas = drawPopulationCanvas;
    RollspecificGoalsKit.drawPoliticsCanvas = drawPoliticsCanvas;
    RollspecificGoalsKit.drawEnergyCanvas = drawEnergyCanvas;
    RollspecificGoalsKit.drawIndustryCanvas = drawIndustryCanvas;
    RollspecificGoalsKit.drawArrowUp2 = drawArrowUp2;
    RollspecificGoalsKit.drawArrowUp1 = drawArrowUp1;
    RollspecificGoalsKit.drawArrowDown2 = drawArrowDown2;
    RollspecificGoalsKit.drawArrowDown1 = drawArrowDown1;
    RollspecificGoalsKit.drawNicheCanvas = drawNicheCanvas;
    RollspecificGoalsKit.drawArrowEqual = drawArrowEqual;

    // Utilities
    RollspecificGoalsKit.clearCanvas = clearCanvas;
    RollspecificGoalsKit.makeRect = makeRect;

})();


/**
 * RollspecificRadialCharts
 * ------------------------
 *
 * This Component renders the html canvas for the rollspecific goal radial charts
 *
 * @param id                String:     ID of the rollspecific goal chart
 * @param title             String:     Title of the rollspecific goal chart (e.g. "Rollenziele")
 * @param goals             Dictionary: Defines the rolls and it rollspecific goal titles (e.g. "Rollenziele")
 * @param settings          Dictionary: Defines the rolls colors
 * @param data              Dictionary: Defines the roll data
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
 *
 * settings dictionary:
 * -------------------------
 *
 * example:
 *
 * {    colors: {
 *          politics:       ["rgba(199, 70, 40, 1)", "rgba(225, 116, 47, 1)"],
 *          energy:         ["rgba(249, 200, 52, 1)", "rgba(255, 248, 86, 1)"],
 *          investor:       ["rgba(90, 98, 100, 1)", "rgba(162, 170, 172, 1)"],
 *          population:     ["rgba(38, 111, 46, 1)", "rgba(167, 193, 85, 1)"],
 *          planer:         ["rgba(27, 73, 191, 1)", "rgba(106, 180, 236, 1)"],
 *          niche:          ["rgba(85, 44, 244, 1)", "rgba(146, 28, 227, 1)"],
 *          industry:       ["rgba(79, 54, 36, 1)", "rgba(181, 143, 96, 1)"],
 *      },
 *      round_caps:         false,
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
 */
class RollspecificRadialCharts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id:         this.props.id,
            title:      this.props.title,
            goals:      this.props.goals,
            settings:   this.props.settings
        }

    }

    componentDidMount() {

        RollspecificGoalsKit.clearCanvas(this.state.id);
        RollspecificGoalsKit.drawRollspecificGoals(
            this.state.id,
            this.state.title,
            this.state.goals,
            this.state.settings,
            this.props.data,
        );

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        RollspecificGoalsKit.clearCanvas(this.state.id);
        RollspecificGoalsKit.drawRollspecificGoals(
            this.state.id,
            this.props.title,
            this.state.goals,
            this.state.settings,
            this.props.data,
        );
    }

    render() {
        return (<canvas id={this.state.id} width="600" height="320" />)
    }
}

export default RollspecificRadialCharts
