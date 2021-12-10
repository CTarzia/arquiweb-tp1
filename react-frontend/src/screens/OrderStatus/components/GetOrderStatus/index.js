import React from "react";
import Topbar from "../../../../components/Topbar";

import { ROUTES } from "../../../../constants/routes";

import styles from "./styles.module.scss";

const GetOrderStatus = ({
	handleSubmit,
	handleChange,
	inputValue,
	order,
	showError,
}) => {
	return (
		<div className={styles.container}>
			<Topbar
				returnRoute={ROUTES.NEARBY_RESTAURANTS}
				title={`Estado de pedido`}
			/>
			<form onSubmit={handleSubmit} className={styles.form}>
				<label className={styles.label}>Numero de pedido:</label>
				<input type="text" value={inputValue} onChange={handleChange} />
				<input type="submit" value="Buscar Pedido" className={styles.button} />
			</form>
			{showError && (
				<p>
					Pedido no encontrado, revise la informacion ingresada e intentelo de
					nuevo.
				</p>
			)}
			{order && !showError && (
				<p>
					Numero de pedido: {order.orderId}, Contenido: {order.content}, Estado:
					{order.status}
				</p>
			)}
		</div>
	);
};

export default GetOrderStatus;
