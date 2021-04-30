import { DxcApplicationLayout } from '@dxc-technology/halstack-react';
import MainNavBar from "components/MainNavBar/MainNavBar";
import PropTypes from 'prop-types'
import React from 'react';
import { applyRoutes } from "../../routes";
import styled from "styled-components";


// the DxcApplicationLayout.Main has a CSS rule top: 64px, 
// while the MainNavBar has a height of 106px. 
// This means that to avoid getting the main page content covered by the header,
// a margin-top is needed.
const FixMainTop = styled.div`
    margin-top: 42px;
`;

const AppLayout = (props: { route: any }) => {
    const { route } = props;

    return (
        <>
            <DxcApplicationLayout>
                <DxcApplicationLayout.Header>
                    <MainNavBar />
                </DxcApplicationLayout.Header>
                <DxcApplicationLayout.Main>
                    <FixMainTop>
                        {applyRoutes(route.routes)}
                    </FixMainTop>
                </DxcApplicationLayout.Main>
            </DxcApplicationLayout>
        </>
    )

}

AppLayout.propTypes = {
    route: PropTypes.object
}

export default AppLayout;
