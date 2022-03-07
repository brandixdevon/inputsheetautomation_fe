import { baseUrl } from '../utils/baseUrl';

export const getMerchandiser = async (value) => {
	const response = await fetch(baseUrl + 'merchandisers/' + value);
	const merchandisers = await response.json();
	return merchandisers;
};

export const getMerchandiserDetail = async (value) => {
	const response = await fetch(baseUrl + 'merchandisers/details/' + value);
	const merchandisers = await response.json();
	return merchandisers;
};

export const getPlanners = async (value) => {
	const response = await fetch(baseUrl + 'planners/' + value);
	const planners = await response.json();
	return planners;
};

export const getPlannersDetail = async (value) => {
	const response = await fetch(baseUrl + 'planners/details/' + value);
	const planners = await response.json();
	return planners;
};

export const getLeadFactories = async () => {
	const response = await fetch(baseUrl + 'leadfactory');
	const LeadFactories = await response.json();
	return LeadFactories;
};

export const getLeadFactoriesDetail = async (value) => {
	const response = await fetch(baseUrl + 'leadfactory/details/' + value);
	const LeadFactories = await response.json();
	return LeadFactories;
};

export const getBuyerDivisions = async (value) => {
	const response = await fetch(baseUrl + 'buyerDivision/' + value);
	const BuyerDivisions = await response.json();
	return BuyerDivisions;
};

export const getBuyerDivisionsDetail = async (value) => {
	const response = await fetch(baseUrl + 'buyerDivision/details/' + value);
	const BuyerDivisions = await response.json();
	return BuyerDivisions;
};

export const getM3BuyerDivisions = async (value) => {
	const response = await fetch(baseUrl + 'm3buyerdivision/' + value);
	const M3BuyerDivisions = await response.json();
	return M3BuyerDivisions;
};

export const getM3BuyerDivisionDetail = async (value) => {
	const response = await fetch(baseUrl + 'm3buyerdivision/details/' + value);
	const M3BuyerDivisions = await response.json();
	return M3BuyerDivisions;
};

export const getGarmentCompositions = async (value) => {
	const response = await fetch(baseUrl + 'garmentComposition/' + value);
	const GarmentCompositions = await response.json();
	return GarmentCompositions;
};

export const getGarmentCompositionsDetail = async (value) => {
	const response = await fetch(baseUrl + 'garmentComposition/details/' + value);
	const GarmentCompositions = await response.json();
	return GarmentCompositions;
};

export const getWarehouses = async (value) => {
	const response = await fetch(baseUrl + 'warehouse/' + value);
	const Warehouses = await response.json();
	return Warehouses;
};

export const getWarehousesDetail = async (value) => {
	const response = await fetch(baseUrl + 'warehouse/details/' + value);
	const Warehouses = await response.json();
	return Warehouses;
};

export const getStyleList = async (year, type) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ year: year, type: type }),
	};
	const data = await fetch(
		baseUrl + 'inputSheet/getVSStylesFromEpixo',
		requestOptions
	);

	return data;
};

export const getBOMVersions = async (styleId) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ styleId: styleId }),
	};
	const bomversionsresponse = await fetch(
		baseUrl + 'inputSheet/getBOMVersionFromEpixo',
		requestOptions
	);

	return bomversionsresponse;
};

export const getBOMandColorData = async (StyleID, BOMID) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ StyleID: StyleID, BOMID: BOMID }),
	};
	const response = await fetch(
		baseUrl + 'inputSheet/getBOMAndColorData',
		requestOptions
	);
	return response;
};

export const getBOM = async (StyleID, BOMID) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ StyleID: StyleID, BOMID: BOMID }),
	};
	const response = await fetch(
		baseUrl + 'inputSheet/getBOM', requestOptions
		);
	return response;
};

export const getRmColorThread = async (isPink: boolean) => {
	const response = await fetch(baseUrl + 'threadSheet/rmColor', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ isPink }),
	});
	return response;
};

//Get SMV for Ops To Track for PINK and LOGO
export const getSMV = async (styleid: number, bomid: number) => {
	const response = await fetch(baseUrl + 'inputSheet/getSMV', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ 'StyleID' : styleid, 'BOMID' : bomid }),
	});

	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Add SMV to Ops to Track
export const addSMV = (opsData: any[], smv: any[]) => {
	const newOpsData = JSON.parse(JSON.stringify(opsData));

	for (let i = 0, j = 2; i < smv.length; i++, j = j + 2) {
		newOpsData[0][j] = smv[i].Name;
		newOpsData[0][j + 1] = '';
		newOpsData[1][j] = 'BAL';
		newOpsData[1][j + 1] = 'Facility';
		newOpsData[2][j] = smv[i].SMV_Facility;
		newOpsData[2][j + 1] = smv[i].SMV_Facility;
	}

	return newOpsData;
};
