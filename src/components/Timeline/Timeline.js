import React from 'react';
import Item from './components/Item';

import moment from 'moment';


import "./Timeline.scss";

const Timeline = ({ticket, title}) => {

    const [sortTicket, setSortedTicket] = React.useState();
    
    React.useEffect(() => {
        const newArr = ticket.history.sort((a, b) => {
            return (b[Object.keys(b)[0]].metadata.timestamp)-(a[Object.keys(a)[0]].metadata.timestamp);
          });

          setSortedTicket(newArr);
    }, []);

    React.useEffect(() => {
        console.log({sortTicket})
    }, [sortTicket])

    return(
        <div className="timeline-container">
            <h4>
                {title}
            </h4>
            {
                ticket.history.map((date, i) => (
                    <>
                         <p key={i}>{moment(date[Object.keys(date)[0]].metadata.timestamp).fromNow()}</p>
                    </>
                ))
            }
            <Item ticket={ticket}/>
        </div>
    )
};

export default Timeline;