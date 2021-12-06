import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";

const LogIn = ({ history }) => {
	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	const handleSubmit = (evt) => {
		evt.preventDefault();

		history.push(ROUTES.BACKOFFICE_HOME);
	};

	const handleChange = (e) => {
		const { id, value } = e.target;
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
					<label className={styles.label}>Nombre de usuario:</label>
					<input
						type="text"
						name="username"
						id="username"
						onChange={handleChange}
					/>
				</div>
				<div className={styles.input}>
					<label className={styles.label}>Password:</label>
					<input
						type="password"
						name="password"
						id="password"
						onChange={handleChange}
					/>
				</div>

				<button className={styles.button} onClick={handleSubmit}>
					Iniciar sesion
				</button>

				<Link to={ROUTES.SIGN_UP}>
					<button className={styles.button}>Crear usuario</button>
				</Link>
			</form>
		</div>
	);
};

export default LogIn;
