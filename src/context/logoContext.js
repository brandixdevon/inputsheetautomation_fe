import React from 'react';

export default React.createContext({
	BOM: [],
	colorData: [],
	genericNo: '',
	style: '',
	styleid: '',
	bomid: '',
	season: '',
	currentStep: 1,
	changeBOM: (BOM) => {},
	changeStyle: (Style) => {},
	changeStyleId: (styleid) => {},
	changeBOMId: (bomid) => {},
	changecurrentStep: (currentStep) => {},
	changeSeason: (Season) => {},
	changeGenericNo: (genericNo) => {},
	changecolorData: (colorData) => {},
});
