import PropTypes from 'prop-types';
import React from "react";
import styled from 'styled-components';

const StyledSidebar = styled.div`
    overflow: hidden;
    display: flex;
    transition: width 0.2s ease-in;
    width: ${props => props.open ? props => props.width : 0}px;
`;

const EntitySidebar = ({open, width = 240, content}) => {
    return (
        <StyledSidebar open={open} width={width}>
            <div>
                {content}
            </div>
        </StyledSidebar>
    )
}

EntitySidebar.propTypes = {
    open: PropTypes.bool,
    width: PropTypes.number,
    content: PropTypes.object
}

export default EntitySidebar;