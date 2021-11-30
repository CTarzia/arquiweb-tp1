import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";

import GoBackButton from "../../components/GoBack";
import { apiGet, apiPost } from "../../utils/services";
import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";
import {
	deniedFilter,
	pendingFilter,
	inProgressFilter,
	readyFilter,
} from "./utils/filters";
import DisplayOrderInProgress from "./components/DisplayOrderInProgress";
import DisplayOrderReady from "./components/DisplayOrderReady";

const CurrentOrders = () => {
	const [restaurantName, setRestaurantName] = useState();
	const [restaurantLoading, setRestaurantLoading] = useState(false);
	const [ordersLoading, setOrdersLoading] = useState(false);
	const [statusError, setStatusError] = useState(false);

	const [deniedOrders, setDeniedOrders] = useState([]);
	const [pendingOrders, setPendingOrders] = useState([]);
	const [inProgressOrders, setInProgressOrders] = useState([]);
	const [readyOrders, setReadyOrders] = useState([]);

	const { id: restaurantId } = useParams();

	useEffect(() => {
		fetch(`https://ver-la-carta.herokuapp.com/restaurantes/${restaurantId}`)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					setStatusError(true);
					setRestaurantName("Su restaurante no ha sido encontrado.");
				} else {
					setRestaurantName(json.name);
					setRestaurantLoading(true);
				}
			});

		fetch(
			`https://ver-la-carta.herokuapp.com/restaurantes/${restaurantId}/pedidos`
		)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					setStatusError(true);
					setRestaurantName("Su restaurante no ha sido encontrado.");
				} else {
					setDeniedOrders(json.filter(deniedFilter));
					setPendingOrders(json.filter(pendingFilter));
					setInProgressOrders(json.filter(inProgressFilter));
					setReadyOrders(json.filter(readyFilter));
					setOrdersLoading(true);
				}
			});
	}, []);

	return restaurantLoading ? (
		<div>
			<div className={styles.titleContainer}>
				<Typography variant="h3" component="h1">
					{restaurantName}
				</Typography>
				<GoBackButton route={ROUTES.HOME} />
			</div>
			<div>
				<div>
					{ordersLoading ? (
						<div className={styles.displayOrdersColumns}>
							<div>
								<Typography variant="h5" align="center">
									{" "}
									Pedidos en progreso{" "}
								</Typography>
								{inProgressOrders.map((order) => (
									<DisplayOrderInProgress order={order} />
								))}
							</div>
							<div>
								<Typography variant="h5" align="center">
									{" "}
									Pedidos listos{" "}
								</Typography>
								{readyOrders.map((order) => (
									<DisplayOrderReady order={order} />
								))}
							</div>
						</div>
					) : (
						<p>Recuperando información de pedidos en curso.</p>
					)}
				</div>
			</div>
		</div>
	) : (
		<p>Recuperando información del restaurante.</p>
	);
};

export default CurrentOrders;
