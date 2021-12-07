import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ROUTES } from "./constants/routes";
import Home from "./screens/Home";
import LogIn from "./screens/Login";
import Signup from "./screens/Signup";
import OrderStatus from "./screens/OrderStatus";
import WelcomeTable from "./screens/WelcomeTable";
import Menu from "./screens/Menu";
import PendingOrders from "./screens/PendingOrders";
import CurrentOrders from "./screens/CurrentOrders";
import CreateOrder from "./screens/CreateOrder";
import RestaurantManagment from "./screens/RestaurantManagement";
import NearbyRestaurants from "./screens/NearbyRestaurants";
import BackofficeHome from "./screens/BackofficeHome";
import TableStatus from "./screens/TableStatus";
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
						path={ROUTES.CREATE_ORDER}
						component={CreateOrder}
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
					<Route exact path={ROUTES.MENU} component={Menu}></Route>
					<Route
						exact
						path={ROUTES.CURRENT_ORDERS}
						component={CurrentOrders}
					></Route>
					<Route
						exact
						path={ROUTES.PENDING_ORDERS}
						component={PendingOrders}
					></Route>
					<Route
						exact
						path={ROUTES.NEARBY_RESTAURANTS}
						component={NearbyRestaurants}
					></Route>
					<Route
						exact
						path={ROUTES.TABLE_STATUS}
						component={TableStatus}
					></Route>
				</Switch>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
