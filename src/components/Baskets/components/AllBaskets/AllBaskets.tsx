import './AllBaskets.scss'

import { DxcInput, DxcSidenav } from '@dxc-technology/halstack-react';
import React, { useEffect, useState } from 'react';

import BasketTitle from "../BasketTitle/BasketTitle";
import Card from 'components/Ccard/Card';
import EntitySidebar from 'components/EentitySidebar/EntitySidebar';
import TicketDetail from 'components/Tickets/TicketDetail/TicketDetail';
import TicketList from 'components/Tickets/TticketsList/TicketsList'
import useDeskBaskets from "data/hooks/useDeskBaskets";
import useDeskTickets from 'data/hooks/useDeskTickets';

const AllBaskets= (props: any) => {
    const {getAll} = useDeskBaskets()
    const baskets = getAll();
    const ticketDesk = useDeskTickets()
    const {remove} = useDeskTickets()
    const tickets = ticketDesk.getAll();
    const [clickedTicket, setClickedTicket] = useState({id: null});
    const [openSidebar, setOpenSidebar] = useState(false);
    const [selectedBasket, setClickedBasket] = useState({id: null, title: ''});
    const [searchedBaskets, setSearchedBaskets] = useState([]);
    const [ticketsFromBasket, setTicketsFromBasket] = useState([]);
    const [countArray, setCountArray] = useState({});

    const handleTicketClick = (ticket: { id: any; }) => {
        setClickedTicket({ id: ticket.id})
        setOpenSidebar(true)
    }

    const handleRemove = (id: string | number | null) => {
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
        getAllTicketsFromBasket(basket.id);
        handleClose();
    }

    const getAllTicketsFromBasket = (id: string) => {
        const selectedTicketArray = tickets && tickets.filter((ticket: { basketId: any; }) => ticket.basketId === id);
        setTicketsFromBasket(selectedTicketArray && selectedTicketArray.length > 0 ? selectedTicketArray : []);
    }

    const searchBasket = (value: string) => {
        var result = baskets.filter((basket: { title: string }) => basket.title.indexOf(value) >= 0);
        setSearchedBaskets(result);
    }

    const searchTicket = (value: string) => {
        var result = tickets.filter((ticket: { basketId: string, title: string }) => ticket.basketId === selectedBasket.id && ticket.title.toLowerCase().indexOf(value) >= 0);
        setTicketsFromBasket(result);
    }

    const setTicketCount = () => {
        let countArray: any = {};
        baskets && baskets.map((basket: any) => {
            const ticketsInsideBasket = tickets && tickets.filter((ticket: { basketId: any; }) => ticket.basketId === basket.id);
            countArray[basket.id] = ticketsInsideBasket && ticketsInsideBasket.length;
            return null;
        });
        setCountArray(countArray);
    }

    useEffect(() => {
        ticketsAssignedToBasket({id: baskets && baskets[0].id, title: baskets && baskets[0].title});
        setSearchedBaskets(baskets);
        setTicketCount();
    }, [baskets]);

    return (
        <>
            <div className="d-flex align-items-start">
                <DxcSidenav>
                    <div className="search-input">
                        <DxcInput
                            label={'Search Basket'}
                            onChange={searchBasket}
                            margin="medium"
                        />
                    </div>
                    <BasketTitle basketId={selectedBasket.id} baskets={searchedBaskets} onBasketClick={ticketsAssignedToBasket} countArray={countArray} {...props}/>
                </DxcSidenav>
                <Card 
                    className="w-100 basket-title"
                    title={
                        <> 
                            <div className="d-flex justify-content-between align-items-center">
                                <span>{selectedBasket.title}</span>
                                <div className="search-input">
                                    <DxcInput
                                        label={'Search Ticket'}
                                        onChange={searchTicket}
                                        margin="medium"
                                    />
                                </div>
                            </div>
                        </>
                    }>
                    {tickets &&
                    <div className="main-container col-12">
                        <div className="col-12">
                            <div className="row position-relative">
                                <div className="col">
                                    <TicketList 
                                        height={'600px'}
                                        handleTicketClick={handleTicketClick} 
                                        tickets={ticketsFromBasket} />
                                </div>
                                <EntitySidebar 
                                    className="baskets-ticket"
                                    width={483}
                                    open={openSidebar} 
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

