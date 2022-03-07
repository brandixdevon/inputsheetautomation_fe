import React, { useEffect } from 'react';
import { Table } from 'antd';

const TableComponent = (props) => {
	return (
		<React.Fragment>
			<Table columns={props.columns} dataSource={props.data} size={'small'} />
		</React.Fragment>
	);
};

export default TableComponent;
