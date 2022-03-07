import { Drawer, List, makeStyles } from '@material-ui/core';
import React from 'react';
import { mainListItems } from './listItems';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
	drawerPaper: {
		position: 'fixed',
		display: 'flex',
		marginTop: '3rem',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		backgroundColor: '#444',
		height: '100vh',
	},
}));

function Sidebar() {
	const classes = useStyles();

	return (
		<div>
			<Drawer
				variant='permanent'
				classes={{
					paper: classes.drawerPaper,
				}}
				open={true}
			>
				<List style={{ fontSize: '0.5vh' }}>{mainListItems}</List>
			</Drawer>
		</div>
	);
}

export default Sidebar;
