export const SheetJSFT = ['xlsx', 'xlsb', 'xlsm', 'xls']
	.map(function (x) {
		return '.' + x;
	})
	.join(',');
