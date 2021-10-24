import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import OrderForPickup from "./screens/orderforpickup";
import OrderStatus from "./screens/OrderStatus";

function App() {
	return (
		<Fragment>
			<Router>
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/orderforpickup" component={OrderForPickup}></Route>
					<Route exact path="/orderStatus" component={OrderStatus}></Route>
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
