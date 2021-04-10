import PropTypes from 'prop-types'
import React from 'react';
import {applyRoutes} from "../../routes";

const CanvasLayout = ({route}) => (
    <>
        {applyRoutes(route.routes)}
    </>
)

CanvasLayout.propTypes = {
    route: PropTypes.string,
}

export default CanvasLayout;
