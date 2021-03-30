import { DxcButton, DxcDialog } from '@dxc-technology/halstack-react';
import React from 'react';
import TicketFormDialog from "../TicketFormDialog/TicketFormDialog";
import useDeskTickets from "../../../data/hooks/useDeskTickets";


const CreateButton = () => {
    const [open, setOpen] = React.useState(false);
    const { create } = useDeskTickets()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (ticket: any) => {
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
            {open && <DxcDialog padding="medium" isCloseVisible={true} onCloseClick={handleClose}>
                <TicketFormDialog close={handleClose} submit={handleSubmit} />
            </DxcDialog>}
        </div>
    )
}

export default CreateButton;
