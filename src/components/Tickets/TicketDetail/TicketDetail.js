import React from 'react';
import {Redirect} from "react-router-dom";
import useTickets from "../../../data/hooks/useTickets";


function TicketDetail({id}) {
    console.log('id', id)
   const {getOne}= useTickets()
    let ticket
    if (id)
         ticket =  getOne(id)

    //if (!auth.logged) return <Redirect to={"/signin"}></Redirect>
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


export default TicketDetail;

