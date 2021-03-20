import React from 'react';
import UpdateButton from "../UpdateButton/UpdateButton";
import useDeskTickets from "../../../../data/hooks/useDeskTickets";
import useDeskAuth from "../../../../data/hooks/useDeskAuth";
import {Button, Card, CardActions, CardContent, CardHeader, makeStyles} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        padding: 0
    },
    actions: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        '& > * + *': {
            marginLeft: 0
        }
    },
    buttonIcon: {
        marginRight: theme.spacing(1)
    }
}));

function TicketDetail({id, sectionId, className, onRemove, onClose}) {
    const {getOne, assignTo} = useDeskTickets()
    const {currentUserId} = useDeskAuth()
    const classes = useStyles();

    let ticket = id ? getOne(id) : undefined

    const assignToCurrentUser = () => assignTo(id, currentUserId)
    const removeToCurrentUser = () => assignTo(id, null)
    const removeHandle = () => onRemove && onRemove(id)
    const closeHandle = () => onClose && onClose()

    const assignButton = ticket && ticket.assignedTo === currentUserId ?
        <a href="#" className="btn btn-warning ml-2" onClick={removeToCurrentUser}>Unassign to me</a> :
        <a href="#" className="btn btn-info ml-2" onClick={assignToCurrentUser}>Assign to me</a>


    if (ticket) {
        return (
            <Card
                className={clsx(classes.root, className)}
            >
                <CardHeader title="Order info"/>
                <CardContent>
                    <h5 className="card-title">{ticket.title}</h5>
                    <p className="card-text">
                        <div className="d-flex justify-content-between">
                            <span>Created by {ticket.creatorDisplay}</span>
                            <small>{ticket.id}</small>
                        </div>
                    </p>
                    <p>
                        {sectionId}
                    </p>
                </CardContent>
                <CardActions>
                    <a href="#" className="btn btn-danger" onClick={removeHandle}>Remove</a>
                    {assignButton}
                    <UpdateButton ticket={ticket}/>
                    <Button onClick={closeHandle}>Close</Button>
                </CardActions>
            </Card>


        )
    } else
        return (<div className="container center">Loading ticket ...</div>)
}


export default TicketDetail;

