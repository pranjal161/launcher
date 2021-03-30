import {DxcApplicationLayout, DxcFooter, DxcHeader} from "@dxc-technology/halstack-react";

import PropTypes from 'prop-types'
import React from 'react';
import {applyRoutes} from "../../routes";

const AuthLayout= (props) =>  {
    console.log('props', props.route.routes)
    
    return (
        <DxcApplicationLayout>
            <DxcApplicationLayout.Header>
                <DxcHeader></DxcHeader>
            </DxcApplicationLayout.Header>
            <DxcApplicationLayout.Main >
                {applyRoutes(props.route.routes)}
            </DxcApplicationLayout.Main>
            <DxcApplicationLayout.Footer>
                <DxcFooter />
            </DxcApplicationLayout.Footer>
        </DxcApplicationLayout>

    );
}

AuthLayout.propTypes = {
    route: PropTypes.string
}

export default AuthLayout;
