import React from 'react';
import TicketList from "../TicketList/TicketList";
import useDeskTickets from "../../../data/hooks/useDeskTickets";

const MyTickets = (props:any) => {
    const {getMyAllTickets} = useDeskTickets()
    const tickets = getMyAllTickets()
    //console.log('MyTickets detail render')
    return (
        <TicketList tickets={tickets} {...props}/>
    );
}

export default MyTickets;



