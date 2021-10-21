import React from "react";
// import { Button } from "@mui/material";
import {Link } from "react-router-dom";

import styles from "./styles.module.scss";

const Home = () => {
	// const handleNearbyRestaurants = () => alert("1");
	// const handleOrderStatus = () => alert("2");
	return (
		<div className={styles.container}>
			<span className={styles.label}> Bienvenido! </span>
			
			<Link to="/nearbyRestaurants"><button>Ver restaurantes cercanos</button></Link>

			<Link to="/orderStatus"><button>Ver estado de pedido</button> </Link>
		</div>
	);
};

export default Home;
