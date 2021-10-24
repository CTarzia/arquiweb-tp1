import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { Button, Typography, Container, TextField } from "@mui/material";
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ordersService from "../../services/ordersService";
import { ROUTES } from "../../constants/routes";
import styles from "./styles.module.scss";

const OrderForPickup = ({ location }) => {
	const [restaurantName, setRestaurantName] = useState()
	const [statusError, setStatusError] = useState(false)
	const [order, setOrder] = useState({})
	const { id: restaurantId } = useParams()

	useEffect(() => {
		fetch(
			`http://localhost:8080/restaurantes/${restaurantId}`)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					setStatusError(true)
					setRestaurantName("Su restaurante no ha sido encontrado.")
				} else {
					setRestaurantName(json.name)
				}
			})
	}, [])

	const handleOnInputChange = (evt) => {
		setOrder({ ...order, [evt.target.name]: evt.target.value })
	}

	const handleSubmit = (evt) => {
		evt.preventDefault()
		fetch(
			`http://localhost:8080/orders/client/${restaurantId}`, {
				method: 'POST', body: JSON.stringify(order), headers: {
					'Content-Type': 'application/json'
				}
		})
			.then((res) => res.json())
			.then((json) => {
				window.alert(`Su número de pedido es: ${json}`)
			}
			)

	}

	return (
		<div>
			<div>
				<h1>{restaurantName}</h1>
				<Link to={ROUTES.HOME}>
					<button type="button">
						<HighlightOffIcon />
					</button>
				</Link>
			</div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Ingrese su nombre:
					</label>
					<input type="text" name="clientName" onChange={handleOnInputChange} />
				</div>
				<div>
					<label>
						Ingrese su pedido:
					</label>
					<input type="text" name="content" onChange={handleOnInputChange} />
				</div>
				<button type="submit">
					Enviar pedido
				</button>
			</form>
		</div>

	)
}
export default OrderForPickup;