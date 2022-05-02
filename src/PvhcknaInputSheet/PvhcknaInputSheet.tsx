import React from 'react';
import Step1Component from './PvhcknaStep1';
import Step2Component from './PvhcknaStep2';
import PvhcknaInputSheetContext from '../context/pvhcknaContext';
import Mainpage from '../components/inputsheet/Mainpage';

const PvhcknaInputSheetComponent = () => {
	return (
		<Mainpage
			Step1Component={Step1Component}
			Step2Component={Step2Component}
			SheetContext={PvhcknaInputSheetContext}
		/>
	);
};

export default PvhcknaInputSheetComponent;
