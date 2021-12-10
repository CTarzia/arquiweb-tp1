import React, { useContext, useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { CircularProgress } from "@mui/material";
import QRCode from "react-qr-code";
import { Dialog, DialogTitle } from "@mui/material";

import PublicTopbar from "../../components/PublicTopbar";
import { UserContext } from "../../context";
import { ROUTES } from "../../constants/routes";
import styles from "./styles.module.scss";

const TableManagement = ({ history }) => {
	const { userId, restaurantId, restaurant } = useContext(UserContext);
	const [tables, setTables] = useState([]);
	const [newTableLoading, setNewTableLoading] = useState(false);
	const [qrValue, setQrValue] = useState("");
	const [qrIsOpen, setQrIsOpen] = useState();

	useEffect(() => {
		if (userId && restaurantId) {
			fetch(`https://ver-la-carta.herokuapp.com/mesas/${restaurantId}`)
				.then((res) => res.json())
				.then((json) => {
					setTables(json);
				});
		} else {
			history.push(ROUTES.LOGIN);
		}
	}, []);

	const addTable = () => {
		setNewTableLoading(true);
		fetch(`https://ver-la-carta.herokuapp.com/mesas/${restaurantId}`, {
			method: "POST",
			body: JSON.stringify({}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setTables([...tables, data]);
				setNewTableLoading(false);
			});
	};

	const deleteTable = (table) => {
		fetch(
			`https://ver-la-carta.herokuapp.com/mesas/${restaurantId}/${table.tableId}`,
			{
				method: "DELETE",
				body: JSON.stringify({}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				const newTables = tables.filter((t) => t.tableId !== table.tableId);
				setTables(newTables || []);
			});
	};

	const showMenuQR = (table) => {
		setQrIsOpen(true);
		setQrValue(
			`https://verlacarta6.herokuapp.com/menu/${restaurantId}?mesa=${table.tableId}`
		);
	};

	const showOrderQR = (table) => {
		setQrIsOpen(true);
		setQrValue(
			`https://verlacarta6.herokuapp.com/restaurante/${restaurantId}/hacer_pedido?mesa=${table.tableId}&name=${restaurant.name}`
		);
	};

	const closeDialog = () => {
		setQrIsOpen(false);
		setQrValue(null);
	};

	console.log(tables);

	return (
		<div className={styles.container}>
			<PublicTopbar
				title={`Gestionar: ${restaurant.name}`}
				history={history}
				withGoBack
			/>
			<div className={styles.content}>
				{tables.map((table) => (
					<div className={styles.tableContainer}>
						<div className={styles.infoContainer}>
							<span className={styles.tableTitle}>
								{`Mesa N° ${table.tableNumber}: `}
							</span>
							<div
								className={
									table.callingServer
										? styles.callingServer
										: styles.notCallingServer
								}
							/>
						</div>
						<div className={styles.buttonsContainer}>
							<button
								className={styles.button}
								onClick={() => showMenuQR(table)}
							>
								Ver QR carta
							</button>
							<button
								className={styles.button}
								onClick={() => showOrderQR(table)}
							>
								Ver QR pedido
							</button>
							<button
								className={`${styles.button} ${styles.deleteButton}`}
								onClick={() => deleteTable(table)}
							>
								Borrar Mesa
							</button>
						</div>
					</div>
				))}
				<div className={styles.addTableContainer}>
					<span className={styles.addTableTitle}> Agregar Mesa: </span>
					<button
						className={
							newTableLoading
								? styles.addTableButtonLoading
								: styles.addTableButton
						}
						onClick={addTable}
					>
						{newTableLoading ? (
							<CircularProgress classes={styles.progress} />
						) : (
							<AddCircleOutlineIcon className={styles.addIcon} />
						)}
					</button>
				</div>
			</div>
			{qrIsOpen && (
				<Dialog open={qrIsOpen} onClose={closeDialog}>
					<DialogTitle>Escanee el siguiente QR</DialogTitle>
					<QRCode value={qrValue} />
				</Dialog>
			)}
		</div>
	);
};

export default TableManagement;

// const [tables, setTables] = useState([]);
// useEffect(() => {
// 	fetch(`https://ver-la-carta.herokuapp.com/mesas/${restaurantId}`)
// 		.then((res) => res.json())
// 		.then((json) => {
// 			if (json.status === 404) {
// 				console.log("error");
// 			} else {
// 				setTables([{ table_number: 5 }]);
// 			}
// 		});
// }, [restaurantId]);
// return (
// 	<div className={styles.container}>
// 		<div className={styles.title}>
// 			<h1> Restaurantes cercanos </h1>
// 			<Link to={ROUTES.BACKOFFICE_HOME}>
// 				<button className={styles.button}> Volver </button>
// 			</Link>
// 		</div>
// 		<div className={styles.content}>
// 			{tables.map((table) => (
// 				<div className={styles.table}>
// 					{`Numero de Mesa ${table.table_number}`}
// 					<div>
// 						<QRCode
// 							value={`/restaurante/${restaurantId}/hacer_pedido?mesa=${table.table_number}`}
// 						/>
// 					</div>
// 				</div>
// 			))}
// 		</div>
// 	</div>
// );
