import React from 'react';
import TicketList from "./TicketList";
import useDeskTickets from "../../data/hooks/useDeskTickets";

const MyTickets = (props) =>  {
    const { getMyAllTickets } = useDeskTickets()
    const tickets = getMyAllTickets()
    return (
        <TicketList tickets = {tickets} {...props}/>
    );
}

export default MyTickets;



