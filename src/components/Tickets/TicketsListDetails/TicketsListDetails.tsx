import React, {useEffect, useState} from 'react';

import Card from 'components/Card/Card';
import {DxcInput} from '@dxc-technology/halstack-react';
import {ListDetailsContainer} from './StyledTicketsListDetails';
import {StyledSidenavSearchInput} from 'styles/global-style';
import TicketList from 'components/Tickets/TicketsList/TicketsList';
import TicketsDetails from './components/TicketsDetails/TicketsDetails';
import TitleBig from "components/Titles/TitleBig/TitleBig";
import {useTranslation} from 'react-i18next';
import styled from "styled-components";


const Root = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;
const StyledTicketList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  height: 100%;
  width: 100%;
`;

const StyledHeader = styled.div`
  padding-inline: 1rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StyledTicketsDetails = styled.div`
  flex : 0 1 394px;
  height:100%
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
                handleTicketClick(tickets[0]);
        }
    }, [tickets]);

    return (
        <Card>
            <Root>
                <StyledTicketList>
                    <StyledHeader>
                        <div className={"mt-3"}><TitleBig title={title} count={count}/></div>
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
                </StyledTicketList>

                <StyledTicketsDetails>
                    <TicketsDetails ticketId={clickedTicket.id}/>
                </StyledTicketsDetails>
            </Root>
        </Card>
    );
}

export default TicketsListDetails;
