import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		navbar: {
			height: '8vh',
			backgroundColor: '#333',
			color: '#fff',
		},
		navbarTitle: {
			fontFamily: 'helvetica',
			fontSize: '1.2vw',
			flexGrow: 1,
			color: '#fff',
		},
		navbarBtn: {
			fontSize: '0.9vw',
		},
	})
);

function Navbar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='static' variant='elevation' className={classes.navbar}>
				<Toolbar variant='dense'>
					<Typography variant='h6' className={classes.navbarTitle}>
						VS INPUT SHEET - SETTINGS
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Navbar;
