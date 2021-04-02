import DXCLogo  from 'assets/dxc_logo.jpg';
import {RoundIcon, SearchIcon, TimeLapse, CloseIcon} from 'assets/svg';
import {DxcButton, DxcTabs, DxcChip} from '@dxc-technology/halstack-react'
import React from 'react';
import styled from 'styled-components';

const MainNavContainer = styled.div`
    width: 100%;
    margin-top: 5px;
`;

const NavRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justify ? props.justify : 'space-between'};
    align-items: ${props => props.align ? props.align : 'stretch'};
`;

const LogoImg = styled.img.attrs(props => ({
    src: props.src,
    alt: props.alt
}))`
    max-height: 43px;
`;

const ActionButtonsContainer = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
`;

const SecondaryViewButtonsContainer = styled.div`
    margin-left: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PrimaryViewAccessContainer = styled.div`
    margin-right: 1rem;
`;

const TicketManagementAccessContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;


const NavigationBar = () => {

    const actionButtonMargins = {
        right: 'xxsmall'
    }

    const ticketChipMargins = {
        right: 'xxsmall',
        bottom: 'xxsmall'
    }

    const tabs = [
        {
          label: "Tab 1"
        },
        {
          label: "Tab 2"
        }
    ];

    return (
        <MainNavContainer>
            <NavRow>
                <LogoImg src={DXCLogo} alt="DXC Logo" />
                <ActionButtonsContainer>
                    <DxcButton mode="primary" label="Action Button 1" margin={actionButtonMargins}></DxcButton>
                    <DxcButton mode="primary" label="Action Button 2" margin={actionButtonMargins}></DxcButton>
                    <DxcButton mode="primary" label="Action Button 3" margin={actionButtonMargins}></DxcButton>
                </ActionButtonsContainer>
                <SecondaryViewButtonsContainer>
                    <div><RoundIcon /></div>
                    <div><SearchIcon /></div>
                    <div><TimeLapse /></div>
                    <div><CloseIcon /></div>
                </SecondaryViewButtonsContainer>
            </NavRow>
            <NavRow justify="left" align="flex-end">
                <PrimaryViewAccessContainer>
                    <DxcTabs tabs={tabs}/>
                </PrimaryViewAccessContainer>
                <TicketManagementAccessContainer>
                    <DxcChip label="Ticket 1" margin={ticketChipMargins}/>
                    <DxcChip label="Ticket 2" margin={ticketChipMargins}/>
                </TicketManagementAccessContainer>
            </NavRow>
        </MainNavContainer>
    )
}

export default NavigationBar;