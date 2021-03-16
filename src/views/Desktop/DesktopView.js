import React, {useState} from 'react';
import AllTickets from "../../components/Tickets/AllTickets";
import MyTickets from "../../components/Tickets/MyTickets";
import TicketList from "../../components/Tickets/TicketList";
import TicketDetail from "../../components/Tickets/TicketDetail/TicketDetail";

function DesktopView(props) {
    const [clickedTickets, setClickedTickets] = useState([])

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
                   <TicketDetail id={setClickedTickets}></TicketDetail>
                </div>
            </div>
        </div>
    );
}

export default DesktopView;
