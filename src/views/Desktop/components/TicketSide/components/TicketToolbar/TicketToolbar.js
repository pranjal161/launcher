import React from 'react';

const goto = () => {
    //myRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
}

function TicketToolbar({state, dispatch}) {
    const {sections} = state
    return (
        <>
            <button onClick={goto}>Goto</button>
            <div>{sections}</div>
        </>
    );
}

export default TicketToolbar;
