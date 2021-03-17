import React from 'react';
import BasketFormDialog from "../BasketFormDialog/BasketFormDialog";
import useDeskBaskets from "../../../../data/hooks/useDeskBaskets";
import {Button} from "@material-ui/core";

function UpdateButton({basket}) {
    const [open, setOpen] = React.useState(false);
    const {update} = useDeskBaskets()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (basket) => {
        console.log('basket', basket)
        update(basket)
        handleClose()
    }

    return (
        <>
            <Button variant="contained" color="primary" className="mx-2" onClick={handleClickOpen}>
            Update basket
        </Button>
            {open && <BasketFormDialog basket={basket} close={handleClose} submit={handleSubmit}></BasketFormDialog>}
        </>
    );
}

export default UpdateButton;
