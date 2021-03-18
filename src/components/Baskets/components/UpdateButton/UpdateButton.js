import BasketFormDialog from "../BasketFormDialog/BasketFormDialog";
import {Button} from "@material-ui/core";
import React from 'react';
import useDeskBaskets from "../../../../data/hooks/useDeskBaskets";

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
                Update
            </Button>
            {open && <BasketFormDialog basket={basket} close={handleClose} submit={handleSubmit}/>}
        </>
    );
}

export default UpdateButton;
