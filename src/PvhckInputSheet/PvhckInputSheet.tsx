import React from 'react';
import Step1Component from './PvhckStep1';
import Step2Component from './PvhckStep2';
import PvhckInputSheetContext from '../context/pvhckContext';
import Mainpage from '../components/inputsheet/Mainpage';

const PvhckInputSheetComponent = () => {
	return (
		<Mainpage
			Step1Component={Step1Component}
			Step2Component={Step2Component}
			SheetContext={PvhckInputSheetContext}
		/>
	);
};

export default PvhckInputSheetComponent;
