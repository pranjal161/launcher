import ContractSummary from "views/ContractSummary/ContractSummary";
import React from 'react'
import {useLocation} from "react-router-dom";
import withActivity from "hoc/withActivity";

const ContractView = (props: { givenUrl?:string }) => {
    const location: any = useLocation();
    const url = props.givenUrl?props.givenUrl:location.state.contractUrl
    const ContractViewSummary:any = withActivity(ContractSummary, url)
    return (<>{ContractViewSummary}</>)
}

export default ContractView;
