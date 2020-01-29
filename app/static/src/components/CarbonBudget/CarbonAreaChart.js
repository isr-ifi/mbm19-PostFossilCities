import React, { Component } from 'react';





//// Create StyleKit Object
var CarbonArea = {};
(function() {

    //// Drawing Methods

    function drawTimeseries(canvas, title, y_label_text, min_value, max_value, today, a_label, b_label, c_label, d_label, data_1, data_2, data_3, data_4, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;


        var a_val_01 = data_1[1];
        var a_val_02 = data_1[2];
        var a_val_03 = data_1[3];
        var a_val_04 = data_1[4];
        var a_val_05 = data_1[5];
        var a_val_06 = data_1[6];
        var a_val_07 = data_1[7];
        var a_val_08 = data_1[8];
        var a_val_09 = data_1[9];
        var a_val_10 = data_1[10];
        var a_val_11 = data_1[11];
        var a_val_12 = data_1[12];
        var a_val_13 = data_1[13];
        var a_val_14 = data_1[14];
        var a_val_15 = data_1[15];
        var a_val_16 = data_1[16];
        var a_val_17 = data_1[17];
        var a_val_18 = data_1[18];
        var a_val_19 = data_1[19];
        var a_val_20 = data_1[20];
        var a_val_21 = data_1[21];
        var a_val_22 = data_1[22];
        var a_val_23 = data_1[23];
        var a_val_24 = data_1[24];
        var a_val_25 = data_1[25];
        var a_val_26 = data_1[26];
        var a_val_27 = data_1[27];
        var a_val_28 = data_1[28];
        var a_val_29 = data_1[29];
        var a_val_30 = data_1[30];
        var a_val_31 = data_1[31];
        var a_val_32 = data_1[32];
        var a_val_33 = data_1[33];
        var a_val_34 = data_1[34];
        var a_val_35 = data_1[35];
        var a_val_36 = data_1[36];
        var a_val_37 = data_1[37];
        var a_val_38 = data_1[38];
        var a_val_39 = data_1[39];
        var a_val_40 = data_1[40];
        var a_val_41 = data_1[41];

        var b_val_01 = data_2[1] + data_1[1];
        var b_val_02 = data_2[2] + data_1[2];
        var b_val_03 = data_2[3] + data_1[3];
        var b_val_04 = data_2[4] + data_1[4];
        var b_val_05 = data_2[5] + data_1[5];
        var b_val_06 = data_2[6] + data_1[6];
        var b_val_07 = data_2[7] + data_1[7];
        var b_val_08 = data_2[8] + data_1[8];
        var b_val_09 = data_2[9]  + data_1[9];
        var b_val_10 = data_2[10] + data_1[10];
        var b_val_11 = data_2[11] + data_1[11];
        var b_val_12 = data_2[12] + data_1[12];
        var b_val_13 = data_2[13] + data_1[13];
        var b_val_14 = data_2[14] + data_1[14];
        var b_val_15 = data_2[15] + data_1[15];
        var b_val_16 = data_2[16] + data_1[16];
        var b_val_17 = data_2[17] + data_1[17];
        var b_val_18 = data_2[18] + data_1[18];
        var b_val_19 = data_2[19] + data_1[19];
        var b_val_20 = data_2[20] + data_1[20];
        var b_val_21 = data_2[21] + data_1[21];
        var b_val_22 = data_2[22] + data_1[22];
        var b_val_23 = data_2[23] + data_1[23];
        var b_val_24 = data_2[24] + data_1[24];
        var b_val_25 = data_2[25] + data_1[25];
        var b_val_26 = data_2[26] + data_1[26];
        var b_val_27 = data_2[27] + data_1[27];
        var b_val_28 = data_2[28] + data_1[28];
        var b_val_29 = data_2[29] + data_1[29];
        var b_val_30 = data_2[30] + data_1[30];
        var b_val_31 = data_2[31] + data_1[31];
        var b_val_32 = data_2[32] + data_1[32];
        var b_val_33 = data_2[33] + data_1[33];
        var b_val_34 = data_2[34] + data_1[34];
        var b_val_35 = data_2[35] + data_1[35];
        var b_val_36 = data_2[36] + data_1[36];
        var b_val_37 = data_2[37] + data_1[37];
        var b_val_38 = data_2[38] + data_1[38];
        var b_val_39 = data_2[39] + data_1[39];
        var b_val_40 = data_2[40] + data_1[40];
        var b_val_41 = data_2[41] + data_1[41];

        var c_val_01 = data_3[1] + data_2[1] + data_1[1];
        var c_val_02 = data_3[2] + data_2[2] + data_1[2];
        var c_val_03 = data_3[3] + data_2[3] + data_1[3];
        var c_val_04 = data_3[4] + data_2[4] + data_1[4];
        var c_val_05 = data_3[5] + data_2[5] + data_1[5];
        var c_val_06 = data_3[6] + data_2[6] + data_1[6];
        var c_val_07 = data_3[7] + data_2[7] + data_1[7];
        var c_val_08 = data_3[8] + data_2[8] + data_1[8];
        var c_val_09 = data_3[9] + data_2[9]  + data_1[9];
        var c_val_10 = data_3[10] + data_2[10] + data_1[10];
        var c_val_11 = data_3[11] + data_2[11] + data_1[11];
        var c_val_12 = data_3[12] + data_2[12] + data_1[12];
        var c_val_13 = data_3[13] + data_2[13] + data_1[13];
        var c_val_14 = data_3[14] + data_2[14] + data_1[14];
        var c_val_15 = data_3[15] + data_2[15] + data_1[15];
        var c_val_16 = data_3[16] + data_2[16] + data_1[16];
        var c_val_17 = data_3[17] + data_2[17] + data_1[17];
        var c_val_18 = data_3[18] + data_2[18] + data_1[18];
        var c_val_19 = data_3[19] + data_2[19] + data_1[19];
        var c_val_20 = data_3[20] + data_2[20] + data_1[20];
        var c_val_21 = data_3[21] + data_2[21] + data_1[21];
        var c_val_22 = data_3[22] + data_2[22] + data_1[22];
        var c_val_23 = data_3[23] + data_2[23] + data_1[23];
        var c_val_24 = data_3[24] + data_2[24] + data_1[24];
        var c_val_25 = data_3[25] + data_2[25] + data_1[25];
        var c_val_26 = data_3[26] + data_2[26] + data_1[26];
        var c_val_27 = data_3[27] + data_2[27] + data_1[27];
        var c_val_28 = data_3[28] + data_2[28] + data_1[28];
        var c_val_29 = data_3[29] + data_2[29] + data_1[29];
        var c_val_30 = data_3[30] + data_2[30] + data_1[30];
        var c_val_31 = data_3[31] + data_2[31] + data_1[31];
        var c_val_32 = data_3[32] + data_2[32] + data_1[32];
        var c_val_33 = data_3[33] + data_2[33] + data_1[33];
        var c_val_34 = data_3[34] + data_2[34] + data_1[34];
        var c_val_35 = data_3[35] + data_2[35] + data_1[35];
        var c_val_36 = data_3[36] + data_2[36] + data_1[36];
        var c_val_37 = data_3[37] + data_2[37] + data_1[37];
        var c_val_38 = data_3[38] + data_2[38] + data_1[38];
        var c_val_39 = data_3[39] + data_2[39] + data_1[39];
        var c_val_40 = data_3[40] + data_2[40] + data_1[40];
        var c_val_41 = data_3[41] + data_2[41] + data_1[41];


        var d_val_01 = data_4[1] + data_3[1] + data_2[1] + data_1[1];
        var d_val_02 = data_4[2] + data_3[2] + data_2[2] + data_1[2];
        var d_val_03 = data_4[3] + data_3[3] + data_2[3] + data_1[3];
        var d_val_04 = data_4[4] + data_3[4] + data_2[4] + data_1[4];
        var d_val_05 = data_4[5] + data_3[5] + data_2[5] + data_1[5];
        var d_val_06 = data_4[6] + data_3[6] + data_2[6] + data_1[6];
        var d_val_07 = data_4[7] + data_3[7] + data_2[7] + data_1[7];
        var d_val_08 = data_4[8] + data_3[8] + data_2[8] + data_1[8];
        var d_val_09 = data_4[9] + data_3[9] + data_2[9]  + data_1[9];
        var d_val_10 = data_4[10] + data_3[10] + data_2[10] + data_1[10];
        var d_val_11 = data_4[11] + data_3[11] + data_2[11] + data_1[11];
        var d_val_12 = data_4[12] + data_3[12] + data_2[12] + data_1[12];
        var d_val_13 = data_4[13] + data_3[13] + data_2[13] + data_1[13];
        var d_val_14 = data_4[14] + data_3[14] + data_2[14] + data_1[14];
        var d_val_15 = data_4[15] + data_3[15] + data_2[15] + data_1[15];
        var d_val_16 = data_4[16] + data_3[16] + data_2[16] + data_1[16];
        var d_val_17 = data_4[17] + data_3[17] + data_2[17] + data_1[17];
        var d_val_18 = data_4[18] + data_3[18] + data_2[18] + data_1[18];
        var d_val_19 = data_4[19] + data_3[19] + data_2[19] + data_1[19];
        var d_val_20 = data_4[20] + data_3[20] + data_2[20] + data_1[20];
        var d_val_21 = data_4[21] + data_3[21] + data_2[21] + data_1[21];
        var d_val_22 = data_4[22] + data_3[22] + data_2[22] + data_1[22];
        var d_val_23 = data_4[23] + data_3[23] + data_2[23] + data_1[23];
        var d_val_24 = data_4[24] + data_3[24] + data_2[24] + data_1[24];
        var d_val_25 = data_4[25] + data_3[25] + data_2[25] + data_1[25];
        var d_val_26 = data_4[26] + data_3[26] + data_2[26] + data_1[26];
        var d_val_27 = data_4[27] + data_3[27] + data_2[27] + data_1[27];
        var d_val_28 = data_4[28] + data_3[28] + data_2[28] + data_1[28];
        var d_val_29 = data_4[29] + data_3[29] + data_2[29] + data_1[29];
        var d_val_30 = data_4[30] + data_3[30] + data_2[30] + data_1[30];
        var d_val_31 = data_4[31] + data_3[31] + data_2[31] + data_1[31];
        var d_val_32 = data_4[32] + data_3[32] + data_2[32] + data_1[32];
        var d_val_33 = data_4[33] + data_3[33] + data_2[33] + data_1[33];
        var d_val_34 = data_4[34] + data_3[34] + data_2[34] + data_1[34];
        var d_val_35 = data_4[35] + data_3[35] + data_2[35] + data_1[35];
        var d_val_36 = data_4[36] + data_3[36] + data_2[36] + data_1[36];
        var d_val_37 = data_4[37] + data_3[37] + data_2[37] + data_1[37];
        var d_val_38 = data_4[38] + data_3[38] + data_2[38] + data_1[38];
        var d_val_39 = data_4[39] + data_3[39] + data_2[39] + data_1[39];
        var d_val_40 = data_4[40] + data_3[40] + data_2[40] + data_1[40];
        var d_val_41 = data_4[41] + data_3[41] + data_2[41] + data_1[41];

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 600, 320), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 600, resizedFrame.h / 320);


        //// Color Declarations
        var line_Color = 'rgba(223, 223, 223, 1)';
        var icon_Color = 'rgba(45, 47, 49, 1)';
        var a_Color = 'rgba(62, 165, 220, 1)';
        var b_Color = 'rgba(213, 71, 71, 1)';
        var c_Color = 'rgba(59, 220, 123, 1)';
        var d_Color = 'rgba(242, 206, 49, 1)';

        //// Variable Declarations
        var y_label_0_text = ('' + Math.round((max_value - min_value) / 10 * 0 + min_value));
        var y_label_2_text = ('' + Math.round((max_value - min_value) / 10 * 2 + min_value));
        var y_label_4_text = ('' + Math.round((max_value - min_value) / 10 * 4 + min_value));
        var y_label_6_text = ('' + Math.round((max_value - min_value) / 10 * 6 + min_value));
        var y_label_8_text = ('' + Math.round((max_value - min_value) / 10 * 8 + min_value));
        var y_label_10_text = ('' + Math.round((max_value - min_value) / 10 * 10 + min_value));

        //// Legend
        //// D_Color_Bubble Drawing
        if (d_label != "") {
            oval(context, 474.5, 284.5, 15, 15);
            context.fillStyle = d_Color;
            context.fill();
        }


        //// D_Label Drawing
        var d_LabelRect = makeRect(497.5, 285.5, 89, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'left';
        var d_LabelTotalHeight = 13 * 1.3;
        context.fillText(d_label, d_LabelRect.x, d_LabelRect.y + 13 + d_LabelRect.h / 2 - d_LabelTotalHeight / 2);


        //// C_Color_Bubble Drawing
        if (c_label != ""){
            oval(context, 338, 284.5, 15, 15);
            context.fillStyle = c_Color;
            context.fill();
        }


        //// C_Label Drawing
        var c_LabelRect = makeRect(361, 285.5, 89, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'left';
        var c_LabelTotalHeight = 13 * 1.3;
        context.fillText(c_label, c_LabelRect.x, c_LabelRect.y + 13 + c_LabelRect.h / 2 - c_LabelTotalHeight / 2);


        //// B_Color_Bubble Drawing
        if (b_label != "") {
            oval(context, 197.5, 284.5, 15, 15);
            context.fillStyle = b_Color;
            context.fill();
        }


        //// B_Label Drawing
        var b_LabelRect = makeRect(220.5, 285.5, 89, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'left';
        var b_LabelTotalHeight = 13 * 1.3;
        context.fillText(b_label, b_LabelRect.x, b_LabelRect.y + 13 + b_LabelRect.h / 2 - b_LabelTotalHeight / 2);


        //// A_Color_Bubble Drawing
        oval(context, 57.5, 284.5, 15, 15);
        context.fillStyle = a_Color;
        context.fill();


        //// A_Label Drawing
        var a_LabelRect = makeRect(80.5, 285.5, 89, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'left';
        var a_LabelTotalHeight = 13 * 1.3;
        context.fillText(a_label, a_LabelRect.x, a_LabelRect.y + 13 + a_LabelRect.h / 2 - a_LabelTotalHeight / 2);




        //// Grid_Pattern Drawing
        context.save();
        context.translate(64, 252);

        var grid_PatternRect = makeRect(0, -202, 520, 202);
        context.save();
        context.beginPath();
        context.rect(grid_PatternRect.x, grid_PatternRect.y, grid_PatternRect.w, grid_PatternRect.h);
        context.clip();
        context.translate(grid_PatternRect.x, grid_PatternRect.y);

        CarbonArea.drawGridpattern(canvas, makeRect(0, 0, grid_PatternRect.w, grid_PatternRect.h), 'stretch');
        context.restore();

        context.restore();


        //// Y_Label_Group
        //// Y_Label_0 Drawing
        var y_Label_0Rect = makeRect(9, 247, 41, 10);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var y_Label_0TotalHeight = 13 * 1.3;
        context.fillText(y_label_0_text, y_Label_0Rect.x + y_Label_0Rect.w, y_Label_0Rect.y + 13 + y_Label_0Rect.h / 2 - y_Label_0TotalHeight / 2);


        //// Y_Label_2 Drawing
        var y_Label_2Rect = makeRect(9, 206, 41, 11);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var y_Label_2TotalHeight = 13 * 1.3;
        context.fillText(y_label_2_text, y_Label_2Rect.x + y_Label_2Rect.w, y_Label_2Rect.y + 13 + y_Label_2Rect.h / 2 - y_Label_2TotalHeight / 2);


        //// Y_Label_4 Drawing
        var y_Label_4Rect = makeRect(9, 166, 41, 10);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var y_Label_4TotalHeight = 13 * 1.3;
        context.fillText(y_label_4_text, y_Label_4Rect.x + y_Label_4Rect.w, y_Label_4Rect.y + 13 + y_Label_4Rect.h / 2 - y_Label_4TotalHeight / 2);


        //// Y_Label_6 Drawing
        var y_Label_6Rect = makeRect(9, 126, 41, 10);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var y_Label_6TotalHeight = 13 * 1.3;
        context.fillText(y_label_6_text, y_Label_6Rect.x + y_Label_6Rect.w, y_Label_6Rect.y + 13 + y_Label_6Rect.h / 2 - y_Label_6TotalHeight / 2);


        //// Y_Label_8 Drawing
        var y_Label_8Rect = makeRect(9, 85, 41, 11);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var y_Label_8TotalHeight = 13 * 1.3;
        context.fillText(y_label_8_text, y_Label_8Rect.x + y_Label_8Rect.w, y_Label_8Rect.y + 13 + y_Label_8Rect.h / 2 - y_Label_8TotalHeight / 2);


        //// Y_Label_10 Drawing
        var y_Label_10Rect = makeRect(9, 45, 41, 10);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'right';
        var y_Label_10TotalHeight = 13 * 1.3;
        context.fillText(y_label_10_text, y_Label_10Rect.x + y_Label_10Rect.w, y_Label_10Rect.y + 13 + y_Label_10Rect.h / 2 - y_Label_10TotalHeight / 2);




        //// X_Label_Group
        //// X_Label_01 Drawing
        var x_Label_01Rect = makeRect(46, 263, 37, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_01TotalHeight = 13 * 1.3;
        context.fillText('2020', x_Label_01Rect.x + x_Label_01Rect.w/2, x_Label_01Rect.y + 13 + x_Label_01Rect.h / 2 - x_Label_01TotalHeight / 2);


        //// X_Label_02 Drawing
        var x_Label_02Rect = makeRect(111, 263, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_02TotalHeight = 13 * 1.3;
        context.fillText('2030', x_Label_02Rect.x + x_Label_02Rect.w/2, x_Label_02Rect.y + 13 + x_Label_02Rect.h / 2 - x_Label_02TotalHeight / 2);


        //// X_Label_ 2 Drawing
        var x_Label_2Rect = makeRect(176, 263, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_2TotalHeight = 13 * 1.3;
        context.fillText('2040', x_Label_2Rect.x + x_Label_2Rect.w/2, x_Label_2Rect.y + 13 + x_Label_2Rect.h / 2 - x_Label_2TotalHeight / 2);


        //// X_Label_ 3 Drawing
        var x_Label_3Rect = makeRect(241, 263, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_3TotalHeight = 13 * 1.3;
        context.fillText('2050', x_Label_3Rect.x + x_Label_3Rect.w/2, x_Label_3Rect.y + 13 + x_Label_3Rect.h / 2 - x_Label_3TotalHeight / 2);


        //// X_Label_ 4 Drawing
        var x_Label_4Rect = makeRect(306, 263, 37, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_4TotalHeight = 13 * 1.3;
        context.fillText('2060', x_Label_4Rect.x + x_Label_4Rect.w/2, x_Label_4Rect.y + 13 + x_Label_4Rect.h / 2 - x_Label_4TotalHeight / 2);


        //// X_Label_ 5 Drawing
        var x_Label_5Rect = makeRect(370, 263, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_5TotalHeight = 13 * 1.3;
        context.fillText('2070', x_Label_5Rect.x + x_Label_5Rect.w/2, x_Label_5Rect.y + 13 + x_Label_5Rect.h / 2 - x_Label_5TotalHeight / 2);


        //// X_Label_ 6 Drawing
        var x_Label_6Rect = makeRect(435, 263, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_6TotalHeight = 13 * 1.3;
        context.fillText('2080', x_Label_6Rect.x + x_Label_6Rect.w/2, x_Label_6Rect.y + 13 + x_Label_6Rect.h / 2 - x_Label_6TotalHeight / 2);


        //// X_Label_ 7 Drawing
        var x_Label_7Rect = makeRect(500, 263, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_7TotalHeight = 13 * 1.3;
        context.fillText('2090', x_Label_7Rect.x + x_Label_7Rect.w/2, x_Label_7Rect.y + 13 + x_Label_7Rect.h / 2 - x_Label_7TotalHeight / 2);


        //// X_Label_ 8 Drawing
        var x_Label_8Rect = makeRect(565, 263, 38, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var x_Label_8TotalHeight = 13 * 1.3;
        context.fillText('2100', x_Label_8Rect.x + x_Label_8Rect.w/2, x_Label_8Rect.y + 13 + x_Label_8Rect.h / 2 - x_Label_8TotalHeight / 2);




        //// D_Forecast
        //// B_Past_Bezier 5 Drawing
        context.save();
        context.translate(64, 560);

        context.beginPath();
        context.moveTo(0, (d_val_01 - 310));
        context.lineTo(13, (d_val_02 - 310));
        context.lineTo(26, (d_val_03 - 310));
        context.lineTo(39, (d_val_04 - 310));
        context.lineTo(52, (d_val_05 - 310));
        context.lineTo(65, (d_val_06 - 310));
        context.lineTo(78, (d_val_07 - 310));
        context.lineTo(91, (d_val_08 - 310));
        context.lineTo(104, (d_val_09 - 310));
        context.lineTo(117, (d_val_10 - 310));
        context.lineTo(130, (d_val_11 - 310));
        context.lineTo(143, (d_val_12 - 310));
        context.lineTo(156, (d_val_13 - 310));
        context.lineTo(169, (d_val_14 - 310));
        context.lineTo(182, (d_val_15 - 310));
        context.lineTo(195, (d_val_16 - 310));
        context.lineTo(208, (d_val_17 - 310));
        context.lineTo(221, (d_val_18 - 310));
        context.lineTo(234, (d_val_19 - 310));
        context.lineTo(247, (d_val_20 - 310));
        context.lineTo(260, (d_val_21 - 310));
        context.lineTo(273, (d_val_22 - 310));
        context.lineTo(286, (d_val_23 - 310));
        context.lineTo(299, (d_val_24 - 310));
        context.lineTo(312, (d_val_25 - 310));
        context.lineTo(325, (d_val_26 - 310));
        context.lineTo(338, (d_val_27 - 310));
        context.lineTo(351, (d_val_28 - 310));
        context.lineTo(364, (d_val_29 - 310));
        context.lineTo(377, (d_val_30 - 310));
        context.lineTo(390, (d_val_31 - 310));
        context.lineTo(403, (d_val_32 - 310));
        context.lineTo(416, (d_val_33 - 310));
        context.lineTo(429, (d_val_34 - 310));
        context.lineTo(442, (d_val_35 - 310));
        context.lineTo(455, (d_val_36 - 310));
        context.lineTo(468, (d_val_37 - 310));
        context.lineTo(481, (d_val_38 - 310));
        context.lineTo(494, (d_val_39 - 310));
        context.lineTo(507, (d_val_40 - 310));
        context.lineTo(520, (d_val_41 - 310));
        context.strokeStyle = d_Color;
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.save();
        context.setLineDash([2, 6]);
        context.lineDashOffset = 0;
        context.stroke();
        context.restore();

        context.restore();




        //// D_Past

        function d_PastCanvasLayer(width, height) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = canvas.width/pixelRatio + 'px';
            canvas.style.height = canvas.height/pixelRatio + 'px';
            canvas.paintCodePixelRatio = pixelRatio;
            var context = canvas.getContext('2d');

            context.scale(pixelRatio, pixelRatio);


            //// B_Past_Bezier 4 Drawing
            context.save();
            context.translate(64, 250);

            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, d_val_01);
            context.lineTo(13, d_val_02);
            context.lineTo(26, d_val_03);
            context.lineTo(39, d_val_04);
            context.lineTo(52, d_val_05);
            context.lineTo(65, d_val_06);
            context.lineTo(78, d_val_07);
            context.lineTo(91, d_val_08);
            context.lineTo(104, d_val_09);
            context.lineTo(117, d_val_10);
            context.lineTo(130, d_val_11);
            context.lineTo(143, d_val_12);
            context.lineTo(156, d_val_13);
            context.lineTo(169, d_val_14);
            context.lineTo(182, d_val_15);
            context.lineTo(195, d_val_16);
            context.lineTo(208, d_val_17);
            context.lineTo(221, d_val_18);
            context.lineTo(234, d_val_19);
            context.lineTo(247, d_val_20);
            context.lineTo(260, d_val_21);
            context.lineTo(273, d_val_22);
            context.lineTo(286, d_val_23);
            context.lineTo(299, d_val_24);
            context.lineTo(312, d_val_25);
            context.lineTo(325, d_val_26);
            context.lineTo(338, d_val_27);
            context.lineTo(351, d_val_28);
            context.lineTo(364, d_val_29);
            context.lineTo(377, d_val_30);
            context.lineTo(390, d_val_31);
            context.lineTo(403, d_val_32);
            context.lineTo(416, d_val_33);
            context.lineTo(429, d_val_34);
            context.lineTo(442, d_val_35);
            context.lineTo(455, d_val_36);
            context.lineTo(468, d_val_37);
            context.lineTo(481, d_val_38);
            context.lineTo(494, d_val_39);
            context.lineTo(507, d_val_40);
            context.lineTo(520, d_val_41);
            context.lineTo(520, 0);
            context.fillStyle = d_Color;
            context.fill();
            context.strokeStyle = d_Color;
            context.lineWidth = 3;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.stroke();

            context.restore();


            //// B_Past_Hide 3 Drawing
            context.save();
            context.translate(64, 53);


            function b_Past_Hide3CanvasLayer(width, height)
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
                context.rect(today, -13, 524, 210);
                context.fillStyle = 'rgb(128, 128, 128)';
                context.fill();
                return canvas;
            }

            context.save();
            context.globalCompositeOperation = 'destination-out';
            context.drawImage(b_Past_Hide3CanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
            context.restore();

            context.restore();


            return canvas;
        }

        context.save();
        context.drawImage(d_PastCanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
        context.restore();


        //// C_Forecast
        //// B_Past_Bezier 3 Drawing
        context.save();
        context.translate(64, 250);

        context.beginPath();
        context.moveTo(0, c_val_01);
        context.lineTo(13, c_val_02);
        context.lineTo(26, c_val_03);
        context.lineTo(39, c_val_04);
        context.lineTo(52, c_val_05);
        context.lineTo(65, c_val_06);
        context.lineTo(78, c_val_07);
        context.lineTo(91, c_val_08);
        context.lineTo(104, c_val_09);
        context.lineTo(117, c_val_10);
        context.lineTo(130, c_val_11);
        context.lineTo(143, c_val_12);
        context.lineTo(156, c_val_13);
        context.lineTo(169, c_val_14);
        context.lineTo(182, c_val_15);
        context.lineTo(195, c_val_16);
        context.lineTo(208, c_val_17);
        context.lineTo(221, c_val_18);
        context.lineTo(234, c_val_19);
        context.lineTo(247, c_val_20);
        context.lineTo(260, c_val_21);
        context.lineTo(273, c_val_22);
        context.lineTo(286, c_val_23);
        context.lineTo(299, c_val_24);
        context.lineTo(312, c_val_25);
        context.lineTo(325, c_val_26);
        context.lineTo(338, c_val_27);
        context.lineTo(351, c_val_28);
        context.lineTo(364, c_val_29);
        context.lineTo(377, c_val_30);
        context.lineTo(390, c_val_31);
        context.lineTo(403, c_val_32);
        context.lineTo(416, c_val_33);
        context.lineTo(429, c_val_34);
        context.lineTo(442, c_val_35);
        context.lineTo(455, c_val_36);
        context.lineTo(468, c_val_37);
        context.lineTo(481, c_val_38);
        context.lineTo(494, c_val_39);
        context.lineTo(507, c_val_40);
        context.lineTo(520, c_val_41);
        context.strokeStyle = c_Color;
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.save();
        context.setLineDash([2, 6]);
        context.lineDashOffset = 0;
        context.stroke();
        context.restore();

        context.restore();




        //// C_Past

        function c_PastCanvasLayer(width, height) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = canvas.width/pixelRatio + 'px';
            canvas.style.height = canvas.height/pixelRatio + 'px';
            canvas.paintCodePixelRatio = pixelRatio;
            var context = canvas.getContext('2d');

            context.scale(pixelRatio, pixelRatio);


            //// B_Past_Bezier 2 Drawing
            context.save();
            context.translate(64, 250);

            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, c_val_01);
            context.lineTo(13, c_val_02);
            context.lineTo(26, c_val_03);
            context.lineTo(39, c_val_04);
            context.lineTo(52, c_val_05);
            context.lineTo(65, c_val_06);
            context.lineTo(78, c_val_07);
            context.lineTo(91, c_val_08);
            context.lineTo(104, c_val_09);
            context.lineTo(117, c_val_10);
            context.lineTo(130, c_val_11);
            context.lineTo(143, c_val_12);
            context.lineTo(156, c_val_13);
            context.lineTo(169, c_val_14);
            context.lineTo(182, c_val_15);
            context.lineTo(195, c_val_16);
            context.lineTo(208, c_val_17);
            context.lineTo(221, c_val_18);
            context.lineTo(234, c_val_19);
            context.lineTo(247, c_val_20);
            context.lineTo(260, c_val_21);
            context.lineTo(273, c_val_22);
            context.lineTo(286, c_val_23);
            context.lineTo(299, c_val_24);
            context.lineTo(312, c_val_25);
            context.lineTo(325, c_val_26);
            context.lineTo(338, c_val_27);
            context.lineTo(351, c_val_28);
            context.lineTo(364, c_val_29);
            context.lineTo(377, c_val_30);
            context.lineTo(390, c_val_31);
            context.lineTo(403, c_val_32);
            context.lineTo(416, c_val_33);
            context.lineTo(429, c_val_34);
            context.lineTo(442, c_val_35);
            context.lineTo(455, c_val_36);
            context.lineTo(468, c_val_37);
            context.lineTo(481, c_val_38);
            context.lineTo(494, c_val_39);
            context.lineTo(507, c_val_40);
            context.lineTo(520, c_val_41);
            context.lineTo(520, 0);
            context.fillStyle = c_Color;
            context.fill();
            context.strokeStyle = c_Color;
            context.lineWidth = 3;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.stroke();

            context.restore();


            //// B_Past_Hide 2 Drawing
            context.save();
            context.translate(65, 55);


            function b_Past_Hide2CanvasLayer(width, height)
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
                context.rect(today, -13, 524, 208);
                context.fillStyle = 'rgb(128, 128, 128)';
                context.fill();
                return canvas;
            }

            context.save();
            context.globalCompositeOperation = 'destination-out';
            context.drawImage(b_Past_Hide2CanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
            context.restore();

            context.restore();


            return canvas;
        }

        context.save();
        context.drawImage(c_PastCanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
        context.restore();


        //// B_Forecast
        //// B_Forecast_Bezier Drawing
        context.save();
        context.translate(64, 250);

        context.beginPath();
        context.moveTo(0, b_val_01);
        context.lineTo(13, b_val_02);
        context.lineTo(26, b_val_03);
        context.lineTo(39, b_val_04);
        context.lineTo(52, b_val_05);
        context.lineTo(65, b_val_06);
        context.lineTo(78, b_val_07);
        context.lineTo(91, b_val_08);
        context.lineTo(104, b_val_09);
        context.lineTo(117, b_val_10);
        context.lineTo(130, b_val_11);
        context.lineTo(143, b_val_12);
        context.lineTo(156, b_val_13);
        context.lineTo(169, b_val_14);
        context.lineTo(182, b_val_15);
        context.lineTo(195, b_val_16);
        context.lineTo(208, b_val_17);
        context.lineTo(221, b_val_18);
        context.lineTo(234, b_val_19);
        context.lineTo(247, b_val_20);
        context.lineTo(260, b_val_21);
        context.lineTo(273, b_val_22);
        context.lineTo(286, b_val_23);
        context.lineTo(299, b_val_24);
        context.lineTo(312, b_val_25);
        context.lineTo(325, b_val_26);
        context.lineTo(338, b_val_27);
        context.lineTo(351, b_val_28);
        context.lineTo(364, b_val_29);
        context.lineTo(377, b_val_30);
        context.lineTo(390, b_val_31);
        context.lineTo(403, b_val_32);
        context.lineTo(416, b_val_33);
        context.lineTo(429, b_val_34);
        context.lineTo(442, b_val_35);
        context.lineTo(455, b_val_36);
        context.lineTo(468, b_val_37);
        context.lineTo(481, b_val_38);
        context.lineTo(494, b_val_39);
        context.lineTo(507, b_val_40);
        context.lineTo(520, b_val_41);
        context.strokeStyle = b_Color;
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.save();
        context.setLineDash([2, 6]);
        context.lineDashOffset = 0;
        context.stroke();
        context.restore();

        context.restore();




        //// B_Past

        function b_PastCanvasLayer(width, height) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = canvas.width/pixelRatio + 'px';
            canvas.style.height = canvas.height/pixelRatio + 'px';
            canvas.paintCodePixelRatio = pixelRatio;
            var context = canvas.getContext('2d');

            context.scale(pixelRatio, pixelRatio);


            //// B_Past_Bezier Drawing
            context.save();
            context.translate(64, 250);

            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, b_val_01);
            context.lineTo(13, b_val_02);
            context.lineTo(26, b_val_03);
            context.lineTo(39, b_val_04);
            context.lineTo(52, b_val_05);
            context.lineTo(65, b_val_06);
            context.lineTo(78, b_val_07);
            context.lineTo(91, b_val_08);
            context.lineTo(104, b_val_09);
            context.lineTo(117, b_val_10);
            context.lineTo(130, b_val_11);
            context.lineTo(143, b_val_12);
            context.lineTo(156, b_val_13);
            context.lineTo(169, b_val_14);
            context.lineTo(182, b_val_15);
            context.lineTo(195, b_val_16);
            context.lineTo(208, b_val_17);
            context.lineTo(221, b_val_18);
            context.lineTo(234, b_val_19);
            context.lineTo(247, b_val_20);
            context.lineTo(260, b_val_21);
            context.lineTo(273, b_val_22);
            context.lineTo(286, b_val_23);
            context.lineTo(299, b_val_24);
            context.lineTo(312, b_val_25);
            context.lineTo(325, b_val_26);
            context.lineTo(338, b_val_27);
            context.lineTo(351, b_val_28);
            context.lineTo(364, b_val_29);
            context.lineTo(377, b_val_30);
            context.lineTo(390, b_val_31);
            context.lineTo(403, b_val_32);
            context.lineTo(416, b_val_33);
            context.lineTo(429, b_val_34);
            context.lineTo(442, b_val_35);
            context.lineTo(455, b_val_36);
            context.lineTo(468, b_val_37);
            context.lineTo(481, b_val_38);
            context.lineTo(494, b_val_39);
            context.lineTo(507, b_val_40);
            context.lineTo(520, b_val_41);
            context.lineTo(520, 0);
            context.fillStyle = b_Color;
            context.fill();
            context.strokeStyle = b_Color;
            context.lineWidth = 3;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.stroke();

            context.restore();


            //// B_Past_Hide Drawing
            context.save();
            context.translate(64, 2);


            function b_Past_HideCanvasLayer(width, height)
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
                context.rect(today, 30, 524, 218);
                context.fillStyle = 'rgb(128, 128, 128)';
                context.fill();
                return canvas;
            }

            context.save();
            context.globalCompositeOperation = 'destination-out';
            context.drawImage(b_Past_HideCanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
            context.restore();

            context.restore();


            return canvas;
        }

        context.save();
        context.drawImage(b_PastCanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
        context.restore();


        //// A_Forecast
        //// A_Forecast_Bezier Drawing
        context.save();
        context.translate(64, 576);

        context.beginPath();
        context.moveTo(0, (a_val_01 - 326));
        context.lineTo(13, (a_val_02 - 326));
        context.lineTo(26, (a_val_03 - 326));
        context.lineTo(39, (a_val_04 - 326));
        context.lineTo(52, (a_val_05 - 326));
        context.lineTo(65, (a_val_06 - 326));
        context.lineTo(78, (a_val_07 - 326));
        context.lineTo(91, (a_val_08 - 326));
        context.lineTo(104, (a_val_09 - 326));
        context.lineTo(117, (a_val_10 - 326));
        context.lineTo(130, (a_val_11 - 326));
        context.lineTo(143, (a_val_12 - 326));
        context.lineTo(156, (a_val_13 - 326));
        context.lineTo(169, (a_val_14 - 326));
        context.lineTo(182, (a_val_15 - 326));
        context.lineTo(195, (a_val_16 - 326));
        context.lineTo(208, (a_val_17 - 326));
        context.lineTo(221, (a_val_18 - 326));
        context.lineTo(234, (a_val_19 - 326));
        context.lineTo(247, (a_val_20 - 326));
        context.lineTo(260, (a_val_21 - 326));
        context.lineTo(273, (a_val_22 - 326));
        context.lineTo(286, (a_val_23 - 326));
        context.lineTo(299, (a_val_24 - 326));
        context.lineTo(312, (a_val_25 - 326));
        context.lineTo(325, (a_val_26 - 326));
        context.lineTo(338, (a_val_27 - 326));
        context.lineTo(351, (a_val_28 - 326));
        context.lineTo(364, (a_val_29 - 326));
        context.lineTo(377, (a_val_30 - 326));
        context.lineTo(390, (a_val_31 - 326));
        context.lineTo(403, (a_val_32 - 326));
        context.lineTo(416, (a_val_33 - 326));
        context.lineTo(429, (a_val_34 - 326));
        context.lineTo(442, (a_val_35 - 326));
        context.lineTo(455, (a_val_36 - 326));
        context.lineTo(468, (a_val_37 - 326));
        context.lineTo(481, (a_val_38 - 326));
        context.lineTo(494, (a_val_39 - 326));
        context.lineTo(507, (a_val_40 - 326));
        context.lineTo(520, (a_val_41 - 326));
        context.strokeStyle = a_Color;
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.save();
        context.setLineDash([2, 6]);
        context.lineDashOffset = 0;
        context.stroke();
        context.restore();

        context.restore();




        //// A_Past

        function a_PastCanvasLayer(width, height) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = canvas.width/pixelRatio + 'px';
            canvas.style.height = canvas.height/pixelRatio + 'px';
            canvas.paintCodePixelRatio = pixelRatio;
            var context = canvas.getContext('2d');

            context.scale(pixelRatio, pixelRatio);


            //// A_Past_Bezier Drawing
            context.save();
            context.translate(64, 44.99);

            context.beginPath();
            context.moveTo(0, 205);
            context.lineTo(0, (a_val_01 + 205));
            context.lineTo(13, (a_val_02 + 205));
            context.lineTo(26, (a_val_03 + 205));
            context.lineTo(39, (a_val_04 + 205));
            context.lineTo(52, (a_val_05 + 205));
            context.lineTo(65, (a_val_06 + 205));
            context.lineTo(78, (a_val_07 + 205));
            context.lineTo(91, (a_val_08 + 205));
            context.lineTo(104, (a_val_09 + 205));
            context.lineTo(117, (a_val_10 + 205));
            context.lineTo(130, (a_val_11 + 205));
            context.lineTo(143, (a_val_12 + 205));
            context.lineTo(156, (a_val_13 + 205));
            context.lineTo(169, (a_val_14 + 205));
            context.lineTo(182, (a_val_15 + 205));
            context.lineTo(195, (a_val_16 + 205));
            context.lineTo(208, (a_val_17 + 205));
            context.lineTo(221, (a_val_18 + 205));
            context.lineTo(234, (a_val_19 + 205));
            context.lineTo(247, (a_val_20 + 205));
            context.lineTo(260, (a_val_21 + 205));
            context.lineTo(273, (a_val_22 + 205));
            context.lineTo(286, (a_val_23 + 205));
            context.lineTo(299, (a_val_24 + 205));
            context.lineTo(312, (a_val_25 + 205));
            context.lineTo(325, (a_val_26 + 205));
            context.lineTo(338, (a_val_27 + 205));
            context.lineTo(351, (a_val_28 + 205));
            context.lineTo(364, (a_val_29 + 205));
            context.lineTo(377, (a_val_30 + 205));
            context.lineTo(390, (a_val_31 + 205));
            context.lineTo(403, (a_val_32 + 205));
            context.lineTo(416, (a_val_33 + 205));
            context.lineTo(429, (a_val_34 + 205));
            context.lineTo(442, (a_val_35 + 205));
            context.lineTo(455, (a_val_36 + 205));
            context.lineTo(468, (a_val_37 + 205));
            context.lineTo(481, (a_val_38 + 205));
            context.lineTo(494, (a_val_39 + 205));
            context.lineTo(507, (a_val_40 + 205));
            context.lineTo(520, (a_val_41 + 205));
            context.lineTo(520, 205);
            context.fillStyle = a_Color;
            context.fill();
            context.strokeStyle = a_Color;
            context.lineWidth = 3;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.stroke();

            context.restore();


            //// A_Past_Hide Drawing
            context.save();
            context.translate(64, 44);


            function a_Past_HideCanvasLayer(width, height)
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
                context.rect(today, 0, 524, 209);
                context.fillStyle = 'rgb(128, 128, 128)';
                context.fill();
                return canvas;
            }

            context.save();
            context.globalCompositeOperation = 'destination-out';
            context.drawImage(a_Past_HideCanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
            context.restore();

            context.restore();


            return canvas;
        }

        context.save();
        context.drawImage(a_PastCanvasLayer(canvas.width, canvas.height), 0, 0, canvas.width/pixelRatio, canvas.height/pixelRatio);
        context.restore();


        //// Grid_Line_1 Drawing
        context.beginPath();
        context.rect(62, 250, 524, 2);
        context.fillStyle = line_Color;
        context.fill();


        //// Today_Symbol Drawing
        context.save();
        context.translate(14, -38);

        var today_SymbolRect = makeRect(today, 56, 100, 240);
        context.save();
        context.beginPath();
        context.rect(today_SymbolRect.x, today_SymbolRect.y, today_SymbolRect.w, today_SymbolRect.h);
        context.clip();
        context.translate(today_SymbolRect.x, today_SymbolRect.y);

        CarbonArea.drawDate_Marker(canvas, 'Heute', makeRect(0, 0, today_SymbolRect.w, today_SymbolRect.h), 'stretch');
        context.restore();

        context.restore();


        //// Y_Label Drawing
        context.save();
        context.translate(5, 252);
        context.rotate(-90 * Math.PI / 180);

        var y_LabelRect = makeRect(0, 0, 202, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var y_LabelTotalHeight = 13 * 1.3;
        context.fillText(y_label_text, y_LabelRect.x + y_LabelRect.w/2, y_LabelRect.y + 13 + y_LabelRect.h / 2 - y_LabelTotalHeight / 2);

        context.restore();


        //// Chart_Title Drawing
        var chart_TitleRect = makeRect(0, 0, 600, 42);
        context.fillStyle = 'rgb(0, 0, 0)';
        context.font = 'bold 16px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
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
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 100, 240), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 100, resizedFrame.h / 240);


        //// Color Declarations
        var icon_Color = 'rgba(45, 47, 49, 1)';

        //// Oval Drawing
        oval(context, 43, 225, 15, 15);
        context.fillStyle = icon_Color;
        context.fill();


        //// Rectangle Drawing
        context.beginPath();
        context.rect(49, 19, 3, 213);
        context.fillStyle = icon_Color;
        context.fill();


        //// Text Drawing
        context.save();
        context.globalAlpha = 0;
        var textRect = makeRect(0, 0, 100, 13);
        context.fillStyle = icon_Color;
        context.font = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var textTotalHeight = 13 * 1.3;
        context.fillText(today_label_text, textRect.x + textRect.w/2, textRect.y + 13 + textRect.h / 2 - textTotalHeight / 2);
        context.restore();

        context.restore();

    }

    function drawGridpattern(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 511, 210), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 511, resizedFrame.h / 210);


        //// Color Declarations
        var line_Color = 'rgba(223, 223, 223, 1)';

        //// Grid
        //// Grid_Line_1 Drawing
        context.beginPath();
        context.rect(0, 208, 511, 2);
        context.fillStyle = line_Color;
        context.fill();


        //// Grid_Line_6 Drawing
        context.beginPath();
        context.rect(0, 0, 511, 2);
        context.fillStyle = line_Color;
        context.fill();


        //// Grid_Line_2 Drawing
        context.beginPath();
        context.rect(0, 167, 511, 2);
        context.fillStyle = line_Color;
        context.fill();


        //// Grid_Line_3 Drawing
        context.beginPath();
        context.rect(0, 125, 511, 2);
        context.fillStyle = line_Color;
        context.fill();


        //// Grid_Line_4 Drawing
        context.beginPath();
        context.rect(0, 83, 511, 2);
        context.fillStyle = line_Color;
        context.fill();


        //// Grid_Line_5 Drawing
        context.beginPath();
        context.rect(0, 42, 511, 2);
        context.fillStyle = line_Color;
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
    CarbonArea.drawTimeseries = drawTimeseries;
    CarbonArea.drawDate_Marker = drawDate_Marker;
    CarbonArea.drawGridpattern = drawGridpattern;

    // Utilities
    CarbonArea.clearCanvas = clearCanvas;
    CarbonArea.makeRect = makeRect;

})();




class CarbonAreaChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            title: props.title,
            today: props.today,
            y_axis: props.y_axis,
            y_min: props.y_min,
            y_max: props.y_max,
            label_1: props.label_1,
            label_2: props.label_2,
            label_3: props.label_3,
            label_4: props.label_4,
            data_1: props.data_1,
            data_2: props.data_2,
            data_3: props.data_3,
            data_4: props.data_4,

        };

    }

    componentDidMount() {
        CarbonArea.clearCanvas(this.state.id);
        CarbonArea.drawTimeseries(
            this.state.id,
            this.state.title,
            this.state.y_axis,
            this.state.y_min,
            this.state.y_max,
            this.state.today,
            this.state.label_1,
            this.state.label_2,
            this.state.label_3,
            this.state.label_4,
            this.state.data_1,
            this.state.data_2,
            this.state.data_3,
            this.state.data_4

        );

    }

    componentDidUpdate(prevProps, prevState, snapshot) {



        CarbonArea.clearCanvas(this.state.id);
        CarbonArea.drawTimeseries(
            this.props.id,
            this.props.title,
            this.props.y_axis,
            this.props.y_min,
            this.props.y_max,
            this.props.today,
            this.props.label_1,
            this.props.label_2,
            this.props.label_3,
            this.props.label_4,
            this.props.data_1,
            this.props.data_2,
            this.props.data_3,
            this.props.data_4


        );

    }


    render() {
        return (
            <div>
                <canvas id={this.state.id + ""} width="600" height="320"/>
            </div>
        )
    }
}

export default CarbonAreaChart
