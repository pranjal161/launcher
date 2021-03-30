import { DxcButton, DxcDialog } from "@dxc-technology/halstack-react";

import React from 'react';
import TicketFormDialog from "../../../TicketFormDialog/TicketFormDialog";
import useDeskTickets from "../../../../../data/hooks/useDeskTickets";

/**
 * Display of update button for a ticket
 * @param {props} props Information on the ticket 
 * @returns {void} Display of update button for a ticket
 */
function UpdateButton(props: any) {
    const { ticket } = props;
    const [open, setOpen] = React.useState(false);
    const { update } = useDeskTickets()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (ticket: any) => {
        console.log('ticket', ticket)
        update(ticket)
        handleClose()
    }

    return (
        <>
            <DxcButton
                mode="primary"
                label="Update"
                onClick={handleClickOpen}
                margin="xxsmall"
            />
            {open &&
                <DxcDialog padding="medium" isCloseVisible={true} onCloseClick={handleClose}>
                    <TicketFormDialog ticket={ticket} close={handleClose} submit={handleSubmit} />
                </DxcDialog>}
        </>
    );
}

export default UpdateButton;
