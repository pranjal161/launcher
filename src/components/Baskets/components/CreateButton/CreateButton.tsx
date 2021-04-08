import BasketFormDialog from "../BasketFormDialog/BasketFormDialog";
import {Button,} from "@material-ui/core";
import React from 'react';
import useDeskBaskets from "data/hooks/useDeskBaskets";

/**
 * Button for creating a basket
 * @returns {*} Display the create basket button
 */
function CreateButton() {
    const [open, setOpen] = React.useState(false);
    const {create} = useDeskBaskets()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (basket: any) => {
        create(basket)
        handleClose()
    }
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Create basket
            </Button>
            {open && <BasketFormDialog close={handleClose} submit={handleSubmit}/>}
        </div>
    )
}

export default CreateButton;
