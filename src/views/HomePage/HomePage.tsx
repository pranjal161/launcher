import './HomePage.scss';

import React, {useState} from 'react';

import BasketList from 'components/basketList/basketList';
import Card from 'components/card/card';
import {DxcBox} from '@dxc-technology/halstack-react';
import EntitySidebar from 'components/entitySidebar/entitySidebar';
import TicketDetail from 'components/Tickets/TicketDetail/TicketDetail';
import TicketList from 'components/Tickets/ticketsList/ticketsList';
import useDeskAuth from 'data/hooks/useDeskAuth';
import useDeskBaskets from 'data/hooks/useDeskBaskets';
import useDeskTickets from 'data/hooks/useDeskTickets';


const HomePage = () => {
    const {profile} = useDeskAuth()
    const ticketDesk = useDeskTickets()
    const basketDesk = useDeskBaskets()
    const {remove} = useDeskTickets()
    const tickets = ticketDesk.getAll()
    const baskets = basketDesk.getAll()
    const [clickedTicket, setClickedTicket] = useState({id: null});
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleTicketClick = (ticket: { id: any; }) => {
        setClickedTicket({ id: ticket.id})
        setOpenSidebar(true)
    }

    const handleRemove = (id: string | number) => {
        remove(id)
        setClickedTicket({id: null})
        setOpenSidebar(false)
    }

    const handleClose = () => {
        setClickedTicket({id: null})
        setOpenSidebar(false)
    }


    return (
        <span className="home-container">
            <div className="welcome-banner">
                <DxcBox margin="small" padding="medium" size="fillParent">
                    Welcome! {profile.firstName} {profile.lastName}
                </DxcBox>
            </div>
            <div className="main-container">
                <div className="grid-container col-12 pr-0">
                    <div className="col-8">
                        <Card 
                            title="All Baskets">
                            {baskets &&
                            <BasketList baskets={baskets}/>
                            }
                        </Card>
                    </div>
                    <div className="col-4">
                        <Card 
                            title="Today&apos;s Reminder">
                        </Card>
                    </div>
                    <div className="col-12">
                        <Card 
                            title="All Tickets">
                            {tickets &&
                            <div className="main-container col-12">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col">
                                            <TicketList 
                                                handleTicketClick={handleTicketClick} 
                                                tickets={tickets} />
                                        </div>
                                        <EntitySidebar 
                                            open={openSidebar} 
                                            width={500}
                                            content={
                                                <TicketDetail 
                                                    id={clickedTicket.id}
                                                    key={clickedTicket.id}
                                                    onRemove={handleRemove} 
                                                    onClose={handleClose} 
                                                    sectionId="ticket-details" />
                                            } />
                                    </div>
                                </div>
                            </div>
                            }
                        </Card>
                    </div>
                </div>
            </div>
        </span>
    );


}

export default HomePage;
