import React from 'react';
import useTickets from "../../../data/hooks/useTickets";


function TicketDetail({id, remove}) {
    const {getOne}= useTickets()
    let ticket = id ? getOne(id) : undefined



    if (ticket) {
        return (
            <div className="card mt-3" style={{width: '18rem;'}}>
                    <div className="card-body">
                        <h5 className="card-title">{ticket.title}</h5>
                        <p className="card-text">
                            <div>Post by {ticket.creatorFirstName} {ticket.creatorLastName}</div>
                            <small>{ticket.id}</small>
                        </p>
                        <a href="#" className="btn btn-primary" onClick={() => remove(id) }>Remove</a>
                    </div>
            </div>
        )
    } else
        return (<div className="container center">Loading project ...</div>)
}


export default TicketDetail;

