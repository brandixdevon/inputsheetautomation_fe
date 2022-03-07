"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _react["default"].createContext({
  BOM: [],
  colorData: [],
  genericNo: '',
  style: '',
  styleid: '',
  bomid: '',
  season: '',
  currentStep: 1,
  changeBOM: function changeBOM(BOM) {},
  changeStyle: function changeStyle(Style) {},
  changeStyleId: function changeStyleId(styleid) {},
  changeBOMId: function changeBOMId(bomid) {},
  changecurrentStep: function changecurrentStep(currentStep) {},
  changeSeason: function changeSeason(Season) {},
  changeGenericNo: function changeGenericNo(genericNo) {},
  changecolorData: function changecolorData(colorData) {} //	NewSeason: '',

});

exports["default"] = _default;