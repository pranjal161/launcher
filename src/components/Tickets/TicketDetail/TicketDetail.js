import React from 'react';
import TicketSummary from "./components/TicketSummary/TicketSummary";
import UpdateButton from "./components/UpdateButton/UpdateButton";
import useDeskAuth from "../../../data/hooks/useDeskAuth";
import useDeskTickets from "../../../data/hooks/useDeskTickets";

//import Summary from "./components/Summary/Summary";

/**
 * Display of ticket in detail
 * @param {param0} id, sectionId, onRemove, onClose Information that will be used for the ticket detail 
 * @returns {*} Display of ticket in detail
 */
function TicketDetail({id, sectionId, onRemove, onClose}) {
    const {getOne, assignTo, remove} = useDeskTickets()
    const {currentUserId} = useDeskAuth()
    let ticket = id ? getOne(id) : undefined

    const assignToCurrentUser = () => assignTo(id, currentUserId)
    const removeToCurrentUser = () => assignTo(id, null)
    const removeHandle = () => remove(id) && onRemove && onRemove(id)
    const closeHandle = () => onClose && onClose()

    const assignButton = ticket && ticket.assignedTo === currentUserId ?
        <a href="#" className="btn btn-warning ml-2" onClick={removeToCurrentUser}>Unassign to me</a> :
        <a href="#" className="btn btn-info ml-2" onClick={assignToCurrentUser}>Assign to me</a>

    const Actions = (<><a href="#" className="btn btn-danger" onClick={removeHandle}>Remove</a>{assignButton}
        <UpdateButton ticket={ticket}/></>)

    if (ticket) {
        return (
            <TicketSummary ticket={ticket} actions={Actions} onClose={closeHandle} sectionId={sectionId}/>
        )
    } 
    else
        return (<div className="container center">Loading ticket ...</div>)
}

export default TicketDetail;

