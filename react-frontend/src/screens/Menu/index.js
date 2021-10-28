import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import GoBackButton from "../../components/GoBack";
import { apiGet, apiPost } from "../../utils/services";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Typography, Box } from "@mui/material";

const Menu = () => {
	const [restaurantName, setRestaurantName] = useState();
    const [tableNumber, setTableNumber] = useState();
	const [statusError, setStatusError] = useState(false);
	const [restaurantLoading, setRestaurantLoading] = useState(false);
    const [color, setColor] = useState(true)
	
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
		<div>
		<GoBackButton route={ROUTES.HOME} />
		<Typography
		align="center">
			<h1>{restaurantName}</h1>
			<h4>Menu {tableNumber}</h4>
		</Typography>

		

		<Link 
        to={`/restaurante/${restaurantId}/hacer_pedido`} 
        >
		<Button
            type="submit"
            variant="outlined"
            > 
            Hacer pedido
        </Button>
	    </Link>
    	</div>
    );
};

export default Menu;