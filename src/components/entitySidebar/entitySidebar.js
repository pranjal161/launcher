import React from "react";
import clsx from 'clsx';
import "./entitySidebar.css"

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

export default EntitySidebar;