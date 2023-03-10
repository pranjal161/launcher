import './HomePage.scss';

import { DxcBox, DxcHeading, DxcLink } from '@dxc-technology/halstack-react';
import React, { useState } from 'react';

import BasketList from 'components/Baskets/BasketList/BasketList';
import Card from 'components/Card/Card';
import CreateReminders from 'components/Reminders/components/CreateReminders/CreateReminders';
import EntitySidebar from 'components/EntitySidebar/EntitySidebar';
import Reminders from 'components/Reminders/Reminders';
import SavingPanels from "components/Tickets/Panels/SavingPanels/SavingPanels";
import TicketList from 'components/Tickets/TicketsList/TicketsList';
import useDeskAuth from 'data/hooks/useDeskAuth';
import useDeskBaskets from 'data/hooks/useDeskBaskets';
import useDeskTickets from 'data/hooks/useDeskTickets';


const HomePage = () => {
    const {profile} = useDeskAuth()
    const ticketDesk = useDeskTickets()
    const basketDesk = useDeskBaskets()
    const {remove} = useDeskTickets()
    const tickets = ticketDesk.getAll()
    const baskets = basketDesk.getAll()
    const [clickedTicket, setClickedTicket] = useState({id: null});
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openReminder, setOpenReminder] = useState(false);
    const reminders = profile ? profile.reminders : undefined;

    const handleTicketClick = (ticket: { id: any; }) => {
        setClickedTicket({id: ticket.id})
        setOpenSidebar(true)
    }

    const handleRemove = (id: string | number) => {
        remove(id)
        setClickedTicket({id: null})
        setOpenSidebar(false)
    }

    const handleClose = () => {
        setClickedTicket({id: null})
        setOpenSidebar(false)
    }

    const onClickDialog = () => {
        setOpenReminder(false);
    };

    return (
        <span className="home-container">
            <div className="welcome-banner">
                <DxcBox margin="small" padding="medium" size="fillParent">
                    <DxcHeading level={5} weight="light" text={'Welcome! ' + profile.firstName + ' ' + profile.lastName} />
                </DxcBox>
            </div>
            <div className="main-container">
                <div className="grid-container col-12">
                    {

                        /*
                            add style={{zIndex: 9}} to make the z-index of the card title 
                            smaller than the z-index of DxcApplicationLayout.Header, which it 10.
                            Setting the z-index of a container component overrides the z-index of a child component.
                        */
                    }
                    <div className="col-8" style={{zIndex: 9}}>
                        <Card
                            title="All Baskets">
                            {baskets &&
                            <BasketList baskets={baskets}/>
                            }
                        </Card>
                    </div>
                    <div className="col-4" style={{zIndex: 9}}>
                        <Card
                            title="Today&apos;s Reminder"
                            actions={
                                <DxcLink onClick={() => {
                                    setOpenReminder(true);
                                }}
                                text="Create Reminders">
                                </DxcLink>
                            }>
                            {openReminder &&
                            <CreateReminders onClickDialog={onClickDialog}/>
                            }
                            {reminders &&
                            <Reminders reminders={reminders}/>
                            }  
                        </Card>
                    </div>
                    <div className="col-12" style={{zIndex: 9}}>
                        <Card
                            title="All Tickets">
                            {tickets &&
                            <div className="main-container col-12">
                                <div className="col-12">
                                    <div className="d-flex flex-nowrap">
                                        <div className="flex-grow-1">
                                            <TicketList height={800}
                                                handleTicketClick={handleTicketClick}
                                                tickets={tickets}/>
                                        </div>
                                        <EntitySidebar
                                            open={openSidebar}
                                            width={434}
                                            content={
                                                <SavingPanels ticketId={clickedTicket.id}
                                                    onRemove={handleRemove}
                                                    onClose={handleClose}/>
                                            }/>
                                    </div>
                                </div>
                            </div>
                            }
                        </Card>
                    </div>
                </div>
            </div>
        </span>
    );


}

export default HomePage;
