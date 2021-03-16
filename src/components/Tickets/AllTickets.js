import React from 'react';
import withTickets from "../../data/HOC/withTickets";
import TicketList from "./TicketList";

function AllTickets(props) {

    return (
       <TicketList {...props}/>
    );
}

export default withTickets(AllTickets)

