import React, {useEffect, useState} from 'react';

import Card from 'components/Card/Card';
import {DxcInput} from '@dxc-technology/halstack-react';
import {StyledSidenavSearchInput} from 'styles/global-style';
import TicketList from 'components/Tickets/TicketsList/TicketsList';
import TicketsDetails from './components/TicketsDetails/TicketsDetails';
import TitleBig from "components/Titles/TitleBig/TitleBig";
import styled from "styled-components";
import {useTranslation} from 'react-i18next';

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const StyledHeader = styled.div`
  padding-inline: 1rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;



const TicketsListDetails = (props: { tickets: any, title: any }) => {
    const {t} = useTranslation();
    const {tickets, title} = props;
    const count = tickets && tickets.length
    const [clickedTicket, setClickedTicket] = useState({id: ''});
    const [ticketList, setTicketList] = useState([]);

    const handleTicketClick = (ticket: { id: any; }) => {
        setClickedTicket({id: ticket.id})
    }

    const searchTicket = (value: string) => {
        var result = tickets.filter((ticket: { basketId: string, title: string }) => ticket.title.toLowerCase().indexOf(value.toLowerCase()) >= 0);
        setTicketList(result);
    }

    useEffect(() => {
        if (tickets) {
            setTicketList(tickets);
            if (tickets.length > 0)
                handleTicketClick(tickets[0])
            else
                setClickedTicket({id: ''})
        }
    }, [tickets]);

    return (
        <Card>
            <Root>
                <div className="col-8 p-0">
                    <StyledHeader>
                        <TitleBig title={title} count={count}/>
                        <StyledSidenavSearchInput>
                            <DxcInput
                                label={t('_SEARCH_TICKET')}
                                onChange={searchTicket}
                                margin="medium"
                            />
                        </StyledSidenavSearchInput>
                    </StyledHeader>
                    {tickets && <TicketList
                        height={'600px'}
                        handleTicketClick={handleTicketClick}
                        selected={clickedTicket.id}
                        tickets={ticketList}/>}
                </div>

                <div className="col-4 p-0">
                    <TicketsDetails ticketId={clickedTicket.id}/>
                </div>
            </Root>
        </Card>
    );
}

export default TicketsListDetails;
