import React from 'react';
import TicketList from "./TicketList";
import useTickets from "../../data/hooks/useTickets";

const MyTickets = (props) =>  {
    const {getAllMyTickets } = useTickets()
    const tickets = getAllMyTickets()
    return (
        <TicketList tickets = {tickets} {...props}/>
    );
}

export default MyTickets;



