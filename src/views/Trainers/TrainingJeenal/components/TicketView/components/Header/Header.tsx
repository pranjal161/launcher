import "./Header.scss";

import {AddReminder, EyeIcon} from "assets/svg";

import {DxcButton} from "@dxc-technology/halstack-react";
import React from "react";
import {StyledButtonWhiteSVG} from 'styles/global-style';
import styled from "styled-components";

const Header = (props: { ticket: any }) => {
    const {ticket} = props;

    const onLaunchActivity = () => {
        //write functionality on click of launch activity

    }

    const viewHistory = () => {
        // write functionality on the click of view history icon

    }

    const addReminder = () => {
        // write functionality on the click of add remider icon
    }

    const Root = styled.div`
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      background: #486581;
      height:84px;
    `;

    return (
        ticket && ticket.title
        && (
            <Root>
                <div className="col-9 ml-2 white">
                    <h3>
                        {ticket.title}
                        {/* ticketTitle */}
                    </h3>
                </div>
                <div className="col-3 text-right pl-0">
                    <StyledButtonWhiteSVG onClick={viewHistory}>
                        <EyeIcon/>
                    </StyledButtonWhiteSVG>
                    <StyledButtonWhiteSVG onClick={addReminder}>
                        <AddReminder/>
                    </StyledButtonWhiteSVG>
                    <DxcButton
                        mode="secondary"
                        label="Launch Activity"
                        onClick={onLaunchActivity}
                        margin="xxsmall"
                    />
                </div>
            </Root>
        )
    )


}
export default Header;
