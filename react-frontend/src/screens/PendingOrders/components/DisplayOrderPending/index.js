import { Button, Card, CardContent} from "@mui/material";
import React from "react";
import DisplayOrderContent from "../../../CurrentOrders/components/DisplayOrderContent";
import styles from "../../styles.module.scss"

const DisplayOrderPending = ({order}) => {

	const handleAccept = () =>{
		window.location.reload(false);
        fetch(`http://localhost:8080/orders/${order.orderId}`, {
			method: "PUT",
			body: JSON.stringify({"status": "PROGRESS","content": order.content}),
			headers: {
				"Content-Type": "application/json",
			},
		})
    };

	const handleDeny = () =>{
		window.location.reload(false);
        fetch(`http://localhost:8080/orders/${order.orderId}`, {
			method: "PUT",
			body: JSON.stringify({"status": "DENIED","content": order.content}),
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
					{order.orderId}
					{(order.clientName) ? (
    	                <p>
    	                    Nombre del cliente: {order["clientName"]}
    	                </p>
    	            ) : (
    	                <p>
    	                    Número de mesa: {order["tableNumber"]}
    	                </p>
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