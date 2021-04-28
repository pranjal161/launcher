import {ContractIcon, HistoryIcon, PersonSmallIcon, TicketIcon} from "assets/svg";
import PropTypes from "prop-types";
import React from 'react';
import VerticalToolbar from "components/VerticalToolBar/VerticalToolbar";


const items = [
    {value: 'ticket', display: <TicketIcon/>},
    {value: 'person', display: <PersonSmallIcon/>},
    {value: 'contract', display: <ContractIcon/>},
    {value: 'history', display: <HistoryIcon/>}]

const SavingToolbar = ({value, onChange}) => (
    <VerticalToolbar items={items} value={value} onChange={onChange}/>
)

SavingToolbar.propTypes = {
    value: PropTypes.string,
    onChange : PropTypes.func
}

export default SavingToolbar;
