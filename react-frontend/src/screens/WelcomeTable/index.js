import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import GoBackButton from "../../components/GoBack";
import { apiGet, apiPost } from "../../utils/services";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { Container, Button, ButtonGroup, Typography, Box } from "@mui/material";

const WelcomeTable = () => {
	const [restaurantName, setRestaurantName] = useState();
    const [tableNumber, setTableNumber] = useState();
	const [statusError, setStatusError] = useState(false);
	const [restaurantLoading, setRestaurantLoading] = useState(false);
    const [color, setColor] = useState(true)

	const { restoId: restaurantId} = useParams();
    const { tableId: tableId} = useParams();


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
		fetch(`http://localhost:8080/mesas/${restaurantId}/${tableId}`)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					setStatusError(true);
					setRestaurantName("Su mesa no ha sido encontrado.");
				} else {
                    setTableNumber(json.tableNumber);
					setRestaurantLoading(true)
				}
			});
	}, []);

    const handleColor = () =>{
        setColor(!color);
        if (color) {
            window.alert("mozo llamado")
        } else {
            window.alert("mozo liberado")
        }
        
    };

	return (
		restaurantLoading ? (
			<div>
				<GoBackButton route={ROUTES.HOME} />
				<Typography
				align="center">
					<h1>{restaurantName}</h1>
					<h4>mesa {tableNumber}</h4>
				</Typography>
			
            <Box
                textAlign="center">
				<ButtonGroup
                orientation="vertical"
                variant="outlined"
                //size="large"
                >
					<Link 
                    to={`/menu/${restaurantId}`} 
                    >
		            <Button
                        type="submit"
                        variant="outlined"
                        > 
                        Ver carta
                    </Button>
	                </Link>

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

                    <Button
                    type="submit"
                    onClick = {handleColor}
                    color={color ? "primary" : "secondary"}
                    variant={color ? "outlined" : "contained"}> 
                    LLamar mozo
                    </Button>
				</ButtonGroup>
            </Box>
		</div>
		) : (
			<p>Recuperando información del restaurante.</p>
		)
		
	);
};
export default WelcomeTable;