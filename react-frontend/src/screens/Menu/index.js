import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./styles.module.scss";
import { CardMedia } from "@mui/material";
import { ROUTES } from "../../constants/routes";
import Topbar from "../../components/Topbar";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Menu = ({ history }) => {
	const [menuUrl, setMenuUrl] = useState();
	const [canPickup, setCanPickup] = useState(true);

	const { restoId: restaurantId } = useParams();
	const search = useLocation().search;
	const tableId = new URLSearchParams(search).get("mesa");
	const appId = parseInt(new URLSearchParams(search).get("appId"));

	useEffect(() => {
		switch (appId) {
			case 1:
				fetch(`https://ver-la-carta.herokuapp.com/carta/${restaurantId}`)
					.then((response) => {
						if (response.status === 404) {
							return "error";
						}
						return response.blob();
					})
					.then((image) => {
						if (image !== "error") {
							const localUrl = URL.createObjectURL(image);
							setMenuUrl(localUrl);
						}
					});
				break;
			case 2:
				fetch("https://arquiweb-tp1.herokuapp.com/api/restaurants", {})
					.then((res) => res.json())
					.catch((error) => console.log(error))
					.then((json) => {
						const restaurant = json.items.find((res) => res.id == restaurantId);
						setCanPickup(restaurant.has_pickup);
						setMenuUrl(restaurant.menu_link);
						if (restaurant) {
						} else {
							window.alert("hubo un error al recuperar su menu");
							history.push(ROUTES.NEARBY_RESTAURANTS);
						}
					});
				break;
			case 3:
				fetch("http://moorfy.com:5000/clients/branches", {})
					.then((res) => res.json())
					.catch((error) => console.log(error))
					.then((json) => {
						const restaurant = json.find(
							(res) => res.branch_id == restaurantId
						);
						setMenuUrl(restaurant.menu_url);
					});
				break;
			default:
				window.alert("hubo un error al recuperar su menu");
				history.push(ROUTES.NEARBY_RESTAURANTS);
				break;
		}
	}, []);

	const callServer = () => {
		fetch(
			`https://ver-la-carta.herokuapp.com/mesas/${restaurantId}/${tableId}/call`,
			{
				method: "POST",
				body: JSON.stringify({}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => res.json())
			.then((json) => {
				window.alert("Mesero en camino!");
			});
	};

	return (
		<div className={styles.container}>
			<Topbar returnRoute={ROUTES.NEARBY_RESTAURANTS} title="Menu" />
			<div className={styles.content}>
				{menuUrl && (
					<CardMedia
						component="img"
						classes={{ root: styles.image }}
						image={menuUrl}
						alt="img reastaurant"
					/>
				)}
			</div>
			<div className={styles.buttons}>
				{canPickup && (
					<Link
						to={
							tableId
								? `/restaurante/${restaurantId}/hacer_pedido?mesa=${tableId}`
								: `/restaurante/${restaurantId}/hacer_pedido`
						}
					>
						<button className={styles.button}>Hacer pedido</button>
					</Link>
				)}
				{tableId && (
					<button className={styles.button} onClick={callServer}>
						LLamar al mozo
					</button>
				)}
			</div>
		</div>
	);
};

export default Menu;
