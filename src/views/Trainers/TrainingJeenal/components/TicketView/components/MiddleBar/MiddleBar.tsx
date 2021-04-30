import React from 'react';
import Timeline from "components/Timeline/Timeline";
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
    const users = getAllUsers('data');
    return (
        <WithScroll visibleHeight="800">
            <Timeline ticket={ticketId} users={users} basketName={basketTitle} />
        </WithScroll>
    )


}

export default MiddleBar;