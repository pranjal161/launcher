import React, {useState} from 'react';
import AllTickets from "../../../../components/Tickets/AllTickets";
import CreateButton from "../../../../components/Tickets/components/CreateButton/CreateButton";
import MyTickets from "../../../../components/Tickets/MyTickets";
import {Redirect} from "react-router-dom";
import TicketDetail from "../../../../components/Tickets/components/TicketDetail/TicketDetail";
import useDeskTickets from "../../../../data/hooks/useDeskTickets";
import useDeskAuth from "../../../../data/hooks/useDeskAuth";

function ExempleTicketsView() {
    const [clickedTickets, setClickedTickets] = useState({})
    const {remove} = useDeskTickets()
    const {auth} = useDeskAuth()
    if (!auth.logged)
        return (<Redirect to="/signIn"/>)

    const handleTicketClick = (ticket) => {
        setClickedTickets({...clickedTickets, [ticket.id]: ticket})
    }
    const handleRemove = (id) => {
        const newAfterDelete = {...clickedTickets}
        delete newAfterDelete[id]
        remove(id)
        setClickedTickets(newAfterDelete)
    }


    return (
        <div>
            <div className="row">
                <div className="col-4">
                    All tickets
                    <AllTickets handleTicketClick={handleTicketClick}/>
                </div>
                <div className="col-4">
                    <div className={"d-flex justify-content-between"}>
                        <div>My tickets (assigned to me)</div>
                        <CreateButton/>
                    </div>
                    <MyTickets handleTicketClick={handleTicketClick}/>
                </div>
                <div className="col-4">
                    Clicked tickets
                    {clickedTickets && Object.values(clickedTickets).map(ticket => <TicketDetail id={ticket.id}
                                                                                                 key={ticket.id}
                                                                                                 remove={handleRemove}/>)}
                </div>
            </div>
        </div>
    );
}

export default ExempleTicketsView;
