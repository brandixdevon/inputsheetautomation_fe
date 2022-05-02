import React from 'react';
import ReadBOM from '../components/inputsheet/ReadBOMpvh';
import PvhInputSheetContext from '../context/pvhckContext';

const Step1Component = () => {
	return <ReadBOM name='PVH' SheetContext={PvhInputSheetContext} />;
};

export default Step1Component;
