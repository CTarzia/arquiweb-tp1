import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from "../../styles.module.scss"
import { Typography } from "@mui/material";

const PostOrder = ({
    handleSubmit,
    handleOnInputChange,
    tableNumber,
}) => {
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {(!tableNumber) ? (
                <div>
                    <Typography variant="h6">Ingrese su nombre:</Typography>
                    <TextField name="clientName" label="Ingrese su nombre" variant="outlined" onChange={handleOnInputChange}/>
                </div>
            ) : (
                <Typography variant="h5">
                    Usted está en la mesa {tableNumber}.
                </Typography>
            )}

            <div>
                <Typography cariant="h6">Ingrese su pedido:</Typography>
                <TextField name="content" label="Ingrese su pedido" variant="outlined" onChange={handleOnInputChange}/>
            </div>
            <Button type="submit" className={styles.submitButton}>Enviar pedido</Button>
        </form>
    );
};

export default PostOrder;
