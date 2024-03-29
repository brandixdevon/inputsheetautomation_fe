//PVH Tommy View
import React, { useState, useContext, useEffect } from 'react';
import PinkInputSheetContext from '../context/pvhckContext';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import XLSX from 'xlsx';
import XLSX from 'xlsx-js-style';
import {
	inseams_tommy as inseams,
	packingTypes,
	seasonalCodes,
	yearCodes
} from '../Services/datasets/pvh.d';
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
import { COTblData_Pvhtommy, operationtable } from '../Services/datasets/common.d';
import { SheetJSFT } from '../utils/sheetJSFT';
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
import {Tabs, Tab} from 'react-bootstrap-tabs';

const Step2Component = () => {

	const [merchandisers, setMerchandisers] = useState([]);
	const [planners, setplanners] = useState([]);
	const [buyerDivisions, setbuyerDivisions] = useState([]);
	const [leadFactories, setleadFactories] = useState([]);
	const [garmentCompositions, setgarmentCompositions] = useState([]);
	const [warehouses, setwarehouses] = useState([]);
	const [m3buyerDivisions, setm3buyerDivisions] = useState([]);

	const [BomDownloadEnable, setBomDownloadEnable] = useState(false);
	
	
	const pinkInputSheetContext = useContext(PinkInputSheetContext);
	const [NEWBOMLINES, setNEWBOMLINES] = useState<any>(pinkInputSheetContext.BOM);
	const vsInputSheetContext = useContext(VsInputSheetContext);
	const [filename, setFileName] = useState('Select AA Sheet File');
	const [selectedWareHouse, setSelectedWarehouse] = useState<any>('');
	const [selectedWareHouseForLine, setSelectedWarehouseForLine] = useState<any>('');
	const [selectedPackMethodForLine, setSelectedPackMethodForLine] = useState<any>('');
	const [selectedMerchandiser, setselectedMerchandiser] = useState<any>('');
	const [selectedPlanner, setselectedPlanner] = useState<any>('');
	const [selectedBuyerDivisions, setBuyerDivisions] = useState<any>('');
	const [selectedLeadFactories, setselectedLeadFactory] = useState<any>('');
	const [selectedGarmentCompositions, setGarmentCompositions] = useState<any>('');
	const [selectedStyleData, setSelectedStyleData] = useState<any>({newLines: [],});
	const [upOLRDATASET, setupOLRDATASET] = useState<any>([]);
	const [requestDelDate, setrequestDelDate] = useState('');
	const [customerDelDate, setcustomerDelDate] = useState('');
	const [plannerDelDate, setplannerDelDate] = useState('');
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
			const merchandisers = await getMerchandiser('PVHTO');
			setMerchandisers(merchandisers);
			
			const planners = await getPlanners('PVHTO');
			setplanners(planners);
			
			const buyerDivisions = await getBuyerDivisions('PVHTO');
			setbuyerDivisions(buyerDivisions);

			const leadFactories = await getLeadFactories();
			setleadFactories(leadFactories);

			const garmentCompositions = await getGarmentCompositions('PVHTO');
			setgarmentCompositions(garmentCompositions);

			const warehouses = await getWarehouses('PVHTO');
			setwarehouses(warehouses);

			const m3buyerDivisions = await getM3BuyerDivisions('PVHTO');
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
			//toast.error('Please Select/Sync Style and BOM.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});	
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
			const sheet = wb.Sheets['AA'];
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

					if (obj['**Global Style'].toString().includes(pinkInputSheetContext.style)) {
						
						//Not usefull
						if (!isNaN(obj['In DC Date']) && obj['In DC Date'] !== '') {
							obj['In DC Date'] = convertExcelDateToJsLocaleDateString( obj['In DC Date']);
						}

						if (!isNaN(obj['Need By']) && obj['Need By'] !== '') {
							obj['Need By'] = convertExcelDateToJsLocaleDateString(obj['Need By']);
						}

						sheetStyles.push(obj);
					}
				});


				let sheetStyles_converted: any = [];

		
			const masterColorKeys = sheetStyles.filter((l) => l['**Color']).map(
					(l) => l['**Color'] + l['Buy Plan'] + l['Size']
				);
			const uniquemasterColorKeys = [...new Set([...masterColorKeys])];

			uniquemasterColorKeys.forEach((code) => {
				const selectedColorLines = sheetStyles.filter(
					(l) => l['**Color'] + l['Buy Plan'] + l['Size'] == code
				);
 
				let temp_size1,temp_size2,temp_size3,temp_size4,temp_size5,temp_size6,temp_size7,temp_size8,temp_size9,temp_size10;

				selectedColorLines.forEach((l) => {
					
					const tempSize = l['Size']
						.toUpperCase()
						.trim();

					if (tempSize.toUpperCase() === ('1X')) {
						temp_size1 = l['Qty'];
					} else if (tempSize.toUpperCase() === ('2X')) {
						temp_size2 = l['Qty'];
					} else if (tempSize.toUpperCase() === ('3X')) {
						temp_size3 = l['Qty'];
					} else if (tempSize.toUpperCase() === ('XXS')) {
						temp_size4 = l['Qty'];
					} else if (tempSize.toUpperCase() === ('XS')) {
						temp_size5 = l['Qty'];
					} else if (tempSize.toUpperCase() === ('S')) {
						temp_size6 = l['Qty'];
					} else if (tempSize.toUpperCase() === ('M')) {
						temp_size7 = l['Qty'];
					} else if (tempSize.toUpperCase() === ('L')) {
						temp_size8 = l['Qty'];
					} else if (tempSize.toUpperCase() === ('XL')) {
						temp_size9 = l['Qty'];
					} else if (tempSize.toUpperCase() === ('2XL')) {
						temp_size10 = l['Qty'];
					}

					const SIZE_1X = temp_size1 > 0 ? temp_size1 : 0;
					const SIZE_2X = temp_size2 > 0 ? temp_size2 : 0;
					const SIZE_3X = temp_size3 > 0 ? temp_size3 : 0;
					const SIZE_XXS = temp_size4 > 0 ? temp_size4 : 0;
					const SIZE_XS = temp_size5 > 0 ? temp_size5 : 0;
					const SIZE_S = temp_size6 > 0 ? temp_size6 : 0;
					const SIZE_M = temp_size7 > 0 ? temp_size7 : 0;
					const SIZE_L = temp_size8 > 0 ? temp_size8 : 0;
					const SIZE_XL = temp_size9 > 0 ? temp_size9 : 0;
					const SIZE_2XL = temp_size10 > 0 ? temp_size10 : 0;
	
					sheetStyles_converted.push({
						id:l['**Color'] + l['Buy Plan'] + l['Size'],
						newline: 'False',
						productionwarehouse: '',
						destination: l['**Ship To'],
						style:l['**Global Style'],
						rddc:'',
						rddp:'',
						fobd:'',
						ndcd:l['Need By'],
						pcdd:'',
						color:l['**Color Descr']+l['**Color']+l['**NRF'],
						vpono:l['AA'],
						cpono:'',
						deliverymethod:'SEA',
						salesprice:'',
						deliveryterm:'Free on Board-FOB',
						packmethod:l['**Color'],
						zoption:'',
						article:'',
						description:'',
						warehouse:'',
						countrydate:'',
						shipto:l['**Ship To'],
						modeoftransport:'',
						SIZE_1X:SIZE_1X,
						SIZE_2X:SIZE_2X,
						SIZE_3X:SIZE_3X,
						SIZE_XXS:SIZE_XXS,
						SIZE_XS:SIZE_XS,
						SIZE_S:SIZE_S,
						SIZE_M:SIZE_M,
						SIZE_L:SIZE_L,
						SIZE_XL:SIZE_XL,
						SIZE_2XL:SIZE_2XL,
						TOTALQTY: parseInt(SIZE_1X) + 
						parseInt(SIZE_2X) + 
						parseInt(SIZE_3X) + 
						parseInt(SIZE_XXS) + 
						parseInt(SIZE_XS) + 
						parseInt(SIZE_S) + 
						parseInt(SIZE_M) + 
						parseInt(SIZE_L) + 
						parseInt(SIZE_XL) + 
						parseInt(SIZE_2XL),	
					});

				});

				
			});

		 
				if (sheetStyles_converted.length > 0) {
					
					//Get season based on season code (OLR)
					//const seasonName = getSeasonPink(sheetStyles[0][ecvisionHeaderNames.SEASON]);
					const seasonName= pinkInputSheetContext.season;

					let uniqueStylesWithData = {
						styleNo: pinkInputSheetContext.style,
						VERSION: '',
						itemGroup: seasonName,
						season: seasonName,
						// purchasingGroup: shipDateFilteredStylesData[0]['PURCHASINGGROUP'],
						purchasingGroup: '',
						// lines: shipDateFilteredStylesData,
						lines: sheetStyles,
						newLines:sheetStyles_converted,
						wareHouse: '',
						destination: '',
						deliveryMethod: '',
						merchandiser: '',
						planner: '',
						packMethod: '',
						buyerDivision: '',
						leadFactory: '',
						MASTSTYLEDESC: sheetStyles[0]['**Style Descr']
					};

					pinkInputSheetContext.changeGenericNo(''
						//sheetStyles[0][ecvisionHeaderNames.GENERICNO]
					);
					//changeSelectedStyleNo(uniqueStylesWithData);

					setSelectedStyleData(uniqueStylesWithData);

					alert(sheetStyles.length.toString()+' No of Related Rows Found in AA Sheet.');
					//toast.info(sheetStyles.length.toString()+' No of Related Rows Found in AA Sheet.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
					
				} else {
					alert('No Style ' + pinkInputSheetContext.style);
					//toast.error('No Style ' + pinkInputSheetContext.style, { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
					
				}
			} else {
				alert('No sheet named AA');
				//toast.error('No sheet named AA', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
				
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
			if(selectedWareHouseForLine.length > 0)
			{
				const wareHouse = await getWarehousesDetail(selectedWareHouseForLine);

				const relevantLine = selectedStyleData.newLines.find(
					(l) => l.id === uniq_linekey
				);

				relevantLine.warehouse = wareHouse ? wareHouse[0].name : '';
				setSelectedStyleData(selectedStyleData);

				setOpenPackingModal(false);
			}
			else
			{
				alert('Please Select Warehouse?');
				//toast.error('Please Select Warehouse?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			
			}
			
		}
		else
		{
			alert('Row line Can not identify.');
			//toast.error('Row line Can not identify.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
		
		}

	};

	const onUpdatePackMethod = async () => {
		
		if(uniq_linekey.length > 0)
		{
			
			 
			if(selectedPackMethodForLine.length > 0)
			{
				const packMethod = selectedPackMethodForLine;

				const relevantLine = selectedStyleData.newLines.find(
					(l) => l.id === uniq_linekey
				);

				relevantLine.packmethod = packMethod ? packMethod : '';
				setSelectedStyleData(selectedStyleData);

				setOpenPackingModal(false);
			}
			else
			{
				alert('Please Select Packing Method?');
				//toast.error('Please Select Packing Method?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			}

		}
		else
		{
			alert('Please Select Pack Method and data.');
			//toast.error('Please Select Pack Method and data.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
		}

	};

	const onUpdateCustomerDelDate = async () => {
		
		if(uniq_linekey.length > 0)
		{
			
			 
			if(customerDelDate.length > 0)
			{ 
				const relevantLine = selectedStyleData.newLines.find(
					(l) => l.id === uniq_linekey
				);

				relevantLine.rddc = customerDelDate ? customerDelDate : '';
				setSelectedStyleData(selectedStyleData);

				setOpenPackingModal(false);
			}
			else
			{
				alert('Please Select Date?');
				//toast.error('Please Select Date?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
				
			}

		}
		else
		{
			alert('Please Select Pack Method and data.');
			//toast.error('Please Select Pack Method and data.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			
		}

	};

	const onUpdatePlannerDelDate = async () => {
		
		if(uniq_linekey.length > 0)
		{
			if(plannerDelDate.length > 0)
			{ 
				const relevantLine = selectedStyleData.newLines.find(
					(l) => l.id === uniq_linekey
				);

				relevantLine.rddp = plannerDelDate ? plannerDelDate : '';
				setSelectedStyleData(selectedStyleData);

				setOpenPackingModal(false);
			}
			else
			{
				alert('Please Select Date?');
				//toast.error('Please Select Date?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
				
			}

		}
		else
		{
			alert('Please Select Pack Method and data.');
			//toast.error('Please Select Pack Method and data.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			
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
			if (weekday === 0) {
				resDate.setDate(resDate.getDate() - 1);
			}
		}
		return resDate;
	}

	const onAddWarehouseClicked = async () => {
		if(selectedWareHouse.length === 0)
		{
			alert('Please Select Warehouse?');
			//toast.error('Please Select Warehouse?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		const wareHouse = await getWarehousesDetail(selectedWareHouse);
		
		let cselectedStyleData = { ...selectedStyleData };

			cselectedStyleData.newLines.forEach((line) => {
				
				line.warehouse = wareHouse[0].name;
			});
			setSelectedStyleData(cselectedStyleData);
 
			alert('All Rows updated by Warehouse.');
			//toast.success('All Rows updated by Warehouse.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			

	};
 
	const onAddDelDateCustomerClicked = async () => {
		if(requestDelDate.length === 0)
		{
			alert('Please Select Date?');
			//toast.error('Please Select Date?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		let cselectedStyleData = { ...selectedStyleData };

		cselectedStyleData.newLines.forEach((line) => {

			line.rddc = requestDelDate;
			line.fobd = requestDelDate;

			if(line.deliverymethod === "Sea")
			{
				var date1 = new Date(requestDelDate);
				line.ndcd = date1.setDate(date1.getDate() + 31);
			}
			else if(line.deliverymethod === "Air")
			{
				var date2 = new Date(requestDelDate);
				line.ndcd = date2.setDate(date2.getDate() + 7);
			}

		});
		setSelectedStyleData(cselectedStyleData);
		
		alert('All Rows updated.');
		//toast.success('All Rows updated.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
		
	};

	const onAddDelDatePlannerClicked = async () => {
		if(requestDelDate.length === 0)
		{
			alert('Please Select Date?');
			//toast.error('Please Select Date?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		let cselectedStyleData = { ...selectedStyleData };

		cselectedStyleData.newLines.forEach((line) => {

			line.rddp = requestDelDate;
		});
		setSelectedStyleData(cselectedStyleData);
		
		alert('All Rows updated.');
		//toast.success('All Rows updated.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
	};

	//When click download button Code execute from here
	const onInputSheetDownload = async () => {
		
		if(selectedMerchandiser.length === 0)
		{
			alert('Please Select Merchandiser?');
			//toast.error('Please Select Merchandiser?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}
		
		if(selectedPlanner.length === 0)
		{
			alert('Please Select Planner?');
			//toast.error('Please Select Planner?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		if(selectedLeadFactories.length === 0)
		{
			alert('Please Select Lead factory?');
			//toast.error('Please Select Lead factory?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		if(selectedGarmentCompositions.length === 0)
		{
			alert('Please Select Garment Composition?');
			//toast.error('Please Select Garment Composition?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		if(selectedBuyerDivisions.length === 0)
		{
			alert('Please Select Buyer Division?');
			//toast.error('Please Select Buyer Division?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		if(selectedM3BuyerDivision.length === 0)
		{
			alert('Please Select M3 Buyer Division?');
			//toast.error('Please Select M3 Buyer Division?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		if(selectedInseam.length === 0)
		{
			alert('Please Select Order Type?');
			//toast.error('Please Select Order Type?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		if(selectedStyleData.styleNo === "" || selectedStyleData.styleNo === undefined)
		{
			alert('Please Upload AA Sheet.');
			//toast.error('Please Upload AA Sheet.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		const buyerDevisionvalues = await getBuyerDivisionsDetail(selectedBuyerDivisions);
		const buyerDivision = buyerDevisionvalues[0].code;

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

		
		const seasoncode = seasonalCodes.find((s) => s.id == selectedSeasonCode)?.name ?? '';
		const yearcode = yearCodes.find((s) => s.id == selectedYearCode)?.name ?? '';

		let StyleNo = '';

		if(selectedPackingType === "S")
		{
			StyleNo += selectedStyleData.styleNo.substr(selectedStyleData.styleNo.length - 4);
		}
		else if(selectedPackingType === "T")
		{
			StyleNo += 'T'+ selectedStyleData.styleNo.substr(selectedStyleData.styleNo.length - 3);
		}
		else if(selectedPackingType === "B")
		{
			StyleNo += 'B'+ selectedStyleData.styleNo.substr(selectedStyleData.styleNo.length - 3);
		}
		else
		{
			StyleNo += selectedStyleData.styleNo.substr(selectedStyleData.styleNo.length - 4);
		}

		
		let newStyleno = '';
		
		
		newStyleno += 'T';

		if(selectedInseam === "M")
		{
			newStyleno += 'M';
		}
		else if(selectedInseam === "O")
		{
			newStyleno += 'O';
		}
		else if(selectedInseam === "B")
		{
			newStyleno += 'B';
		}
		else if(selectedInseam === "R")
		{
			newStyleno += 'R';
		}
		else if(selectedInseam === "C")
		{
			newStyleno += 'C';
		}
		else
		{
			newStyleno += 'T';
		}

		newStyleno += StyleNo;

		newStyleno += (seasoncode + yearcode);

		const NewSeason = selectedStyleData.season.toUpperCase() === 'FALL' ? 'FALL' :
		selectedStyleData.season.toUpperCase() === 'HOLIDAY' ? 'HO' :
		selectedStyleData.season.toUpperCase() === 'SUMMER' ? 'SU' :
		selectedStyleData.season.toUpperCase() === 'WINTER' ? 'WIN' :
		selectedStyleData.season.toUpperCase() === 'SPRING' ? 'SP' : '';
 
		const season = NewSeason + pinkInputSheetContext.Selyear.toString().slice(-2) + " - " + selectedStyleData.season.toUpperCase() + " " + pinkInputSheetContext.Selyear.toString().slice(-2);

		//const selectedBuyerDivisionName: string = buyerDevisionvalues[0].name;
		
		const wb = XLSX.utils.book_new();
		let template = COTblData_Pvhtommy(
			false,
			newStyleno,
			selectedStyleData,
			leadFactory,
			buyerDivision,
			merchandiser,
			planner,
			garmentComposition,
			M3buyerDivision,
			'Silhouette', //product group
			season,
			Grouptechclass,

		);

		//Loop through OLR lines
		for (let i = 0; i < selectedStyleData.newLines.length; i++) {
			const line = selectedStyleData.newLines[i];
			COColors.push(line.color.toString());

			//Get matching color from BOM Garment Color(last 4 chars) based on Color code(last 4 chars) in OLR
			//const matchingColor: any = pinkInputSheetContext.colorData.find(
				//(c: any) => c.slice(-6) == line.color.toString()
			//);
			//let newColor = matchingColor;

			// const indexofdeldate = uniquedeliveryDates.findIndex(
			// 	(l) => l == line.requestDelDate
			// );

			//Get Z Feature based on SHIPTONAME
			//const zft = getZFtrPink(line.SHIPTONAME);
			const zft = '';

			//Get delivery method based on Shipmode
			//const deliveryMethod = getDeliveryMethodPink(
				//line[ecvisionHeaderNames.SHIPMODE]
			//);

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
				line.warehouse,
				line.destination,
				line.style,
				new Date(line.rddc),
				new Date(line.rddp),
				new Date(line.fobd), //FOB Date
				new Date(line.ndcd),
				new Date(line.pcdd), //PCDDate
				(selectedInseam.length > 0) ? selectedInseam +'-'+ line.color : line.color,
				line.vpono,
				line.cpono,
				line.deliverymethod,//'DeliveryMethod *'
				parseFloat('0'),
				line.deliveryterm,//'DeliveryTerm *'
				line.packmethod,
				line.zoption,
				line.TOTALQTY,
				line.SIZE_1X,
				line.SIZE_2X,
				line.SIZE_3X,
				line.SIZE_XXS,
				line.SIZE_XS,
				line.SIZE_S,
				line.SIZE_M,
				line.SIZE_L,
				line.SIZE_XL,
				line.SIZE_2XL,
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

		/*
		const sizeIndex1 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size1);
		if (sizeIndex1 > -1) template[14][sizeIndex1] = (selectedStyleData.sizeheaders.size1 === '') ? '' : selectedStyleData.sizeheaders.size1 + getinseamwithsize(selectedInseam);

		const sizeIndex2 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size2);
		if (sizeIndex2 > -1) template[14][sizeIndex2] = (selectedStyleData.sizeheaders.size2 === '') ? '' : selectedStyleData.sizeheaders.size2 + getinseamwithsize(selectedInseam);

		const sizeIndex3 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size3);
		if (sizeIndex3 > -1) template[14][sizeIndex3] = (selectedStyleData.sizeheaders.size3 === '') ? '' : selectedStyleData.sizeheaders.size3 + getinseamwithsize(selectedInseam);

		const sizeIndex4 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size4);
		if (sizeIndex4 > -1) template[14][sizeIndex4] = (selectedStyleData.sizeheaders.size4 === '') ? '' : selectedStyleData.sizeheaders.size4 + getinseamwithsize(selectedInseam);

		const sizeIndex5 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size5);
		if (sizeIndex5 > -1) template[14][sizeIndex5] = (selectedStyleData.sizeheaders.size5 === '') ? '' : selectedStyleData.sizeheaders.size5 + getinseamwithsize(selectedInseam);

		const sizeIndex6 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size6);
		if (sizeIndex6 > -1) template[14][sizeIndex6] = (selectedStyleData.sizeheaders.size6 === '') ? '' : selectedStyleData.sizeheaders.size6 + getinseamwithsize(selectedInseam);

		const sizeIndex7 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size7);
		if (sizeIndex7 > -1) template[14][sizeIndex7] = (selectedStyleData.sizeheaders.size7 === '') ? '' : selectedStyleData.sizeheaders.size7 + getinseamwithsize(selectedInseam);

		const sizeIndex8 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size8);
		if (sizeIndex8 > -1) template[14][sizeIndex8] = (selectedStyleData.sizeheaders.size8 === '') ? '' : selectedStyleData.sizeheaders.size8 + getinseamwithsize(selectedInseam);

		const sizeIndex9 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size9);
		if (sizeIndex9 > -1) template[14][sizeIndex9] = (selectedStyleData.sizeheaders.size9 === '') ? '' : selectedStyleData.sizeheaders.size9 + getinseamwithsize(selectedInseam);

		const sizeIndex10 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size10);
		if (sizeIndex10 > -1) template[14][sizeIndex10] = (selectedStyleData.sizeheaders.size10 === '') ? '' : selectedStyleData.sizeheaders.size10 + getinseamwithsize(selectedInseam);

		const sizeIndex11 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size11);
		if (sizeIndex11 > -1) template[14][sizeIndex11] = (selectedStyleData.sizeheaders.size11 === '') ? '' : selectedStyleData.sizeheaders.size11 + getinseamwithsize(selectedInseam);

		const sizeIndex12 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size12);
		if (sizeIndex12 > -1) template[14][sizeIndex12] = (selectedStyleData.sizeheaders.size12 === '') ? '' : selectedStyleData.sizeheaders.size12 + getinseamwithsize(selectedInseam);

		const sizeIndex13 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size13);
		if (sizeIndex13 > -1) template[14][sizeIndex13] = (selectedStyleData.sizeheaders.size13 === '') ? '' : selectedStyleData.sizeheaders.size13 + getinseamwithsize(selectedInseam);

		const sizeIndex14 = template[14].findIndex(i => i === selectedStyleData.sizeheaders.size14);
		if (sizeIndex14 > -1) template[14][sizeIndex14] = (selectedStyleData.sizeheaders.size14 === '') ? '' : selectedStyleData.sizeheaders.size14 + getinseamwithsize(selectedInseam);
		*/

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

		XLSX.writeFile(wb, newStyleno+ '_' +season + '_PVH Tommy Input Sheet.xlsx'); //PINk to VS Sleep

		alert('Input Sheet Successfully Downloaded.');
		//toast.success('Input Sheet Successfully Downloaded.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
	
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
				//toast.error('Sheet1 Not Found', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
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
				alert(`Genrice No. ${pinkInputSheetContext.genericNo}, not found in Thread Summary Sheet.`);
				//toast.error(`Genrice No. ${pinkInputSheetContext.genericNo}, not found in Thread Summary Sheet.`, { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
				
				setThreadStatus(null);
				// setdownloadBtnStatus(true);
				return;
			}

			//Get all lines from the Thread Master
			const response = await getRmColorThread(true);
			if (response.status !== 200 && response.status !== 201) {
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

	function bomlabel()
	{
		
		let selectedBomData: any[] = pinkInputSheetContext.BOM;

		if(pinkInputSheetContext.BOM.length === 0)
		{
			alert('Please Get Bom Data!');
			//toast.error('Please Get Bom Data!', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;	
		}

		selectedBomData.forEach((bomline) => {

				if(bomline[0] !== " NewLine")
				{
					var ProcLabel = bomline[2]; 
					
					if(ProcLabel.toUpperCase().includes("LABEL") === true)
					{
						var SupplierItemNo = bomline[10];
						var Location = String(bomline[16]).toUpperCase();

						if(SupplierItemNo.toUpperCase() === String("THWL0015").toUpperCase())
						{
							if(!Location.includes("USR") || !Location.includes("USW") || !Location.includes("USE") || !Location.includes("CNR") || !Location.includes("CNW"))
							{
								bomline[13] = "THWL0015-DPVH NO-10680-Date code";
							}
						}
						else if(SupplierItemNo.toUpperCase() === String("THWL0014").toUpperCase())
						{
							if(Location.includes("MEX") || Location.includes("JPN"))
							{
								bomline[13] = "THWL0014-DPVH NO";
							}
						}
						else if(SupplierItemNo.toUpperCase() === String("THWL0018").toUpperCase())
						{
							if(Location.includes("PAN") || Location.includes("MEX"))
							{
								bomline[13] = "THWL0018-DPVH NO";
							}
						}
						else if(SupplierItemNo.toUpperCase() === String("THWL0017").toUpperCase())
						{
							if(Location.includes("BRA"))
							{
								bomline[13] = pinkInputSheetContext.style + " / Care Reference";
							}
						}
						else if(SupplierItemNo.toUpperCase() === String("THWL0021").toUpperCase())
						{
							bomline[13] = "THWL0021 - Bottoms or Shorts";
						}
						else if(SupplierItemNo.toUpperCase() === String("THPL0014").toUpperCase())
						{
							bomline[13] = "THPL0014 - For Tops";
						}
						else if(SupplierItemNo.toUpperCase() === String("THWL0010").toUpperCase())
						{
							bomline[13] = "THWL0010 - Based on Bom requirement";
						}
					}
				}
				
			});
		
		
		setNEWBOMLINES(selectedBomData);
		setBomDownloadEnable(true);

		alert('Bom Line Process Completed!');
		//toast.success('Bom Line Process Completed!', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
 
	}

	const onInputSheetDownload_Bom = async () => {
 
		if(pinkInputSheetContext.style.length === 0)
		{
			alert('Please Select BOM.');
			//toast.error('Please Select BOM.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		//const selectedBuyerDivisionName: string = buyerDevisionvalues[0].name;
		
		const wb = XLSX.utils.book_new();
		
		//BOM removing colors not in CO and Thread lines & Dummy in PLM
		const filteredBOM: any[] = pinkInputSheetContext.BOM;

		for (var i = 0; i < 14; i++) {
			filteredBOM.unshift(['']);
		}

		//BOM sheet
		const ws2 = XLSX.utils.aoa_to_sheet(filteredBOM);
		XLSX.utils.book_append_sheet(wb, ws2, 'BOM LINE');// changed StNDdize BOM to BOM LINE 

		XLSX.writeFile(wb, pinkInputSheetContext.style + '_BOM_PVH Sleep Input Sheet.xlsx'); //PINk to VS Sleep
		alert('Bom Line Downloaded Completed!');
		//toast.success('Bom Line Downloaded Completed!', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
 
	};

	return (
		<React.Fragment>
			
			<Grid container direction='row' justify='space-evenly'>
			<ToastContainer />
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
						onClick={onInputSheetDownload} >
						Download
					</Button>
				</Grid>
			</Grid>

			{/* {isFileUploaded?  */}
			<div style={{ marginTop: '15px' }}>
				<div className='row'>
					<div className='col-sm-8'>
						<Grid
							container
							style={{
								border: '0.4px solid #C0C0C0	',
								padding: '5px',
								borderRadius: '5px',
							}}
							spacing={1}
						>
							<Grid item xs={4}>
								<DropDownComponent
									selectedField={selectedMerchandiser}
									data={merchandisers}
									onSelectChange={changeMerchandiser}
									fieldName='Merchandisers'
								/>
							</Grid>
							<Grid item xs={4}>
								<DropDownComponent
									selectedField={selectedPlanner}
									data={planners}
									onSelectChange={changePlanner}
									fieldName='Planners'
								/>
							</Grid>
							<Grid item xs={4}>
								<DropDownComponent
									selectedField={selectedLeadFactories}
									data={leadFactories}
									onSelectChange={changeLeadfactory}
									fieldName='Lead Factories'
								/>
							</Grid>
							<Grid item xs={4}>
								<DropDownComponent
									selectedField={selectedGarmentCompositions}
									//data={garmentCompositionPink}
									data={garmentCompositions}
									onSelectChange={changeGarmentCom}
									fieldName='Garment Compositions'
								/>
							</Grid>
							<Grid item xs={3}>
								<DropDownComponent
									selectedField={selectedBuyerDivisions}
									data={buyerDivisions}
									//data={divisionCodes}
									onSelectChange={changeBuyerDivision}
									fieldName='Buyer Division'
								/>
							</Grid>
							<Grid item xs={3}>
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
							<Grid item xs={3}>
								<DropDownComponent
									selectedField={selectedInseam}
									data={inseams}
									onSelectChange={changeInseam}
									fieldName='Order Type'
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
							<Grid item xs={6}>
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
								border: '0.4px solid #C0C0C0',
								padding: '5px',
								borderRadius: '5px',
							}}
							spacing={1}
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

			<Tabs style={{ marginTop: "15px", marginRight: 10 }}>
				<Tab label="CO Lines">
					<div style={{ marginTop: 10, marginRight: 10 }}>
						<table className='table table-bordered table-sm' style={{fontSize:"12px"}}>
								<thead>
									<tr>
										<th scope='col'>Color</th>
										<th scope='col'>Pack Method</th>
										<th scope='col'>Change</th>
										<th scope='col'>
											Customer Delivery Date{' '}
											<AddCircleIcon
												onClick={() => onAddDelDateCustomerClicked()}
												color='secondary'
											/>
										</th>
										<th scope='col'>
											Planner Delivery Date{' '}
											<AddCircleIcon
												onClick={() => onAddDelDatePlannerClicked()}
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
												id,
												color,
												warehouse,
												destination,
												vpono,
												packmethod,
												rddc,
												rddp,
												deliverymethod,
											},
											index
										) => (
											<tr key={index} style={{ paddingTop: '0vw' }}>
												<td style={{ paddingRight: '0vw' }}>{color}</td>
												<td>{packmethod} </td>
												<td align='center'>
													<AddCircleIcon
														color='secondary'
														onClick={() => onStyleLineChangeClick(id)}
													/>
												</td>
												<td> {rddc}</td>
												<td> {rddp}</td>
												<td>{warehouse} </td>
												<td>{destination} </td>
												<td>{vpono} </td>
												<td> {deliverymethod}</td>
											</tr>
										)
									)}
								</tbody>
						</table>

						<Modal open={openPackingModal}
							onClose={handleClose}
							style={{
								height: '70vh',
								width: '40vw',
								margin: 'auto',
							}}
							BackdropComponent={Backdrop} >
							<>
							<div style={{backgroundColor:'#fff',width:'500px',paddingTop:'10px',paddingBottom:'10px',paddingLeft:'10px',paddingRight:'10px'}} >
								<p>Change Pack Method and Warehouse</p>
								<hr/>

								<DropDownComponent 
								fieldName='Warehouse' 
								data={warehouses}
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
								<hr/>
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

								<br/>
								<hr/>
								<br/>

								<input style={{ height: '2.5vw' }}
									name='date'
									type='date'
									value={customerDelDate}
									onChange={(e) => {
										const { value } = e.target;
										setcustomerDelDate(value);
									}}
									className='form-control' />

								<Button
									variant='contained'
									color='secondary'
									onClick={onUpdateCustomerDelDate}
									
								>
									Customer Delivery Date
								</Button>

								<br/>
								<hr/>
								<br/>

								<input style={{ height: '2.5vw' }}
									name='date'
									type='date'
									value={plannerDelDate}
									onChange={(e) => {
										const { value } = e.target;
										setplannerDelDate(value);
									}}
									className='form-control' />

								<Button
									variant='contained'
									color='secondary'
									onClick={onUpdatePlannerDelDate}
									
								>
									Planner Delivery Date
								</Button>

							</div>
							</>
						</Modal>

					</div>
				</Tab>
				<Tab label="Bom Lines">
					<div style={{ marginTop: 10, marginRight: 10 }}>
						<Button size="small" variant='contained' color='primary' onClick={() => bomlabel()} >
							Label Process
						</Button>
						<Button hidden={!BomDownloadEnable} style={{marginLeft:"15px",color:"white",backgroundColor:"#24a0ed"}} size="small" variant='contained' color='inherit' onClick={onInputSheetDownload_Bom} >
							Download BOM
						 </Button>
						<table className='table table-bordered table-sm' style={{fontSize:"12px"}}>
								<thead>
									<tr>
										<th scope='col'>#</th>
										<th scope='col'>BOM Category</th>
										<th scope='col'>RM Procurement Group</th>
										<th scope='col'>RM Width</th>
										<th scope='col'>Supplier Item No</th>
										<th scope='col'>Comment</th>
										<th scope='col'>Item Name</th>
										<th scope='col'>Item Description</th>
										<th scope='col'>GMT ZOption</th>
									</tr>
								</thead>
								<tbody>
									{pinkInputSheetContext.BOM.map((row,index) => ( 
										(row[0] === " NewLine") ? (<></>) : (<tr style={{ paddingTop: '0vw' }}>
										<td>{index}</td>
										<td>{row[1]}</td>
										<td>{row[2]}</td>
										<td>{row[9]}</td>
										<td>{row[10]}</td>
										<td>{row[11]}</td>
										<td>{row[12]}</td>
										<td>{row[13]}</td>
										<td>{row[16]}</td>
									</tr>)
										
										)
									)}
								</tbody>
						</table>

						<Modal open={openPackingModal}
							onClose={handleClose}
							style={{
								height: '70vh',
								width: '40vw',
								margin: 'auto',
							}}
							BackdropComponent={Backdrop} >
							<>
							<div style={{backgroundColor:'#fff',width:'500px',paddingTop:'10px',paddingBottom:'10px',paddingLeft:'10px',paddingRight:'10px'}} >
								<p>Change Pack Method and Warehouse</p>
								<hr/>

								<DropDownComponent 
								fieldName='Warehouse' 
								data={warehouses}
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
								<hr/>
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

								<br/>
								<hr/>
								<br/>

								<input style={{ height: '2.5vw' }}
									name='date'
									type='date'
									value={customerDelDate}
									onChange={(e) => {
										const { value } = e.target;
										setcustomerDelDate(value);
									}}
									className='form-control' />

								<Button
									variant='contained'
									color='secondary'
									onClick={onUpdateCustomerDelDate}
									
								>
									Customer Delivery Date
								</Button>

								<br/>
								<hr/>
								<br/>

								<input style={{ height: '2.5vw' }}
									name='date'
									type='date'
									value={plannerDelDate}
									onChange={(e) => {
										const { value } = e.target;
										setplannerDelDate(value);
									}}
									className='form-control' />

								<Button
									variant='contained'
									color='secondary'
									onClick={onUpdatePlannerDelDate}
									
								>
									Planner Delivery Date
								</Button>

							</div>
							</>
						</Modal>

					</div>
				</Tab>
			</Tabs>
 
		</React.Fragment>
	);
};

export default Step2Component;
