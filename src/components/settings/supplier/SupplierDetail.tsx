import {
	IconButton,
	TableCell,
	TableRow,
	TextField,
	Theme,
	withStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
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

function SupplierDetail(props: {
	item: any;
	handleChange: any;
	handleDelete: any;
	handleOK: any;
	code: any;
	name: any;
}) {
	const { item, handleChange, handleOK, code, name, handleDelete } = props;
	const [edit, setEdit] = useState<boolean>(false);

	const handleEdit = () => {
		setEdit(true);
	};
	return (
		<TableRow key={item.code}>
			<StyledTableCell>
				{edit ? (
					<TextField
						size='small'
						name='code'
						value={code}
						onChange={handleChange}
					/>
				) : (
					item.code
				)}
			</StyledTableCell>
			<StyledTableCell>
				{edit ? (
					<TextField
						size='small'
						name='name'
						value={name}
						onChange={handleChange}
					/>
				) : (
					item.name
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
				<IconButton onClick={() => handleDelete(item.code)}>
					{<DeleteIcon fontSize='small' />}
				</IconButton>
			</StyledTableCell>
		</TableRow>
	);
}

export default SupplierDetail;
