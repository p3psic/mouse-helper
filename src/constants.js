"use strict";
exports.__esModule = true;
exports.LEFT_CLICK = 'left';
var WaitMs;
(function (WaitMs) {
    WaitMs[WaitMs["min"] = 20] = "min";
    WaitMs[WaitMs["basic"] = 100] = "basic";
    WaitMs[WaitMs["half"] = 500] = "half";
    WaitMs[WaitMs["sec"] = 1000] = "sec";
})(WaitMs = exports.WaitMs || (exports.WaitMs = {}));
;
var MouseButtonState;
(function (MouseButtonState) {
    MouseButtonState["down"] = "down";
    MouseButtonState["up"] = "up";
})(MouseButtonState = exports.MouseButtonState || (exports.MouseButtonState = {}));
;
var VikHotKeys;
(function (VikHotKeys) {
    VikHotKeys["watchtower"] = "w";
    VikHotKeys["clans"] = "c";
    VikHotKeys["resourceAid"] = "s";
    VikHotKeys["loki"] = "q";
    VikHotKeys["barracks"] = "t";
})(VikHotKeys = exports.VikHotKeys || (exports.VikHotKeys = {}));
