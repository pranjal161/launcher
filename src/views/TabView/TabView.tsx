import ContractView from "components/Contracts/ContractView/ContractView";
import React from 'react';
import TicketView from "components/Tickets/TicketView/TicketView";
import {useSelector} from "react-redux";

const TabView = () => {
    const selectedTab: any = useSelector((state: any) => state.navBarTabs.selectedTab);
    let content = <div>Content not yet defined</div>
    switch (selectedTab.type){
        case 'ticket':
            content = <TicketView key={selectedTab.id} id={selectedTab.id} />
            break;
        case 'contract':
            content = <ContractView hRef={selectedTab.id} />
            break;
        case 'client':
            break;
        default:
            break;
    }

    return (
        <>
            {content}
        </>
    );
}

export default TabView;
