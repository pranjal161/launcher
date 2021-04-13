import React from 'react';
import Item from './components/Item';

import moment from 'moment';


import "./Timeline.scss";

const Timeline = ({ticket, title}) => {

    const [sortTicket, setSortedTicket] = React.useState();

    // Here we sort the ticket in DESC
    React.useEffect(() => {
        const newArr = [...ticket.history];

        newArr.sort((a, b) => (b[Object.keys(b)[0]].metadata.timestamp)-(a[Object.keys(a)[0]].metadata.timestamp));

        setSortedTicket(newArr);

        let finalArr = [];

        newArr.forEach(element => {
            element[Object.keys(element)[0]].metadata.updatedISODate = element[Object.keys(element)[0]].metadata.updatedISODate.slice(0, 10);
            // finalArr = {...finalArr, [element[Object.keys(element)[0]].metadata.updatedISODate]: {...finalArr[element[Object.keys(element)[0]].metadata.updatedISODate], element}} 

            finalArr = {...finalArr, [element[Object.keys(element)[0]].metadata.updatedISODate]: []}
        }); 

        console.log(newArr);
        console.log(finalArr)

    }, []);




    return(
        <div className="timeline-container">
            <h4>
                {title}
            </h4>
            {
                sortTicket && sortTicket.length >= 1 ? 
                (
                    sortTicket.map((date, i) => (
                        <>
                            <p key={i}>{moment(date[Object.keys(date)[0]].metadata.timestamp).fromNow()}</p>
                        </>
                    ))
                ) :
                (           
                    <p>It looks empty</p>
                )
            }
            <Item ticket={ticket}/>
        </div>
    )
};

export default Timeline;