import React from 'react';

function TicketList(props) {
    const {tickets} = props
    return (
        <div>
            {tickets && tickets.map(ticket => <div className="black-text center" key={ticket.uid}>{ticket.title}</div>)}
        </div>
    );
}

export default TicketList;
