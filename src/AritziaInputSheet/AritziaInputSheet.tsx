import React from 'react';
import Step1Component from './AritziaStep1';
import Step2Component from './AritziaStep2';
import AritziaInputSheetContext from '../context/aritziaContext';
import Mainpage from '../components/inputsheet/Mainpage';

const AritziaInputSheetComponent = () => {
	return (
		<Mainpage
			Step1Component={Step1Component}
			Step2Component={Step2Component}
			SheetContext={AritziaInputSheetContext}
		/>
	);
};

export default AritziaInputSheetComponent;
