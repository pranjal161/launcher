import {ContractIcon, PersonSmallIcon} from "assets/svg";
import PropTypes from "prop-types";
import React from 'react';
import VerticalToolbar from "components/VerticalToolBar/VerticalToolbar";


const items = [
    {value: 'contract', display: <ContractIcon/>},
    {value: 'person', display: <PersonSmallIcon/>}]

const SavingToolbar = ({value, onChange}) => (
    <VerticalToolbar items={items} value={value} onChange={onChange}/>
)

SavingToolbar.propTypes = {
    value: PropTypes.string,
    onChange : PropTypes.func
}

export default SavingToolbar;
