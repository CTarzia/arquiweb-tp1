import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";

const NearbyRestaurants = () => {
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
		fetch("https://ver-la-carta.herokuapp.com/restaurantes/")
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					console.log("error");
				} else {
					// setRestaurants(json);
					// TODO: Desmockear
					setRestaurants([
						{
							id: 95,
							name: "Academia de la pizza",
							latitude: "-34.56222166152231",
							longitude: "-58.456751667285616",
							phoneNumber: "011 5786-0330",
							workingHours: "07:00-00:00",
						},
						{
							id: 105,
							name: "Pizzeria Guerrin",
							latitude: "-34.60405877177748",
							longitude: "-58.385979106053924",
							phoneNumber: "4371-8141",
							workingHours: "11:00-01:00",
						},
					]);
				}
			});
	}, []);

	const onGoHome = () => console.log(restaurants);

	return (
		<div className={styles.mapContainer}>
			<div className={styles.title}>
				<h1> Restaurantes cercanos </h1>
				<Link to={ROUTES.HOME}>
					<button className={styles.button}> Volver </button>
				</Link>
			</div>
			<MapContainer
				className={styles.map}
				center={[-34.603722, -58.381592]}
				zoom={12}
				scrollWheelZoom
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				{restaurants.map((restaurant) => (
					<Marker
						position={[
							parseFloat(restaurant.latitude),
							parseFloat(restaurant.longitude),
						]}
					>
						<Popup>
							<div className={styles.pin}>
								<span className={styles.label}> {restaurant.name} </span>
								<span className={styles.label}> {restaurant.phoneNumber} </span>
								<span className={styles.label}>{restaurant.workingHours} </span>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
};

export default NearbyRestaurants;
