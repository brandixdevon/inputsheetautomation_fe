export const convertExcelDateToJsLocaleDateString = (dateSerialNumber: any) => {
	const date = parseInt(dateSerialNumber,10);
	const utc_days = Math.floor(date - 25569);
	const utc_value = utc_days * 86400;
	return new Date(utc_value * 1000).toLocaleDateString();
};
