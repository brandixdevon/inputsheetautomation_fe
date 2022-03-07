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
	deletesupplier,
	editsupplier,
	getAllSuppliers,
} from '../../../Services/matrices/supplier';
import SupplierDetail from './SupplierDetail';

const StyledTableCell = withStyles((theme: Theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 12,
	},
}))(TableCell);

function Supplier() {
	const [suppliers, setSuppliers] = useState<
		{
			code: string;
			name: string;
		}[]
	>([{ code: '', name: '' }]);
	const [edit, setEdit] = useState<boolean>(false);
	const [code, setCode] = useState<string | null>(null);
	const [name, setName] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			const res = await getAllSuppliers();
			if (res !== undefined) setSuppliers(res);
		}
		fetchData();
	}, []);

	const handleEdit = () => {
		setEdit(true);
	};

	const handleDelete = async (id: string) => {
		const res = await deletesupplier(id);
		if (res !== undefined) {
			alert('Details Deleted Successfully!');
			window.open('/admin/supplier', '_self');
		}
	};

	const handleOK = async (item: any) => {
		setEdit(false);
		const newCode = code !== null ? code : item.code;
		const newName = name !== null ? name : item.name;
		const res = await editsupplier(newCode, newName);
		if (res !== undefined) {
			alert('Details Updated Successfully!');
			window.open('/admin/supplier', '_self');
		}
	};

	const handleChange = (e: any) => {
		const id = e.target.name;
		if (id == 'code') setCode(e.target.value);
		if (id == 'name') setName(e.target.value);
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
							href='/admin/supplier/add'
						>
							NEW SUPPLIER
						</Button>
					</Grid>
					<Grid item xs={10}>
						<TableContainer component={Paper}>
							<Table
								size='small'
								stickyHeader
								style={{ height: '70vh', overflow: 'auto' }}
							>
								<TableHead>
									<TableRow>
										<StyledTableCell>Supplier Code</StyledTableCell>
										<StyledTableCell>Supplier Name</StyledTableCell>
										<StyledTableCell></StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{suppliers.length > 0 ? (
										suppliers.map((item) => (
											<SupplierDetail
												item={item}
												handleChange={handleChange}
												handleOK={handleOK}
												code={code}
												name={name}
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

export default Supplier;
