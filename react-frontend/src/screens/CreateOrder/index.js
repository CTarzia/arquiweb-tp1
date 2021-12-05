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
	const [orderTaken, setOrderTaken] = useState(false);
	const [orderStatus, setOrderStatus] = useState();
	const [tableNumber, setTableNumber] = useState();
	const [tableLoading, setTableLoading] = useState(false);

	const { id: restaurantId } = useParams();
	const search = useLocation().search;
	const tableId = new URLSearchParams(search).get('mesa');


	useEffect(() => {
		fetch(`https://ver-la-carta.herokuapp.com/restaurantes/${restaurantId}`)
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

		if (tableId) {
			fetch(`https://ver-la-carta.herokuapp.com/mesas/${restaurantId}/${tableId}`)
			.then((res) => res.json())
			.then((json) => {
				
				if (json.status === 404) {
					setStatusError(true);
					setRestaurantName("Su mesa no ha sido encontrada.");
				} else {
					console.log(restaurantId);
					console.log(tableId);
					console.log(json.status);
					if (json.status) {
						setOrderTaken(json.status);
					}
					setTableNumber(json.tableNumber);
					setTableLoading(true);
					console.log(orderTaken);
				}
			});	
		};
	}, []);

	const handleOnInputChange = (evt) => {
		setOrder({ ...order, [evt.target.name]: evt.target.value });
	};

	const handleSubmit = (evt) => {
		evt.preventDefault()
		setOrderLoading(false)
		console.log(tableNumber);
		console.log(orderTaken);

		if(!orderTaken){
			const type = (tableId) ? ("table") : ("client")
			let orderToSend = order
			if (tableId) {
				orderToSend = { ...order, ["tableNumber"]: tableId}
			}
			console.log(orderToSend);
			fetch(`https://ver-la-carta.herokuapp.com/orders/${type}/${restaurantId}`, {
				method: "POST",
				body: JSON.stringify(orderToSend),
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => res.json())
			.then((json) => {
				setOrderLoading(true)
				console.log(tableId)
				if (tableId) {
					window.alert(`Su pedido ha sido enviado.`);
					window.location.reload();
				} else {
					window.alert(`Su pedido ha sido enviado. Su número de pedido es: ${json}.`);
					window.location.reload();
				}
			});

			fetch(`https://ver-la-carta.herokuapp.com/mesas/${restaurantId}/${tableId}/status`, {
				method: "PUT",
				body: JSON.stringify({}),
				headers: {
					"Content-Type": "application/json",
				},
			});
		}else{
			setOrderLoading(true);
			window.alert(`no puede realizar mas de un pedido`);
			window.location.reload();
		}
		
	};

	return (
		!statusError ? (
			restaurantLoading ? (
				orderLoading ? (
					tableId ? (
						tableLoading ? (
							<div>
								<div className={styles.titleContainer}>
									<Typography variant="h3" component="h1">{restaurantName}</Typography>
									<GoBackButton route={ROUTES.NEARBY_RESTAURANTS} />
								</div>

								<PostOrder
									handleSubmit={handleSubmit}
									handleOnInputChange={handleOnInputChange}
									tableId={tableId}
									tableNumber={tableNumber}
								/>
							</div>
						):(<p>cargando la mesa</p>)
					):(
						<div>
							<div className={styles.titleContainer}>
								<Typography variant="h3" component="h1">{restaurantName}</Typography>
								<GoBackButton route={ROUTES.NEARBY_RESTAURANTS} />
							</div>

							<PostOrder
								handleSubmit={handleSubmit}
								handleOnInputChange={handleOnInputChange}
								tableId={tableId}
								tableNumber={tableNumber}
							/>
						</div>
					)
				) : (<p>Enviando su pedido.</p>)

			) : (
				<p>Recuperando información del restaurante.</p>
			)
		) : (
			<p>{tableId}
			Ha ocurrido un error.</p>
		)
	);
};
export default CreateOrder;