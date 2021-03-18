import {Button,} from "@material-ui/core";
import React from 'react';
import TicketFormDialog from "../TicketFormDialog/TicketFormDialog";
import useDeskTickets from "../../../../data/hooks/useDeskTickets";


function CreateButton() {
    const [open, setOpen] = React.useState(false);
    const {create} = useDeskTickets()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (ticket) => {
        create(ticket)
        handleClose()
    }
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Create ticket
            </Button>
            {open && <TicketFormDialog close={handleClose} submit={handleSubmit}/>}
        </div>
    )
}

export default CreateButton;
