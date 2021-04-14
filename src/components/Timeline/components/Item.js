import React from 'react';
// import moment from "moment";

import "./Item.scss";

const Item = ({ ticket }) => {

    return (
        <div className="timeline-item-container">
            {
                Object.keys(ticket).length > 1 ?
                    (<p>coucou</p>)
                    :
                    (<>
                        <p>{ticket[0][Object.keys(ticket[0])].action}</p>
                        <p>{ticket[0][Object.keys(ticket[0])].metadata.updatedBy}</p>
                        <p>{ticket[0][Object.keys(ticket[0])].metadata.momentDate}</p>
                    </>)
            }
        </div>
    )
};

export default Item;