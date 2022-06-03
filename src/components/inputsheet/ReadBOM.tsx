import {
	Paper,
	FormGroup,
	FormControl,
	InputLabel,
	MenuItem,
	CircularProgress,
	Grid,
	Select,
	Button,
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
	getStyleList,
	getBOMVersions,
	getBOMandColorData,
} from '../../Services/data';
import { BOMData, years } from '../../Services/datasets/common.d';
import { AutoComplete } from 'antd';
import { getSourcingMerchLogo } from '../../Services/logo';
const { Option } = AutoComplete;

function ReadBOM(props: any) {
	const { SheetContext, name } = props;

	const inputSheetContext: {
		BOM: any[];
		colorData: any[];
		genericNo: string;
		style: string;
		styleid: string;
		bomid: string;
		season: string;
		currentStep: number;
		selyear: number;
		changeBOM: (BOM: any) => void;
		changeStyle: (Style: any) => void;
		changeStyleId: (styleid: any) => void;
		changeBOMId: (bomid: any) => void;
		changecurrentStep: (currentStep: any) => void;
		changeSeason: (Season: any) => void;
		changeGenericNo: (genericNo: any) => void;
		changecolorData: (colorData: any) => void;
		changeselyear: (selyear: any) => void;
	} = useContext(SheetContext);

	const [year, setYear] = useState(new Date().getFullYear());
	const [type, setType] = useState('Style');
	const [stylelist, setstylelist] = useState<string[]>([]);
	const [stylesData, setstylesData] = useState<any[]>([]);
	const [gettingData, setgettingData] = useState(false);
	const [loadingBomversion, setLoadingBomVersion] = useState<boolean | null>(null);
	const [loadingBom, setLoadingBom] = useState<boolean | null>(null);
	const [selectedstylesData, setselectedstylesData] = useState<any[]>([]);
	const [selectedSeason, setselectedSeason] = useState<any>('');
	const [selectedStyle, setselectedStyle] = useState<string>('');
	const [selectedStyleId, setselectedStyleId] = useState('');
	const [bomVersions, setbomVersions] = useState<any[]>([]);
	const [selectedBOMId, setselectedBOMId] = useState<any>(0);
	const [getBomBtn, setGetBomBtn] = useState(true);
	const [searchedStyle, setsearchedStyle] = useState('');

	const handleChange = async (e: any) => {
		if (gettingData === false) {
			if (e.target.name === 'year') {
				setYear(e.target.value);
			} else if (e.target.name === 'type') {
				setType(e.target.value);
			} else if (e.target.name === 'season') {
				setselectedSeason(e.target.value);
			} else if (e.target.name === 'bomversion') {
				setselectedBOMId(e.target.value);
			}
		}
	};

	useEffect(() => {
		setgettingData(true);
		async function fetchData() {
			const stylesres = await getStyleList(year, type);
			setgettingData(false);
			if (stylesres.status == 200 || stylesres.status == 201) {
				const styledata = await stylesres.json();
				const stylenames = styledata.map((item: any) => item.Style);
				const uniqueStyles = [...new Set([...stylenames])];
				setstylesData(styledata);
				setstylelist(uniqueStyles);
			} else {
				console.log('Failed to get data from Epixo.');
			}
		}
		fetchData();
	}, [year, type]);

	const handleSearch = (value) => {
		setsearchedStyle(value);
	};

	//Getting the style data when style is selected
	const onSelect = (value: string) => {
		const selectedStyles = stylesData.filter(
			(style) => style.Style.toString() === value
		);
		setselectedSeason(selectedStyles[0].Season);
		setselectedStyle(value);
		setselectedstylesData(selectedStyles);
	};

	const handleClickGetBOMVersions = async () => {
		const selectedStyleNSeason = selectedstylesData.find(
			(s) => s.Season == selectedSeason
		);
		setgettingData(true);
		setGetBomBtn(true);
		setLoadingBomVersion(false);
		setselectedStyleId(selectedStyleNSeason.StyleID);
		inputSheetContext.changeStyleId(selectedStyleNSeason.StyleID);

		const res = await getBOMVersions(selectedStyleNSeason.StyleID);
		if (res.status == 200 || res.status == 201) {
			const bomversionsdata = await res.json();
			if (bomversionsdata.length > 0) {
				setbomVersions(bomversionsdata);
				setselectedBOMId(bomversionsdata[0].BOMID);
				inputSheetContext.changeBOMId(bomversionsdata[0].BOMID);
				setGetBomBtn(false);
				setLoadingBomVersion(true);
			} else {
				alert('No BOMs in Epixo.');
				setLoadingBomVersion(null);
			}
		} else {
			alert('Failed to get BOM Versions from Epixo.');
			setLoadingBomVersion(null);
		}
		setgettingData(false);
	};

	const handleClickGetBOM = async () => {
		setLoadingBom(false);
		setGetBomBtn(true);
		setgettingData(true);

		console.log('reading Bom', selectedStyleId, selectedBOMId);

		const res = await getBOMandColorData(selectedStyleId, selectedBOMId);
		if (res.status === 200 || res.status === 201) {
			const { bom } = await res.json();
			
			if (bom.length > 0) {
				
				const newBOM = bom.map((line: any) => BOMData(line));
				const headers = Object.keys(newBOM[0]).filter(
					(key) => !['raw', 'updated_at'].includes(key)
				);
				
				const fullBOM = newBOM.map((row) => {
					const newRow = JSON.parse(JSON.stringify(row));

					//Add Sourcing Merch details to the BOM
					/* Deveon Comment
					newRow['Sourcing Merchant'] = getSourcingMerchLogo(
						row['RM Product Group']
					); 

					newRow['SourcingMerchant *'] = getSourcingMerchLogo(
						row['RMProcurementGroup']
					); */

					//Conversion of Yards to Meters
					const skuUOM = row[' SKUUOM *'].trim().substring(0, 3);

					if (skuUOM.toUpperCase() === 'YRD') {
						newRow[' Purchase UOM'] = 'MTR - Meters';
						newRow[' Conversion'] = (0.9144).toFixed(4);
						newRow[' Consumption'] = parseFloat(row[' YY *']) * 0.9144;
						newRow[' Costing price'] = (parseFloat(row[' Costing price']) / 0.9144).toFixed(4);
					}

					//Duplicate costing price to purchase price column
					newRow[' Purchase price'] = newRow[' Costing price'];

					return newRow;
				});

				const d = fullBOM.map((obj: any) => headers.map((key) => obj[key]));
				const garmentcolors = fullBOM.map((line: any) => line['GMTColor']);
				const result = [headers, ...d];
				inputSheetContext.changeBOM(result);
				inputSheetContext.changecolorData(garmentcolors);
				inputSheetContext.changeSeason(selectedSeason);
				//inputSheetContext.changeselyear(year);
				inputSheetContext.changeStyle(selectedStyle);
				inputSheetContext.changecurrentStep(2);

				setgettingData(false);
				setLoadingBom(true);
			} else {
				alert('No Data in BOM');
				setgettingData(false);
				setGetBomBtn(false);
				setLoadingBom(false);
			}
		} else {
			alert('Failed to get BOM from Epixo.');
			setgettingData(false);
			setGetBomBtn(false);
			setLoadingBom(false);
		}
	};

	return (
		<div style={{fontSize:'12px'}}>
			<Fragment>
				<Grid
					container
					direction='row'
					alignItems='flex-start'
					style={{ paddingBottom: 5 }}
				>
					<Grid item xs={12} style={{ marginTop: 5 }}>
						<Paper
							style={{
								overflow: 'auto',
								paddingTop: 10,
								padding: 20,
								marginRight: 10,
								marginLeft: 10,
							}}
						>
							<FormGroup>
								<FormControl>
									<InputLabel id='year'>Year</InputLabel>
									<Select
										labelId='year'
										id='year'
										name='year'
										value={year}
										disabled={gettingData}
										onChange={handleChange}
										style={{ marginBottom: 20,fontSize:'12px' }}
									>
										{years.map((year) => {
											return (
												<MenuItem key={year} value={year}>
													{year}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</FormGroup>
							<FormGroup>
								<FormControl>
									<InputLabel id='type'>Type</InputLabel>
									<Select
										labelId='type'
										id='type'
										name='type'
										value={type}
										disabled={gettingData}
										onChange={handleChange}
										style={{ marginBottom: 20,fontSize:'12px' }}
									>
										<MenuItem key='a1' value='Assortment'>
											Assortment
										</MenuItem>
										<MenuItem key='a2' value='Style'>
											Style
										</MenuItem>
									</Select>
								</FormControl>
							</FormGroup>
							<FormGroup style={{ marginBottom: '5px' }}>
								<FormControl>
									<AutoComplete
										onSearch={handleSearch}
										placeholder='Styles'
										onSelect={onSelect}
									>
										{stylelist
											.filter((style) => style.includes(searchedStyle))
											.map((style) => (
												<Option key={style} value={style}>
													{style}
												</Option>
											))}
									</AutoComplete>
								</FormControl>
							</FormGroup>

							<FormGroup>
								<FormControl>
									<InputLabel id='season'>Season</InputLabel>
									<Select
										labelId='season'
										id='season'
										name='season'
										value={selectedSeason}
										onChange={handleChange}
										style={{ marginBottom: 10,fontSize:'12px' }}
									>
										{selectedstylesData.map((style, index) => {
											return (
												<MenuItem key={index} value={style.Season} style={{fontSize:'12px'}}>
													{style.Season}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</FormGroup>

							<Button
								endIcon={
									loadingBomversion === false ? (
										<CircularProgress size='1rem' color='inherit' />
									) : loadingBomversion === true ? (
										<CheckCircleOutlineIcon />
									) : (
										true
									)
								}
								disabled={selectedStyle === ''}
								style={{
									zIndex: 1,
									display: 'inline-block',
									marginTop: 10,
									marginBottom: 15,
								}}
								name='btnstyle'
								onClick={handleClickGetBOMVersions}
								variant='contained'
							>
								Get BOM Versions
							</Button>
							<FormGroup>
								<FormControl>
									<InputLabel id='bomversion'>BOM Versions</InputLabel>
									<Select
										labelId='bomversion'
										id='bomversion'
										name='bomversion'
										value={selectedBOMId}
										onChange={handleChange}
										style={{ marginBottom: 10,fontSize:'12px' }}
									>
										{bomVersions.map((bomv, index) => {
											return (
												<MenuItem key={index} value={bomv.BOMID} style={{fontSize:'12px'}}>
													{bomv.BOM} - Version - {bomv.BOMVersion}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</FormGroup>
							<Button
								endIcon={
									loadingBom === false ? (
										<CircularProgress size='1rem' color='inherit' />
									) : loadingBom === true ? (
										<CheckCircleOutlineIcon />
									) : (
										true
									)
								}
								disabled={getBomBtn}
								style={{
									zIndex: 1,
									display: 'inline-block',
									marginTop: 10,
									marginBottom: 15,
								}}
								name='btnstyle'
								onClick={handleClickGetBOM}
								variant='contained'
								// disabled={open === true ? true : false}
							>
								Get BOM
							</Button>
						</Paper>
					</Grid>
				</Grid>
			</Fragment>
		</div>
	);
}

export default ReadBOM;
