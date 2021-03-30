import React, {useState} from 'react';

import {DxcTabs} from "@dxc-technology/halstack-react"
import LatestPage from "./components/LatestPage/LatestPage";
import TicketListPage from "./components/TicketListPage/TicketListPage";

/**
 * Norbert's test page
 * @param {props} props Information on tickets
 * @returns {void} Norbert's test page with tickets list
 */
function TrainingNorbert(props) {
    const [activeTab, setActiveTab] = useState(0);
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
