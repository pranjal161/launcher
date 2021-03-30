import React from 'react';

/**
 * List of items
 * @param {*} props Items that we want to display
 * @returns {void} Returns list of item titles with id
 */
function BasketList(props) {
    const {baskets, handleBasketClick=() => {
        // Nothing to do
    }} = props

    return (
        <ul className="list-group mt-2">
            {baskets && baskets.map((basket) => <li key= {basket.id} className="list-group-item" onClick ={() => handleBasketClick(basket)}>
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
