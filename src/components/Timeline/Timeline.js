import React from 'react';
import Item from './components/Item';
import moment from 'moment';

import "./Timeline.scss";

const Timeline = ({ticket, title}) => {

    const [sortTicket, setSortTicket] = React.useState();

    // Here we sort the ticket in DESC
    React.useEffect(() => {
        const sortedArr = [...ticket.history];
        sortedArr.sort((a, b) => (b[Object.keys(b)[0]].metadata.timestamp)-(a[Object.keys(a)[0]].metadata.timestamp));

        let finalArr = [];
        let currentElement;

        sortedArr.forEach(element => {
            currentElement = element[Object.keys(element)[0]];
            currentElement.metadata["momentDate"] = moment(new Date(currentElement.metadata.timestamp)).format("DD/MM/YYYY");

            finalArr = {...finalArr, [currentElement.metadata.momentDate]: []};
        });
        
        sortedArr.map((data) => {
            currentElement = data[Object.keys(data)[0]];

            finalArr[currentElement.metadata.momentDate].push(data);
        });

        Object.keys(finalArr).map((data) => {
            console.log(finalArr[data]);
        });

        setSortTicket(finalArr);
    }, []);

    return(
        <div className="timeline-container">
            <h4>
                {title}
            </h4>
            {
                sortTicket && Object.keys(sortTicket).length > 1 ? 
                    (
                        Object.keys(sortTicket).map((data, i) => (
                            <div className="timeline-item-container" key={i}>
                                <p className="title-date">{
                                    moment(sortTicket[data][0][Object.keys(sortTicket[data][0])].metadata.timestamp).fromNow().includes("hours") ||
                                    moment(sortTicket[data][0][Object.keys(sortTicket[data][0])].metadata.timestamp).fromNow().includes("minutes") ?
                                        "Today" : moment(sortTicket[data][0][Object.keys(sortTicket[data][0])].metadata.timestamp).fromNow('d')}</p>
                                <div>
                                    {
                                        sortTicket[data].length > 1 ? 
                                        (
                                            sortTicket[data].map((dataelement) => (
                                                <Item ticket = {dataelement[Object.keys(dataelement)[0]]} />
                                            ))
                                        ) 
                                        : 
                                        (
                                            <Item ticket={sortTicket[data][0][Object.keys(sortTicket[data][0])]} />
                                        )  
                                    }
                                    
                                </div>
                                <hr/>
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