import "./MiddleBar.scss";

import React, { useState } from "react";

import Documents from "components/Tickets/TicketPreview/components/Documents/Documents";
import { DxcToggleGroup } from "@dxc-technology/halstack-react";
import Notes from "components/Timeline/Notes/Notes";
import Timeline from "components/Timeline/Timeline";
import Upload from "components/Tickets/TicketPreview/components/Upload/Upload";
import WithScroll from "components/WithScroll/WithScroll";
import useDeskBaskets from "data/hooks/useDeskBaskets";
import useDeskTickets from "data/hooks/useDeskTickets";
import useDeskUsers from "data/hooks/useDeskUsers";

const MiddleBar = (props: any) => {
    const { ticket } = props;
    const { getOne } = useDeskTickets();
    const { getOne: getOneBasket } = useDeskBaskets();
    const { getAll: getAllUsers } = useDeskUsers();
    const ticketId = getOne(ticket.id);
    const basket = getOneBasket(ticket.basketId);
    const basketTitle = basket && basket.title;
    const users = getAllUsers("data");

    const [value, changeValue] = useState(1);
    const onChange = (newValue:any) => {
        changeValue(newValue);
    };

    const options = [
        {
            value: 1,
            label: "Notes",
        },
        {
            value: 2,
            label: "Documents",
        },
        {
            value: 3,
            label: "History",
        },
    ];

    return (
        <WithScroll visibleHeight="800">
            <div className = "MiddleBarHeader">
                <DxcToggleGroup
                    options={options}
                    onChange={onChange}
                    value={value}
                    margin="medium"
                ></DxcToggleGroup>

                {value && value === 1 && (
                    <Notes/>
                )}

                {value && value === 2 && (
                    <>
                        <Documents documents={ticket.documents} />
                        <Upload ticketId={ticket.id} />
                    </>
                )}

                {value && value === 3 && (
                    <Timeline ticket={ticketId} users={users} basketName={basketTitle} />
                )}
            
            </div>
        </WithScroll>
    )


}

export default MiddleBar;