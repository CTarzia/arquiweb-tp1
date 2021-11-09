import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./styles.module.scss";
import GoBackButton from "../../components/GoBack";
import { ROUTES } from "../../constants/routes";
import { Button, ButtonGroup, Typography, Box } from "@mui/material";

import RestaurantInfo from "./RestaurantInfo";

const NearbyRestaurants = () => {
	const [restaurantName, setRestaurantName] = useState();
	const [statusError, setStatusError] = useState(false);
	const [restaurantLoading, setRestaurantLoading] = useState(false);

	const { restoId: restaurantId } = useParams();

	useEffect(() => {
		fetch(`http://localhost:8080/restaurantes/${restaurantId}`)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					setStatusError(true);
					setRestaurantName("Su restaurante no ha sido encontrado.");
				} else {
					setRestaurantName(json.name);
					setRestaurantLoading(true)
				}
			});
	}, []);

	return (
		restaurantLoading ? (
			<div>
				<div className={styles.titleContainer}>
					<Typography variant="h3" component="h1">Restaurantes cercanos</Typography>
					<GoBackButton route={ROUTES.HOME} />
				</div>

				<div className={styles.managementSection}>
					<div>
						<RestaurantInfo
							restoId={1} //CAMBIAR
						/>
					</div>

					<div className={styles.rectangleOfDeath}>
						<img
							src='https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:scenic:/international/nick/shows/nickjr/dora-the-explorer/site-image/character-large-map.jpg?quality=0.75&height=0&width=480&matte=true&crop=false'
							alt="Soy el mapa!"
						/>

					</div>
				</div>
			</div>
		) : (
			<div> Recuperando información del restaurante.</div>
		)
	);
};

export default NearbyRestaurants;