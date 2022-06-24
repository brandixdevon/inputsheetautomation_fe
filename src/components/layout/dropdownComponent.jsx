import React from 'react';
import Select from 'react-select';

const DropDownComponent = (props) => {
	return (
		<Select 
		options={ props.data.map(({ id, name })=> ({label: name, value: id}))} 
		onChange={(e) => { props.onSelectChange(e.value); }} 
		//onChange={(e) => { props.onSelectChange({id: e.value, name: e.label}); }} 
		//value={({label: props.selectedField.name, value: props.selectedField.id})} 
		placeholder={props.fieldName} />
		
	);
};

export default DropDownComponent;
