import React from "react";

import styles from "../../styles.module.scss"

const PostOrder = ({
    handleSubmit,
    handleOnInputChange,
    tableNumber,
}) => {
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {(!tableNumber) ? (
                <div>
                    <label>Ingrese su nombre:</label>
                    <input type="text" name="clientName" onChange={handleOnInputChange} />
                </div>
            ) : (
                <div>
                    Usted está en la mesa {tableNumber}.
                </div>
            )}

            <div>
                <label>Ingrese su pedido:</label>
                <input type="text" name="content" onChange={handleOnInputChange} />
            </div>
            <button type="submit" className={styles.submitButton}>Enviar pedido</button>
        </form>
    );
};

export default PostOrder;
