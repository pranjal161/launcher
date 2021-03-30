import {Card, CardContent} from "@material-ui/core";

import DataLine from "./components/DataLine/DataLine";
import Label from "./components/Label/Label";
import LinkedClient from "./components/LinkedClient/LinkedClient";
import LinkedContract from "./components/LinkedContract/LinkedContract";
import React from 'react';
import Section from "./components/Section/Section";
import Sections from "./components/Sections/Sections";
import Upload from "../Upload/Upload";
import {formatValue} from "../../../../../util/functions";
import {DxcChip, DxcBox} from '@dxc-technology/halstack-react';

import moment from "moment";
import useDeskTickets from "../../../../../data/hooks/useDeskTickets";
import useDeskUsers from "../../../../../data/hooks/useDeskUsers";

const Divider = () => <hr className="solid"/>

const TicketSummary = ({ticket}) => {
    const TitleValue = () => (<>{ticket.title}</>)
    const DateValue = ({date}) => (<>{formatValue(date, 'date')}</>)
    
    const PersonValue = ({personId}) => {
        const {getOne} = useDeskUsers()
        const person = getOne(personId)
        return (<>{person && person.displayName}</>)
    }
    
    const SuggestedActivity = ({activity}) => {
        const {executeActivity} = useDeskTickets()
        const handleClick = (e) => {
            e.preventDefault()
            executeActivity(ticket.id, activity)
        }
        
        return (
            <div onClick={handleClick}>
                <DxcChip
                    label={activity}
                    margin="xxxsmall"
                />
            </div>
        )
    }
    
    const SuggestedActivities = ({activities}) => (
        < > {activities && Object.keys(activities).map((activity, index) => (
            <SuggestedActivity key={index} activity={activity}/>))
        }</>
    )

    const Document = ({document}) => {
        const handleClick = (e) => {
            e.preventDefault()
            window.open(document.url)
        }
        
        return (
            <a href="" onClick={handleClick}
                className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="mx-auto text-info">
                    <small>{moment(document.receivedDate).fromNow()}</small>
                </div>
                <div>{document.name}</div>
            </a>
        )
    }
    
    const Documents = ({documents}) => (
        <lu className={"list-group"}>
            {documents && Object.values(documents).map((document, index) => (
                <Document key={index} document={document}/>))}
        </lu>
    )

    const Description = ({description}) => (<p>{description}</p>)

    return (
        <DxcBox>
                <Sections title={"Ticket detail"}>
                    <Section id="information" title="Information">
                        <DataLine label={<Label>Title</Label>}>
                            <TitleValue/>
                        </DataLine>
                        <DataLine label={<Label>Received on</Label>}>
                            <DateValue date={ticket.receivedDate}/>
                        </DataLine>
                        <DataLine label={<Label>Deadline</Label>}>
                            <DateValue date={ticket.deadlineDate}/>
                        </DataLine>
                        <DataLine label={<Label>Created by</Label>}>
                            <PersonValue personId={ticket.creatorId}/>
                        </DataLine>
                        <DataLine label={<Label>Person in charge</Label>}>
                            <PersonValue personId={ticket.assignedTo}/>
                        </DataLine>
                        <Divider/>
                    </Section>
                    <Section id="description" title="Description">
                        <Description description={ticket.description}/>
                    </Section>
                    <Divider/>
                    <Section id="relatedClients" title="Related Client">
                        <DataLine label={<Label>Client</Label>}>
                            <LinkedClient client={{displayName: "John Doe"}} urj={"jkjk"}/>
                        </DataLine>
                    </Section>
                    <Divider/>
                    <Section id="relatedContracts" title="Related Contracts">
                        <DataLine label={<Label>Contract</Label>}>
                            <LinkedContract client={{displayName: "UI01929821"}} urj={"jkjk"}/>
                        </DataLine>
                        <DataLine label={<Label>Contract</Label>}>
                            <LinkedContract client={{displayName: "UI07292093"}} urj={"jkjk"}/>
                        </DataLine>
                        <DataLine label={<Label>Contract</Label>}>
                            <LinkedContract client={{displayName: "MP27293032"}} urj={"jkjk"}/>
                        </DataLine>
                    </Section>
                    <Divider/>
                    <Section id="suggestedActivities" title="Suggested activities">
                        <SuggestedActivities activities={ticket.suggestedActivities}/>
                    </Section>
                    <Divider/>
                    <Section id="notes" title="Notes">
                        <lu className={"list-group"}>
                            <li className="list-group-item">Note 1</li>
                            <li className="list-group-item">Note 2</li>
                        </lu>
                    </Section>
                    <Divider/>
                    <Section id="documents" title="Documents">
                        <Documents documents={ticket.documents}/>
                        <Upload ticketId={ticket.id}/>
                    </Section>
                </Sections>
        </DxcBox>
    )
}

TicketSummary.propTypes = {
    ticket: PropTypes.string,
    personId: PropTypes.string,
    date: PropTypes.date,
    activity: PropTypes.string,
    activities: PropTypes.array,
    document: PropTypes.string,
    documents: PropTypes.array,
    description: PropTypes.string,
    receivedDate: PropTypes.date
}

export default TicketSummary;
