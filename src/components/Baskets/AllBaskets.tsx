import BasketTitle from "./components/BasketTitle/BasketTitle";
import React, { useState, useEffect } from 'react';
import useDeskBaskets from "../../data/hooks/useDeskBaskets";
import { DxcSidenav } from '@dxc-technology/halstack-react';
import Card from 'components/card/card';
import EntitySidebar from 'components/entitySidebar/entitySidebar';
import TicketDetail from 'components/Tickets/TicketDetail/TicketDetail';
import TicketList from 'components/Tickets/ticketsList/ticketsList'
import useDeskTickets from 'data/hooks/useDeskTickets';

const AllBaskets= (props: any) =>  {
    const {getAll} = useDeskBaskets()
    const baskets = getAll();
    const ticketDesk = useDeskTickets()
    const {remove} = useDeskTickets()
    const tickets = ticketDesk.getAll()
    const [clickedTicket, setClickedTicket] = useState({id: null});
    const [openSidebar, setOpenSidebar] = useState(false);
    const [selectedBasket, setClickedBasket] = useState({id: null, title: ''});
    const [ticketsFromBasket, setTicketsFromBasket] = useState([]);

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

    const ticketsAssignedToBasket = (basket: any) => {
        setClickedBasket({id: basket.id, title: basket.title});
        getAllTicketsFromBasket();
    }

    const getAllTicketsFromBasket = () => {
        const selectedTicketArray = tickets && tickets.filter((ticket: { basketId: any; }) => ticket.basketId === selectedBasket.id);
        setTicketsFromBasket(selectedTicketArray && selectedTicketArray.length > 0 ? selectedTicketArray : []);
    }

    useEffect(() => {
        ticketsAssignedToBasket({id: baskets && baskets[0].id, title: baskets && baskets[0].title});
    }, [baskets]);

    return (
        <>
            <div className="d-flex align-items-start">
                <DxcSidenav>
                    <BasketTitle basketId={selectedBasket.id} baskets={baskets} onBasketClick={ticketsAssignedToBasket} {...props}/>
                </DxcSidenav>
                <Card 
                    title={selectedBasket.title}>
                    {tickets &&
                    <div className="main-container col-12">
                        <div className="col-12">
                            <div className="row">
                                <div className="col">
                                    <TicketList 
                                        handleTicketClick={handleTicketClick} 
                                        tickets={ticketsFromBasket} />
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
        </>
    );
}

export default AllBaskets

