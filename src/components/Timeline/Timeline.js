import React from 'react';
import Item from './components/Item';
import moment from 'moment';

import "./Timeline.scss";

const Timeline = ({ ticket, title, users }) => {

    const [sortTicket, setSortTicket] = React.useState();



    // Here we sort the ticket in DESC
    React.useEffect(() => {
        if(ticket){
            const history = {...ticket.history};
            let sortedArr = [];

            Object.keys(history).map((data) => {
                sortedArr = [...sortedArr, history[data]]
            });

            sortedArr.sort((a, b) => (b.metadata.timestamp) - (a.metadata.timestamp));

            let arrByDate = [];

            sortedArr.map((data) => {
                 const date = moment(new Date(data.metadata?.timestamp)).format("DD/MM/YYYY");

                //  console.log(date);
                if (!arrByDate[date]){
                    arrByDate = { ...arrByDate, [date]: [] };
                }
                 arrByDate[date] = [...arrByDate[date], data]
            });

            setSortTicket(arrByDate);
    }
    }, []);

    return (
        <div className="timeline-container">
            <h4 className="title-timeline">
                {title}
            </h4>
            <hr />
            {
                sortTicket ?
                    (
                        Object.keys(sortTicket).map((data, i) => (
                            <div className="timeline-item-container" key={i}>
                                <p className="title-date">{
                                    moment(sortTicket[data][0].metadata.timestamp).fromNow().includes("hours") ||
                                    moment(sortTicket[data][0].metadata.timestamp).fromNow().includes("minutes") ?
                                    "Today" : moment(sortTicket[data][0].metadata.timestamp).fromNow('d')}</p>
                                <div>
                                    {
                                        sortTicket[data].length > 1 ?
                                            (
                                                sortTicket[data].map((dataelement, i) => (
                                                    <Item key={i} ticket={dataelement} users={users}/>
                                                ))
                                            )
                                            :
                                            (
                                                <Item ticket={sortTicket[data][0][Object.keys(sortTicket[data][0])]} users={users} />
                                            )
                                    }
                                </div>
                            </div>
                        )
                        )
                    )
                    :
                    (
                        <p>It looks empty</p>
                    )
            }
        </div>
    )
};

export default Timeline;