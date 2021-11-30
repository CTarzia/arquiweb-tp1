import { Button, Card, CardContent, Typography} from "@mui/material";
import React from "react";
import DisplayOrderContent from "../../../../components/DisplayOrderContent";

import styles from "../../styles.module.scss"

const DisplayOrderPending = ({order}) => {

	const handleAccept = () =>{
		window.location.reload(false);
        fetch(`https://ver-la-carta.herokuapp.com/orders/${order.orderId}`, {
			method: "PUT",
			body: JSON.stringify({"status": "PROGRESS","content": order.content}),
			headers: {
				"Content-Type": "application/json",
			},
		})
    };

	const handleDeny = () =>{
		window.location.reload(false);
        fetch(`https://ver-la-carta.herokuapp.com/orders/${order.orderId}`, {
			method: "PUT",
			body: JSON.stringify({"status": "DENIED","content": order.content}),
			headers: {
				"Content-Type": "application/json",
			},

		});
		fetch(`https://ver-la-carta.herokuapp.com/mesas/${order.restoId}/${order.tableNumber}/status`, {
			method: "PUT",
			body: JSON.stringify({}),
			headers: {
				"Content-Type": "application/json",
			},
		})
    };

	return(
	<div className={styles.cardColumns}>	
		<Card > 
			<CardContent className={styles.cards}>
				<div >
					Orden {order.orderId}
					{(order.clientName) ? (
    	                <Typography>
    	                    Nombre del cliente: {order["clientName"]}
    	                </Typography>
    	            ) : (
    	                <Typography>
    	                    Número de mesa: {order["tableNumber"]}
    	                </Typography>
    	            )}
					<div class="btn-group">
						<DisplayOrderContent
    			    	    order={order}
    			    	/>
						<Button onClick = {handleAccept}>
							aceptar</Button>
						<Button onClick = {handleDeny}>
							rechazar</Button>
					</div>
				</div>
			</CardContent>
    	</Card>
	</div>
	)
};

export default DisplayOrderPending;