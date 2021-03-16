import React, {useState} from 'react';
import AllTickets from "../../components/Tickets/AllTickets";
import MyTickets from "../../components/Tickets/MyTickets";
import TicketDetail from "../../components/Tickets/TicketDetail/TicketDetail";

function DesktopView() {
    const [clickedTickets, setClickedTickets] = useState(undefined)

    const handleTicketClick = (ticket) => {
        console.log('ticket', ticket)
        setClickedTickets(ticket)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                    All tickets
                    <AllTickets handleTicketClick={handleTicketClick} />
                </div>
                <div className="col-sm">
                    My tickets
                    <MyTickets handleTicketClick={handleTicketClick}/>
                </div>
                <div className="col-sm">
                    Clicked tickets
                    {clickedTickets && <TicketDetail id={clickedTickets.id}/>}
                </div>
            </div>
        </div>
    );
}

export default DesktopView;
