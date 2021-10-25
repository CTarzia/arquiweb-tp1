import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import GoBackButton from "../../components/GoBack";
import { apiGet, apiPost } from "../../utils/services";
import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";

const OrderForPickup = () => {
	const [restaurantName, setRestaurantName] = useState();
	const [statusError, setStatusError] = useState(false);
	const [order, setOrder] = useState({});
	const [restaurantLoading, setRestaurantLoading] = useState(false);
	const [orderLoading, setOrderLoading] = useState(false);

	const { id: restaurantId } = useParams();

	useEffect(() => {
		fetch(`http://localhost:8080/restaurantes/${restaurantId}`)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					setStatusError(true);
					setRestaurantName("Su restaurante no ha sido encontrado.");
				} else {
					setRestaurantName(json.name);
					setRestaurantLoading(true)
				}
			});
	}, []);

	const handleOnInputChange = (evt) => {
		setOrder({ ...order, [evt.target.name]: evt.target.value });
	};

	const handleSubmit = (evt) => {
		evt.preventDefault()
		setOrderLoading(false)
		fetch(`http://localhost:8080/orders/client/${restaurantId}`, {
			method: "POST",
			body: JSON.stringify(order),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				setOrderLoading(true)
				window.alert(`Su número de pedido es: ${json}`);
			});
	};

	return (
		restaurantLoading ? (
			<div>
			<div className={styles.titleContainer}>
				<h1>{restaurantName}</h1>
				<GoBackButton route={ROUTES.HOME} />
			</div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Ingrese su nombre:</label>
					<input type="text" name="clientName" onChange={handleOnInputChange} />
				</div>
				<div>
					<label>Ingrese su pedido:</label>
					<input type="text" name="content" onChange={handleOnInputChange} />
				</div>
				<button type="submit">Enviar pedido</button>
			</form>
		</div>
		) : (
			<p>Recuperando información del restaurante.</p>
		)
		
	);
};
export default OrderForPickup;