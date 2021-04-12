import PropTypes from 'prop-types'
import React from 'react';
import {applyRoutes} from "../../routes";

const ErrorLayout = (props: { route: any }) => (
    <div>
        <h4>Error page</h4>
        {applyRoutes(props.route.routes)}
    </div>
)

ErrorLayout.propTypes = {
    route: PropTypes.string,
}

export default ErrorLayout;
