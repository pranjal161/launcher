import * as popupWindowActions from "../../../store/actions/popupWindowTabsActions";

import {useDispatch, useSelector} from "react-redux";

import {DxcTable} from "@dxc-technology/halstack-react";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import React from "react";
import useDeskTickets from '../../../data/hooks/useDeskTickets';
import {useTranslation} from 'react-i18next';

const TrainingNikolay = () => {
    const ticketDesk = useDeskTickets();
    const tickets = ticketDesk.getAll();
    const {t} = useTranslation();
    let dispatch = useDispatch();
    let openedTicketTabs = useSelector((state:any) => state.popupWindow.ticketIDsTabs);
    let openedTicketTabsArray = Object.keys(openedTicketTabs);

    const openTicketNewWindow = (ticketId: string, displayTicketLabel: string) => {
        dispatch(popupWindowActions.addTicketTabByID(ticketId, displayTicketLabel));
    }
    
    return (
        <>
            <NavigationBar></NavigationBar>
            <DxcTable>
                <tr>
                    <th/>
                    <th>ID</th>
                    <th>{t('_TITLE')}</th>
                    <th>{t('_STAGE')}</th>
                    <th>{t('_CLIENT')}</th>
                    <th>{t('_DEADLINE')}</th>
                    <th>Is opened in Window?</th>
                    <th/>
                </tr>
                {
                    tickets && tickets.map((ticket: any) => (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.status}</td>
                            <td>{ticket.title}</td>
                            <td>{ticket.stage}</td>
                            <td>{ticket.createdByDisplay.toUpperCase()}</td>
                            <td>{ticket.deadline}</td>
                            <td>{
                                openedTicketTabsArray && 
                                    openedTicketTabsArray.length > 0 && 
                                    openedTicketTabsArray.indexOf(ticket.id) > -1 ?
                                    'Opened' : 
                                    'Not Opened'}</td>
                            <td onClick={() => openTicketNewWindow(ticket.id, 'Ticket: '+ticket.title)}>View in new window</td>
                        </tr>
                    ))
                }
            </DxcTable>
        </>
    )
};

export default TrainingNikolay;