import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { ApplicationContext } from 'context/applicationContext';
import { BuildIcon } from 'assets/svg';
import CreateButton from '../Tickets/CreateButton/CreateButton';
import DXCLogo from 'assets/dxc_logo.jpg';
import { DxcHeader } from '@dxc-technology/halstack-react';
import IconButton from "../IconButton/IconButton";
import PrimaryTabs from "../PrimaryTabs/PrimaryTabs";
import SignedLinks from '../Header/components/SignedLinks/SignedLinks';
import { TabbedLinksArray } from "../PrimaryTabs/PrimaryTabsConstants";
import en from 'assets/gb.jpg';
import fr from 'assets/fr.jpg';
import nl from 'assets/nl.jpg';
import styled from 'styled-components';

interface NavRowProps {
    justify?: string,
    align?: string,
    height?: string
}

const MainNavContainer = styled.div`
    width: 100%;
    margin-top: 10px;
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
    alt: props.alt
}))`
    max-height: 32px;
    margin-left: 2rem;
`;

const ActionButtonsContainer = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
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
`;

const TicketManagementAccessContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;


const NavigationBar = () => {

    const history = useHistory();
    const location = useLocation();
    const applicationContext = useContext(ApplicationContext);
    const [lang, setLang] = useState<string>(applicationContext.language);
    const [primaryTabSelected, setPrimaryTabSelected] = useState<number>(-1);

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

    const handlePrimaryTabClick = (index:number) => {
        history.push(TabbedLinksArray[index].path);
        setPrimaryTabSelected(index);
    };

    const goToTraining = () => {
        history.push('/Training');
    }

    useEffect(() => {
        if(location.pathname) {
            let indexFound: number = TabbedLinksArray.findIndex((elem) => elem.path === location.pathname);
            setPrimaryTabSelected(indexFound);
        }
    }, [location.pathname]);

    /*const actionButtonMargins = {
        right: 'xxsmall'
    }

    const ticketChipMargins = {
        right: 'xxsmall',
        bottom: 'xxsmall'
    }*/

    return (
        <MainNavContainer>
            <NavRow
                align="center"
                height="3.5rem">
                <LogoImg src={DXCLogo} alt="DXC Logo" />
                <ActionButtonsContainer>
                    <CreateButton />
                    <DxcHeader.Dropdown
                        options={langs}
                        onSelectOption={changeLang}
                        value={lang}
                        iconSrc={langIcon}
                        margin="xxsmall"
                        padding="xxsmall" />
                    <SignedLinksContainer>
                        <SignedLinks />
                    </SignedLinksContainer>
                </ActionButtonsContainer>
                <SecondaryViewButtonsContainer>
                    <IconButton
                        onClick={goToTraining}>
                        <BuildIcon />
                    </IconButton>
                </SecondaryViewButtonsContainer>
            </NavRow>
            <NavRow justify="left" align="flex-end">
                <PrimaryViewAccessContainer>
                    <PrimaryTabs
                        value={primaryTabSelected}
                        onChange={handlePrimaryTabClick} />
                </PrimaryViewAccessContainer>
                <TicketManagementAccessContainer>
                </TicketManagementAccessContainer>
            </NavRow>
        </MainNavContainer>
    )
}

export default NavigationBar;