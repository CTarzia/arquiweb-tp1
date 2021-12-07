import React, { useContext, useEffect, useState, useMemo } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import PublicTopbar from "../../components/PublicTopbar";
import { UserContext } from "../../context";
import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";

const OrderManagement = ({ history }) => {
	const { userId, restaurantId, restaurant } = useContext(UserContext);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (!userId || !restaurantId) {
			history.push(ROUTES.LOGIN);
		} else {
			fetch(
				`https://ver-la-carta.herokuapp.com/restaurantes/${restaurantId}/pedidos`
			)
				.then((response) => response.json())
				.then((json) => {
					setOrders(json);
				});
		}
	}, []);

	const pendingOrders = useMemo(
		() => orders.filter((order) => order.status === "PENDING"),
		[orders]
	);
	const progressOrders = useMemo(
		() => orders.filter((order) => order.status === "PROGRESS"),
		[orders]
	);
	const readyOrders = useMemo(
		() => orders.filter((order) => order.status === "READY"),
		[orders]
	);

	console.log(orders);

	const viewOrder = (order) =>
		window.alert(
			`Pedido: ${order.content}\n${
				order.type === "PICKUP" ? `nombre: ${order.clientName}` : ""
			}`
		);

	const deleteOrder = (order) => {
		fetch(`https://ver-la-carta.herokuapp.com/orders/${order.orderId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => {
			fetch(
				`https://ver-la-carta.herokuapp.com/restaurantes/${restaurantId}/pedidos`
			)
				.then((response) => response.json())
				.then((json) => {
					setOrders(json);
				});
		});
	};

	const updateOrder = (order, newStatus) => {
		fetch(`https://ver-la-carta.herokuapp.com/orders/${order.orderId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...order, status: newStatus }),
		}).then(() => {
			fetch(
				`https://ver-la-carta.herokuapp.com/restaurantes/${restaurantId}/pedidos`
			)
				.then((response) => response.json())
				.then((json) => {
					setOrders(json);
				});
		});
	};

	return (
		<div className={styles.container}>
			<PublicTopbar
				title={`Gestionar: ${restaurant.name}`}
				history={history}
				withGoBack
			/>
			<div className={styles.content}>
				<div className={styles.ordersContainer}>
					<span className={styles.title}> Pendientes </span>
					{pendingOrders.map((order) => (
						<div className={styles.orderCard}>
							<span>
								{order.type === "TABLE"
									? `Mesa: ${order.tableNumber}`
									: `Pickup: ${order.orderId}`}
							</span>
							<button
								className={styles.viewContentButton}
								onClick={() => viewOrder(order)}
							>
								<RemoveRedEyeIcon className={styles.icon} />
							</button>
							<button
								className={styles.deleteButton}
								onClick={() => updateOrder(order, "DENIED")}
							>
								<DeleteForeverIcon className={styles.icon} />
							</button>
							<button
								className={styles.acceptButton}
								onClick={() => updateOrder(order, "PROGRESS")}
							>
								<CheckCircleIcon className={styles.icon} />
							</button>
						</div>
					))}
				</div>
				<div className={styles.ordersContainer}>
					<span className={styles.title}> En curso </span>
					{progressOrders.map((order) => (
						<div className={styles.orderCard}>
							<span>
								{order.type === "TABLE"
									? `Mesa: ${order.tableNumber}`
									: `Pickup: ${order.orderId}`}
							</span>
							<button
								className={styles.viewContentButton}
								onClick={() => viewOrder(order)}
							>
								<RemoveRedEyeIcon className={styles.icon} />
							</button>
							<button
								className={styles.acceptButton}
								onClick={() => updateOrder(order, "READY")}
							>
								<CheckCircleIcon className={styles.icon} />
							</button>
						</div>
					))}
				</div>
				<div className={styles.ordersContainer}>
					<span className={styles.title}> En curso </span>
					{readyOrders.map((order) => (
						<div className={styles.orderCard}>
							<span>
								{order.type === "TABLE"
									? `Mesa: ${order.tableNumber}`
									: `Pickup: ${order.orderId}`}
							</span>
							<button
								className={styles.viewContentButton}
								onClick={() => viewOrder(order)}
							>
								<RemoveRedEyeIcon className={styles.icon} />
							</button>
							<button
								className={styles.acceptButton}
								onClick={() => deleteOrder(order)}
							>
								<CheckCircleIcon className={styles.icon} />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default OrderManagement;
