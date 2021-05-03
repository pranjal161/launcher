import PropTypes from 'prop-types'
import React from 'react';
import SectionHeader from "components/SectionHeader/SectionHeader";
import styled from "styled-components";


const Root = styled.div`
    margin-bottom: 1rem;
`;


const Section=(props:any) => {
    const {title, actions, children} = props;

    return (
        <Root>
            <SectionHeader title={title} actions={actions}/>
            {children}
        </Root>
    )
}

Section.propTypes = {
    title: PropTypes.any,
    actions: PropTypes.any,
    children: PropTypes.any,
    id: PropTypes.any
}

export default Section;
