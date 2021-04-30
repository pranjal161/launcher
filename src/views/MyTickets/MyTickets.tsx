import 'views/MyTickets/MyTickets.scss'

import React, { useEffect, useState } from 'react';

import Card from 'components/Card/Card';
import EntitySidebar from 'components/EntitySidebar/EntitySidebar';
import ManagementPanel from './components/ManagementPanel/ManagementPanel';
import PreviewContainer from "components/Tickets/PreviewContainer/PreviewContainer";
import TicketList from "components/Tickets/TicketsList/TicketsList";
import { TicketsContainer } from './StyledTickets';
import useDeskTickets from "data/hooks/useDeskTickets";

const MyTickets = (props: any) => {

    const sideNavItems: any[] = [
        { title: 'All NewTicket', status: 'all NewTicket', },
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
    // const [searchedStatus, setSearchedStatus] = useState<any[]>(sideNavItems);
    const [countArray, setCountArray] = useState({});
    const { remove } = useDeskTickets()
    console.log(selectedItem);

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

    const setTicketCount = () => {
        let countArray: any = {};
        sideNavItems && sideNavItems.map((sideNavItem: any) => {
            if (sideNavItem.status == 'all NewTicket') {
                countArray[sideNavItem.status] = tickets && tickets.length;
            }
            else {
                const ticketsInsideItem = tickets && tickets.filter((ticket: { status: any; }) => ticket.status === sideNavItem.status);
                countArray[sideNavItem.status] = ticketsInsideItem && ticketsInsideItem.length;

            }
            return null;
        });
        setCountArray(countArray);
    }

    const ticketsAssignedToList = (item: any) => {
        setItemDetails({ status: item.status, title: item.title });
        getAllFilteredTickets(item.status);
    }

    const getAllFilteredTickets = (status: string) => {
        if (status == "all NewTicket" || status == undefined) {
            setFilteredTickets(tickets);
        }
        else {
            const selectedTicketArray = tickets && tickets.filter((ticket: { status: any; }) => ticket.status === status);
            setFilteredTickets(selectedTicketArray && selectedTicketArray.length > 0 ? selectedTicketArray : []);
        }
    }

    useEffect(() => {
        setFilteredTickets(tickets);
        ticketsAssignedToList({ status: 'all NewTicket' });
        setItemDetails({ title: 'All NewTicket', status: 'all NewTicket' })
        //setSearchedStatus(sideNavItems);
        setTicketCount();
    }, []);
    return (
        <>
            <TicketsContainer>
                <ManagementPanel items={sideNavItems} ticketsAssignedToBasket={ticketsAssignedToList} countArray={countArray} />
                <TicketsContainer.StyledContentArea>
                    <Card
                        className="w-100 basket-title">
                        {tickets &&
                            <div className="main-container col-12">
                                <div className="col-12 p-0">
                                    <div className="row position-relative">
                                        <div className="col p-0">
                                            <TicketList
                                                height={'600px'}
                                                handleTicketClick={handleTicketClick}
                                                selected={clickedTicket.id}
                                                tickets={filteredTickets} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </Card>
                </TicketsContainer.StyledContentArea>
                <TicketsContainer.StyledRightSidebar>
                    <EntitySidebar
                        className="ticket"
                        width={360}
                        open={openSidebar}
                        content={
                            <PreviewContainer
                                id={clickedTicket.id}
                                key={clickedTicket.id}
                                onRemove={handleRemove}
                                onClose={handleClose} />
                        } />
                </TicketsContainer.StyledRightSidebar>
            </TicketsContainer>
        </>
    );
}
export default MyTickets;
