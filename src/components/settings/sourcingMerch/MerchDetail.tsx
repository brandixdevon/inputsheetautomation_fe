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

function MerchDetail(props: {
	item: any;
	handleChange: any;
	handleDelete: any;
	handleOK: any;
	merchant: any;
	productGroupDesc: any;
	productGroupCode: any;
}) {
	const {
		item,
		handleChange,
		handleOK,
		merchant,
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
						name='merchant'
						value={merchant}
						onChange={handleChange}
					/>
				) : (
					item.merchant
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

export default MerchDetail;
