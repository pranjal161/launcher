import {DxcTable} from "@dxc-technology/halstack-react";
import React from 'react';
import styled from "styled-components";
import useDeskTickets from "../../data/hooks/useDeskTickets";
import { useSelector } from "react-redux";

const MainTabbedDetailsContainer = styled.div`
    margin-top: 1rem;
`;

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
                            <MainTabbedDetailsContainer>
                                <DxcTable>
                                    <tr>
                                        <td>Title: </td>
                                        <td>{ticket.title}</td>
                                    </tr>
                                    <tr>
                                        <td>Received on: </td>
                                        <td>{ticket.receivedDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Deadline: </td>
                                        <td>{ticket.deadlineDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Created by: </td>
                                        <td>{ticket.createdBy}</td>
                                    </tr>
                                    <tr>
                                        <td>Person in charge: </td>
                                        <td>{ticket.assignedTo}</td>
                                    </tr>
                                    <tr>
                                        <td>Description: </td>
                                        <td>{ticket.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Description: </td>
                                        <td>{ticket.description}</td>
                                    </tr>
                                </DxcTable>
                            </MainTabbedDetailsContainer> :
                            <div>
                                fetching ticket...
                            </div>
            }
        </>
    )
    
}

export default TicketTabsDetail;