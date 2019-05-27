/**
 * convertColors
 */
window.convertColors = function () {
    /**
     * @param e
     * @returns {boolean}
     */
    function e(e) {
        return !isNaN(parseFloat(e)) && isFinite(e);
    }
    function t(e) {
        return e.replace(/^\s+|\s+$/g, '');
    }
    function n(n) {
        return n = t(n), e(n) && n >= 0 && 255 >= n;
    }
    function r(e) {
        return /^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(t(e));
    }
    function i(e) {
        return e = parseInt(e, 10).toString(16), 1 === e.length ? '0' + e : e;
    }
    function s(e) {
        return parseInt(e, 16).toString();
    }
    function o(t) {
        return t = t.split(','), (3 === t.length || 4 === t.length) && n(t[0]) && n(t[1]) && n(t[2]) ? 4 !== t.length || e(t[3]) ? '#' + i(t[0]).toUpperCase() + i(t[1]).toUpperCase() + i(t[2]).toUpperCase() : null : null
    }
    function u(e) {
        return r(e) ? (3 === e.length && (e = e.charAt(0) + e.charAt(0) + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2)), 'rgb(' + s(e.substr(0, 2)) + ',' + s(e.substr(2, 2)) + ',' + s(e.substr(4, 2)) + ')') : void 0
    }
    function a(e) {
        return e.replace(/\s/g, '');
    }
    return function (e) {
        if (!e)
            return null;
        var n = null,
            r = /^rgba?\((.*)\);?$/,
            i = /^#/;
        return e = t(e.toString()), 'transparent' === e || 'rgba(0,0,0,0)' === a(e) ? 'transparent' : r.test(e) ? o(e.match(r)[1]) : i.test(e) ? u(e.split('#').reverse()[0]) : (n = e.split(','), 1 === n.length ? u(e) : 3 === n.length || 4 === n.length ? o(e) : void 0)
    };
}(), jQuery && jQuery.extend({
    convertColors: function (e) {
        return window.convertColors(e);
    }
});