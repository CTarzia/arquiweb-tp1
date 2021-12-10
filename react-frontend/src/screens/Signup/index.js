import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Snackbar, Alert, CircularProgress } from "@mui/material";

import { ROUTES } from "../../constants/routes";
import PasswordField from "../../components/PasswordField";

import styles from "./styles.module.scss";

const Signup = ({ history }) => {
	const [values, setValues] = useState({
		username: "",
		password: "",
	});
	const [coordinates, setCoordinates] = useState({
		latitude: null,
		longitude: null,
	});
	const [snackbarOptions, setSnackbarOptions] = useState({
		isOpen: false,
		message: "",
	});
	const [loading, setLoading] = useState(false);

	const saveLocation = (pos) =>
		setCoordinates({
			latitude: pos?.coords?.latitude.toString(),
			longitude: pos?.coords?.longitude.toString(),
		});

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(saveLocation);
		}
	}, []);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		setLoading(true);

		const restaurant = {
			name: "Restaurante nuevo",
			...coordinates,
		};

		fetch(`https://ver-la-carta.herokuapp.com/restaurantes/`, {
			method: "POST",
			body: JSON.stringify({ ...restaurant }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				fetch(`https://ver-la-carta.herokuapp.com/usuarios/`, {
					method: "POST",
					body: JSON.stringify({ ...values, restaurantId: json.id }),
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((res) => res.json())
					.then((json) => {
						console.log(json);
						setSnackbarOptions({
							isOpen: true,
							message: "Su usuario se ha creado con exito",
						});
						setLoading(false);
					});
			});
	};

	const handleChange = (e) => {
		const { id, value } = e.target;
		setValues((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleCloseSnackbar = () => {
		setSnackbarOptions({
			isOpen: false,
			message: "Su usuario se ha creado con exito: Redirigiendo",
		});
		history.push(ROUTES.LOGIN);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1> Crear usuario </h1>
			</div>

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.input}>
					<label className={styles.label}>Nombre de usuario:</label>
					<input
						type="text"
						name="username"
						id="username"
						onChange={handleChange}
					/>
				</div>
				<PasswordField onChangePassword={handleChange} />

				<button
					className={loading ? styles.disabledButton : styles.button}
					onClick={handleSubmit}
					disabled={loading}
				>
					{loading ? (
						<CircularProgress classes={{ root: styles.progress }} />
					) : (
						"Crear usuario"
					)}
				</button>

				<Link to={ROUTES.LOGIN}>
					<button className={styles.button}>Iniciar Sesion</button>
				</Link>
			</form>
			<Snackbar
				open={snackbarOptions.isOpen}
				autoHideDuration={3000}
				onClose={handleCloseSnackbar}
			>
				<Alert severity="success" sx={{ width: "100%" }} variant="filled">
					{snackbarOptions.message}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Signup;
