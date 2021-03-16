import React from 'react';
import TicketList from "./TicketList";
import useTickets from "../../data/hooks/useTickets";

const AllTickets= (props) =>  {
    const {getAll} = useTickets()
    const tickets = getAll()
    return (
        <TicketList tickets={tickets} {...props}/>
    );
}

export default AllTickets

