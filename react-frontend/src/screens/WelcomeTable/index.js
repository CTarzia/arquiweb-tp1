import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import GoBackButton from "../../components/GoBack";
import { apiGet, apiPost } from "../../utils/services";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { Container, Button, ButtonGroup, Typography, Box } from "@mui/material";
import DisplayMenu from "./components/DisplayMenu";

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

    const handleMozo = () =>{
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
				<div className={styles.titleContainer}>
                    <h1>Pedidos en curso {restaurantName}</h1>
                    <GoBackButton route={ROUTES.HOME} />
                </div>
				<div className={styles.table}>
					mesa {tableId}
				</div>
			
            <div className={styles.displayButtonsColumn}>
				<ButtonGroup
                orientation="vertical"
				align="center"
                >
					<Link  to={`/menu/${restaurantId}`}>
		            <Button> 
                        Ver carta
                    </Button>
	                </Link>

                    <Link to={`/restaurante/${restaurantId}/hacer_pedido`} >
		            <Button> 
                        Hacer pedido
                    </Button>
	                </Link>

                    <Button
                    onClick = {handleMozo}
                    color={color ? "primary" : "primary"}
                    variant={color ? "default" : "contained"}> 
                    LLamar mozo
                    </Button>
				</ButtonGroup>
            </div>
		</div>
		) : (
			<p>Recuperando información del restaurante.</p>
		)
		
	);
};
export default WelcomeTable;