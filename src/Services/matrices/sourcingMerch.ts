import { baseUrl } from '../../utils/baseUrl';

export const getAllSourcingMerchs = async () => {
	const response = await fetch(baseUrl + 'sourcingMerch/getAll', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

export const getOneSourcingMerch = async (id: number) => {
	const response = await fetch(baseUrl + 'sourcingMerch/getOne', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

export const getMerchByProdCode = async (code: string) => {
	const response = await fetch(baseUrl + 'sourcingMerch/getByProdCode', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ code }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

export const addSourcingMerch = async (
	merchant: string,
	productGroupCode: string,
	productGroupDesc: string
) => {
	const response = await fetch(baseUrl + 'sourcingMerch/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ merchant, productGroupCode, productGroupDesc }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

export const editsourcingMerch = async (
	id: number,
	merchant: string,
	productGroupCode: string,
	productGroupDesc: string
) => {
	const response = await fetch(baseUrl + 'sourcingMerch/edit', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id, merchant, productGroupCode, productGroupDesc }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

export const deletesourcingMerch = async (id: number) => {
	const response = await fetch(baseUrl + 'sourcingMerch/delete', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};
