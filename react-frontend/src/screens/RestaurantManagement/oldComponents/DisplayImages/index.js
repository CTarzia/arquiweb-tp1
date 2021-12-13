import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const DisplayImages = ({ img, onDelete }) => {
    const handleDelete = () => {
        fetch(`https://ver-la-carta.herokuapp.com/imagen/${img.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {onDelete()})

    };
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="170"
                image={img.url}
                alt="img reastaurant"
            />

            <CardActions>
                <Tooltip title="Eliminar imagen" >
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>


            </CardActions>
        </Card>
    );
}

export default DisplayImages