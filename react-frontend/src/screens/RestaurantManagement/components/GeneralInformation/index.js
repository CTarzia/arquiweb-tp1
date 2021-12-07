import React from "react";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./styles.module.scss";

const GeneralInformation = ({ restaurant, handleEdit, handleEditAddress }) => (
	<div className={styles.informationContainer}>
		<span className={styles.informationTitle}>Informacion General:</span>
		<div className={styles.information}>
			<div className={styles.informationName}>
				<li className={styles.bullet} /> {`Nombre: ${restaurant.name}`}
			</div>
			<button className={styles.iconButton} onClick={() => handleEdit("name")}>
				<EditIcon classes={styles.icon} />
			</button>
		</div>
		<div className={styles.information}>
			<div className={styles.informationName}>
				<li className={styles.bullet} />
				{`Horarios: ${restaurant.workingHours || "-"}`}
			</div>
			<button
				className={styles.iconButton}
				onClick={() => handleEdit("workingHours")}
			>
				<EditIcon classes={styles.icon} />
			</button>
		</div>
		<div className={styles.information}>
			<div className={styles.informationName}>
				<li className={styles.bullet} />
				{`Contacto: ${restaurant.phoneNumber || "-"}`}
			</div>
			<button
				className={styles.iconButton}
				onClick={() => handleEdit("phoneNumber")}
			>
				<EditIcon classes={styles.icon} />
			</button>
		</div>
		<div className={styles.information}>
			<div className={styles.informationName}>
				<li className={styles.bullet} />
				{`Direccion: LAT:${restaurant.latitude};LON:${restaurant.longitude}`}
			</div>
			<button className={styles.iconButton} onClick={() => handleEditAddress()}>
				<EditIcon classes={styles.icon} />
			</button>
		</div>
	</div>
);

export default GeneralInformation;
