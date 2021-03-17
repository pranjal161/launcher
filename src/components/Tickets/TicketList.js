import React from 'react';

function TicketList(props) {
    const {tickets, handleTicketClick=()=>{}} = props


    return (
        <ul className="list-group mt-2">
            {tickets && tickets.map(ticket =>
                <li key= {ticket.id} className="list-group-item" onClick ={() => handleTicketClick(ticket)}>
                    <h6>{ticket.title}</h6>
                    <small>{ticket.id}</small>
                </li>
            )}

        </ul>
    );
}

export default TicketList;
