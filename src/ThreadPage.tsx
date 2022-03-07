import React, { useState } from 'react';
import XLSX from 'xlsx';
import common from './models/common';
import {
	mapExcelDataToThreadSummaryData,
	ThreadSummaryHeaderNames,
	getRmColorData,
} from './models/ThreadSummary';
import { ThreadSummaryInterface } from './models/ThreadSummary';
import TableComponent from './components/layout/table';
import { saveAs } from 'file-saver';
import { Button } from 'antd';
import { getRmColorThread } from './Services/data';
import { getThreadSheetData, OutputData } from './models/ThreadSheet';
import ExcelJS from 'exceljs';
const columns = [
	{
		title: 'Style No',
		dataIndex: 'StyleNo',
	},
	{
		title: 'Desctription',
		dataIndex: 'Description',
	},
	{
		title: 'Brand',
		dataIndex: 'Brand',
	},
	{
		title: 'RM Color',
		dataIndex: 'RMColor',
	},
];
const ThreadComponent = (props) => {
	const [filename, setFileName] = useState('Upload Thread YY');
	const [isFileReading, setisFileReading] = useState(false);
	const [threadSummarydata, setData] = useState<ThreadSummaryInterface[]>([]);
	const [rmColor, setRmColor] = useState(false);

	const onFileSelect = async (e) => {
		let threadSummaryData: ThreadSummaryInterface[] = [];
		const files = e.target.files;
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		setFileName(files[0].name);
		setisFileReading(true);
		reader.onload = async (ee: any) => {
			const bstr = ee.target.result;
			const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
			const dataSheet = wb.Sheets['Sheet1'];
			if (!dataSheet || dataSheet == undefined) {
				alert('Sheet1 Not Found');
				setisFileReading(false);
				return;
			}

			const dataSheetData = XLSX.utils.sheet_to_json(dataSheet, {
				header: 1,
				blankrows: false,
				defval: '',
			});
			let dataSheetDataAsObjects = common.extractSheetData([...dataSheetData]);

			threadSummaryData = mapExcelDataToThreadSummaryData(
				dataSheetDataAsObjects
			);
			setData(threadSummaryData);
			setisFileReading(false);
		};
		if (rABS) reader.readAsBinaryString(files[0]);
		else reader.readAsArrayBuffer(files[0]);
	};
	const onDownloadButtonClick = async () => {
		if (rmColor) {
			// let threadSummaryData: ThreadSummaryInterface[] = [];
			const threadSheetData = getThreadSheetData(threadSummarydata);
			// setCanDownload(false);
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('T&A');
			worksheet.columns = OutputData;
			worksheet.addRows(threadSheetData);
			const buffer = await workbook.xlsx.writeBuffer();
			saveAs(new Blob([buffer]), 'Thread Sheet Logo.xlsx');
			// setCanDownload(true);
		} else {
			setisFileReading(true);
			const response = await getRmColorThread(false);
			if (response.status != 200) {
				const error = await response.json();
				alert(error.message);
				setisFileReading(false);
			} else {
				let rmColorData = await response.json();
				rmColorData[1] = rmColorData[1].map((l) => {
					return l ? l.toString().trim().toLowerCase() : '';
				});
				const zapCodeIndexInSheet = rmColorData[1].indexOf('zap code');
				const AandEIndexinSheet = rmColorData[1].indexOf('a & e');
				const rmData = rmColorData.slice(2, rmColorData.length).map((l) => {
					return {
						zapCodeRmSheet: l[zapCodeIndexInSheet],
						AandE: l[AandEIndexinSheet],
					};
				});
				const newThreadSummaryData = getRmColorData(threadSummarydata, rmData);
				setData(newThreadSummaryData);
				setRmColor(true);
				setisFileReading(false);
			}
		}
	};
	return (
		<React.Fragment>
			<div className='row container' style={{ marginTop: '0.5vw' }}>
				<label
					className='form-control'
					style={{
						width: '20vw',
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
				>
					{filename}
					<input
						type='file'
						style={{ display: 'none' }}
						name={filename}
						accept={SheetJSFT}
						onChange={onFileSelect}
					/>
				</label>
				<div className='spinner-border text-primary' hidden={!isFileReading}>
					<span className='sr-only'>Loading...</span>
				</div>
				<Button
					size='large'
					type='primary'
					style={{ marginLeft: '2vw' }}
					onClick={onDownloadButtonClick}
					hidden={threadSummarydata.length === 0 || isFileReading == true}
				>
					{rmColor ? 'Download' : 'Get RM Color'}
				</Button>
			</div>
			<TableComponent data={threadSummarydata} columns={columns} />
		</React.Fragment>
	);
};

const SheetJSFT = ['xlsx', 'xlsb', 'xlsm', 'xls']
	.map(function (x) {
		return '.' + x;
	})
	.join(',');
export default ThreadComponent;
