import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const Topbar = ({ returnRoute, title }) => (
	<div className={styles.title}>
		<h1> {title} </h1>
		<Link to={returnRoute}>
			<button className={styles.button}> Volver </button>
		</Link>
	</div>
);

export default Topbar;
