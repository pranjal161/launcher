import PropTypes from 'prop-types'
import React from 'react';

function BasketTitle(props: any) {
    const {baskets, onBasketClick=() => {}, basketId} = props;
    const selected = (id: string) => basketId === id;

    return (
        <ul className="list-group mt-2 pr-1">
            {baskets && baskets.map((basket: any) => <li key={basket.id} className={`list-group-item d-flex justify-content-between align-items-center border-0 rounded-0 ${selected(basket.id) ? 'active' : ''}`} onClick ={() => onBasketClick(basket)}>
                <h6 className="m-0">{basket.title}</h6>
                <small>25</small>
            </li>
            )}
        </ul>
    );
}

BasketTitle.propTypes = {
    baskets: PropTypes.array,
    onBasketClick: PropTypes.func,
    basketId: PropTypes.string
}

export default BasketTitle;
