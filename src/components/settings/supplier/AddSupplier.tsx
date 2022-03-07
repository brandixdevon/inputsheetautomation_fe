import { Button, Typography } from '@material-ui/core';
import { Backdrop, Grid, Modal, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { addSupplier } from '../../../Services/matrices/supplier';
import Supplier from './Supplier';

function AddSupplier() {
	const [open, setOpen] = useState<boolean>(true);
	const [formData, setFormData] = useState<{
		code: string;
		name: string;
	}>({
		code: '',
		name: '',
	});
	const { code, name } = formData;

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleReset = () => {
		setFormData({ code: '', name: '' });
		setOpen(false);
	};

	const handleSubmit = async () => {
		const res = await addSupplier(code, name);
		if (res !== undefined) {
			alert('Details Added Succcessfully');
			window.open('/admin/supplier', '_self');
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Supplier />
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
								ADD SUPPLIER DETAILS
							</Typography>
						</Grid>
						<Grid item>
							<TextField
								size='small'
								name='code'
								label='Supplier Code'
								value={code}
								onChange={handleChange}
								required
							/>
						</Grid>
						<Grid item>
							<TextField
								size='small'
								name='name'
								label='Supplier Name'
								value={name}
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

export default AddSupplier;
