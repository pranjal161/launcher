import './WithScroll.css';

import PropTypes from 'prop-types';
import React from 'react';

const WithScroll = ({visibleHeight = '100%', children}) => (
    <div style={{height: visibleHeight, overflowY: "hidden"}}>
        <div className="hide-scroll-bar" style={{height: '100%', overflowY: "scroll"}}>{children}</div>
    </div>
)
WithScroll.propTypes = {
    visibleHeight: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node])
}

export default WithScroll;
