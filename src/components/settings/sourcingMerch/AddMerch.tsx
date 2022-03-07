import { Button, Typography } from '@material-ui/core';
import { Backdrop, Grid, Modal, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { addSourcingMerch } from '../../../Services/matrices/sourcingMerch';
import SourcingMerch from './SourcingMerch';

function AddMerch() {
	const [open, setOpen] = useState<boolean>(true);
	const [formData, setFormData] = useState<{
		merchant: string;
		productGroupCode: string;
		productGroupDesc: string;
	}>({
		merchant: '',
		productGroupCode: '',
		productGroupDesc: '',
	});
	const { merchant, productGroupCode, productGroupDesc } = formData;

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleReset = () => {
		setFormData({ merchant: '', productGroupCode: '', productGroupDesc: '' });
		setOpen(false);
	};

	const handleSubmit = async () => {
		const res = await addSourcingMerch(
			merchant,
			productGroupCode,
			productGroupDesc
		);
		if (res !== undefined) {
			alert('Details Added Succcessfully');
			window.open('/admin/sourcing-merchant', '_self');
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<SourcingMerch />
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
								ADD SOURCING MERCHANT DETAILS
							</Typography>
						</Grid>
						<Grid item>
							<TextField
								size='small'
								name='merchant'
								label='Sourcing Merchant'
								value={merchant}
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

export default AddMerch;
