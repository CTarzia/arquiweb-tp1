import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";

import GoBackButton from "../../components/GoBack";
import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";
import PostOrder from "./components/PostOrder";
import { Typography } from "@mui/material";

const CreateOrder = () => {
	const [order, setOrder] = useState({});

	const [orderLoading, setOrderLoading] = useState(true);
	const [orderTaken, setOrderTaken] = useState(false);

	const { id: restaurantId } = useParams();
	const search = useLocation().search;
	const tableNumber = new URLSearchParams(search).get("mesa");
	const restaurantName = new URLSearchParams(search).get("nombre");

	useEffect(() => {
		fetch(
			`https://ver-la-carta.herokuapp.com/mesas/${restaurantId}/${tableNumber}`
		)
			.then((res) => res.json())
			.then((json) => {
				console.log(orderTaken);
				if (json.status) {
					setOrderTaken(json.status);
				}
			});
	}, []);

	const handleOnInputChange = (evt) => {
		setOrder({ ...order, [evt.target.name]: evt.target.value });
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		setOrderLoading(false);

		if (!orderTaken) {
			const type = tableNumber ? "table" : "client";
			let orderToSend = order;
			if (tableNumber) {
				orderToSend = { ...order, tableNumber };
			}
			console.log(typeof orderTaken);
			fetch(
				`https://ver-la-carta.herokuapp.com/orders/${type}/${restaurantId}`,
				{
					method: "POST",
					body: JSON.stringify(orderToSend),
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
				.then((res) => res.json())
				.then((json) => {
					setOrderLoading(true);
					if (tableNumber) {
						window.alert(`Su pedido ha sido enviado.`);
					} else {
						window.alert(
							`Su pedido ha sido enviado. Su número de pedido es: ${json}.`
						);
					}
				});

			fetch(
				`https://ver-la-carta.herokuapp.com/mesas/${restaurantId}/${tableNumber}/status`,
				{
					method: "PUT",
					body: JSON.stringify({}),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		} else {
			setOrderLoading(true);
			window.alert(`no puede realizar mas de un pedido`);
		}
		window.location.reload();
	};

	return orderLoading ? (
		<div>
			<div className={styles.titleContainer}>
				<Typography variant="h3" component="h1">
					{restaurantName}
				</Typography>
				<GoBackButton route={ROUTES.NEARBY_RESTAURANTS} />
			</div>
			<PostOrder
				handleSubmit={handleSubmit}
				handleOnInputChange={handleOnInputChange}
				tableNumber={tableNumber}
			/>
		</div>
	) : (
		<p>Enviando su pedido.</p>
	);
};
export default CreateOrder;
