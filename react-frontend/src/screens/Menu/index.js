import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./styles.module.scss";
import GoBackButton from "../../components/GoBack";
import { ROUTES } from "../../constants/routes";
import { Avatar, Button, Typography} from "@mui/material";
import { useLocation } from "react-router-dom";

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
    })

const Menu = () => {
	const [restaurantName, setRestaurantName] = useState();
	const [statusError, setStatusError] = useState(false);
	const [restaurantLoading, setRestaurantLoading] = useState(false);
	const [menu, setMenu] = useState();

	const { restoId: restaurantId} = useParams();
	const search = useLocation().search;
	const tableId = new URLSearchParams(search).get('mesa');

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
			fetch(`http://localhost:8080/carta/${restaurantId}`)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					setStatusError(true);
					setMenu("Su menu no ha sido encontrado. ");
				} else {
					console.log(json);
					console.log(typeof(fileToDataUri(json)));
					fileToDataUri(json)
      				.then(menu => {
      				  setMenu(menu)
      				})
					setRestaurantLoading(true)
				}
			});
	}, []);

	return (
		restaurantLoading ? (
			<div>
				<div className={styles.titleContainer}>
        		    <h1 > {restaurantName}</h1>
					<GoBackButton route={ROUTES.HOME} />
        		</div>
				<div>
					<Typography verient="h5" className={styles.subtitle}>
						<h4>Menu</h4>
					</Typography>

					<img src={menu} type="application/pdf"  width="800px" height="300px"/>

			    	<Button variant="text" href={(tableId) ? (`/restaurante/${restaurantId}/hacer_pedido?mesa=${tableId}`) : (`/restaurante/${restaurantId}/hacer_pedido`)}> 
        	    	    Hacer pedido
        	    	</Button>
				</div>			
    		</div>
		) : (
			<p>Recuperando información del restaurante.</p>
		)
    );
};

export default Menu;