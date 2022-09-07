import { baseUrl } from '../utils/baseUrl';

export const getDeliveryMethodPink = (shipmode: string) => {
	if (shipmode) {
		return shipmode.toUpperCase() === 'AIR'
			? 'ARC' // Changed 'ARC-Air Freight Collect' to AIR FREIGHT-AIR 
			: shipmode.toUpperCase() === 'OCEAN'
			? 'SEA'
			: shipmode.toUpperCase() === 'FACTORY AIR'
			? 'ARP'
			: '';
	}
};

export const getZFtrPink = (shipToName: string) => {
	const shipToNameCode = shipToName.trim().slice(0, 3);
	if (shipToName) {
		return shipToNameCode === 'DC4'
			? 'BULK1'
			: shipToNameCode === 'DC5'
			? 'BULK2'
			: shipToNameCode === 'DC6'
			? 'BULK3'
			: shipToNameCode === 'GLP'
			? 'CHINA1'
			: '';
	}
};

export const getShiptoAritzia = (shipToName: string) => {
	
	if (shipToName) {
		return shipToName === 'DC01'
			? 'CAN01'
			: shipToName === 'DC03'
			? 'CAN02'
			: shipToName === 'DV05'
			? 'US01'
			: '';
	}
};


export const getSeasonPink = (seasonCode: string) => {
	if (seasonCode) {
		const code = seasonCode.slice(0, 2);
		const year = seasonCode.slice(-2);

		return code.toUpperCase() === 'SU'
			? `${seasonCode.toUpperCase()}-SUMMER ${year}`
			: code.toUpperCase() === 'SP'
			? `${seasonCode.toUpperCase()}-SPRING ${year}`
			: code.toUpperCase() === 'HO'
			? `${seasonCode.toUpperCase()}-HOLIDAY ${year}`
			: code.toUpperCase() === 'FL'
			? `${seasonCode.toUpperCase()}-FALL ${year}`
			: '';
	}
};

export const getSeasonAritzia = (seasonCode: string) => {
	const code = seasonCode.substr(seasonCode.length - 5);;
		const year = seasonCode.substr(seasonCode.length - 2); 
		
		return code.includes('SU') === true
			? `SUMMER ${year}-SU${year}`
			: code.includes('SP') === true
			? `SPRING ${year}-SP${year}`
			: code.includes('FA') === true
			? `FALL ${year}-FA${year}`
			: code.includes('WI') === true
			? `WINTER ${year}-WI${year}`
			: '';
};

export const getFOB = async (styleid: number, bomid: number) => {
	const response = await fetch(baseUrl + 'inputSheet/getFOB', {
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
