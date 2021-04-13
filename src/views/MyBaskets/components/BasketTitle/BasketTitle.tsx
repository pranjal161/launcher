import './BasketTitle.scss';

import PropTypes from 'prop-types'
import React from 'react';

const BasketTitle = (props: any) => {
    const {baskets, onBasketClick, basketId, countArray={}} = props;
    const selected = (id: string) => basketId === id;

    return (
        <ul className="list-group mt-2 pr-1">
            {baskets && baskets.map((basket: any) => <li key={basket.id} className={`cursor-pointer list-group-item d-flex justify-content-between align-items-center border-0 rounded-0 ${selected(basket.id) ? 'active' : ''}`} onClick ={() => onBasketClick(basket)}>
                <h6 className="m-0">{basket.title}</h6>
                {countArray && countArray[basket.id] !== undefined && <small>{countArray[basket.id]}</small>}
            </li>
            )}
        </ul>
    );
}

BasketTitle.propTypes = {
    baskets: PropTypes.array,
    onBasketClick: PropTypes.func,
    basketId: PropTypes.string,
    countArray: PropTypes.any
}

export default BasketTitle;
