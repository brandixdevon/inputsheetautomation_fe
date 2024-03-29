export const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

export const BOMData = (line) => {

function GMTcolor(value)
{
	if(value === "Colors-All")
	{
		return value;
	}
	else if(value.includes("-Unavailable in M3") === true)
	{
		return value.replace('-Unavailable in M3','');
	}
	else if(value.includes("-") === true)
	{
		var arr = value.split("-");      
		var lastVal = arr.pop();
		var newval =  value.replace('-'+lastVal,'');

		return newval;
	}
	else
	{
		return value;
	}
}

	return {
		' NewLine':line['NewLine'],
		' BOMCategory *': line['BOMCategory'],//changed from Main category
		' RMProcurementGroup *': line['RMProcurementGroup'],
		' M3Item Code': line['M3Item Code'],
		' HierarchyLevel1': line['HierarchyLevel1'],
		' HierarchyLevel2': line['HierarchyLevel2'],
		' HierarchyLevel3': line['HierarchyLevel3'],
		' HierarchyLevel4': line['HierarchyLevel4'],
		' HierarchyLevel5': line['HierarchyLevel5'],
		' RM Width': line['RM Width'],
		' SupplierItemNo *': line['SupplierItemNo'],
		' Comment': line['Comment'],
		' ItemName *': line['ItemName'],
		' ItemDescription *': line['ItemDescription'],
		' BrandCategory *': line['Brand Category'],
		' GMTColor': GMTcolor(line['GMTColor']),
		' GMTZOption': line['GMTZOption'],
		' GMTSize': line['GMTSize'],
		' RMZOption': line['RMZOption'],
		' RMColor': GMTcolor(line['RMColor']),
		' RMSize': line['RMSize'],
		' YY *': line['YY'],
		' Wastage %*': line['Wastage %'],
		' SupplierNominationStatus': line['SupplierNominationStatus'],
		' SKUUOM *': line['SKU UOM'],
		' PurchaseUOM *': line['Purchase UOM'],
		' Conversion': line['Conversion'],
		' PurchasePrice *': line['PurchasePrice'],
		' Freight': line['Freight'],
		' TC': line['TC'],
		' MOQ': line['MOQ'],
		' OrderMultiple': line['OrderMultiple'],
		' TimeHorizon': line['TimeHorizon'],
		' SupplierTolarance': line['SupplierTolarance'],
		' Supplier': line['Supplier'],
		' ManLeadTime *': line['ManLeadTime'],
		' ModeOfShipment *': line['ModeOfShipment'],
		' RMDeliveryTerm *': line['RMDeliveryTerm'],
		' SourcingMerchant *': line['SourcingMerchant'],
	};
};

export const BOMDataforPVH = (line) => {

	function GMTcolor(value)
	{
		if(value === "Colors-All")
		{
			return value;
		}
		else if(value.includes("-Unavailable in M3") === true)
		{
			return value.replace('-Unavailable in M3','');
		}
		else if(value.includes("-") === true)
		{
			var arr = value.split("-");      
			var lastVal = arr.pop();
			var newval =  value.replace('-'+lastVal,'');
	
			return newval;
		}
		else
		{
			return value;
		}
	}
	
		return {
			' NewLine':line['NewLine'],
			' BOMCategory *': line['BOMCategory'],//changed from Main category
			' RMProcurementGroup *': line['RMProcurementGroup'],
			' M3Item Code': line['M3Item Code'],
			' HierarchyLevel1': line['HierarchyLevel1'],
			' HierarchyLevel2': line['HierarchyLevel2'],
			' HierarchyLevel3': line['HierarchyLevel3'],
			' HierarchyLevel4': line['HierarchyLevel4'],
			' HierarchyLevel5': line['HierarchyLevel5'],
			' RM Width': line['RM Width'],
			' SupplierItemNo *': line['SupplierItemNo'],
			' Comment': line['Comment'],
			' ItemName *': line['ItemName'],
			' ItemDescription *': line['ItemDescription'],
			' BrandCategory *': line['Brand Category'],
			' GMTColor': GMTcolor(line['GMTColor']),
			' GMTZOption': line['GMTZOption'],
			' GMTSize': line['GMTSize'],
			' RMZOption': line['RMZOption'],
			' RMColor': GMTcolor(line['RMColor']),
			' RMSize': line['RMSize'],
			' YY *': line['YY'],
			' Wastage %*': line['Wastage %'],
			' SupplierNominationStatus': line['SupplierNominationStatus'],
			' SKUUOM *': line['SKU UOM'],
			' PurchaseUOM *': line['Purchase UOM'],
			' Conversion': line['Conversion'],
			' PurchasePrice *': line['PurchasePrice'],
			' Freight': line['Freight'],
			' TC': line['TC'],
			' MOQ': line['MOQ'],
			' OrderMultiple': line['OrderMultiple'],
			' TimeHorizon': line['TimeHorizon'],
			' SupplierTolarance': line['SupplierTolarance'],
			' Supplier': line['Supplier'],
			' ManLeadTime *': line['ManLeadTime'],
			' ModeOfShipment *': line['ModeOfShipment'],
			' RMDeliveryTerm *': line['RMDeliveryTerm'],
			' SourcingMerchant *': line['SourcingMerchant'],
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
		[' Style Number', newStyleno],
		[' VERSION ID','01'],
		[' Garment Item Description', selectedStyleData.MASTSTYLEDESC,],
		[' Lead Factory', leadFactory,],
		[' Buyer', 'MAST INDUSTRIES INC-MAS00468'],
		[' Buyer Division', M3buyerDivision],
		[' Group Tech Class', grouptechclass],
		[' Season', season],
		[' Product Group', productGroup],
		[' Merchandiser', merchandiser],
		[' Planner', planner],
		[' Garment Fabric Composition',garmentComposition],
		[' Style Categorization', 'RM PURCHASED FOR A CONFIRMED ORDER-O'],
		[],
		[
			' NewLine',
			' ProductionWarehouse *',
			' Destination *',
			' CustomerStyleNo *',
			' RequestedDeliveryDateCustomer *',
			' RequestedDeliveryDatePlanner *',
			' FOBDate',
			' NDCDate',
			' PCDDate',
			' Color *', //Added by Rushan
			' VPONo *',
			' CPONo *',
			' DeliveryMethod *',
			' SalesPrice *',
			' DeliveryTerm *',
			' PackMethod *',
			' ZOption *',// FTR to Option
			' TotalQuantity',
			' XXS',
			' XS',
			' SMALL',
			' MED',
			' LARGE',
			' XL',
			' XXL',
			' XXXL',
			' CO Number',
		],
	];
	return template;
};

export const COTblDataPink = (
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
		[' Style Number', newStyleno],
		[' VERSION ID','01'],
		[' Garment Item Description', selectedStyleData.MASTSTYLEDESC,],
		[' Lead Factory', leadFactory,],
		[' Buyer', 'MAST INDUSTRIES INC-MAS00468'],
		[' Buyer Division', M3buyerDivision],
		[' Group Tech Class', grouptechclass],
		[' Season', season],
		[' Product Group', productGroup],
		[' Merchandiser', merchandiser],
		[' Planner', planner],
		[' Garment Fabric Composition',garmentComposition],
		[' Style Categorization', 'RM PURCHASED FOR A CONFIRMED ORDER-O'],
		[],
		[
			' NewLine',
			' ProductionWarehouse *',
			' Destination *',
			' CustomerStyleNo *',
			' RequestedDeliveryDateCustomer *',
			' RequestedDeliveryDatePlanner *',
			' FOBDate',
			' NDCDate',
			' PCDDate',
			' Color *', //Added by Rushan
			' VPONo *',
			' CPONo *',
			' DeliveryMethod *',
			' SalesPrice *',
			' DeliveryTerm *',
			' PackMethod *',
			' ZOption *',// FTR to Option
			' TotalQuantity',
			' XS',
			' S',
			' M',
			' L',
			' XL',
			' XXL',
			' CO Number',
		],
	];
	return template;
};

export const COTblData_Aritzia = (
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
		[' Style Number', newStyleno],
		[' VERSION ID','01'],
		[' Garment Item Description', selectedStyleData.MASTSTYLEDESC,],
		[' Lead Factory', leadFactory,],
		[' Buyer', 'MAST INDUSTRIES INC-MAS00468'],
		[' Buyer Division', M3buyerDivision],
		[' Group Tech Class', grouptechclass],
		[' Season', season],
		[' Product Group', productGroup],
		[' Merchandiser', merchandiser],
		[' Planner', planner],
		[' Garment Fabric Composition',garmentComposition],
		[' Style Categorization', 'RM PURCHASED FOR A CONFIRMED ORDER-O'],
		[],
		[
			' NewLine',
			' ProductionWarehouse *',
			' Destination *',
			' CustomerStyleNo *',
			' RequestedDeliveryDateCustomer *',
			' RequestedDeliveryDatePlanner *',
			' FOBDate',
			' NDCDate',
			' PCDDate',
			' Color *', //Added by Rushan
			' VPONo *',
			' CPONo *',
			' DeliveryMethod *',
			' SalesPrice *',
			' DeliveryTerm *',
			' PackMethod *',
			' ZOption *',// FTR to Option
			' TotalQuantity',
			' ',
			' ',
			' ',
			' ',
			' ',
			' ',
			' ',
			' ',
			' ',
			' ',
			' ',
		],
	];
	return template;
};

export const COTblData_Pvhtommy = (
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
		[' Style Number', newStyleno],
		[' VERSION ID','01'],
		[' Garment Item Description', selectedStyleData.MASTSTYLEDESC,],
		[' Lead Factory', leadFactory,],
		[' Buyer', 'PVH CORP.'],
		[' Buyer Division', M3buyerDivision],
		[' Group Tech Class', grouptechclass],
		[' Season', season],
		[' Product Group', productGroup],
		[' Merchandiser', merchandiser],
		[' Planner', planner],
		[' Garment Fabric Composition',garmentComposition],
		[' Style Categorization', 'RM PURCHASED FOR A CONFIRMED ORDER-O'],
		[],
		[
			' NewLine',
			' ProductionWarehouse *',
			' Destination *',
			' CustomerStyleNo *',
			' RequestedDeliveryDateCustomer *',
			' RequestedDeliveryDatePlanner *',
			' FOBDate',
			' NDCDate',
			' PCDDate',
			' Color *', //Added by Rushan
			' VPONo *',
			' CPONo *',
			' DeliveryMethod *',
			' SalesPrice *',
			' DeliveryTerm *',
			' PackMethod *',
			' ZOption *',// FTR to Option
			' TotalQuantity',
			' 1X',
			' 2X',
			' 3X',
			' XXS',
			' XS',
			' S',
			' M',
			' L',
			' XL',
			' 2XL',
			' CO Number',
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
