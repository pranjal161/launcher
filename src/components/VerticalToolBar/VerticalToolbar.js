import {StyledToolbarItem, StyledToolbarList} from "../../styles/global-style";
import PropTypes from "prop-types";
import React from 'react';
import styled from "styled-components";

const Item = styled.li`
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-bottom: 6px;
  max-width: 44px;
  height: 44px;
`;

const VerticalToolbar = ({items, value, onChange}) => (
    <StyledToolbarList>
        {items.map((item) => (
            <StyledToolbarItem key={item.value} active={value === item.value}>
                <Item onClick={() => onChange(item.value)}>
                    {item.display}
                </Item>
            </StyledToolbarItem>))}
    </StyledToolbarList>
)

VerticalToolbar.propTypes = {
    items: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default VerticalToolbar;
