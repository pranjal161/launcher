import PropTypes from 'prop-types'
import React from 'react';
import {applyRoutes} from "../../routes";

const SecondaryLayout = (props: { route: any }) => (
    <>
        {applyRoutes(props.route.routes)}
    </>
)

SecondaryLayout.propTypes = {
    route: PropTypes.string,
}

export default SecondaryLayout;
