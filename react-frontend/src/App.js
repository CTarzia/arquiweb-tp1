import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ROUTES } from "./constants/routes";
import Home from "./screens/Home";
import LogIn from "./screens/Login";
import Signup from "./screens/Signup";
import OrderStatus from "./screens/OrderStatus";
import Menu from "./screens/Menu";
import CreateOrder from "./screens/CreateOrder";
import RestaurantManagment from "./screens/RestaurantManagement";
import NearbyRestaurants from "./screens/NearbyRestaurants";
import BackofficeHome from "./screens/BackofficeHome";
import TableManagement from "./screens/TableManagement";
import OrderManagement from "./screens/OrderManagement";
import { UserContext } from "./context";

function App() {
	const [userId, setUserId] = useState();
	const [userName, setUserName] = useState();
	const [restaurantId, setRestaurantId] = useState();
	const [restaurant, setRestaurant] = useState({});

	const value = useMemo(
		() => ({
			userId,
			setUserId,
			userName,
			setUserName,
			restaurantId,
			setRestaurantId,
			restaurant,
			setRestaurant,
		}),
		[userId, userName, restaurantId, restaurant]
	);

	return (
		<UserContext.Provider value={value}>
			<Router>
				<Switch>
					<Route exact path={ROUTES.HOME} component={Home} />
					<Route exact path={ROUTES.LOGIN} component={LogIn} />
					<Route exact path={ROUTES.SIGN_UP} component={Signup} />
					<Route
						exact
						path={ROUTES.BACKOFFICE_HOME}
						component={BackofficeHome}
					/>
					<Route
						exact
						path={ROUTES.RESTAURANT_MANAGMENT}
						component={RestaurantManagment}
					/>
					<Route
						exact
						path={ROUTES.TABLE_MANAGEMENT}
						component={TableManagement}
					/>
					<Route
						exact
						path={ROUTES.NEARBY_RESTAURANTS}
						component={NearbyRestaurants}
					/>
					<Route exact path={ROUTES.CREATE_ORDER} component={CreateOrder} />
					<Route exact path={ROUTES.ORDER_STATUS} component={OrderStatus} />
					<Route
						exact
						path={ROUTES.ORDERS_MANAGEMENT}
						component={OrderManagement}
					/>
					<Route exact path={ROUTES.MENU} component={Menu} />
				</Switch>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
