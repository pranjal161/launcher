import PropTypes from "prop-types";
import React from 'react';
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 2px;
  background-color: #fff;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  padding: 6px;
  margin-bottom: 6px;
  max-width: 48px;
  border-style: ${(props) => (props.selected ? 'solid' : 'none')};
  border-width: thin;
`;


const VerticalToolbar = ({items, value, onChange}) => (
    <List>
        {items.map((item) => (
            <ListItem key={item.value} onClick={() => onChange(item.value)
            } selected={value === item.value}>{item.display}</ListItem>))}
    </List>
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
