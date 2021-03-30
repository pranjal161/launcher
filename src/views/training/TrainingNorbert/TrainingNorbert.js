import React, {useState} from 'react';

import CommunicateAcrossBrowser from "./components/CommunicateAcrossBrowser/CommunicateAcrossBrowser";
import {DxcTabs} from "@dxc-technology/halstack-react"
import LatestPage from "./components/LatestPage/LatestPage";
import TicketListPage from "./components/TicketListPage/TicketListPage";
import TicketSummary from "../../../components/Tickets/TicketDetail/components/TicketSummary/TicketSummary";
import useDeskTickets from "../../../data/hooks/useDeskTickets";

/**
 * Training's Norbert page
 * @returns {void} Training's Norbert page
 */
function TrainingNorbert() {
    const [activeTab, setActiveTab] = useState(0);
    const {getOne} = useDeskTickets()

    const ticket = getOne("9ScjOQv2UuVui17r7Jig")

    const onTabClick = (i) => {
        setActiveTab(i);
    };

    return (
        <>
            <DxcTabs
                activeTabIndex={activeTab}
                onTabClick={onTabClick}
                tabs={[
                    {
                        label: "TicketSummary"
                    },
                    {
                        label: "Latest"
                    },
                    {
                        label: "Communicate across browser"
                    },
                    {
                        label: "Ticket list"
                    }
                ]}
            />
            {activeTab === 0 && (
                ticket && <TicketSummary ticket={ticket}/>
            )}
            {activeTab === 1 && (
                <LatestPage/>
            )}
            {activeTab === 2 && (
                <CommunicateAcrossBrowser/>
            )}

            {activeTab === 3 && (
                <TicketListPage/>
            )}
        </>
    );
}

export default TrainingNorbert;
