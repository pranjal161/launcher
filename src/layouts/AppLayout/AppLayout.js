import {DxcApplicationLayout} from '@dxc-technology/halstack-react';
import Header from "../../components/header/header";
import PropTypes from 'prop-types'
import React from 'react';
import {applyRoutes} from "../../routes";

const AppLayout = ({route}) => (
    <>
        <DxcApplicationLayout>
            <DxcApplicationLayout.Header>
                <Header/>
            </DxcApplicationLayout.Header>
            <DxcApplicationLayout.Main>
                {applyRoutes(route.routes)}
            </DxcApplicationLayout.Main>
        </DxcApplicationLayout>
    </>
)

AppLayout.propTypes = {
    route: PropTypes.string
}

export default AppLayout;
