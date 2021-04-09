import './MyTickets.scss'

import { DxcInput, DxcSidenav } from "@dxc-technology/halstack-react";
import React, { useEffect, useState } from 'react';

import Card from 'components/card/card';
import EntitySidebar from 'components/entitySidebar/entitySidebar';
import TicketDetail from "components/Tickets/TicketDetail/TicketDetail";
import TicketList from "components/Tickets/ticketsList/ticketsList";
import TicketTitle from '../TicketTitle/TicketTitle';
import useDeskTickets from "data/hooks/useDeskTickets";

const MyTickets = (props: any) => {

    const sideNavItems: any[] = [
        { title: 'All Tickets', status: 'all tickets', },
        { title: 'In Progress', status: 'in progress' },
        { title: 'Pending', status: 'pending' },
        { title: 'OverDue', status: 'overdue' },
        { title: 'About To Due', status: 'about to due' },
        { title: 'Viewed Recently', status: 'viewed recently' },
        { title: 'Created Recently', status: 'created' },
        { title: 'Closed', status: 'closed' }
    ];

    const [clickedTicket, setClickedTicket] = useState({ id: null });
    const [openSidebar, setOpenSidebar] = useState(false);
    const [selectedItem, setItemDetails] = useState({ title: '', status: '' });
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [searchedStatus, setSearchedStatus] = useState<any[]>(sideNavItems);
    const [countArray, setCountArray] = useState({});
    const { remove } = useDeskTickets()

    const { getMyAllTickets } = useDeskTickets()
    const tickets = getMyAllTickets()


    const handleTicketClick = (ticket: { id: any; }) => {
        setClickedTicket({ id: ticket.id })
        setOpenSidebar(true)
    }

    const handleRemove = (id: string | number) => {
        remove(id)
        setClickedTicket({ id: null })
        setOpenSidebar(false)
    }

    const handleClose = () => {
        setClickedTicket({ id: null })
        setOpenSidebar(false)
    }

    const searchStatus = (value: string) => {
        var result = sideNavItems.filter((item: { status: string, title: string }) => item.title.indexOf(value) >= 0);
        setSearchedStatus(result);
    }

    const setTicketCount = () => {
        let countArray: any = {};
        sideNavItems && sideNavItems.map((sideNavItem: any) => {
            if (sideNavItem.status == 'all tickets') {
                countArray[sideNavItem.status] = tickets.length;
            }
            else {
                const ticketsInsideItem = tickets && tickets.filter((ticket: { status: any; }) => ticket.status === sideNavItem.status);
                countArray[sideNavItem.status] = ticketsInsideItem && ticketsInsideItem.length;
                return null;
            }
        });
        setCountArray(countArray);
    }

    const searchTicket = (value: string) => {
        var result = tickets.filter((ticket: { title: string }) => ticket.title.indexOf(value) >= 0);
        setFilteredTickets(result);
    }

    const ticketsAssignedToList = (item: any) => {
        setItemDetails({ status: item.status, title: item.title });
        getAllFilteredTickets(item.status);
    }

    const getAllFilteredTickets = (status: string) => {
        if (status == "all tickets" || status == undefined) {
            setFilteredTickets(tickets);
        }
        else {
            const selectedTicketArray = tickets && tickets.filter((ticket: { status: any; }) => ticket.status === status);
            setFilteredTickets(selectedTicketArray && selectedTicketArray.length > 0 ? selectedTicketArray : []);
        }
    }

    useEffect(() => {
        setFilteredTickets(tickets);
        ticketsAssignedToList({ status: 'all tickets' });
        setItemDetails({ title: 'All Tickets', status: 'all tickets' })
        setSearchedStatus(sideNavItems);
        setTicketCount();
    }, []);
    return (
        <>
            <div className="d-flex align-items-start">
                <DxcSidenav>
                    <div className="search-input">
                        <DxcInput
                            label={'Search Ticket'}
                            onChange={searchStatus}
                            margin="medium"
                        />
                    </div>
                    <TicketTitle title={selectedItem.status} items={searchedStatus} onItemClick={ticketsAssignedToList} countArray={countArray} {...props} />
                </DxcSidenav>
                <Card
                    className="w-100 ticket-title"
                    title={
                        <>
                            <div className="d-flex justify-content-between align-items-center">
                                <span>{selectedItem.title}</span>
                                <div className="search-input">
                                    <DxcInput
                                        label={'Search Ticket'}
                                        onChange={searchTicket}
                                        margin="medium"
                                    />
                                </div>
                            </div>
                        </>
                    }>
                    {tickets &&
                        <div className="main-container col-12">
                            <div className="col-12">
                                <div className="row position-relative">
                                    <div className="col">
                                        <TicketList
                                            height={'600px'}
                                            handleTicketClick={handleTicketClick}
                                            tickets={filteredTickets} />
                                    </div>
                                    <EntitySidebar
                                        className="ticket"
                                        width={483}
                                        open={openSidebar}
                                        content={
                                            <TicketDetail
                                                id={clickedTicket.id}
                                                key={clickedTicket.id}
                                                onRemove={handleRemove}
                                                onClose={handleClose}
                                                sectionId="ticket-details" />
                                        } />
                                </div>
                            </div>
                        </div>
                    }
                </Card>
            </div>
        </>

    );
}
export default MyTickets;
