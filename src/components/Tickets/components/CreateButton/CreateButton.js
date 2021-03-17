import React from 'react';
import useDeskTickets from "../../../../data/hooks/useDeskTickets";
import TicketFormDialog from "../TicketFormDialog/TicketFormDialog";
import {
    Button,
} from "@material-ui/core";


function CreateButton(props) {
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
            {open && <TicketFormDialog close={handleClose} submit={handleSubmit}></TicketFormDialog>}
        </div>
    )
}

export default CreateButton;
