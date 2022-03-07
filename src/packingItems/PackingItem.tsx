import React, { useContext, useState } from 'react';
import { SheetJSFT } from '../utils/sheetJSFT';
import XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {
	Button,
	CircularProgress,
	Grid,
	IconButton,
	TextField,
} from '@material-ui/core';
import { validatePacking } from '../Services/validatePacking';

function PackingItem(props: any) {
	const { SheetContext, bom, setOpenPackingModal, setPackingStatus } = props;
	const [supplierSheet, setSupplierSheet] = useState<any[]>([]);
	const [ccSheet, setCCSheet] = useState<any[]>([]);
	const [ccSheetName, setCCSheetName] = useState<string>('Upload CC Chart');
	const [supplierSheetName, setSupplierSheetName] = useState<string>(
		'Upload Supplier Inquiry'
	);
	const [sheetLoadedCC, setSheetLoadedCC] = useState<boolean | null>(null);
	const [sheetLoadedTrim, setSheetLoadedTrim] = useState<boolean | null>(null);
	const [packNo, setPackNo] = useState<number>();
	const [packingAdded, setPackingAdded] = useState<boolean | null>(null);

	const inputSheetContext: {
		BOM: any[];
		colorData: any[];
		genericNo: string;
		style: string;
		season: string;
		currentStep: number;
		changeBOM: (BOM: any) => void;
		changeStyle: (Style: any) => void;
		changecurrentStep: (currentStep: any) => void;
		changeSeason: (Season: any) => void;
		changeGenericNo: (genericNo: any) => void;
		changecolorData: (colorData: any) => void;
	} = useContext(SheetContext);

	// inputSheetContext.changeBOM(result);

	//Promise to read async
	const readFileAsync = async (f: Blob | undefined, sheetName: string) => {
		return new Promise((resolve, reject) => {
			let reader = new FileReader();
			reader.onload = async (e: any) => {
				const data = e.target.result;
				const resData = XLSX.read(data, { type: 'binary' });
				const ws = resData.Sheets[sheetName];
				const dataParse = XLSX.utils.sheet_to_json(ws, {
					raw: true,
					range: 0,
					header: 0,
					defval: '',
				});
				resolve(dataParse);
			};
			if (f !== undefined) {
				reader.readAsBinaryString(f);
			}
		});
	};

	//read file and get dataset
	const readFile = async (file: Blob, type: string) => {
		const wb = new ExcelJS.Workbook();
		const reader = new FileReader();

		//Load the sheets
		reader.readAsArrayBuffer(file);
		reader.onload = async () => {
			const buffer: any = reader.result;
			const sheetlist: any[] = [];
			await wb.xlsx.load(buffer).then((workbook) => {
				workbook.eachSheet((sheet, id: number) => {
					let sheetName = { id: id, name: sheet.name };
					sheetlist.push(sheetName);
				});
			});

			const sheetType = type === 'trim' ? 'Trims' : sheetlist[0].name;
			//Read file
			console.log('start reading');
			const res: any =
				sheetlist[0] !== undefined ? await readFileAsync(file, sheetType) : [];

			if (res !== undefined) {
				if (sheetlist[0].name.toString() === 'Trims') {
					setSupplierSheet(res);
					setSheetLoadedTrim(true);
				} else {
					setCCSheet(res);
					setSheetLoadedCC(true);
				}
			}
		};
	};

	const onCCUpload = async (e: any) => {
		setCCSheetName(e.target.files[0].name);
		setSheetLoadedCC(false);
		readFile(e.target.files[0], 'cc');
	};

	const onSupplierUpload = async (e) => {
		setSupplierSheetName(e.target.files[0].name);
		setSheetLoadedTrim(false);
		readFile(e.target.files[0], 'trim');
	};

	const addPackingToBOM = async () => {
		setPackingAdded(false);
		const packingBOM = await validatePacking(ccSheet, supplierSheet, packNo);
		if (packingBOM !== undefined) {
			// console.log(packingBOM.length);
			for (let i = 0; i < packingBOM.length; i++) {
				const packingLineArr = packingBOM[i];
				bom.BOM.push(packingLineArr);
			}
			setPackingAdded(true);
			setPackingStatus(true);
			setOpenPackingModal(false);
		}
	};

	const handleChange = (e) => {
		setPackNo(e.target.value);
	};

	return (
		<div className='add-modal'>
			<Grid container direction='column' spacing={3}>
				<Grid item>
					<Grid container direction='row' spacing={1} justify='center'>
						<Grid item xs={7}>
							<label
								className='form-control'
								style={{
									width: '20vw',
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									whiteSpace: 'nowrap',
								}}
							>
								{ccSheetName}
								<input
									type='file'
									style={{ display: 'none' }}
									name={ccSheetName}
									accept={SheetJSFT}
									onChange={onCCUpload}
								/>
							</label>
						</Grid>
						<Grid item xs={2}>
							{sheetLoadedCC !== null ? (
								<IconButton>
									{sheetLoadedCC === true ? (
										<CheckCircleOutlineIcon color='inherit' />
									) : (
										<CircularProgress size='1rem' color='inherit' />
									)}
								</IconButton>
							) : null}
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction='row' spacing={1} justify='center'>
						<Grid item xs={7}>
							<label
								className='form-control'
								style={{
									width: '20vw',
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									whiteSpace: 'nowrap',
								}}
							>
								{supplierSheetName}
								<input
									type='file'
									style={{ display: 'none' }}
									name={supplierSheetName}
									accept={SheetJSFT}
									onChange={onSupplierUpload}
								/>
							</label>
						</Grid>
						<Grid item xs={2}>
							{sheetLoadedTrim !== null ? (
								<IconButton>
									{sheetLoadedTrim === true ? (
										<CheckCircleOutlineIcon color='inherit' />
									) : (
										<CircularProgress size='1rem' color='inherit' />
									)}
								</IconButton>
							) : null}
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction='row' justify='center'>
						<Grid item xs={7}>
							<TextField
								label='No of Packs'
								variant='outlined'
								value={packNo}
								placeholder='0'
								onChange={handleChange}
								size='small'
							/>
						</Grid>
						<Grid item xs={2}></Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction='row' justify='center'>
						<Button
							variant='contained'
							color='secondary'
							size='small'
							onClick={addPackingToBOM}
							endIcon={
								packingAdded !== null ? (
									packingAdded === true ? (
										<CheckCircleOutlineIcon color='inherit' />
									) : (
										<CircularProgress size='1rem' color='inherit' />
									)
								) : (
									true
								)
							}
						>
							Add to BOM
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default PackingItem;
