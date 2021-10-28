import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./screens/Home";
import OrderForPickup from "./screens/OrderForPickup";
import OrderStatus from "./screens/OrderStatus";
import WelcomeTable from "./screens/WelcomeTable";
import { ROUTES } from "./constants/routes";
import Menu from "./screens/Menu";

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
					<Route
						exact
						path={ROUTES.WELCOME_TABLE}
						component={WelcomeTable}
					></Route>
					<Route
						exact
						path={ROUTES.MENU}
						component={Menu}
					></Route>
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
