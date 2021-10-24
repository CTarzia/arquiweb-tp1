import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./screens/Home";
import OrderForPickup from "./screens/orderforpickup";
import OrderStatus from "./screens/OrderStatus";
import { ROUTES } from "./constants/routes";

function App() {
	return (
		<Fragment>
			<Router>
				<Switch>
					<Route exact path={ROUTES.HOME} component={Home}></Route>
					<Route
						exact
						path={ROUTES.CREATE_ORDER}
						component={OrderForPickup}
					></Route>
					<Route
						exact
						path={ROUTES.ORDER_STATUS}
						component={OrderStatus}
					></Route>
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
