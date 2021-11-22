import React from "react";
import { Button, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DisplayOrderContent from "../../../../components/DisplayOrderContent";


import styles from "../../styles.module.scss"

const DisplayOrderReady = ({
    order,
}) => {

    const handleInProgress = () => {
        window.location.reload(false);
        fetch(`http://localhost:8080/orders/${order.orderId}`, {
            method: "PUT",
            body: JSON.stringify({ "status": "PROGRESS", "content": order.content }),
            headers: {
                "Content-Type": "application/json",
            },
        })
    };

    const handleDelete = () => {
        window.location.reload(false);
        fetch(`http://localhost:8080/orders/${order.orderId}`, {
            method: "DELETE",
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
            <div>
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
                            <Button onClick={handleInProgress}>
                                IN PROGRESS</Button>
                            <Tooltip title="Eliminar pedido" >
                                <IconButton aria-label="delete" onClick={handleDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>

                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>

    );
};

export default DisplayOrderReady;

