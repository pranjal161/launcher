import React from "react";
import styled from 'styled-components';

interface EntitySidebarProps {
    open: boolean,
    width: number,
    content: any,
    className: string
}

const StyledSidebar = styled.div<EntitySidebarProps>`
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    transition: width 0.2s ease-in;
  width: ${(props) => (props.open ? (props) => props.width : 0)}px;
` as any;

const EntitySidebar = (props: {open: boolean, width?: number, content: any, className?: any}) => {
    const {open, width = 240, content, className=''} = props;
    return (
        <StyledSidebar open={open} width={width} className={className}>
            <div className="d-flex">
                {content}
            </div>
        </StyledSidebar>
    )
};

export default EntitySidebar;
