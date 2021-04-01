import "./entitySidebar.css"

import PropTypes from 'prop-types'
import React from "react";
import clsx from 'clsx';

const EntitySidebar = ({open, width = 240, content}) => {
    const widthInlineStyle = open ? {width, minWidth:width} : {};

    return (
        <div className={clsx('entity-sidebar__container', open && 'entity-sidebar--open', !open && 'entity-sidebar--close')} style={widthInlineStyle}>
            <div>
                {content}
            </div>
        </div>
    )
}

EntitySidebar.propTypes = {
    open: PropTypes.bool,
    width: PropTypes.number,
    content: PropTypes.object
}

export default EntitySidebar;
