import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./screens/Home";
import CreateOrder from "./screens/CreateOrder";
import CurrentOrders from "./screens/CurrentOrders";
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
						component={CreateOrder}
					></Route>
					<Route
						exact
						path={ROUTES.CURRENT_ORDERS}
						component={CurrentOrders}
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
