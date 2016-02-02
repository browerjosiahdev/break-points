/**
 * @class BreakPoints
 *
 * Class used to define breakpoints for rearangging your dom elements based
 * on the screen size.
 *
 * @param breakPoints - Array of integer breakpoints to compare against when the
 * screen resizes.
 * @param scope - Optional parameter to define the jquery scope to check for the
 * breakpoint elements in. Defaults to the document.
 *
 * Liscense - MIT
 * Author - Josiah Brower
 * Note - Requires jquery and extendjs
**/
var BreakPoints = Class.extend(function () {
    this.breakPoints;
    this.windowSize;
    this.scope;

    this.constructor = function (breakPoints, scope) {
        this.breakPoints = breakPoints;
        this.windowSize  = { height: undefined, width: undefined };
        this.scope       = scope
            ? scope
            : $;

        window.onresize = handleResize.bind(this);
        handleResize.call(this);
    };

    this.detach = function () {
        window.onresize = undefined;
    };

    function handleResize () {
        var height = window.innerHeight,
            width  = window.innerWidth;

        for (var inBreak = 0; inBreak < this.breakPoints.length; inBreak++) {
            var breakPoint = this.breakPoints[inBreak],
                lefts      = this.scope.find('.left-' + breakPoint),
                inLefts,
                left,
                right;

            if (lefts.length > 0) {
                if (width <= breakPoint && (!this.windowSize || this.windowSize.width > breakPoint)) {
                    for (inLefts = 0; inLefts < lefts.length; inLefts++) {
                        left  = $(lefts[inLefts]);
                        right = left.prev('.right-768');

                        if (right.html() !== undefined) {
                            right.before(left.detach());
                        }
                    }
                } else if (width > breakPoint && (!this.windowSize || this.windowSize.width <= breakPoint)) {
                    for (inLefts = 0; inLefts < lefts.length; inLefts++) {
                        left  = $(lefts[inLefts]);
                        right = left.next('.right-768');

                        if (right.html() !== undefined) {
                            right.after(left.detach());
                        }
                    }
                }
            }
        }

        this.windowSize = { height: height, width: width };
    }
});
