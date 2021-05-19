import ClientSummary from 'views/ClientView/ClientSummary';
import React from 'react'
import { useLocation } from "react-router-dom";
import withActivity from "hoc/withActivity";

/**
 * Display a component as an activity
 * set the baContext with the given url
 * pass the url in prop
 */

const ClientView = (props: { hRef?: string }) => {
    const location: any = useLocation();
    const url = props.hRef ? props.hRef : location.state.contractUrl
    const ContractViewActivity: any = withActivity(ClientSummary, url)
    return (<>{ContractViewActivity}</>)
}

export default ClientView;

/**
 * Export a memoised version of the component to avoid unnecessary rerenders if no props are changed.
 */
export const MemoClientView = React.memo(ClientView);