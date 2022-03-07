import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Settings from './components/settings/Settings';
import AddMode from './components/settings/shipmentMode/AddMode';
import ShipmentMode from './components/settings/shipmentMode/ShipmentMode';
import MainPage from './MainPage';
import LeadTime from './components/settings/leadTime/LeadTime';
import AddLeadTime from './components/settings/leadTime/AddLeadTime';
import SourcingMerch from './components/settings/sourcingMerch/SourcingMerch';
import AddMerch from './components/settings/sourcingMerch/AddMerch';
import Supplier from './components/settings/supplier/Supplier';
import AddSupplier from './components/settings/supplier/AddSupplier';
import Wastage from './components/settings/wastage/Wastage';
import AddWastage from './components/settings/wastage/AddWastage';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact={true} component={MainPage} />

				<Route path='/login' exact={true} component={Login} />

				<Route path='/admin' component={Settings} exact={true} />
				<Route
					path='/admin/shipment-mode'
					component={ShipmentMode}
					exact={true}
				/>
				<Route
					path='/admin/shipment-mode/add'
					component={AddMode}
					exact={true}
				/>
				<Route path='/admin/lead-time' component={LeadTime} exact={true} />
				<Route
					path='/admin/lead-time/add'
					component={AddLeadTime}
					exact={true}
				/>
				<Route
					path='/admin/sourcing-merchant'
					component={SourcingMerch}
					exact={true}
				/>
				<Route
					path='/admin/sourcing-merchant/add'
					component={AddMerch}
					exact={true}
				/>
				<Route path='/admin/supplier' component={Supplier} exact={true} />
				<Route
					path='/admin/supplier/add'
					component={AddSupplier}
					exact={true}
				/>
				<Route path='/admin/wastage' component={Wastage} exact={true} />
				<Route path='/admin/wastage/add' component={AddWastage} exact={true} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
