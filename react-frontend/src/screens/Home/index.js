import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";

const Home = () => {
	return (
		<div className={styles.container}>
			<span className={styles.label}> Bienvenido! </span>

			<Link to="/nearbyRestaurants">
				<Button>Ver restaurantes cercanos</Button>
			</Link>

			<Link to={ROUTES.ORDER_STATUS}>
				<Button>Ver estado de pedido</Button>
			</Link>
		</div>
	);
};

export default Home;
