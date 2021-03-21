import React from 'react';
import UpdateButton from "../UpdateButton/UpdateButton";
import useDeskTickets from "../../../../data/hooks/useDeskTickets";
import useDeskAuth from "../../../../data/hooks/useDeskAuth";
import {Button, makeStyles} from "@material-ui/core";
import Summary from "./components/Summary/Summary";

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        padding: 0
    },
    buttonIcon: {
        marginRight: theme.spacing(1)
    }
}));

function TicketDetail({id, sectionId, className, onRemove, onClose}) {
    const {getOne, assignTo, remove} = useDeskTickets()
    const {currentUserId} = useDeskAuth()
    const classes = useStyles();

    let ticket = id ? getOne(id) : undefined

    const assignToCurrentUser = () => assignTo(id, currentUserId)
    const removeToCurrentUser = () => assignTo(id, null)
    const removeHandle = () => remove(id) && onRemove && onRemove(id)
    const closeHandle = () => onClose && onClose()

    const assignButton = ticket && ticket.assignedTo === currentUserId ?
        <a href="#" className="btn btn-warning ml-2" onClick={removeToCurrentUser}>Unassign to me</a> :
        <a href="#" className="btn btn-info ml-2" onClick={assignToCurrentUser}>Assign to me</a>

    const Actions = (<><a href="#" className="btn btn-danger" onClick={removeHandle}>Remove</a>{assignButton}
        <UpdateButton ticket={ticket}/>
        <Button onClick={closeHandle}>Close</Button></>)

    if (ticket) {
        return (
            <Summary ticket={ticket} actions={Actions}/>
        )
    } else
        return (<div className="container center">Loading ticket ...</div>)
}

export default TicketDetail;

