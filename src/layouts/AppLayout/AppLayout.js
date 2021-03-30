import React from 'react';
import Header from "../../components/header/header";
import {DxcApplicationLayout} from '@dxc-technology/halstack-react';
import {applyRoutes} from "../../routes";

const AppLayout = ({route}) => {
    return (
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
    );
}

export default AppLayout;
