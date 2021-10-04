import React from "react";
import { Button } from "@mui/material";

import styles from "./styles.module.scss";

const Home = () => {
	const handleOnClick = () => console.log("Hola!");
	return (
		<div className={styles.container}>
			<span className={styles.label}> Bienvenido </span>
			<Button onClick={handleOnClick}>Hace Click aca</Button>
		</div>
	);
};

export default Home;
