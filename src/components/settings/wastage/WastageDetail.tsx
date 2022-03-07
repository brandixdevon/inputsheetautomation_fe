import {
	Button,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Theme,
	withStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const StyledTableCell = withStyles((theme: Theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 12,
	},
}))(TableCell);

function WastageDetail(props: {
	item: any;
	handleChange: any;
	handleDelete: any;
	handleOK: any;
	wastage: any;
	productGroupDesc: any;
	productGroupCode: any;
}) {
	const {
		item,
		handleChange,
		handleOK,
		wastage,
		productGroupDesc,
		productGroupCode,
		handleDelete,
	} = props;
	const [edit, setEdit] = useState<boolean>(false);

	const handleEdit = () => {
		setEdit(true);
	};

	return (
		<TableRow key={item.id}>
			<StyledTableCell>
				{edit ? (
					<TextField
						size='small'
						name='wastage'
						value={wastage}
						onChange={handleChange}
					/>
				) : (
					item.wastage
				)}
			</StyledTableCell>
			<StyledTableCell>
				{edit ? (
					<TextField
						size='small'
						name='productGroupCode'
						value={productGroupCode}
						onChange={handleChange}
					/>
				) : (
					item.productGroupCode
				)}
			</StyledTableCell>
			<StyledTableCell>
				{edit ? (
					<TextField
						size='small'
						name='productGroupDesc'
						value={productGroupDesc}
						onChange={handleChange}
					/>
				) : (
					item.productGroupDesc
				)}
			</StyledTableCell>
			<StyledTableCell>
				{edit ? (
					<IconButton onClick={() => handleOK(item)}>
						{<CheckCircleOutlineIcon fontSize='small' />}
					</IconButton>
				) : (
					<IconButton onClick={handleEdit}>
						{<EditIcon fontSize='small' />}
					</IconButton>
				)}
				<IconButton onClick={() => handleDelete(item.id)}>
					{<DeleteIcon fontSize='small' />}
				</IconButton>
			</StyledTableCell>
		</TableRow>
	);
}

export default WastageDetail;
