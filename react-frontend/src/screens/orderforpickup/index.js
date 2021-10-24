import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { Button, Typography, Container, TextField } from "@mui/material";
import ordersService from "../../services/ordersService";
import { useParams } from 'react-router';


import styles from "./styles.module.scss";

const OrderForPickup = ({ location }) => {
	const [name, setName] = useState('')
	const [order, setOrder] = useState('')
	const [nameError, setNameError] = useState(false)
	const [orderError, setOrderError] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		setNameError(false)
		setOrderError(false)

		if (name == '') {
			setNameError(true)
		}
		if (order == '') {
			setOrderError(true)
		}
		if (name && order) {
			console.log(name, order)
		}
	}

	const { id: restaurantId } = useParams()

	useEffect(() => {
		fetch(
			`http://localhost:8080/restaurant/${restaurantId}`
				.then((res) => res.json())
				.then((json) => {
					this.setState({
						order: json,
						DataisLoaded: true
					});
				})
		)

	}, []

	)

	// Del tutorial
	/*
	useEffect(() => {
		console.log("useffect")
		fetch('http://localhost:3000/orders/1')
		  .then(res => res.json())
		  .then(data => setName(data))
	  }, [])
	  */

	return (
		<div>
			Prueba
			{console.log("texto")}
		</div>
		/*
		<div align="center">
			<Typography
				variant="h3"
				// component="div"
				align="center"
				gutterBottom>
				Nombre del Restaurante
			</Typography>
			
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField
					onChange={(e) => setName(e.target.value)}
					id="outlined-basic"
					label="Ingrese su nombre"
					variant="outlined"
					fullWidth
					margin="dense"
					required
					error={nameError}
				/>

				<TextField
					onChange={(e) => setOrder(e.target.value)}
					id="outlined-basic"
					label="Ingrese su pedido"
					variant="outlined"
					multiline
					rows="10"
					fullWidth
					margin="dense"
					required
					error={orderError}
				/>
				<Container align="right">
					<Button
						type="submit"
						variant="contained">
						Hacer Pedido
					</Button>
				</div>
			</form>
			
			
		</Container>*/
	)
}
export default OrderForPickup;