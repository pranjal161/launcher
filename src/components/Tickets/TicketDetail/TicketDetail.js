import React from 'react';
import {Redirect} from "react-router-dom";
import withOneTicket from "../../../data/HOC/withOneTicket";


function TicketDetail(props) {
    const {ticket, auth} = props
    if (!auth.logged) return <Redirect to={"/signin"}></Redirect>
    if (ticket) {
        return (
            <div className={"container section project-details"}>
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">Project Title : {ticket.title}</span>
                        <p>{ticket.content}</p>
                    </div>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Post by {ticket.creatorFirstName} {ticket.creatorLastName}</div>

                </div>
            </div>
        )
    } else
        return (<div className="container center">Loading project ...</div>)
}


export default withOneTicket(TicketDetail);
