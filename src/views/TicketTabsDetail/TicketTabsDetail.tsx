import DetailWrapper from "views/Trainers/TrainingJeenal/components/TicketView/components/DetailWrapper/DetailWrapper";
import React from 'react';
import useDeskTickets from "../../data/hooks/useDeskTickets";
import { useSelector } from "react-redux";


const TicketTabsDetail = () => {
    const selectedTicketObject:any = useSelector((state:any) => state.navBarTabs.selectedTab);
    let isWrongTabType = false;
    if(selectedTicketObject.type !== 'ticket') {
        isWrongTabType = true;
    }

    let isNoTabIdPresent = false;
    if(!selectedTicketObject.id) {
        isNoTabIdPresent = true;
    }

    let ticket = null;
    const { getOne } = useDeskTickets();
    if(!isNoTabIdPresent && !isWrongTabType) {
        ticket = getOne(selectedTicketObject.id);
    }

    return (
        <>
            {
                isWrongTabType ? 
                    <div>
                        This isn&apos;t a ticket type.
                    </div> : 
                    isNoTabIdPresent ? 
                        <div>
                            There isn&apos;t a ticket Id.
                        </div> :
                        ticket ?
                            <DetailWrapper ticket={ticket} />:
                            <div>
                                fetching ticket...
                            </div>
            }
        </>
    )
    
}

export default TicketTabsDetail;
