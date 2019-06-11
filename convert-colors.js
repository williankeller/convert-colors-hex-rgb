/**
 * @type {Function}
 */
window.convertColors = (function() {

    /**
     * Validate if color content is numeric.
     *
     * @param value
     * @returns {boolean}
     */
    function isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    /**
     * @param value
     * @returns {string}
     */
    function trim(value) {
        return value.replace(/^\s+|\s+$/g, "");
    }

    /**
     * @param value
     * @returns {boolean}
     */
    function isRgb(value) {
        value = trim(value);
        return isNumeric(value) && value >= 0 && value <= 255;
    }

    /**
     * @param value
     * @returns {boolean}
     */
    function isHex(value) {
        return (/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i).test(
            trim(value)
        );
    }

    /**
     * Parse RGB to HEX values.
     *
     * @param value
     * @returns {string}
     */
    function rgbToHex(value) {
        value = parseInt(value, 10).toString(16);
        return value.length === 1 ? '0' + value : value;
    }

    /**
     * Parse Hex to RGB values.
     *
     * @param value
     * @returns {string}
     */
    function hexToRgb(value) {
        return parseInt(value, 16).toString();
    }

    /**
     * Method responsible to handle the RGB value.
     *
     * @param value
     * @returns {string|null}
     */
    function processRgb(value) {
        value = value.split(',');

        if ( (value.length === 3 || value.length === 4) && isRgb(value[0]) && isRgb(value[1]) && isRgb(value[2]) ) {
            if (value.length === 4 && !isNumeric(value[3])) {
                return null;
            }
            return '#'
                + rgbToHex(value[0]).toUpperCase()
                + rgbToHex(value[1]).toUpperCase()
                + rgbToHex(value[2]).toUpperCase();
        }
        else {
            return null;
        }
    }

    /**
     * Method responsible to process the HEX value.
     *
     * @param value
     * @returns {string}
     */
    function processHex(value) {
        if (isHex(value)) {
            if (value.length === 3) {
                value = value.charAt(0)
                    + value.charAt(0)
                    + value.charAt(1)
                    + value.charAt(1)
                    + value.charAt(2)
                    + value.charAt(2);
            }
            return 'rgb('
                + hexToRgb(value.substr(0,2))
                + ',' +
                hexToRgb(value.substr(2,2))
                + ',' +
                hexToRgb(value.substr(4,2))
                + ')';
        }
    }

    /**
     * @param value
     * @returns {string}
     */
    function removeWhitespace(value) {
        return value.replace(/\s/g, '');
    }

    return function(value) {
        if (!value) {
            return null;
        }

        var code = null,
            rgbRegex = /^rgba?\((.*)\);?$/,
            hexRegex = /^#/;

        value = trim(value.toString());

        if (value === 'transparent' || removeWhitespace(value) === 'rgba(0,0,0,0)') {
            return 'transparent';
        }
        else if (rgbRegex.test(value)) {
            return processRgb(value.match(rgbRegex)[1]);
        }
        else if (hexRegex.test(value)) {
            return processHex(value.split('#').reverse()[0]);
        }
        else {
            code = value.split(',');

            if (code.length === 1) {
                return processHex(value);
            }
            else if (code.length === 3 || code.length === 4) {
                return processRgb(value);ß
            }
        }
    };
})();

if (jQuery) {
    jQuery.extend({
        convertColors: function(event) {
            return window.convertColors(event);
        }
    });
}