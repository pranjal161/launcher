import {Button} from "@material-ui/core";
import React from 'react';
import TicketFormDialog from "../../../TicketFormDialog/TicketFormDialog";
import useDeskTickets from "../../../../../data/hooks/useDeskTickets";

function UpdateButton({ticket}) {
    const [open, setOpen] = React.useState(false);
    const {update} = useDeskTickets()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (ticket) => {
        console.log('ticket', ticket)
        update(ticket)
        handleClose()
    }

    return (
        <>
            <Button variant="contained" color="primary" className="mx-2" onClick={handleClickOpen}>
                Update
            </Button>
            {open && <TicketFormDialog ticket={ticket} close={handleClose} submit={handleSubmit}/>}
        </>
    );
}

export default UpdateButton;
