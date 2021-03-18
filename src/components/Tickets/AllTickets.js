import React from 'react';
import TicketList from "./TicketList";
import useDeskTickets from "../../data/hooks/useDeskTickets";

const AllTickets= (props) =>  {
    const {getAll} = useDeskTickets()
    const tickets = getAll()
    return (
        <TicketList tickets={tickets} {...props}/>
    );
}

export default AllTickets

