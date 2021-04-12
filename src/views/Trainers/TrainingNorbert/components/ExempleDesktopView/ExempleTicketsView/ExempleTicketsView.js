import React, {useState} from 'react';

import AllTickets from "../../../../../../components/Tickets/AllTickets/AllTickets";
import CreateButton from "../../../../../../components/Tickets/CreateButton/CreateButton";
import MyTickets from "../../../../../../components/Tickets/MyTickets/MyTickets";
import {Redirect} from "react-router-dom";
import TicketDetail from "../../../../../../components/Tickets/TicketDetail/TicketDetail";
import useDeskAuth from "../../../../../../data/hooks/useDeskAuth";

/**
 * Example of Tickets view
 * @returns {*} Example of Tickets view
 */
function ExempleTicketsView() {
    const [clickedTickets, setClickedTickets] = useState({})

    const {auth} = useDeskAuth()
    if (!auth.logged)
        return (<Redirect to="/signIn"/>)

    const handleTicketClick = (ticket) => {
        setClickedTickets({...clickedTickets, [ticket.id]: ticket})
    }
    const handleRemove = (id) => {
        const newAfterDelete = {...clickedTickets}
        delete newAfterDelete[id]
        setClickedTickets(newAfterDelete)
    }

    return (
        <div>
            <div className="row">
                <div className="col-4">
                    All tickets
                    <AllTickets onClick={handleTicketClick}/>
                </div>
                <div className="col-4">
                    <div className={"d-flex justify-content-between"}>
                        <div>My tickets (assigned to me)</div>
                        <CreateButton/>
                    </div>
                    <MyTickets onClick={handleTicketClick}/>
                </div>
                <div className="col-4">
                    Clicked tickets
                    {clickedTickets && Object.values(clickedTickets).map((ticket) => <TicketDetail id={ticket.id}
                        key={ticket.id}
                        OnRemove={handleRemove}
                        onClose={() => handleRemove(ticket.id)}
                    />)}
                </div>
            </div>
        </div>
    );
}

export default ExempleTicketsView;
