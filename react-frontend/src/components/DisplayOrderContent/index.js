import React from "react";
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

const DisplayOrderContent = ({
    order
}) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Ver pedido
            </Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Contenido del pedido: </DialogTitle>
                <Typography variant="h6" align="center">
                    {order.content}
                </Typography>

            </Dialog>
        </div>
    );

};
export default DisplayOrderContent;