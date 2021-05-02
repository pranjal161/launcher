import ContractSummary from "views/ContractSummary/ContractSummary";
import React from 'react';
import { useLocation } from 'react-router-dom';


const ContractView = (props: { hRef?: string }) => {
    const location = useLocation()
    const hRefFinal = props.hRef ? props.hRef : location.state.contractUrl
    return (<ContractSummary hRef={hRefFinal}/>)
}


export default ContractView;
