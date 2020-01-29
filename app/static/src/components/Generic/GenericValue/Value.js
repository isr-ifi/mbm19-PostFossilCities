import React, { Component } from 'react';


//// Create StyleKit Object
var GenericValueKit = {};
(function() {

    //// Drawing Methods

    function drawGenericValue(canvas, title, value, settings, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;

        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 280, 140), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 280, resizedFrame.h / 140);


        // ----------------------------------------------------
        // Define Colors & Font
        // ----------------------------------------------------

        // Font
        // ----
        var font_bold_s     = 'bold 11px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        var font_bold_m     = 'bold 13px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        var font_bold_l     = 'bold 16px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        var font_bold_xl     = 'bold 16px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';

        // Icon & Font Color
        // -----------------
        var line_Color      = 'rgba(223, 223, 223, 1)';
        var font_Color      = 'rgba(45, 47, 49, 1)';

        // Default Value Font Color
        // ------------------------
        var colors          = {
                                r:  [191, 166],
                                g:  [80, 204],
                                b:  [81, 82]
                            };


        // Load defined colors
        // -------------------
        if (typeof settings.colors !== 'undefined') {
            colors = {
                r:          [settings.colors.start.r, settings.colors.end.r],
                g:          [settings.colors.start.g, settings.colors.end.g],
                b:          [settings.colors.start.b, settings.colors.end.b]
            }
        }


        // Calculate state color
        // ---------------------
        var min             = settings.min;
        var max             = settings.max;

        var percentage      = (value - min) / (max - min);

        if (percentage > 1) {
            percentage = 1;
        }

        var state_color     = font_Color;

        if (settings.color_shift) {

            state_color     = 'rgba('+
                              (colors.r[0] + percentage * (colors.r[1] - colors.r[0])) + ', ' +
                              (colors.g[0] + percentage * (colors.g[1] - colors.g[0])) + ', ' +
                              (colors.b[0] + percentage * (colors.b[1] - colors.b[0])) + ', 1)';
        }


        // ----------------------------------------------------
        // Define Standard Values
        // ----------------------------------------------------

        var separator       = 'p';
        var symbol_unit     = '';

        if (typeof settings.separator !== 'undefined') {
            separator       = settings.separator;
        }

        if (typeof settings.symbol_unit !== 'undefined') {
            symbol_unit     = settings.symbol_unit;
        }


        // ----------------------------------------------------
        // Draw Titel
        // ----------------------------------------------------

        var titelRect = makeRect(0, 0, 280, 41);
        context.fillStyle = font_Color;
        context.font = font_bold_l;
        context.textAlign = 'center';
        var textTotalHeight = 16 * 1.3;
        context.fillText(title, titelRect.x + titelRect.w/2, titelRect.y + 16 + titelRect.h / 2 - textTotalHeight / 2);


        // ----------------------------------------------------
        // Draw Value
        // ----------------------------------------------------

        var value_text      = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator) + symbol_unit;

        var valueRect = makeRect(20, 41, 240, 63);
        context.fillStyle = state_color;
        context.font = 'bold 75px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var text2TotalHeight = 75 * 1.3;
        context.fillText(value_text, valueRect.x + valueRect.w/2, valueRect.y + 73 + valueRect.h / 2 - text2TotalHeight / 2);


        // ----------------------------------------------------
        // Draw Unit
        // ----------------------------------------------------

        var unitRect = makeRect(20, 104, 240, 27);
        context.fillStyle = state_color;
        context.font = 'bold 25px HelveticaNeue-Bold, "Helvetica Neue", Helvetica, Arial, sans-serif';
        context.textAlign = 'center';
        var text3TotalHeight = 25 * 1.3;
        context.fillText(settings.unit, unitRect.x + unitRect.w/2, unitRect.y + 24 + unitRect.h / 2 - text3TotalHeight / 2);

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

    // ----------------------------------------------------
    // Public Interface
    // ----------------------------------------------------

    // Drawing Methods
    GenericValueKit.drawGenericValue = drawGenericValue;

    // Utilities
    GenericValueKit.clearCanvas = clearCanvas;
    GenericValueKit.makeRect = makeRect;

})();


/**
 * Value
 * -----
 *
 * This Component renders the html canvas for the value chart
 *
 * @props id        String:     ID of the generic value
 * @props title     String:     Title of the generic value (e.g. "number of electric cars")
 * @props settings  Dictionary: Defines the appereance of the generic value chart
 * @props value     Float:      Defines the value that should be displayed
 *
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
 *
 */
class Value extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id:             props.id,
            title:          props.title,
            settings:       props.settings
        }
    }

    componentDidMount() {
        GenericValueKit.clearCanvas(this.state.id);
        GenericValueKit.drawGenericValue(
            this.state.id,
            this.state.title,
            this.props.value,
            this.state.settings);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        GenericValueKit.clearCanvas(this.state.id);
        GenericValueKit.drawGenericValue(
            this.state.id,
            this.state.title,
            this.props.value,
            this.state.settings);
    }

    render() {
        return (
            <div>
                <canvas id={this.state.id} width="600" height="344"/>
            </div>
        )
    }

}


export default Value
