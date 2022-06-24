//Aritzia View
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
import PackingItem from '../packingItems/PackingItem';
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

	//read OLR file
	const onFileSelect = async (e) => {
		const files = e.target.files;
		// await setisFileReading(true);
		await setFileName(files[0].name);

		let file_name = files[0].name;

		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;

		reader.onload = async (ee: any) => {
			const bstr = ee.target.result;
			const wb = await XLSX.read(bstr, { type: rABS ? 'binary' : 'array',sheetStubs:true });
			let first_sheet_name = wb.SheetNames[0];
			const sheet = wb.Sheets[first_sheet_name];
			

			if (sheet) {
				let sheetStyles: any = [];
				
				let styleno = sheet['G2'].v;
				let article = sheet['A2'].v;
				let article_desc = sheet['B2'].v;
				let country_date = convertExcelDateToJsLocaleDateString(sheet['N2'].v);
				let ship_to = sheet['P2'].v;
				let transport = sheet['R2'].v;
 
				let size_headers = {
					size1:(typeof sheet['D4'].v === 'undefined') ? '' : sheet['D4'].v,
					size2:(typeof sheet['E4'].v === 'undefined') ? '' : sheet['E4'].v,
					size3:(typeof sheet['G4'].v === 'undefined') ? '' : sheet['G4'].v,
					size4:(typeof sheet['I4'].v === 'undefined') ? '' : sheet['I4'].v,
					size5:(typeof sheet['J4'].v === 'undefined') ? '' : sheet['J4'].v,
					size6:(typeof sheet['K4'].v === 'undefined') ? '' : sheet['K4'].v,
					size7:(typeof sheet['L4'].v === 'undefined') ? '' : sheet['L4'].v,
					size8:(typeof sheet['M4'].v === 'undefined') ? '' : sheet['M4'].v,
					size9:(typeof sheet['N4'].v === 'undefined') ? '' : sheet['N4'].v,
					size10:(typeof sheet['O4'].v === 'undefined') ? '' : sheet['O4'].v,
					size11:(typeof sheet['P4'].v === 'undefined') ? '' : sheet['P4'].v,
					size12:(typeof sheet['Q4'].v === 'undefined') ? '' : sheet['Q4'].v,
					size13:(typeof sheet['R4'].v === 'undefined') ? '' : sheet['R4'].v,
					size14:(typeof sheet['S4'].v === 'undefined') ? '' : sheet['S4'].v,
					}

					let pono = file_name.match("PO(.*)Release");
					

				for (let i = 5; i < 100; i++) {

					let value_color = (typeof sheet['A'+i.toString()].v === 'undefined') ? '' : sheet['A'+i.toString()].v;

					if (value_color !== '') {

						let shipcode = getShiptoAritzia(ship_to);

						var size1=qtycalculate((typeof sheet['D'+i.toString()].v === 'undefined') ? '' : sheet['D'+i.toString()].v);
						var size2=qtycalculate((typeof sheet['E'+i.toString()].v === 'undefined') ? '' : sheet['E'+i.toString()].v);
						var size3=qtycalculate((typeof sheet['G'+i.toString()].v === 'undefined') ? '' : sheet['G'+i.toString()].v);
						var size4=qtycalculate((typeof sheet['I'+i.toString()].v === 'undefined') ? '' : sheet['I'+i.toString()].v);
						var size5=qtycalculate((typeof sheet['J'+i.toString()].v === 'undefined') ? '' : sheet['J'+i.toString()].v);
						var size6=qtycalculate((typeof sheet['K'+i.toString()].v === 'undefined') ? '' : sheet['K'+i.toString()].v);
						var size7=qtycalculate((typeof sheet['L'+i.toString()].v === 'undefined') ? '' : sheet['L'+i.toString()].v);
						var size8=qtycalculate((typeof sheet['M'+i.toString()].v === 'undefined') ? '' : sheet['M'+i.toString()].v);
						var size9=qtycalculate((typeof sheet['N'+i.toString()].v === 'undefined') ? '' : sheet['N'+i.toString()].v);
						var size10=qtycalculate((typeof sheet['O'+i.toString()].v === 'undefined') ? '' : sheet['O'+i.toString()].v);
						var size11=qtycalculate((typeof sheet['P'+i.toString()].v === 'undefined') ? '' : sheet['P'+i.toString()].v);
						var size12=qtycalculate((typeof sheet['Q'+i.toString()].v === 'undefined') ? '' : sheet['Q'+i.toString()].v);
						var size13=qtycalculate((typeof sheet['R'+i.toString()].v === 'undefined') ? '' : sheet['R'+i.toString()].v);
						var size14=qtycalculate((typeof sheet['S'+i.toString()].v === 'undefined') ? '' : sheet['S'+i.toString()].v);

						var size_total = qtycalculate((typeof sheet['T'+i.toString()].v === 'undefined') ? '' : sheet['T'+i.toString()].v);


						sheetStyles.push({
							id:i,
							newline: 'False',
							productionwarehouse: '',
							destination: shipcode,
							style:styleno,
							rddc:'',
							rddp:'',
							fobd:'',
							ndcd:'',
							pcdd:'',
							color:value_color,
							vpono:pono[1],
							cpono:pono[1],
							deliverymethod:transport,
							salesprice:'',
							deliveryterm:'Free on Board-FOB',
							packmethod:'Single pc packing-SIN',
							zoption:'',
							article:article,
							description:article_desc,
							warehouse:'',
							countrydate:country_date,
							shipto:shipcode,
							modeoftransport:transport,
							size1:size1,
							size2:size2,
							size3:size3,
							size4:size4,
							size5:size5,
							size6:size6,
							size7:size7,
							size8:size8,
							size9:size9,
							size10:size10,
							size11:size11,
							size12:size12,
							size13:size13,
							size14:size14,
							sizetotal:size_total,
						});

					}
					else
					{
						break;
					}
				  }


				//sheetData = OLR 

				if (sheetStyles.length > 0) {
					

					//Get season based on season code (OLR)
					const seasonName = getSeasonAritzia(styleno);

					let uniqueStylesWithData = {
						styleNo: styleno,
						VERSION: '',
						itemGroup: seasonName,
						season: seasonName,
						// purchasingGroup: shipDateFilteredStylesData[0]['PURCHASINGGROUP'],
						purchasingGroup: '',
						// lines: shipDateFilteredStylesData,
						newLines: sheetStyles,
						sizeheaders:size_headers,
						wareHouse: '',
						destination: '',
						deliveryMethod: '',
						merchandiser: '',
						planner: '',
						packMethod: '',
						buyerDivision: '',
						leadFactory: '',
						MASTSTYLEDESC: article_desc
					};
					setSelectedStyleData(uniqueStylesWithData);
					pinkInputSheetContext.changeGenericNo('');
					
				} else {
					alert('No Style ' + pinkInputSheetContext.style);
				}
			} else {
				alert('No Sheets in Order Report');
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
				
				line.warehouse = wareHouse[0].name;
			});
			setSelectedStyleData(cselectedStyleData);

			

			alert('All Rows updated.');

	};
 
	const onAddDelDateCustomerClicked = async () => {
		if(requestDelDate.length === 0)
		{
			alert('Please Select Date?');
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
	};

	const onAddDelDatePlannerClicked = async () => {
		if(requestDelDate.length === 0)
		{
			alert('Please Select Date?');
			return;
		}

		let cselectedStyleData = { ...selectedStyleData };

		cselectedStyleData.newLines.forEach((line) => {

			line.rddp = requestDelDate;
		});
		setSelectedStyleData(cselectedStyleData);
		

			alert('All Rows updated.');
	};

	const onInputSheetDownload = async () => {

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

		if(selectedBuyerDivisions.length === 0)
		{
			alert('Please Select Buyer Division?');
			return;
		}

		if(selectedM3BuyerDivision.length === 0)
		{
			alert('Please Select M3 Buyer Division?');
			return;
		}

		if(selectedStyleData.styleNo.length === 0)
		{
			alert('Please Select BOM.');
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
				new Date(line.rddc),
				new Date(line.rddp),
				new Date(line.fobd), //FOB Date
				new Date(line.ndcd),
				new Date(line.pcdd), //PCDDate
				(selectedInseam.length > 0) ? selectedInseam +'-'+ line.color : line.color,
				line.style,
				line.vpono,
				line.cpono,
				line.deliverymethod,//'DeliveryMethod *'
				parseFloat('0'),
				line.deliveryterm,//'DeliveryTerm *'
				line.packmethod,
				line.zoption,
				line.sizetotal,
				line.size1,
				line.size2,
				line.size3,
				line.size4,
				line.size5,
				line.size6,
				line.size7,
				line.size8,
				line.size9,
				line.size10,
				line.size11,
				line.size12,
				line.size13,
				line.size14,
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
