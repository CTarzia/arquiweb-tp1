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
	  alert('A name was submitted: ' + this.state.value);
	  fetch(
		"http://localhost:8080/orders/${encodeURIComponent(this.state.value)}")
					.then((res) => res.json())
					.then((json) => {
						this.setState({
							order: json,
							DataisLoaded: true
						});
					})
	  event.preventDefault();
	}


	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		fetch(
			"http://localhost:8080/orders/${encodeURIComponent(this.state.value)}")
						.then((res) => res.json())
						.then((json) => {
							this.setState({
								order: json,
								DataisLoaded: true
							});
						})
	}
	render() {
		const { DataisLoaded, order } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Por favor espere.... </h1> </div> ;

		return (
		<div className = "App">
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
