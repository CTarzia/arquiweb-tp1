import React, { useState, useEffect } from "react";
import { Button, Card, CardContent} from "@mui/material";
import styles from "../styles.module.scss"

const DisplayTable = ({table}) => {
    //const [table, setTable] = useState();
	const [statusError, setStatusError] = useState(false);
    const [color, setColor] = useState()

	useEffect(() => {
		fetch(`http://localhost:8080/mesas/${table.restaurantId}/${table.tableID}`)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					setStatusError(true);
				}else{
					setColor(!table.calling_server)
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
			//setTable(json);
			window.location.reload()
			setColor(table.calling_server);
			if (color === true){
				window.alert(`mozo llamado`);
			}else{
				window.alert(`mozo liberado`);
			}
			console.log(table)
		})
    };

	return(
	<div className={styles.cardColumns}>	
		<Card> 
			<CardContent className={styles.cards} >
				<div>
					{table.tableNumber}
					<div className={styles.table}>
						<p className={styles.atributte}>ocupada:{JSON.stringify(table.status)} </p>
						<p className={styles.atributte}>mozo:{JSON.stringify(table.calling_server)} </p>
						<Button
            	        onClick = {handleMozo}
            	        color={color ? "primary" : "secondary"}
            	        variant={color ? "text" : "contained"}
						> 
            	        	Llamaron mozo
            	        </Button>
					</div>
				</div>
			</CardContent>
    	</Card>
	</div>
	)
};

export default DisplayTable;