import React from "react";
import { Button } from "@mui/material";

import DisplayOrderContent from "../DisplayOrderContent";

import styles from "../../styles.module.scss"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
        })
    };

    const handleReject = () => {
        window.location.reload(false);
        fetch(`http://localhost:8080/orders/${order.orderId}`, {
            method: "PUT",
            body: JSON.stringify({ "status": "DENIED", "content": order.content }),
            headers: {
                "Content-Type": "application/json",
            },
        })
    };



    return (
        <div className={styles.cardColumns}>
            <Card>
                <CardContent className={styles.cards}>
                    <div className={styles.displayOrder}>
                        <p>{order["orderId"]}</p>
                        <div>
                            {(order.clientName)?(
                            <p>
                                Nombre del cliente: {order["clientName"]}
                            </p>
                            ):(
                            <p>
                                Número de mesa: {order["tableNumber"]}
                            </p>
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
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DisplayOrderInProgress;

