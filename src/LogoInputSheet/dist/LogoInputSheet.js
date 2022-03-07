"use strict";
exports.__esModule = true;
var react_1 = require("react");
var LogoStep1_1 = require("./LogoStep1");
var LogoStep2_1 = require("./LogoStep2");
var pinkContext_1 = require("../context/pinkContext");
var Mainpage_1 = require("../components/inputsheet/Mainpage");
var PinkInputSheetComponent = function () {
    return (react_1["default"].createElement(Mainpage_1["default"], { Step1Component: LogoStep1_1["default"], Step2Component: LogoStep2_1["default"], SheetContext: pinkContext_1["default"] }));
};
exports["default"] = PinkInputSheetComponent;
