export interface ThreadSummaryInterface {
	key: number;
	OriginalStyle: string;
	StyleNo: string;
	GarmentColor: string;
	Description: string;
	OrdQty: number;
	Brand: string;
	Tkt: number;
	Shade: string;
	MakeUp: number;
	ReqCones: number;
	ReqConesPerOrdQty: number;
	RMColor: string;
	Supplier: string;
	ZapCode: string;
	Colorcode: string;
}

export const ThreadSummaryHeaderNames = {
	Style: 'Style',
	Description: 'Desctription',
	OrdQty: 'Ord Qty',
	Brand: 'Brand',
	Tkt: 'Tkt',
	Shade: 'Shade',
	MakeUp: 'MakeUp',
	ReqCones: 'Req Cones',
	ReqConesPerOrdQty: 'Req.Cones / Ord.Qty',
};

export function mapExcelDataToThreadSummaryData(
	data
): ThreadSummaryInterface[] {
	let dataToCreate: ThreadSummaryInterface[] = [];
	data.forEach((element, index) => {
		//Split shade by spaces
		const splittedShade =
			element[ThreadSummaryHeaderNames.Shade.toLowerCase()].split(' ');

		//Last 4 characters after the last space is taken
		const ZapCode = splittedShade
			? splittedShade[splittedShade.length - 1]
			: '';

		const OriginalStyle =
			element[ThreadSummaryHeaderNames.Style.toLowerCase()].trim();

		let styleinSheet = element[ThreadSummaryHeaderNames.Style.toLowerCase()];

		const styleFirstPart = styleinSheet
			.substr(0, styleinSheet.indexOf('-'))
			.trim();
		styleinSheet = styleinSheet.substr(styleinSheet.indexOf('-') + 1).trim();
		const styleSecondpart = styleinSheet
			.substr(0, styleinSheet.indexOf('-'))
			.trim();
		styleinSheet = styleinSheet.substr(styleinSheet.indexOf('-') + 1).trim();
		const styleThirdpart = styleinSheet
			.substr(0, styleinSheet.indexOf('-'))
			.trim();
		const styleFourthPart = styleinSheet
			.substr(styleinSheet.indexOf('-') + 1)
			.trim();
		let temp: ThreadSummaryInterface;
		const tempWords = styleFourthPart.split(' ');
		temp = {
			key: index,
			OriginalStyle,
			StyleNo: styleThirdpart,
			GarmentColor: styleFourthPart,
			Colorcode: tempWords[tempWords.length - 1],
			Description: element[ThreadSummaryHeaderNames.Description.toLowerCase()],
			OrdQty: element[ThreadSummaryHeaderNames.OrdQty.toLowerCase()],
			Brand: element[ThreadSummaryHeaderNames.Brand.toLowerCase()],
			Tkt: parseFloat(element[ThreadSummaryHeaderNames.Tkt.toLowerCase()]),
			Shade: element[ThreadSummaryHeaderNames.Shade.toLowerCase()],
			MakeUp: element[ThreadSummaryHeaderNames.MakeUp.toLowerCase()],
			ReqCones: element[ThreadSummaryHeaderNames.ReqCones.toLowerCase()],
			ReqConesPerOrdQty:
				element[ThreadSummaryHeaderNames.ReqConesPerOrdQty.toLowerCase()],
			RMColor: '',
			Supplier:
				styleFirstPart.toUpperCase() === 'B1'
					? 'VAR15760 - Vardhman Yarns and Threads Ltd'
					: styleFirstPart.toUpperCase() === 'BERA'
					? 'AME15666 - A & E Lanka'
					: '',
			ZapCode,
		};
		dataToCreate.push(temp);
	});
	return dataToCreate;
}

export function getRmColorData(
	data: ThreadSummaryInterface[],
	rmData
): ThreadSummaryInterface[] {
	let dataToSend = [...data];
	dataToSend.forEach((element) => {
		const { ZapCode } = element;
		const matchingFGRow = rmData.find(
			(r) => r.zapCodeRmSheet.trim() === ZapCode.toLowerCase()
		);
		if (matchingFGRow) {
			const color = matchingFGRow.color.trim().split(' ');
			element.RMColor = `${color[0]}-${matchingFGRow.shade}`;
		}
	});
	return dataToSend;
}

export interface ThreadInterface {
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
	Consumption: string;
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
	ManufacturingLeadTime: string;
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
