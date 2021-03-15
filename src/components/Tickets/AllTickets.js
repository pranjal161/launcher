/*import React from 'react';
import withTickets from "../../data/HOC/withTickets";

function AllTickets({tickets}) {

    return (
        <ul className="list-group">
            {tickets && tickets.map(ticket =>
                <li key= {ticket.uid} className="list-group-item">{ticket.title}
                    <small>{ticket.uid}</small>
                </li>
            )}

        </ul>
    );
}

export default withTickets()(AllTickets)
*/
import React from 'react';
import withTickets from "../../data/HOC/withTickets";
import TicketList from "./TicketList";

function AllTickets(props) {
    const TicketListBind = withTickets()(TicketList)
    return (
        <TicketListBind/>
    );
}

export default AllTickets;
