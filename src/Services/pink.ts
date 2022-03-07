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
