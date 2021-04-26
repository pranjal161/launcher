import { BasketsContainer, StyledSidenav } from './StyledBaskets';
import React, { useEffect, useState } from 'react';

import Card from 'components/Card/Card';
import { DxcInput } from '@dxc-technology/halstack-react';
import EntitySidebar from 'components/EntitySidebar/EntitySidebar';
import ManagementPanel from './components/ManagementPanel/ManagementPanel';
import PreviewContainer from "components/Tickets/PreviewContainer/PreviewContainer";
import TicketList from 'components/Tickets/TicketsList/TicketsList'
import useDeskBaskets from "data/hooks/useDeskBaskets";
import useDeskTickets from 'data/hooks/useDeskTickets';
import { useTranslation } from 'react-i18next';

const MyBaskets = () => {
    const { t } = useTranslation();
    const {getAll} = useDeskBaskets()
    const baskets = getAll();
    const ticketDesk = useDeskTickets()
    const {remove} = useDeskTickets()
    const tickets = ticketDesk.getAll();
    const [clickedTicket, setClickedTicket] = useState({id: null});
    const [openSidebar, setOpenSidebar] = useState (false);
    const [selectedBasket, setClickedBasket] = useState({id: null, title: ''});
    const [searchedBaskets, setSearchedBaskets] = useState([]);
    const [ticketsFromBasket, setTicketsFromBasket] = useState([]);

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

    const getSpecificBasketCount = (id: any) => {
        const ticketsInsideBasket = tickets && tickets.filter((ticket: { basketId: any; }) => ticket.basketId === id);
        const count = ticketsInsideBasket && ticketsInsideBasket.length;
        return count;
    }

    const getTicketCount = () => {
        let countArray: any = baskets;
        return countArray && countArray.map((basket: any) => {
            const count = getSpecificBasketCount(basket.id);
            return {
                ...basket,
                count: count
            };
        });
    }

    useEffect(() => {
        ticketsAssignedToBasket({id: baskets && baskets[0].id, title: baskets && baskets[0].title});
        const updatedBaskets = getTicketCount();
        setSearchedBaskets(updatedBaskets);
    }, [baskets, tickets]);

    useEffect(() => {
        if (ticketsFromBasket && ticketsFromBasket.length > 0) {
            handleTicketClick(ticketsFromBasket[0]);
        }
    }, [ticketsFromBasket]);
    
    return (
        <>
            <BasketsContainer>
                <ManagementPanel searchBasket={searchBasket} searchedBaskets={searchedBaskets} selectedBasket={selectedBasket} ticketsAssignedToBasket={ticketsAssignedToBasket} />
                <BasketsContainer.StyledContentArea>
                    <Card 
                        className="w-100 basket-title"
                        title={
                            <> 
                                <div className="d-flex justify-content-between align-items-center">
                                    <BasketsContainer.ContentTitle className="mt-4">{selectedBasket.title} <span>({getSpecificBasketCount(selectedBasket.id)})</span></BasketsContainer.ContentTitle>
                                    <StyledSidenav.SearchInput>
                                        <DxcInput
                                            label={t('_SEARCH_TICKET')}
                                            onChange={searchTicket}
                                            margin="medium"
                                        />
                                    </StyledSidenav.SearchInput>
                                </div>
                            </>
                        }>
                        {tickets &&
                        <div className="main-container col-12">
                            <div className="col-12 p-0">
                                <div className="row position-relative">
                                    <div className="col p-0">
                                        <TicketList 
                                            height={'600px'}
                                            handleTicketClick={handleTicketClick} 
                                            selected={clickedTicket.id}
                                            tickets={ticketsFromBasket} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </Card>
                </BasketsContainer.StyledContentArea>
                <BasketsContainer.StyledRightSidebar>
                    <EntitySidebar 
                        className="baskets-ticket"
                        width={360}
                        open={openSidebar} 
                        content={
                            <PreviewContainer
                                id={clickedTicket.id}
                                key={clickedTicket.id}
                                onRemove={handleRemove} 
                                onClose={handleClose} />
                        } />
                </BasketsContainer.StyledRightSidebar>
            </BasketsContainer>
        </>
    );
}

export default MyBaskets

