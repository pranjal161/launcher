import { DxcApplicationLayout, DxcFooter, DxcHeader, DxcSpinner } from '@dxc-technology/halstack-react';
import MainNavBar from "components/MainNavBar/MainNavBar";
import PropTypes from 'prop-types'
import React from 'react';
import { Redirect } from 'react-router-dom';
import TabViewContainer from 'views/TabView/TabViewContainer';
import { applyRoutes } from "../../routes";
import styled from "styled-components";
import useDeskAuth from "data/hooks/useDeskAuth";
import { useSelector } from "react-redux";

// the DxcApplicationLayout.Main has a CSS rule top: 64px, 
// while the MainNavBar has a height of 106px. 
// This means that to avoid getting the main page content covered by the header,
// a margin-top is needed.
const FixMainTop = styled.div`
    margin-top: 42px;
`;

const LoadingSpinnerContainer = styled.div`
    & div div {
        border: unset !important;
    }
`;

const AppLayout = (props: { route: any }) => {
    const { route } = props;
    const { auth } = useDeskAuth();
    const isFirestoreHooked = useSelector((state: any) => state.firestore.listeners.byId['users']);
    let redirectToLogin = false;
    let isLoading = false;

    if(isFirestoreHooked === undefined) {
        isLoading = true;
    }

    if(isFirestoreHooked && !auth.logged) {
        redirectToLogin = true;
    }

    /**
     * The component TabViewContainer is displayed only on route /viewTab, 
     * and it's content is only hidden, not unrendered. 
     * This is done to avoid rerendering the data fetch heavy secondary tabs components.
     */

    return (
        <>
            {
                isLoading ? 
                    <DxcApplicationLayout>
                        <DxcApplicationLayout.Header>
                            <DxcHeader></DxcHeader>
                        </DxcApplicationLayout.Header>
                        <DxcApplicationLayout.Main>
                            <LoadingSpinnerContainer>
                                <DxcSpinner 
                                    mode="overlay"
                                    margin="xxsmall"
                                    label="Logging in..." />
                            </LoadingSpinnerContainer>                        
                        </DxcApplicationLayout.Main>
                        <DxcApplicationLayout.Footer>
                            <DxcFooter />
                        </DxcApplicationLayout.Footer>
                    </DxcApplicationLayout> :
                    redirectToLogin ? 
                        <Redirect to={'/auth/signin'}/> :
                        <DxcApplicationLayout>
                            <DxcApplicationLayout.Header>
                                <MainNavBar />
                            </DxcApplicationLayout.Header>
                            <DxcApplicationLayout.Main>
                                <FixMainTop>
                                    <TabViewContainer />
                                    {applyRoutes(route.routes)}
                                </FixMainTop>
                            </DxcApplicationLayout.Main>
                        </DxcApplicationLayout>
            }
        </>
    )

}

AppLayout.propTypes = {
    route: PropTypes.object
}

export default AppLayout;