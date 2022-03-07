import {
	IconButton,
	MenuItem,
	TableCell,
	TableRow,
	TextField,
	Theme,
	withStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { Select } from '@material-ui/core';
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

function ShipmentDetail(props: {
	item: any;
	handleChange: any;
	handleDelete: any;
	handleOK: any;
	mode: any;
	supplier: any;
	suppliers: any[];
}) {
	const {
		item,
		handleChange,
		handleOK,
		mode,
		supplier,
		suppliers,
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
						name='mode'
						value={mode}
						onChange={handleChange}
					/>
				) : (
					item.mode
				)}
			</StyledTableCell>
			<StyledTableCell>
				{edit ? (
					<Select
						name='supplier'
						value={supplier}
						onChange={handleChange}
						required
					>
						{suppliers.length > 0 ? (
							suppliers.map((item) => (
								<MenuItem key={item.code} value={item}>
									{item.name}
								</MenuItem>
							))
						) : (
							<MenuItem>None Available</MenuItem>
						)}
					</Select>
				) : (
					item.supplier.name
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

export default ShipmentDetail;
