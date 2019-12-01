"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
exports.isSimilarColor = function (color1, color2) { return (getDiffHex(color1[0], color2[0]) < 3 &&
    getDiffHex(color1[2], color2[2]) < 3 &&
    getDiffHex(color1[4], color2[4]) < 3); };
var getDiffHex = function (c1, c2) { return Math.abs(parseInt(c1, 16) - parseInt(c2, 16)); };
exports.clipPositionAndColor = function (txt) {
    electron_1.clipboard.writeText(txt);
};
