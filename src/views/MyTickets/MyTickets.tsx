import React, { useEffect, useState } from 'react';

import { BasketsContainer } from './StyledBaskets';
import ManagementPanel from './components/ManagementPanel/ManagementPanel';
import TicketsListDetails from 'components/Tickets/TicketsListDetails/TicketsListDetails';
import useDeskTickets from 'data/hooks/useDeskTickets';

const sideNavItems: any[] = [
    { title: 'All', status: 'all NewTicket', },
    { title: 'Pending', status: 'pending' },
    { title: 'OverDue', status: 'overdue' },
    { title: 'Finished', status: 'closed' }
];

const MyTickets = () => {
    const ticketDesk = useDeskTickets()
    const tickets = ticketDesk.getAll();
    const [selectedItem, setItemDetails] = useState({ title: '', status: '' });

    const [filteredTickets, setFilteredTickets] = useState([]);
    const [countArray, setCountArray] = useState({});

    const ticketsAssignedToList = (item: any) => {
        setItemDetails({ status: item.status, title: item.title });
        setTicketCount()
        getAllFilteredTickets(item.status);
    }

    useEffect(() => {
        ticketsAssignedToList(selectedItem.status !== '' ? selectedItem : { title: 'All', status: 'all NewTicket' })
    }, [tickets])

    const getAllFilteredTickets = (status: string) => {
        if (status == "all NewTicket" || status == undefined) {
            setFilteredTickets(tickets);
        } else {
            const selectedTicketArray = tickets && tickets.filter((ticket: { status: any; }) => ticket.status === status);
            setFilteredTickets(selectedTicketArray && selectedTicketArray.length > 0 ? selectedTicketArray : []);
        }
    }


    const setTicketCount = () => {
        let countArray: any = {};
        sideNavItems && sideNavItems.map((sideNavItem: any) => {
            if (sideNavItem.status == 'all NewTicket') {
                countArray[sideNavItem.status] = tickets && tickets.length;
            } else {
                const ticketsInsideItem = tickets && tickets.filter((ticket: { status: any; }) => ticket.status === sideNavItem.status);
                countArray[sideNavItem.status] = ticketsInsideItem && ticketsInsideItem.length;

            }
            return null;
        });
        setCountArray(countArray);
    }


    return (
        <>
            <BasketsContainer>
                <div className="col-2 pl-0">
                    <ManagementPanel items={sideNavItems} ticketsAssignedToList={ticketsAssignedToList}
                        value={selectedItem && selectedItem.status} countArray={countArray} />
                </div>
                <div className="col-10 p-0">
                    <TicketsListDetails tickets={filteredTickets} title={selectedItem && selectedItem.title} />
                </div>
            </BasketsContainer>
        </>
    );
}

export default MyTickets

