import {DotsIcon, RoundIcon, TimeIcon, TimeLapse} from 'assets/svg';
import {DxcBox, DxcProgressBar, DxcTable} from "@dxc-technology/halstack-react";
import React, {useState} from 'react';

import Deadline from "components/deadlineComponent/deadline";
import WithScroll from "components/WithScroll/WithScroll";
import styled from 'styled-components';
import useDeskAuth from "../../../data/hooks/useDeskAuth";
import useDeskBaskets from 'data/hooks/useDeskBaskets';
import useDeskTickets from "data/hooks/useDeskTickets";
import {useTranslation} from 'react-i18next';


const ActionsIconContainer = styled.div`
    position: relative;
    width: 24px;
    white-space: nowrap;

    & > svg {
        width: 24px;
        height: 24px;
    }
`;

/*
    Parameter numActions is the number of actions that the ActionsContainer has.
    Parameter index is the index of the current ticket in the table [0 to length - 1].
    Parameter length is the length of the tickets array.
    They are used to style the positioning of the container, so that it doesn't cause issues - 
    like appearing out of the tickets table container.
    The actions are displayed to the right of the action icon (three dots), and are centered, if possible.
    The height of a ticket table row is 58px, the height of an action is 22px, 
    and the padding of the ActionsContainer is 6px.
    If the ActionsContainer has below 3 actions, it has a height below the ticket table row - 
    2 * 22 for the rows + 2 * 6 for the padding = 56px. It needs only to be centered with translateY(-50%)
    However, if there are more actions, they need to be offset in this way - 
    minus 29px for the half of the table row and minus actions height times numActions minus than 2. 
    This adjustment is done only for the last row, as this is where a breaking change occurs and 
    the tickets table moves on ActionsContainer render.
    Of course, breaking changes can occur in other situations if the numActions is high enough, 
    but this arises for unrealistically high numbers.
*/
const ActionsContainer = styled("div")<{numActions: number, index: number, length: number}>`
    position: absolute;
    right: 150%;
    top: 50%;
    transform: translateY(${(props) => ((props.numActions < 3) ? 
        '-50%' : 
        props.index === (props.length - 1) ?
            (-29-(props.numActions-2)*22+12)+'px' :
            '-50%')});
    z-index: 2;
`;

const ActionContainer = styled.div`
        height: 22px;
        font-size: 0.8rem;
        line-height: 22px;
        padding: 0 0.5rem;
        border-bottom: 1px solid #D9D9D9;

        &:last-child {
            border-bottom: unset;
        }

        &:hover {
            background-color: #EAEAEA;
        }
`;


/*
    The overall width of the progress bar is decreased, because it wouldn't fit in the table, 
    as the default value for min-width in DxcProgressBar was 685px.

    The class progressbar is used to fix an issue with DXC react component DxcProgressBar.
    The width of the property value is too small for the progress bar width we are giving the component.
    The width percentages for progress bar originally were 5% for value and 90% for label,
    now they are changed to 15% for value and 90% for label.
*/
const ProgressBarContainer = styled.div`

    > div {
        min-width: 200px !important;
    }

    & > div > div > div:first-child > div:nth-child(1) {
        width: 75%;
    }

    > div > div > div:first-child > div:nth-child(2) {
        width: 20%;
    }
`;


const TicketList = (props: any) => {
    const {
        height='250px', tickets, handleTicketClick = () => {
            // Nothing to do
        }
    } = props
    const {t} = useTranslation();
    const basketDesk = useDeskBaskets();
    const allBaskets = basketDesk.getAll();
    let [openActionsTicket, setOpenActionsTicket] = useState('');
    const {currentUserId} = useDeskAuth();
    const {assignTo, remove} = useDeskTickets()

    const getBasketTitle = (basketId: any) => {
        const basket = allBaskets.filter((basket: { id: any; }) => basket.id === basketId);
        return basket.length > 0 ? basket[0].title : '';
    }

    let handleActionsClick = (event: any, ticketId: string) => {
        event.stopPropagation();

        if(openActionsTicket === ticketId)
            setOpenActionsTicket('');
        else
            setOpenActionsTicket(ticketId);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'created':
                return (
                    <div title="To be treated" style={{fill: "#0067B3"}}>
                        <RoundIcon/>
                    </div>)
            case 'pending':
                return (
                    <div title="Pending" style={{fill: "goldenrod"}}>
                        <TimeIcon/>
                    </div>)
            case 'closed':
                return (
                    <div title="Resolved" style={{fill: "green"}}>
                        <TimeLapse/>
                    </div>)
        }
    }

    return (
        <div className="p-2">
            <WithScroll visibleHeight={height}>
                <DxcTable>
                    <tr>
                        <th/>
                        <th>{t('_TITLE')}</th>
                        <th>{t('_BASKET')}</th>
                        <th>{t('_STAGE')}</th>
                        <th>{t('_CLIENT')}</th>
                        <th>{t('_DEADLINE')}</th>
                        <th/>
                    </tr>
                    {allBaskets && tickets.map((ticket: any, i: number) => (
                        <tr key={i} onClick={() => handleTicketClick(ticket)}>
                            <td>{getStatusIcon(ticket.status)}</td>
                            <td>{ticket.title}</td>
                            <td>{getBasketTitle(ticket.basketId)}</td>
                            <td>
                                <ProgressBarContainer>
                                    <DxcProgressBar 
                                        margin="xxsmall"
                                        overlay={false} 
                                        showValue
                                        value={ticket.stage}/>
                                </ProgressBarContainer>
                            </td>
                            <td>{ticket.createdByDisplay.toUpperCase()}</td>
                            <td><Deadline deadline={ticket.deadline}/></td>
                            <td id={'action'+ticket.id}>
                                <ActionsIconContainer
                                    onClick={(e) => handleActionsClick(e, ticket.id)}>
                                    <DotsIcon/>
                                    {
                                        (openActionsTicket === ticket.id) &&
                                        <ActionsContainer 
                                            numActions={2} 
                                            index={i} 
                                            length={tickets.length}>
                                            <DxcBox 
                                                display="block"
                                                padding="">
                                                <ActionContainer 
                                                    onClick={() => assignTo(ticket.id, ticket.assignedTo === currentUserId ? 
                                                        null : 
                                                        currentUserId)}>
                                                    {ticket.assignedTo === currentUserId ?'Unassign from me':'Assign to me'}
                                                </ActionContainer>
                                                <ActionContainer 
                                                    onClick={() => remove(ticket.id)}>
                                                    Remove
                                                </ActionContainer>
                                            </DxcBox>
                                        </ActionsContainer>
                                    }
                                </ActionsIconContainer>
                                
                            </td>
                        </tr>

                    ))}
                </DxcTable>
            </WithScroll>

        </div>
    );
}

export default TicketList;
