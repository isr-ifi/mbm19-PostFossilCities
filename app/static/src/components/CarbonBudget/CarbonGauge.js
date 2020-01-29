import React, { Component } from 'react';


//// Create StyleKit Object
var CarbonGaugeKit = {};
(function() {

    //// Drawing Methods

    function drawCarbonGauge(
        canvas,                     carbonBudgetTitle,          currentEmissionsText,
        criticalValueText,          emission_unit,              settings,
        cumulated_emissions_value,  critical_emissions_value,   yearCount,
        growthSpeed,                targetFrame,                resizing) {

        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        var fill_percentage = cumulated_emissions_value / critical_emissions_value;


        var carbonFillFraction      = 0;
        var dropFraction            = 0;
        var carbonOverFillFraction  = 0;


        if (fill_percentage >= 1.05) {
            carbonFillFraction = 1;
            dropFraction = 1;
            carbonOverFillFraction = (fill_percentage - 1.05) / 2 + 0.06
        }

        else if (fill_percentage >= 1) {
            carbonFillFraction = 1;
            dropFraction = (fill_percentage - 1) * 20;
            carbonOverFillFraction = 0;
        }

        else {
            carbonFillFraction = fill_percentage;
            dropFraction = 0;
            carbonOverFillFraction = 0;
        }


        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 600, 500), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 600, resizedFrame.h / 500);


        //// Color Declarations
        var liquidDarker        = 'rgba(41, 21, 7, 1)';
        var dark_Light          = 'rgba(41, 21, 7, 0.1)';
        var liquidLight         = 'rgba(94, 77, 50, 1)';
        var white               = 'rgba(255, 255, 255, 1)';
        var color               = 'rgba(0, 0, 0, 1)';
        var fillColor           = 'rgba(72, 170, 97, 1)';
        var fillColor2          = 'rgba(191, 80, 81, 1)';
        var light_Gray          = 'rgba(242, 242, 242, 1)';
        var dark_Gray           = 'rgba(190, 190, 190, 1)';
        var color4              = 'rgba(0, 0, 0, 1)';

        //// Variable Declarations
        var critial_value_text          = ('' + Math.round(critical_emissions_value)) + ' ' + emission_unit;
        var cumulated_emissions_text    = ('' + Math.round(cumulated_emissions_value)) + ' ' + emission_unit;

        var dropVisible                 = carbonFillFraction === 1;

        var carbonLevelTop              = -1 * carbonFillFraction * 310 + 310;
        var carbonWidthTop              = 204 + 1 * carbonFillFraction;
        var carbonScaleXTop             = 0.87 + carbonFillFraction * 0.13;
        var carbonScaleYTop             = 1.1 - carbonFillFraction * 0.1;
        var currentEmissionsHeight      = -carbonFillFraction * 310;
        var carbonOverFill              = carbonOverFillFraction + 0.059;

        var arrowUpX2isVisible          = growthSpeed === 5;
        var arrowUpX1isVisible          = growthSpeed === 4;
        var arrowDowX1isVisible         = growthSpeed === 2;
        var arrowDownX2isVisible        = growthSpeed === 1;

        //// Emissions_Overfill Drawing
        context.save();
        context.translate(300.5, 422);
        context.scale(carbonOverFill, carbonOverFill);

        oval(context, -1590.5, -521, 3181, 1042);
        context.fillStyle = liquidLight;
        context.fill();

        context.restore();


        //// Title Drawing
        var titleRect = makeRect(0, 0, 600, 41);
        context.fillStyle = 'rgb(0, 0, 0)';
        context.font = 'bold 16px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var titleTotalHeight = 16 * 1.3;
        context.fillText(carbonBudgetTitle, titleRect.x + titleRect.w/2, titleRect.y + 16 + titleRect.h / 2 - titleTotalHeight / 2);


        //// Current_Emissions_Value Drawing
        context.save();
        context.translate(176, 417);

        var current_Emissions_ValueRect = makeRect(-146, currentEmissionsHeight, 146, 30);
        context.fillStyle = 'rgb(0, 0, 0)';
        context.font = '11px HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var current_Emissions_ValueTotalHeight = 11 * 1.3;
        context.fillText(cumulated_emissions_text, current_Emissions_ValueRect.x + current_Emissions_ValueRect.w, current_Emissions_ValueRect.y + 10 + current_Emissions_ValueRect.h / 2 - current_Emissions_ValueTotalHeight / 2);

        context.restore();


        //// Current_Emissions_Label Drawing
        context.save();
        context.translate(176, 399);

        var current_Emissions_LabelRect = makeRect(-122, currentEmissionsHeight, 122, 33);
        context.fillStyle = 'rgb(0, 0, 0)';
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var current_Emissions_LabelTotalHeight = 13 * 1.3;
        context.fillText(currentEmissionsText, current_Emissions_LabelRect.x + current_Emissions_LabelRect.w, current_Emissions_LabelRect.y + 13 + current_Emissions_LabelRect.h / 2 - current_Emissions_LabelTotalHeight / 2);

        context.restore();


        //// Critical_Value_Value Drawing
        var critical_Value_ValueRect = makeRect(425, 113, 156, 24);
        context.fillStyle = 'rgb(0, 0, 0)';
        context.font = '11px HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'left';
        var critical_Value_ValueTotalHeight = 11 * 1.3;
        context.fillText(critial_value_text, critical_Value_ValueRect.x, critical_Value_ValueRect.y + 10 + critical_Value_ValueRect.h / 2 - critical_Value_ValueTotalHeight / 2);


        //// Critical_Value_Label Drawing
        var critical_Value_LabelRect = makeRect(425, 98, 156, 24);
        context.fillStyle = 'rgb(0, 0, 0)';
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'left';
        var critical_Value_LabelTotalHeight = 13 * 1.3;
        context.fillText(criticalValueText, critical_Value_LabelRect.x, critical_Value_LabelRect.y + 13 + critical_Value_LabelRect.h / 2 - critical_Value_LabelTotalHeight / 2);


        //// Glass_Top Drawing
        oval(context, 190, 75, 220, 62);
        context.fillStyle = light_Gray;
        context.fill();


        //// Glass_Back Drawing
        context.beginPath();
        context.moveTo(297.47, 137.02);
        context.bezierCurveTo(373.33, 137.02, 409, 118, 410, 107);
        context.lineTo(397.72, 422.87);
        context.bezierCurveTo(396.81, 441.75, 348.05, 454.34, 297.47, 454.34);
        context.bezierCurveTo(246.9, 454.34, 204.45, 439.95, 203.55, 422.87);
        context.lineTo(190, 107.36);
        context.bezierCurveTo(190.9, 117.25, 221.61, 137.02, 297.47, 137.02);
        context.closePath();
        context.fillStyle = white;
        context.fill();


        //// Emissions_Bottom Drawing
        oval(context, 212, 388, 177, 58);
        context.fillStyle = liquidDarker;
        context.fill();


        //// Emissions_Group

        function emissions_GroupCanvasLayer(width, height) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = canvas.width/pixelRatio + 'px';
            canvas.style.height = canvas.height/pixelRatio + 'px';
            canvas.paintCodePixelRatio = pixelRatio;
            var context = canvas.getContext('2d');

            context.scale(pixelRatio, pixelRatio);


            //// Emissions_FIll Drawing
            context.beginPath();
            context.moveTo(212, 417);
            context.lineTo(389, 417);
            context.lineTo(403, 107);
            context.lineTo(198, 107);
            context.lineTo(212, 417);
            context.closePath();
            context.fillStyle = liquidDarker;
            context.fill();


            //// Emission_Mask_Group

            function emission_Mask_GroupCanvasLayer(width, height) {
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                canvas.style.width = canvas.width/pixelRatio + 'px';
                canvas.style.height = canvas.height/pixelRatio + 'px';
                canvas.paintCodePixelRatio = pixelRatio;
                var context = canvas.getContext('2d');

                context.scale(pixelRatio, pixelRatio);


                //// Emissions_Mask Drawing
                context.save();
                context.translate(198, 417);
                context.scale(1, carbonFillFraction);

                context.beginPath();
                context.rect(0, -310, 205, 310);
                context.fillStyle = color4;
                context.fill();

                context.restore();


                return canvas;
            }

            context.save();
            context.globalCompositeOperation = 'destination-in';
            context.drawImage(emission_Mask_GroupCanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
            context.restore();


            return canvas;
        }

        context.save();
        context.drawImage(emissions_GroupCanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
        context.restore();


        //// Emissions_Top Drawing
        context.save();
        context.translate(300.5, (carbonLevelTop + 106.893110795));
        context.scale(carbonScaleXTop, carbonScaleYTop);

        oval(context, -102.5, -27, carbonWidthTop, 54);
        context.fillStyle = liquidLight;
        context.fill();

        context.restore();


        //// Glass_Front Drawing
        context.save();
        context.globalAlpha = 0.5;
        context.beginPath();
        context.moveTo(297.47, 137.02);
        context.bezierCurveTo(373.33, 137.02, 409, 118, 410, 107);
        context.lineTo(397.72, 422.87);
        context.bezierCurveTo(396.81, 441.75, 348.05, 454.34, 297.47, 454.34);
        context.bezierCurveTo(246.9, 454.34, 204.45, 439.95, 203.55, 422.87);
        context.lineTo(190, 107.36);
        context.bezierCurveTo(190.9, 117.25, 221.61, 137.02, 297.47, 137.02);
        context.closePath();
        context.fillStyle = dark_Gray;
        context.fill();
        context.restore();


        if (dropVisible)
        {
            //// Rectangle Drawing
            context.save();
            context.translate(343.4, 114.95);
            context.rotate(0.8 * Math.PI / 180);
            context.scale(1, dropFraction);

            context.beginPath();
            context.moveTo(27.49, 332.02);
            context.bezierCurveTo(42.31, 263.15, 46.07, -0, 46.07, -0);
            context.lineTo(0, -0);
            context.bezierCurveTo(0, -0, 12.67, 400.9, 27.49, 332.02);
            context.closePath();
            context.fillStyle = liquidLight;
            context.fill();

            context.restore();
        }


        //// YearGroup
        //// Background_Oval Drawing
        context.beginPath();
        context.moveTo(363, 259);
        context.bezierCurveTo(363, 293.52, 335.02, 324, 300.5, 324);
        context.bezierCurveTo(265.98, 324, 238, 293.52, 238, 259);
        context.bezierCurveTo(238, 224.48, 262, 199, 300.5, 199);
        context.bezierCurveTo(339, 199, 363, 224.48, 363, 259);
        context.closePath();
        context.fillStyle = dark_Light;
        context.fill();


        //// YearLabelGroup
        //// YearPreLabel Drawing
        var yearPreLabelRect = makeRect(276, 237, 49, 15);
        context.fillStyle = color;
        context.font = 'bold 12px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var yearPreLabelTotalHeight = 12 * 1.3;
        context.fillText('Noch', yearPreLabelRect.x + yearPreLabelRect.w/2, yearPreLabelRect.y + 12 + yearPreLabelRect.h / 2 - yearPreLabelTotalHeight / 2);


        //// YearCountLabel Drawing
        var yearCountLabelRect = makeRect(276, 252, 49, 22);
        context.fillStyle = color;
        context.font = 'bold 27px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var yearCountLabelTotalHeight = 27 * 1.3;
        context.fillText(yearCount, yearCountLabelRect.x + yearCountLabelRect.w/2, yearCountLabelRect.y + 26 + yearCountLabelRect.h / 2 - yearCountLabelTotalHeight / 2);


        //// YearLabel Drawing
        var yearLabelRect = makeRect(276, 272, 49, 15);
        context.fillStyle = color;
        context.font = 'bold 12px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var yearLabelTotalHeight = 12 * 1.3;
        context.fillText('Jahre', yearLabelRect.x + yearLabelRect.w/2, yearLabelRect.y + 12 + yearLabelRect.h / 2 - yearLabelTotalHeight / 2);




        if (arrowDownX2isVisible)
        {
            //// ArrowsDownX2SVG
            //// ArrowDownX2_2 Drawing
            context.beginPath();
            context.moveTo(309.99, 298.74);
            context.lineTo(309.98, 298.73);
            context.lineTo(309.97, 298.72);
            context.bezierCurveTo(309, 297.78, 307.48, 297.81, 306.54, 298.79);
            context.lineTo(299.93, 305.7);
            context.lineTo(299.93, 305.7);
            context.bezierCurveTo(299.92, 305.71, 299.9, 305.71, 299.89, 305.7);
            context.lineTo(293.25, 298.73);
            context.lineTo(293.24, 298.72);
            context.bezierCurveTo(292.31, 297.75, 290.82, 297.71, 289.84, 298.63);
            context.lineTo(289.83, 298.64);
            context.bezierCurveTo(288.78, 299.62, 288.73, 301.32, 289.72, 302.37);
            context.lineTo(298.09, 311.23);
            context.bezierCurveTo(299.05, 312.25, 300.62, 312.26, 301.59, 311.25);
            context.lineTo(310.04, 302.45);
            context.bezierCurveTo(311.03, 301.42, 311.01, 299.74, 309.99, 298.74);
            context.closePath();
            context.fillStyle = fillColor;
            context.fill();


            //// ArrowDownX2_1 Drawing
            context.beginPath();
            context.moveTo(310.01, 287.78);
            context.lineTo(310, 287.77);
            context.bezierCurveTo(309.03, 286.81, 307.5, 286.84, 306.56, 287.82);
            context.lineTo(299.95, 294.74);
            context.lineTo(299.95, 294.74);
            context.bezierCurveTo(299.94, 294.75, 299.92, 294.75, 299.91, 294.74);
            context.lineTo(293.26, 287.76);
            context.lineTo(293.26, 287.76);
            context.bezierCurveTo(292.33, 286.79, 290.84, 286.75, 289.86, 287.66);
            context.lineTo(289.85, 287.67);
            context.bezierCurveTo(288.8, 288.66, 288.75, 290.36, 289.74, 291.41);
            context.lineTo(298.11, 300.27);
            context.bezierCurveTo(299.07, 301.28, 300.64, 301.29, 301.61, 300.28);
            context.lineTo(310.06, 291.48);
            context.bezierCurveTo(311.05, 290.45, 311.03, 288.78, 310.01, 287.78);
            context.closePath();
            context.fillStyle = fillColor;
            context.fill();


        }


        //// ArrowsDownX1SVG
        if (arrowDowX1isVisible)
        {
            //// ArrowDownX1 Drawing
            context.beginPath();
            context.moveTo(310.21, 293.78);
            context.lineTo(310.2, 293.77);
            context.lineTo(310.19, 293.76);
            context.bezierCurveTo(309.21, 292.82, 307.68, 292.85, 306.73, 293.83);
            context.lineTo(300.04, 300.72);
            context.lineTo(300.04, 300.72);
            context.bezierCurveTo(300.04, 300.73, 300.02, 300.73, 300.01, 300.72);
            context.lineTo(293.29, 293.76);
            context.lineTo(293.29, 293.76);
            context.bezierCurveTo(292.35, 292.79, 290.84, 292.75, 289.85, 293.67);
            context.lineTo(289.84, 293.68);
            context.bezierCurveTo(288.78, 294.66, 288.72, 296.35, 289.73, 297.4);
            context.lineTo(298.19, 306.23);
            context.bezierCurveTo(299.16, 307.25, 300.74, 307.26, 301.72, 306.25);
            context.lineTo(310.27, 297.48);
            context.bezierCurveTo(311.26, 296.45, 311.24, 294.78, 310.21, 293.78);
            context.closePath();
            context.fillStyle = fillColor;
            context.fill();
        }




        if (arrowUpX1isVisible)
        {
            //// ArrowUpX1SVG
            //// ArrowUpX1 Drawing
            context.beginPath();
            context.moveTo(310.21, 229.22);
            context.lineTo(310.2, 229.23);
            context.bezierCurveTo(309.22, 230.19, 307.68, 230.16, 306.73, 229.18);
            context.lineTo(300.05, 222.28);
            context.lineTo(300.05, 222.28);
            context.bezierCurveTo(300.04, 222.27, 300.02, 222.27, 300.01, 222.28);
            context.lineTo(293.29, 229.24);
            context.lineTo(293.29, 229.25);
            context.bezierCurveTo(292.35, 230.21, 290.84, 230.25, 289.85, 229.34);
            context.lineTo(289.84, 229.33);
            context.bezierCurveTo(288.78, 228.35, 288.72, 226.65, 289.73, 225.6);
            context.lineTo(298.19, 216.77);
            context.bezierCurveTo(299.16, 215.75, 300.74, 215.74, 301.72, 216.75);
            context.lineTo(310.27, 225.53);
            context.bezierCurveTo(311.26, 226.55, 311.24, 228.23, 310.21, 229.22);
            context.closePath();
            context.fillStyle = fillColor2;
            context.fill();


        }


        if (arrowUpX2isVisible)
        {
            //// ArrowUpX2SVG
            //// ArrowUpX2_2 Drawing
            context.beginPath();
            context.moveTo(309.99, 224.26);
            context.lineTo(309.98, 224.27);
            context.lineTo(309.97, 224.28);
            context.bezierCurveTo(309, 225.22, 307.48, 225.19, 306.54, 224.21);
            context.lineTo(299.93, 217.3);
            context.lineTo(299.93, 217.3);
            context.bezierCurveTo(299.92, 217.29, 299.9, 217.29, 299.9, 217.3);
            context.lineTo(293.25, 224.27);
            context.lineTo(293.24, 224.28);
            context.bezierCurveTo(292.31, 225.25, 290.82, 225.29, 289.84, 224.37);
            context.lineTo(289.83, 224.36);
            context.bezierCurveTo(288.78, 223.38, 288.73, 221.68, 289.72, 220.63);
            context.lineTo(298.09, 211.77);
            context.bezierCurveTo(299.05, 210.75, 300.62, 210.74, 301.59, 211.75);
            context.lineTo(310.04, 220.55);
            context.bezierCurveTo(311.03, 221.58, 311.01, 223.26, 309.99, 224.26);
            context.closePath();
            context.fillStyle = fillColor2;
            context.fill();


            //// ArrowUpX2_1 Drawing
            context.beginPath();
            context.moveTo(310.01, 235.22);
            context.lineTo(310, 235.23);
            context.bezierCurveTo(309.03, 236.19, 307.5, 236.16, 306.56, 235.18);
            context.lineTo(299.95, 228.26);
            context.lineTo(299.95, 228.26);
            context.bezierCurveTo(299.94, 228.25, 299.92, 228.25, 299.91, 228.26);
            context.lineTo(293.26, 235.24);
            context.lineTo(293.26, 235.24);
            context.bezierCurveTo(292.33, 236.21, 290.84, 236.25, 289.86, 235.34);
            context.lineTo(289.85, 235.33);
            context.bezierCurveTo(288.8, 234.34, 288.75, 232.64, 289.74, 231.59);
            context.lineTo(298.11, 222.73);
            context.bezierCurveTo(299.07, 221.72, 300.64, 221.71, 301.61, 222.72);
            context.lineTo(310.06, 231.52);
            context.bezierCurveTo(311.05, 232.55, 311.03, 234.22, 310.01, 235.22);
            context.closePath();
            context.fillStyle = fillColor2;
            context.fill();


        }

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
    CarbonGaugeKit.drawCarbonGauge = drawCarbonGauge;

    // Utilities
    CarbonGaugeKit.clearCanvas = clearCanvas;
    CarbonGaugeKit.makeRect = makeRect;

})();



/**
 *
 * CarbonGauge
 * -----------
 *
 * Draws the carbon gauge (glass on the left side of the carbon budget)
 *
 * @param id                        String:     ID of the carbon gauge
 * @param carbon_budget_title       String:     Title of the carbon gauge
 * @param cumulated_emissions       Integer:    Cumulated emissions
 * @param critical_emissions        Integer:    Ciritical emissions
 * @param emissions_label           String:     Label of the cumulated emissions
 * @param carbon_budget_label       String:     Label of the critical value
 * @param year_to_budget            Integer:    Number of years for reaching the critical value
 * @param year_speed                Integer:    Speed of emission growth 1: Fast Decrease
 *                                                                       2: Decrease
 *                                                                       3: Same Level
 *                                                                       4: Increase
 *                                                                       5: Fast Increase
 *
 */
class CarbonGauge extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id:                     this.props.id,
            carbon_budget_title:    this.props.carbon_budget_title,
            emission_unit:          this.props.emission_unit,
            emissions_label:        this.props.emissions_label,
            carbon_budget_label:    this.props.carbon_budget_label,
            settings:               this.props.settings
        }
    }

    componentDidMount() {
        CarbonGaugeKit.clearCanvas(this.state.id);
        CarbonGaugeKit.drawCarbonGauge(
            this.state.id,
            this.state.carbon_budget_title,
            this.state.emissions_label,
            this.state.carbon_budget_label,
            this.state.emission_unit,
            this.state.settings,

            this.props.cumulated_emissions,
            this.props.critical_emissions,
            this.props.year_to_budget,
            this.props.year_speed,
        );
    }

    // redraws canvas whenever a value updates
    componentDidUpdate(prevProps, prevState, snapshot) {
        CarbonGaugeKit.clearCanvas(this.state.id);
        CarbonGaugeKit.drawCarbonGauge(
            this.state.id,
            this.state.carbon_budget_title,
            this.state.emissions_label,
            this.state.carbon_budget_label,
            this.state.emission_unit,
            this.state.settings,

            this.props.cumulated_emissions,
            this.props.critical_emissions,
            this.props.year_to_budget,
            this.props.year_speed,
        );
    }


    render() {
        return (
            <div>
                <canvas
                    id={this.state.id + ""}
                    width="600"
                    height="500"
                />
            </div>
        )
    }

}

export default CarbonGauge
