import React from 'react';

/**
 * Display of all tickets in a list
 * @param {*} props Information on tickets that will be used for the display
 * @returns {void} Display of all tickets in a list
 */
function TicketList(props) {
    const {tickets, onClick, ticketId} = props

    const handleClick = (ticket) => onClick && onClick(ticket)
    const selected = (id) => ticketId === id

    return (
        <ul className="list-group mt-2">
            {tickets && tickets.map((ticket) => <li key={ticket.id} className={`list-group-item ${selected(ticket.id) ? 'active' : ''}`}
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

TicketList.propTypes = {
    tickets: PropTypes.array,
    onClick: PropTypes.func,
    ticketId: PropTypes.string
}

export default TicketList;
