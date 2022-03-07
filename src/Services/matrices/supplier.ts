import { baseUrl } from '../../utils/baseUrl';

export const getAllSuppliers = async () => {
	const response = await fetch(baseUrl + 'supplier/getAll', {
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

export const getOneSupplier = async (code: string) => {
	const response = await fetch(baseUrl + 'supplier/getOne', {
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
export const addSupplier = async (code: string, name: string) => {
	const response = await fetch(baseUrl + 'supplier/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ code, name }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};
export const editsupplier = async (code: string, name: string) => {
	const response = await fetch(baseUrl + 'supplier/edit', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ code, name }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};
export const deletesupplier = async (code: string) => {
	const response = await fetch(baseUrl + 'supplier/delete', {
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
