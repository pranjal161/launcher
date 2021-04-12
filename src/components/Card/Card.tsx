import "./Card.scss"

import { DxcBox, DxcHeading } from '@dxc-technology/halstack-react';

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

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

/* 
    card-height-wrapper is a div class helper that allows us to fill the DxcBox component to height.
    The size="fillParent" property only works on width, not height.
    Maybe later add option to enable/disable.
    Couldn't be done with styled-components
*/
const Card = (props: { title: any; actions: any; children: any; footer: any; contentFullWidth?: boolean, className?: string }) => {
    const { title, actions, children, footer, contentFullWidth = true, className = '' } = props;

    return (
        <div className={`card-height-wrapper ${className}`}>
            <DxcBox
                padding={contentFullWidth ? "" : "xsmall"}
                size="fillParent"
                display="block">
                <CardHeader>
                    <span>
                        <DxcHeading level={5} weight="light" text={title} />
                    </span>
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
}

Card.propTypes = {
    title: PropTypes.any,
    actions: PropTypes.any,
    children: PropTypes.any,
    footer: PropTypes.any,
    contentFullWidth: PropTypes.bool,
    className: PropTypes.string
}

export default Card;
