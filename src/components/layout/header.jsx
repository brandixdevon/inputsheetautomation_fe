import { Grid, IconButton, Tooltip } from '@material-ui/core';
import React, { useContext } from 'react';
import VsInputSheetContext from '../../context/vsInputSheetContext';
import SettingsIcon from '@material-ui/icons/Settings';

const Header = ({headerTitle}) => {
	const vsInputSheetContext = useContext(VsInputSheetContext);

	let title = headerTitle;

	const handleAdmin = () => {
		window.open(window.location.origin + `/admin`, '_blank');
	};

	const username = localStorage.getItem('uname');

	return (
		<nav className='navbar navbar-dark bg-dark'>
			<a
				className='navbar-brand'
				style={{ marginLeft: '3vw', color: '#FC9BC2' }}
				href='/'
			>
				{title} - ({username})
			</a>
			<div className='options navbar-selection'>
				<Grid container direction='row' spaccing={1}>
					<Grid item>
						<select
							className='form-control'
							value={vsInputSheetContext.selectedDivision}
							onChange={(event) =>
								vsInputSheetContext.changeSelectedDivision(event.target.value)
							}
							style={{
								width: '10vw',
								marginRight: '30px',
								color: '#FC9BC2',
								backgroundColor: '#353942',
								border: '1px solid #FC9BC2',
							}}
						>
							{vsInputSheetContext.divisions.map((division) => (
								<option key={division.id} value={division.id}>
									{division.name}
								</option>
							))}
						</select>
					</Grid>
					<Grid item>
						<Tooltip title='Settings'>
						<IconButton disabled={true} onClick={handleAdmin}>
							<SettingsIcon color='secondary' fontSize='small'/>
						</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</div>
		</nav>
	);
};
export default Header;
