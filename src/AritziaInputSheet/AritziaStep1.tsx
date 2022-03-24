import React from 'react';
import ReadBOM from '../components/inputsheet/ReadBOMaritzia';
import AritziaInputSheetContext from '../context/aritziaContext';

const Step1Component = () => {
	return <ReadBOM name='ARITZIA' SheetContext={AritziaInputSheetContext} />;
};

export default Step1Component;
