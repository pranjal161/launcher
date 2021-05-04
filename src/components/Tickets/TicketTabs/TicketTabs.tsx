import * as popupWindowActions from "../../../store/actions/popupWindowTabsActions";

import {useDispatch, useSelector} from "react-redux";

import React from "react";
import Tab from '../../Tabs/components/Tab/Tab';
import Tabs from '../../Tabs/Tabs';
import TicketView from "components/Tickets/TicketView/TicketView";


const TicketTabs = (props: {setWindowFocus?: Function}) => {

    const {setWindowFocus = null} = props;
    let ticketIDObject = useSelector((state:any) => state.popupWindow.ticketIDsTabs);
    let selectedTicketID = useSelector((state:any) => state.popupWindow.selectedTicketTab.id);
    let dispatch = useDispatch();
    let ticketIDsArray = Object.keys(ticketIDObject);

    const closeTicket = (ticketID: string) => {
        if(ticketIDsArray.length === 1) {
            dispatch(popupWindowActions.closeWindowTabs());
        }
        dispatch(popupWindowActions.removeTicketTabByID(ticketID));
    }

    if(setWindowFocus) {
        setWindowFocus();
    }

    const handleTabSelect = (tabId: string) => {
        dispatch(popupWindowActions.setSelectedTicketTabByID(tabId));
    }

    return (
        <Tabs
            activeTabId = {selectedTicketID}
            onClick={handleTabSelect}>
            {
                ticketIDsArray.map((ticketId) => (
                    <Tab
                        key={ticketId}
                        tabId={ticketId}
                        tabLabel={ticketIDObject[ticketId]}
                        onTabCloseClick = {closeTicket}
                        isActiveTab = {selectedTicketID === ticketId}>
                        <TicketView key={ticketId}
                            id={ticketId} />
                    </Tab>
                ))
            }
        </Tabs>
    )
}

export default TicketTabs;
