import React from 'react';

function TicketList(props) {
    const {tickets, handleTicketClick=()=>{}} = props


    return (
        <ul className="list-group">
            {tickets && tickets.map(ticket =>
                <li key= {ticket.uid} className="list-group-item" onClick ={() => handleTicketClick(ticket)}>{ticket.title}
                    <small>{ticket.uid}</small>
                </li>
            )}

        </ul>
    );
}

export default TicketList;
