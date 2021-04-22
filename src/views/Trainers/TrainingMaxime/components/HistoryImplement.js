import React from "react";
import Timeline from './../../../../components/Timeline/Timeline';

/*eslint-disable */

const HistoryImplement = ({ticket, users, basketName}) => {
    return (
        <div className="history-container-maxime" style={{width: "100%", height: 400}}>
            {
                ticket?.history && users &&
                    <Timeline title="Ticket history" ticket={ticket} users={users} basketName={basketName}/>
            }
            
        </div>
         
    )
};

export default HistoryImplement;