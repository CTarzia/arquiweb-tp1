import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import DisplayTable from "./DisplayTable";
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DisplayTable from "./DisplayTable";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styles from "../styles.module.scss"

const FetchTables = ({
    restaurantId
}) => {
    const [tables, setTables] = useState([]);
	const [tablesLoading, setTablesLoading] = useState(false);


    useEffect(() => {
        fetch(`http://localhost:8080/mesas/${restaurantId}`)
			.then((res) => res.json())
			.then((json) => {
				setTables(json)
				setTablesLoading(true);
			});
			console.log(tables);			
    }, []);

	const handleCreateTable = (() => {
		fetch(`http://localhost:8080/mesas/${restaurantId}`, {
			method: "POST",
			body: JSON.stringify({"restaurantId": restaurantId}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		window.location.reload(false);
	})

    return (
        <div className={styles.displayOrdersColumns}>
			<div>
				<Button variant="contained" endIcon={<AddCircleIcon/>} onClick={handleCreateTable}>
        		    Crear mesa
        		</Button>
			</div>	
			
			{tablesLoading ? (
                <Grid container spacing={2}>
					{tables.map(table => (
						<Grid item xs={4}>
							<DisplayTable
								table={table}
							/>
						</Grid>
					))}
                </Grid>
            ) : (
                <div>Recuperando mesas de su restaurante...</div>
            )}

		</div>
    );
}

export default FetchTables