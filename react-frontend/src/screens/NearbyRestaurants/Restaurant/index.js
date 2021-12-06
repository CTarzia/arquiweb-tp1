import React from "react";
import { Link } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import styles from "./styles.module.scss";

const Restaurant = ({ restaurant, handleClick }) => {
	const onSelectRestaurant = () => handleClick(restaurant);

	return (
		<div className={styles.container}>
			<span className={styles.name}> {restaurant.name} </span>
			<div className={styles.infoContainer}>
				<LocalPhoneIcon className={styles.icon} />
				<span className={styles.label}> {restaurant.phoneNumber} </span>
			</div>
			<div className={styles.infoContainer}>
				<AccessTimeIcon className={styles.icon} />
				<span className={styles.label}>{restaurant.workingHours} </span>
			</div>
			{restaurant.appId === 0 && (
				<button onClick={onSelectRestaurant} className={styles.button}>
					Ver detalle
				</button>
			)}
			{restaurant.appId === 2 && (
				<Link to={`/restaurante/${restaurant.id}/hacer_pedido?appId=2`}>
					<button className={styles.button}> Hacer Pedido </button>
				</Link>
			)}
		</div>
	);
};

export default Restaurant;
