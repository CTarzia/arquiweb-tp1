import React from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";

const Home = () => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1> Bienvenido! </h1>
			</div>
			<div className={styles.buttonsContainer}>
				<Link to={ROUTES.NEARBY_RESTAURANTS}>
					<button className={styles.button}>Ver restaurantes cercanos</button>
				</Link>

				<Link to={ROUTES.ORDER_STATUS}>
					<button className={styles.button}>Ver estado de pedido</button>
				</Link>
			</div>
		</div>
	);
};

export default Home;
