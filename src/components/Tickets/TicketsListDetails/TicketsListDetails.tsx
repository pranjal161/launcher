import React, { useEffect, useState } from 'react';

import Card from 'components/Card/Card';
import { DxcInput } from '@dxc-technology/halstack-react';
import { ListDetailsContainer } from './StyledTicketsListDetails';
import { StyledSidenavSearchInput } from 'styles/global-style';
import TicketList from 'components/Tickets/TicketsList/TicketsList';
import TicketsDetails from './components/TicketsDetails/TicketsDetails';
import { useTranslation } from 'react-i18next';

const TicketsListDetails = (props: { tickets: any, selectedBasket: any, count: number }) => {
    const { t } = useTranslation();
    const { tickets, selectedBasket, count } = props;
    const [clickedTicket, setClickedTicket] = useState({id: ''});
    const [ticketList, setTicketList] = useState([]);

    const handleTicketClick = (ticket: { id: any; }) => {
        setClickedTicket({ id: ticket.id})
    }

    const searchTicket = (value: string) => {
        var result = tickets.filter((ticket: { basketId: string, title: string }) => ticket.title.toLowerCase().indexOf(value.toLowerCase()) >= 0);
        setTicketList(result);
    }

    useEffect(() => {
        if (tickets && tickets.length > 0) {
            setTicketList(tickets);
            handleTicketClick(tickets[0]);
        }
    }, [tickets]);

    return (
        <>
            <ListDetailsContainer.StyledContentArea>
                <Card
                    className="w-100 basket-title"
                    title={
                        <>
                            <div className="d-flex justify-content-between align-items-center">
                                <ListDetailsContainer.ContentTitle className="mt-4">{selectedBasket.title} <span>({count})</span></ListDetailsContainer.ContentTitle>
                                <StyledSidenavSearchInput>
                                    <DxcInput
                                        label={t('_SEARCH_TICKET')}
                                        onChange={searchTicket}
                                        margin="medium"
                                    />
                                </StyledSidenavSearchInput>
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
                                            tickets={ticketList} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Card>
            </ListDetailsContainer.StyledContentArea>
            <ListDetailsContainer.StyledRightSidebar>
                <TicketsDetails ticketId={clickedTicket.id} />
            </ListDetailsContainer.StyledRightSidebar>
        </>
    );
}

export default TicketsListDetails;