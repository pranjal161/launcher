import React from 'react';
import withTickets from "../../data/HOC/withTickets";
import {useSelector} from "react-redux";
import TicketList from "./TicketList";

const MyTickets = (props) =>  {
    const auth = useSelector(state=> state.firebase.auth)
    const TicketListBind = withTickets(TicketList, {storeAs:'myTickets', where:['creatorId', '==', auth.uid]})
    return (
        <TicketListBind {...props}/>
    );
}

export default MyTickets;



