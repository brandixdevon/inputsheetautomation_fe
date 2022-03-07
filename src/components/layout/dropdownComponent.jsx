import React from 'react';
const DropDownComponent = (props) => {
	return (
		<select
			className='form-control form-control-sm'
			value={props.selectedField}
			onChange={(e) => {
				props.onSelectChange(e.target.value);
			}}
		>
			<option value='' defaultValue disabled>
				{props.fieldName}
			</option>
			{props.data.map(({ id, name }) => (
				<option value={id} key={id}>
					{name}
				</option>
			))}
		</select>
	);
};

export default DropDownComponent;
