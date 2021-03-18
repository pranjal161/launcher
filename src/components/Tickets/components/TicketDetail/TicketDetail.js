import React from 'react';
import UpdateButton from "../UpdateButton/UpdateButton";
import useDeskTickets from "../../../../data/hooks/useDeskTickets";
import useDeskAuth from "../../../../data/hooks/useDeskAuth";


function TicketDetail({id, remove}) {
    const {getOne, assignTo} = useDeskTickets()
    const {currentUserId} = useDeskAuth()

    let ticket = id ? getOne(id) : undefined
    const assignButton = ticket && ticket.assignedTo === currentUserId ?
        <a href="#" className="btn btn-warning ml-2" onClick={() => assignTo(id, null)}>Unassign to me</a> :
        <a href="#" className="btn btn-info ml-2" onClick={() => assignTo(id, currentUserId)}>Assign to me</a>
    if (ticket) {
        return (
            <div className="card mt-3" >
                    <div className="card-body">
                        <h5 className="card-title">{ticket.title}</h5>
                        <p className="card-text">
                            <small>{ticket.id}</small>
                        </p>
                        <a href="#" className="btn btn-danger" onClick={() => remove(id) }>Remove</a>
                        {assignButton}
                        <UpdateButton ticket={ticket}/>
                    </div>
            </div>
        )
    } else
        return (<div className="container center">Loading ticket ...</div>)
}


export default TicketDetail;

