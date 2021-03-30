import {DxcButton} from '@dxc-technology/halstack-react';
import React from 'react';
import TicketFormDialog from "../TicketFormDialog/TicketFormDialog";
import useDeskTickets from "../../../data/hooks/useDeskTickets";

/**
 * Display of create ticket button
 * @returns {void} Display of create ticket button
 */
function CreateButton() {
    const [open, setOpen] = React.useState(false);
    const { create } = useDeskTickets()

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
            <DxcButton
                mode="primary"
                label="New Ticket"
                onClick={handleClickOpen}
                margin="xxsmall"
            />
            {open && <TicketFormDialog close={handleClose} submit={handleSubmit} />}
        </div>
    )
}

export default CreateButton;
