import './TicketTitle.scss';

import PropTypes from 'prop-types'
import React from 'react';

const TicketTitle = (props: any) => {
    const { items, onItemClick, ticketTitle, countArray = {} } = props;

    const selected = (title: string) => ticketTitle === title;

    return (
        <ul className="list-group mt-2 pr-1">
            {items && items.map((item: any) => <li key={item.status} className={`cursor-pointer list-group-item d-flex justify-content-between align-items-center border-0 rounded-0 ${selected(item.status) ? 'active' : ''}`} onClick={() => onItemClick(item)}>
                <h6 className="m-0">{item.title}</h6>
                {countArray && countArray[item.status] !== undefined && <small>{countArray[item.status]}</small>}
            </li>
            )}
        </ul>
    );
}

TicketTitle.propTypes = {
    items: PropTypes.array,
    onItemClick: PropTypes.func,
    ticketTitle: PropTypes.string,
    countArray: PropTypes.any,
    sideNavItems: PropTypes.array
}

export default TicketTitle;
