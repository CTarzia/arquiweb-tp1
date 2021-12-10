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
		fetch("https://ver-la-carta.herokuapp.com/orders/" + this.state.value)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					order: json,
				});
			});
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
