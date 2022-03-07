import { Button, Card, Grid } from '@material-ui/core';
import React from 'react';
import Navbar from './layout/Navbar';

function Settings() {
	const matrices = [
		{ id: 1, name: 'Manufacture Lead Time', link: 'lead-time' },
		{ id: 2, name: 'Shipment Mode', link: 'shipment-mode' },
		{ id: 3, name: 'Souring Merchant', link: 'sourcing-merchant' },
		{ id: 4, name: 'Supplier', link: 'supplier' },
		{ id: 5, name: 'Wastage', link: 'wastage' },
	];

	const handleClick = (link: string) => {
		window.open(window.location.origin + `/admin/${link}`, '_self');
	};

	return (
		<div>
			<Navbar />
			<div style={{ position: 'relative', paddingTop: '3rem' }}>
				<Grid
					container
					direction='row'
					justify='space-evenly'
					style={{ margin: 'auto' }}
				>
					{matrices.map((item) => (
						<Grid item xs={2} key={item.id}>
							<div
								style={{
									margin: 'auto',
									padding: '1rem',
									width: '15vw',
									height: '12vh',
									cursor: 'pointer',
									backgroundColor: '#ffc1b6',
									borderRadius: '0.5rem',
									boxShadow:
										' rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
								}}
								onClick={() => handleClick(item.link)}
							>
								<p
									style={{
										textAlign: 'center',
										fontSize: '1.2vw',
										fontWeight: 'bold',
										fontFamily: 'helvetica',
									}}
								>
									{item.name}
								</p>
							</div>
						</Grid>
					))}
				</Grid>
			</div>
		</div>
	);
}

export default Settings;
