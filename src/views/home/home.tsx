import React, {useState} from 'react';
import useDeskAuth from '../../data/hooks/useDeskAuth';
import {DxcBox} from '@dxc-technology/halstack-react';
import './home.scss';
import useDeskTickets from '../../data/hooks/useDeskTickets';
import TicketList from '../../components/ticketsList/ticketsList';
import TicketDetail from '../../components/Tickets/TicketDetail/TicketDetail';
import useDeskBaskets from '../../data/hooks/useDeskBaskets';
import BasketList from '../../components/basketList/basketList';

const HomePage = () => {
    const {profile} = useDeskAuth()
    const ticketDesk = useDeskTickets()
    const basketDesk = useDeskBaskets()
    const {remove} = useDeskTickets()
    const tickets = ticketDesk.getAll()
    const baskets = basketDesk.getAll()
    const [clickedTicket, setClickedTicket] = useState({id: null});

    const handleTicketClick = (ticket: { id: any; }) => {
        setClickedTicket({...ticket})
    }

    const handleRemove = (id: string | number) => {
        remove(id)
        setClickedTicket({id: null})
    }

    const handleClose = () => {
        setClickedTicket({id: null})
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
                        <BasketList baskets={baskets}/>
                        }
                    </div>
                    <div className="col-4">
                        <span className="p-2">Today's Reminder</span>
                    </div>
                    <div className="col-12">
                        <span className="p-2">All Tickets</span>
                        {tickets &&
                        <TicketList handleTicketClick={handleTicketClick} tickets={tickets}/>
                        }
                    </div>
                </div>
                <div className="grid-container col-3 pl-0">
                    <div className="col-12">
                        {
                            clickedTicket.id &&
                            <TicketDetail
                                id={clickedTicket.id}
                                key={clickedTicket.id}
                                onRemove={handleRemove}
                                onClose={handleClose}
                                sectionId="ticket-details"/>
                        }
                    </div>
                </div>
            </div>
        </span>
    );


}

export default HomePage;
