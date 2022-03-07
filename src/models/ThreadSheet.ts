import { ThreadSummaryInterface } from './ThreadSummary';

export interface ThreadSheetDataInterface {
	MainCategory: string;
	RMProductGroup: string;
	ItemCode: string;
	ItemName: string;
	ItemDescription: string;
	BrandCategory: string;
	GarmentZFTR: string;
	GarmentColor: string;
	GarmentSize: string;
	RMZFTR: string;
	RMColor: string;
	RMSize: string;
	Consumption: number;
	Wastage: string;
	SKUUOM: string;
	PurchaseUOM: string;
	Conversion: string;
	Costingprice: string;
	Purchaseprice: string;
	HierarchyLevel1: string;
	HierarchyLevel2: string;
	HierarchyLevel3: string;
	HierarchyLevel4: string;
	HierarchyLevel5: string;
	RMWidth: string;
	Freight: string;
	TC: string;
	MOQ: string;
	ORDERMULTIPLE: string;
	ItemHorizonforDemandConsolidation: string;
	SupplierTolarance: string;
	Supplier: string;
	ManufacturingLeadTime: number;
	ModeOfShipment: string;
	DeliveryTerms: string;
	SourcingMerchant: string;
	SupplierNomination: string;
	SupplierItemNo: string;
	InspectionRequiredNotRequired: string;
	Placement: string;
	COQuantity: string;
	ColorWiseCOQty: string;
	Usage: string;
	Requirement: string;
	CategoryColor: string;
	Cost: string;
}

enum ItemNamesEnum {
	Anesoft = 'ANESOFT *160S_2500m',
	PERMACORE = 'PERMA CORE *C120_2500m',
	WILDCAT = 'P.EST T160WILD CAT PLUS2500m',
}

enum ItemNamesDescriptionEnum {
	Anesoft = 'SW.THREAD P.EST ANESOFT *160S_2500mm',
	PERMACORE = 'SW.THREAD P.EST PERMA CORE *C120_2500m',
	WILDCAT = 'SW.THREAD P.EST T160 WILD CAT PLUS 2500m',
}

enum BrandNamesEnum {
	Anesoft = 'anesoft',
	PERMACORE = 'perma core',
	WILDCAT = 'wild cat',
	// WILDCAT = 'SW.THREAD P.EST T160 WILD CAT PLUS 2500m',
}

export function getThreadSheetData(
	data: ThreadSummaryInterface[]
): ThreadSheetDataInterface[] {
	let dataToCreate: ThreadSheetDataInterface[] = [];
	data.forEach((element, index) => {
		let temp: ThreadSheetDataInterface;
		const brand = element.Brand.trim().toLowerCase();
		temp = {
			MainCategory: 'STRIM - Sewing Trim',
			RMProductGroup: 'THR - Thread',
			ItemCode: '',
			ItemName:
				brand === BrandNamesEnum.Anesoft
					? ItemNamesEnum.Anesoft
					: brand === BrandNamesEnum.PERMACORE
					? ItemNamesEnum.PERMACORE
					: ItemNamesEnum.WILDCAT,
			ItemDescription:
				brand === BrandNamesEnum.Anesoft
					? ItemNamesDescriptionEnum.Anesoft
					: brand === BrandNamesEnum.PERMACORE
					? ItemNamesDescriptionEnum.PERMACORE
					: ItemNamesDescriptionEnum.WILDCAT,
			BrandCategory: 'Non Brand',
			GarmentZFTR: '',
			GarmentColor: element.GarmentColor,
			GarmentSize: '',
			RMZFTR: '',
			RMColor: element.RMColor,
			RMSize: '',
			Consumption: element.ReqConesPerOrdQty,
			Wastage: '0',
			SKUUOM: 'CON - Cones',
			PurchaseUOM: 'CON - Cones',
			Conversion: '',
			Costingprice:
			brand === BrandNamesEnum.Anesoft?
			element.Supplier.includes('AME15666')
					? element.RMColor.toUpperCase().includes('WHITE 95D1')
						? '0.97'
						: '1.07'
						: element.Supplier.includes('VAR15760')
					? element.RMColor.toUpperCase().includes('WHITE 95D1')
						? '0.94'
						: '1.04'
					: ''
				: brand === BrandNamesEnum.PERMACORE?
				element.Supplier.includes('AME15666')
					? element.RMColor.toUpperCase().includes('WHITE 95D1')
						? '0.98'
						: '1.1'
						: element.Supplier.includes('VAR15760')
					? element.RMColor.toUpperCase().includes('WHITE 95D1')
						? '1.21'
						: '1.34'
					: ''
				: brand === BrandNamesEnum.WILDCAT ?
					element.Supplier.includes('AME15666')
				? element.RMColor.toUpperCase().includes('WHITE 95D1')
					? '0.51'
					: '0.54'
				: element.Supplier.includes('VAR15760')
				? element.RMColor.toUpperCase().includes('WHITE 95D1')
					? '0.53'
					: '0.55'
				: '':'',
			Purchaseprice:
				brand === BrandNamesEnum.Anesoft?
				element.Supplier.includes('AME15666')
						? element.RMColor.toUpperCase().includes('WHITE 95D1')
							? '0.97'
							: '1.07'
							: element.Supplier.includes('VAR15760')
						? element.RMColor.toUpperCase().includes('WHITE 95D1')
							? '0.94'
							: '1.04'
						: ''
					: brand === BrandNamesEnum.PERMACORE?
					element.Supplier.includes('AME15666')
						? element.RMColor.toUpperCase().includes('WHITE 95D1')
							? '0.98'
							: '1.1'
							: element.Supplier.includes('VAR15760')
						? element.RMColor.toUpperCase().includes('WHITE 95D1')
							? '1.21'
							: '1.34'
						: ''
					: brand === BrandNamesEnum.WILDCAT ?
					  element.Supplier.includes('AME15666')
					? element.RMColor.toUpperCase().includes('WHITE 95D1')
						? '0.51'
						: '0.54'
					: element.Supplier.includes('VAR15760')
					? element.RMColor.toUpperCase().includes('WHITE 95D1')
						? '0.53'
						: '0.55'
					: '':'',
			HierarchyLevel1: '',
			HierarchyLevel2: '',
			HierarchyLevel3: '',
			HierarchyLevel4: '',
			HierarchyLevel5: '',
			RMWidth: '',
			Freight: '',
			TC: '',
			MOQ: '',
			ORDERMULTIPLE: '',
			ItemHorizonforDemandConsolidation: '',
			SupplierTolarance: '',
			Supplier: element.Supplier,
			ManufacturingLeadTime: 5,
			ModeOfShipment: 'ROA - Road',
			DeliveryTerms: 'FOB - Free On Board',
			SourcingMerchant: 'BE1963 - Ruvini Ahalapalpe',
			SupplierNomination: 'SN - Sole nominated',
			SupplierItemNo: '',
			InspectionRequiredNotRequired: '',
			Placement: '',
			COQuantity: '',
			ColorWiseCOQty: '',
			Usage: '',
			Requirement: '',
			CategoryColor: '',
			Cost: '',
		};
		dataToCreate.push(temp);
	});
	return dataToCreate;
}

export const OutputData = [
	{ header: 'Main Category', key: 'MainCategory', width: 20 },
	{ header: 'RM Product Group', key: 'RMProductGroup', width: 20 },
	{ header: 'Item Code', key: 'ItemCode', width: 20 },
	{ header: 'Item Name', key: 'ItemName', width: 20 },

	{ header: 'Item Description', key: 'ItemDescription', width: 20 },
	{ header: 'Brand Category', key: 'BrandCategory', width: 20 },
	{ header: 'Garment ZFTR', key: 'GarmentZFTR', width: 20 },
	{ header: 'Garment Color', key: 'GarmentColor', width: 20 },
	{ header: 'Garment Size', key: 'GarmentSize', width: 20 },
	{ header: 'RM ZFTR', key: 'RMZFTR', width: 20 },
	{ header: 'RM Color', key: 'RMColor', width: 20 },
	{ header: 'RM Size', key: 'RMSize', width: 20 },
	{ header: 'Consumption', key: 'Consumption', width: 20 },
	{ header: 'Wastage', key: 'Wastage', width: 20 },
	{ header: 'SKU UOM', key: 'SKUUOM', width: 20 },
	{ header: 'Purchase UOM', key: 'PurchaseUOM', width: 20 },
	{ header: 'Conversion', key: 'Conversion', width: 20 },
	{ header: 'Costingprice', key: 'Costingprice', width: 20 },
	{ header: 'Purchaseprice', key: 'Purchaseprice', width: 20 },
	{ header: 'HierarchyLevel 1', key: 'HierarchyLevel1', width: 20 },
	{ header: 'HierarchyLevel 2', key: 'HierarchyLevel2', width: 20 },
	{ header: 'HierarchyLevel 3', key: 'HierarchyLevel3', width: 20 },
	{ header: 'HierarchyLevel 4', key: 'HierarchyLevel', width: 20 },
	{ header: 'HierarchyLevel 5', key: 'HierarchyLevel5', width: 20 },
	{ header: 'RM Width', key: 'RMWidth', width: 20 },
	{ header: 'Freight', key: 'Freight', width: 20 },
	{ header: 'TC', key: 'TC', width: 20 },
	{ header: 'MOQ', key: 'MOQ', width: 20 },
	{ header: 'ORDER MULTIPLE', key: 'ORDERMULTIPLE', width: 20 },
	{
		header: 'Item Horizon for Demand Consolidation',
		key: 'ItemHorizonforDemandConsolidation',
		width: 30,
	},
	{ header: 'Supplier Tolarance', key: 'SupplierTolarance', width: 20 },
	{ header: 'Supplier', key: 'Supplier', width: 20 },
	{
		header: 'Manufacturing Lead Time',
		key: 'ManufacturingLeadTime',
		width: 20,
	},
	{ header: 'Mode Of Shipment', key: 'ModeOfShipment', width: 20 },
	{ header: 'Delivery Terms', key: 'DeliveryTerms', width: 20 },
	{ header: 'Sourcing Merchant', key: 'SourcingMerchant', width: 20 },
	{ header: 'Supplier Nomination', key: 'SupplierNomination', width: 20 },
	{ header: 'Supplier Item No', key: 'SupplierItemNo', width: 20 },
	{
		header: 'Inspection Required Not Required',
		key: 'InspectionRequiredNotRequired',
		width: 20,
	},
	{ header: 'Placement', key: 'Placement', width: 20 },
	{ header: 'CO Quantity', key: 'COQuantity', width: 20 },
	{ header: 'Color Wise COQty', key: 'ColorWiseCOQty', width: 20 },
	{ header: 'Usage', key: 'Usage', width: 20 },
	{ header: 'Requirement', key: 'Requirement', width: 20 },
	{ header: 'Category Color', key: 'CategoryColor', width: 20 },
	{ header: 'Cost', key: 'Cost', width: 20 },
];
