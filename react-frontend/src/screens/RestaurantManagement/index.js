import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./styles.module.scss";
import GoBackButton from "../../components/GoBack";
import { ROUTES } from "../../constants/routes";
import { Button, ButtonGroup, Typography, Box } from "@mui/material";
import DisplayTable from "./DisplayTable";

const RestaurantManagment = () => {
	const [restaurantName, setRestaurantName] = useState();
    const [tables, setTables] = useState([]);
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

	const handleTables = () => {
		fetch(`http://localhost:8080/mesas/${restaurantId}`)
		.then((res) => res.json())
		.then((json) => {
			setTables(json)
		});
	}

	return (
		<div>
			<div className={styles.titleContainer}>
        	    <h1 > {restaurantName}</h1>
				<GoBackButton route={ROUTES.HOME} />
        	</div>
			<Typography verient="h5" className={styles.subtitle}>
				<h4>Gestion del local</h4>
			</Typography>

			<div className={styles.managementSection}>
				<div>
					<div className={styles.info}>
						<p>nombre del local:</p>
						<p>horarios:</p>
						<p>datos de contacto:</p>
						<p>direccion:</p>
					</div>
					<ButtonGroup
            		orientation="vertical"
            		>
						<Button variant="text" > 
							Editar Logo
            			</Button>
						<Button variant="text" > 
							Editar Carta
            			</Button>
						<Button variant="text" > 
							Editar Fotos
            			</Button>
		    			<Button variant="text"  onClick={handleTables}> 
							Gestionar mesas
            			</Button>
					</ButtonGroup>
				</div>

				<div className={styles.rectangleOfDeath}>
					<div className={styles.displayOrdersColumns}>
						{tables.map(table => (
                    	    <DisplayTable
                    	        table={table}
                    	    />
                    	))}
					</div>
				</div>
			</div>
    	</div>
    );
};

export default RestaurantManagment;