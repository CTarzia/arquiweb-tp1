import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import PublicTopbar from "../../components/PublicTopbar";
import { ROUTES } from "../../constants/routes";
import { UserContext } from "../../context";

import styles from "./styles.module.scss";

const BackofficeHome = ({ history }) => {
	const { userId, restaurantId, restaurant, setRestaurant } =
		useContext(UserContext);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (userId && restaurantId) {
			setLoading(true);
			fetch(`https://ver-la-carta.herokuapp.com/restaurantes/${restaurantId}`)
				.then((res) => res.json())
				.then((json) => {
					setRestaurant(json);
					setLoading(false);
				});
		} else {
			history.push(ROUTES.LOGIN);
		}
	}, []);

	return (
		<div className={styles.container}>
			<PublicTopbar
				title={
					restaurant.name ? `Bienvenido a ${restaurant.name}!` : "Bienvenido!"
				}
				history={history}
			/>
			{loading ? (
				<CircularProgress classes={{ root: styles.progress }} />
			) : (
				<div className={styles.buttonsContainer}>
					<Link to={ROUTES.RESTAURANT_MANAGMENT}>
						<button className={styles.button}>Gestionar mi local</button>
					</Link>

					<Link to={ROUTES.ORDERS_MANAGEMENT}>
						<button className={styles.button}>Gestionar pedidos</button>
					</Link>

					<Link to={ROUTES.TABLE_STATUS}>
						<button className={styles.button}>Gestionar mesas</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default BackofficeHome;
