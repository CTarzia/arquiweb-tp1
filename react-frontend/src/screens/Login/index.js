import { SliderValueLabelUnstyled } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";

const LogIn = () => {
	const [values, setValues] = useState({
		name: "",
		password: "",
	});

	const handleSubmit = (evt) => {
		evt.preventDefault();

		console.log(SliderValueLabelUnstyled);
	};

	const handleChange = (e) => {
		const { id, value } = e.target;
		console.log(id, value);
		setValues((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1> Bienvenido </h1>
			</div>

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.input}>
					<label htmlFor="email" className={styles.label}>
						Nombre de usuario:
					</label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Username"
						onChange={handleChange}
					/>
				</div>
				<div className={styles.input}>
					<label htmlFor="password" className={styles.label}>
						Password:
					</label>
					<input
						type="password"
						name="password"
						id="password"
						onChange={handleChange}
					/>
				</div>
				<Link to={ROUTES.BACKOFFICE_HOME}>
					<button className={styles.button}>Iniciar sesion</button>
				</Link>
			</form>
		</div>
	);
};

export default LogIn;
