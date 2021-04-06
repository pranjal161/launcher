import PropTypes from 'prop-types'
import React from 'react';

/**
 * List of items
 * @param {*} props Items that we want to display
 * @returns {*} Returns list of item titles with id
 */
function BasketList(props: any) {
    const {baskets, handleBasketClick=() => {
        // Nothing to do
    }} = props

    return (
        <ul className="list-group mt-2">
            {baskets && baskets.map((basket: any) => <li key= {basket.id} className="list-group-item" onClick ={() => handleBasketClick(basket)}>
                <h6>{basket.title}</h6>
                <small>{basket.id}</small>
            </li>
            )}
        </ul>
    );
}

BasketList.propTypes = {
    baskets: PropTypes.array,
    handleBasketClick: PropTypes.func
}

export default BasketList;
