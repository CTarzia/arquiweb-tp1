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

	function showFile(blob){
		// It is necessary to create a new blob object with mime-type explicitly set
		// otherwise only Chrome works like it should
		var newBlob = new Blob([blob], {type: "application/pdf"})
	  
		// IE doesn't allow using a blob object directly as link href
		// instead it is necessary to use msSaveOrOpenBlob
	
		// For other browsers: 
		// Create a link pointing to the ObjectURL containing the blob.
		const data = window.URL.createObjectURL(newBlob);
		var link = document.createElement('a');
		link.href = data;
		//link.download="file.pdf";
		//link.click();
		//setTimeout(function(){
		//  // For Firefox it is necessary to delay revoking the ObjectURL
		//  window.URL.revokeObjectURL(data);
		//}, 100);
		setMenu(data);
		setMenuLoading(true);
	};

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
		fetch(`http://localhost:8080/carta/${restaurantId}`,{responseType: "blob"})
		
		//.then(response => response.blob())
		//.then(file => {
		//	Create a local URL of that file
		//	const fileUrl = URL.createObjectURL(file);
		//	console.log(file);
		//	setMenu(fileUrl);
		//	setMenuLoading(true);
		
		.then(response => response.blob())
		.then(showFile)
		
		//.then(response =>{
		//	const file = new Blob([response.data], {type: 'application/pdf'});
		//	const url = URL.createObjectURL(file);
		//	setMenu(url);
		//	setMenuLoading(true);
		//});
	},[]);

	return (
		restaurantLoading ? (
			menuLoading ? (
				<div>
					<div className={styles.titleContainer}>
						<Typography variant="h3" component="h1">{restaurantName}</Typography>
						<GoBackButton route={ROUTES.HOME} />
        			</div>
					<Typography variant="h5" className={styles.subtitle}>
							Menu
					</Typography>
					<div className={styles.menuButton}>					
						
						<object data={menu} type="application/pdf" width="60%" height="500px" />

				    	<Button variant="text" href={(tableId) ? (`/restaurante/${restaurantId}/hacer_pedido?mesa=${tableId}`) : (`/restaurante/${restaurantId}/hacer_pedido`)} className={styles.submitButton}> 
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