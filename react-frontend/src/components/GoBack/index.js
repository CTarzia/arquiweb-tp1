import React from "react";
import { Link } from "react-router-dom";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import styles from "./styles.module.scss";

const GoBackButton = ({ route }) => (
	<Link to={route}>
		<button className={styles.button}>
			<HighlightOffIcon />
		</button>
	</Link>
);

export default GoBackButton;
