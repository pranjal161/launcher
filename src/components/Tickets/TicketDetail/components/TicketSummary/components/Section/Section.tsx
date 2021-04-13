import PropTypes from 'prop-types'
import React from 'react';
import SectionHeader from "../../../../../../SectionHeader/SectionHeader";

const Section=(props:any) => {
    const {title, actions, children} = props;

    return (
        <>
            <SectionHeader title={title} actions={actions}/>
            {children}
        </>
    )
}

Section.propTypes = {
    title: PropTypes.any,
    actions: PropTypes.any,
    children: PropTypes.any,
    id: PropTypes.any
}

export default Section;
