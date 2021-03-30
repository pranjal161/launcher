import "./entitySidebar.css"

import PropTypes from 'prop-types'
import React from "react";
import clsx from 'clsx';

const EntitySidebar = ({open, width = 240, content}) => {
    const widthInlineStyle = open ? {width} : {};

    return (
        <div className={clsx('entity-sidebar__container', open && 'entity-sidebar--open', !open && 'entity-sidebar--close')} style={widthInlineStyle}>
            <div>
                {content}
            </div>
        </div>
    )
}

EntitySidebar.propTypes = {
    open: PropTypes.string,
    width: PropTypes.number,
    content: PropTypes.string
}

export default EntitySidebar;