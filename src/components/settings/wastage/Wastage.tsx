import {
	Button,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Theme,
	withStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import {
	deleteWastage,
	editWastage,
	getAllWastages,
} from '../../../Services/matrices/wastage';
import WastageDetail from './WastageDetail';

const StyledTableCell = withStyles((theme: Theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 12,
	},
}))(TableCell);

function Wastage() {
	const [wastages, setWastages] = useState<
		{
			id: number;
			wastage: string;
			productGroupCode: string;
			productGroupDesc: string;
		}[]
	>([{ id: 0, wastage: '', productGroupCode: '', productGroupDesc: '' }]);
	const [edit, setEdit] = useState<boolean>(false);
	const [wastage, setWastage] = useState<string | null>(null);
	const [productGroupCode, setProductGroupCode] = useState<string | null>(null);
	const [productGroupDesc, setProductGroupDesc] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			const res = await getAllWastages();
			if (res !== undefined) setWastages(res);
		}
		fetchData();
	}, []);

	const handleEdit = () => {
		setEdit(true);
	};

	const handleDelete = async (id: number) => {
		const res = await deleteWastage(id);
		if (res !== undefined) {
			alert('Details Deleted Successfully!');
			window.open('/admin/wastage', '_self');
		}
	};

	const handleOK = async (item: any) => {
		setEdit(false);
		const newWastage = wastage !== null ? wastage : item.wastage;
		const newProductGroupCode =
			productGroupCode !== null ? productGroupCode : item.productGroupCode;
		const newProductGroupDesc =
			productGroupDesc !== null ? productGroupDesc : item.productGroupDesc;

		const res = await editWastage(
			item.id,
			newWastage,
			newProductGroupCode,
			newProductGroupDesc
		);
		if (res !== undefined) {
			alert('Details Updated Successfully!');
			window.open('/admin/wastage', '_self');
		}
	};

	const handleChange = (e: any) => {
		const name = e.target.name;
		if (name == 'wastage') setWastage(e.target.value);
		if (name == 'productGroupCode') setProductGroupCode(e.target.value);
		if (name == 'productGroupDesc') setProductGroupDesc(e.target.value);
	};

	return (
		<div>
			<Navbar />
			<Sidebar />
			<div className='sidebar-container'>
				<Grid container direction='column' justify='center' spacing={2}>
					<Grid item xs={4}>
						<Button
							variant='contained'
							color='secondary'
							size='small'
							startIcon={<AddIcon fontSize='small' />}
							href='/admin/wastage/add'
						>
							NEW WASTAGE
						</Button>
					</Grid>
					<Grid item xs={10}>
						<TableContainer component={Paper}>
							<Table size='small' stickyHeader style={{ maxHeight: '70vh' }}>
								<TableHead>
									<TableRow>
										<StyledTableCell>Wastage</StyledTableCell>
										<StyledTableCell>Product Group Code</StyledTableCell>
										<StyledTableCell>Product Group Desc</StyledTableCell>
										<StyledTableCell></StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{wastages.length > 0 ? (
										wastages.map((item) => (
											<WastageDetail
												item={item}
												handleChange={handleChange}
												handleOK={handleOK}
												wastage={wastage}
												productGroupDesc={productGroupDesc}
												productGroupCode={productGroupCode}
												handleDelete={handleDelete}
											/>
										))
									) : (
										<TableRow>
											<StyledTableCell>No Details</StyledTableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Wastage;
