import ContractSummary from "views/ContractSummary/ContractSummary";
import React from 'react'
import {useLocation} from "react-router-dom";
import withActivity from "hoc/withActivity";

/**
 * Display a component as an activity
 * set the baContext with the given url
 * pass the url in prop
 */

const ContractView = (props: { givenUrl?:string }) => {
    const location: any = useLocation();
    const url = props.givenUrl?props.givenUrl:location.state.contractUrl
    const ContractViewActivity:any = withActivity(ContractSummary, url)
    return (<>{ContractViewActivity}</>)
}

export default ContractView;
