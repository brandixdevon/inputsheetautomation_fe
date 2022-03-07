import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import PeopleIcon from '@material-ui/icons/People';
import { Button } from '@material-ui/core';

export const mainListItems = (
	<div>
		<ListItem button style={{ color: '#fff' }}>
			<Button
				startIcon={<NearMeOutlinedIcon style={{ color: '#fff' }} />}
				href='/admin/shipment-mode'
				style={{ color: '#fff' }}
			>
				Shipment Mode
			</Button>
		</ListItem>
		<ListItem button style={{ color: '#fff' }}>
			<Button
				startIcon={<NearMeOutlinedIcon style={{ color: '#fff' }} />}
				href='/admin/lead-time'
				style={{ color: '#fff' }}
			>
				Manufacture Lead Time
			</Button>
		</ListItem>
		<ListItem button style={{ color: '#fff' }}>
			<Button
				startIcon={<NearMeOutlinedIcon style={{ color: '#fff' }} />}
				href='/admin/wastage'
				style={{ color: '#fff' }}
			>
				Wastage
			</Button>
		</ListItem>
		<ListItem>
			<Button
				startIcon={<PeopleIcon style={{ color: '#fff' }} />}
				href='/admin/sourcing-merchant'
				style={{ color: '#fff' }}
			>
				Sourcing Merchant
			</Button>
		</ListItem>
		<ListItem>
			<Button
				startIcon={<PeopleIcon style={{ color: '#fff' }} />}
				href='/admin/supplier'
				style={{ color: '#fff' }}
			>
				Supplier
			</Button>
		</ListItem>
	</div>
);
