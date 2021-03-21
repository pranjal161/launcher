import React from 'react';
import {selectTicket} from "../../views/Desktop/Norbert/TrainingNorbert/components/LocalStore/store";

function TicketList(props) {
    const {
        tickets, handleTicketClick = () => {
        }
    } = props

    const handleClick = (ticket) => {
        const {dispatch} = props
        dispatch && dispatch(selectTicket(ticket.id))
        handleTicketClick(ticket)
    }

    const selected = (id) => props.state.ticketId === id

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
