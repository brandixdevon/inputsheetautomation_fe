import { baseUrl } from '../../utils/baseUrl';

export const getAllLeadTimes = async () => {
	const response = await fetch(baseUrl + 'leadTime/getAll', {
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

export const getOneLeadTime = async (id: number) => {
	const response = await fetch(baseUrl + 'leadTime/getOne', {
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

export const getLeadTimeBySupplier = async (code: string) => {
	const response = await fetch(baseUrl + 'leadTime/getBySupplier', {
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

export const addLeadTime = async (leadTime: number, supplier: any) => {
	const response = await fetch(baseUrl + 'leadTime/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ leadTime, supplier }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

export const editLeadTime = async (
	id: number,
	leadTime: number,
	supplier: any
) => {
	const response = await fetch(baseUrl + 'leadTime/edit', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id, leadTime, supplier }),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

export const deleteLeadTime = async (id: number) => {
	const response = await fetch(baseUrl + 'leadTime/delete', {
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
