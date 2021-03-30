import PropTypes from 'prop-types'
import React from 'react';
import SectionHeader from "../SectionHeader/SectionHeader";

const Section=({title, actions, children}) => (
    <>
        <SectionHeader title={title} actions={actions}/>
        {children}
    </>
)

Section.propTypes = {
    title: PropTypes.string,
    actions: PropTypes.array,
    children: PropTypes.string
}

export default Section;
