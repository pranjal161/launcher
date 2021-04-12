import { DxcApplicationLayout } from '@dxc-technology/halstack-react';
import Header from "components/Header/Header";
import PropTypes from 'prop-types'
import React from 'react';
import { applyRoutes } from "../../routes";

const AppLayout = (props: { route: any }) => {
    const { route } = props;

    return (
        <>
            <DxcApplicationLayout>
                <DxcApplicationLayout.Header>
                    <Header />
                </DxcApplicationLayout.Header>
                <DxcApplicationLayout.Main>
                    {applyRoutes(route.routes)}
                </DxcApplicationLayout.Main>
            </DxcApplicationLayout>
        </>
    )

}

AppLayout.propTypes = {
    route: PropTypes.string
}

export default AppLayout;
