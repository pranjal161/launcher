import React, { useEffect, useState } from 'react';

import { BasketsContainer } from './StyledBaskets';
import ManagementPanel from './components/ManagementPanel/ManagementPanel';
import TicketsListDetails from 'components/Tickets/TicketsListDetails/TicketsListDetails';
import useDeskBaskets from "data/hooks/useDeskBaskets";
import useDeskTickets from 'data/hooks/useDeskTickets';

const MyBaskets = () => {
    const {getAll} = useDeskBaskets()
    const baskets = getAll();
    const ticketDesk = useDeskTickets()
    const tickets = ticketDesk.getAll();
    const [selectedBasket, setClickedBasket] = useState({id: null, title: ''});
    const [searchedBaskets, setSearchedBaskets] = useState([]);
    const [ticketsFromBasket, setTicketsFromBasket] = useState([]);

    const ticketsAssignedToBasket = (basket: any) => {
        setClickedBasket({id: basket.id, title: basket.title});
        getAllTicketsFromBasket(basket.id);
    }

    const getAllTicketsFromBasket = (id: string) => {
        const selectedTicketArray = tickets && tickets.filter((ticket: { basketId: any; }) => ticket.basketId === id);
        setTicketsFromBasket(selectedTicketArray && selectedTicketArray.length > 0 ? selectedTicketArray : []);
    }

    const searchBasket = (value: string) => {
        var result = baskets.filter((basket: { title: string }) => basket.title.indexOf(value) >= 0);
        setSearchedBaskets(result);
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
    
    return (
        <>
            <BasketsContainer>
                <ManagementPanel searchBasket={searchBasket} searchedBaskets={searchedBaskets} selectedBasket={selectedBasket} ticketsAssignedToBasket={ticketsAssignedToBasket} />
                <TicketsListDetails tickets={ticketsFromBasket} selectedBasket={selectedBasket} count={getSpecificBasketCount(selectedBasket.id)} />
            </BasketsContainer>
        </>
    );
}

export default MyBaskets

