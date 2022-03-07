"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ReadBOM_1 = require("../components/inputsheet/ReadBOM");
var pinkContext_1 = require("../context/pinkContext");
var Step1Component = function () {
    return react_1["default"].createElement(ReadBOM_1["default"], { name: 'PINK', SheetContext: pinkContext_1["default"] });
};
exports["default"] = Step1Component;
