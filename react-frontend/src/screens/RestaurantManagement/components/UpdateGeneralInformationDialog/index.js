import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { CircularProgress } from "@mui/material";

import styles from "./styles.module.scss";

const UpdateGeneralInformationDialog = ({
	generalDialogOpen,
	handleCloseDialogs,
	handleSubmit,
	handleChange,
	values,
	loading,
}) => (
	<Dialog open={generalDialogOpen} onClose={handleCloseDialogs}>
		<DialogTitle>Editar informacion:</DialogTitle>
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.input}>
				<input
					type="text"
					name={generalDialogOpen}
					id={generalDialogOpen}
					onChange={handleChange}
					value={values[generalDialogOpen]}
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

export default UpdateGeneralInformationDialog;
