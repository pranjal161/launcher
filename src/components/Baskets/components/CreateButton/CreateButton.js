import React, {useRef, useState} from 'react';
import useDeskBaskets from "../../../../data/hooks/useDeskBaskets";
import BasketFormDialog from "../BasketFormDialog/BasketFormDialog";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";

function CreateButton(props) {
    const [open, setOpen] = React.useState(false);
    const {create} = useDeskBaskets()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (basket) => {
        create(basket)
        handleClose()
    }
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Create basket
            </Button>
            {open && <BasketFormDialog close={handleClose} submit={handleSubmit}></BasketFormDialog>}
        </div>
    )
}

export default CreateButton;
