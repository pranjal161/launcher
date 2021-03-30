import React from 'react';
import SectionHeader from "../SectionHeader/SectionHeader";

const Section=({title, actions, children}) => {
    return (
        <>
            <SectionHeader title={title} actions={actions}/>
            {children}
        </>
    );
}

export default Section;
