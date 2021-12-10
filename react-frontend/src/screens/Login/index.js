import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import { ROUTES } from "../../constants/routes";
import { UserContext } from "../../context";
import PasswordField from "../../components/PasswordField";

import styles from "./styles.module.scss";

const LogIn = ({ history }) => {
	const { setUserId, setUserName, setRestaurantId } = useContext(UserContext);

	const [loading, setLoading] = useState(false);

	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	const handleSubmit = (evt) => {
		evt.preventDefault();
		setLoading(true);

		fetch(
			`https://ver-la-carta.herokuapp.com/usuarios/${values.username}/${values.password}`
		)
			.then((res) => res.json())
			.then((json) => {
				setRestaurantId(json.restaurantId);
				setUserId(json.id);
				setUserName(json.username);
				setLoading(false);
				history.push(ROUTES.BACKOFFICE_HOME);
			});
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
				<PasswordField onChangePassword={handleChange} />

				<button
					className={loading ? styles.disabledButton : styles.button}
					onClick={handleSubmit}
					disabled={loading}
				>
					{loading ? (
						<CircularProgress classes={{ root: styles.progress }} />
					) : (
						"Iniciar sesion"
					)}
				</button>

				<Link to={ROUTES.SIGN_UP}>
					<button className={styles.button}>Crear usuario</button>
				</Link>
			</form>
		</div>
	);
};

export default LogIn;
