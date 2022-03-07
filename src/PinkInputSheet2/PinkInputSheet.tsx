import React from 'react';
import Step1Component from './PinkStep1';
import Step2Componentv2 from './PinkStep2v2';
import PinkInputSheetContext from '../context/pinkContext';
import Mainpage from '../components/inputsheet/Mainpage';

const PinkInputSheetComponent2 = () => {
	return (
		<Mainpage
			Step1Component={Step1Component}
			Step2Component={Step2Componentv2}
			SheetContext={PinkInputSheetContext}
		/>
	);
};

export default PinkInputSheetComponent2;
