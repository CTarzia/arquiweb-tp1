import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

import { ROUTES } from "../../constants/routes";
import Topbar from "../../components/Topbar";

import Restaurant from "./Restaurant";
import RestaurantInfo from "./RestaurantInfo";
import styles from "./styles.module.scss";

const NearbyRestaurants = () => {
	const [restaurantsOne, setRestaurantsOne] = useState([]);
	const [restaurantsTwo, setRestaurantsTwo] = useState([]);
	const [restaurantsThree, setRestaurantsThree] = useState([]);
	const [restaurants, setRestaurants] = useState([]);
	const [selectedRestaurant, setSelectedRestaurant] = useState();
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	useEffect(() => {
		fetch("https://ver-la-carta.herokuapp.com/restaurantes/")
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					return res.json();
				}
				return { error: "No se encontraron restaurantes" };
			})
			.then((json) => {
				if (json.error) {
					console.log("error");
				} else {
					setRestaurantsOne(json);
				}
			});
		try {
			fetch("https://arquiweb-tp1.herokuapp.com/api/restaurants", {})
				.then((res) => res.json())
				.catch((error) => console.log(error))
				.then((json) => {
					setRestaurantsTwo(json?.items || []);
				});
		} catch {
			setRestaurantsTwo([]);
		}
		try {
			fetch("http://moorfy.com:5000/clients/branches", {})
				.then((res) => res.json())
				.catch((error) => console.log(error))
				.then((json) => {
					setRestaurantsThree(json?.map((rest) => ({ ...rest, appId: 3 })) || []);
				});
		} catch {
			setRestaurantsThree([]);
		}
	}, []);

	useEffect(() => {
		setRestaurants([...restaurantsOne, ...restaurantsTwo, ...restaurantsThree]);
	}, [restaurantsOne, restaurantsTwo, restaurantsThree]);

	const onSelectRestaurant = (restaurant) => {
		setSelectedRestaurant(restaurant);
		setIsPanelOpen(true);
	};

	const closePanel = () => setIsPanelOpen(false);
	
	return (
		<div className={styles.container}>
			<Topbar returnRoute={ROUTES.HOME} title="Restaurantes cercanos" />
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
					{restaurants.map(
						(restaurant) =>
							restaurant.latitude &&
							restaurant.longitude && (
								<Marker
									position={[
										parseFloat(restaurant.latitude),
										parseFloat(restaurant.longitude),
									]}
								>
									<Popup>
										<Restaurant
											restaurant={restaurant}
											handleClick={onSelectRestaurant}
										/>
									</Popup>
								</Marker>
							)
					)}
				</MapContainer>
				{selectedRestaurant && isPanelOpen && (
					<RestaurantInfo
						restaurant={selectedRestaurant}
						isOpen={isPanelOpen && selectedRestaurant}
						handleClose={closePanel}
					/>
				)}
			</div>
		</div>
	);
};

export default NearbyRestaurants;
