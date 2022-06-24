import React, { Fragment, useState } from 'react';
import { Row, Col } from 'antd';

function Mainpage(props: any) {
	const { Step1Component, Step2Component, SheetContext } = props;
	const [currentStep, setCurrentStep] = useState(1);
	const [style, setstyle] = useState('');
	const [styleid, setstyleid] = useState('');
	const [bomid, setbomid] = useState('');
	const [season, setseason] = useState('');
	const [BOM, setBOM] = useState([]);
	const [colorData, setcolorData] = useState([]);
	const [genericNo, setGenericNo] = useState('');
	const [Selyear, setSelyear] = useState('');

	const changeBOM = (BOM) => {
		setBOM(BOM);
	};
	const changeStyle = (style) => {
		setstyle(style);
	};
	const changeStyleId = (styleid) => {
		setstyleid(styleid);
	};
	const changeBOMId = (bomid) => {
		setbomid(bomid);
	};
	const changecurrentStep = (currentStep) => {
		setCurrentStep(currentStep);
	};
	const changeSeason = (season) => {
		setseason(season);
	};
	const changecolorData = (colorData) => {
		setcolorData(colorData);
	};
	const changeGenericNo = (genericNo) => {
		setGenericNo(genericNo);
	}; 
	const changeSelyear = (Selyear) => {
		setSelyear(Selyear);
	};

	return (
		<Fragment>
			<SheetContext.Provider
				value={{
					style,
					currentStep,
					season,
					BOM,
					colorData,
					bomid,
					styleid,
					changeBOM,
					changeSeason,
					changeStyle,
					changecolorData,
					changecurrentStep,
					changeStyleId,
					changeBOMId,
					genericNo,
					changeGenericNo,
					changeSelyear,
					Selyear,
				}}
			>
				<Row>
					<Col span={5}>
						<Step1Component />
					</Col>
					<Col span={19}>
						<Step2Component />
					</Col>
				</Row>
			</SheetContext.Provider>
		</Fragment>
	);
}

export default Mainpage;
