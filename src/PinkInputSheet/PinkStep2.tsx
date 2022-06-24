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

const Step2Component = () => {
	
	const [merchandisers, setMerchandisers] = useState([]);
	const [planners, setplanners] = useState([]);
	const [buyerDivisions, setbuyerDivisions] = useState([]);
	const [leadFactories, setleadFactories] = useState([]);
	const [garmentCompositions, setgarmentCompositions] = useState([]);
	const [warehouses, setwarehouses] = useState([]);
	const [m3buyerDivisions, setm3buyerDivisions] = useState([]);

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
	const [selectedInseam, setselectedInseam] = useState('');
	const [selectedPackingType, setSelectedPackingType] = useState('');
	const [selectedM3BuyerDivision, setselectedM3BuyerDivision] = useState<any>('');
	const [threadStatus, setThreadStatus] = useState<boolean | null>(null);
	const [threadFileName, setthreadFileName] = useState<any>('Upload Thread YY');
	const [threadData, setThreadData] = useState<any>([]);
	const [openPackingModal, setOpenPackingModal] = useState<boolean>(false);
	const COColors: any[] = [];

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
				.map(
					(l) =>
						l[ecvisionHeaderNames.MASTCOLORCODE] + l[ecvisionHeaderNames.VPONO] + l[ecvisionHeaderNames.SHIPDATE].getTime()
				);
			const uniquemasterColorKeys = [...new Set([...masterColorKeys])];

			uniquemasterColorKeys.forEach((code) => {
				const selectedColorLines = selectedStylesData.lines.filter(
					(l) =>
						l[ecvisionHeaderNames.MASTCOLORCODE] + l[ecvisionHeaderNames.VPONO] + l[ecvisionHeaderNames.SHIPDATE].getTime() ==
						code
				);


				let tempXXS, tempXS, tempS, tempM, tempL, tempXL, tempXXL, tempXS_S, tempM_L, tempXL_XXL, tempXS_XXL_S, tempXS_XXL_R, tempXS_XXL_L, tempOS;
				selectedColorLines.forEach((l) => {
					const tempSize = l[ecvisionHeaderNames.MASTSIZEDESC]
						.toUpperCase()
						.trim();
					if (tempSize.includes('XXS')) {
						tempXXS = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('XS')) {
						tempXS = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('S')) {
						tempS = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('M')) {
						tempM = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('L')) {
						tempL = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('XL')) {
						tempXL = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('XXL')) {
						tempXXL = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('XS/S')) {
						tempXS_S = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('M/L')) {
						tempM_L = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('XL/XXL')) {
						tempXL_XXL = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('XS-XXL.S')) {
						tempXS_XXL_S = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('XS-XXL.R')) {
						tempXS_XXL_R = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('XS-XXL.L')) {
						tempXS_XXL_L = l[ecvisionHeaderNames.ORDERQTY];
					} else if (tempSize.includes('OS')) {
						tempOS = l[ecvisionHeaderNames.ORDERQTY];
					}
				});

				const SETSIZE_XXS = tempXXS > 0 ? tempXXS : 0;
				const SETSIZE_XS = tempXS > 0 ? tempXS : 0;
				const SETSIZE_S = tempS > 0 ? tempS : 0;
				const SETSIZE_M = tempM > 0 ? tempM : 0;
				const SETSIZE_L = tempL > 0 ? tempL : 0;
				const SETSIZE_XL = tempXL > 0 ? tempXL : 0;
				const SETSIZE_XXL = tempXXL > 0 ? tempXXL : 0;
				const SETSIZE_XS_S = tempXS_S > 0 ? tempXS_S : 0;
				const SETSIZE_M_L = tempM_L > 0 ? tempM_L : 0;
				const SETSIZE_XL_XXL = tempXL_XXL > 0 ? tempXL_XXL : 0;
				const SETSIZE_XS_XXL_S = tempXS_XXL_S > 0 ? tempXS_XXL_S : 0;
				const SETSIZE_XS_XXL_R = tempXS_XXL_R > 0 ? tempXS_XXL_R : 0;
				const SETSIZE_XS_XXL_L = tempXS_XXL_L > 0 ? tempXS_XXL_L : 0;
				const SETSIZE_OS = tempOS > 0 ? tempOS : 0;

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
					SETSIZE_S,
					SETSIZE_M,
					SETSIZE_L,
					SETSIZE_XL,
					SETSIZE_XXL,
					SETSIZE_XS_S,
					SETSIZE_M_L,
					SETSIZE_XL_XXL,
					SETSIZE_XS_XXL_S,
					SETSIZE_XS_XXL_R,
					SETSIZE_XS_XXL_L,
					SETSIZE_OS,
					TOTALQTY: parseInt(SETSIZE_XXS) + parseInt(SETSIZE_XS) + parseInt(SETSIZE_S) + 
					parseInt(SETSIZE_M) + parseInt(SETSIZE_L) + parseInt(SETSIZE_XL) + parseInt(SETSIZE_XXL) + parseInt(SETSIZE_XS_S) + 
					parseInt(SETSIZE_M_L) + parseInt(SETSIZE_XL_XXL) + parseInt(SETSIZE_XS_XXL_S) + parseInt(SETSIZE_XS_XXL_R) + parseInt(SETSIZE_XS_XXL_L) + parseInt(SETSIZE_XS_XXL_L) + parseInt(SETSIZE_OS),
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
				line.destination = line[ecvisionHeaderNames.SHIPTONAME]
					.toLowerCase()
					.includes(ecvisionHeaderNames.DC2)
					? ecvisionHeaderNames.USA03
					: line[ecvisionHeaderNames.SHIPTONAME]
					.toLowerCase()
					.includes(ecvisionHeaderNames.DC4)
					? ecvisionHeaderNames.USA03
					: line[ecvisionHeaderNames.SHIPTONAME]
					.toLowerCase()
					.includes(ecvisionHeaderNames.DC5)
					? ecvisionHeaderNames.USA03
					: line[ecvisionHeaderNames.SHIPTONAME]
					.toLowerCase()
					.includes(ecvisionHeaderNames.DC6)
					? ecvisionHeaderNames.USA03
					: line[ecvisionHeaderNames.SHIPTONAME]
					.toLowerCase()
					.includes(ecvisionHeaderNames.Creative)
					? ecvisionHeaderNames.USA03
					: line[ecvisionHeaderNames.SHIPTONAME]
					.toLowerCase()
					.includes(ecvisionHeaderNames.GLP)
					? ecvisionHeaderNames.CHN01
					: line[ecvisionHeaderNames.SHIPTONAME]
						.toLowerCase()
						.includes(ecvisionHeaderNames.Next)
						? ecvisionHeaderNames.GBR01
						: '';
						
				line.packMethod = line[ecvisionHeaderNames.SHIPTONAME]
					.toLowerCase()
					.includes(ecvisionHeaderNames.DC5)
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

		newStyleno += selectedInseam;

		if(selectedInseam.length > 0)
		{
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
		
		const selectedInseamName: string = inseams.find(i => i.id === selectedInseam)?.name ?? '';

		selectedStyleData.newLines = selectedStyleData.newLines.filter(i => i.DIVISIONCODE === selectedBuyerDivisionName && i.MASTSIZEDESC.includes(selectedInseamName));

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
				line["SETSIZE_S"],
				line["SETSIZE_M"],
				line["SETSIZE_L"],
				line["SETSIZE_XL"],
				line["SETSIZE_XXL"],
				line["SETSIZE_XS_S"],
				line["SETSIZE_M_L"],
				line["SETSIZE_XL_XXL"],
				line["SETSIZE_XS_XXL_S"],
				line["SETSIZE_XS_XXL_R"],
				line["SETSIZE_XS_XXL_L"],
				line["SETSIZE_OS"],
				''//CO
			];
			template.push(rowToAdd);
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

		const xxsIndex = template[14].findIndex(i => i === 'XXS');
		if (xxsIndex > -1) template[14][xxsIndex] = 'XXS' + getinseamwithsize(selectedInseam);

		const xsIndex = template[14].findIndex(i => i === 'XS');
		if (xsIndex > -1) template[14][xsIndex] = 'XS' + getinseamwithsize(selectedInseam);

		const sIndex = template[14].findIndex(i => i === 'S');
		if (sIndex > -1) template[14][sIndex] = 'S' + getinseamwithsize(selectedInseam);

		const mIndex = template[14].findIndex(i => i === 'M');
		if (mIndex > -1) template[14][mIndex] = 'M' + getinseamwithsize(selectedInseam);

		const lIndex = template[14].findIndex(i => i === 'L');
		if (lIndex > -1) template[14][lIndex] = 'L' + getinseamwithsize(selectedInseam);

		const xlIndex = template[14].findIndex(i => i === 'XL');
		if (xlIndex > -1) template[14][xlIndex] = 'XL' + getinseamwithsize(selectedInseam);

		const xxlIndex = template[14].findIndex(i => i === 'XXL');
		if (xxlIndex > -1) template[14][xxlIndex] = 'XXL' + getinseamwithsize(selectedInseam);

		const xs_s_Index = template[14].findIndex(i => i === 'XS/S');
		if (xs_s_Index > -1) template[14][xs_s_Index] = 'XS/S' + getinseamwithsize(selectedInseam);

		const m_l_Index = template[14].findIndex(i => i === 'M/L');
		if (m_l_Index > -1) template[14][m_l_Index] = 'M/L' + getinseamwithsize(selectedInseam);

		const xl_xxl_Index = template[14].findIndex(i => i === 'XL/XXL');
		if (xl_xxl_Index > -1) template[14][xl_xxl_Index] = 'XL/XXL' + getinseamwithsize(selectedInseam);

		const xs_xxl_s_Index = template[14].findIndex(i => i === 'XS-XXL.S');
		if (xs_xxl_s_Index > -1) template[14][xs_xxl_s_Index] = 'XS-XXL.S' + getinseamwithsize(selectedInseam);

		const xs_xxl_r_Index = template[14].findIndex(i => i === 'XS-XXL.R');
		if (xs_xxl_r_Index > -1) template[14][xs_xxl_r_Index] = 'XS-XXL.R' + getinseamwithsize(selectedInseam);

		const xs_xxl_l_Index = template[14].findIndex(i => i === 'XS-XXL.L');
		if (xs_xxl_l_Index > -1) template[14][xs_xxl_l_Index] = 'XS-XXL.L' + getinseamwithsize(selectedInseam);

		const os_Index = template[14].findIndex(i => i === 'OS');
		if (os_Index > -1) template[14][os_Index] = 'OS' + getinseamwithsize(selectedInseam);

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
            //error_data.push({sheetname:sheetone_name, cellid:'B1', error:'Style No Length not equal to 8 characters.'});
          }
        }
        else
        {
          ws['B1'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          //error_data.push({sheetname:sheetone_name, cellid:'B1', error:'Style No Can not be in blank.'});
        }

        //Check Version ID
        var cell_versionid = ws['B2'].v;
        if(RegExp('^[0-9]*$').test(cell_versionid) === false)
        {
          ws['B2'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          //error_data.push({sheetname:sheetone_name, cellid:'B2', error:'Only Numeric Version ID is allowed.'});
        }

        //Check Garment Item Desc
        var cell_itemdesc = ws['B3'].v;
        if(cell_itemdesc !== "")
        {
          if(cell_itemdesc.length > 60)
          {
            ws['B3'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
            //error_data.push({sheetname:sheetone_name, cellid:'B3', error:'Garment Item Description Can not be greater than 8 characters.'});
          }
        }
        else
        {
          ws['B3'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          //error_data.push({sheetname:sheetone_name, cellid:'B3', error:'Garment Item Description Can not be in blank.'});
        }

        //Check Lead Factory
        var cell_leadfactory = ws['B4'].v;
        if(cell_leadfactory !== "")
        {
          const buyercode = cell_leadfactory.split("-");
		  	if(buyercode.includes("-"))
			{
				if(buyercode[1].length !== 3)
				{
					ws['B4'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					//error_data.push({sheetname:sheetone_name, cellid:'B4', error:'Lead Factory Code length must be 3 characters.'});
				}
			}
			else
			{
				ws['B4'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
			}
          
        }
        else
        {
          ws['B4'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          //error_data.push({sheetname:sheetone_name, cellid:'B4', error:'Lead Factory Can not be in blank.'});
        }

        //Check Buyer
        var cell_buyer = ws['B5'].v;
        if(cell_buyer !== "")
        {
          const buyercode = cell_buyer.split("-");
		  	if(buyercode.includes("-"))
		  	{
				if(buyercode[1].length !== 10)
				{
					ws['B5'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					//error_data.push({sheetname:sheetone_name, cellid:'B5', error:'Buyer code length must be 8 characters.'});
				}
			}
			else
			{
				ws['B5'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
			}
        }
        else
        {
          ws['B5'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          //error_data.push({sheetname:sheetone_name, cellid:'B5', error:'Buyer Can not be in blank.'});
        }

        //Check Buyer Division
        var cell_buyerdiv = ws['B6'].v;
        if(cell_buyerdiv !== "")
        {
          const buyercode = cell_buyerdiv.split("-");
		  	if(buyercode.includes("-"))
			{
				if(buyercode[1].length > 3)
				{
					ws['B6'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					//error_data.push({sheetname:sheetone_name, cellid:'B6', error:'Buyer Division code length must be 3 characters.'});
				}
			}
			else
			{
				ws['B6'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
			}
          
        }
        else
        {
          ws['B6'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          //error_data.push({sheetname:sheetone_name, cellid:'B6', error:'Buyer Division Can not be in blank.'});
        }

        //Check Season
        var cell_season = ws['B8'].v;
        if(cell_season !== "")
        {
          const buyercode = cell_season.split("-");
		  	if(buyercode.includes("-"))
			{
				if(buyercode[1].length > 7)
				{
					ws['B8'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					//error_data.push({sheetname:sheetone_name, cellid:'B8', error:'Season code length must be 7 characters.'});
				}
			}
			else
			{
				ws['B8'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
			}
          
        }
        else
        {
          ws['B8'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          //error_data.push({sheetname:sheetone_name, cellid:'B8', error:'Season Can not be in blank.'});
        }

        //Check Product Group
        var cell_productgroup = ws['B9'].v;
        if(cell_productgroup !== "")
        {
          const buyercode = cell_productgroup.split("-");
		  
		  	if(buyercode.includes("-"))
			{
				if(buyercode[1].length > 5)
				{
					ws['B9'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					//error_data.push({sheetname:sheetone_name, cellid:'B9', error:'Product Group code length must be 5 characters.'});
				}
			}
			else
			{
				ws['B9'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
			}
          
        }
        else
        {
          ws['B9'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          //error_data.push({sheetname:sheetone_name, cellid:'B9', error:'Product Group Can not be in blank.'});
        }

        //Check Merchandiser
        var cell_merchant = ws['B10'].v;
        if(cell_merchant !== "")
        {
          const buyercode = cell_merchant.split("-");
		  	if(buyercode.includes("-"))
			{
				if(buyercode[1].length > 10)
				{
					ws['B10'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					//error_data.push({sheetname:sheetone_name, cellid:'B10', error:'Merchandiser code length must be 10 characters.'});
				}
			}
			else
			{
				ws['B10'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
			}
          
        }
        else
        {
          ws['B10'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          //error_data.push({sheetname:sheetone_name, cellid:'B10', error:'Merchandiser Can not be in blank.'});
        }

        //Check Planner
        var cell_planner = ws['B11'].v;
        if(cell_planner !== "")
        {
          const buyercode = cell_planner.split("-");
		  	if(buyercode.includes("-"))
			{
				if(buyercode[1].length > 10)
				{
					ws['B11'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					//error_data.push({sheetname:sheetone_name, cellid:'B11', error:'Planner code length must be 10 characters.'});
				}
			}
			else
			{
				ws['B11'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
			}
          
        }
        else
        {
          ws['B11'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          //error_data.push({sheetname:sheetone_name, cellid:'B11', error:'Planner Can not be in blank.'});
        }

        //Check Fabric Composition
        var cell_fabriccomp = ws['B12'].v;
        if(cell_fabriccomp !== "")
        {
          const buyercode = cell_fabriccomp.split("-");
		  	if(buyercode.includes("-"))
			{
				if(buyercode[1].length > 10)
				{
					ws['B12'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					//error_data.push({sheetname:sheetone_name, cellid:'B12', error:'Fabric Composition code length must be 10 characters.'});
				}
			}
			else
			{
				ws['B12'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
			}
          
        }
        else
        {
          ws['B12'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          //error_data.push({sheetname:sheetone_name, cellid:'B12', error:'Fabric Composition Can not be in blank.'});
        }

        //Check Style Categorization
        var cell_stylecat = ws['B13'].v;
        if(cell_stylecat !== "")
        {
          	const buyercode = cell_stylecat.split("-");
		  	if(buyercode.includes("-"))
			{
				if(buyercode[1].length !== 1)
				{
					ws['B13'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					//error_data.push({sheetname:sheetone_name, cellid:'B13', error:'Style Categorization Letter length must be 1 character.'});
				}
				else
				{
					if(buyercode[1].match(/^[A-Z]*$/) === false)
					{
					ws['B13'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
					//error_data.push({sheetname:sheetone_name, cellid:'B13', error:'Style Categorization Letter Need to change as Capital Letter.'});
					}
				}
			}
			else
			{
				ws['B13'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
			}
          
        }
        else
        {
          ws['B13'].s = {fill: {patternType:"solid",fgColor:{ rgb: "FF0000" }},};
          //error_data.push({sheetname:sheetone_name, cellid:'B13', error:'Style Categorization Can not be in blank.'});
        }

		XLSX.utils.book_append_sheet(wb, ws, 'CO LINE');// changed StNDdize CO to CO Line 

		for (var i = 0; i < 14; i++) {
			filteredBOM.unshift(['']);
		}

		//BOM sheet
		const ws2 = XLSX.utils.aoa_to_sheet(filteredBOM);
		XLSX.utils.book_append_sheet(wb, ws2, 'BOM LINE');// changed StNDdize BOM to BOM LINE 

		//Ops Track sheet
		const ws3 = XLSX.utils.aoa_to_sheet(opsToTrackData);
		XLSX.utils.book_append_sheet(wb, ws3, 'Operations Track');// changed StNDdize Operations Track to Operations Track 
		OpsTrackSheetFormat(ws3, opsToTrackData);

		XLSX.writeFile(wb, 'VS Modern Input Sheet.xlsx'); //PINk to VS Sleep

		selectedStyleData.newLines = upOLRDATASET.newLines;
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
				<Grid item xs={6} style={{ marginTop: '0.5rem' }}>
					<label
						className='form-control'
						style={{
							width: '20vw',
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
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
				<Grid item xs={4} hidden={true} style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>
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
				
				<Grid item xs={2} style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>
					<Button
						variant='contained'
						color='secondary'
						onClick={onInputSheetDownload}
					>
						Download
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
							<Grid item xs={2}>
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
