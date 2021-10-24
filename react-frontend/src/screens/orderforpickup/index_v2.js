import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { Button, Typography, Container, TextField } from "@mui/material";
import ordersService from "../../services/ordersService";


import styles from "./styles.module.scss";

export default function OrderForPickup() {
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

	// Del tutorial
	/*
	useEffect(() => {
		fetch('http://localhost:8000/notes')
		  .then(res => res.json())
		  .then(data => setNotes(data))
	  }, [])
	*/
	// De lo que hicimos con chiara


	return(
		<Container align="center">
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
				</Container>
			</form>
			

		
			{/* <Container align="right">
				<Button
					variant="contained"
					onClick={() => {
						//completar
						console.log('Pedido realizado')
					}}>Hacer Pedido
				</Button>
			</Container> */}
			
		</Container>
	)
}

// ReactDOM.render(<App />, document.querySelector('#app'));
