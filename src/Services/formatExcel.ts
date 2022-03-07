import XLSX from 'xlsx';

export const OpsTrackSheetFormat = (ws: XLSX.WorkSheet, OpsData: any[]) => {
	//Merge SMV color in Ops Track sheet
	const SMVMerge = [	{ s: { c: 0, r: 0 }, e: { c: 0, r: 2 } }, //Merge SMV
		{ s: { c: 0, r: 4 }, e: { c: 1, r: 4 } }, //Merge Efficiency
		{ s: { c: 0, r: 6 }, e: { c: 1, r: 6 } }, //Merge No of Lace
	]
	for (let i = 2; i < OpsData[1].length; i = i + 2) {
		const num = i + 1;
		const row={ s: { c: i, r: 0 }, e: { c: num, r: 0 } }
		SMVMerge.push(row)
	
		// ws.getCell(2, i).border = {
		// 	top: { style: 'thin' },
		// 	left: { style: 'thin' },
		// 	bottom: { style: 'thin' },
		// 	right: { style: 'thin' },
		// };
		// ws.getCell(2, num).border = {
		// 	top: { style: 'thin' },
		// 	left: { style: 'thin' },
		// 	bottom: { style: 'thin' },
		// 	right: { style: 'thin' },
		// };
		// ws.getCell(3, i).border = {
		// 	top: { style: 'thin' },
		// 	left: { style: 'thin' },
		// 	bottom: { style: 'thin' },
		// 	right: { style: 'thin' },
		// };
		// ws.getCell(3, num).border = {
		// 	top: { style: 'thin' },
		// 	left: { style: 'thin' },
		// 	bottom: { style: 'thin' },
		// 	right: { style: 'thin' },
		// };
		// ws.getCell(4, i).border = {
		// 	top: { style: 'thin' },
		// 	left: { style: 'thin' },
		// 	bottom: { style: 'thin' },
		// 	right: { style: 'thin' },
		// };
		// ws.getCell(4, num).border = {
		// 	top: { style: 'thin' },
		// 	left: { style: 'thin' },
		// 	bottom: { style: 'thin' },
		// 	right: { style: 'thin' },
		// };
	}
		ws["!merges"] = SMVMerge;
	// ws.getCell('A2').font = { bold: true };
	// ws.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };
	// ws.getCell('A6').font = { bold: true };
	// ws.getCell('A8').font = { bold: true };
	// ws.getCell('B2').font = { bold: true };
	// ws.getCell('B3').font = { bold: true };
	// ws.getCell('B4').font = { bold: true };

	// ws.getCell('A2').border = {
	// 	top: { style: 'thin' },
	// 	left: { style: 'thin' },
	// 	bottom: { style: 'thin' },
	// 	right: { style: 'thin' },
	// };

	// ws.getCell('B2').border = {
	// 	top: { style: 'thin' },
	// 	left: { style: 'thin' },
	// 	bottom: { style: 'thin' },
	// 	right: { style: 'thin' },
	// };
	// ws.getCell('B3').border = {
	// 	top: { style: 'thin' },
	// 	left: { style: 'thin' },
	// 	bottom: { style: 'thin' },
	// 	right: { style: 'thin' },
	// };
	// ws.getCell('B4').border = {
	// 	top: { style: 'thin' },
	// 	left: { style: 'thin' },
	// 	bottom: { style: 'thin' },
	// 	right: { style: 'thin' },
	// };

	// ws.getCell('A6').border = {
	// 	top: { style: 'thin' },
	// 	left: { style: 'thin' },
	// 	bottom: { style: 'thin' },
	// 	right: { style: 'thin' },
	// };
	// ws.getCell('C6').border = {
	// 	top: { style: 'thin' },
	// 	left: { style: 'thin' },
	// 	bottom: { style: 'thin' },
	// 	right: { style: 'thin' },
	// };

	// ws.getCell('A8').border = {
	// 	top: { style: 'thin' },
	// 	left: { style: 'thin' },
	// 	bottom: { style: 'thin' },
	// 	right: { style: 'thin' },
	// };
	// ws.getCell('C8').border = {
	// 	top: { style: 'thin' },
	// 	left: { style: 'thin' },
	// 	bottom: { style: 'thin' },
	// 	right: { style: 'thin' },
	// };
};
