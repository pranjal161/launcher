import React, { useState } from 'react';
import useDeskAuth from '../../data/hooks/useDeskAuth';
import { DxcBox } from '@dxc-technology/halstack-react';
import './home.css';
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
        const newAfterDelete = { ...clickedTickets }
        // delete newAfterDelete[id]
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
                        All Baskets
                    {baskets &&
                            <BasketList baskets={baskets} />
                        }
                    </div>
                    <div className="col-4">
                        Today's Reminder
                    </div>
                    <div className="col-12">
                        All Tickets
                    {tickets &&
                            <TicketList handleTicketClick={handleTicketClick} tickets={tickets} />
                        }
                    </div>
                </div>
                <div className="grid-container col-3 pl-0">
                    <div className="col-12">
                        Ticket Details
                    {clickedTickets && Object.values(clickedTickets).map((ticket: any) => <TicketDetail id={ticket.id}
                        key={ticket.id}
                        remove={handleRemove} />)}
                    </div>
                </div>
            </div>
        </span>
    );


}

export default HomePage;
