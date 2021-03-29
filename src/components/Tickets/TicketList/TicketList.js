import React from 'react';

function TicketList(props) {
    const {tickets, onClick, ticketId} = props

    const handleClick = (ticket) => onClick && onClick(ticket)
    const selected = (id) => ticketId === id

    return (
        <ul className="list-group mt-2">
            {tickets && tickets.map(ticket =>
                <li key={ticket.id} className={`list-group-item ${selected(ticket.id) ? 'active' : ''}`}
                    onClick={() => handleClick(ticket)}>
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
