import React, {useState} from 'react';
import AllTickets from "../../components/Tickets/AllTickets";
import MyTickets from "../../components/Tickets/MyTickets";
import TicketDetail from "../../components/Tickets/TicketDetail/TicketDetail";
import useTickets from "../../data/hooks/useTickets";
import {useDeskAuth} from "../../data/hooks/useDeskAuth";
import {Redirect} from "react-router-dom";

function DesktopView() {
    const [clickedTickets, setClickedTickets] = useState({})
    const {create, remove} = useTickets()
    const {auth} = useDeskAuth()

    if(!auth.logged)
        return (<Redirect to="/signIn" />)

    const handleTicketClick = (ticket) => {
        console.log('clickedTickets', clickedTickets)
        setClickedTickets({...clickedTickets, [ticket.id]:ticket})
    }
    const createTicket = () => {

        const ticket = {
            number: 1,
            requestedBy: auth.id,
            creatorId: auth.id,
            title: "Test du premier ticket",
            description: "Description du premier ticket",
            lastUpdate: Date.now(),
            relatedClients: [],
            relatedContrats: [],
            stages: [],
            status: 'created',
            notes: [],
            documents: [],
            history: {}
        }

        create(ticket)
    }

    const handleRemove=(id)=>{
        const newAfterDelete = {...clickedTickets}
        delete newAfterDelete[id]
        remove(id)
        setClickedTickets(newAfterDelete)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                    All tickets
                    <AllTickets handleTicketClick={handleTicketClick}/>
                </div>
                <div className="col-sm">
                    My tickets
                    <button className="btn btn-primary" onClick={createTicket}>Create Ticket</button>
                    <MyTickets handleTicketClick={handleTicketClick}/>
                </div>
                <div className="col-sm">
                    Clicked tickets
                    {clickedTickets && Object.values(clickedTickets).map(ticket=> <TicketDetail id={ticket.id} key={ticket.id} remove={handleRemove}/>)}
                </div>

            </div>
        </div>
    );
}

export default DesktopView;
