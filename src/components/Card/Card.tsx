import "./Card.scss"

import {DxcBox} from '@dxc-technology/halstack-react';

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  background-color: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  height: 100%;

`;

const CardHeaderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  // to have box-shadow not covered by the children elements
  position: relative;
`;

const CardHeader = styled(CardHeaderFooter)`
  display: flex;
  justify-content: space-between;
  padding-inline: 1rem;
  width: 100%;
  //border-bottom: 1px solid rgb(0 0 0 / 20%);
  //box-shadow: 0px 3px 3px -3px rgb(0 0 0 / 20%);
`;

const CardFooter = styled(CardHeaderFooter)`
  border-top: 1px solid rgb(0 0 0 / 20%);
  box-shadow: 0px -3px 3px -3px rgb(0 0 0 / 20%);
`;

/* 
    Card-height-wrapper is a div class helper that allows us to fill the DxcBox component to height.
    The size="fillParent" property only works on width, not height.
    Maybe later add option to enable/disable.
    Couldn't be done with styled-components
*/
const Card = (props: { title: any; actions: any; children: any; footer: any; contentFullWidth?: boolean, className?: string }) => {
    const {title, actions, children, footer, contentFullWidth = true} = props;
    const padding = contentFullWidth ? {} : {padding: "xsmall"}
    return (
        <Root>
            <DxcBox
                {...padding}
                size="fillParent"
                display="block"
                shadowDepth={0}>
                {(title || actions) && <CardHeader>
                    {title ? title : <div/>}
                    {actions ? actions : <div/>}
                </CardHeader>}
                {children}
                {
                    footer &&
                    <CardFooter>
                        {footer}
                    </CardFooter>
                }
            </DxcBox>
        </Root>
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
