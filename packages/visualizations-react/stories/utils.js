"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.comparisonFormatter = exports.ratioFormatter = exports.compactNumberFormatter = exports.simpleFormatter = exports.defaultSource = exports.CONTROLS = exports.generateArrayOf = exports.IMAGES = exports.COLORS = void 0;
var trophy_svg_1 = require("./img/trophy.svg");
var gov_svg_1 = require("./img/gov.svg");
var rocket_png_1 = require("./img/rocket.png");
exports.COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};
exports.IMAGES = {
    gov: gov_svg_1["default"],
    trophy: trophy_svg_1["default"],
    rocket: rocket_png_1["default"]
};
function generateArrayOf(generator, size) {
    var result = [];
    for (var i = 0; i < size; ++i) {
        result.push(generator(i));
    }
    return result;
}
exports.generateArrayOf = generateArrayOf;
exports.CONTROLS = {
    text: {
        control: {
            type: 'text'
        }
    },
    number: {
        control: {
            type: 'number'
        }
    },
    image: {
        options: __spreadArray(__spreadArray([], Object.keys(exports.IMAGES), true), ['none'], false),
        mapping: __assign(__assign({}, exports.IMAGES), { none: null }),
        control: { type: 'select' }
    },
    fontWeight: {
        options: [
            'normal',
            'bold',
            'bolder',
            'lighter',
            '100',
            '200',
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
        ],
        control: { type: 'select' }
    },
    borderStyle: {
        options: ['solid', 'dashed', 'dotted', 'none'],
        control: { type: 'select' }
    },
    flexDirection: {
        options: ['row', 'column', 'row-reverse', 'column-reverse'],
        control: {
            type: 'select'
        }
    },
    justifyContent: {
        options: [
            'flex-start',
            'flex-end',
            'center',
            'space-between',
            'space-around',
            'space-evenly',
        ],
        control: {
            type: 'select'
        }
    },
    alignItems: {
        options: ['start', 'end', 'center', 'baseline', 'stretch'],
        control: {
            type: 'select'
        }
    },
    color: {
        control: {
            type: 'color',
            presetColors: Object.values(exports.COLORS)
        }
    },
    textAlign: {
        options: ['start', 'center', 'end'],
        control: {
            type: 'select'
        }
    },
    alignSelf: {
        options: ['start', 'end', 'center'],
        control: {
            type: 'select'
        }
    }
};
exports.defaultSource = {
    href: 'https://data.opendatasoft.com/explore/dataset/arbresremarquablesparis2011%40public/table/'
};
exports.simpleFormatter = new Intl.NumberFormat(undefined, {
    notation: 'compact',
    maximumFractionDigits: 1
});
exports.compactNumberFormatter = new Intl.NumberFormat(undefined, {
    notation: 'compact'
});
exports.ratioFormatter = new Intl.NumberFormat(undefined, {
    notation: 'compact',
    maximumFractionDigits: 1,
    style: 'percent'
});
exports.comparisonFormatter = new Intl.NumberFormat(undefined, {
    notation: 'compact',
    maximumFractionDigits: 1,
    signDisplay: 'exceptZero'
});
