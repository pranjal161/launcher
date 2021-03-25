import React, {useState} from 'react';
import {DxcTabs} from "@dxc-technology/halstack-react"
import TicketListPage from "./components/TicketListPage/TicketListPage";
import LatestPage from "./components/LatestPage/LatestPage";


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
                        label: "Ticket list"
                    }
                ]}
            />

            {activeTab === 0 && (
                <LatestPage/>
            )}

            {activeTab === 1 && (
                <TicketListPage/>
            )}
        </>
    );
}

export default TrainingNorbert;
