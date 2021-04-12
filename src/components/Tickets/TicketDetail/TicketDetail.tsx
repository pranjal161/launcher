import React, {useState} from 'react';

import NewWindowPortal from "../../NewWindowPortal/NewWindowPortal";
import TicketSummary from "../TicketDetail/components/TicketSummary/TicketSummary";
import useDeskAuth from "../../../data/hooks/useDeskAuth";
import useDeskTickets from "../../../data/hooks/useDeskTickets";

// eslint-disable-next-line valid-jsdoc
/**
 * Display of ticket in detail
 * @param {id, sectionId, onRemove, onClose} Information that will be used for the ticket detail
 * @returns {*} Display of ticket in detail
 */
function TicketDetail(props:any) {
    const {id, sectionId, onRemove, onClose} = props;
    const {getOne, assignTo, remove} = useDeskTickets()
    const {currentUserId} = useDeskAuth()
    let ticket = id ? getOne(id) : undefined

    const assignToCurrentUser = () => assignTo(id, currentUserId)
    const removeToCurrentUser = () => assignTo(id, null)
    const removeHandle = () => remove(id) && onRemove && onRemove(id)
    const closeHandle = () => onClose && onClose()

    const [openPopup, setOpenPopup] = useState(false);

    const assignButton = ticket && ticket.assignedTo === currentUserId ?
        <a href="#" className="btn btn-warning ml-2" onClick={removeToCurrentUser}>Unassign to me</a> :
        <a href="#" className="btn btn-info ml-2" onClick={assignToCurrentUser}>Assign to me</a>

    const Actions = (<><a href="#" className="btn btn-danger" onClick={removeHandle}>Delete</a>{assignButton}</>)

    const popupHandle = () => {
        setOpenPopup(true);
    }

    if (ticket) {
        return (
            <>
                <TicketSummary 
                    ticket={ticket} 
                    actions={Actions} 
                    onClose={closeHandle} 
                    onPopupWindow={popupHandle}
                    showPopupIcon={true}
                    {...sectionId}/>

                {openPopup &&
                <NewWindowPortal onCloseCallback={closeHandle}>
                    <TicketSummary 
                        ticket={ticket} 
                        actions={Actions} 
                        onClose={closeHandle} 
                        {...sectionId}/>
                </NewWindowPortal>}
            </>
        )
    } 
    else
        return (<div className="container center">Loading ticket ...</div>)
}

export default TicketDetail;

