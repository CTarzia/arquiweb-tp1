import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";

const TableStatus = () => {
	const { id: restaurantId } = useParams();

	const [tables, setTables] = useState([]);

	useEffect(() => {
		fetch(`https://ver-la-carta.herokuapp.com/mesas/${restaurantId}`)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					console.log("error");
				} else {
					setTables([{ table_number: 5 }]);
				}
			});
	}, [restaurantId]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1> Restaurantes cercanos </h1>
				<Link to={ROUTES.BACKOFFICE_HOME}>
					<button className={styles.button}> Volver </button>
				</Link>
			</div>
			<div className={styles.content}>
				{tables.map((table) => (
					<div className={styles.table}>
						{`Numero de Mesa ${table.table_number}`}
						<div>
							<QRCode
								value={`/restaurante/${restaurantId}/hacer_pedido?mesa=${table.table_number}`}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TableStatus;
