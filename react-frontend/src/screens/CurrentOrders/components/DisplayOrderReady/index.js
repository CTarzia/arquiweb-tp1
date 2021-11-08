import React from "react";
import { Button, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import DisplayOrderContent from "../DisplayOrderContent";

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
        })
    };

    return (
        <div className={styles.displayOrder}>
            <div>
                <Card>
                    <CardContent>
                        <div>
                            {(order.clientName) ? (
                                <Typography>
                                    Orden para {order["clientName"]}
                                </Typography>
                            ) : (
                                <Typography>
                                    Orden para mesa {order["tableNumber"]}
                                </Typography>
                            )}
                        </div>
                        <Typography>Orden número {order["orderId"]}</Typography>
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

