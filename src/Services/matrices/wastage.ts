import { baseUrl } from '../../utils/baseUrl';

export const getAllWastages = async () => {
	const response = await fetch(baseUrl + 'wastage/getAll', {
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

export const getOneWastage = async (id: number) => {
	const response = await fetch(baseUrl + 'wastage/getOne', {
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

export const getWastageByProdCode = async (code: string) => {
	const response = await fetch(baseUrl + 'wastage/getByProdCode', {
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

export const addWastage = async (
	wastage: string,
	productGroupCode: string,
	productGroupDesc: string
) => {
	const response = await fetch(baseUrl + 'wastage/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ wastage, productGroupCode, productGroupDesc }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

export const editWastage = async (
	id: number,
	wastage: string,
	productGroupCode: string,
	productGroupDesc: string
) => {
	const response = await fetch(baseUrl + 'wastage/edit', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id, wastage, productGroupCode, productGroupDesc }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

export const deleteWastage = async (id: number) => {
	const response = await fetch(baseUrl + 'wastage/delete', {
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
