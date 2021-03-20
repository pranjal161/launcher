import React from 'react';

import TicketSide from "./components/TicketSide/TicketSide";

function TrainingNorbert(props) {
    const side = (<div>side</div>)
    const content = (<div>Content</div>)
    return (
        <div>
            <div style={{width: '200px'}}>
                <TicketSide/>
            </div>
        </div>
    );
}

export default TrainingNorbert;
