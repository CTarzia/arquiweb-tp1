import React from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";

const BackofficeHome = () => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1> Bienvenido! </h1>
			</div>
			<div className={styles.buttonsContainer}>
				<Link to={ROUTES.RESTAURANT_MANAGMENT}>
					<button className={styles.button}>Gestionar mi local</button>
				</Link>

				<Link to={ROUTES.PENDING_ORDERS}>
					<button className={styles.button}>
						Gestionar pedidos pendientes
					</button>
				</Link>

				<Link to={ROUTES.CURRENT_ORDERS}>
					<button className={styles.button}>Gestionar pedidos en curso</button>
				</Link>

				<Link to={ROUTES.TABLE_STATUS}>
					<button className={styles.button}>Estado de mesas</button>
				</Link>
			</div>
		</div>
	);
};

export default BackofficeHome;
