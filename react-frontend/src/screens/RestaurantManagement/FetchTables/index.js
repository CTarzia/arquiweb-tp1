import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import DisplayTable from "./DisplayTable";
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "../styles.module.scss"

const FetchTables = ({
    restaurantId
}) => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/mesas/${restaurantId}`)
			.then((res) => res.json())
			.then((json) => {
				setTables(json)
			});
    }, []);
    return (
        <div className={styles.displayOrdersColumns}>
			{tables.map(table => (
				<DisplayTable
					table={table}
				/>
			))}
		</div>
    );
}

export default FetchTables