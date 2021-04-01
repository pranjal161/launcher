import "./card.css"

import { DxcBox } from '@dxc-technology/halstack-react';

import PropTypes from 'prop-types';
import React from 'react';
import styled from "styled-components";

const CardHeaderFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    // to have box-shadow not covered by the children elements
    z-index: 20;
    position: relative;
`;

const CardHeader = styled(CardHeaderFooter)`
    border-bottom: 1px solid rgb(0 0 0 / 20%);
    box-shadow: 0px 3px 3px -3px rgb(0 0 0 / 20%);
`;

const CardFooter = styled(CardHeaderFooter)`
    border-top: 1px solid rgb(0 0 0 / 20%);
    box-shadow: 0px -3px 3px -3px rgb(0 0 0 / 20%);
`;

const CardHeaderTitle = styled.span`
    font-size: 1rem;
    font-weight: bold;
`;

const Card = ({title, actions, children, footer, contentFullWidth=true}) => (
    <div className="card-height-wrapper">
        <DxcBox 
            padding={contentFullWidth ? "" : "xsmall"} 
            size="fillParent" 
            display="block">
            <CardHeader>
                <CardHeaderTitle>
                    {title}
                </CardHeaderTitle>
                {actions}
            </CardHeader>
            {children}
            {
                footer &&
                    <CardFooter>
                        {footer}
                    </CardFooter>
            }
        </DxcBox>
    </div>
)

Card.propTypes = {
    title: PropTypes.any,
    actions: PropTypes.any,
    children: PropTypes.any,
    footer: PropTypes.any,
    contentFullWidth: PropTypes.bool
}

export default Card;