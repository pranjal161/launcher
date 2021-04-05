import PropTypes from 'prop-types'
import React from 'react';
import {applyRoutes} from "../../routes";

const  ErrorLayout = ({route}) =>  (
    <div>
        <h4>Error page</h4>
        {applyRoutes(route.routes)}
    </div>
)

ErrorLayout.propTypes = {
    route: PropTypes.string,
}

export default ErrorLayout;
