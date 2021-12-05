import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import Restaurant from "./Restaurant";
import RestaurantInfo from "./RestaurantInfo";
import styles from "./styles.module.scss";

const NearbyRestaurants = () => {
	const [restaurantsOne, setRestaurantsOne] = useState([]);
	const [restaurantsTwo, setRestaurantsTwo] = useState([]);
	const [restaurants, setRestaurants] = useState([]);
	const [selectedRestaurant, setSelectedRestaurant] = useState();
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	useEffect(() => {
		fetch("https://ver-la-carta.herokuapp.com/restaurantes/")
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					console.log("error");
				} else {
					setRestaurantsOne(json);
				}
			});
		fetch(
			"https://virtserver.swaggerhub.com/adrian-castiglione/arquiweb-tp1/1.0.1/api/restaurants"
		)
			.then((res) => res.json())
			.then((json) => {
				setRestaurantsTwo(json.items);
			});
	}, []);

	useEffect(() => {
		setRestaurants([...restaurantsOne, ...restaurantsTwo]);
	}, [restaurantsOne, restaurantsTwo]);

	// console.log(restaurants, selectedRestaurant);

	const onSelectRestaurant = (restaurant) => {
		setSelectedRestaurant(restaurant);
		setIsPanelOpen(true);
	};

	const closePanel = () => setIsPanelOpen(false);

	// console.log(selectedRestaurant);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1> Restaurantes cercanos </h1>
				<Link to={ROUTES.HOME}>
					<button className={styles.button}> Volver </button>
				</Link>
			</div>
			<div className={styles.infoContainer}>
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
									<Restaurant
										restaurant={restaurant}
										handleClick={onSelectRestaurant}
										
									/>
								</div>
							</Popup>
						</Marker>
					))}
				</MapContainer>
				{selectedRestaurant && isPanelOpen && (
					<RestaurantInfo
						restaurant={selectedRestaurant}
						isOpen={isPanelOpen}
						handleClose={closePanel}
					/>
				)}
			</div>
		</div>
	);
};

export default NearbyRestaurants;
