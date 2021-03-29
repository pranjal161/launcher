import React from 'react';
import {applyRoutes} from "../../routes";
import {DxcApplicationLayout, DxcHeader, DxcFooter} from "@dxc-technology/halstack-react";

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

export default AuthLayout;
