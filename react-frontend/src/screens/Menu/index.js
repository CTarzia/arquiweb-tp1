import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./styles.module.scss";
import GoBackButton from "../../components/GoBack";
import { ROUTES } from "../../constants/routes";
import { Button, Typography} from "@mui/material";
import { useLocation } from "react-router-dom";

const Menu = () => {
	const [restaurantName, setRestaurantName] = useState();
	const [statusError, setStatusError] = useState(false);
	const [restaurantLoading, setRestaurantLoading] = useState(false);
	const [menu, setMenu] = useState();
	const [menuLoading, setMenuLoading] = useState(false);

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
		.then(response => response.blob())
		.then(file => {
			// Create a local URL of that image
			const localUrl = URL.createObjectURL(file);
			setMenu(localUrl);
			setMenuLoading(true);
		});
	}, []);

	return (
		restaurantLoading ? (
			menuLoading ? (
				<div>
					<div className={styles.titleContainer}>
        			    <h1 > {restaurantName}</h1>
						<GoBackButton route={ROUTES.HOME} />
        			</div>
					<div>
						<Typography verient="h5" className={styles.subtitle}>
							<h4>Menu</h4>
						</Typography>

						<iframe src="http://localhost:3000/6de81bf7-5f2e-44c2-93c0-758da95efdc5" width="100%" height="500px">	
    					</iframe>	

						<a href={menu}> </a> 

						{console.log("soy un pdf")}
						{console.log(menu)}

						<embed src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ee5d5337-c821-47c5-ae08-dbe7b71a8a69/VerLaCarta.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211109T195226Z&X-Amz-Expires=86400&X-Amz-Signature=9c4f13df72504f164dbfbef436f84a7da5f535e71323e61671f3d1cb857ebed7&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22VerLaCarta.pdf%22" type="application/pdf" width="100%" height="600px" />

				    	<Button variant="text" href={(tableId) ? (`/restaurante/${restaurantId}/hacer_pedido?mesa=${tableId}`) : (`/restaurante/${restaurantId}/hacer_pedido`)}> 
        		    	    Hacer pedido
        		    	</Button>
					</div>			
    			</div>
			):(
				<div>recuperando menu del restaurante</div>
			)
		) : (
			<div>Recuperando información del restaurante.</div>
		)
    );
};

export default Menu;