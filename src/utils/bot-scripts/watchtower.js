"use strict";
exports.__esModule = true;
var botApi_1 = require("../botApi");
var constants_1 = require("../../constants");
var WT_ENTITS_DD_HIEGHT = 25;
var WT_ETITIES_DROPDOWN = [550, 450];
// const WT_LEVELS_DROPDOWN = [0, 0];
var WT_DD_COLOR = ['221f19', '25201c'];
// const ACTION_BUTTON_COLOR = ['b50c10','7b0810'];
var ENTITY_LIST;
(function (ENTITY_LIST) {
    ENTITY_LIST[ENTITY_LIST["town"] = 0] = "town";
    ENTITY_LIST[ENTITY_LIST["farmlands"] = 1] = "farmlands";
    ENTITY_LIST[ENTITY_LIST["goldFields"] = 2] = "goldFields";
    ENTITY_LIST[ENTITY_LIST["goldOfTheGods"] = 3] = "goldOfTheGods";
    ENTITY_LIST[ENTITY_LIST["ironDeposits"] = 4] = "ironDeposits";
    ENTITY_LIST[ENTITY_LIST["silverAltar"] = 5] = "silverAltar";
    ENTITY_LIST[ENTITY_LIST["hewersCamp"] = 6] = "hewersCamp";
    ENTITY_LIST[ENTITY_LIST["lumberjacksShed"] = 7] = "lumberjacksShed";
    ENTITY_LIST[ENTITY_LIST["inviders"] = 8] = "inviders";
    ENTITY_LIST[ENTITY_LIST["invidersLair"] = 9] = "invidersLair";
    ENTITY_LIST[ENTITY_LIST["ghost"] = 10] = "ghost";
    ENTITY_LIST[ENTITY_LIST["ghostsShelter"] = 11] = "ghostsShelter";
})(ENTITY_LIST || (ENTITY_LIST = {}));
;
exports.openWatchtower = function () {
    console.log('start');
    botApi_1.bot.waitMs(1000);
    console.log('www');
    botApi_1.bot.press(constants_1.VikHotKeys.watchtower);
    botApi_1.bot.waitForColor(WT_ETITIES_DROPDOWN[0], WT_ETITIES_DROPDOWN[1], WT_DD_COLOR);
    botApi_1.bot.click.apply(botApi_1.bot, WT_ETITIES_DROPDOWN).waitMs(constants_1.WaitMs.basic);
    botApi_1.bot.click(WT_ETITIES_DROPDOWN[0], WT_ETITIES_DROPDOWN[1] + ENTITY_LIST.farmlands * WT_ENTITS_DD_HIEGHT);
    console.log('end');
};
exports.openWatchtower();