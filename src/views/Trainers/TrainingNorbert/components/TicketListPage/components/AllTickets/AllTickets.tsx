import React from 'react';
import TicketList from "./components/TicketList/TicketList";
import useDeskTickets from "data/hooks/useDeskTickets";

const AllTickets = (props:any) => {
    const {getAll} = useDeskTickets()
    const tickets = getAll()

    return (
        <TicketList tickets = {tickets} {...props} /> 
    );
}

export default AllTickets

