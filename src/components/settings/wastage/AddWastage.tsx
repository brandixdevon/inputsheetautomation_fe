import { Button, Typography } from '@material-ui/core';
import { Backdrop, Grid, Modal, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { addWastage } from '../../../Services/matrices/wastage';
import Wastage from './Wastage';

function AddWastage() {
	const [open, setOpen] = useState<boolean>(true);
	const [formData, setFormData] = useState<{
		wastage: string;
		productGroupCode: string;
		productGroupDesc: string;
	}>({
		wastage: '',
		productGroupCode: '',
		productGroupDesc: '',
	});
	const { wastage, productGroupCode, productGroupDesc } = formData;

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleReset = () => {
		setFormData({ wastage: '', productGroupCode: '', productGroupDesc: '' });
		setOpen(false);
	};

	const handleSubmit = async () => {
		const res = await addWastage(wastage, productGroupCode, productGroupDesc);
		if (res !== undefined) {
			alert('Details Added Succcessfully');
			window.open('/admin/wastage', '_self');
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Wastage />
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
								ADD WASTAGE DETAILS
							</Typography>
						</Grid>
						<Grid item>
							<TextField
								size='small'
								name='wastage'
								label='Wastage'
								value={wastage}
								onChange={handleChange}
								required
							/>
						</Grid>
						<Grid item>
							<TextField
								size='small'
								name='productGroupCode'
								label='Product Group Code'
								value={productGroupCode}
								onChange={handleChange}
								required
							/>
						</Grid>
						<Grid item>
							<TextField
								size='small'
								name='productGroupDesc'
								label='Product Group Desc'
								value={productGroupDesc}
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

export default AddWastage;
