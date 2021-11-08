import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./styles.module.scss";
import GoBackButton from "../../components/GoBack";
import { ROUTES } from "../../constants/routes";
import { Button, Typography} from "@mui/material";


const Menu = () => {
	const [restaurantName, setRestaurantName] = useState();
	const [statusError, setStatusError] = useState(false);
	const [restaurantLoading, setRestaurantLoading] = useState(false);
	
	const { restoId: restaurantId} = useParams();

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
        		    <h1 > {restaurantName}</h1>
					<GoBackButton route={ROUTES.HOME} />
        		</div>
				<Typography verient="h5" className={styles.subtitle}>
					<h4>Menu</h4>
				</Typography>

			    <Button variant="text" href={`/restaurante/${restaurantId}/hacer_pedido`}> 
        	        Hacer pedido
        	    </Button>
			
    		</div>
		) : (
			<p>Recuperando información del restaurante.</p>
		)
    );
};

export default Menu;