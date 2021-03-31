import BasketList from "./BasketList";
import React from 'react';
import useDeskBaskets from "../../data/hooks/useDeskBaskets";

const MyBaskets = (props) =>  {
    const { getMyAllBaskets } = useDeskBaskets()
    const baskets = getMyAllBaskets()
    return (
        <BasketList baskets = {baskets} {...props}/>
    );
}

export default MyBaskets;



