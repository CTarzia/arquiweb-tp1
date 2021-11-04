import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { apiGet, apiPost } from "../../utils/services";
import styles from "./styles.module.scss";
import GoBackButton from "../../components/GoBack";
import DisplayOrder from "./components/DisplayOrderPending";
import { ROUTES } from "../../constants/routes";
import { pendingFilter } from "./utils/filters";
import { Typography} from "@mui/material";

const PendingOrders = () => {
    const [restaurantName, setRestaurantName] = useState();
    const [restaurantLoading, setRestaurantLoading] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const [pendingOrders, setPendingOrders] = useState([]);

    const { id: restaurantId } = useParams();
    const [ordersLoading, setOrdersLoading] = useState(false);

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

        fetch(`http://localhost:8080/restaurantes/${restaurantId}/pedidos`)
            .then((res) => res.json())
            .then((json) => {
                if (json.status === 404) {
                    setStatusError(true);
                    setRestaurantName("Su restaurante no ha sido encontrado.");
                } else {
                    setPendingOrders(json.filter(pendingFilter))
                    setOrdersLoading(true)
                    
                }
            });
        // apiGet(`http://localhost:8080/restaurantes/${restaurantId}`)
    }, []);

    
    return (
        restaurantLoading ? (
            <div>
                <div className={styles.titleContainer}>
                    <h1>Pedidos en curso {restaurantName}</h1>
                    <GoBackButton route={ROUTES.HOME} />
                </div>

                <div>{(ordersLoading) ? (
                    <div className={styles.displayOrdersColumns}>
                        <div>
                            <Typography variant="h5" align="center"> Pedidos pendientes </Typography>
                            {pendingOrders.map(order => (
                                <DisplayOrder
                                    order={order}
                                />
                            ))}
    
                        </div>
                    </div>
                    ) : (
                        <p>Recuperando información de pedidos pendientes.</p>
                    )}
                </div>
            </div>             
        ) : (
            <p>Recuperando información del restaurante.</p>
        )
    )
}

export default PendingOrders