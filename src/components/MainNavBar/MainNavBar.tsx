import * as popupWindowActions from "../../store/actions/popupWindowTabsActions";

import { DxcHeader, DxcSpinner } from '@dxc-technology/halstack-react';
import { ExtensionsIcon, HelpIcon } from 'assets/svg';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';

import { ApplicationContext } from 'context/applicationContext';
import CreateButton from '../Tickets/CreateButton/CreateButton';
import DXCLogo from 'assets/dxc_logo.jpg';
import IconButton from "../IconButton/IconButton";
import NewWindowPortal from "../../components/NewWindowPortal/NewWindowPortal";
import PrimaryTabs from "../PrimaryTabs/PrimaryTabs";
import SecondaryTabs from "../SecondaryTabs/SecondaryTabs";
import SignedLinks from '../Header/components/SignedLinks/SignedLinks';
import { TabbedLinksArray } from "../PrimaryTabs/PrimaryTabsConstants";
import TicketsTabs from "../Tickets/TicketTabs/TicketTabs";
import en from 'assets/gb.jpg';
import fr from 'assets/fr.jpg';
import nl from 'assets/nl.jpg';
import styled from 'styled-components';
import useLoader from "data/hooks/useLoader";

interface NavRowProps {
    justify?: string,
    align?: string,
    height?: string
}

const MainNavContainer = styled.div`
    width: 100%;
    background-color: white;

    &::after {
        content: '';
        display: block;
        height: 2px;
        width: 100%;
        background-color: #D9D9D9;
        position: absolute;
        bottom: 0px;
    }
`;

const NavRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: ${(props: NavRowProps) => (props.justify ? props.justify : 'space-between')};
    align-items: ${(props) => (props.align ? props.align : 'stretch')};
    height: ${(props) => (props.height ? props.height : 'auto')};
`;

const LogoImg = styled.img.attrs((props) => ({
    src: props.src,
    alt: props.alt,
    title: props.title
}))`
    max-height: 32px;
    margin-left: 2rem;
    cursor: pointer;
`;

const ActionButtonsContainer = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: center;
`;

const SignedLinksContainer = styled.div`
    display: inline-flex;
    align-items: center;
    list-style: none;
`;

const SecondaryViewButtonsContainer = styled.div`
    margin-left: 2rem;
    margin-right: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 200px;
`;

const PrimaryViewAccessContainer = styled.div`
    margin-right: 1rem;
    // done to hide the bottom purple border from DxcTabs active tab,
    // because if the route changes from a page with a scrollbar to one without and no DxcTabs tab is active, 
    // sometimes a purple point can remain on the far left bottom border.
    overflow-x: hidden;
    margin-left: -2px;
`;

const TicketManagementAccessContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;


const MainNavBar = () => {

    const history = useHistory();
    const location = useLocation();
    const applicationContext = useContext(ApplicationContext);
    const [lang, setLang] = useState<string>(applicationContext.language);
    const [primaryTabSelected, setPrimaryTabSelected] = useState<number | null>(null);
    let isWindowOpen = useSelector((state: any) => state.popupWindow.isPopupWindowWithTabsOpened);
    let dispatch = useDispatch();
    const [loading] = useLoader();

    const onCloseTicketNewWindow = () => {
        dispatch(popupWindowActions.closeWindowTabs());
    }

    const langs = [
        {
            value: 'fr',
            label: 'FR',
            iconSrc: fr,
        },
        {
            value: 'en',
            label: 'EN',
            iconSrc: en,
        },
        {
            value: 'nl',
            label: 'NL',
            iconSrc: nl,
        },
    ];

    const currentLang: any = langs.find((item) => item.value === lang)
    const [langIcon, setLangIcon] = useState<any>(currentLang.iconSrc);

    const changeLang = (value: string) => {
        // to check refresh
        setLang(value);
        const currentLang: any = langs.find((item) => item.value === value);
        setLangIcon(currentLang.iconSrc)
        if (value !== applicationContext.language) {
            applicationContext.changeLang(value);
        }
    };

    const handlePrimaryTabClick = (index: number) => {
        history.push(TabbedLinksArray[index].path);
        setPrimaryTabSelected(index);
    };

    const goToHelp = () => {
        history.push('/help');
    }

    const goToHome = () => {
        history.push('/home');
    }

    const goToTraining = () => {
        history.push('/Training');
    }

    useEffect(() => {
        if (location.pathname) {
            let indexFound: number = TabbedLinksArray.findIndex((elem) => elem.path === location.pathname);
            indexFound === -1 ? setPrimaryTabSelected(null) : setPrimaryTabSelected(indexFound);
        }
    }, [location.pathname]);


    return (
        <>
            <MainNavContainer>
                <NavRow
                    align="center"
                    height="3.5rem">
                    <LogoImg
                        src={DXCLogo}
                        alt="DXC Logo"
                        title="Home"
                        onClick={goToHome} />
                    {loading && (
                        <div className="spinner">
                            <DxcSpinner margin="xxsmall" mode="small" />
                        </div>
                    )}
                    <ActionButtonsContainer>
                        <CreateButton />

                    </ActionButtonsContainer>
                    <SecondaryViewButtonsContainer>
                        <DxcHeader.Dropdown
                            options={langs}
                            onSelectOption={changeLang}
                            value={lang}
                            iconSrc={langIcon}
                            margin="xxsmall"
                            padding="xxsmall" />
                        <div title="Help">
                            <IconButton
                                onClick={goToHelp}>
                                <HelpIcon />
                            </IconButton>
                        </div>
                        <div title="Training">
                            <IconButton
                                onClick={goToTraining}>
                                <ExtensionsIcon />
                            </IconButton>
                        </div>
                        <SignedLinksContainer>
                            <SignedLinks />
                        </SignedLinksContainer>
                    </SecondaryViewButtonsContainer>
                </NavRow>
                <NavRow justify="left" align="flex-end">
                    <PrimaryViewAccessContainer>
                        <PrimaryTabs
                            value={primaryTabSelected}
                            onChange={handlePrimaryTabClick} />
                    </PrimaryViewAccessContainer>
                    <TicketManagementAccessContainer>
                        <SecondaryTabs></SecondaryTabs>
                    </TicketManagementAccessContainer>
                </NavRow>
            </MainNavContainer>
            {
                isWindowOpen &&
                <NewWindowPortal
                    windowMaximized={true}
                    passSetFocus={true}
                    onCloseCallback={onCloseTicketNewWindow}>
                    <TicketsTabs></TicketsTabs>
                </NewWindowPortal>
            }
        </>
    )
}

export default MainNavBar;
