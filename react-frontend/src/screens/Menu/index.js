import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./styles.module.scss";
import GoBackButton from "../../components/GoBack";
import { ROUTES } from "../../constants/routes";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Menu = () => {
	const [menu, setMenu] = useState();

	const { restoId: restaurantId } = useParams();
	const search = useLocation().search;
	const tableId = new URLSearchParams(search).get("mesa");

	function showFile(blob) {
		var newBlob = new Blob([blob], { type: "application/pdf" });

		const data = window.URL.createObjectURL(newBlob);
		var link = document.createElement("a");
		link.href = data;

		setMenu(data);
	}

	useEffect(() => {
		fetch(`https://ver-la-carta.herokuapp.com/carta/${restaurantId}`, {
			responseType: "blob",
		})
			.then((response) => response.blob())
			.then(showFile);
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
			<object data={menu} type="application/pdf" width="60%" height="500px" />
			<Link
				to={
					tableId
						? `/restaurante/${restaurantId}/hacer_pedido?mesa=${tableId}`
						: `/restaurante/${restaurantId}/hacer_pedido`
				}
			>
				<button className={styles.button}>Hacer pedido</button>
			</Link>
			{tableId && (
				<button className={styles.button} onClick={callServer}>
					{" "}
					LLamar al mozo{" "}
				</button>
			)}
		</div>
	);
};

export default Menu;
