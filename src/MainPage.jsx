//SLEEP== PINK
//MODERN==LOGO

import React, { useState, useEffect } from 'react';
import Header from './components/layout/header';
import VSInputSheetContext from './context/vsInputSheetContext';
import LogoComponent from './LogoMainPage';
import {
	getMerchandiser,
	getPlanners,
	getBuyerDivisions,
	getLeadFactories,
	getGarmentCompositions,
	getWarehouses,
	getM3BuyerDivisions,
} from './Services/data';
import PinkComponent from './PinkMainPage';
import PinkComponent2 from './PinkMainPage2';
import { Redirect } from 'react-router-dom';

const MainPage = () => {
	const divisions = [
		{ name: 'VS Sleep', id: 1 },
		{ name: 'VS Modern', id: 2 },
		{ name: 'Pink', id: 3 },
	];

	const buyerDivisionspink = [
		{ id: 'L', name: 'PKD' },
		{ id: 'R', name: 'PKS' },
	];
	const [selectedDivision, setSelectedDivision] = useState(1);
	const [merchandisers, setMerchandisers] = useState([]);
	const [planners, setplanners] = useState([]);
	const [buyerDivisions, setbuyerDivisions] = useState([]);
	const [leadFactories, setleadFactories] = useState([]);
	const [garmentCompositions, setgarmentCompositions] = useState([]);
	const [warehouses, setwarehouses] = useState([]);
	const [m3buyerDivisions, setm3buyerDivisions] = useState([]);
	const changeSelectedDivision = (divisionId) => {
		setSelectedDivision(divisionId);
	};

	const username = localStorage.getItem('uname');

	const renderRedirect = () => {
		if (username === null) 
        {
			localStorage.clear();
			return <Redirect to={"/login"} />
        }
        else if (username.length === 0) 
        {
			localStorage.clear();
			return <Redirect to={"/login"} />
        }
    
    }

	useEffect(() => {

		async function RemoveMetaData()
		{
			if(username !== null)
			{
				//const alert_in = await alert('Delete');
			}
			
		}

		async function fetchData() {
			const merchandisers = await getMerchandiser('VSS');
			setMerchandisers(merchandisers);
			
			const planners = await getPlanners('VSS');
			setplanners(planners);
			
			const buyerDivisions = await getBuyerDivisions('VSS');
			setbuyerDivisions(buyerDivisions);

			const leadFactories = await getLeadFactories();
			setleadFactories(leadFactories);

			const garmentCompositions = await getGarmentCompositions('VSS');
			setgarmentCompositions(garmentCompositions);

			const warehouses = await getWarehouses('VSS');
			setwarehouses(warehouses);

			const m3buyerDivisions = await getM3BuyerDivisions('VSS');
			setm3buyerDivisions(m3buyerDivisions);

		}
		RemoveMetaData();
		fetchData();
	}, [username]);

	return (<>
		{renderRedirect()}
		<VSInputSheetContext.Provider
			value={{
				divisions,
				merchandisers,
				planners,
				selectedDivision,
				changeSelectedDivision,
				buyerDivisions,
				buyerDivisionspink,
				leadFactories,
				garmentCompositions,
				warehouses,
				m3buyerDivisions
			}}
		>
			<Header headerTitle={divisions.find(i=>i.id===parseInt(selectedDivision))?.name} />

			{ parseInt(selectedDivision) === 1 ? <LogoComponent /> : parseInt(selectedDivision) === 2 ? <PinkComponent /> : <PinkComponent2/> }
		
		</VSInputSheetContext.Provider>
		
		</>
	);
};

export default MainPage;
