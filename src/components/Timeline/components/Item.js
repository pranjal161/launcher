import React from 'react';
import moment from "moment";

import "./Item.scss";

const Item = ({ ticket }) => {

    
    switch(ticket.action) {

    
        case "assignedTo":
            return (
                <div className="timeline-item-container">
                    <div className="item-container">
                        <div className="draft-container">
                            <div className="circle-timeline"></div>
                            <div className="line-timeline"></div>
                        </div>
                        <div className="info-container">

                            <p className="username-item">{ticket.metadata.updatedByDisplay}</p>

                            <p className="time-item">
                                {moment(new Date(ticket.metadata.updatedISODate)).fromNow("ss").includes("hours") ||
                                 moment(new Date(ticket.metadata.updatedISODate)).fromNow("ss").includes("minutes") ? 
                                 moment(new Date(ticket.metadata.updatedISODate)).fromNow("ss") : moment(ticket.metadata.updatedISODate).format('DD/MM/YYYY - HH:MM')}
                            </p>

                            <p className="action-item">Assigned to {ticket.newValue}</p>
                        </div>
                    </div>
                </div>
            )
        

        case "ticketUpdated":
            return (
                <div className="timeline-item-container">
                    <div className="item-container">
                        <div className="draft-container">
                            <div className="circle-timeline"></div>
                            <div className="line-timeline"></div>
                        </div>
                        <div className="info-container">

                            <p className="username-item">{ticket.metadata.updatedByDisplay}</p>

                            <p className="time-item">
                                {moment(new Date(ticket.metadata.updatedISODate)).fromNow("ss").includes("hours") ||
                                 moment(new Date(ticket.metadata.updatedISODate)).fromNow("ss").includes("minutes") ? 
                                 moment(new Date(ticket.metadata.updatedISODate)).fromNow("ss") : moment(ticket.metadata.updatedISODate).format('DD/MM/YYYY - HH:MM')}
                            </p>

                            <p className="action-item">{ticket.action}</p>
                        </div>
                    </div>
                </div>
            )
        

        case "createdBy":
            return (
                <div className="timeline-item-container">
                    <div className="item-container">
                        <div className="draft-container">
                            <div className="circle-timeline"></div>
                            <div className="line-timeline"></div>
                        </div>
                        <div className="info-container">

                            <p className="username-item">{ticket.metadata.updatedByDisplay}</p>

                            <p className="time-item">
                                {moment(new Date(ticket.metadata.updatedISODate)).fromNow("ss")}
                            </p>

                            <p>{ticket.action}</p>

                            <p style={{ marginBottom: 25 }}>{ticket.metadata.momentDate}</p>
                        </div>
                    </div>
                </div>
            )
        

        case "addedDocument":
            return (
                <div className="timeline-item-container">
                    <div className="item-container">
                        <div className="draft-container">
                            <div className="circle-timeline"></div>
                            <div className="line-timeline"></div>
                        </div>
                        <div className="info-container">

                            <p className="username-item">{ticket.metadata.updatedByDisplay}</p>

                            <p className="time-item">
                                {moment(new Date(ticket.metadata.updatedISODate)).fromNow("ss")}
                            </p>

                            <p className="action-item">{ticket.action}</p>
                            <img className="picture-item" src={ticket.newValue.url} alt={ticket.newValue.name}/>
                            <p className="picture-name">{ticket.newValue.name}</p>
                        </div>
                    </div>
                </div>
            )
        default:
            return(
                <div>
                    <p>Please insert the required props</p>
                </div>
            )
    }



};

export default Item;