import {DxcButton} from "@dxc-technology/halstack-react";
import PropTypes from "prop-types";
import React from 'react';

/**
 * Display Icon as button
 * @param {props} props Contains onClick handle, children contains the icon to display
 * @returns {*} Render the icon Button
 */
const IconButton = (props: { onClick: Function, children: any }) => (
    <DxcButton label={props.children} onClick={props.onClick} mode="flat"/>);

IconButton.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.any,
}
export default IconButton;
