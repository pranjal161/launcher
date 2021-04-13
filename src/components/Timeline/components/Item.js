import React from 'react';

import "./Item.scss";

const Item = ({ticket}) => {

    React.useEffect(() => {
        console.log(ticket)
    }, [])

    return (
        <div className="timeline-item-container">

        </div>
    )
};

export default Item;