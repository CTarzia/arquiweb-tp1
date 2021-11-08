import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography} from "@mui/material";
import styles from "../styles.module.scss"
import ReactDOM from 'react-dom'

const DisplayTable = ({table}) => {
	const [statusError, setStatusError] = useState(false);
    const [occupied, setOccupied] = useState();
	const [server, setServer] = useState();

	useEffect(() => {
		fetch(`http://localhost:8080/mesas/${table.restaurantId}/${table.tableID}`)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					setStatusError(true);
				}else{
					setServer(table.calling_server)
					setOccupied(table.status)
				}
			});
	}, []);
	
	const handleMozo = () =>{
        fetch(`http://localhost:8080/mesas/${table.restaurantId}/${table.tableID}/server`, {
			method: "PUT",
			body: JSON.stringify({}),
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => res.json())
		.then((json) => {
			window.location.reload()
			setServer(table.calling_server);
		})
    };

	return(
	<div className={styles.cardColumns}>	
		<Card> 
			<CardContent className={styles.cards} >
				<div>
					{table.tableNumber}
					<div className={styles.table}>

						<Typography color={!occupied ? "green" : "crimson"} className={styles.atributte}> 
							{occupied ? "ocupada" : "libre"} 
						</Typography>

						<Typography color={!server ? "green" : "crimson"} className={styles.atributte}> 
						{server ? "llamaron mozo" : "mozo libre"}
						</Typography>
					</div>
				</div>
			</CardContent>
    	</Card>
	</div>
	)
};



export default DisplayTable;