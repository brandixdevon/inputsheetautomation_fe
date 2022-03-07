import React from 'react';
import ReadBOM from '../components/inputsheet/ReadBOM';
import PinkInputSheetContext from '../context/pinkContext';
import { COTblData, operationtable } from '../Services/datasets/common';

const Step1Component = () => {
	return <ReadBOM name='PINK' SheetContext={PinkInputSheetContext} />;
};

export default Step1Component;
