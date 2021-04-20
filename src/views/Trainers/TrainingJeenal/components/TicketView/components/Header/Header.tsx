import { AddReminder, EyeIcon } from "assets/svg";
import React from "react";
import { DxcButton } from "@dxc-technology/halstack-react";
import styled from "styled-components";
import { StyledButton } from 'styles/global-style';
import "./Header.scss";


const Header = (props: { ticket: any }) => {
    const { ticket } = props;

    const onLaunchActivity = () => {

    }

    const viewHistory = () => {

    }

    const addReminder = () => {

    }

    const Root = styled.div`
  display: flex ;
  width: 100%;
  justify-content: space-between;
align-items:center;
  background: darkgray;
`;

    return (
        ticket && ticket.title
        && (
            <Root>
                <div className="col-9">
                    <h3>
                        {ticket.title}
                        {/* ticketTitle */}
                    </h3>
                </div>
                <div className="col-3 display-contents">
                    <StyledButton onClick={viewHistory}>
                        <EyeIcon />
                    </StyledButton>
                    <StyledButton onClick={addReminder}>
                        <AddReminder />
                    </StyledButton>
                    <DxcButton
                        mode="primary"
                        label="Launch Activity"
                        onClick={onLaunchActivity}
                        margin="xxsmall"
                    />
                </div>
            </Root >
        )
    )


}
export default Header;