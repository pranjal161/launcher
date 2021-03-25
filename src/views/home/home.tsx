import React, { useState } from 'react';
import useDeskAuth from '../../data/hooks/useDeskAuth';
import { DxcBox } from '@dxc-technology/halstack-react';
import './home.scss';
import useDeskTickets from '../../data/hooks/useDeskTickets';
import TicketList from '../../components/ticketsList/ticketsList';
import TicketDetail from '../../components/Tickets/components/TicketDetail/TicketDetail';
import useDeskBaskets from '../../data/hooks/useDeskBaskets';
import BasketList from '../../components/basketList/basketList';

const HomePage = () => {
    const { profile } = useDeskAuth()
    const ticketDesk = useDeskTickets()
    const basketDesk = useDeskBaskets()
    const { remove } = useDeskTickets()
    const tickets = ticketDesk.getAll()
    const baskets = basketDesk.getAll()
    const [clickedTickets, setClickedTickets] = useState({});

    const handleTicketClick = (ticket: { id: any; }) => {
        setClickedTickets({ ...clickedTickets, [ticket.id]: ticket })
    }

    const handleRemove = (id: string | number) => {
        const newAfterDelete: any = { ...clickedTickets }
        delete newAfterDelete[id];
        remove(id)
        setClickedTickets(newAfterDelete)
    }

    return (
        <span className="home-container">
            <div className="welcome-banner">
                <DxcBox margin="small" padding="medium" size="fillParent">
                    Welcome! {profile.firstName} {profile.lastName}
                </DxcBox>
            </div>
            <div className="main-container">
                <div className="grid-container col-9 pr-0">
                    <div className="col-8">
                        <span className="p-2">All Baskets</span>
                        {baskets &&
                            <BasketList baskets={baskets} />
                        }
                    </div>
                    <div className="col-4">
                        <span className="p-2">Today's Reminder</span>
                    </div>
                    <div className="col-12">
                        <span className="p-2">All Tickets</span>
                        {tickets &&
                            <TicketList handleTicketClick={handleTicketClick} tickets={tickets} />
                        }
                    </div>
                </div>
                <div className="grid-container col-3 pl-0">
                    <div className="col-12">
                        <span className="p-2">Ticket Details</span>
                        {clickedTickets && Object.values(clickedTickets).map((ticket: any) => <TicketDetail id={ticket.id}
                            key={ticket.id}
                            onRemove={handleRemove} className="" onClose={() => handleRemove(ticket.id)} sectionId="ticket-details" />)}
                    </div>

                </div>
            </div>
        </span>
    );


}

export default HomePage;
