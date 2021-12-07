import React from "react";
import TextField from "@mui/material/TextField";

import styles from "../../styles.module.scss";

const PostOrder = ({ handleSubmit, handleOnInputChange, tableNumber }) => {
	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.input}>
				<span className={styles.span}>Ingrese su nombre:</span>
				{tableNumber && (
					<span className={styles.span}>
						Usted está en la mesa {tableNumber}.
					</span>
				)}
				<TextField
					name="clientName"
					label="Ingrese su nombre"
					variant="outlined"
					onChange={handleOnInputChange}
				/>
			</div>

			<div className={styles.input}>
				<span className={styles.span}>Ingrese su pedido:</span>
				<TextField
					name="content"
					label="Ingrese su pedido"
					variant="outlined"
					onChange={handleOnInputChange}
				/>
			</div>
			<button type="submit" className={styles.button}>
				Enviar pedido
			</button>
		</form>
	);
};

export default PostOrder;
