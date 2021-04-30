import DetailWrapper from "views/Trainers/TrainingJeenal/components/TicketView/components/DetailWrapper/DetailWrapper";
import Header from "views/Trainers/TrainingJeenal/components/TicketView/components/Header/Header";
import React from 'react';
import SideBar from "views/Trainers/TrainingJeenal/components/TicketView/components/Sidebar/SideBar";
import useDeskTickets from "../../data/hooks/useDeskTickets";
import { useSelector } from "react-redux";

const TicketTabsDetail = () => {
    const selectedTicketObject: any = useSelector((state: any) => state.navBarTabs.selectedTab);
    let isWrongTabType = false;
    if (selectedTicketObject.type !== 'ticket') {
        isWrongTabType = true;
    }

    let isNoTabIdPresent = false;
    if (!selectedTicketObject.id) {
        isNoTabIdPresent = true;
    }

    let ticket = null;
    const { getOne } = useDeskTickets();
    if (!isNoTabIdPresent && !isWrongTabType) {
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
                            // <DetailWrapper ticket={ticket} />:
                            <div style={{ overflowX: 'hidden' }} >
                                <div className="w-100">
                                    <Header ticket={ticket} />
                                </div>
                                <div className="row overflow-hidden">
                                    <div className="col-9 min-vh-100 divider">
                                        <DetailWrapper ticket={ticket} />
                                    </div>
                                    <div className="col-3 min-vh-100">
                                        <SideBar />
                                    </div>
                                </div>

                            </div>
                            :
                            <div>
                                fetching ticket...
                            </div>
            }
        </>
    )
}

export default TicketTabsDetail;
