import { MemoClientView } from "../../views/Activities/ClientView/ClientView";
import { MemoContractView } from "../../views/Activities/ContractView/ContractView";
import { MemoTicketView } from "../../components/Tickets/TicketView/TicketView";
import React from 'react';

/**
 * Used to select a React component to display data based on its type. 
 * Used only in TabView component for now.
 * So far only for ticket, contract and client
 * @constructor 
 * @param {Object} props - the React props object
 * @param {string} props.tabId - The id of the object the user wants to fetch data for. Can be the Id of a ticket, href for contract, etc
 * @param {string} props.type - The type of object the user wants to display data for: ticket, contract and client, for now.
 */
const TabViewType = (props: { tabId: string, type: string }) => {
    const { tabId, type } = props;

    return (
        <>
            {
                (type === "ticket") ? 
                    <MemoTicketView id={tabId} key={tabId} /> : 
                    (type === "contract") ? 
                        <MemoContractView hRef={tabId} key={tabId} /> : 
                        (type === "client") ? 
                            <MemoClientView hRef={tabId} key={tabId} /> : 
                            <div>
                            No content defined for data type: 
                            </div>
            }
        </>
    );
}

export default TabViewType;

/**
 * Export a memoised version of the component to avoid unnecessary rerenders if no props are changed.
 */
export const MemoTabViewType = React.memo(TabViewType);