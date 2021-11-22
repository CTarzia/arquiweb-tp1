import React from "react";
import { Button, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DisplayOrderContent from "../../../../components/DisplayOrderContent";


import styles from "../../styles.module.scss"

const DisplayOrderInProgress = ({
    order,
}) => {

    const handleReady = () => {
        window.location.reload(false);
        fetch(`http://localhost:8080/orders/${order.orderId}`, {
            method: "PUT",
            body: JSON.stringify({ "status": "READY", "content": order.content }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const handleReject = () => {
        window.location.reload(false);
        fetch(`http://localhost:8080/orders/${order.orderId}`, {
            method: "PUT",
            body: JSON.stringify({ "status": "DENIED", "content": order.content }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        fetch(`http://localhost:8080/mesas/${order.restoId}/${order.tableNumber}/status`, {
			method: "PUT",
			body: JSON.stringify({}),
			headers: {
				"Content-Type": "application/json",
			},
		})
    };



    return (
        <div className={styles.displayOrder}>
            <Card>
                <CardContent>
                    <Typography>Orden {order.orderId}</Typography>

                    <div>
                        {(order.clientName) ? (
    	                    <Typography>
    	                        Nombre del cliente: {order["clientName"]}
    	                    </Typography>
    	                ) : (
    	                    <Typography>
    	                        Número de mesa: {order["tableNumber"]}
    	                    </Typography>
    	                )}
                    </div>
                    <div class="btn-group">
                        <DisplayOrderContent
                            order={order}
                        />
                        <Button onClick={handleReady}>
                            Pedidio listo</Button>
                        <Button onClick={handleReject}>
                            Rechazar</Button>

                    </div>
                </CardContent>
            </Card>
        </div>

    );
};

export default DisplayOrderInProgress;

