import React from 'react';
import useDeskTickets from "../../../../../../../data/hooks/useDeskTickets";

const viewDocument = (e, url) => {
    e.preventDefault();
    window.open(url,'Data','height=600,width=600');
}

const Documents = ({ticketId}) =>  {
    const {getAllDocuments} = useDeskTickets()
    const documents = getAllDocuments(ticketId)
    return (
        <lu className="list-group">{documents && Object.values(documents).map(document =>
            <li className="list-group-item"><a href="" onClick={(e) => viewDocument(e, document.url)} >{document.name}</a></li>)}</lu>
    );
}

export default Documents;
