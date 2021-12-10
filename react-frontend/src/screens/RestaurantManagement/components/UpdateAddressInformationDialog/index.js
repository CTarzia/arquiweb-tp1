import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { CircularProgress } from "@mui/material";

import styles from "./styles.module.scss";

const UpdateAddressInformationDialog = ({
	generalDialogOpen,
	handleCloseDialogs,
	handleSubmit,
	handleChange,
	values,
	loading,
}) => (
	<Dialog open={generalDialogOpen} onClose={handleCloseDialogs}>
		<DialogTitle>Editar Direccion:</DialogTitle>
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.input}>
				<input
					type="text"
					name="latitude"
					id="latitude"
					onChange={handleChange}
					value={values.latitude}
				/>
				<input
					type="text"
					name="longitude"
					id="longitude"
					onChange={handleChange}
					value={values.longitude}
				/>
			</div>

			<button
				className={loading ? styles.disabledButton : styles.button}
				onClick={handleSubmit}
				disabled={loading}
			>
				{loading ? (
					<CircularProgress classes={{ root: styles.progress }} />
				) : (
					"Aceptar"
				)}
			</button>
		</form>
	</Dialog>
);

export default UpdateAddressInformationDialog;
