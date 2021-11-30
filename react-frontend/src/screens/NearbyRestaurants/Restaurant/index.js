import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const Restaurant = ({ restaurant, handleClick, onGoToOrder }) => {
	const onSelectRestaurant = () => handleClick(restaurant);

	return (
		<div>
			<span className={styles.label}> {restaurant.name} </span>
			<span className={styles.label}> {restaurant.phoneNumber} </span>
			<span className={styles.label}>{restaurant.workingHours} </span>
			{restaurant.appId === 1 && (
				<div>
					<button onClick={onSelectRestaurant}> Ver detalle </button>
				</div>
			)}
			{restaurant.appId === 2 && (
				<Link to={`/restaurante/${restaurant.id}/hacer_pedido?appId=2`}>
					<button> Hacer Pedido </button>
				</Link>
			)}
		</div>
	);
};

export default Restaurant;
