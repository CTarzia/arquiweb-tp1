import React from "react";

const GetOrderStatus = ({
	handleSubmit,
	handleChange,
	inputValue,
	order,
	showError,
}) => {
	return (
		<div>
			<h1> Estado de Pedido </h1>
			<form onSubmit={handleSubmit}>
				<label>
					Numero de pedido:
					<input type="text" value={inputValue} onChange={handleChange} />
				</label>
				<input type="submit" value="Buscar Pedido" />
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
