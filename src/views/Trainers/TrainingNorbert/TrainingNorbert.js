import React, {useState} from 'react';
import AssignRelatedToTickets from "./components/AssignRelatedToTickets/AssignRelatedToTickets";

import CommunicateAcrossBrowser from "./components/CommunicateAcrossBrowser/CommunicateAcrossBrowser";
import {DxcTabs} from "@dxc-technology/halstack-react"
import LatestPage from "./components/LatestPage/LatestPage";
import TicketListPage from "./components/TicketListPage/TicketListPage";
import TicketPreview from "../../../components/Tickets/TicketPreview/TicketPreview";
import TrainingConsultationPanel from "./components/TrainingConsultationPanel/TrainingConsultationPanel";
import useDeskTickets from "../../../data/hooks/useDeskTickets";

/**
 * Training's Norbert page
 * @returns {*} Training's Norbert page
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
                        label : "Contract assignation"
                    },
                    {
                        label : "TrainingConsultationPanel"
                    },
                    {
                        label: "TicketPreview"
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
                <AssignRelatedToTickets/>
            )},
            {activeTab === 1 && (
                ticket && <TrainingConsultationPanel />
            )},
            {activeTab === 2 && (
                ticket && <TicketPreview ticket={ticket}/>
            )}
            {activeTab === 3 && (
                <LatestPage/>
            )}
            {activeTab === 4 && (
                <CommunicateAcrossBrowser/>
            )}

            {activeTab === 5 && (
                <TicketListPage/>
            )}
        </>
    );
}

export default TrainingNorbert;
