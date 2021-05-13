import React, {useState} from 'react';

import {DxcBox} from "@dxc-technology/halstack-react";
import NewWindowPortal from "components/NewWindowPortal/NewWindowPortal";
import TicketPreview from "components/Tickets/TicketPreview/TicketPreview";
import useDeskAuth from "data/hooks/useDeskAuth";
import useDeskTickets from "data/hooks/useDeskTickets";
import {useHistory} from "react-router-dom";

// eslint-disable-next-line valid-jsdoc
/**
 * Display of the ticket preview data
 * @param {id, sectionId, onRemove, onClose} Information that will be used for the ticket detail
 * @returns {*} Display of ticket in detail
 */
function PreviewContainer(props: any) {
    const history = useHistory();
    const {id, onRemove, onClose} = props;
    const {getOne, assignTo, remove, openInNewTab} = useDeskTickets()
    const {currentUserId} = useDeskAuth()
    let ticket = id ? getOne(id) : undefined

    const assignToCurrentUser = () => assignTo(id, currentUserId)
    const removeToCurrentUser = () => assignTo(id, null)
    const removeHandle = () => remove(id) && onRemove && onRemove(id)
    const closeHandle = () => onClose && onClose()

    const [openPopup, setOpenPopup] = useState(false);
    
    const openTicketNewTab = () => {
        openInNewTab(id, ticket.title, 'ticket')
        history.push('/viewTab')
    }

    const assignButton = ticket && ticket.assignedTo === currentUserId ?
        <a href="/#" className="btn btn-warning ml-2" onClick={removeToCurrentUser}>Unassign to me</a> :
        <a href="/#" className="btn btn-info ml-2" onClick={assignToCurrentUser}>Assign to me</a>

    const newTabButton = <a href="/#" className="btn btn-success ml-2" onClick={openTicketNewTab}>New Tab</a>

    const Actions = (<><a href="/#" className="btn btn-danger" onClick={removeHandle}>Delete</a>{assignButton}{newTabButton}</>)

    const popupHandle = () => {
        setOpenPopup(true);
    }

    if (ticket) {
        return (
            <><DxcBox padding={"xxsmall"} shadowDepth={2}>
                <TicketPreview
                    ticket={ticket}
                    actions={Actions}
                    onClose={closeHandle}
                    onPopupWindow={popupHandle}
                    showPopupIcon={true}/>

                {openPopup &&
                <NewWindowPortal onCloseCallback={closeHandle}>
                    <DxcBox size="large" padding={"xxsmall"} shadowDepth={2}>
                        <TicketPreview
                            ticket={ticket}
                            actions={Actions}
                            onClose={closeHandle}/>
                    </DxcBox>
                </NewWindowPortal>}
            </DxcBox>
            </>)
    } else
        return null
}

export default PreviewContainer;
