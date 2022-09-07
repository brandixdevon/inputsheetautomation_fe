//Aritzia View
import React, { useState, useContext, useEffect } from 'react';
import PinkInputSheetContext from '../context/aritziaContext';
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
import XLSX from 'xlsx';
import {
	inseams,
	packingTypes,
	seasonalCodes,
	yearCodes,
} from '../Services/datasets/aritzia.d';
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
import { COTblData_Aritzia, operationtable } from '../Services/datasets/common.d';
import { SheetJSFT } from '../utils/sheetJSFT';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {
	getDeliveryMethodPink,
	getFOB,
	getSeasonAritzia,
	getShiptoAritzia,
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
	const [filename, setFileName] = useState('Select PO File (Excel)');
	const [selectedWareHouse, setSelectedWarehouse] = useState<any>('');
	const [selectedWareHouseForLine, setSelectedWarehouseForLine] = useState<any>('');
	const [selectedMerchandiser, setselectedMerchandiser] = useState<any>('');
	const [selectedPlanner, setselectedPlanner] = useState<any>('');
	const [selectedBuyerDivisions, setBuyerDivisions] = useState<any>('');
	const [selectedLeadFactories, setselectedLeadFactory] = useState<any>('');
	const [selectedGarmentCompositions, setGarmentCompositions] = useState<any>('');
	const [selectedStyleData, setSelectedStyleData] = useState<any>({newLines: [],});
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

	const handleClose = () => setOpenPackingModal(false);
	const [uniq_linekey, setuniq_linekey] = useState<any>(0);

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
			const merchandisers = await getMerchandiser('ARIT');
			setMerchandisers(merchandisers);
			
			const planners = await getPlanners('ARIT');
			setplanners(planners);
			
			const buyerDivisions = await getBuyerDivisions('ARIT');
			setbuyerDivisions(buyerDivisions);

			const leadFactories = await getLeadFactories();
			setleadFactories(leadFactories);

			const garmentCompositions = await getGarmentCompositions('ARIT');
			setgarmentCompositions(garmentCompositions);

			const warehouses = await getWarehouses('ARIT');
			setwarehouses(warehouses);

			const m3buyerDivisions = await getM3BuyerDivisions('ARIT');
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


	function qtycalculate(val: string)
	{
		if(val !== '')
		{
			var y: number = +val;

			var cal: number = (y / 100)*102;

			return Math.round(cal);
		}
		else
		{
			return '';
		}
	}

	function qtytonumber(val: string)
	{
		if(val !== '')
		{
			var y: number = +val;

			var cal: number = (y / 100)*102;

			return y;
		}
		else
		{
			return 0;
		}
	}


	//read OLR file New Code 2022/8/24
	const onFileSelect = async (e) => {
		if(pinkInputSheetContext.style.length < 1)
		{
			alert('Please Select/Sync Style and BOM.');
			//toast.error('Please Select/Sync Style and BOM.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		if(selectedSizetemp.length < 1)
		{
			alert('Please Select Size Template.');
			//toast.error('Please Select Size Template.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}


		const files = e.target.files;
		// await setisFileReading(true);
		await setFileName(files[0].name);

		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;

		reader.onload = async (ee: any) => {
			const bstr = ee.target.result;
			const wb = await XLSX.read(bstr, { type: rABS ? 'binary' : 'array',sheetStubs:true });
			let first_sheet_name = wb.SheetNames[0];
			const sheet = wb.Sheets[first_sheet_name];

			if (sheet)
			{
				let sheetStyles: any = [];

				const sheetData = XLSX.utils.sheet_to_json(sheet, {
					header: 1,
					blankrows: false,
					defval: '',
				});

				const headerRow: any = sheetData.splice(0, 1)[0];
				//console.log(sheetData.splice(0, 1))
				for (let i in headerRow) {
					headerRow[i] = headerRow[i].trim();
				}

				//Sheet Data Read

				sheetData.forEach((line: any) => {
					let obj: any = {};

					for (let i in headerRow) {
						obj[headerRow[i]] = line[i];
					}

					if (obj["Vendor Article Number"].toString().includes(pinkInputSheetContext.style) && obj["Size"].trim() !== "") {
						
						//Not usefull
						if (!isNaN(obj['H/O to Forwrder Date']) && obj['H/O to Forwrder Date'] !== '') {
							obj['H/O to Forwrder Date'] = convertExcelDateToJsLocaleDateString( obj['H/O to Forwrder Date']);
						}

						if (!isNaN(obj['Original Ex Cty Date']) && obj['Original Ex Cty Date'] !== '') {
							obj['Original Ex Cty Date'] = convertExcelDateToJsLocaleDateString(obj['Original Ex Cty Date']);
						}

						if (!isNaN(obj['Delivery Date']) && obj['Delivery Date'] !== '') {
							obj['Delivery Date'] = convertExcelDateToJsLocaleDateString( obj['Delivery Date']);
						}

						sheetStyles.push(obj);
					}
				});

				let sheetStyles_converted: any = [];

				const masterColorKeys = sheetStyles.filter((l) => String(l["Colour"]).trim()).map( (l) => String(l["Colour"]).trim() + String(l["Purchasing Document"]).trim() + String(l["Site"]).trim() );
				
				const uniquemasterColorKeys = [...new Set([...masterColorKeys])];
				
			uniquemasterColorKeys.forEach((code) => {
				
				const selectedColorLines = sheetStyles.filter( (l) => String(l["Colour"]).trim() + String(l["Purchasing Document"]).trim() + String(l["Site"]).trim() == code );
				
				function sizetemplate(sizeid)
				{
					if(selectedSizetemp === "COMMON")
					{
						if(sizeid === 1)
						{
							return '3XS';
						}
						else if(sizeid === 2)
						{
							return '2XS';
						}
						else if(sizeid === 3)
						{
							return 'XS';
						}
						else if(sizeid === 4)
						{
							return 'S';
						}
						else if(sizeid === 5)
						{
							return 'M';
						}
						else if(sizeid === 6)
						{
							return 'L';
						}
						else if(sizeid === 7)
						{
							return 'XL';
						}
						else if(sizeid === 8)
						{
							return '2XL';
						}
						else if(sizeid === 9)
						{
							return '3XL';
						}
						else if(sizeid === 10)
						{
							return '1X';
						}
						else if(sizeid === 11)
						{
							return '2X';
						}
						else if(sizeid === 12)
						{
							return '3X';
						}
						else
						{
							return '';
						}
					}
					else if(selectedSizetemp === "NUMERIC")
					{
						if(sizeid === 1)
						{
							return '1';
						}
						else if(sizeid === 2)
						{
							return '2';
						}
						else if(sizeid === 3)
						{
							return '3';
						}
						else if(sizeid === 4)
						{
							return '4';
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

				let temp_S1, temp_S2, temp_S3, temp_S4, temp_S5, temp_S6, temp_S7, temp_S8, temp_S9, temp_S10, temp_S11, temp_S12 = 0;
				
				selectedColorLines.forEach((l) => {
					const tempSize = l["Size"].toUpperCase().trim();

					if(selectedSizetemp === "COMMON")
					{
						if (tempSize === sizetemplate(1)) {
							temp_S1 = temp_S1 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(2)) {
							temp_S2 = temp_S2 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(3)) {
							temp_S3 = temp_S3 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(4)) {
							temp_S4 = temp_S4 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(5)) {
							temp_S5 = temp_S5 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(6)) {
							temp_S6 = temp_S6 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(7)) {
							temp_S7 = temp_S7 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(8)) {
							temp_S8 = temp_S8 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(8)) {
							temp_S9 = temp_S9 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(8)) {
							temp_S10 = temp_S10 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(8)) {
							temp_S11 = temp_S11 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(8)) {
							temp_S12 = temp_S12 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						}
						
					}
					else
					{
						if (tempSize === sizetemplate(1)) {
							temp_S1 = temp_S1 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(2)) {
							temp_S2 = temp_S2 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(3)) {
							temp_S3 = temp_S3 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(4)) {
							temp_S4 = temp_S4 + l["Order Quantity"] != "" ? l["Order Quantity"] : 0;
						} else if (tempSize === sizetemplate(5)) {
							temp_S5 = temp_S5 + 0;
						} else if (tempSize === sizetemplate(6)) {
							temp_S6 = temp_S6 + 0;
						} else if (tempSize === sizetemplate(7)) {
							temp_S7 = temp_S7 + 0;
						} else if (tempSize === sizetemplate(8)) {
							temp_S8 = temp_S8 + 0;
						} else if (tempSize === sizetemplate(8)) {
							temp_S9 = temp_S9 + 0;
						} else if (tempSize === sizetemplate(8)) {
							temp_S10 = temp_S10 + 0;
						} else if (tempSize === sizetemplate(8)) {
							temp_S11 = temp_S11 + 0;
						} else if (tempSize === sizetemplate(8)) {
							temp_S12 = temp_S12 + 0;
						}
					}
 
					
				});

					temp_S1 = temp_S1 > 0 ? Math.round((Number(temp_S1) / 100) * 104) : 0;
					temp_S2 = temp_S2 > 0 ? Math.round((Number(temp_S2) / 100) * 104) : 0;
					temp_S3 = temp_S3 > 0 ? Math.round((Number(temp_S3) / 100) * 104) : 0;
					temp_S4 = temp_S4 > 0 ? Math.round((Number(temp_S4) / 100) * 104) : 0;
					temp_S5 = temp_S5 > 0 ? Math.round((Number(temp_S5) / 100) * 104) : 0;
					temp_S6 = temp_S6 > 0 ? Math.round((Number(temp_S6) / 100) * 104) : 0;
					temp_S7 = temp_S7 > 0 ? Math.round((Number(temp_S7) / 100) * 104) : 0;
					temp_S8 = temp_S8 > 0 ? Math.round((Number(temp_S8) / 100) * 104) : 0;
					temp_S9 = temp_S9 > 0 ? Math.round((Number(temp_S9) / 100) * 104) : 0;
					temp_S10 = temp_S10 > 0 ? Math.round((Number(temp_S10) / 100) * 104) : 0;
					temp_S11 = temp_S11 > 0 ? Math.round((Number(temp_S11) / 100) * 104) : 0;
					temp_S12 = temp_S12 > 0 ? Math.round((Number(temp_S12) / 100) * 104) : 0;

				const x_row = selectedColorLines[0];

				sheetStyles_converted.push({
					id:String(x_row["Colour"]).trim() + String(x_row["Purchasing Document"]).trim() + String(x_row["Site"]).trim(),
					newline: 'False',
					warehouse: '',
					destination: x_row['Site'],
					rddc:'',
					rddp:'',
					fobd:'',
					ndcd:'',
					pcdd:'',
					color:String(x_row["Colour"]).trim(),
					style:x_row['Vendor Article Number'],
					vpono:x_row['Purchasing Document'],
					cpono:x_row['Purchasing Document'],
					deliverymethod:x_row['DMoT Description'],
					salesprice:'',
					deliveryterm:'Free on Board-FOB',
					packmethod:'Single pc packing-SIN',
					zoption:'',
					SETSIZE_S1:temp_S1,
					SETSIZE_S2:temp_S2,
					SETSIZE_S3:temp_S3,
					SETSIZE_S4:temp_S4,
					SETSIZE_S5:temp_S5,
					SETSIZE_S6:temp_S6,
					SETSIZE_S7:temp_S7,
					SETSIZE_S8:temp_S8,
					SETSIZE_S9:temp_S9,
					SETSIZE_S10:temp_S10,
					SETSIZE_S11:temp_S11,
					SETSIZE_S12:temp_S12,
					sizetotal: temp_S1 + temp_S2 + temp_S3 + temp_S4 + temp_S5 + 
					temp_S6 + temp_S7 + temp_S8 + temp_S9 + temp_S10 + temp_S11 + temp_S12,	
				});

				console.log(sheetStyles_converted);

			});

				if (sheetStyles_converted.length > 0) {
					
					//Get season based on season code (OLR)
					const seasonName = getSeasonAritzia(pinkInputSheetContext.style);

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
						MASTSTYLEDESC: ''
					};
					
					//setSelectedStyleData(uniqueStylesWithData);
					pinkInputSheetContext.changeGenericNo('');

					setSelectedStyleData(uniqueStylesWithData);
					alert(sheetStyles.length.toString() +' No of Related Rows Found in PO File.');
					//toast.info(sheetStyles.length.toString() +' No of Related Rows Found in PO File.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
					setFileName("Select PO File");
					
				} else {
					alert('No Style ' + pinkInputSheetContext.style);
					//toast.info('No Style ' + pinkInputSheetContext.style, { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
					setFileName("Select PO File");
				}
				
			} else {
				alert('No Sheets in PO File');
				//toast.error('No Sheets in PO File', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
				
			}
		};

		if (rABS) reader.readAsBinaryString(files[0]);
		else reader.readAsArrayBuffer(files[0]);
	};

	const onStyleLineChangeClick = async (id) => {
		// setShowStyle(false); 
		
		setOpenPackingModal(true);
		setuniq_linekey(id);
		
	};

	const onUpdateDelDateCustomerClicked = async () => {
		if(requestDelDate.length === 0)
		{
			alert('Please Select Date?');
			//toast.error('Please Select Date?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		const relevantLine = selectedStyleData.newLines.find(
			(l) => l.id === uniq_linekey
		);

		relevantLine.rddc = requestDelDate;
		relevantLine.rddc = requestDelDate;

		if(relevantLine.deliverymethod === "Sea")
			{
				var date1 = new Date(requestDelDate);
				relevantLine.ndcd = date1.setDate(date1.getDate() + 31);
			}
			else if(relevantLine.deliverymethod === "Air")
			{
				var date2 = new Date(requestDelDate);
				relevantLine.ndcd = date2.setDate(date2.getDate() + 7);
			}

			setSelectedStyleData(selectedStyleData);

			setOpenPackingModal(false);

	};

	const onUpdateDelDatePlannerClicked = async () => {
		if(requestDelDate.length === 0)
		{
			alert('Please Select Date?');
			//toast.error('Please Select Date?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		const relevantLine = selectedStyleData.newLines.find(
			(l) => l.id === uniq_linekey
		);

		relevantLine.rddp = requestDelDate;

			setSelectedStyleData(selectedStyleData);

			setOpenPackingModal(false);

	};

	const onUpdatewarehouse = async () => {
		
		if(uniq_linekey !== 0)
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
			alert('Please Select warehouse and data.');
			//toast.error('Please Select warehouse and data.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			
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
			//toast.error('Please Select Warehouse?', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
			return;
		}

		const wareHouse = await getWarehousesDetail(selectedWareHouse);
		
		let cselectedStyleData = { ...selectedStyleData };

			cselectedStyleData.newLines.forEach((line) => {
				
				line.warehouse = wareHouse[0].name;
			});
			setSelectedStyleData(cselectedStyleData);

			alert('All Rows updated.');
			//toast.success('All Rows updated.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});

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

		if(selectedStyleData.styleNo.length === 0)
		{
			alert('Please Select BOM.');
			//toast.error('Please Select BOM.', { position: "top-right", autoClose: 3000,closeOnClick: true, pauseOnHover: true,});
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

		let StyleNo = selectedStyleData.styleNo.split('-')[2];

		StyleNo = String(StyleNo).padStart(5, '0');

		
		let newStyleno = '';
		
		
		newStyleno += 'A';

		newStyleno += StyleNo;

		newStyleno += (seasoncode + yearcode);

		

		const season = selectedStyleData.season;

		const selectedBuyerDivisionName: string = buyerDevisionvalues[0].name;
		
		// if selected packing type is Single, no nrrd to change the row information,
		// else if selected packing type is 'Double', copy the individual VPO number with row and then add TOP and Bottom to the end of COlOR column.


		// devon Comment This
		/*
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
		*/

		const wb = XLSX.utils.book_new();
		let template = COTblData_Aritzia(
			false,
			newStyleno,
			selectedStyleData,
			leadFactory,
			buyerDivision,
			merchandiser,
			planner,
			garmentComposition,
			M3buyerDivision,
			'KNUND-Knit Underwear', //product group
			season,
			Grouptechclass,

		);

		//Loop through OLR lines
		for (let i = 0; i < selectedStyleData.newLines.length; i++) {
			
			const line = selectedStyleData.newLines[i];
			//console.log(line);
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

			if(selectedSizetemp === "COMMON")
			{
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
				line.sizetotal,
				line.SETSIZE_S1,
				line.SETSIZE_S2,
				line.SETSIZE_S3,
				line.SETSIZE_S4,
				line.SETSIZE_S5,
				line.SETSIZE_S6,
				line.SETSIZE_S7,
				line.SETSIZE_S8,
				line.SETSIZE_S9,
				line.SETSIZE_S10,
				line.SETSIZE_S11,
				line.SETSIZE_S12,
				''//CO
				];
				template.push(rowToAdd);
			}
			else if(selectedSizetemp === "NUMERIC")
			{
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
					line.sizetotal,
					line.SETSIZE_S1,
					line.SETSIZE_S2,
					line.SETSIZE_S3,
					line.SETSIZE_S4,
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

		if(selectedSizetemp === "COMMON")
		{
			template[14][18] = ' 3XS' + getinseamwithsize(selectedInseam);
			template[14][19] = ' 2XS' + getinseamwithsize(selectedInseam);
			template[14][20] = ' XS' + getinseamwithsize(selectedInseam);
			template[14][21] = ' S' + getinseamwithsize(selectedInseam);
			template[14][22] = ' M' + getinseamwithsize(selectedInseam);
			template[14][23] = ' L' + getinseamwithsize(selectedInseam);
			template[14][24] = ' XL' + getinseamwithsize(selectedInseam);
			template[14][25] = ' 2XL' + getinseamwithsize(selectedInseam);
			template[14][26] = ' 3XL' + getinseamwithsize(selectedInseam);
			template[14][27] = ' 1X' + getinseamwithsize(selectedInseam);
			template[14][28] = ' 2X' + getinseamwithsize(selectedInseam);
			template[14][29] = ' 3X' + getinseamwithsize(selectedInseam);
			template[14][30] = ' CO Number';
		}
		else if(selectedSizetemp === "NUMERIC")
		{
			template[14][18] = ' 1' + getinseamwithsize(selectedInseam);
			template[14][19] = ' 2' + getinseamwithsize(selectedInseam);
			template[14][20] = ' 3' + getinseamwithsize(selectedInseam);
			template[14][21] = ' 4' + getinseamwithsize(selectedInseam);
			template[14][22] = ' CO Number';
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

		XLSX.writeFile(wb, 'Aritzia Input Sheet.xlsx'); //PINk to VS Sleep

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
			<ToastContainer />
			<Grid item xs={2} md={2} style={{ marginTop: '0.2rem' }}>
					<DropDownComponent
						selectedField={selectedSizetemp}
						data={[
							{ id: 'COMMON', name: 'COMMON' },
							{ id: 'NUMERIC', name: 'NUMERIC' },
						]}
						onSelectChange={changeSizetemp}
						fieldName='Size Template'
						size={"small"}
					/>
				</Grid>
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

				<input style={{ height: '2.5vw' }}
					name='date'
					type='date'
					value={requestDelDate}
					onChange={(e) => {
						const { value } = e.target;
						setrequestDelDate(value);
					}}
					className='form-control'
				/>

				<br/>

				<Button
					variant='contained'
					color='secondary'
					onClick={onUpdateDelDateCustomerClicked}
					
				>
					Update Customer Delivery Date
				</Button>

				<br/><br/>

				<input style={{ height: '2.5vw' }}
					name='date'
					type='date'
					value={requestDelDate}
					onChange={(e) => {
						const { value } = e.target;
						setrequestDelDate(value);
					}}
					className='form-control'
				/>

								<br/><br/>

				<Button
					variant='contained'
					color='secondary'
					onClick={onUpdateDelDatePlannerClicked}
					
				>
					Update Planner Delivery Date
				</Button>

			</div>
			</>
			</Modal>
		</React.Fragment>
	);
};

export default Step2Component;
