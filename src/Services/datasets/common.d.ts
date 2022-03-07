export const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

export const BOMData = (line) => {
	return {
		'NewLine':line['NewLine'],
		'BOMCategory*': line['BOMCategory'],//changed from Main category
		'RM Product Group': line['RMProcurementGroup'],
		'Item Code': line['M3Item Code'],
		'Item Name': line['ItemName'],
		'Item Description': line['ItemDescription'],
		'Brand Category': line['Brand Category'],
		'Garment Z FTR': line['Garment Z FTR'],
		'Garment Color': line['Garment Color'],
		'Garment Size': line['Garment Size'],
		'RM Z FTR': line['RM Z FTR'],
		'RM Color': line['RM Color'],
		'RM Size': line['RM Size'],
		Consumption: line['Consumption'],
		'Wastage%': line['Wastage%'],
		'SKU UOM': line['SKU UOM'],
		'Purchase UOM': line['Purchase UOM'],
		Conversion: line['Conversion'],
		'Costing price': line['Costing price'],
		'Purchase price': line['Purchase price'],
		'Hierarchy Level 1': line['Hierarchy Level 1'],
		'Hierarchy Level 2': line['Hierarchy Level 2'],
		'Hierarchy Level 3': line['Hierarchy Level 3'],
		'Hierarchy Level 4': line['Hierarchy Level 4'],
		'Hierarchy Level 5': line['Hierarchy Level 5'],
		'RM Width': line['RM Width'],
		Freight: line['Freight'],
		TC: line['TC'],
		MOQ: line['MOQ'],
		ORDER_MULTIPLE: line['ORDER_MULTIPLE'],
		Item_Horizon_for_Demand_Consolidation:
			line['Item_Horizon_for_Demand_Consolidation'],
		'Supplier Tolarance': line['Supplier Tolarance'],
		Supplier: line['Supplier'],
		'Manufacturing Lead Time': line['Manufacturing Lead Time'],
		'Mode of Shipment': line['Mode of Shipment'],
		'Delivery Terms': line['Delivery Terms'],
		'Sourcing Merchant': line['Sourcing Merchant'],
		'Supplier Nomination': line['Supplier Nomination'],
		'Supplier Item_No': line['Supplier Item_No'],
		'Inspection Required / Not Required':
			line['Inspection Required / Not Required'],
		Placement: line['Placement'],
		'CO Quantity': line['CO Quantity'],
		Color_Wise_CO_Qty: line['Color_Wise_CO_Qty'],
		Usage: line['Usage'],
		Requirement: line['Requirement'],
		'Category Color': line['Category Color'],
		'Cost $': line['Cost $'],
		'Row No': line['Row No'],
	};
};

export const COTblData = (
	includeLogo,
	newStyleno,
	selectedStyleData,
	leadFactory,
	buyerDivision,
	merchandiser,
	planner,
	garmentComposition,
	M3buyerDivision,
	productGroup,
	season,
	grouptechclass,
	//HeaderSeason,

) => {
	const template = [
		['Style Number', newStyleno],
		// [
		// 	'RM item Group',
		// 	includeLogo
		// 		? `LOGO${selectedStyleData.season}`
		// 		: `PINK${selectedStyleData.itemGroup}`,
		// ],
		// [
		// 	'GMT item Group',
		// 	includeLogo
		// 		? `LOGO${selectedStyleData.season}`
		// 		: `PINK${selectedStyleData.itemGroup}`,
		// ],

		[	'VERSION ID','01'],

		[
			'Garment Item Description', selectedStyleData.MASTSTYLEDESC,
			
		
		],
		[
			'Lead Factory', leadFactory,
		],
		['Buyer', 'MAST INDUSTRIES INC-MAS00468'],
		[
			//'Buyer Division','BFF_LBRANDS_VS_WOMENS_SLEEP'
			'Buyer Division', M3buyerDivision
			//includeLogo ? buyerDivision : buyerDivision ? buyerDivision.name : '',
		],

		['Group Tech Class', grouptechclass],

		[
			'Season', season
			// includeLogo
			// 	? `${selectedStyleData.season}-${selectedStyleData.season}`
			// 	: `${selectedStyleData.season}`,
		],
		['Product Group', productGroup],
		['Merchandiser', merchandiser],
		['Planner', planner],
		['Garment Fabric Composition',garmentComposition],
		
		['Style Categorization', 'RM PURCHASED FOR A CONFIRMED ORDER-O'],
		
		// ['Reff Id', ''],
		// ['Product Line ', ''],
		// ['Range', ''],
		// ['Work-study Catagorization', ''],
		[],
		[
			'NewLine',
			'ProductionWarehouse *',
			'Destination *',
			'RequestedDeliveryDateCustomer *',
			'RequestedDeliveryDatePlanner *',
			'FOB Date',
			'NDC Date',
			'PCD Date',
			'Color *', //Added by Rushan
			'CustomerStyleNo *',
			'VPONo *',
			'CPONo *',
			'DeliveryMethod *',
			'SalesPrice*',
			//'Cash Discount',
			'DeliveryTerm *',
			
			'PackMethod *',
			'ZOption *',// FTR to Option
			'TotalQuantity',
				
			'XXS.',
			'XS.',
			'S.',
			'M.',
			'L.',
			'XL.',
			'XXL.',
			
			'CO Number',
			// 'PO Type',
			// 'Hierarchy ID',
			// 'PCD Validation',
			// 'Delivery Date Validation',
			// 'Packing BOM',
		],
	];
	return template;
};

export const operationtable = [
	['SMV', 'Color'],
	['', 'Facility'],
	['', 'Value'],
	['', '', '', ''],
	['Efficiency', '', '65', ''],
	['', '', '', ''],
	['No of Lace Panels', '', '', ''],
	['', '', '', ''],
	['Operation#', 'Operation', 'All', 'opt1', 'opt2', 'opt3'],
	['0010', 'Laying', '', '', '', ''],
	['0015', 'Cutting', '', '', '', ''],
	['0020', 'Numbering', '', '', '', ''],
	['0030', 'Fusing', '', '', '', ''],
	['0040', 'PRT Send PF', '', '', '', ''],
	['0050', 'PRT Receive PF', '', '', '', ''],
	['0060', 'EMB Send PF', '', '', '', ''],
	['0070', 'EMB Receive PF', '', '', '', ''],
	['0075', 'Bundling', '', '', '', ''],
	['0110', 'PRT Send SGF', '', '', '', ''],
	['0115', 'PRT Receive SGF', '', '', '', ''],
	['0120', 'EMB Send SGF', '', '', '', ''],
	['0125', 'EMB Receive SGF', '', '', '', ''],
	['0140', 'Endline Quality', '', '', '', ''],
	['0143', 'PRT Send GF', '', '', '', ''],
	['0144', 'PRT Receive GF', '', '', '', ''],
	['0147', 'EMB Send GF', '', '', '', ''],
	['0148', 'EMB Receive GF', '', '', '', ''],
	['0150', 'Wash Send', '', '', '', ''],
	['0160', 'Wash Receipt', '', '', '', ''],
	['0170', 'Dye Send', '', '', '', ''],
	['0175', 'Dye Received', '', '', '', ''],
	['0180', 'Finishing', '', '', '', ''],
	['0190', 'Polybag', '', '', '', ''],
];

const supplierMatrix = [
	{
		'Supplier Code': 'ITL SL',
		Supplier: 'INTERNATIONAL TRIMMING LANKA - SL - INT05972',
	},
	{
		'Supplier Code': 'JF&I',
		Supplier: 'JF&I PACKAGING PVT LTD-JAN10885',
	},
	{
		'Supplier Code': 'ITL India',
		Supplier: 'INT. TRIMMINGS & LABELS VIZAG INDIA-INT177836',
	},
	{
		'Supplier Code': 'Poly Creations',
		Supplier: 'POLY CREATIONS (PVT) LTD-POL02151',
	},
	{
		'Supplier Code': 'Econo Pack',
		Supplier: 'ECONOPACK INDIA PVT LTD-ECO19911',
	},
	{
		'Supplier Code': 'Arcadian Sourcing (Pvt) Ltd',
		Supplier: 'ARCADIAN SOURCING (PRIVATE) LIMITED-ARC08759',
	},
];
