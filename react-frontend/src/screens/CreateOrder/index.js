import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";

import GoBackButton from "../../components/GoBack";
import { apiGet, apiPost } from "../../utils/services";
import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";
import PostOrder from "./components/PostOrder";
import { Typography } from "@mui/material";

const CreateOrder = () => {
	const [restaurantName, setRestaurantName] = useState();
	const [statusError, setStatusError] = useState(false);
	const [order, setOrder] = useState({});
	const [restaurantLoading, setRestaurantLoading] = useState(false);
	const [orderLoading, setOrderLoading] = useState(true);

	const { id: restaurantId } = useParams();
	const search = useLocation().search;
	const tableNumber = new URLSearchParams(search).get('mesa');


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
		const type = (tableNumber) ? ("table") : ("client")
		let orderToSend = order
		if (tableNumber) {
			orderToSend = { ...order, tableNumber }
		}
		fetch(`http://localhost:8080/orders/${type}/${restaurantId}`, {
			method: "POST",
			body: JSON.stringify(orderToSend),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				setOrderLoading(true)
				if (tableNumber) {
					window.alert(`Su pedido ha sido enviado.`);
				} else {
					window.alert(`Su pedido ha sido enviado. Su número de pedido es: ${json}.`);
				}
			});
	};

	return (
		!statusError ? (
			restaurantLoading ? (
				orderLoading ? (
					<div>
						<div className={styles.titleContainer}>
							<Typography variant="h3" component="h1">{restaurantName}</Typography>
							<GoBackButton route={ROUTES.HOME} />
						</div>
						<PostOrder
							handleSubmit={handleSubmit}
							handleOnInputChange={handleOnInputChange}
							tableNumber={tableNumber}
						/>
					</div>

				) : (<p>Enviando su pedido.</p>)

			) : (
				<p>Recuperando información del restaurante.</p>
			)
		) : (
			<p>Ha ocurrido un error.</p>
		)


	);
};
export default CreateOrder;