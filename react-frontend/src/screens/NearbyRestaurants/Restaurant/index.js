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
			{restaurant.phoneNumber && (
				<div className={styles.infoContainer}>
					<LocalPhoneIcon className={styles.icon} />
					<span className={styles.label}> {restaurant.phoneNumber} </span>
				</div>
			)}
			{restaurant.workingHours && (
				<div className={styles.infoContainer}>
					<AccessTimeIcon className={styles.icon} />
					<span className={styles.label}>{restaurant.workingHours} </span>
				</div>
			)}
			{restaurant.description && (
				<div className={styles.infoContainer}>
					<span className={styles.label}>{restaurant.description} </span>
				</div>
			)}
			{restaurant.appId === 1 && (
				<button onClick={onSelectRestaurant} className={styles.button}>
					Ver detalle
				</button>
			)}
			{restaurant.appId.toString() === "2" && restaurant.has_pickup && (
				<Link
					to={`/restaurante/${restaurant.id}/hacer_pedido?appId=2&name=${restaurant.name}`}
				>
					<button className={styles.button}> Hacer Pedido </button>
				</Link>
			)}
			{restaurant.appId === 3 && (
				<Link
					to={`/restaurante/${restaurant.branch_id}/hacer_pedido?appId=3&name=${restaurant.name}`}
				>
					<button className={styles.button}> Hacer Pedido </button>
				</Link>
			)}
		</div>
	);
};

export default Restaurant;
