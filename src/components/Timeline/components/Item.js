import React from 'react';
// import moment from "moment";

import "./Item.scss";

const Item = ({ ticket }) => {

    return (
        <div className="timeline-item-container">
            <div className="item-container">
                <div className="draft-container">
                    <div className="circle-timeline"></div>
                    <div className="line-timeline"></div>
                </div>
                <div className="info-container">

                    <p>{ticket.metadata.updatedBy}</p>

                    <p>{ticket.action}</p>

                    <p>{ticket.metadata.momentDate}</p>
                </div>
            </div>


            <div className="circle"></div>
        </div>
    )
};

export default Item;