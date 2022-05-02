import React from 'react';
import Step1Component from './PvhcksleepStep1';
import Step2Component from './PvhcksleepStep2';
import PvhcksleepInputSheetContext from '../context/pvhcksleepContext';
import Mainpage from '../components/inputsheet/Mainpage';

const PvhcksleepInputSheetComponent = () => {
	return (
		<Mainpage
			Step1Component={Step1Component}
			Step2Component={Step2Component}
			SheetContext={PvhcksleepInputSheetContext}
		/>
	);
};

export default PvhcksleepInputSheetComponent;
