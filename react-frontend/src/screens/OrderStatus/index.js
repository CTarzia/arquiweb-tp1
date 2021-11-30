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
		fetch("https://ver-la-carta.herokuapp.com/orders/" + this.state.value)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					order: json,
					dataisLoaded: true,
				});
			});
		event.preventDefault();
	}
	

	render() {
		const { dataisLoaded, order } = this.state;

		const showError = order.status === "404";

		return dataisLoaded ? (
			<p> Recuperando informacion del pedido </p>
		) : (
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
