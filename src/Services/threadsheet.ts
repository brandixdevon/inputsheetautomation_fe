import { getThreadSheetData } from '../models/ThreadSheet';
import common from '../models/common';
import {
	getRmColorData,
	mapExcelDataToThreadSummaryData,
	ThreadSummaryInterface,
} from '../models/ThreadSummary';

//Get Thread sheet details
export const getThreadLines = (dataSheetData: any, genericNo: any) => {
	let threadSummaryData: ThreadSummaryInterface[] = [];
	//Convert the thread sheet data from ArrayofArray  to ArrayofObjects
	let dataSheetDataAsObjects = common.extractSheetData([...dataSheetData]);

	//Add additional fields to the original thread sheet details
	threadSummaryData = mapExcelDataToThreadSummaryData(dataSheetDataAsObjects);

	//Get thread sheet lines where styleNo (threadsheet) matches to Generic Article # (OTR)
	//Generic No same for a given OTR file
	threadSummaryData = threadSummaryData.filter(
		(line) =>
			line.StyleNo.toString().trim().toLowerCase() ==
			genericNo.toString().trim().toLowerCase()
	);
	return threadSummaryData;
};

//Get Thread lines for the BOM
export const getBOMThreadLinesLogo = async (
	response: any,
	threadSummaryData: ThreadSummaryInterface[],
	colorData: any
) => {
	let rmColorData = await response.json();
	rmColorData[1] = rmColorData[1].map((l) => {
		return l ? l.toString().trim().toLowerCase() : '';
	});

	//Get Zap Code and A&E Indices in Excel
	const zapCodeIndexInSheet = rmColorData[0].indexOf('Color Name');
	const AandEIndexinSheet = rmColorData[0].indexOf('Supplier');
	const ShadeIndexinSheet = rmColorData[0].indexOf('Shade No');

	//Get RM Data related to the Thread lines in the threadsheet
	const rmData = rmColorData.slice(1, rmColorData.length).map((l) => {
		return {
			zapCodeRmSheet: l[zapCodeIndexInSheet].trim().slice(-4).toLowerCase(),
			AandE: l[AandEIndexinSheet],
			color: l[zapCodeIndexInSheet],
			shade: l[ShadeIndexinSheet],
		};
	});

	//Get Thread Data with matching RM Color Data
	const newThreadSummaryData = getRmColorData(threadSummaryData, rmData);

	//Set the matching garment color for Thread lines from the BOMdata garment color codes
	newThreadSummaryData.forEach((element) => {
		const matchingColor: any = colorData.find(
			(c: any) => c.slice(-4) == element.Colorcode
		);
		let newColor = matchingColor ? matchingColor : '';
		element.GarmentColor = newColor;
	});

	//Get Thread line details in the standardized BOM format
	const threadSheetData = getThreadSheetData(newThreadSummaryData);
	const threadSheetDataAsArr =
		common.objectArrayToArrayOfArrays(threadSheetData);

	threadSheetDataAsArr.shift(); //remove header line
	return threadSheetDataAsArr;
};
