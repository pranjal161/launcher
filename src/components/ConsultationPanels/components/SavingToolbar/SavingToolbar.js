import {ContractIcon, PersonIcon} from "../../../../assets/svg";
import PropTypes from "prop-types";
import React from 'react';
import VerticalToolbar from "../../../VerticalToolBar/VerticalToolbar";


const items = [{value: 'person', display: <PersonIcon size={24}/>}, {value: 'contract', display: <ContractIcon/>}]

const SavingToolbar = ({value}) => (
    <VerticalToolbar items={items} value={value}/>
)

SavingToolbar.propTypes = {
    value: PropTypes.string,
}

export default SavingToolbar;
