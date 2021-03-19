import React from 'react';

function BasketList(props) {
    const {baskets, handleBasketClick=()=>{}} = props


    return (
        <ul className="list-group mt-2">
            {baskets && baskets.map(basket =>
                <li key= {basket.id} className="list-group-item" onClick ={() => handleBasketClick(basket)}>
                    <h6>{basket.title}</h6>
                    <small>{basket.id}</small>
                </li>
            )}

        </ul>
    );
}

export default BasketList;
