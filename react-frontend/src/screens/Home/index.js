import React from "react";
import { Button } from "@mui/material";
import {Link } from "react-router-dom";

import styles from "./styles.module.scss";

const Home = () => {
	return (
		<div className={styles.container}>
			<span className={styles.label}> Bienvenido! </span>
			
			<Link to="/nearbyRestaurants"><Button>Ver restaurantes cercanos</Button></Link>

			<Link to="/orderStatus"><Button>Ver estado de pedido</Button> </Link>
		</div>
	);
};

export default Home;
