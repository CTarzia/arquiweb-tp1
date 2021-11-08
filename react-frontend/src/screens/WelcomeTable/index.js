import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import GoBackButton from "../../components/GoBack";
import { ROUTES } from "../../constants/routes";
import styles from "./styles.module.scss";
import { Button, ButtonGroup, Typography} from "@mui/material";


const WelcomeTable = () => {
	const [restaurantName, setRestaurantName] = useState();
    const [table, setTable] = useState();
	const [statusError, setStatusError] = useState(false);
	const [restaurantLoading, setRestaurantLoading] = useState(false);
    const [color, setColor] = useState()

	const { restoId: restaurantId} = useParams();
    const { tableId} = useParams();


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
                    setTable(json);
					setRestaurantLoading(true);
					setColor(!json.calling_server)
				}
			});
	}, []);

    const handleMozo = () =>{
        fetch(`http://localhost:8080/mesas/${restaurantId}/${tableId}/server`, {
			method: "PUT",
			body: JSON.stringify({}),
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => res.json())
		.then((json) => {
			setTable(json);
			setColor(table.calling_server);
			if (color === true){
				window.alert(`mozo llamado`);
			}else{
				window.alert(`mozo liberado`);
			}
			
		})
    };

	return (
		restaurantLoading ? (
			<div >
				<div className={styles.titleContainer}>
					
                    <h1 >{restaurantName}</h1>
					<GoBackButton route={ROUTES.HOME} />
                </div>
				
				<Typography verient="h5" className={styles.subtitle}>
					<h4>mesa {tableId}</h4>
				</Typography>
			
            	<div className={styles.displayButtonsColumn}>
					<ButtonGroup
            	    orientation="vertical"
					align="center"
            	    >
		    	        <Button variant="text" href={`/menu/${restaurantId}?mesa=${tableId}`}> 
            	            Ver carta
            	        </Button>

		    	        <Button color="primary" variant="text" href={`/restaurante/${restaurantId}/hacer_pedido?mesa=${tableId}`}> 
            	            Hacer pedido
            	        </Button>

            	        <Button
            	        onClick = {handleMozo}
            	        color={color ? "primary" : "secondary"}
            	        variant={color ? "text" : "contained"}
						> 
            	        	{color ? "LLamar mozo" : "Liberar mozo"}
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