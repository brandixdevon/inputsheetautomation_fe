import { getLeadTimeBySupplier } from './matrices/leadTime';
import { getModeBySupplier } from './matrices/shipmentMode';
import { getMerchByProdCode } from './matrices/sourcingMerch';
import { getOneSupplier } from './matrices/supplier';
import { getWastageByProdCode } from './matrices/wastage';

export const validatePacking = async (
	ccSheet: any[],
	supplierSheet: any[],
	packNo: number | undefined
) => {
	const materialIDList: string[] = [];

	//Get RM colors in CC Sheet Headers
	const ccSheetHeaders = Object.keys(ccSheet[0]);
	const RMColorHeaders: string[] = [];
	for (let i = 11; i < ccSheetHeaders.length; i++) {
		RMColorHeaders.push(ccSheetHeaders[i]);
	}

	//Form the Unique Material ID list from  Sheet
	const uniqCCSheet = ccSheet.filter((item) => {
		if (item['Material Id'] !== '') {
			//Add Material ID to list
			materialIDList.push(item['Material Id'].toString().trim().toUpperCase());

			return item;
		}
	});

	//Loop through Supplier Inquiry Sheet and get the lines matching to materialIDs (CC sheet)
	if (supplierSheet.length > 0) {
		const packingBOM: any[] = [];
		const refList = supplierSheet.filter((item) => {
			//Break REF # field by '-'
			const refNo = item['Ref #']
				? item['Ref #'].toString().toUpperCase().split('-')
				: [''];

			//Break Brand Ref by '-'
			const brandRefFull = item[`BRAND'S UNIQUE REFERENCE  `]
				? item[`BRAND'S UNIQUE REFERENCE  `].toString().toUpperCase().split('-')
				: [];

			//Break first part of Brand Ref by ','
			const brandRefList =
				brandRefFull.length > 0 ? brandRefFull[0].split(',') : [''];

			let brandRef: boolean = false;
			//Check if Brand Ref is in Material ID
			brandRefList.forEach((item: string) => {
				brandRef = brandRef === true ? true : materialIDList.includes(item);
			});

			//Return lines if Ref No is in Material ID or Brand Ref is in Material ID
			if (materialIDList.includes(refNo[0]) || brandRef) {
				return item;
			}
		});

		//Add list to Packing BOM
		const addToBOM = (newRow: any, color: string) => {
			if (!color.toUpperCase().includes('N/A')) {
				const clonedArr = JSON.parse(JSON.stringify(newRow));
				clonedArr[10] = color; //Add RM Color
				packingBOM.push(clonedArr); //Add new line to BOm
			}
		};

		//Loop through filtered Supplier Inquiry Lines
		for (let i in refList) {
			const item = refList[i];

			//Split Ref #by '-'
			const refNo = item['Ref #'].toString().split('-');
			//Get matcing line from CC chart based on Material ID/Ref#
			const CCLine = uniqCCSheet.find(
				(ccItem) =>
					(item['Ref #']
						? item['Ref #'].includes(
								ccItem['Material Id'].toString().trim().toUpperCase()
						  )
						: false) ||
					(item[`BRAND'S UNIQUE REFERENCE  `]
						? item[`BRAND'S UNIQUE REFERENCE  `].includes(
								ccItem['Material Id'].toString().trim().toUpperCase()
						  )
						: false)
			);

			//Get Consumption based on Pack No
			const consumptionNo =
				packNo !== undefined && packNo !== 0 && CCLine['Material Id']
					? CCLine['Material Id'] === 'LB 4650'
						? (1 / packNo) * 2
						: 1 / packNo
					: '';
			console.log(item);
			//Get Purchase Price based on Unit Price
			let prices: any,
				price: any = '';
			const priceArr = item['Unit Price'].trim().slice(1).split(' ');
			if (priceArr[7] !== undefined) {
				prices = priceArr[7].split('-');
				price = prices[1] !== undefined ? parseFloat(prices[1].slice(1)) : '';
			} else {
				prices = priceArr[0].split('/');
				price = prices[1] ? prices[0] / prices[1] : prices[0];
			}

			//Get supplier name based on the code from the supplier inquiry sheet
			const supplierCode = item['Supplier']
				.toString()
				.toUpperCase()
				.trim()
				.split('/');

			//Get Supplier based on code
			const resSupplier = await getOneSupplier(supplierCode[0]).catch((err) =>
				console.error(err)
			);
			//Get Lead time based on supplier code
			const resLeadTime = await getLeadTimeBySupplier(
				supplierCode[0]
			).catch((err) => console.error(err));
			//Get Shipment Mode based on supplier code
			const resMode = await getModeBySupplier(supplierCode[0]).catch((err) =>
				console.error(err)
			);

			//Get Product code from RM Product Group
			const prodCode = item[`Fall'21 Onwards`]
				.toString()
				.toUpperCase()
				.split('-');

			//Get Sourcing Merchant based on Product code
			const resMerchant = await getMerchByProdCode(
				prodCode[0].trim()
			).catch((err) => console.error(err));

			//Get Wastage based on Product Code
			const resWastage = await getWastageByProdCode(
				prodCode[0].trim()
			).catch((err) => console.error(err));

			//Add BOM field values
			const MainCategory = 'PTRIM - Packing Trim';
			const RMProductGroup = item[`Fall'21 Onwards`];
			const ItemCode = '';
			const ItemName: string =
				item[`BRAND'S UNIQUE REFERENCE  `] === ''
					? item['Ref #']
					: CCLine
					? `${CCLine['Material Id']}-${refNo[0]}`
					: '';
			const ItemDesc =
				item[`BRAND'S UNIQUE REFERENCE  `] === ''
					? item['Ref #']
					: CCLine
					? `${CCLine['Material Id']}-${refNo[0]}`
					: '';
			const BrandCategory = '';
			const GarmentZFTR = 'All';
			const GarmentColor = 'All';
			const GarmentSize = 'All';
			const RMZFTR = '';
			const RMColor = '';
			const RMSize =
				refNo[2] && refNo[2].toUpperCase().trim() === 'INSERT' ? 'XS' : '';
			const Consumption = consumptionNo;
			const Wastage = resWastage !== undefined ? resWastage.wastage : '';
			const SKUUOM = 'PCS - Pieces';
			const PurchaseUOM = 'PCS - Pieces';
			const Conversion = '';
			const Costingprice = '';
			const Purchaseprice = price;
			const HierarchyLevel1 = '';
			const HierarchyLevel2 = '';
			const HierarchyLevel3 = '';
			const HierarchyLevel4 = '';
			const HierarchyLevel5 = '';
			const RMWidth = '';
			const Freight = 0;
			const TC = '';
			const MOQ = '';
			const ORDER_MULTIPLE = '';
			const Item_Horizon_for_Demand_Consolidation = 21;
			const SupplierTolarance = 0;
			const Supplier = resSupplier !== undefined ? resSupplier.name : '';
			const ManufacturingLeadTime =
				resLeadTime !== undefined ? resLeadTime.leadTime : '';
			const ModeOfShipment = resMode !== undefined ? resMode.mode : '';
			const DeliveryTerms = 'FCA - Free Carrier';
			const SourcingMerchant =
				resMerchant !== undefined ? resMerchant.merchant : '';
			const SupplierNomination = '';
			const SupplierItemNo = '';
			const InspectionRequiredNotRequired = '';
			const Placement = '';
			const COQuantity = '';
			const Color_Wise_CO_Qty = '';
			const Usage = '';
			const Requirement = '';
			const CategoryColor = '';
			const Cost = '';
			const RowNo = '';

			const itemName30Chars =
				ItemName.length > 30 ? ItemName.slice(0, 31) : ItemName;
			const ItemDesc60Chars =
				ItemDesc.length > 60 ? ItemDesc.slice(0, 61) : ItemDesc;

			//Create New Array with BOM Details
			const rowToAdd = [
				MainCategory,
				RMProductGroup,
				ItemCode,
				itemName30Chars,
				ItemDesc60Chars,
				BrandCategory,
				GarmentZFTR,
				GarmentColor,
				GarmentSize,
				RMZFTR,
				RMColor,
				RMSize,
				Consumption,
				Wastage,
				SKUUOM,
				PurchaseUOM,
				Conversion,
				Costingprice,
				Purchaseprice,
				HierarchyLevel1,
				HierarchyLevel2,
				HierarchyLevel3,
				HierarchyLevel4,
				HierarchyLevel5,
				RMWidth,
				Freight,
				TC,
				MOQ,
				ORDER_MULTIPLE,
				Item_Horizon_for_Demand_Consolidation,
				SupplierTolarance,
				Supplier,
				ManufacturingLeadTime,
				ModeOfShipment,
				DeliveryTerms,
				SourcingMerchant,
				SupplierNomination,
				SupplierItemNo,
				InspectionRequiredNotRequired,
				Placement,
				COQuantity,
				Color_Wise_CO_Qty,
				Usage,
				Requirement,
				CategoryColor,
				Cost,
				RowNo,
			];

			//Add new line to Packing BOM array after adding RM Color
			if (RMColorHeaders.length > 0) {
				//Check if 1 RM Color or RM Color values equal
				if (RMColorHeaders.length === 1) {
					addToBOM(rowToAdd, CCLine[RMColorHeaders[0]]);
				} else {
					//Add first row details
					addToBOM(rowToAdd, CCLine[RMColorHeaders[0]]);
					//Add multiple rows for unsimilar RM Colors
					for (let i = 1; i < RMColorHeaders.length; i++) {
						if (
							CCLine[RMColorHeaders[i - 1]].toString().toUpperCase().trim() !==
							CCLine[RMColorHeaders[i]].toString().toUpperCase().trim()
						) {
							addToBOM(rowToAdd, CCLine[RMColorHeaders[i]]);
						}
					}
				}
			} else {
				//Add row with blank RM Color
				packingBOM.push(rowToAdd);
			}
		}
		return packingBOM;
	} else {
		console.log('Supplier Inquiry Sheet Empty');
	}
};
