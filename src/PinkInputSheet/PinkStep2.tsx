//VS Modern View
import React, { useState, useContext, useEffect } from 'react';
import PinkInputSheetContext from '../context/pinkContext';
import VsInputSheetContext from '../context/vsInputSheetContext';
import {
	Grid,
	Button,
	Modal,
	Backdrop,
	CircularProgress,
} from '@material-ui/core';
import DropDownComponent from '../components/layout/dropdownComponent';
import AddCircleIcon from '@material-ui/icons/AddCircle';
//import XLSX from 'xlsx';
import XLSX from 'xlsx-js-style';
import {
	inseams,
	packingTypes,
	seasonalCodes,
	wareHouses,
	yearCodes,
} from '../Services/datasets/pink.d';
import { 
	getMerchandiser,
	getPlanners,
	getBuyerDivisions,
	getLeadFactories,
	getGarmentCompositions,
	getWarehouses,
	getM3BuyerDivisions,
	addSMV, 
	getRmColorThread, 
	getSMV,
	getM3BuyerDivisionDetail, 
	getBuyerDivisionsDetail, 
	getPlannersDetail,
	getMerchandiserDetail,
	getGarmentCompositionsDetail,
	getLeadFactoriesDetail,
	getWarehousesDetail } from '../Services/data';
import ecvisionHeaderNames from '../Services/datasets/ecvisionNames';
import { wscols } from '../inputSheetTemplate';
import { COTblData, operationtable } from '../Services/datasets/common.d';
import { SheetJSFT } from '../utils/sheetJSFT';
import PackingItem from '../packingItems/PackingItem';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {
	getDeliveryMethodPink,
	getFOB,
	getSeasonPink,
	getZFtrPink,
} from '../Services/pink';
import { convertExcelDateToJsLocaleDateString } from '../utils/conversions';
import { getBOMThreadLinesLogo, getThreadLines } from '../Services/threadsheet';
import { OpsTrackSheetFormat } from '../Services/formatExcel';
import moment from 'moment';

const Step2Component = () => {
	
	const [merchandisers, setMerchandisers] = useState([]);
	const [planners, setplanners] = useState([]);
	const [buyerDivisions, setbuyerDivisions] = useState([]);
	const [leadFactories, setleadFactories] = useState([]);
	const [garmentCompositions, setgarmentCompositions] = useState([]);
	const [warehouses, setwarehouses] = useState([]);
	const [m3buyerDivisions, setm3buyerDivisions] = useState([]);
	const [orderPrecentage, setorderPrecentage] = useState(100);

	const pinkInputSheetContext = useContext(PinkInputSheetContext);
	const vsInputSheetContext = useContext(VsInputSheetContext);
	const [filename, setFileName] = useState('Select OLR File');
	const [selectedWareHouse, setSelectedWarehouse] = useState<any>('');
	const [selectedWareHouseForLine, setSelectedWarehouseForLine] = useState<any>('');
	const [selectedPackMethodForLine, setSelectedPackMethodForLine] = useState<any>('');
	const [selectedMerchandiser, setselectedMerchandiser] = useState<any>('');
	const [selectedPlanner, setselectedPlanner] = useState<any>('');
	const [selectedBuyerDivisions, setBuyerDivisions] = useState<any>('');
	const [selectedLeadFactories, setselectedLeadFactory] = useState<any>('');
	const [selectedGarmentCompositions, setGarmentCompositions] = useState<any>('');
	const [selectedStyleData, setSelectedStyleData] = useState<any>({newLines: [], });
	const [upOLRDATASET, setupOLRDATASET] = useState<any>([]);
	const [requestDelDate, setrequestDelDate] = useState('');
	const [selectedSeasonCode, setselectedSeasonCode] = useState<any>('');
	const [selectedYearCode, setselectedYearCode] = useState<any>('');
	const [selectedSizetemp, setselectedSizetemp] = useState<any>('');
	const [selectedInseam, setselectedInseam] = useState('');
	const [selectedPackingType, setSelectedPackingType] = useState('');
	const [selectedM3BuyerDivision, setselectedM3BuyerDivision] = useState<any>('');
	const [threadStatus, setThreadStatus] = useState<boolean | null>(null);
	const [threadFileName, setthreadFileName] = useState<any>('Upload Thread YY');
	const [threadData, setThreadData] = useState<any>([]);
	const [openPackingModal, setOpenPackingModal] = useState<boolean>(false);
	const COColors: any[] = [];

	const [ERRORLIST, setERRORLIST] = useState<any>([]);

	const handleClose = () => setOpenPackingModal(false);
	const [uniq_linekey, setuniq_linekey] = useState<any>('');

	const changeMerchandiser = (id) => setselectedMerchandiser(id);
	const changePlanner = (id) => setselectedPlanner(id);
	const changeLeadfactory = (id) => setselectedLeadFactory(id);
	const changeBuyerDivision = (id) => setBuyerDivisions(id);
	const changeM3BuyerDivision = (id) => setselectedM3BuyerDivision(id);
	const changeGarmentCom = (id) => setGarmentCompositions(id);
	const changeSeasonalCode = (id) => setselectedSeasonCode(id);
	const changeYearCode = (id) => setselectedYearCode(id);
	const changeSizetemp = (id) => setselectedSizetemp(id);
	const changeInseam = (id) => setselectedInseam(id);
	const changePackingType = (id) => setSelectedPackingType(id);

	useEffect(() => {
		async function fetchData() {
			const merchandisers = await getMerchandiser('VSM');
			setMerchandisers(merchandisers);
			
			const planners = await getPlanners('VSM');
			setplanners(planners);
			
			const buyerDivisions = await getBuyerDivisions('VSM');
			setbuyerDivisions(buyerDivisions);

			const leadFactories = await getLeadFactories();
			setleadFactories(leadFactories);

			const garmentCompositions = await getGarmentCompositions('VSM');
			setgarmentCompositions(garmentCompositions);

			const warehouses = await getWarehouses('VSM');
			setwarehouses(warehouses);

			const m3buyerDivisions = await getM3BuyerDivisions('VSM');
			setm3buyerDivisions(m3buyerDivisions);

		}
		fetchData();
	}, []);

	const onWareHouseChange = (id: number) => {
		//id == 1 ? setselectedLeadFactory(1) : setselectedLeadFactory(2);
		setSelectedWarehouse(id);
	};

	const onWareHouseChangeForLine = (id: number) => {
		//id == 1 ? setselectedLeadFactory(1) : setselectedLeadFactory(2);
		setSelectedWarehouseForLine(id);
	};

	const onPackMethodChangeForLine = (id: string) => {
		//id == 1 ? setselectedLeadFactory(1) : setselectedLeadFactory(2);
		setSelectedPackMethodForLine(id);
	};

	//read OLR file
	const onFileSelect = async (e) => {
		
		if(pinkInputSheetContext.style.length < 1)
		{
			alert('Please Select/Sync Style and BOM.');
			return;
		}
		 
		if(orderPrecentage.toString() === "")
		{
			alert('Please Enter Order Qty Ratio (Minimum value is 100).');
			return;
		}

		if(orderPrecentage < 100)
		{
			alert('Please Enter Order Qty Ratio (Minimum value is 100).');
			return;
		}

		if(selectedSizetemp.length < 1)
		{
			alert('Please Select Size Template.');
			return;
		}

		const files = e.target.files;
		// await setisFileReading(true);
		await setFileName(files[0].name);

		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;

		reader.onload = async (ee: any) => {
			const bstr = ee.target.result;
			const wb = await XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
			const sheet = wb.Sheets['OrderListReport'];
			if (sheet) {
				let sheetStyles: any = [];
				const sheetData = XLSX.utils.sheet_to_json(sheet, {
					header: 1,
					blankrows: false,
					defval: '',
				});
				//console.log(sheetData[0])
				const headerRow: any = sheetData.splice(0, 1)[0];
				//console.log(sheetData.splice(0, 1))
				for (let i in headerRow) {
					headerRow[i] = headerRow[i].trim();
				}

				//sheetData = OLR 

				sheetData.forEach((line: any) => {
					let obj: any = {};
					for (let i in headerRow) {
						obj[headerRow[i]] = line[i];
					}

					if (obj.TECHPACKNO.toString().includes(pinkInputSheetContext.style)) {
						//Not usefull
						if (
							!isNaN(obj[ecvisionHeaderNames.SHIPDATE]) &&
							obj[ecvisionHeaderNames.SHIPDATE] != ''
						) {
							obj[ecvisionHeaderNames.SHIPDATE] =
								convertExcelDateToJsLocaleDateString(
									obj[ecvisionHeaderNames.SHIPDATE]
								);
						}
						obj[ecvisionHeaderNames.SHIPDATE] = new Date(
							obj[ecvisionHeaderNames.SHIPDATE]
						);//.getTime();

						if (
							!isNaN(obj[ecvisionHeaderNames.NDCDATE]) &&
							obj[ecvisionHeaderNames.NDCDATE] != ''
						) {
							obj[ecvisionHeaderNames.NDCDATE] =
								convertExcelDateToJsLocaleDateString(
									obj[ecvisionHeaderNames.NDCDATE]
								);
						}
						obj[ecvisionHeaderNames.NDCDATE] = new Date(
							obj[ecvisionHeaderNames.NDCDATE]
						);

						sheetStyles.push(obj);
					}
				});

				if (sheetStyles.length > 0) {
					

					//Get season based on season code (OLR)
					const seasonName = getSeasonPink(
						sheetStyles[0][ecvisionHeaderNames.SEASON]
					);

					let uniqueStylesWithData = {
						styleNo: pinkInputSheetContext.style,
						VERSION: '',
						itemGroup: sheetStyles[0][ecvisionHeaderNames.SEASON],
						season: seasonName,
						// purchasingGroup: shipDateFilteredStylesData[0]['PURCHASINGGROUP'],
						purchasingGroup: '',
						// lines: shipDateFilteredStylesData,
						lines: sheetStyles,
						wareHouse: '',
						destination: '',
						deliveryMethod: '',
						merchandiser: '',
						planner: '',
						packMethod: '',
						buyerDivision: '',
						leadFactory: '',
						MASTSTYLEDESC: sheetStyles[0]['MASTSTYLEDESC']
					};

					pinkInputSheetContext.changeGenericNo(
						sheetStyles[0][ecvisionHeaderNames.GENERICNO]
					);
					changeSelectedStyleNo(uniqueStylesWithData);

					alert(sheetStyles.length.toString()+' No of Related Rows Found in OLR.');

				} else {
					alert('No Style ' + pinkInputSheetContext.style);
				}
			} else {
				alert('No Sheet named OrderListReport');
			}
		};
		if (rABS) reader.readAsBinaryString(files[0]);
		else reader.readAsArrayBuffer(files[0]);
	};

	const onStyleLineChangeClick = async (masterColorKey) => {
		// setShowStyle(false); 
		setOpenPackingModal(true);
		setuniq_linekey(masterColorKey);
		
	};

	const onUpdatewarehouse = async () => {
		
		if(uniq_linekey.length > 0)
		{
			const wareHouse = await getWarehousesDetail(selectedWareHouseForLine);

			const relevantLine = selectedStyleData.newLines.find(
				(l) => l.masterColorKey === uniq_linekey
			);

			relevantLine.wareHouse = wareHouse ? wareHouse[0].name : '';
			setSelectedStyleData(selectedStyleData);

			const relevantLine_olr = upOLRDATASET.newLines.find(
				(l) => l.masterColorKey === uniq_linekey
			);

			relevantLine_olr.wareHouse = wareHouse ? wareHouse[0].name : '';

			setOpenPackingModal(false);
		}
		else
		{
			
			alert('Please Select warehouse and data.');
		}

	};

	const onUpdatePackMethod = async () => {
		
		if(uniq_linekey.length > 0)
		{
			const packmethod = selectedPackMethodForLine;

			const relevantLine = selectedStyleData.newLines.find(
				(l) => l.masterColorKey === uniq_linekey
			);

			relevantLine.packMethod = packmethod ? packmethod : '';
			setSelectedStyleData(selectedStyleData);

			const relevantLine_olr = upOLRDATASET.newLines.find(
				(l) => l.masterColorKey === uniq_linekey
			);

			relevantLine_olr.packMethod = packmethod ? packmethod : '';

			setOpenPackingModal(false);
		}
		else
		{
			
			alert('Please Select Pack Method and data.');
		}

	};


	const changeSelectedStyleNo = (selectedStylesData: any) => {
		if (selectedStylesData) {
			selectedStylesData.newLines = [];

			// Create combination of followings
			// VPONO
			// MASTCOLORDESC
			// SHIPDATE

			const masterColorKeys = selectedStylesData.lines
				.filter((l) => l[ecvisionHeaderNames.MASTCOLORCODE])
				.map( (l) => l[ecvisionHeaderNames.MASTCOLORCODE] + l[ecvisionHeaderNames.VPONO] + l[ecvisionHeaderNames.SHIPDATE].getTime());
			
			const uniquemasterColorKeys = [...new Set([...masterColorKeys])];

			uniquemasterColorKeys.forEach((code) => {
				const selectedColorLines = selectedStylesData.lines.filter(
					(l) =>
						l[ecvisionHeaderNames.MASTCOLORCODE] + l[ecvisionHeaderNames.VPONO] + l[ecvisionHeaderNames.SHIPDATE].getTime() ==
						code
				);

				function sizetemplate(sizeid)
				{
					if(selectedSizetemp === "NORMAL")
					{
						if(sizeid === 1)
						{
							return 'XXS';
						}
						else if(sizeid === 2)
						{
							return 'XS';
						}
						else if(sizeid === 3)
						{
							return 'SMALL';
						}
						else if(sizeid === 4)
						{
							return 'MED';
						}
						else if(sizeid === 5)
						{
							return 'LARGE';
						}
						else if(sizeid === 6)
						{
							return 'XL';
						}
						else if(sizeid === 7)
						{
							return 'XXL';
						}
						else if(sizeid === 8)
						{
							return 'XXXL';
						}
						else
						{
							return '';
						}
					}
					else if(selectedSizetemp === "REG")
					{
						if(sizeid === 1)
						{
							return 'XXS REG';
						}
						else if(sizeid === 2)
						{
							return 'XS REG';
						}
						else if(sizeid === 3)
						{
							return 'SMALL REG';
						}
						else if(sizeid === 4)
						{
							return 'MED REG';
						}
						else if(sizeid === 5)
						{
							return 'LARGE REG';
						}
						else if(sizeid === 6)
						{
							return 'XL REG';
						}
						else if(sizeid === 7)
						{
							return 'XXL REG';
						}
						else if(sizeid === 8)
						{
							return 'XXXL REG';
						}
						else
						{
							return '';
						}
					}
					else if(selectedSizetemp === "LONG")
					{
						if(sizeid === 1)
						{
							return 'XXS LONG';
						}
						else if(sizeid === 2)
						{
							return 'XS LONG';
						}
						else if(sizeid === 3)
						{
							return 'SMALL LONG';
						}
						else if(sizeid === 4)
						{
							return 'MED LONG';
						}
						else if(sizeid === 5)
						{
							return 'LARGE LONG';
						}
						else if(sizeid === 6)
						{
							return 'XL LONG';
						}
						else if(sizeid === 7)
						{
							return 'XXL LONG';
						}
						else if(sizeid === 8)
						{
							return 'XXXL LONG';
						}
						else
						{
							return '';
						}
					}
					else if(selectedSizetemp === "SHORT")
					{
						if(sizeid === 1)
						{
							return 'XXS SHORT';
						}
						else if(sizeid === 2)
						{
							return 'XS SHORT';
						}
						else if(sizeid === 3)
						{
							return 'SMALL SHORT';
						}
						else if(sizeid === 4)
						{
							return 'MED SHORT';
						}
						else if(sizeid === 5)
						{
							return 'LARGE SHORT';
						}
						else if(sizeid === 6)
						{
							return 'XL SHORT';
						}
						else if(sizeid === 7)
						{
							return 'XXL SHORT';
						}
						else if(sizeid === 8)
						{
							return 'XXXL SHORT';
						}
						else
						{
							return '';
						}
					}
					else if(selectedSizetemp === "DUAL")
					{
						if(sizeid === 1)
						{
							return 'XS/S';
						}
						else if(sizeid === 2)
						{
							return 'M/L';
						}
						else if(sizeid === 3)
						{
							return 'XLXXL';
						}
						else
						{
							return '';
						}
					}
					else
					{
						return '';
					}
				}

				let tempXXS, tempXS, tempSMALL, tempMED, tempLARGE, tempXL, tempXXL, tempXXXL;
				selectedColorLines.forEach((l) => {
					const tempSize = l[ecvisionHeaderNames.MASTSIZEDESC].toUpperCase().trim();
						if(selectedSizetemp === "DUAL")
						{
							if (tempSize === sizetemplate(1)) {
								tempXXS = l[ecvisionHeaderNames.ORDERQTY];
							} else if (tempSize === sizetemplate(2)) {
								tempXS = l[ecvisionHeaderNames.ORDERQTY];
							} else if (tempSize === sizetemplate(3)) {
								tempSMALL = l[ecvisionHeaderNames.ORDERQTY];
							} else if (tempSize === sizetemplate(4)) {
								tempMED = 0;
							} else if (tempSize === sizetemplate(5)) {
								tempLARGE = 0;
							} else if (tempSize === sizetemplate(6)) {
								tempXL = 0;
							} else if (tempSize === sizetemplate(7)) {
								tempXXL = 0;
							} else if (tempSize === sizetemplate(8)) {
								tempXXXL = 0;
							}
						}
						else
						{
							if (tempSize === sizetemplate(1)) {
								tempXXS = l[ecvisionHeaderNames.ORDERQTY];
							} else if (tempSize === sizetemplate(2)) {
								tempXS = l[ecvisionHeaderNames.ORDERQTY];
							} else if (tempSize === sizetemplate(3)) {
								tempSMALL = l[ecvisionHeaderNames.ORDERQTY];
							} else if (tempSize === sizetemplate(4)) {
								tempMED = l[ecvisionHeaderNames.ORDERQTY];
							} else if (tempSize === sizetemplate(5)) {
								tempLARGE = l[ecvisionHeaderNames.ORDERQTY];
							} else if (tempSize === sizetemplate(6)) {
								tempXL = l[ecvisionHeaderNames.ORDERQTY];
							} else if (tempSize === sizetemplate(7)) {
								tempXXL = l[ecvisionHeaderNames.ORDERQTY];
							} else if (tempSize === sizetemplate(8)) {
								tempXXXL = l[ecvisionHeaderNames.ORDERQTY];
							}
						}
					});

					const tempval_tempXXS = tempXXS > 0 ? tempXXS : 0;
					const tempval_tempXS = tempXS > 0 ? tempXS : 0;
					const tempval_tempSMALL = tempSMALL > 0 ? tempSMALL : 0;
					const tempval_tempMED = tempMED > 0 ? tempMED : 0;
					const tempval_tempLARGE = tempLARGE > 0 ? tempLARGE : 0;
					const tempval_tempXL = tempXL > 0 ? tempXL : 0;
					const tempval_tempXXL = tempXXL > 0 ? tempXXL : 0;
					const tempval_tempXXXL = tempXXXL > 0 ? tempXXXL : 0;

					const SETSIZE_XXS = tempval_tempXXS > 0 ? Math.round((Number(tempval_tempXXS) / 100) * orderPrecentage) : 0;
					const SETSIZE_XS = tempval_tempXS > 0 ? Math.round((Number(tempval_tempXS) / 100) * orderPrecentage) : 0;
					const SETSIZE_SMALL = tempval_tempSMALL > 0 ? Math.round((Number(tempval_tempSMALL) / 100) * orderPrecentage) : 0;
					const SETSIZE_MED = tempval_tempMED > 0 ? Math.round((Number(tempval_tempMED) / 100) * orderPrecentage) : 0;
					const SETSIZE_LARGE = tempval_tempLARGE > 0 ? Math.round((Number(tempval_tempLARGE) / 100) * orderPrecentage) : 0;
					const SETSIZE_XL = tempval_tempXL > 0 ? Math.round((Number(tempval_tempXL) / 100) * orderPrecentage) : 0;
					const SETSIZE_XXL = tempval_tempXXL > 0 ? Math.round((Number(tempval_tempXXL) / 100) * orderPrecentage) : 0;
					const SETSIZE_XXXL = tempval_tempXXXL > 0 ? Math.round((Number(tempval_tempXXXL) / 100) * orderPrecentage) : 0;

				const lineToBeCreated = {
					masterColorKey: code,
					SHIPTONAME: selectedColorLines[0][ecvisionHeaderNames.SHIPTONAME],
					SHIPMODE: selectedColorLines[0][ecvisionHeaderNames.SHIPMODE],
					SHIPDATE: selectedColorLines[0][ecvisionHeaderNames.SHIPDATE],
					NDCDATE: selectedColorLines[0][ecvisionHeaderNames.NDCDATE],
					VPONO: selectedColorLines[0][ecvisionHeaderNames.VPONO],
					CPO: selectedColorLines[0][ecvisionHeaderNames.CPO],
					MASTCOLORCODE: selectedColorLines[0][ecvisionHeaderNames.MASTCOLORCODE],
					MASTCOLORDESC: selectedColorLines[0][ecvisionHeaderNames.MASTCOLORDESC],
					CUSTCOLORCODE: selectedColorLines[0][ecvisionHeaderNames.CUSTCOLORCODE],
					CUSTSTYLE: selectedColorLines[0].CUSTSTYLE,
					CUSTSTYLEDESC: selectedColorLines[0].CUSTSTYLEDESC,
					SETSIZE_XXS,
					SETSIZE_XS,
					SETSIZE_SMALL,
					SETSIZE_MED,
					SETSIZE_LARGE,
					SETSIZE_XL,
					SETSIZE_XXL,
					SETSIZE_XXXL,
					TOTALQTY: SETSIZE_XXS + SETSIZE_XS + SETSIZE_SMALL + SETSIZE_MED + SETSIZE_LARGE + SETSIZE_XL + SETSIZE_XXL + SETSIZE_XXXL,
					DIVISIONCODE: selectedColorLines[0][ecvisionHeaderNames.DIVISIONCODE],
					MASTSIZEDESC: selectedColorLines[0][ecvisionHeaderNames.MASTSIZEDESC],
					FACTORYCOST: selectedColorLines[0][ecvisionHeaderNames.FACTORYCOST],
					MIDDLEMANCHARGES: selectedColorLines[0][ecvisionHeaderNames.MIDDLEMANCHARGES],
				};

				if(lineToBeCreated.TOTALQTY>0){
					selectedStylesData.newLines.push(lineToBeCreated);
				}
			});

			selectedStylesData.newLines.forEach((line) => {
				
				line.destination = line[ecvisionHeaderNames.SHIPTONAME].toLowerCase().includes(ecvisionHeaderNames.DC2)
				? ecvisionHeaderNames.USA03
				: line[ecvisionHeaderNames.SHIPTONAME].toLowerCase().includes(ecvisionHeaderNames.DC4)
				? ecvisionHeaderNames.USA03
				: line[ecvisionHeaderNames.SHIPTONAME].toLowerCase().includes(ecvisionHeaderNames.DC5)
				? ecvisionHeaderNames.USA03
				: line[ecvisionHeaderNames.SHIPTONAME].toLowerCase().includes(ecvisionHeaderNames.DC6)
				? ecvisionHeaderNames.USA03
				: line[ecvisionHeaderNames.SHIPTONAME].toLowerCase().includes(ecvisionHeaderNames.Creative)
				? ecvisionHeaderNames.USA03
				: line[ecvisionHeaderNames.SHIPTONAME].toLowerCase().includes(ecvisionHeaderNames.GLP)
				? ecvisionHeaderNames.CHN01
				: line[ecvisionHeaderNames.SHIPTONAME].toLowerCase().includes(ecvisionHeaderNames.Next)
				? ecvisionHeaderNames.GBR01
				: '';
						
				line.packMethod = line[ecvisionHeaderNames.SHIPTONAME].toLowerCase().includes(ecvisionHeaderNames.DC5)
					? ecvisionHeaderNames.SinglePack
					: ecvisionHeaderNames.ThirtyPack;
					
				line.wareHouse = '';
				line.requestDelDate = '';
				line.PCDDate = calculateDate(line[ecvisionHeaderNames.SHIPDATE]);
			});
			setSelectedStyleData({ ...selectedStylesData });
			setupOLRDATASET({ ...selectedStylesData });
			// setShowStyle(true);
		}
	};


	const calculateDate = (date: Date): any => {
		var resDate:any = null;
		if(date){
			// Deduct one day from the date
			// If it results 'Sunday' duduct that as well
			resDate = new Date();
			resDate.setDate(date.getDate() - 1);

			let weekday: number = resDate.getUTCDay();
			if (weekday == 0) {
				resDate.setDate(resDate.getDate() - 1);
			}
		}
		return resDate;
	}

	const onAddWarehouseClicked = async () => {
		if(selectedWareHouse.length === 0)
		{
			alert('Please Select Warehouse?');
			return;
		}

		const wareHouse = await getWarehousesDetail(selectedWareHouse);
		
		let cselectedStyleData = { ...selectedStyleData };
			cselectedStyleData.newLines.forEach((line) => {
				line.wareHouse = wareHouse[0].name;
			});
			setSelectedStyleData(cselectedStyleData);

			let olr_cselectedStyleData = upOLRDATASET.newLines;

			upOLRDATASET.newLines.forEach((line_olr) => {
				line_olr.wareHouse = wareHouse[0].name;
			});

			upOLRDATASET.newLines = olr_cselectedStyleData;

			alert('All Rows updated.');

	};


	const onAddDelDateClicked = async () => {
		if(requestDelDate.length === 0)
		{
			alert('Please Select Date?');
			return;
		}

		let cselectedStyleData = { ...selectedStyleData };
		cselectedStyleData.newLines.forEach((line) => {
			line.requestDelDate = requestDelDate;
		});
		setSelectedStyleData(cselectedStyleData);
		
		let olr_cselectedStyleData = upOLRDATASET.newLines;

			upOLRDATASET.newLines.forEach((line_olr) => {
				line_olr.requestDelDate = requestDelDate;
			});

			upOLRDATASET.newLines = olr_cselectedStyleData;

			alert('All Rows updated.');
	};

	const onInputSheetDownload = async () => {

		const error_data: any[] = [];

		selectedStyleData.newLines = upOLRDATASET.newLines;

		/* Devon Comment This

		if(selectedMerchandiser.length === 0)
		{
			alert('Please Select Merchandiser?');
			return;
		}
		
		if(selectedPlanner.length === 0)
		{
			alert('Please Select Planner?');
			return;
		}

		if(selectedLeadFactories.length === 0)
		{
			alert('Please Select Lead factory?');
			return;
		}

		if(selectedGarmentCompositions.length === 0)
		{
			alert('Please Select Garment Composition?');
			return;
		}
		*/

		if(selectedBuyerDivisions.length === 0)
		{
			alert('Please Select Buyer Division?');
			return;
		}

		/* Devon Comment This

		if(selectedM3BuyerDivision.length === 0)
		{
			alert('Please Select M3 Buyer Division?');
			return;
		}
		*/

		const buyerDevisionvalues = await getBuyerDivisionsDetail(selectedBuyerDivisions);
		const buyerDivision = buyerDevisionvalues[0].code;

		/* Devon Comment This
		const M3values = await getM3BuyerDivisionDetail(selectedM3BuyerDivision);
		const M3buyerDivision = M3values[0].name;
		const Grouptechclass = M3values[0].gtc;

		const plannervalues = await getPlannersDetail(selectedPlanner);
		const planner = plannervalues[0].name;

		const merchandiservalues =await getMerchandiserDetail(selectedMerchandiser);
		const merchandiser = merchandiservalues[0].name;

		const garmentCompositionvalues = await getGarmentCompositionsDetail(selectedGarmentCompositions);
		const garmentComposition = garmentCompositionvalues[0].name;

		const leadFactoryvalues = await getLeadFactoriesDetail(selectedLeadFactories);
		const leadFactory = leadFactoryvalues[0].name;
		*/
		const seasoncode = seasonalCodes.find((s) => s.id == selectedSeasonCode)?.name ?? '';
		const yearcode = yearCodes.find((s) => s.id == selectedYearCode)?.name ?? '';

		let newStyleno = '';
		
		//BFF_LBRANDS_VS_WOMENS_SLEEP_VSD
		newStyleno = buyerDevisionvalues[0].code;

		

		if(selectedSizetemp === "LONG")
		{
			newStyleno += "L";
			newStyleno += pinkInputSheetContext.style.slice(-3);
		}
		else if(selectedSizetemp === "REG")
		{
			newStyleno += "R";
			newStyleno += pinkInputSheetContext.style.slice(-3);
		}
		else if(selectedSizetemp === "SHORT")
		{
			newStyleno += "S";
			newStyleno += pinkInputSheetContext.style.slice(-3);
		}
		else
		{
			newStyleno += pinkInputSheetContext.style.slice(-4);
		}

		newStyleno += (seasoncode + yearcode);
		
		// HeaderSeason = (NewSeason);

		const NewSeason = pinkInputSheetContext.season.toUpperCase() === 'FALL' ? 'FA' :
		pinkInputSheetContext.season.toUpperCase() === 'SPRING' ? 'SP' :
		pinkInputSheetContext.season.toUpperCase() === 'SUMMER' ? 'SU' : 'HO';

		const season = pinkInputSheetContext.season.toUpperCase()+ " - " + NewSeason + pinkInputSheetContext.Selyear.toString().slice(-2);

		//Devon Comment Below Line
		//newStyleno += (season + selectedStyleData.itemGroup.slice(-1));
 
		const selectedBuyerDivisionName: string = buyerDevisionvalues[0].name;
		
		//const selectedInseamName: string = inseams.find(i => i.id === selectedInseam)?.name ?? '';

		//selectedStyleData.newLines = selectedStyleData.newLines.filter(i => i.DIVISIONCODE === selectedBuyerDivisionName && i.MASTSIZEDESC.includes(selectedInseamName));
		selectedStyleData.newLines = selectedStyleData.newLines.filter(i => i.DIVISIONCODE === selectedBuyerDivisionName);
		// if selected packing type is Single, no nrrd to change the row information,
		// else if selected packing type is 'Double', copy the individual VPO number with row and then add TOP and Bottom to the end of COlOR column.

		if(selectedPackingType === 'D'){
			
			//deep cloning array because [..array] not work for complex arrays
			let newLinesTop:any[]  = JSON.parse(JSON.stringify(selectedStyleData.newLines));

			newLinesTop = newLinesTop.map( l =>{
				l.MASTCOLORDESC = `${l.MASTCOLORDESC}-TOP`;
				return l
			});

			let newLinesBottom:any[]  = JSON.parse(JSON.stringify(selectedStyleData.newLines));

			newLinesBottom = newLinesBottom.map( l =>{
				l.MASTCOLORDESC = `${l.MASTCOLORDESC}-BTM`;
				return l
			});

			let combinedArrays:any[] = [];

			newLinesTop.forEach((line,index) => {
				combinedArrays.push(line);
				combinedArrays.push(newLinesBottom[index]);
			});

			selectedStyleData.newLines = combinedArrays;
		}

		const wb = XLSX.utils.book_new();
		let template = COTblData(
			false,
			newStyleno,
			selectedStyleData,
			'',//leadFactory,
			buyerDivision,
			'',//merchandiser,
			'',//planner,
			'',//garmentComposition,
			'',//M3buyerDivision,
			'KNUND-Knit Underwear', //product group
			season,
			'',//Grouptechclass,

		);

		selectedStyleData.newLines = selectedStyleData.newLines.sort( (vala, valb) => vala.MASTCOLORCODE.localeCompare(valb.MASTCOLORCODE) || vala.VPONO - valb.VPONO || vala.TOTALQTY - valb.TOTALQTY, );

		//Loop through OLR lines
		for (let i = 0; i < selectedStyleData.newLines.length; i++) {
			const line = selectedStyleData.newLines[i];
			COColors.push(line.MASTCOLORCODE.toString().slice(-6));

			//Get matching color from BOM Garment Color(last 4 chars) based on Color code(last 4 chars) in OLR
			//const matchingColor: any = pinkInputSheetContext.colorData.find(
				//(c: any) => c.slice(-6) == line.MASTCOLORCODE.toString().slice(-6)
			//);
			//let newColor = matchingColor;

			// const indexofdeldate = uniquedeliveryDates.findIndex(
			// 	(l) => l == line.requestDelDate
			// );

			//Get Z Feature based on SHIPTONAME
			const zft = getZFtrPink(line.SHIPTONAME);

			//Get delivery method based on Shipmode
			const deliveryMethod = getDeliveryMethodPink(
				line[ecvisionHeaderNames.SHIPMODE]
			);

			//Get FOB List based on styleid and bomid
			//const FOBList = await getFOB(
				//parseInt(pinkInputSheetContext.styleid),
				//parseInt(pinkInputSheetContext.bomid)
			//);

			//Get FOB based on Color (CO) from FOB List
			//const FOB = FOBList.find(
				//(item: any) => item.Garment.toUpperCase() === newColor.toUpperCase()
			//);

			//Create CO Table lines
			if(selectedSizetemp === "DUAL")
			{
				const rowToAdd = [
					'FALSE', // added NewLine into the sheet
					line.wareHouse,
					line.destination,
					selectedStyleData.styleNo,//line.CUSTSTYLE + '/' + line.CUSTSTYLEDESC.slice(0, 6),
					new Date(line.requestDelDate),
					new Date(line.requestDelDate),
					new Date(line.requestDelDate), //FOB Date
					new Date(line[ecvisionHeaderNames.NDCDATE]).toLocaleDateString(),
					new Date(line.PCDDate), //PCDDate
					line[ecvisionHeaderNames.MASTCOLORDESC],
					line[ecvisionHeaderNames.VPONO],
					line[ecvisionHeaderNames.CPO],
					//FOB.FOB,
					deliveryMethod,//'DeliveryMethod *'
					parseFloat(line[ecvisionHeaderNames.MIDDLEMANCHARGES]) + parseFloat(line[ecvisionHeaderNames.FACTORYCOST]),
					'Free On Board-FOB',//'DeliveryTerm *'
					line.packMethod,
					zft,
					line[ecvisionHeaderNames.TOTALQTY],
					line["SETSIZE_XXS"],
					line["SETSIZE_XS"],
					line["SETSIZE_SMALL"],
					''//CO
				];
				template.push(rowToAdd);
			}
			else
			{
				const rowToAdd = [
					'FALSE', // added NewLine into the sheet
					line.wareHouse,
					line.destination,
					selectedStyleData.styleNo,//line.CUSTSTYLE + '/' + line.CUSTSTYLEDESC.slice(0, 6),
					new Date(line.requestDelDate),
					new Date(line.requestDelDate),
					new Date(line.requestDelDate), //FOB Date
					new Date(line[ecvisionHeaderNames.NDCDATE]).toLocaleDateString(),
					new Date(line.PCDDate), //PCDDate
					line[ecvisionHeaderNames.MASTCOLORDESC],
					line[ecvisionHeaderNames.VPONO],
					line[ecvisionHeaderNames.CPO],
					//FOB.FOB,
					deliveryMethod,//'DeliveryMethod *'
					parseFloat(line[ecvisionHeaderNames.MIDDLEMANCHARGES]) + parseFloat(line[ecvisionHeaderNames.FACTORYCOST]),
					'Free On Board-FOB',//'DeliveryTerm *'
					line.packMethod,
					zft,
					line[ecvisionHeaderNames.TOTALQTY],
					line["SETSIZE_XXS"],
					line["SETSIZE_XS"],
					line["SETSIZE_SMALL"],
					line["SETSIZE_MED"],
					line["SETSIZE_LARGE"],
					line["SETSIZE_XL"],
					line["SETSIZE_XXL"],
					line["SETSIZE_XXXL"],
					''//CO
				];
				template.push(rowToAdd);
			}
		}

		// Change sizes postfix according to Inseam
		function getinseamwithsize(inseam_val: String)
		{
			if(inseam_val.length > 0)
			{
				return '.' + inseam_val;
			}
			else
			{
				return '';
			}
		}

		if(selectedSizetemp === "NORMAL")
		{
			template[14][18] = ' XXS';
			template[14][19] = ' XS';
			template[14][20] = ' SMALL';
			template[14][21] = ' MED';
			template[14][22] = ' LARGE';
			template[14][23] = ' XL';
			template[14][24] = ' XXL';
			template[14][25] = ' XXXL';
			template[14][26] = ' CO Number';
		}
		else if(selectedSizetemp === "REG")
		{
			template[14][18] = ' XXS.R';
			template[14][19] = ' XS.R';
			template[14][20] = ' SMALL.R';
			template[14][21] = ' MED.R';
			template[14][22] = ' LARGE.R';
			template[14][23] = ' XL.R';
			template[14][24] = ' XXL.R';
			template[14][25] = ' XXXL.R';
			template[14][26] = ' CO Number';
		}
		else if(selectedSizetemp === "LONG")
		{
			template[14][18] = ' XXS.L';
			template[14][19] = ' XS.L';
			template[14][20] = ' SMALL.L';
			template[14][21] = ' MED.L';
			template[14][22] = ' LARGE.L';
			template[14][23] = ' XL.L';
			template[14][24] = ' XXL.L';
			template[14][25] = ' XXXL.L';
			template[14][26] = ' CO Number';
		}
		else if(selectedSizetemp === "SHORT")
		{
			template[14][18] = ' XXS.S';
			template[14][19] = ' XS.S';
			template[14][20] = ' SMALL.S';
			template[14][21] = ' MED.S';
			template[14][22] = ' LARGE.S';
			template[14][23] = ' XL.S';
			template[14][24] = ' XXL.S';
			template[14][25] = ' XXXL.S';
			template[14][26] = ' CO Number';
		}
		else if(selectedSizetemp === "DUAL")
		{
			template[14][18] = ' XS/S';
			template[14][19] = ' M/L';
			template[14][20] = ' XLXXL';
			template[14][21] = ' CO Number';
			template[14][22] = '';
			template[14][23] = '';
			template[14][24] = '';
			template[14][25] = '';
			template[14][26] = '';
		}
		else
		{
			template[14][18] = '';
			template[14][19] = '';
			template[14][20] = '';
			template[14][21] = '';
			template[14][22] = '';
			template[14][23] = '';
			template[14][24] = '';
			template[14][25] = '';
			template[14][26] = '';
		}

		//BOM removing colors not in CO and Thread lines & Dummy in PLM
		const filteredBOM: any[] = pinkInputSheetContext.BOM.filter((row: any) => {
			const prodGroup = row[1].toUpperCase().split('-');
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
		threadData.map((row: any) => filteredBOM.push(row));

		//====Add SMV to Ops Track Data====
		//Get SMV for OpsToTrack
		const smv = await getSMV(
			parseInt(pinkInputSheetContext.styleid),
			parseInt(pinkInputSheetContext.bomid)
		);
		const opsToTrackData = addSMV(operationtable, smv);

		//====Create the Inputsheet Sheets====
		//Co sheet
		const ws = XLSX.utils.aoa_to_sheet(template);
		ws['!cols'] = wscols;

		//==== Input Sheet Validation ====//
		//Check Style No Format
		
        var cell_styleno = ws['B1'].v;
        if(cell_styleno !== "")
        {
          if(cell_styleno.length !== 8)
          {
            ws['B1'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
            error_data.push({sheetname:'CO Line', cellid:'B1', error:'Style No Length not equal to 8 characters.'});
          }
        }
        else
        {
          ws['B1'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          error_data.push({sheetname:'CO Line', cellid:'B1', error:'Style No Can not be in blank.'});
        }

        //Check Version ID
        var cell_versionid = ws['B2'].v;
        if(RegExp('^[0-9]*$').test(cell_versionid) === false)
        {
          ws['B2'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          error_data.push({sheetname:'CO Line', cellid:'B2', error:'Only Numeric Version ID is allowed.'});
        }

        //Check Garment Item Desc
        var cell_itemdesc = ws['B3'].v;
        if(cell_itemdesc !== "")
        {
          if(cell_itemdesc.length > 60)
          {
            ws['B3'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
            error_data.push({sheetname:'CO Line', cellid:'B3', error:'Garment Item Description Can not be greater than 8 characters.'});
          }
        }
        else
        {
          ws['B3'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          error_data.push({sheetname:'CO Line', cellid:'B3', error:'Garment Item Description Can not be in blank.'});
        }

        //Check Lead Factory
        var cell_leadfactory = ws['B4'].v;
        if(cell_leadfactory !== "")
        {
          
		  	if(cell_leadfactory.includes("-"))
			{
				const buyercode = cell_leadfactory.split("-");
				if(buyercode[1].length !== 3)
				{
					ws['B4'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:'B4', error:'Lead Factory Code length must be 3 characters.'});
				}
			}
			else
			{
				ws['B4'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:'B4', error:'Can not find Lead Factory Code.'});
			}
          
        }
        else
        {
          ws['B4'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          error_data.push({sheetname:'CO Line', cellid:'B4', error:'Lead Factory Can not be in blank.'});
        }

        //Check Buyer
        var cell_buyer = ws['B5'].v;
        if(cell_buyer !== "")
        {
          
		  	if(cell_buyer.includes("-"))
		  	{ 
				const buyercode = cell_buyer.split("-");
				if(buyercode[1].length > 10)
				{
					ws['B5'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:'B5', error:'Buyer Code allow charactors below 10.'});
				}
			}
			else
			{ 
				ws['B5'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:'B5', error:'Can not find Buyer code.'});
			}
        }
        else
        {
          ws['B5'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          error_data.push({sheetname:'CO Line', cellid:'B5', error:'Buyer Can not be in blank.'});
        }

        //Check Buyer Division
        var cell_buyerdiv = ws['B6'].v;
        if(cell_buyerdiv !== "")
        {
          
		  	if(cell_buyerdiv.includes("-"))
			{
				const buyercode = cell_buyerdiv.split("-");
				if(buyercode[1].length > 3)
				{
					ws['B6'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:'B6', error:'Buyer Division code length must be 3 characters.'});
				}
			}
			else
			{
				ws['B6'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:'B6', error:'Can not Find Buyer Division code'});
			}
          
        }
        else
        {
          ws['B6'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          error_data.push({sheetname:'CO Line', cellid:'B6', error:'Can not Find Buyer Division '});
        }

        //Check Season
        var cell_season = ws['B8'].v;
        if(cell_season !== "")
        {
          
		  	if(cell_season.includes("-"))
			{
				const buyercode = cell_season.split("-");
				if(buyercode[1].length > 7)
				{
					ws['B8'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:'B8', error:'Season code length must be 7 characters.'});
				}
			}
			else
			{
				ws['B8'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:'B8', error:'Can not find Season code.'});
			}
          
        }
        else
        {
          ws['B8'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          error_data.push({sheetname:'CO Line', cellid:'B8', error:'Season Can not be in blank.'});
        }

        //Check Product Group
        var cell_productgroup = ws['B9'].v;
        if(cell_productgroup !== "")
        {
          
		  
		  	if(cell_productgroup.includes("-"))
			{
				const buyercode = cell_productgroup.split("-");
				if(buyercode[1].length > 5)
				{
					ws['B9'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:'B9', error:'Product Group code length must be 5 characters.'});
				}
			}
			else
			{
				ws['B9'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:'B9', error:'Can not find Product Group code'});
			}
          
        }
        else
        {
          ws['B9'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          error_data.push({sheetname:'CO Line', cellid:'B9', error:'Product Group Can not be in blank.'});
        }

        //Check Merchandiser
        var cell_merchant = ws['B10'].v;
        if(cell_merchant !== "")
        {
          
		  	if(cell_merchant.includes("-"))
			{
				const buyercode = cell_merchant.split("-");
				if(buyercode[1].length > 10)
				{
					ws['B10'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:'B10', error:'Merchandiser code length must be 10 characters.'});
				}
			}
			else
			{
				ws['B10'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:'B10', error:'Can not find Merchandiser code.'});
			}
          
        }
        else
        {
          ws['B10'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          error_data.push({sheetname:'CO Line', cellid:'B10', error:'Can not find Merchandiser Can not be in blank.'});
        }

        //Check Planner
        var cell_planner = ws['B11'].v;
        if(cell_planner !== "")
        {
          
		  	if(cell_planner.includes("-"))
			{
				const buyercode = cell_planner.split("-");
				if(buyercode[1].length > 10)
				{
					ws['B11'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:'B11', error:'Planner code length must be 10 characters.'});
				}
			}
			else
			{
				ws['B11'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:'B11', error:'Can not find Planner code.'});
			}
          
        }
        else
        {
          ws['B11'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          error_data.push({sheetname:'CO Line', cellid:'B11', error:'Planner Can not be in blank.'});
        }

        //Check Fabric Composition
        var cell_fabriccomp = ws['B12'].v;
        if(cell_fabriccomp !== "")
        {
          
		  	if(cell_fabriccomp.includes("-"))
			{
				const buyercode = cell_fabriccomp.split("-");
				if(buyercode[1].length > 10)
				{
					ws['B12'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:'B12', error:'Fabric Composition code length must be 10 characters.'});
				}
			}
			else
			{
				ws['B12'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:'B12', error:'Can Not find Fabric Composition code.'});
			}
          
        }
        else
        {
          ws['B12'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          error_data.push({sheetname:'CO Line', cellid:'B12', error:'Fabric Composition Can not be in blank.'});
        }

        //Check Style Categorization
        var cell_stylecat = ws['B13'].v;
        if(cell_stylecat !== "")
        {
          	
		  	if(cell_stylecat.includes("-"))
			{
				const buyercode = cell_stylecat.split("-");
				if(buyercode[1].length !== 1)
				{
					ws['B13'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:'B13', error:'Style Categorization Letter length must be 1 character.'});
				}
				else
				{
					if(buyercode[1].match(/^[A-Z]*$/) === false)
					{
						ws['B13'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'CO Line', cellid:'B13', error:'Style Categorization Letter Need to change as Capital Letter.'});
					}
				}
			}
			else
			{
				ws['B13'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:'B13', error:'Can Not find Style Categorization.'});
			}
          
        }
        else
        {
          ws['B13'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          error_data.push({sheetname:'CO Line', cellid:'B13', error:'Style Categorization Can not be in blank.'});
        }

		//Check Co line validation
		for (let i = 1; i <= selectedStyleData.newLines.length; i++) 
		{
			var val_row_inc = 15 + i;

			//Validate Production Warehouse

			var cell_address_B = 'B'+val_row_inc;
			var cell_ProductionWarehouse = ws[cell_address_B].v; 

			if(cell_ProductionWarehouse === "")
			{
				ws[cell_address_B].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_B, error:'ProductionWarehouse Can not be in blank.'});
			}
			else
			{
				if(cell_ProductionWarehouse.includes("-"))
				{
					const cell_split_ProductionWarehouse = cell_ProductionWarehouse.split("-");

					if(cell_split_ProductionWarehouse[cell_split_ProductionWarehouse.length - 1].length !== 3)
					{
						ws[cell_address_B].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'CO Line', cellid:cell_address_B, error:'ProductionWarehouse Code length must be 3 characters.'});
					}
				}
				else
				{
					ws[cell_address_B].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:cell_address_B, error:'ProductionWarehouse Code cannot identified.'});
				}
			}

			//Validate Destination

			var cell_address_C = 'C'+val_row_inc;
			var cell_Destination = ws[cell_address_C].v; 

			if(cell_Destination === "")
			{
				ws[cell_address_C].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_C, error:'Destination Can not be in blank.'});
			}
			else
			{
				if(cell_Destination.includes("-"))
				{
					const cell_split_Destination = cell_Destination.split("-");

					if(cell_split_Destination[1].length < 5)
					{
						ws[cell_address_C].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'CO Line', cellid:cell_address_C, error:'Destination Code length include minimum 5 characters.'});
					}
				}
				else
				{
					ws[cell_address_C].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:cell_address_C, error:'Destination Code cannot identified.'});
				}
			}

			//Validate Customer Style No

			var cell_address_D = 'D'+val_row_inc;
			var cell_CustomerStyleNo = ws[cell_address_D].v; 

			if(cell_CustomerStyleNo === "")
			{
				ws[cell_address_D].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_D, error:'CustomerStyleNo Can not be in blank.'});
			}
			else
			{
				if(cell_CustomerStyleNo.length > 30)
				{
					ws[cell_address_D].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:cell_address_D, error:'CustomerStyleNo max character length is 30.'});
				}
				else
				{
					if(!cell_CustomerStyleNo.includes("-"))
					{
						ws[cell_address_D].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'CO Line', cellid:cell_address_D, error:'FR Match code can not find in CustomerStyleNo.'});
					}
				}
			}

			//Validate Requested Delivery Date Customer

			var cell_address_E = 'E'+val_row_inc;
			var cell_RequestedDeliveryDateCustomer = ws[cell_address_E].v; 

			if(cell_RequestedDeliveryDateCustomer === "")
			{
				ws[cell_address_E].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_E, error:'RequestedDeliveryDateCustomer Can not be in blank.'});
			}
			
			if(moment(cell_RequestedDeliveryDateCustomer, "DD-MM-YYYY", true).isValid() === false)
			{
				ws[cell_address_E].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_E, error:'RequestedDeliveryDateCustomer Invalid Date.'});
			}

			//Validate Requested Delivery Date Planner 

			var cell_address_F = 'F'+val_row_inc;
			var cell_RequestedDeliveryDatePlanner = ws[cell_address_F].v; 

			if(cell_RequestedDeliveryDatePlanner === "")
			{
				ws[cell_address_F].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_F, error:'RequestedDeliveryDatePlanner Can not be in blank.'});
			}
			
			if(moment(cell_RequestedDeliveryDatePlanner, "DD-MM-YYYY", true).isValid() === false)
			{
				ws[cell_address_F].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_F, error:'RequestedDeliveryDatePlanner Invalid Date.'});
			}

			//Validate FOBDate

			var cell_address_G = 'G'+val_row_inc;
			var cell_FOBDate = ws[cell_address_G].v; 

			if(cell_FOBDate !== "" && moment(cell_FOBDate, "DD-MM-YYYY", true).isValid() === false)
			{
				ws[cell_address_G].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_G, error:'FOBDate Invalid Date.'});
			}

			//Validate NDCDate

			var cell_address_H = 'H'+val_row_inc;
			var cell_NDCDate = ws[cell_address_H].v; 

			if(cell_NDCDate !== "" && moment(cell_NDCDate, "DD-MM-YYYY", true).isValid() === false)
			{
				ws[cell_address_H].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_H, error:'NDCDate Invalid Date.'});
			}

			//Validate PCDDate

			var cell_address_I = 'I'+val_row_inc;
			var cell_PCDDate = ws[cell_address_I].v; 

			if(cell_PCDDate !== "" && moment(cell_PCDDate, "DD-MM-YYYY", true).isValid() === false)
			{
				ws[cell_address_I].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_I, error:'PCDDate Invalid Date.'});
			}

			//Validate Color

			var cell_address_J = 'J'+val_row_inc;
			var cell_Color = ws[cell_address_J].v; 

			if(cell_Color === "")
			{
				ws[cell_address_J].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_J, error:'Color Can not be in blank.'});
			}
			else
			{
				if(cell_Color.length > 60)
				{
					ws[cell_address_J].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:cell_address_J, error:'Color max character length is 60.'});
				}
			}

			//Validate VPONo

			var cell_address_K = 'K'+val_row_inc;
			var cell_VPONo = ws[cell_address_K].v; 

			if(cell_VPONo === "")
			{
				ws[cell_address_K].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_K, error:'VPONo Can not be in blank.'});
			}

			//Validate CPONo

			var cell_address_L = 'L'+val_row_inc;
			var cell_CPONo = ws[cell_address_L].v; 

			if(cell_CPONo === "")
			{
				ws[cell_address_L].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_L, error:'CPONo Can not be in blank.'});
			}

			//Validate DeliveryMethod

			var cell_address_M = 'M'+val_row_inc;
			var cell_DeliveryMethod = ws[cell_address_M].v; 

			if(cell_DeliveryMethod === "")
			{
				ws[cell_address_M].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_M, error:'DeliveryMethod Can not be in blank.'});
			}
			else
			{
				if(cell_DeliveryMethod.includes("-"))
				{
					const cell_split_DeliveryMethod = cell_DeliveryMethod.split("-");

					if(cell_split_DeliveryMethod[1].length !== 3)
					{
						ws[cell_address_M].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'CO Line', cellid:cell_address_M, error:'DeliveryMethod Code length is 3 characters.'});
					}
				}
				else
				{
					ws[cell_address_M].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:cell_address_M, error:'DeliveryMethod Code can not identified.'});
				}
			}

			//Validate SalesPrice

			var cell_address_N = 'N'+val_row_inc;
			var cell_SalesPrice = ws[cell_address_N].v; 

			if(cell_SalesPrice === "")
			{
				ws[cell_address_N].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_N, error:'SalesPrice Can not be in blank.'});
			}
			else
			{
				if(cell_SalesPrice.toString().includes("."))
				{
					//const cell_split_SalesPrice = cell_SalesPrice.toString().split(".");
					
					//if(cell_split_SalesPrice[1].length !== 2)
					//{
						
						//ws[cell_address_N].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						//error_data.push({sheetname:'CO Line', cellid:cell_address_N, error:'SalesPrice need two decimal palces.'});
					//}
				}
			}

			//Validate DeliveryTerm

			var cell_address_O = 'O'+val_row_inc;
			var cell_DeliveryTerm = ws[cell_address_O].v; 

			if(cell_DeliveryTerm === "")
			{
				ws[cell_address_O].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_O, error:'DeliveryTerm Can not be in blank.'});
			}
			else
			{
				if(cell_DeliveryTerm.includes("-"))
				{
					const cell_split_DeliveryTerm = cell_DeliveryTerm.split("-");

					if(cell_split_DeliveryTerm[1].length !== 3)
					{
						ws[cell_address_O].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'CO Line', cellid:cell_address_O, error:'DeliveryTerm Code length is 3 characters.'});
					}
				}
				else
				{
					ws[cell_address_O].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:cell_address_O, error:'DeliveryTerm Code can not identified.'});
				}
			}

			//Validate PackMethod

			var cell_address_P = 'P'+val_row_inc;
			var cell_PackMethod = ws[cell_address_P].v; 

			if(cell_PackMethod === "")
			{
				ws[cell_address_P].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_P, error:'PackMethod Can not be in blank.'});
			}
			else
			{
				if(cell_PackMethod.includes("-"))
				{
					const cell_split_PackMethod = cell_PackMethod.split("-");

					if(cell_split_PackMethod[1].length !== 3)
					{
						ws[cell_address_P].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'CO Line', cellid:cell_address_P, error:'PackMethod Code length is 3 characters.'});
					}
				}
				else
				{
					ws[cell_address_P].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:cell_address_P, error:'PackMethod Code can not identified.'});
				}
			}

			//Validate ZOption

			var cell_address_Q = 'Q'+val_row_inc;
			var cell_ZOption = ws[cell_address_Q].v; 

			if(cell_ZOption === "")
			{
				ws[cell_address_Q].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'CO Line', cellid:cell_address_Q, error:'ZOption Can not be in blank.'});
			}
			else
			{
				if(cell_ZOption.includes("-"))
				{
					const cell_split_ZOption = cell_ZOption.split("-");

					if(cell_split_ZOption[0].length > 15)
					{
						ws[cell_address_Q].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'CO Line', cellid:cell_address_Q, error:'ZOption Description maximum length is 15 characters.'});
					}
				}
				else
				{
					ws[cell_address_Q].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'CO Line', cellid:cell_address_Q, error:'ZOption Code can not identified.'});
				}
			}
 
		}

		XLSX.utils.book_append_sheet(wb, ws, 'CO LINE');// changed StNDdize CO to CO Line 

		for (var i = 0; i < 14; i++) {
			filteredBOM.unshift(['']);
		}

		//BOM sheet
		const ws2 = XLSX.utils.aoa_to_sheet(filteredBOM);

		///Bom Line Validation///
		//Check Co line mandatory fields are blank
		
		for (let i = 16; i <= filteredBOM.length; i++) 
		{
			var val_rowbom_inc = i;

			// Bom Category
			var cell_addressbom_B = 'B'+val_rowbom_inc;
			var cell_BOMCategory = ws2[cell_addressbom_B].v; 

			if(cell_BOMCategory === "")
			{
				ws2[cell_addressbom_B].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_B, error:'BOMCategory can not be blank.'});
			}
			else
			{
				if(cell_BOMCategory.includes("-"))
				{
					const cell_split_BOMCategory = cell_BOMCategory.split("-");

					if(cell_split_BOMCategory[cell_split_BOMCategory.length - 1].length !== 1)
					{
						ws2[cell_addressbom_B].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_B, error:'BOMCategory Code for one digit.'});
					}
				}
				else
				{
					ws2[cell_addressbom_B].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_B, error:'BOMCategory Code can not be identified.'});
				}
			}

			// RMProcurementGroup
			var cell_addressbom_C = 'C'+val_rowbom_inc;
			var cell_RMProcurementGroup = ws2[cell_addressbom_C].v; 

			if(cell_RMProcurementGroup === "")
			{
				ws2[cell_addressbom_C].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_C, error:'RMProcurementGroup can not be blank.'});
			}
			else
			{
				if(cell_RMProcurementGroup.includes("-"))
				{
					const cell_split_RMProcurementGroup = cell_RMProcurementGroup.split("-");

					if(cell_split_RMProcurementGroup[cell_split_RMProcurementGroup.length - 1].length !== 3)
					{
						ws2[cell_addressbom_C].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_C, error:'RMProcurementGroup Code for 3 digits.'});
					}
				}
				else
				{
					ws2[cell_addressbom_C].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_C, error:'RMProcurementGroup Code can not be identified.'});
				}
			}

			// M3Item Code
			var cell_addressbom_D = 'D'+val_rowbom_inc;
			var cell_M3ItemCode = ws2[cell_addressbom_D].v; 

			if(cell_M3ItemCode === "")
			{
				ws2[cell_addressbom_D].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_D, error:'M3Item Code can not be blank.'});
			}
			else
			{
				if(cell_M3ItemCode.length > 12)
				{
					ws2[cell_addressbom_D].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_D, error:'M3Item Code max length 12 digits.'});
				}
			}

			// HierarchyLevel1
			var cell_addressbom_E = 'E'+val_rowbom_inc;
			var cell_HierarchyLevel1 = ws2[cell_addressbom_E].v; 

			if(cell_HierarchyLevel1 === "")
			{
				ws2[cell_addressbom_E].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_E, error:'HierarchyLevel1 can not be blank.'});
			}
			else
			{
				if(!cell_HierarchyLevel1.includes("-"))
				{
					ws2[cell_addressbom_E].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_E, error:'HierarchyLevel1 Code can not be identified.'});
					
				}
			}

			//  HierarchyLevel2
			var cell_addressbom_F = 'F'+val_rowbom_inc;
			var cell_HierarchyLevel2 = ws2[cell_addressbom_F].v; 

			if(cell_HierarchyLevel2 === "")
			{
				ws2[cell_addressbom_F].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_F, error:'HierarchyLevel2 can not be blank.'});
			}
			else
			{
				if(!cell_HierarchyLevel2.includes("-"))
				{
					ws2[cell_addressbom_F].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_F, error:'HierarchyLevel2 Code can not be identified.'});
					
				}
			}

			//  HierarchyLevel3
			var cell_addressbom_G = 'G'+val_rowbom_inc;
			var cell_HierarchyLevel3 = ws2[cell_addressbom_G].v; 

			if(cell_HierarchyLevel3 !== "")
			{
				if(!cell_HierarchyLevel3.includes("-"))
				{
					ws2[cell_addressbom_G].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_G, error:'HierarchyLevel3 Code can not be identified.'});
					
				}
			}

			//  HierarchyLevel4
			var cell_addressbom_H = 'H'+val_rowbom_inc;
			var cell_HierarchyLevel4 = ws2[cell_addressbom_H].v; 

			if(cell_HierarchyLevel4 !== "")
			{
				if(!cell_HierarchyLevel4.includes("-"))
				{
					ws2[cell_addressbom_H].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_H, error:'HierarchyLevel4 Code can not be identified.'});
					
				}
			}

			//  HierarchyLevel5
			var cell_addressbom_I = 'I'+val_rowbom_inc;
			var cell_HierarchyLevel5 = ws2[cell_addressbom_I].v; 

			if(cell_HierarchyLevel5 !== "")
			{
				if(!cell_HierarchyLevel5.includes("-"))
				{
					ws2[cell_addressbom_I].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_I, error:'HierarchyLevel5 Code can not be identified.'});
					
				}
			}

			//  RM Width
			var cell_addressbom_J = 'J'+val_rowbom_inc;
			var cell_RMWidth = ws2[cell_addressbom_J].v; 

			if(cell_RMWidth === "")
			{
				ws2[cell_addressbom_J].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_J, error:'RM Width Code can not be blank.'});
			}

			// SupplierItemNo
			var cell_addressbom_K = 'K'+val_rowbom_inc;
			var cell_SupplierItemNo = ws2[cell_addressbom_K].v; 

			if(cell_SupplierItemNo === "")
			{
				ws2[cell_addressbom_K].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_K, error:'SupplierItemNo can not be blank.'});
			}
			else
			{
				if(cell_SupplierItemNo.length > 30)
				{
					ws2[cell_addressbom_K].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_K, error:'SupplierItemNo max character length is 30.'});
				}
			}


			// Comment
			var cell_addressbom_L = 'L'+val_rowbom_inc;
			var cell_Comment = ws2[cell_addressbom_L].v; 

			if(cell_Comment !== "")
			{
				if(cell_Comment.length !== 3)
				{
					ws2[cell_addressbom_L].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_L, error:'Comment character length is 3.'});
				}
				
			}

			// Item Name
			var cell_addressbom_M = 'M'+val_rowbom_inc;
			var cell_ItemName = ws2[cell_addressbom_M].v; 

			if(cell_ItemName === "")
			{
				ws2[cell_addressbom_M].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_M, error:'ItemName can not be blank.'});
			}
			else
			{
				if(cell_ItemName.length > 30)
				{
					ws2[cell_addressbom_M].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_M, error:'ItemName character max length is 30.'});
				}
			}

			// Item Description
			var cell_addressbom_N = 'N'+val_rowbom_inc;
			var cell_ItemDescription = ws2[cell_addressbom_N].v; 

			if(cell_ItemDescription === "")
			{
				ws2[cell_addressbom_N].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_N, error:'ItemDescription can not be blank.'});
			}
			else
			{
				if(cell_ItemDescription.length > 60)
				{
					ws2[cell_addressbom_N].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_N, error:'ItemDescription character max length is 60.'});
				}
			}

			// Brand Category
			var cell_addressbom_O = 'O'+val_rowbom_inc;
			var cell_BrandCategory = ws2[cell_addressbom_O].v; 

			if(cell_BrandCategory === "")
			{
				ws2[cell_addressbom_O].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_O, error:'BrandCategory can not be blank.'});
			}

			// GMTColor
			var cell_addressbom_P = 'P'+val_rowbom_inc;
			var cell_GMTColor : any = ws2[cell_addressbom_P].v; 

			if(cell_GMTColor === "")
			{
				ws2[cell_addressbom_P].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_P, error:'GMTColor can not be blank.'});
			}
			else
			{
				const colormatch = selectedStyleData.newLines.filter((obj,resq) => { return obj.MASTCOLORDESC === resq; });
				
				if(colormatch.length === 0)
				{
					ws2[cell_addressbom_P].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_P, error:'GMTColor Not in CO Lines.'});
				}

				if(!cell_GMTColor.includes("-"))
				{
					ws2[cell_addressbom_P].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_P, error:'GMTColor Code can not be identified.'});
					
				}
			}

			// GMTZOption
			var cell_addressbom_Q = 'Q'+val_rowbom_inc;
			var cell_GMTZOption = ws2[cell_addressbom_Q].v; 

			if(cell_GMTZOption === "")
			{
				ws2[cell_addressbom_Q].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_Q, error:'GMTZOption can not be blank.'});
			}
			else
			{
				if(!cell_GMTZOption.includes("-"))
				{
					ws2[cell_addressbom_Q].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_Q, error:'GMTZOption Code can not be identified.'});
					
				}
			}

			// GMTSize
			var cell_addressbom_R = 'R'+val_rowbom_inc;
			var cell_GMTSize = ws2[cell_addressbom_R].v; 

			if(cell_GMTSize === "")
			{
				ws2[cell_addressbom_R].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_R, error:'GMTSize can not be blank.'});
			}
			else
			{
				if(!cell_GMTSize.includes("-"))
				{
					ws2[cell_addressbom_R].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_R, error:'GMTSize Code can not be identified.'});
					
				}
			}

			// RMZOption
			var cell_addressbom_S = 'S'+val_rowbom_inc;
			var cell_RMZOption = ws2[cell_addressbom_S].v; 

			if(cell_RMZOption !== "")
			{
				if(!cell_RMZOption.includes("-"))
				{
					ws2[cell_addressbom_S].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_S, error:'RMZOption Code can not be identified.'});
					
				}
			}

			// RMColor
			var cell_addressbom_T = 'T'+val_rowbom_inc;
			var cell_RMColor = ws2[cell_addressbom_T].v; 

			if(cell_RMColor !== "")
			{
				if(!cell_RMColor.includes("-"))
				{
					ws2[cell_addressbom_T].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_T, error:'RMColor Code can not be identified.'});
					
				}
			}

			// YY
			var cell_addressbom_V = 'V'+val_rowbom_inc;
			var cell_YY = ws2[cell_addressbom_V].v; 

			if(cell_YY === "")
			{
				ws2[cell_addressbom_V].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_V, error:'YY can not be blank.'});
			}
			else if(cell_YY !== 0 || cell_YY !== "0")
			{
				
				if(JSON.stringify(cell_YY).includes("."))
				{
					const cell_split_YY = JSON.stringify(cell_YY).split(".");

					if(cell_split_YY[cell_split_YY.length - 1].length > 6)
					{
						ws2[cell_addressbom_V].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_V, error:'YY allow only 6 decimal places.'});
					}
				}
			}

			// Wastage
			var cell_addressbom_W = 'W'+val_rowbom_inc;
			var cell_Wastage = ws2[cell_addressbom_W].v; 

			if(cell_Wastage === "")
			{
				ws2[cell_addressbom_W].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_W, error:'Wastage can not be blank.'});
			}
			else if(cell_YY !== 0 || cell_YY !== "0")
			{
				if(JSON.stringify(cell_Wastage).includes("."))
				{
					const cell_split_Wastage = JSON.stringify(cell_Wastage).split(".");

					if(cell_split_Wastage[cell_split_Wastage.length - 1].length !== 2)
					{
						ws2[cell_addressbom_W].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_W, error:'Wastage allow only 2 decimal places.'});
					}
				}
			}

			// SupplierNominationStatus
			var cell_addressbom_X = 'X'+val_rowbom_inc;
			var cell_SupplierNominationStatus = ws2[cell_addressbom_X].v; 

			if(cell_SupplierNominationStatus === "")
			{
				ws2[cell_addressbom_X].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_X, error:'SupplierNominationStatus can not be blank.'});
			}

			// SKUUOM
			var cell_addressbom_Y = 'Y'+val_rowbom_inc;
			var cell_SKUUOM = ws2[cell_addressbom_Y].v; 

			if(cell_SKUUOM === "")
			{
				ws2[cell_addressbom_Y].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_Y, error:'SKUUOM can not be blank.'});
			}
			else
			{
				if(!cell_SKUUOM.includes("-"))
				{
					ws2[cell_addressbom_Y].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_Y, error:'SKUUOM Code cannot be identified'});
				}
			}

			// PurchaseUOM
			var cell_addressbom_Z = 'Z'+val_rowbom_inc;
			var cell_PurchaseUOM = ws2[cell_addressbom_Z].v; 

			if(cell_PurchaseUOM === "")
			{
				ws2[cell_addressbom_Z].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_Z, error:'PurchaseUOM can not be blank.'});
			}
			else
			{
				if(!cell_SKUUOM.includes("-"))
				{
					ws2[cell_addressbom_Z].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_Z, error:'PurchaseUOM Code cannot be identified'});
				}
			}

			// PurchasePrice
			var cell_addressbom_AB = "AB"+val_rowbom_inc;
			var cell_PurchasePrice = ws2[cell_addressbom_AB].v; 

			if(cell_PurchasePrice === "")
			{
				ws2[cell_addressbom_AB].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_AB, error:'PurchasePrice can not be blank.'});
			}
			else
			{
				if(JSON.stringify(cell_PurchasePrice).includes("."))
				{
					const cell_split_PurchasePrice = JSON.stringify(cell_PurchasePrice).split(".");

					if(cell_split_PurchasePrice[cell_split_PurchasePrice.length - 1].length > 4)
					{
						ws2[cell_addressbom_AB].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
						error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_AB, error:'PurchasePrice allow only 4 decimal places.'});
					}
				}
			}

			// SupplierTolarance
			var cell_addressbom_AH = "AH"+val_rowbom_inc;
			var cell_SupplierTolarance = ws2[cell_addressbom_AH].v; 

			if(cell_SupplierTolarance === "")
			{
				ws2[cell_addressbom_AH].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_AH, error:'SupplierTolarance can not be blank.'});
			}

			// Supplier
			var cell_addressbom_AI = "AI"+val_rowbom_inc;
			var cell_Supplier = ws2[cell_addressbom_AI].v; 

			if(cell_Supplier === "")
			{
				ws2[cell_addressbom_AI].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_AI, error:'Supplier can not be blank.'});
			}
			else
			{
				if(!cell_Supplier.includes("-"))
				{
					ws2[cell_addressbom_AI].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_AI, error:'Supplier Code cannot be identified'});
				}
			}

			// ManLeadTime
			var cell_addressbom_AJ = "AJ"+val_rowbom_inc;
			var cell_ManLeadTime = ws2[cell_addressbom_AJ].v; 

			if(cell_ManLeadTime === "")
			{
				ws2[cell_addressbom_AJ].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_AJ, error:'ManLeadTime can not be blank.'});
			}

			// ModeOfShipment
			var cell_addressbom_Ak = "AK"+val_rowbom_inc;
			if(ws2[cell_addressbom_Ak] !== undefined)
			{
				
				var cell_ModeOfShipment = ws2[cell_addressbom_Ak].v;

				if(cell_ModeOfShipment === "")
				{
					ws2[cell_addressbom_Ak].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_Ak, error:'ModeOfShipment can not be blank.'});
				}
			}
			else
			{
				ws2[cell_addressbom_Ak] = { t: 'stub', v: '' };
				ws2[cell_addressbom_Ak].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_Ak, error:'ModeOfShipment can not be blank.'});
			}
			

			// RMDeliveryTerm
			var cell_addressbom_AL = "AL"+val_rowbom_inc;
			var cell_RMDeliveryTerm = ws2[cell_addressbom_AL].v; 

			if(cell_RMDeliveryTerm === "")
			{
				ws2[cell_addressbom_AL].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_AL, error:'RMDeliveryTerm can not be blank.'});
			}
			else
			{
				if(!cell_RMDeliveryTerm.includes("-"))
				{
					ws2[cell_addressbom_AL].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_AL, error:'RMDeliveryTerm Code cannot be identified'});
				}
			}
 
			// SourcingMerchant
			var cell_addressbom_AM = "AM"+val_rowbom_inc;
			var cell_SourcingMerchant = ws2[cell_addressbom_AM].v; 

			if(cell_SourcingMerchant === "")
			{
				ws2[cell_addressbom_AM].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
				error_data.push({sheetname:'BOM Line', cellid:cell_addressbom_AM, error:'SourcingMerchant can not be blank.'});
			}
 
		}


		XLSX.utils.book_append_sheet(wb, ws2, 'BOM LINE');// changed StNDdize BOM to BOM LINE 

		//Ops Track sheet
		const ws3 = XLSX.utils.aoa_to_sheet(opsToTrackData);
		XLSX.utils.book_append_sheet(wb, ws3, 'Operations Track');// changed StNDdize Operations Track to Operations Track 
		OpsTrackSheetFormat(ws3, opsToTrackData);

		XLSX.writeFile(wb, 'VS Modern Input Sheet.xlsx'); //PINk to VS Sleep

		setERRORLIST(error_data);

		selectedStyleData.newLines = upOLRDATASET.newLines;
	};

	const onErrorListDownload = async () =>
	{
		var data_sheet = JSON.stringify(ERRORLIST);
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(JSON.parse(data_sheet));
		XLSX.utils.book_append_sheet(wb, ws, 'ERROR LIST');
		XLSX.writeFile(wb, 'Inputsheet_Validation_Error_List.xlsx');
	};

	//On Thread sheet upload
	const onThreadFileSelect = async (e) => {
		setThreadStatus(false);
		const files = e.target.files;
		// setdownloadBtnStatus(false);
		setthreadFileName(files[0].name);

		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = async (ee: any) => {
			const bstr = ee.target.result;
			const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
			const dataSheet = wb.Sheets['Sheet1'];
			if (!dataSheet || dataSheet == undefined) {
				alert('Sheet1 Not Found');
				setThreadStatus(null);
				return;
			}
			const dataSheetData = XLSX.utils.sheet_to_json(dataSheet, {
				header: 1,
				blankrows: false,
				defval: '',
			});

			//Get thread sheet lines where styleNo (threadsheet) matches to Generic # (OLR)
			const threadSummaryData = getThreadLines(
				dataSheetData,
				pinkInputSheetContext.style
			);

			//Alert if no matching thread lines with the Generic No
			if (threadSummaryData.length < 1) {
				alert(
					`Genrice No. ${pinkInputSheetContext.genericNo}, not found in Thread Summary Sheet.`
				);
				setThreadStatus(null);
				// setdownloadBtnStatus(true);
				return;
			}

			//Get all lines from the Thread Master
			const response = await getRmColorThread(true);
			if (response.status != 200 && response.status != 201) {
				setThreadStatus(null);
				const error = await response.json();
				console.log(error.message);
			} else {
				//Get Thread lines for the BOM
				const threadSheetDataAsArr = await getBOMThreadLinesLogo(
					response,
					threadSummaryData,
					pinkInputSheetContext.colorData
				);
				setThreadData(threadSheetDataAsArr);
			}
			//setdownloadBtnStatus(true);
			setThreadStatus(true);
		};
		if (rABS) reader.readAsBinaryString(files[0]);
		else reader.readAsArrayBuffer(files[0]);
	};

	return (
		<React.Fragment>
			<Grid container direction='row' justify='space-evenly'>
			<Grid item xs={2} md={2} style={{ paddingLeft: '0.2rem', paddingTop: '0.2rem' }}>
					<DropDownComponent
						selectedField={selectedSizetemp}
						data={[
							{ id: 'NORMAL', name: 'NORMAL' },
							{ id: 'REG', name: 'REG' },
							{ id: 'LONG', name: 'LONG' },
							{ id: 'SHORT', name: 'SHORT' },
							{ id: 'DUAL', name: 'DUAL' },
						]}
						onSelectChange={changeSizetemp}
						fieldName='Size Template'
						size={"small"}
					/>
				</Grid>
				<Grid item xs={2} md={2} style={{ paddingLeft: '0.2rem', paddingTop: '0.2rem' }}>
				<label
						className='form-control'
						style={{
							width: '100%',
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
							fontSize: "13px",
						}}
					>
						{filename}
						<input
							type='file'
							style={{ display: 'none' }}
							name={filename}
							accept={SheetJSFT}
							onChange={onFileSelect}
						/>
					</label>
				</Grid>
				<Grid item xs={4} md={2} hidden={true} style={{ paddingLeft: '0.2rem', paddingTop: '0.2rem' }}>
					<Grid container direction='row'>
						<label
							className='form-control'
							style={{
								width: '20vw',
								textOverflow: 'ellipsis',
								overflow: 'hidden',
								whiteSpace: 'nowrap',
							}}
						>
							{threadFileName}
							<input
								type='file'
								style={{ display: 'none' }}
								name={threadFileName}
								accept={SheetJSFT}
								onChange={onThreadFileSelect}
							/>
						</label>
						{threadStatus === false ? (
							<CircularProgress
								size='1rem'
								color='inherit'
								style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}
							/>
						) : threadStatus === true ? (
							<CheckCircleOutlineIcon />
						) : (
							''
						)}
					</Grid>
				</Grid>

				<Grid item xs={2} style={{ paddingLeft: '0.2rem', paddingTop: '0.2rem' }}>
					<input type="number" value={orderPrecentage} onChange={(event:any) => setorderPrecentage(event.target.value.toString().trim()) } placeholder='Qty Ratio' className='form-control' style={{ fontSize: "13px", }}/>
				</Grid>
				
				<Grid item xs={3} style={{ paddingLeft: '0.2rem', paddingTop: '0.2rem' }}>
					<Button
						variant='contained'
						color='secondary'
						onClick={onInputSheetDownload}
					>
						Download Input Sheet
					</Button>
				</Grid>
				<Grid item xs={3} style={{ paddingLeft: '0.2rem', paddingTop: '0.2rem' }}>
					<Button
						size={"medium"}
						variant='contained'
						color='primary'
						onClick={onErrorListDownload}
					>
						Validation Errors
					</Button>
				</Grid>
			</Grid>

			{/* {isFileUploaded?  */}
			<div style={{ marginTop: '2vw' }} className='container'>
				<div className='row'>
					<div className='col-sm-8'>
						<Grid
							container
							style={{
								border: '0.4px solid #C0C0C0	',
								padding: '0.3vw',
								borderRadius: '5px',
							}}
							spacing={2}
						>
							<Grid hidden item xs={4}>
								<DropDownComponent
									selectedField={selectedMerchandiser}
									data={merchandisers}
									onSelectChange={changeMerchandiser}
									fieldName='Merchandisers'
								/>
							</Grid>
							<Grid hidden item xs={4}>
								<DropDownComponent
									selectedField={selectedPlanner}
									data={planners}
									onSelectChange={changePlanner}
									fieldName='Planners'
								/>
							</Grid>
							<Grid hidden item xs={4}>
								<DropDownComponent
									selectedField={selectedLeadFactories}
									data={leadFactories}
									onSelectChange={changeLeadfactory}
									fieldName='Lead Factories'
								/>
							</Grid>
							<Grid hidden item xs={4}>
								<DropDownComponent
									selectedField={selectedGarmentCompositions}
									data={garmentCompositions}
									onSelectChange={changeGarmentCom}
									fieldName='Garment Compositions'
								/>
							</Grid>
							<Grid item xs={4}>
								<DropDownComponent
									selectedField={selectedBuyerDivisions}
									data={buyerDivisions}
									onSelectChange={changeBuyerDivision}
									fieldName='Buyer Division'
								/>
							</Grid>
							<Grid item xs={2}>
								<DropDownComponent
									selectedField={selectedSeasonCode}
									data={seasonalCodes}
									onSelectChange={changeSeasonalCode}
									fieldName='Seasonal Code'
								/>
							</Grid>
							<Grid item xs={2}>
								<DropDownComponent
									selectedField={selectedYearCode}
									data={yearCodes}
									onSelectChange={changeYearCode}
									fieldName='Year'
								/>
							</Grid>
							<Grid hidden item xs={2}>
								<DropDownComponent
									selectedField={selectedInseam}
									data={inseams}
									onSelectChange={changeInseam}
									fieldName='Inseam'
								/>
							</Grid>
							<Grid item xs={3}>
								<DropDownComponent
									selectedField={selectedPackingType}
									data={packingTypes}
									onSelectChange={changePackingType}
									fieldName='Packing Type'
								/>
							</Grid>
							<Grid hidden item xs={6}>
								<DropDownComponent
									selectedField={selectedM3BuyerDivision}
									data={m3buyerDivisions}
									onSelectChange={changeM3BuyerDivision}
									fieldName='M3 Buyer Division'
								/>
							</Grid>
						</Grid>
					</div>
					<div className='col-sm-3'>
						<Grid
							container
							style={{
								border: '0.4px solid #C0C0C0	',
								padding: '0.3vw',
								borderRadius: '5px',
							}}
							spacing={2}
						>
							<Grid item xs={12}>
								<DropDownComponent
									fieldName='Warehouse'
									data={warehouses}
									onSelectChange={onWareHouseChange}
									selectedField={selectedWareHouse}
								/>
							</Grid>
							<Grid item xs={12}>
								<input
									style={{ height: '2.5vw' }}
									name='date'
									type='date'
									value={requestDelDate}
									onChange={(e) => {
										const { value } = e.target;
										setrequestDelDate(value);
									}}
									className='form-control'
								/>
							</Grid>
						</Grid>
					</div>
				</div>
			</div>

			<div style={{ marginTop: '2vw', marginRight: 10 }}>
				<table className='table table-bordered table-sm' style={{fontSize:"12px"}}>
					<thead>
						<tr>
							<th scope='col'>Color Code</th>
							<th scope='col'>Pack Method</th>
							<th scope='col'>Change</th>
							<th scope='col'>
								Delivery Date{' '}
								<AddCircleIcon
									onClick={() => onAddDelDateClicked()}
									color='secondary'
								/>
							</th>
							<th scope='col'>
								Warehouse{' '}
								<AddCircleIcon
									onClick={() => onAddWarehouseClicked()}
									color='secondary'
								/>
							</th>
							<th scope='col'>Destination</th>
							<th scope='col'>VPO No</th>
							<th scope='col'>Ship Mode</th>
						</tr>
					</thead>
					<tbody>
						{selectedStyleData.newLines.map(
							(
								{
									MASTCOLORCODE,
									wareHouse,
									destination,
									VPONO,
									packMethod,
									requestDelDate,
									masterColorKey,
									Qty,
									SHIPMODE,
								},
								index
							) => (
								<tr key={index} style={{ paddingTop: '0vw' }}>
									<td style={{ paddingRight: '0vw' }}>{MASTCOLORCODE}</td>
									<td>{packMethod} </td>
									<td align='center'>
										<AddCircleIcon
											color='secondary'
											onClick={() => onStyleLineChangeClick(masterColorKey)}
										/>
									</td>
									<td> {requestDelDate}</td>
									<td>{wareHouse} </td>
									<td>{destination} </td>
									<td>{VPONO} </td>
									<td> {SHIPMODE}</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
			<Modal
				open={openPackingModal}
				onClose={handleClose}
				style={{
					height: '70vh',
					width: '40vw',
					margin: 'auto',
				}}
				BackdropComponent={Backdrop}
			>
			<>
			<div style={{backgroundColor:'#fff',width:'500px',paddingTop:'10px',paddingBottom:'10px',paddingLeft:'10px',paddingRight:'10px'}} >
				<p>Change Pack Method and Warehouse</p>
				<hr/>

				<DropDownComponent 
				fieldName='Warehouse' 
				data={vsInputSheetContext.warehouses}
				onSelectChange={onWareHouseChangeForLine}
				selectedField={selectedWareHouseForLine} />

				<br/>

				<Button
					variant='contained'
					color='secondary'
					onClick={onUpdatewarehouse}
				>
					Update Warehouse
				</Button>

				<br/>
				<br/>

				<DropDownComponent 
				fieldName='pack method' 
				data={[{id:'SIN-Single pc packing',name:'SIN-Single pc packing'},{id:'30P-30 pcs per 1 poly bag',name:'30P-30 pcs per 1 poly bag'}]}
				onSelectChange={onPackMethodChangeForLine}
				selectedField={selectedPackMethodForLine}
				/>

				<br/>

				<Button
					variant='contained'
					color='secondary'
					onClick={onUpdatePackMethod}
					
				>
					Update Pack Method
				</Button>

			</div>
			</>
			</Modal>
		</React.Fragment>
	);
};

export default Step2Component;
