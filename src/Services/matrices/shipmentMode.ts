import { baseUrl } from '../../utils/baseUrl';

export const getAllModes = async () => {
	const response = await fetch(baseUrl + 'shipmentMode/getAll', {
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

export const getOneMode = async (id: number) => {
	const response = await fetch(baseUrl + 'shipmentMode/getOne', {
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

export const getModeBySupplier = async (code: string) => {
	const response = await fetch(baseUrl + 'shipmentMode/getBySupplier', {
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

export const addMode = async (mode: string, supplier: any) => {
	const response = await fetch(baseUrl + 'shipmentMode/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ mode, supplier }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

export const editMode = async (id: number, mode: string, supplier: any) => {
	const response = await fetch(baseUrl + 'shipmentMode/edit', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id, mode, supplier }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

export const deleteMode = async (id: number) => {
	const response = await fetch(baseUrl + 'shipmentMode/delete', {
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
