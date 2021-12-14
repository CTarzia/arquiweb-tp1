import React from "react";

import GetOrderStatus from "./components/GetOrderStatus";

class OrderStatus extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			order: String,
			dataisLoaded: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const params = this.state.value.split("-").map((val) => parseInt(val));
		console.log(params);
		switch (params[0]) {
			case 1:
				fetch("https://ver-la-carta.herokuapp.com/orders/" + params[2])
					.then((res) => res.json())
					.then((json) => {
						this.setState({
							order: `Hola ${json.clientName}, su numero de pedido ${this.state.value} se encuentra en estado: ${json.status}.
							\nPedido: ${json.content}`,
						});
					});
				break;
			case 2:
				fetch(
					`https://arquiweb-tp1.herokuapp.com/api/restaurants/${params[1]}/orders/${params[2]}/check`
				)
					.then((res) => res.json())
					.then((json) => {
						this.setState({
							order: `Hola , su numero de pedido ${this.state.value} se encuentra en estado: ${json.state_text}.`,
						});
					});
				break;
			case 3:
				fetch(
					`http://moorfy.com:5000/clients/ask_status_of_order?branch_id=${params[1]}&table_id=0&user_id=0&orden id=${params[2]}`
				)
					.then((res) => res.json())
					.then((json) => {
						this.setState({
							order: `Hola , su numero de pedido ${this.state.value} se encuentra en estado: ${json.state_text}.`,
						});
					});
				break;
			default:
				window.alert("Ingreso un numero de pedido incorrecto");
				break;
		}
	}

	render() {
		const { order } = this.state;

		const showError = order.status === "404";

		return (
			<GetOrderStatus
				handleSubmit={this.handleSubmit}
				handleChange={this.handleChange}
				inputValue={this.state.value}
				showError={showError}
				order={order}
			/>
		);
	}
}

export default OrderStatus;
