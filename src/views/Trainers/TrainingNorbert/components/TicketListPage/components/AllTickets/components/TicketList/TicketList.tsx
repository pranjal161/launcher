import PropTypes from 'prop-types'
import React from 'react';

/**
 * Display of all NewTicket in a list
 * @param {props} props Information on NewTicket that will be used for the display
 * @returns {*} Display of all NewTicket in a list
 */
const TicketList = (props:any) => {
    const {tickets, onClick, ticketId} = props

    const handleClick = (ticket:any) => onClick && onClick(ticket)
    const selected = (id:any) => ticketId === id

    return (
        <ul className="list-group mt-2">
            {tickets && tickets.map((ticket:any) => <li key={ticket.id} className={`list-group-item ${selected(ticket.id) ? 'active' : ''}`}
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
