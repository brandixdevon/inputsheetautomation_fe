class Common {
	extractSheetData(sheetData) {
		const headerRow = sheetData
			.splice(0, 1)[0]
			.map((l) => l.trim().toLowerCase());
		let objectArray = [];
		sheetData.forEach((line) => {
			let obj = {};
			for (let i in headerRow) {
				obj[headerRow[i]] = line[i];
			}
			objectArray.push(obj);
		});
		return objectArray;
	}

	objectArrayToArrayOfArrays(objArray) {
		const headers = Object.keys(objArray[0]).filter(
			(key) => !['raw', 'updated_at'].includes(key)
		);
		const d = objArray.map((obj) => headers.map((key) => obj[key]));

		const result = [headers, ...d];
		return result;
	}

	convertExcelDateToJsLocaleDateString(dateSerialNumber) {
		const utc_days = Math.floor(dateSerialNumber - 25569);
		const utc_value = utc_days * 86400;
		return new Date(utc_value * 1000).toLocaleDateString();
	}

	getDateFormatString(datetoformat) {
		const date = new Date(datetoformat);
		const dateTimeFormat = new Intl.DateTimeFormat('en', {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
		});
		const [{ value: month }, , { value: day }, , { value: year }] =
			dateTimeFormat.formatToParts(date);
		const returnString = day + '-' + month + '-' + year;
		return returnString;
	}
}
export default new Common();
