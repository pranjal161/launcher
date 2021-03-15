import React from 'react';
import withTickets from "../../data/HOC/withTickets";
import {useSelector} from "react-redux";
import TicketList from "./TicketList";

const MyTickets = () =>  {
    const auth = useSelector(state=> state.firebase.auth)
    const TicketListBind = withTickets({storeAs:'myTickets', where:['creatorId', '==', auth.uid]})(TicketList)
    return (
        <TicketListBind/>
    );
}

export default MyTickets;



