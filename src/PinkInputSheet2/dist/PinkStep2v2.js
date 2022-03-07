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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var pinkContext_1 = require("../context/pinkContext");
var vsInputSheetContext_1 = require("../context/vsInputSheetContext");
var core_1 = require("@material-ui/core");
var dropdownComponent_1 = require("../components/layout/dropdownComponent");
var AddCircle_1 = require("@material-ui/icons/AddCircle");
var xlsx_1 = require("xlsx");
var pink_d_1 = require("../Services/datasets/pink.d");
var data_1 = require("../Services/data");
var ecvisionNames_1 = require("../Services/datasets/ecvisionNames");
var inputSheetTemplate_1 = require("../inputSheetTemplate");
var common_d_1 = require("../Services/datasets/common.d");
var sheetJSFT_1 = require("../utils/sheetJSFT");
var PackingItem_1 = require("../packingItems/PackingItem");
var CheckCircleOutline_1 = require("@material-ui/icons/CheckCircleOutline");
var pink_1 = require("../Services/pink");
var conversions_1 = require("../utils/conversions");
var threadsheet_1 = require("../Services/threadsheet");
var formatExcel_1 = require("../Services/formatExcel");
var Step2Componentv2 = function () {
    // const [isFileUploaded, setIsFileUploaded] = useState(false);
    // const [isFileReading, setisFileReading] = useState(false);
    // const [stylesData, setStylesData] = useState([]);
    // const [selectedStyle, setSelectedStyle] = useState('');
    // const [showStyle, setShowStyle] = useState(false);
    // const [pinkGarmentCompositions, setpinkGarmentCompositions] = useState([]);
    // const [downloadBtnStatus, setdownloadBtnStatus] = useState(false);
    var pinkInputSheetContext = react_1.useContext(pinkContext_1["default"]);
    var vsInputSheetContext = react_1.useContext(vsInputSheetContext_1["default"]);
    var _a = react_1.useState('Select OLR File'), filename = _a[0], setFileName = _a[1];
    var _b = react_1.useState(''), selectedWareHouse = _b[0], setSelectedWarehouse = _b[1];
    var _c = react_1.useState(''), selectedMerchandiser = _c[0], setselectedMerchandiser = _c[1];
    var _d = react_1.useState(''), selectedPlanner = _d[0], setselectedPlanner = _d[1];
    var _e = react_1.useState('I'), selectedBuyerDivisions = _e[0], setBuyerDivisions = _e[1];
    var _f = react_1.useState(''), selectedLeadFactories = _f[0], setselectedLeadFactory = _f[1];
    var _g = react_1.useState(''), selectedGarmentCompositions = _g[0], setGarmentCompositions = _g[1];
    var _h = react_1.useState({
        newLines: []
    }), selectedStyleData = _h[0], setSelectedStyleData = _h[1];
    var _j = react_1.useState(''), requestDelDate = _j[0], setrequestDelDate = _j[1];
    var _k = react_1.useState(1), selectedSeasonCode = _k[0], setselectedSeasonCode = _k[1];
    var _l = react_1.useState(1), selectedYearCode = _l[0], setselectedYearCode = _l[1];
    var _m = react_1.useState(''), selectedInseam = _m[0], setselectedInseam = _m[1];
    var _o = react_1.useState(''), selectedPackingType = _o[0], setSelectedPackingType = _o[1];
    var _p = react_1.useState(null), threadStatus = _p[0], setThreadStatus = _p[1];
    var _q = react_1.useState('Upload Thread YY'), threadFileName = _q[0], setthreadFileName = _q[1];
    var _r = react_1.useState([]), threadData = _r[0], setThreadData = _r[1];
    var _s = react_1.useState(false), openPackingModal = _s[0], setOpenPackingModal = _s[1];
    var _t = react_1.useState(false), packingStatus = _t[0], setPackingStatus = _t[1];
    var COColors = [];
    var handleClose = function () { return setOpenPackingModal(false); };
    var handlePacking = function () { return setOpenPackingModal(true); };
    var changeMerchandiser = function (id) { return setselectedMerchandiser(id); };
    var changePlanner = function (id) { return setselectedPlanner(id); };
    var changeLeadfactory = function (id) { return setselectedLeadFactory(id); };
    var changeBuyerDivision = function (id) { return setBuyerDivisions(id); };
    var changeGarmentCom = function (id) { return setGarmentCompositions(id); };
    var changeSeasonalCode = function (id) { return setselectedSeasonCode(id); };
    var changeYearCode = function (id) { return setselectedYearCode(id); };
    var changeInseam = function (id) { return setselectedInseam(id); };
    var changePackingType = function (id) { return setSelectedPackingType(id); };
    var onWareHouseChange = function (id) {
        id == 1 ? setselectedLeadFactory(1) : setselectedLeadFactory(2);
        setSelectedWarehouse(id);
    };
    //read OLR file
    var onFileSelect = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var files, reader, rABS;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = e.target.files;
                    // await setisFileReading(true);
                    return [4 /*yield*/, setFileName(files[0].name)];
                case 1:
                    // await setisFileReading(true);
                    _a.sent();
                    reader = new FileReader();
                    rABS = !!reader.readAsBinaryString;
                    reader.onload = function (ee) { return __awaiter(void 0, void 0, void 0, function () {
                        var bstr, wb, sheet, sheetStyles_1, sheetData, headerRow_1, i, seasonName, uniqueStylesWithData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    bstr = ee.target.result;
                                    return [4 /*yield*/, xlsx_1["default"].read(bstr, { type: rABS ? 'binary' : 'array' })];
                                case 1:
                                    wb = _a.sent();
                                    sheet = wb.Sheets['OrderListReport'];
                                    if (sheet) {
                                        sheetStyles_1 = [];
                                        sheetData = xlsx_1["default"].utils.sheet_to_json(sheet, {
                                            header: 1,
                                            blankrows: false,
                                            defval: ''
                                        });
                                        headerRow_1 = sheetData.splice(0, 1)[0];
                                        //console.log(sheetData.splice(0, 1))
                                        for (i in headerRow_1) {
                                            headerRow_1[i] = headerRow_1[i].trim();
                                        }
                                        //sheetData = OLR 
                                        sheetData.forEach(function (line) {
                                            var obj = {};
                                            for (var i in headerRow_1) {
                                                obj[headerRow_1[i]] = line[i];
                                            }
                                            if (obj.TECHPACKNO.toString().includes(pinkInputSheetContext.style)) {
                                                //Not usefull
                                                if (!isNaN(obj[ecvisionNames_1["default"].SHIPDATE]) &&
                                                    obj[ecvisionNames_1["default"].SHIPDATE] != '') {
                                                    obj[ecvisionNames_1["default"].SHIPDATE] =
                                                        conversions_1.convertExcelDateToJsLocaleDateString(obj[ecvisionNames_1["default"].SHIPDATE]);
                                                }
                                                obj[ecvisionNames_1["default"].SHIPDATE] = new Date(obj[ecvisionNames_1["default"].SHIPDATE]); //.getTime();
                                                if (!isNaN(obj[ecvisionNames_1["default"].NDCDATE]) &&
                                                    obj[ecvisionNames_1["default"].NDCDATE] != '') {
                                                    obj[ecvisionNames_1["default"].NDCDATE] =
                                                        conversions_1.convertExcelDateToJsLocaleDateString(obj[ecvisionNames_1["default"].NDCDATE]);
                                                }
                                                obj[ecvisionNames_1["default"].NDCDATE] = new Date(obj[ecvisionNames_1["default"].NDCDATE]);
                                                sheetStyles_1.push(obj);
                                            }
                                        });
                                        if (sheetStyles_1.length > 0) {
                                            seasonName = pink_1.getSeasonPink(sheetStyles_1[0][ecvisionNames_1["default"].SEASON]);
                                            uniqueStylesWithData = {
                                                styleNo: pinkInputSheetContext.style,
                                                VERSION: '',
                                                itemGroup: sheetStyles_1[0][ecvisionNames_1["default"].SEASON],
                                                season: seasonName,
                                                // purchasingGroup: shipDateFilteredStylesData[0]['PURCHASINGGROUP'],
                                                purchasingGroup: '',
                                                // lines: shipDateFilteredStylesData,
                                                lines: sheetStyles_1,
                                                wareHouse: '',
                                                destination: '',
                                                deliveryMethod: '',
                                                merchandiser: '',
                                                planner: '',
                                                packMethod: '',
                                                buyerDivision: '',
                                                leadFactory: '',
                                                MASTSTYLEDESC: sheetStyles_1[0]['MASTSTYLEDESC']
                                            };
                                            pinkInputSheetContext.changeGenericNo(sheetStyles_1[0][ecvisionNames_1["default"].GENERICNO]);
                                            changeSelectedStyleNo(uniqueStylesWithData);
                                        }
                                        else {
                                            alert('No Style ' + pinkInputSheetContext.style);
                                        }
                                    }
                                    else {
                                        alert('No Sheet named OrderListReport');
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    if (rABS)
                        reader.readAsBinaryString(files[0]);
                    else
                        reader.readAsArrayBuffer(files[0]);
                    return [2 /*return*/];
            }
        });
    }); };
    var onStyleLineChangeClick = function (masterColorKey) { return __awaiter(void 0, void 0, void 0, function () {
        var wareHouse, relevantLine;
        return __generator(this, function (_a) {
            wareHouse = pink_d_1.wareHouses.find(function (w) { return w.id == selectedWareHouse; });
            if (selectedStyleData) {
                relevantLine = selectedStyleData.newLines.find(function (l) { return l.masterColorKey == masterColorKey; });
                relevantLine.requestDelDate = requestDelDate;
                relevantLine.wareHouse = wareHouse ? wareHouse.name : '';
                setSelectedStyleData(selectedStyleData);
                // setShowStyle(true);
            }
            return [2 /*return*/];
        });
    }); };
    var changeSelectedStyleNo = function (selectedStylesData) {
        if (selectedStylesData) {
            selectedStylesData.newLines = [];
            // Create combination of followings
            // VPONO
            // MASTCOLORDESC
            // SHIPDATE
            var masterColorKeys = selectedStylesData.lines
                .filter(function (l) { return l[ecvisionNames_1["default"].MASTCOLORCODE]; })
                .map(function (l) {
                return l[ecvisionNames_1["default"].MASTCOLORCODE] + l[ecvisionNames_1["default"].VPONO] + l[ecvisionNames_1["default"].SHIPDATE].getTime();
            });
            var uniquemasterColorKeys = __spreadArrays(new Set(__spreadArrays(masterColorKeys)));
            uniquemasterColorKeys.forEach(function (code) {
                var selectedColorLines = selectedStylesData.lines.filter(function (l) {
                    return l[ecvisionNames_1["default"].MASTCOLORCODE] + l[ecvisionNames_1["default"].VPONO] + l[ecvisionNames_1["default"].SHIPDATE].getTime() ==
                        code;
                });
                // let tempXs, tempSmall, tempMed, tempLar, tempXl;
                // selectedColorLines.forEach((l) => {
                // 	const tempSize = l[ecvisionHeaderNames.MASTSIZEDESC]
                // 		.toUpperCase()
                // 		.trim();
                // 	if (tempSize.includes(ecvisionHeaderNames.XS)) {
                // 		tempXs = l[ecvisionHeaderNames.ORDERQTY];
                // 	} else if (tempSize.includes(ecvisionHeaderNames.SMALL)) {
                // 		tempSmall = l[ecvisionHeaderNames.ORDERQTY];
                // 	} else if (tempSize.includes(ecvisionHeaderNames.MED)) {
                // 		tempMed = l[ecvisionHeaderNames.ORDERQTY];
                // 	} else if (tempSize.includes(ecvisionHeaderNames.LARGE)) {
                // 		tempLar = l[ecvisionHeaderNames.ORDERQTY];
                // 	} else if (tempSize.includes(ecvisionHeaderNames.XL)) {
                // 		tempXl = l[ecvisionHeaderNames.ORDERQTY];
                // 	}
                // });
                var tempXXS, tempXS, tempS, tempM, tempL, tempXL, tempXXL;
                selectedColorLines.forEach(function (l) {
                    var tempSize = l[ecvisionNames_1["default"].MASTSIZEDESC]
                        .toUpperCase()
                        .trim();
                    if (tempSize.includes('XXS')) {
                        tempXXS = l[ecvisionNames_1["default"].ORDERQTY];
                    }
                    else if (tempSize.includes('XS')) {
                        tempXS = l[ecvisionNames_1["default"].ORDERQTY];
                    }
                    else if (tempSize.includes('SMALL')) {
                        tempS = l[ecvisionNames_1["default"].ORDERQTY];
                    }
                    else if (tempSize.includes('MED')) {
                        tempM = l[ecvisionNames_1["default"].ORDERQTY];
                    }
                    else if (tempSize.includes('XL')) {
                        tempXL = l[ecvisionNames_1["default"].ORDERQTY];
                    }
                    else if (tempSize.includes('XXL')) {
                        tempXXL = l[ecvisionNames_1["default"].ORDERQTY];
                    }
                    else if (tempSize.includes('LARGE')) {
                        tempL = l[ecvisionNames_1["default"].ORDERQTY];
                    }
                });
                var XXS = tempXXS > 0 ? tempXXS : 0;
                var XS = tempXS > 0 ? tempXS : 0;
                var S = tempS > 0 ? tempS : 0;
                var M = tempM > 0 ? tempM : 0;
                var L = tempL > 0 ? tempL : 0;
                var XL = tempXL > 0 ? tempXL : 0;
                var XXL = tempXXL > 0 ? tempXXL : 0;
                var lineToBeCreated = {
                    masterColorKey: code,
                    SHIPTONAME: selectedColorLines[0][ecvisionNames_1["default"].SHIPTONAME],
                    SHIPMODE: selectedColorLines[0][ecvisionNames_1["default"].SHIPMODE],
                    SHIPDATE: selectedColorLines[0][ecvisionNames_1["default"].SHIPDATE],
                    NDCDATE: selectedColorLines[0][ecvisionNames_1["default"].NDCDATE],
                    VPONO: selectedColorLines[0][ecvisionNames_1["default"].VPONO],
                    CPO: selectedColorLines[0][ecvisionNames_1["default"].CPO],
                    MASTCOLORCODE: selectedColorLines[0][ecvisionNames_1["default"].MASTCOLORCODE],
                    MASTCOLORDESC: selectedColorLines[0][ecvisionNames_1["default"].MASTCOLORDESC],
                    CUSTCOLORCODE: selectedColorLines[0][ecvisionNames_1["default"].CUSTCOLORCODE],
                    CUSTSTYLE: selectedColorLines[0].CUSTSTYLE,
                    CUSTSTYLEDESC: selectedColorLines[0].CUSTSTYLEDESC,
                    XXS: XXS,
                    XS: XS,
                    S: S,
                    M: M,
                    L: L,
                    XL: XL,
                    XXL: XXL,
                    TOTALQTY: parseInt(XXS) +
                        parseInt(XS) +
                        parseInt(S) +
                        parseInt(M) +
                        parseInt(L) +
                        parseInt(XL) +
                        parseInt(XXL),
                    DIVISIONCODE: selectedColorLines[0][ecvisionNames_1["default"].DIVISIONCODE],
                    MASTSIZEDESC: selectedColorLines[0][ecvisionNames_1["default"].MASTSIZEDESC],
                    FACTORYCOST: selectedColorLines[0][ecvisionNames_1["default"].FACTORYCOST],
                    MIDDLEMANCHARGES: selectedColorLines[0][ecvisionNames_1["default"].MIDDLEMANCHARGES]
                };
                if (lineToBeCreated.TOTALQTY > 0) {
                    selectedStylesData.newLines.push(lineToBeCreated);
                }
            });
            selectedStylesData.newLines.forEach(function (line) {
                line.destination = line[ecvisionNames_1["default"].SHIPTONAME]
                    .toLowerCase()
                    .includes(ecvisionNames_1["default"].DC4)
                    ? ecvisionNames_1["default"].USA03
                    : line[ecvisionNames_1["default"].SHIPTONAME]
                        .toLowerCase()
                        .includes(ecvisionNames_1["default"].DC5)
                        ? ecvisionNames_1["default"].USA02
                        : ecvisionNames_1["default"].CN01;
                line.packMethod = line[ecvisionNames_1["default"].SHIPTONAME]
                    .toLowerCase()
                    .includes(ecvisionNames_1["default"].DC5)
                    ? ecvisionNames_1["default"].SinglePack
                    : ecvisionNames_1["default"].ThirtyPack;
                line.wareHouse = '';
                line.requestDelDate = '';
                line.PCDDate = calculateDate(line[ecvisionNames_1["default"].SHIPDATE]);
            });
            setSelectedStyleData(__assign({}, selectedStylesData));
            // setShowStyle(true);
        }
    };
    var calculateDate = function (date) {
        var resDate = null;
        if (date) {
            // Deduct one day from the date
            // If it results 'Sunday' duduct that as well
            resDate = new Date();
            resDate.setDate(date.getDate() - 1);
            var weekday = resDate.getUTCDay();
            if (weekday == 0) {
                resDate.setDate(resDate.getDate() - 1);
            }
        }
        return resDate;
    };
    var onAddWarehouseClicked = function () { return __awaiter(void 0, void 0, void 0, function () {
        var wareHouse, cselectedStyleData;
        return __generator(this, function (_a) {
            wareHouse = pink_d_1.wareHouses.find(function (w) { return w.id == selectedWareHouse; });
            if (wareHouse) {
                cselectedStyleData = __assign({}, selectedStyleData);
                cselectedStyleData.newLines.forEach(function (line) {
                    line.wareHouse = wareHouse.name;
                });
                setSelectedStyleData(cselectedStyleData);
            }
            return [2 /*return*/];
        });
    }); };
    var onAddDelDateClicked = function () { return __awaiter(void 0, void 0, void 0, function () {
        var cselectedStyleData;
        return __generator(this, function (_a) {
            cselectedStyleData = __assign({}, selectedStyleData);
            cselectedStyleData.newLines.forEach(function (line) {
                line.requestDelDate = requestDelDate;
            });
            setSelectedStyleData(cselectedStyleData);
            return [2 /*return*/];
        });
    }); };
    var onInputSheetDownload = function () { return __awaiter(void 0, void 0, void 0, function () {
        var planner, merchandiser, garmentComposition, buyerDivision, leadFactory, seasoncode, yearcode, newStyleno, season, selectedBuyerDivisionName, selectedInseamName, newLinesTop, newLinesBottom_1, combinedArrays_1, wb, template, _loop_1, i, xxsIndex, xsIndex, sIndex, mIndex, lIndex, xlIndex, xxlIndex, filteredBOM, smv, opsToTrackData, ws, ws2, ws3;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    planner = vsInputSheetContext.planners.find(function (lin) { return lin.id == selectedPlanner; });
                    merchandiser = vsInputSheetContext.merchandisers.find(function (lin) { return lin.id == selectedMerchandiser; });
                    garmentComposition = vsInputSheetContext.garmentCompositions.find(function (lin) { return lin.id == selectedGarmentCompositions; });
                    buyerDivision = vsInputSheetContext.buyerDivisions.find(function (buy) { return buy.id == selectedBuyerDivisions; });
                    leadFactory = vsInputSheetContext.leadFactories.find(function (prod) { return prod.id == selectedLeadFactories; });
                    seasoncode = pink_d_1.seasonalCodes.find(function (s) { return s.id == selectedSeasonCode; });
                    yearcode = pink_d_1.yearCodes.find(function (s) { return s.id == selectedYearCode; });
                    newStyleno = '';
                    //let HeaderSeason='';
                    // This is used to create style number/ This is not used in BFF
                    // selectedStyleData.purchasingGroup.toString() === '361'
                    // 	? 'K'
                    // 	: selectedStyleData.purchasingGroup.toString() === '233'
                    // 	? 'P'
                    // 	: ''; 
                    // ---- added by Rushan -------//
                    //BFF_LBRANDS_VS_WOMENS_SLEEP_VSD
                    newStyleno = selectedBuyerDivisions;
                    newStyleno += selectedInseam;
                    newStyleno += pinkInputSheetContext.style.slice(-4);
                    season = pinkInputSheetContext.season.toUpperCase() === 'FALL' ? 'F' :
                        pinkInputSheetContext.season.toUpperCase() === 'SPRING' ? 'A' :
                            pinkInputSheetContext.season.toUpperCase() === 'SUMMER' ? 'S' : 'H';
                    newStyleno += (season + selectedStyleData.itemGroup.slice(-1));
                    selectedBuyerDivisionName = (_b = (_a = pink_d_1.divisionCodes.find(function (i) { return i.id === selectedBuyerDivisions; })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
                    selectedInseamName = (_d = (_c = pink_d_1.inseams.find(function (i) { return i.id === selectedInseam; })) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '';
                    selectedStyleData.newLines = selectedStyleData.newLines.filter(function (i) { return i.DIVISIONCODE === selectedBuyerDivisionName &&
                        i.MASTSIZEDESC.includes(selectedInseamName); });
                    // if selected packing type is Single, no nrrd to change the row information,
                    // else if selected packing type is 'Double', copy the individual VPO number with row and then add TOP and Bottom to the end of COlOR column.
                    if (selectedPackingType == 'D') {
                        newLinesTop = JSON.parse(JSON.stringify(selectedStyleData.newLines));
                        newLinesTop = newLinesTop.map(function (l) {
                            l.MASTCOLORDESC = l.MASTCOLORDESC + "-TOP";
                            return l;
                        });
                        newLinesBottom_1 = JSON.parse(JSON.stringify(selectedStyleData.newLines));
                        newLinesBottom_1 = newLinesBottom_1.map(function (l) {
                            l.MASTCOLORDESC = l.MASTCOLORDESC + "-BTM";
                            return l;
                        });
                        combinedArrays_1 = [];
                        newLinesTop.forEach(function (line, index) {
                            combinedArrays_1.push(line);
                            combinedArrays_1.push(newLinesBottom_1[index]);
                        });
                        selectedStyleData.newLines = combinedArrays_1;
                    }
                    wb = xlsx_1["default"].utils.book_new();
                    template = common_d_1.COTblData(false, newStyleno, selectedStyleData, leadFactory, buyerDivision, merchandiser, planner, garmentComposition, 'KNUND-Knit Underwear');
                    _loop_1 = function (i) {
                        var line, matchingColor, newColor, zft, deliveryMethod, FOBList, FOB, rowToAdd;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    line = selectedStyleData.newLines[i];
                                    COColors.push(line.MASTCOLORCODE.toString().slice(-6));
                                    matchingColor = pinkInputSheetContext.colorData.find(function (c) { return c.slice(-6) == line.MASTCOLORCODE.toString().slice(-6); });
                                    newColor = matchingColor;
                                    zft = pink_1.getZFtrPink(line.SHIPTONAME);
                                    deliveryMethod = pink_1.getDeliveryMethodPink(line[ecvisionNames_1["default"].SHIPMODE]);
                                    return [4 /*yield*/, pink_1.getFOB(parseInt(pinkInputSheetContext.styleid), parseInt(pinkInputSheetContext.bomid))];
                                case 1:
                                    FOBList = _a.sent();
                                    FOB = FOBList.find(function (item) { return item.Garment.toUpperCase() === newColor.toUpperCase(); });
                                    rowToAdd = [
                                        'FALSE',
                                        line.wareHouse,
                                        line.destination,
                                        new Date(line.requestDelDate),
                                        new Date(line.requestDelDate),
                                        new Date(line.requestDelDate),
                                        new Date(line[ecvisionNames_1["default"].NDCDATE]).toLocaleDateString(),
                                        new Date(line.PCDDate),
                                        line[ecvisionNames_1["default"].MASTCOLORDESC],
                                        selectedStyleData.styleNo.slice(2, selectedStyleData.styleNo.length),
                                        line[ecvisionNames_1["default"].VPONO],
                                        line[ecvisionNames_1["default"].CPO],
                                        //FOB.FOB,
                                        deliveryMethod,
                                        parseFloat(line[ecvisionNames_1["default"].MIDDLEMANCHARGES]) + parseFloat(line[ecvisionNames_1["default"].FACTORYCOST]),
                                        'Free On Board-FOB',
                                        line.packMethod,
                                        zft,
                                        line[ecvisionNames_1["default"].TOTALQTY],
                                        line[ecvisionNames_1["default"].XXS],
                                        line[ecvisionNames_1["default"].XS],
                                        line[ecvisionNames_1["default"].S],
                                        line[ecvisionNames_1["default"].M],
                                        line[ecvisionNames_1["default"].L],
                                        line[ecvisionNames_1["default"].XL],
                                        line[ecvisionNames_1["default"].XXL],
                                        '' //CO
                                    ];
                                    template.push(rowToAdd);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _e.label = 1;
                case 1:
                    if (!(i < selectedStyleData.newLines.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _e.sent();
                    _e.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    xxsIndex = template[14].findIndex(function (i) { return i === 'XXS.'; });
                    if (xxsIndex > -1)
                        template[14][xxsIndex] = 'XXS.' + selectedInseam;
                    xsIndex = template[14].findIndex(function (i) { return i === 'XS.'; });
                    if (xsIndex > -1)
                        template[14][xsIndex] = 'XS.' + selectedInseam;
                    sIndex = template[14].findIndex(function (i) { return i === 'S.'; });
                    if (sIndex > -1)
                        template[14][sIndex] = 'S.' + selectedInseam;
                    mIndex = template[14].findIndex(function (i) { return i === 'M.'; });
                    if (mIndex > -1)
                        template[14][mIndex] = 'M.' + selectedInseam;
                    lIndex = template[14].findIndex(function (i) { return i === 'L.'; });
                    if (lIndex > -1)
                        template[14][lIndex] = 'L.' + selectedInseam;
                    xlIndex = template[14].findIndex(function (i) { return i === 'XL.'; });
                    if (xlIndex > -1)
                        template[14][xlIndex] = 'XL.' + selectedInseam;
                    xxlIndex = template[14].findIndex(function (i) { return i === 'XXL.'; });
                    if (xxlIndex > -1)
                        template[14][xxlIndex] = 'XXL.' + selectedInseam;
                    filteredBOM = pinkInputSheetContext.BOM.filter(function (row) {
                        var prodGroup = row[1].toUpperCase().split('-');
                        // if (
                        // 	!(
                        // 		prodGroup[0].trim() === 'THR' ||
                        // 		prodGroup[0].includes('COSTING ONLY CHARGES')
                        // 	)
                        // ) {
                        // 	if (
                        // 		COColors.includes(row[7].trim().slice(-4)) ||
                        // 		row[7].trim().toUpperCase() === 'ALL' ||
                        // 		row[7].trim().toUpperCase() === '' ||
                        // 		row[7].trim().toUpperCase() === 'GARMENT COLOR'
                        // 	) {
                        // 		return row;
                        // 	}
                        // }
                        return row;
                    });
                    //Add thread lines to the BOM
                    threadData.map(function (row) { return filteredBOM.push(row); });
                    return [4 /*yield*/, data_1.getSMV(parseInt(pinkInputSheetContext.styleid), parseInt(pinkInputSheetContext.bomid))];
                case 5:
                    smv = _e.sent();
                    opsToTrackData = data_1.addSMV(common_d_1.operationtable, smv);
                    ws = xlsx_1["default"].utils.aoa_to_sheet(template);
                    ws['!cols'] = inputSheetTemplate_1.wscols;
                    xlsx_1["default"].utils.book_append_sheet(wb, ws, 'CO LINE'); // changed StNDdize CO to CO Line 
                    ws2 = xlsx_1["default"].utils.aoa_to_sheet(filteredBOM);
                    xlsx_1["default"].utils.book_append_sheet(wb, ws2, 'BOM LINE'); // changed StNDdize BOM to BOM LINE 
                    ws3 = xlsx_1["default"].utils.aoa_to_sheet(opsToTrackData);
                    xlsx_1["default"].utils.book_append_sheet(wb, ws3, 'Operations Track'); // changed StNDdize Operations Track to Operations Track 
                    formatExcel_1.OpsTrackSheetFormat(ws3, opsToTrackData);
                    xlsx_1["default"].writeFile(wb, 'VS Sleep Input Sheet.xlsx'); //PINk to VS Sleep
                    return [2 /*return*/];
            }
        });
    }); };
    //On Thread sheet upload
    var onThreadFileSelect = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var files, reader, rABS;
        return __generator(this, function (_a) {
            setThreadStatus(false);
            files = e.target.files;
            // setdownloadBtnStatus(false);
            setthreadFileName(files[0].name);
            reader = new FileReader();
            rABS = !!reader.readAsBinaryString;
            reader.onload = function (ee) { return __awaiter(void 0, void 0, void 0, function () {
                var bstr, wb, dataSheet, dataSheetData, threadSummaryData, response, error, threadSheetDataAsArr;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            bstr = ee.target.result;
                            wb = xlsx_1["default"].read(bstr, { type: rABS ? 'binary' : 'array' });
                            dataSheet = wb.Sheets['Sheet1'];
                            if (!dataSheet || dataSheet == undefined) {
                                alert('Sheet1 Not Found');
                                setThreadStatus(null);
                                return [2 /*return*/];
                            }
                            dataSheetData = xlsx_1["default"].utils.sheet_to_json(dataSheet, {
                                header: 1,
                                blankrows: false,
                                defval: ''
                            });
                            threadSummaryData = threadsheet_1.getThreadLines(dataSheetData, pinkInputSheetContext.style);
                            //Alert if no matching thread lines with the Generic No
                            if (threadSummaryData.length < 1) {
                                alert("Genrice No. " + pinkInputSheetContext.genericNo + ", not found in Thread Summary Sheet.");
                                setThreadStatus(null);
                                // setdownloadBtnStatus(true);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, data_1.getRmColorThread(true)];
                        case 1:
                            response = _a.sent();
                            if (!(response.status != 200 && response.status != 201)) return [3 /*break*/, 3];
                            setThreadStatus(null);
                            return [4 /*yield*/, response.json()];
                        case 2:
                            error = _a.sent();
                            console.log(error.message);
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, threadsheet_1.getBOMThreadLinesLogo(response, threadSummaryData, pinkInputSheetContext.colorData)];
                        case 4:
                            threadSheetDataAsArr = _a.sent();
                            setThreadData(threadSheetDataAsArr);
                            _a.label = 5;
                        case 5:
                            //setdownloadBtnStatus(true);
                            setThreadStatus(true);
                            return [2 /*return*/];
                    }
                });
            }); };
            if (rABS)
                reader.readAsBinaryString(files[0]);
            else
                reader.readAsArrayBuffer(files[0]);
            return [2 /*return*/];
        });
    }); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(core_1.Grid, { container: true, direction: 'row', justify: 'space-evenly' },
            react_1["default"].createElement(core_1.Grid, { item: true, xs: 3, style: { marginTop: '0.5rem' } },
                react_1["default"].createElement("label", { className: 'form-control', style: {
                        width: '20vw',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                    } },
                    filename,
                    react_1["default"].createElement("input", { type: 'file', style: { display: 'none' }, name: filename, accept: sheetJSFT_1.SheetJSFT, onChange: onFileSelect }))),
            react_1["default"].createElement(core_1.Grid, { item: true, xs: 4, style: { marginLeft: '0.5rem', marginTop: '0.5rem' } },
                react_1["default"].createElement(core_1.Grid, { container: true, direction: 'row' },
                    react_1["default"].createElement("label", { className: 'form-control', style: {
                            width: '20vw',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        } },
                        threadFileName,
                        react_1["default"].createElement("input", { type: 'file', style: { display: 'none' }, name: threadFileName, accept: sheetJSFT_1.SheetJSFT, onChange: onThreadFileSelect })),
                    threadStatus === false ? (react_1["default"].createElement(core_1.CircularProgress, { size: '1rem', color: 'inherit', style: { marginLeft: '0.5rem', marginTop: '0.5rem' } })) : threadStatus === true ? (react_1["default"].createElement(CheckCircleOutline_1["default"], null)) : (''))),
            react_1["default"].createElement(core_1.Grid, { item: true, xs: 2, style: { marginLeft: '0.5rem', marginTop: '0.5rem' } }),
            react_1["default"].createElement(core_1.Grid, { item: true, xs: 2, style: { marginLeft: '0.5rem', marginTop: '0.5rem' } },
                react_1["default"].createElement(core_1.Button, { variant: 'contained', color: 'secondary', onClick: onInputSheetDownload }, "Download"))),
        react_1["default"].createElement("div", { style: { marginTop: '2vw' }, className: 'container' },
            react_1["default"].createElement("div", { className: 'row' },
                react_1["default"].createElement("div", { className: 'col-sm-8' },
                    react_1["default"].createElement(core_1.Grid, { container: true, style: {
                            border: '0.4px solid #C0C0C0	',
                            padding: '0.3vw',
                            borderRadius: '5px'
                        }, spacing: 2 },
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 4 },
                            react_1["default"].createElement(dropdownComponent_1["default"], { selectedField: selectedMerchandiser, data: vsInputSheetContext.merchandisers, onSelectChange: changeMerchandiser, fieldName: 'Merchandisers' })),
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 4 },
                            react_1["default"].createElement(dropdownComponent_1["default"], { selectedField: selectedPlanner, data: vsInputSheetContext.planners, onSelectChange: changePlanner, fieldName: 'Planners' })),
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 4 },
                            react_1["default"].createElement(dropdownComponent_1["default"], { selectedField: selectedLeadFactories, data: vsInputSheetContext.leadFactories, onSelectChange: changeLeadfactory, fieldName: 'Lead Factories' })),
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 4 },
                            react_1["default"].createElement(dropdownComponent_1["default"], { selectedField: selectedGarmentCompositions, data: pink_d_1.garmentCompositionPink, 
                                // data={pinkGarmentCompositions}
                                onSelectChange: changeGarmentCom, fieldName: 'Garment Compositions' })),
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 4 },
                            react_1["default"].createElement(dropdownComponent_1["default"], { selectedField: selectedBuyerDivisions, 
                                // data={vsInputSheetContext.buyerDivisions}
                                data: pink_d_1.divisionCodes, onSelectChange: changeBuyerDivision, fieldName: 'Buyer Division' })),
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 2 },
                            react_1["default"].createElement(dropdownComponent_1["default"], { selectedField: selectedSeasonCode, data: pink_d_1.seasonalCodes, onSelectChange: changeSeasonalCode, fieldName: 'Seasonal Code' })),
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 2 },
                            react_1["default"].createElement(dropdownComponent_1["default"], { selectedField: selectedYearCode, data: pink_d_1.yearCodes, onSelectChange: changeYearCode, fieldName: 'Year' })),
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 2 },
                            react_1["default"].createElement(dropdownComponent_1["default"], { selectedField: selectedInseam, data: pink_d_1.inseams, onSelectChange: changeInseam, fieldName: 'Inseam' })),
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 3 },
                            react_1["default"].createElement(dropdownComponent_1["default"], { selectedField: selectedPackingType, data: pink_d_1.packingTypes, onSelectChange: changePackingType, fieldName: 'Packing Type' })))),
                react_1["default"].createElement("div", { className: 'col-sm-3' },
                    react_1["default"].createElement(core_1.Grid, { container: true, style: {
                            border: '0.4px solid #C0C0C0	',
                            padding: '0.3vw',
                            borderRadius: '5px'
                        }, spacing: 2 },
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 12 },
                            react_1["default"].createElement(dropdownComponent_1["default"], { fieldName: 'Warehouse', data: pink_d_1.wareHouses, onSelectChange: onWareHouseChange, selectedField: selectedWareHouse })),
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 12 },
                            react_1["default"].createElement("input", { style: { height: '2.5vw' }, name: 'date', type: 'date', value: requestDelDate, onChange: function (e) {
                                    var value = e.target.value;
                                    setrequestDelDate(value);
                                }, className: 'form-control' })))))),
        react_1["default"].createElement("div", { style: { marginTop: '2vw', marginRight: 10 } },
            react_1["default"].createElement("table", { className: 'table table-bordered table-sm' },
                react_1["default"].createElement("thead", null,
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("th", { scope: 'col' }, "Color Code"),
                        react_1["default"].createElement("th", { scope: 'col' }, "Pack Method"),
                        react_1["default"].createElement("th", { scope: 'col' }, "Change"),
                        react_1["default"].createElement("th", { scope: 'col' },
                            "Delivery Date",
                            ' ',
                            react_1["default"].createElement(AddCircle_1["default"], { onClick: function () { return onAddDelDateClicked(); }, color: 'secondary' })),
                        react_1["default"].createElement("th", { scope: 'col' },
                            "Warehouse",
                            ' ',
                            react_1["default"].createElement(AddCircle_1["default"], { onClick: function () { return onAddWarehouseClicked(); }, color: 'secondary' })),
                        react_1["default"].createElement("th", { scope: 'col' }, "Destination"),
                        react_1["default"].createElement("th", { scope: 'col' }, "VPO No"),
                        react_1["default"].createElement("th", { scope: 'col' }, "Ship Mode"))),
                react_1["default"].createElement("tbody", null, selectedStyleData.newLines.map(function (_a, index) {
                    var MASTCOLORCODE = _a.MASTCOLORCODE, wareHouse = _a.wareHouse, destination = _a.destination, VPONO = _a.VPONO, packMethod = _a.packMethod, requestDelDate = _a.requestDelDate, masterColorKey = _a.masterColorKey, Qty = _a.Qty, SHIPMODE = _a.SHIPMODE;
                    return (react_1["default"].createElement("tr", { key: index, style: { paddingTop: '0vw' } },
                        react_1["default"].createElement("td", { style: { paddingRight: '0vw' } }, MASTCOLORCODE),
                        react_1["default"].createElement("td", null,
                            packMethod,
                            " "),
                        react_1["default"].createElement("td", { align: 'center' },
                            react_1["default"].createElement(AddCircle_1["default"], { color: 'secondary', onClick: function () { return onStyleLineChangeClick(masterColorKey); } })),
                        react_1["default"].createElement("td", null,
                            " ",
                            requestDelDate),
                        react_1["default"].createElement("td", null,
                            wareHouse,
                            " "),
                        react_1["default"].createElement("td", null,
                            destination,
                            " "),
                        react_1["default"].createElement("td", null,
                            VPONO,
                            " "),
                        react_1["default"].createElement("td", null,
                            " ",
                            SHIPMODE)));
                })))),
        react_1["default"].createElement(core_1.Modal, { open: openPackingModal, onClose: handleClose, style: {
                height: '70vh',
                width: '40vw',
                margin: 'auto'
            }, BackdropComponent: core_1.Backdrop },
            react_1["default"].createElement(PackingItem_1["default"], { SheetContext: pinkContext_1["default"], bom: pinkInputSheetContext, setOpenPackingModal: setOpenPackingModal, setPackingStatus: setPackingStatus }))));
};
exports["default"] = Step2Componentv2;
