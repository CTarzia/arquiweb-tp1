import { Button, Card, CardContent, Typography} from "@mui/material";
import React, { useState, useEffect } from "react";
import DisplayOrderContent from "../../../../components/DisplayOrderContent";

import styles from "../../styles.module.scss"

const DisplayOrderPending = ({order}) => {
	const [numberOfTable, setTableNumber] = useState();
	const [statusError, setStatusError] = useState(false);
	const [ready, setReady] = useState()

	useEffect(() => {
		//console.log(order.tableNumber)
        fetch(`https://ver-la-carta.herokuapp.com/mesas/${order.restoId}/${order.tableNumber}`)
            .then((res) => res.json())
            .then((json) => {
                if (json.status === 404) {
                    setStatusError(true);
                } else {
                    setTableNumber(json.tableNumber);
                }
            });
		}, []);

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

		})
		fetch(`https://ver-la-carta.herokuapp.com/mesas/${order.restoId}/${order.tableNumber}/status`, {
			method: "PUT",
			body: JSON.stringify({}),
			headers: {
				"Content-Type": "application/json",
			},
		})
		window.location.reload(true);
    };

	return(
	<div className={styles.cardColumns}>	
		<Card > 
			<CardContent className={styles.cards}>
				<div >
					Orden {order.orderId}
					{(order.clientName) ? (
    	                <Typography>
    	                    Nombre del cliente: {order.clientName}
    	                </Typography>
    	            ) : (
    	                <Typography>
    	                    Número de mesa: {numberOfTable}
    	                </Typography>
    	            )}
					<div>
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