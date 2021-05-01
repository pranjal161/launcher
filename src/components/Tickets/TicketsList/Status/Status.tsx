import {DoneIconMinimize, PendingIcon, RoundIcon, UnAssignedIcon} from "assets/svg";
import React from 'react';

const Status = (props: { ticket: any }) => {
    let content
    if (!props.ticket.assignedTo) {
        content = (<div title="To be treated" style={{fill: "#0067B3"}}>
            <UnAssignedIcon/> To be assigned
        </div>)
    } else {
        switch (props.ticket.status) {
            case 'created':
                content = (
                    <div title="To be treated" style={{fill: "#0067B3"}}>
                        <RoundIcon/> To be treated
                    </div>)
                break;
            case 'pending':
                content = (
                    <div title="Pending" style={{fill: "goldenrod"}}>
                        <PendingIcon/> In Progress
                    </div>)
                break;
            case 'closed':
                content = (
                    <div title="Resolved" style={{fill: "green"}}>
                        <DoneIconMinimize/> Done
                    </div>)
                break;
            default:
                content = (
                    <div/>)
        }
    }
    return (<>{content}</>);
}

export default Status;
