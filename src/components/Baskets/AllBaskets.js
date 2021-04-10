import BasketList from "./BasketList";
import React from 'react';
import useDeskBaskets from "../../data/hooks/useDeskBaskets";

const AllBaskets= (props) => {
    const {getAll} = useDeskBaskets()
    const baskets = getAll()
    return (
        <BasketList baskets={baskets} {...props}/>
    );
}

export default AllBaskets

