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
import { getAllSuppliers } from '../../../Services/matrices/supplier';
import {
	deleteLeadTime,
	editLeadTime,
	getAllLeadTimes,
} from '../../../Services/matrices/leadTime';
import LeadTimeDetail from './LeadTimeDetail';

const StyledTableCell = withStyles((theme: Theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 12,
	},
}))(TableCell);

function LeadTime() {
	const [leadTimes, setLeadTimes] = useState<
		{ id: number; leadTime: number; supplier: any }[]
	>([{ id: 0, leadTime: 0, supplier: '' }]);
	const [suppliers, setSuppliers] = useState<any[]>([{ code: '', name: '' }]);
	const [leadTime, setLeadTime] = useState<number | null>(null);
	const [supplier, setSupplier] = useState<any>(null);

	useEffect(() => {
		async function fetchData() {
			const resLeadTimes = await getAllLeadTimes();
			if (resLeadTimes !== undefined) setLeadTimes(resLeadTimes);
			const resSup = await getAllSuppliers();
			if (resSup !== undefined) setSuppliers(resSup);
		}
		fetchData();
	}, []);

	const handleDelete = async (id: number) => {
		const res = await deleteLeadTime(id);
		if (res !== undefined) {
			alert('Details Deleted Successfully!');
			window.open('/admin/lead-time', '_self');
		}
	};

	const handleOK = async (item: any) => {
		const newLeadTime = leadTime !== null ? leadTime : item.leadTime;
		const newSupplier = supplier !== null ? supplier : item.supplier;

		const res = await editLeadTime(item.id, newLeadTime, newSupplier);
		if (res !== undefined) {
			alert('Details Updated Successfully!');
			window.open('/admin/lead-time', '_self');
		}
	};

	const handleChange = (e: any) => {
		const name = e.target.name;
		if (name == 'leadTime') setLeadTime(e.target.value);
		if (name == 'supplier') setSupplier(e.target.value);
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
							href='/admin/lead-time/add'
						>
							NEW LEAD TIME
						</Button>
					</Grid>
					<Grid item xs={10}>
						<TableContainer component={Paper}>
							<Table size='small' stickyHeader style={{ maxHeight: '70vh' }}>
								<TableHead>
									<TableRow>
										<StyledTableCell>Lead Time</StyledTableCell>
										<StyledTableCell>Supplier</StyledTableCell>
										<StyledTableCell></StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{leadTimes.length > 0 ? (
										leadTimes.map((item) => (
											<LeadTimeDetail
												item={item}
												handleChange={handleChange}
												handleOK={handleOK}
												leadTime={leadTime}
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

export default LeadTime;
