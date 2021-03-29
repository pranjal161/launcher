import React, {useState} from 'react';
import {DxcTabs} from "@dxc-technology/halstack-react"
import TicketListPage from "./components/TicketListPage/TicketListPage";
import LatestPage from "./components/LatestPage/LatestPage";
import CommunicateAcrossBrowser from "./components/CommunicateAcrossBrowser/CommunicateAcrossBrowser";


function TrainingNorbert(props) {
    const [activeTab, setActiveTab] = useState(0);
    const onTabClick = i => {
        setActiveTab(i);
    };

    return (
        <>
            <DxcTabs
                activeTabIndex={activeTab}
                onTabClick={onTabClick}
                tabs={[
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
                <LatestPage/>
            )}
            {activeTab === 1 && (
                <CommunicateAcrossBrowser/>
            )}

            {activeTab === 2 && (
                <TicketListPage/>
            )}
        </>
    );
}

export default TrainingNorbert;
