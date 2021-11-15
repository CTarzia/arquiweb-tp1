import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography} from "@mui/material";
import styles from "../../styles.module.scss"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

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

	const handleDelete = () => {
        window.location.reload(false);
        fetch(`http://localhost:8080/mesas/${table.restaurantId}/${table.tableID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
    };
	
	return(
	<div className={styles.cardColumns}>	
		<Card sx={{ maxWidth: 345 }}> 
			<CardContent className={styles.cards} >
				<div>
					<div className={styles.tableTitle}>
						<Typography variant="h6" component="h4">Mesa {table.tableNumber}</Typography>
						<Tooltip title="Eliminar mesa" >
                		    <IconButton aria-label="delete" onClick={handleDelete}>
                		        <DeleteIcon />
                		    </IconButton>
                		</Tooltip>
					</div>
					<div className={styles.tableAttributes}>

						<Typography color={!occupied ? "green" : "crimson"} > 
							{occupied ? "ocupada" : "libre"} 
						</Typography>

						<Typography color={!server ? "green" : "crimson"} > 
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