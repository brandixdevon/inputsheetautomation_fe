import {
	Button,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@material-ui/core';
import { Backdrop, Grid, Modal, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { addMode } from '../../../Services/matrices/shipmentMode';
import { getAllSuppliers } from '../../../Services/matrices/supplier';
import ShipmentMode from './ShipmentMode';
import { Autocomplete } from '@material-ui/lab';

function AddMode() {
	const [open, setOpen] = useState<boolean>(true);
	const [suppliers, setSuppliers] = useState<any[]>([]);
	const [formData, setFormData] = useState<{ mode: string; supplier: any }>({
		mode: '',
		supplier: '',
	});
	const { mode, supplier } = formData;

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// const handleSupplier = (value: string) => {
	// 	setFormData({ ...formData, [supplier]: value });
	// };

	const handleReset = () => {
		setFormData({ mode: '', supplier: '' });
		setOpen(false);
	};

	const handleSubmit = async () => {
		const res = await addMode(mode, supplier);
		if (res !== undefined) {
			alert('Details Added Succcessfully');
			window.open('/admin/shipment-mode', '_self');
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		async function fetchData() {
			const res = await getAllSuppliers();
			if (res !== undefined) setSuppliers(res);
		}
		fetchData();
	}, []);

	return (
		<div>
			<ShipmentMode />
			<Modal
				open={open}
				onClose={handleClose}
				style={{ height: '70vh', width: '40vw', margin: 'auto' }}
				BackdropComponent={Backdrop}
			>
				<div className='add-modal'>
					<Grid container direction='column' justify='center' spacing={2}>
						<Grid item>
							<Typography variant='body1' align='center'>
								ADD SHIPMENT MODE DETAILS
							</Typography>
						</Grid>
						<Grid item xs={6}>
							{/* <Autocomplete
								id='supplier'
								options={suppliers.map((item) => item.name)}
								onChange={(e: any, newValue: string) => {
									handleSupplier(newValue);
								}}
								renderInput={(params: any) => (
									<TextField {...params} label='Supplier' variant='outlined' />
								)}
							/> */}
							<InputLabel id='dropdown'>Supplier</InputLabel>
							<Select
								labelId='dropdown'
								name='supplier'
								value={supplier}
								onChange={handleChange}
								required
							>
								{suppliers.length > 0 ? (
									suppliers.map((item) => (
										<MenuItem key={item.code} value={item}>
											{item.name}
										</MenuItem>
									))
								) : (
									<MenuItem>None Available</MenuItem>
								)}
							</Select>
						</Grid>
						<Grid item>
							<TextField
								size='small'
								name='mode'
								label='Shipment Mode'
								value={mode}
								onChange={handleChange}
								required
							/>
						</Grid>
						<Grid item>
							<Grid container direction='row' justify='center' spacing={3}>
								<Grid item>
									<Button
										variant='contained'
										color='secondary'
										size='small'
										onClick={handleReset}
									>
										Cancel
									</Button>
								</Grid>
								<Grid item>
									<Button
										variant='contained'
										color='secondary'
										size='small'
										onClick={handleSubmit}
									>
										Submit
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Modal>
		</div>
	);
}

export default AddMode;
