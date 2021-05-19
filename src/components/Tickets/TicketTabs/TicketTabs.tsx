import * as popupWindowActions from "../../../store/actions/popupWindowTabsActions";

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MemoTicketView } from "components/Tickets/TicketView/TicketView";
import Tab from '../../Tabs/components/Tab/Tab';
import Tabs from '../../Tabs/Tabs';

const TicketTabs = React.memo((props: {setWindowFocus?: Function}) => {

    const { setWindowFocus = null } = props;
    let ticketIDObject = useSelector((state:any) => state.popupWindow.ticketIDsTabs);
    let selectedTicketID = useSelector((state:any) => state.popupWindow.selectedTicketTab.id);
    let dispatch = useDispatch();
    let ticketIDsArray = Object.keys(ticketIDObject);

    const closeTicket = useCallback((ticketID: string) => {
        if(ticketIDsArray.length === 1) {
            dispatch(popupWindowActions.closeWindowTabs());
        }
        dispatch(popupWindowActions.removeTicketTabByID(ticketID));
    }, [ticketIDsArray.length]);

    if(setWindowFocus) {
        setWindowFocus();
    }

    const handleTabSelect = useCallback((tabId: string) => {
        dispatch(popupWindowActions.setSelectedTicketTabByID(tabId));
    }, [dispatch]);

    return (
        <Tabs
            activeTabId={selectedTicketID}
            onTabClick={handleTabSelect}
            onTabClose={closeTicket}>
            {
                ticketIDsArray.map((ticketId) => (
                    <Tab
                        key={ticketId}
                        tabId={ticketId}
                        isActiveTab = {selectedTicketID === ticketId}
                        tabLabel={ticketIDObject[ticketId]}>
                        <div>
                            <MemoTicketView 
                                key={ticketId}
                                id={ticketId} />
                        </div>
                    </Tab>
                ))
            }
        </Tabs>
    )
})

TicketTabs.displayName = "TicketTabs";
export default TicketTabs;