import React from 'react';
import moment from "moment";

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

                    <p style={{textAlign: "left", width: "100%", margin: 0, marginLeft: 25, fontWeight: "bold"}}>{ticket.metadata.updatedBy}</p>

                    <p style={{textAlign: "left", width: "100%", margin: 0, marginLeft: 25, color: "#BDC8D2" }}> 
                        {  moment(new Date(ticket.metadata.updatedISODate)).fromNow("ss") } 
                    </p>

                    <p>{ticket.action}</p>

                    <p style={{marginBottom: 25}}>{ticket.metadata.momentDate}</p>
                </div>
            </div>


            <div className="circle"></div>
        </div>
    )
};

export default Item;