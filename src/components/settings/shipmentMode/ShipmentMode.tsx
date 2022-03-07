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
	deleteMode,
	editMode,
	getAllModes,
} from '../../../Services/matrices/shipmentMode';
import { getAllSuppliers } from '../../../Services/matrices/supplier';
import ShipmentDetail from './ShipmentDetail';

const StyledTableCell = withStyles((theme: Theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 12,
	},
}))(TableCell);

function ShipmentMode() {
	const [modes, setModes] = useState<
		{ id: number; mode: string; supplier: any }[]
	>([{ id: 0, mode: '', supplier: '' }]);
	const [suppliers, setSuppliers] = useState<any[]>([{ code: '', name: '' }]);
	const [edit, setEdit] = useState<boolean>(false);
	const [mode, setMode] = useState<string | null>(null);
	const [supplier, setSupplier] = useState<any>(null);

	useEffect(() => {
		async function fetchData() {
			const resModes = await getAllModes();
			if (resModes !== undefined) setModes(resModes);
			const resSup = await getAllSuppliers();
			if (resSup !== undefined) setSuppliers(resSup);
		}
		fetchData();
	}, []);

	const handleEdit = () => {
		setEdit(true);
	};

	const handleDelete = async (id: number) => {
		const res = await deleteMode(id);
		if (res !== undefined) {
			alert('Details Deleted Successfully!');
			window.open('/admin/shipment-mode', '_self');
		}
	};

	const handleOK = async (item: any) => {
		setEdit(false);
		const newMode = mode !== null ? mode : item.mode;
		const newSupplier = supplier !== null ? supplier : item.supplier;

		const res = await editMode(item.id, newMode, newSupplier);
		if (res !== undefined) {
			alert('Details Updated Successfully!');
			window.open('/admin/shipment-mode', '_self');
		}
	};

	const handleChange = (e: any) => {
		const name = e.target.name;
		if (name == 'mode') setMode(e.target.value);
		if (name == 'supplier') setSupplier(e.target.value);
	};

	return (
		<div>
			<Navbar />
			<Sidebar />
			<div className='sidebar-container'>
				<Grid container direction='column' justify='center' spacing={2}>
					<Grid item xs={3}>
						<Button
							variant='contained'
							color='secondary'
							size='small'
							startIcon={<AddIcon fontSize='small' />}
							href='/admin/shipment-mode/add'
						>
							NEW MODE
						</Button>
					</Grid>
					<Grid item xs={10}>
						<TableContainer component={Paper}>
							<Table size='small' stickyHeader style={{ maxHeight: '70vh' }}>
								<TableHead>
									<TableRow>
										<StyledTableCell>Shipment Mode</StyledTableCell>
										<StyledTableCell>Supplier</StyledTableCell>
										<StyledTableCell></StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{modes.length > 0 ? (
										modes.map((item) => (
											<ShipmentDetail
												item={item}
												handleChange={handleChange}
												handleOK={handleOK}
												mode={mode}
												supplier={supplier}
												suppliers={suppliers}
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

export default ShipmentMode;
