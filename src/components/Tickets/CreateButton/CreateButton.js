import React, {useState} from 'react';
import useDeskTickets from "../../../data/hooks/useDeskTickets";
import TicketForm from "../TicketForm/TicketForm";
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
    const {create} = useDeskTickets()

    const createTicket = () => {}




        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        return (
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Create ticket
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                    <DialogTitle id="form-dialog-title">Create a ticket</DialogTitle>
                    <DialogContent>
                        <TicketForm></TicketForm>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="default">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary" variant={"contained"}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
}

export default CreateButton;
