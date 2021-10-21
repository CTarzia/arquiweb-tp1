import React from "react";
import { Button } from "@mui/material";

import styles from "./styles.module.scss";

class OrderStatus extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			order: String,
			DataisLoaded: false
		};

		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {    this.setState({value: event.target.value});  }
	handleSubmit(event) {
	  fetch(
		"http://localhost:8080/orders/" + this.state.value)
					.then((res) => res.json())
					.then((json) => {
						this.setState({
							order: json,
							DataisLoaded: true
						});
					})
	  event.preventDefault();
	}

	render() {
		const { DataisLoaded, order } = this.state;

		if (!DataisLoaded)
			return <div>
				<h1> Estado de Pedido </h1> 
					<form onSubmit={this.handleSubmit}>        <label>
						Numero de pedido:
						<input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
					<input type="submit" value="Buscar Pedido" />
					</form>
				</div>
		
		if (order.status == '404')
			return <div>
			<h1> Estado de Pedido </h1> 
				<form onSubmit={this.handleSubmit}>        <label>
					Numero de pedido:
					<input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
				<input type="submit" value="Buscar Pedido" />
				</form>
				<p>Pedido no encontrado, revise la informacion ingresada e intentelo de nuevo.</p>
			</div>

		console.log(order)
		return (
		<div className = "OrderStatus">
			<h1> Estado de Pedido </h1> 
			<form onSubmit={this.handleSubmit}>        <label>
				Numero de pedido:
				<input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
			<input type="submit" value="Buscar Pedido" />
			</form>
			{
				<p>
					Numero de pedido: { order.orderId },
					Contenido: { order.content },
					Estado: { order.status }
				</p>
			}
		</div>
	);
}
}

export default OrderStatus;
