import React from 'react';
import Step1Component from './LogoStep1';
import Step2Component from './LogoStep2';
import PinkInputSheetContext from '../context/pinkContext';
import Mainpage from '../components/inputsheet/Mainpage';

const PinkInputSheetComponent = () => {
	return (
		<Mainpage
			Step1Component={Step1Component}
			Step2Component={Step2Component}
			SheetContext={PinkInputSheetContext}
		/>
	);
};

export default PinkInputSheetComponent;
