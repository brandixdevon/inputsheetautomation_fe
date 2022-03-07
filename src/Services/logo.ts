//====LOGO Mappings===========
//Get Destination based on destination in OTR
export const getDestinationLogo = (
	destination: string,
	qtyS: number,
	qtyL: number
) => {
	const destCode = destination ? destination.trim().substring(0, 3) : '';
	return destCode === 'GLP'
		? 'CN01'
		: destCode === 'DC6'
		? 'USA06'
		: destCode === 'DC5'
		? 'USA02'
		: destCode === 'DC2'
		? 'USA05'
		: destCode === 'DC4' && qtyS === 1 && qtyL && 1
		? 'USA04'
		: destCode === 'DC4'
		? 'USA03'
		: '';
};

//Get Pack Method based on Dept#, Customer code and order qty
export const getPackMethodLogo = (
	dept: number,
	cusCode: number,
	qtyS: number,
	qtyL: number,
	zFtr: string
) => {
	const packCodes = zFtr.trim().split('-');
	if (dept && cusCode) {
		return dept === 222
			? cusCode === 1104
				? packCodes[0].toUpperCase() === 'PACK'
					? packCodes[1] === '3'
						? '3 Pcs per pack'
						: packCodes[1] === '4'
						? '4 Pcs per pack'
						: packCodes[1] === '5'
						? '5 Pcs per pack'
						: packCodes[1] === '7'
						? '7 Pcs per pack'
						: ''
					: qtyS === 2
					? 'SIN-Single pc packing'
					: qtyS === 1 && qtyL === 1
					? 'SIN-Single pc packing'
					: 'SIN-Single pc packing'
				: cusCode === 1108
				? packCodes[0].toUpperCase() === 'PACK'
					? packCodes[1] === '5'
						? '5 PCS PER PACK'
						: ''
					: qtyS === 9
					? 'PLG-Polybag Packing'
					: qtyS === 1 && qtyL === 1
					? 'SIN-Single pc packing'
					: '30P-30 pcs per 1 poly bag'
				: cusCode === 1235
				? '30P-30 pcs per 1 poly bag'
				: cusCode === 1283
				? '30P-30 pcs per 1 poly bag'
				: ''
			: dept === 252
			? cusCode === 1104
				? packCodes[0].toUpperCase() === 'PACK'
					? packCodes[1] === '3'
						? '3 Pcs per pack'
						: packCodes[1] === '4'
						? '4 Pcs per pack'
						: packCodes[1] === '5'
						? '5 Pcs per pack'
						: packCodes[1] === '7'
						? '7 Pcs per pack'
						: ''
					: qtyS === 2
					? 'SIN-Single pc packing'
					: qtyS === 1 && qtyL === 1
					? 'SIN-Single pc packing'
					: 'SIN-Single pc packing'
				: cusCode === 1108
				? packCodes[0].toUpperCase() === 'PACK'
					? packCodes[1] === '5'
						? '5 PCS PER PACK'
						: ''
					: qtyS === 9
					? 'PLG-Polybag Packing'
					: qtyS === 1 && qtyL === 1
					? 'SIN-Single pc packing'
					: '30P-30 pcs per 1 poly bag'
				: cusCode === 1235
				? '30P-30 pcs per 1 poly bag'
				: cusCode === 1283
				? '30P-30 pcs per 1 poly bag'
				: ''
			: dept === 281
			? cusCode === 1104
				? packCodes[0].toUpperCase() === 'PACK'
					? packCodes[1] === '3'
						? '3 Pcs per pack'
						: packCodes[1] === '4'
						? '4 Pcs per pack'
						: packCodes[1] === '5'
						? '5 Pcs per pack'
						: packCodes[1] === '7'
						? '7 Pcs per pack'
						: ''
					: qtyS === 2
					? 'SIN-Single pc packing'
					: qtyS === 1 && qtyL === 1
					? 'SIN-Single pc packing'
					: 'SIN-Single pc packing'
				: cusCode === 1108
				? packCodes[0].toUpperCase() === 'PACK'
					? packCodes[1] === '5'
						? '5 PCS PER PACK'
						: ''
					: qtyS === 9
					? 'PLG-Polybag Packing'
					: qtyS === 1 && qtyL === 1
					? 'SIN-Single pc packing'
					: '30P-30 pcs per 1 poly bag'
				: cusCode === 1235
				? '30P-30 pcs per 1 poly bag'
				: cusCode === 1283
				? '30P-30 pcs per 1 poly bag'
				: ''
			: dept === 283
			? cusCode === 1104
				? packCodes[0].toUpperCase() === 'PACK'
					? packCodes[1] === '3'
						? '3 Pcs per pack'
						: packCodes[1] === '4'
						? '4 Pcs per pack'
						: packCodes[1] === '5'
						? '5 Pcs per pack'
						: packCodes[1] === '7'
						? '7 Pcs per pack'
						: ''
					: qtyS === 2
					? 'SIN-Single pc packing'
					: qtyS === 1 && qtyL === 1
					? 'SIN-Single pc packing'
					: 'SIN-Single pc packing'
				: cusCode === 1108
				? packCodes[0].toUpperCase() === 'PACK'
					? packCodes[1] === '5'
						? '5 PCS PER PACK'
						: ''
					: qtyS === 9
					? 'PLG-Polybag Packing'
					: qtyS === 1 && qtyL === 1
					? 'SIN-Single pc packing'
					: '30P-30 pcs per 1 poly bag'
				: cusCode === 1235
				? '30P-30 pcs per 1 poly bag'
				: cusCode === 1283
				? '30P-30 pcs per 1 poly bag'
				: ''
			: dept === 285
			? cusCode === 1104
				? packCodes[0].toUpperCase() === 'PACK'
					? packCodes[1] === '3'
						? '3 Pcs per pack'
						: packCodes[1] === '4'
						? '4 Pcs per pack'
						: packCodes[1] === '5'
						? '5 Pcs per pack'
						: packCodes[1] === '7'
						? '7 Pcs per pack'
						: ''
					: qtyS === 2
					? 'SIN-Single pc packing'
					: qtyS === 1 && qtyL === 1
					? 'SIN-Single pc packing'
					: 'SIN-Single pc packing'
				: cusCode === 1108
				? packCodes[0].toUpperCase() === 'PACK'
					? packCodes[1] === '5'
						? '5 PCS PER PACK'
						: ''
					: qtyS === 9
					? 'PLG-Polybag Packing'
					: qtyS === 1 && qtyL === 1
					? 'SIN-Single pc packing'
					: '30P-30 pcs per 1 poly bag'
				: cusCode === 1235
				? '30P-30 pcs per 1 poly bag'
				: cusCode === 1283
				? '30P-30 pcs per 1 poly bag'
				: ''
			: '';
	}
};

//Get Garment Composition based on Dept #
export const getGmtCompositionLogo = (dept: number) => {
	if (dept) {
		return dept === 222
			? 'PO82EL18-82% POLYAMIDE 18% ELASTANE'
			: dept === 252
			? '86PLY14SPX-86%POLY 14%SPANDEX'
			: dept === 281 || dept === 283
			? 'PO8020ELA-80%POLYAMIDE20%ELASTANE'
			: dept === 285
			? 'CT57MD3SP5-57% Cotton 38% Modal 5% Spdex'
			: '';
	}
};

//Get Buyer Division Name based on Dept#, Customer code and buy strategy
export const getBuyerDivisionLogo = (
	dept: number,
	cusCode: number,
	buyStrategyOTR: string
) => {
	const buyStrategy = buyStrategyOTR
		? buyStrategyOTR.toString().trim().toUpperCase()
		: '';
	if (dept && cusCode) {
		return dept === 222
			? cusCode === 1104
				? buyStrategy === 'P-02W-A'
					? 'V05-BEL_LBRANDS_VS_WOMENS_INSTANT-VSD'
					: 'V05-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSD'
				: cusCode === 1108
				? buyStrategy === 'P-02W-A'
					? 'V17-BEL_LBRANDS_VS_WOMENS_INSTANT-VSS'
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: cusCode === 1235
				? buyStrategy === 'P-02W-A'
					? ''
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: cusCode === 1283
				? buyStrategy === 'P-02W-A'
					? ''
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: ''
			: dept === 252
			? cusCode === 1104
				? buyStrategy === 'P-02W-A'
					? 'V05-BEL_LBRANDS_VS_WOMENS_INSTANT-VSD'
					: 'V05-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSD'
				: cusCode === 1108
				? buyStrategy === 'P-02W-A'
					? 'V17-BEL_LBRANDS_VS_WOMENS_INSTANT-VSS'
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: cusCode === 1235
				? buyStrategy === 'P-02W-A'
					? ''
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: cusCode === 1283
				? buyStrategy === 'P-02W-A'
					? ''
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: ''
			: dept === 281
			? cusCode === 1104
				? buyStrategy === 'P-02W-A'
					? 'V05-BEL_LBRANDS_VS_WOMENS_INSTANT-VSD'
					: 'V05-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSD'
				: cusCode === 1108
				? buyStrategy === 'P-02W-A'
					? 'V17-BEL_LBRANDS_VS_WOMENS_INSTANT-VSS'
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: cusCode === 1235
				? buyStrategy === 'P-02W-A'
					? ''
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: cusCode === 1283
				? buyStrategy === 'P-02W-A'
					? ''
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: ''
			: dept === 283
			? cusCode === 1104
				? buyStrategy === 'P-02W-A'
					? 'V05-BEL_LBRANDS_VS_WOMENS_INSTANT-VSD'
					: 'V05-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSD'
				: cusCode === 1108
				? buyStrategy === 'P-02W-A'
					? 'V17-BEL_LBRANDS_VS_WOMENS_INSTANT-VSS'
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: cusCode === 1235
				? buyStrategy === 'P-02W-A'
					? ''
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: cusCode === 1283
				? buyStrategy === 'P-02W-A'
					? ''
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: ''
			: dept === 285
			? cusCode === 1104
				? buyStrategy === 'P-02W-A'
					? 'V05-BEL_LBRANDS_VS_WOMENS_INSTANT-VSD'
					: 'V05-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSD'
				: cusCode === 1108
				? buyStrategy === 'P-02W-A'
					? 'V17-BEL_LBRANDS_VS_WOMENS_INSTANT-VSS'
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: cusCode === 1235
				? buyStrategy === 'P-02W-A'
					? ''
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: cusCode === 1283
				? buyStrategy === 'P-02W-A'
					? ''
					: 'V17-BEL_LBRANDS_VS_WOMENS_BULK-5-FOR-VSS'
				: ''
			: '';
	}
};

//Get Delivery Method based on Confirmed Ship Mode
export const getDeliveryMethodLogo = (shipmode: string) => {
	if (shipmode) {
		return shipmode.toUpperCase() === 'AIR'
			? 'ARC-Air Freight Collect'
			: shipmode.toUpperCase() === 'OCEAN'
			? 'SEA-Sea Freight'
			: '';
	}
};

//Get Warehouse based on Original Fty SAP #
export const getWarehouseLogo = (ftySAP: number) => {
	if (ftySAP) {
		return ftySAP === 36013783
			? 'AIN-Apparel India'
			: ftySAP === 36013779
			? 'ERK-Essentials Rambukkana'
			: '';
	}
};

//Get Leadfactpry based on Warehouse(Original Fty SAP #)
export const getLeadFactoryLogo = (ftySAP: number) => {
	if (ftySAP) {
		return ftySAP === 36013783
			? 'Brandix Intimates Apparel Ltd-130'
			: ftySAP === 36013779
			? '140-Brandix Essentials Limited'
			: '';
	}
};

//Get Planner based on Warehouse(Original Fty SAP #)
export const getPlannerLogo = (ftySAP: number) => {
	if (ftySAP) {
		return ftySAP === 36013783
			? 'BER1157-Deshapriya Thiramunige' // ? 'XXXXXXX-Sasanga'
			: ftySAP === 36013779
			? 'BER1157-Deshapriya Thiramunige'
			: '';
	}
};

//Get Sourcing Merch based on Main Category
export const getSourcingMerchLogo = (prodCategory: string) => {
	const prodCatCode = prodCategory.toUpperCase().split('-');
	if (prodCatCode[0]) {
		return prodCatCode[0].trim() === 'FAB'
			? 'BER2680-Indika Kularanthne'
			: prodCatCode[0].trim() === 'LAC'
			? 'BER2705-Anuradha Senevirathne'
			: prodCatCode[0].trim() === 'BOX' ||
			  prodCatCode[0].trim() === 'DIV' ||
			  prodCatCode[0].trim() === 'ELS' ||
			  prodCatCode[0].trim() === 'LBL' ||
			  prodCatCode[0].trim() === 'MOT' ||
			  prodCatCode[0].trim() === 'PPR' ||
			  prodCatCode[0].trim() === 'PLB' ||
			  prodCatCode[0].trim() === 'STK' ||
			  prodCatCode[0].trim() === 'PLUG' ||
			  prodCatCode[0].trim() === 'TAP'
			? 'BER2718-Menuka Tennakoon'
			: prodCatCode[0].trim() === 'EMB'
			? ' BER664-Manori Goonesekere'
			: prodCatCode[0].trim() === 'THR' || prodCatCode[0].trim() === 'TAG'
			? 'BE1963-Ruvini Ehelamalpe'
			: '';
	}
};

//=========ADD BOM COMMON LINES======
//Add costing item common row
export const costingItemRow = () => {
	return [
		['Costing Only'],
		['Costing Only Charges – E08'],
		[''],
		['CTN/POLY BAG/TAG PIN'],
		['CTN/POLY BAG/TAG PIN'],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		['1'],
		[''],
		['NOS - Numbers'],
		['NOS - Numbers'],
		[''],
		[''],
		['0.006'],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
	];
};

//Add service item common row
export const serviceItemRow = () => {
	return [
		['SERVICE ITEM'],
		['Testing Charges – E04'],
		[''],
		['MTL Garment Testing'],
		['MTL Garment Testing'],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		['1'],
		[''],
		['NOS - Numbers'],
		['NOS - Numbers'],
		[''],
		[''],
		['0.00067'],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
	];
};

//Add OTR Delivery date to BOM RM Color
export const addDelDate = (
	RMColor: string,
	GMTColor: string,
	styles: any[],
	prodGroup:string
) => {
	const colorMatchingRow = styles.find(
		(row) => GMTColor.trim().slice(-4) === row.Color.trim().slice(-4)
	);
	if (colorMatchingRow !== undefined && prodGroup.trim()==='LBL') {
		const dateParts = colorMatchingRow['Requested X-FTY'].split('-');
		const date = new Date(Date.parse(dateParts[1] + ' 1, 2012'));
		let month = '' + (date.getMonth() + 2);
		let year = dateParts[2].trim().slice(-2);
		if (month.length < 2) month = '0' + month;
		console.log(RMColor, month, year)
		return `${RMColor} ${month}/${year}`;
	} else return RMColor;
};
