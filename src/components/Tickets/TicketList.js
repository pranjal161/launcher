import React from 'react';

function TicketList(props) {
    const {tickets, handleTicketClick=()=>{}} = props


    return (
        <ul className="list-group mt-2">
            {tickets && tickets.map(ticket =>
                <li key={ticket.id} className="list-group-item" onClick={() => handleTicketClick(ticket)}>
                    <h6>{ticket.title}</h6>
                    <div className="d-flex justify-content-between">
                        <span>Created by {ticket.creatorDisplay}</span>
                        <small>{ticket.id}</small>
                    </div>
                </li>
            )}

        </ul>
    );
}

export default TicketList;
