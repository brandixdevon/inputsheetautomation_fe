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
	deletesourcingMerch,
	editsourcingMerch,
	getAllSourcingMerchs,
} from '../../../Services/matrices/sourcingMerch';
import MerchDetail from './MerchDetail';

const StyledTableCell = withStyles((theme: Theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 12,
	},
}))(TableCell);

function SourcingMerch() {
	const [merchants, setMerchants] = useState<
		{
			id: number;
			merchant: string;
			productGroupCode: string;
			productGroupDesc: string;
		}[]
	>([{ id: 0, merchant: '', productGroupCode: '', productGroupDesc: '' }]);
	const [edit, setEdit] = useState<boolean>(false);
	const [merchant, setMerchant] = useState<string | null>(null);
	const [productGroupCode, setProductGroupCode] = useState<string | null>(null);
	const [productGroupDesc, setProductGroupDesc] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			const res = await getAllSourcingMerchs();
			if (res !== undefined) setMerchants(res);
		}
		fetchData();
	}, []);

	const handleEdit = () => {
		setEdit(true);
	};

	const handleDelete = async (id: number) => {
		const res = await deletesourcingMerch(id);
		if (res !== undefined) {
			alert('Details Deleted Successfully!');
			window.open('/admin/sourcing-merchant', '_self');
		}
	};

	const handleOK = async (item: any) => {
		setEdit(false);
		const newMerchant = merchant !== null ? merchant : item.merchant;
		const newProductGroupCode =
			productGroupCode !== null ? productGroupCode : item.productGroupCode;
		const newProductGroupDesc =
			productGroupDesc !== null ? productGroupDesc : item.productGroupDesc;

		const res = await editsourcingMerch(
			item.id,
			newMerchant,
			newProductGroupCode,
			newProductGroupDesc
		);
		if (res !== undefined) {
			alert('Details Updated Successfully!');
			window.open('/admin/sourcing-merchant', '_self');
		}
	};

	const handleChange = (e: any) => {
		const name = e.target.name;
		if (name == 'merchant') setMerchant(e.target.value);
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
							href='/admin/sourcing-merchant/add'
						>
							NEW MERCHANT
						</Button>
					</Grid>
					<Grid item xs={10}>
						<TableContainer component={Paper}>
							<Table size='small' stickyHeader style={{ maxHeight: '70vh' }}>
								<TableHead>
									<TableRow>
										<StyledTableCell>Sourcing Merchant</StyledTableCell>
										<StyledTableCell>Product Group Code</StyledTableCell>
										<StyledTableCell>Product Group Desc</StyledTableCell>
										<StyledTableCell></StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{merchants.length > 0 ? (
										merchants.map((item) => (
											<MerchDetail
												item={item}
												handleChange={handleChange}
												handleOK={handleOK}
												merchant={merchant}
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

export default SourcingMerch;
