import * as popupWindowActions from "../../../store/actions/popupWindowTabsActions";

import {useDispatch, useSelector} from "react-redux";

import React from "react";
import Tab from '../../Tabs/components/Tab/Tab';
import Tabs from '../../Tabs/Tabs';
import SavingPanels from "../Panels/SavingPanels/SavingPanels";

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

    return (
        <Tabs
            activeTabId = {selectedTicketID}>
            {
                ticketIDsArray.map((ticketId) => (
                    <Tab
                        key={ticketId}
                        tabId={ticketId}
                        tabLabel={ticketIDObject[ticketId]}
                        onTabCloseClick = {closeTicket}
                        isActiveTab = {selectedTicketID === ticketId}>
                        <SavingPanels
                            ticketId={ticketId} />
                    </Tab>
                ))
            }
        </Tabs>
    )
}

export default TicketTabs;