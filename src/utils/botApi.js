"use strict";
exports.__esModule = true;
var b = require("robotjs");
var helpers_1 = require("./helpers");
var constants_1 = require("../constants");
var sleep_1 = require("sleep");
var electron_1 = require("electron");
exports.bot = {
    animate: 0,
    move: function (x, y) {
        x && y && b.moveMouse(x, y);
        return this;
    },
    animateMove: function (x, y) {
        var start = Date.now();
        var mouse = electron_1.screen.getCursorScreenPoint();
        var anim = function () {
            var time = Date.now() - start;
            var et = 300;
            var progress = 1 - time / 300;
            if (time < et) {
                exports.bot.move(~~(Math.abs(x - mouse.x) * progress), ~~(Math.abs(y - mouse.y) * progress));
                exports.bot.waitMs(2);
                anim();
            }
        };
        anim();
    },
    dblClick: function (x, y) {
        if (x && y) {
            this.move(x, y);
            b.mouseClick(constants_1.LEFT_CLICK, true);
        }
        return this;
    },
    click: function (x, y) {
        if (x && y) {
            this.move(x, y);
            b.mouseClick(constants_1.LEFT_CLICK);
        }
        return this;
    },
    clickIfSimilarColor: function (x, y, color) {
        var pxlColorUnderMouse = b.getPixelColor(x, y);
        if (Array.isArray(color)) {
            var hasColor = color.find(function (color) { return helpers_1.isSimilarColor(color, pxlColorUnderMouse); });
            hasColor && this.click(x, y);
        }
        else if (helpers_1.isSimilarColor(color, pxlColorUnderMouse)) {
            this.click(x, y);
        }
        return this;
    },
    compireColorByCoors: function (x, y, color) {
        var compireColor = this.pxl(x, y);
        if (Array.isArray(color)) {
            return this.includesColor(compireColor, color);
        }
        return helpers_1.isSimilarColor(compireColor, color);
    },
    includesColor: function (compireColor, colors) {
        return colors.find(function (color) { return helpers_1.isSimilarColor(color, compireColor); });
    },
    pxl: function (x, y) {
        if (x && y) {
            return b.getPixelColor(x, y);
        }
        var mousePosition = b.getMousePos();
        return b.getPixelColor(mousePosition.x, mousePosition.y);
    },
    waitForColor: function (x, y, color) {
        var counter = 0;
        var limitWait = 50; // 5 sec
        while (this.compireColorByCoors(x, y, color)
            && counter < limitWait) {
            counter += 1;
            this.waitMs(constants_1.WaitMs.basic);
        }
    },
    waitMs: function (ms) {
        sleep_1.msleep(ms);
        return this;
    },
    waitMin: function () {
        sleep_1.msleep(constants_1.WaitMs.min);
        return this;
    },
    swipeX: function (startX, startY, finishX) {
        this.move(startX, startY)
            .click(startX, startY)
            .waitMin();
        b.mouseToggle(constants_1.MouseButtonState.down);
        this.waitMin().move(finishX, startY).waitMin();
        b.mouseToggle(constants_1.MouseButtonState.up);
        return this;
    },
    press: function (btn, modifier) {
        b.keyTap(btn, modifier);
        return this;
    },
    typeString: function (str) {
        b.typeString(str);
        return this;
    }
};
