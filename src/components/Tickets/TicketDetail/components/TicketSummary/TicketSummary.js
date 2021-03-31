import {CloseIcon, NewWindowIcon} from "../../../../../assets/svg";
import {DxcBox, DxcChip, DxcInput} from '@dxc-technology/halstack-react';

import DataLine from "./components/DataLine/DataLine";
import Documents from './components/documents/documents';
import EditableField from "../../../../EditableField/EditableField";
import Label from "./components/Label/Label";
import LinkedClient from "./components/LinkedClient/LinkedClient";
import LinkedContract from "./components/LinkedContract/LinkedContract";
import PropTypes from 'prop-types'
import React, {useCallback, useMemo} from 'react';
import Section from "./components/Section/Section";
import Sections from "./components/Sections/Sections";
import Upload from "../Upload/Upload";
import {formatValue} from "util/functions";
import useDeskTickets from "data/hooks/useDeskTickets";
import useDeskUsers from "data/hooks/useDeskUsers";
import UserSelection from "./components/UserSelection/UserSelection";


const Divider = () => <hr className="solid"/>

const TicketSummary = ({ticket, onClose, onPopupWindow, showPopupIcon = false, actions}) => {
    const {update} = useDeskTickets()
    const TitleValue = () => (<>{ticket.title}</>)
    const DateValue = ({date}) => (<>{formatValue(date, 'date')}</>)
    const PersonValue = ({personId}) => {
        const {getOne} = useDeskUsers()
        const person = useCallback( getOne(personId),[personId])
        return (<>{person && person.displayName} </>)
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


    const Description = ({description}) => (<p>{description}</p>)

    const closePopupAction = (
        <div style={{display: 'flex'}}>
            {showPopupIcon &&
            <div onClick={onPopupWindow}>
                <NewWindowIcon/>
            </div>
            }
            <div onClick={onClose}>
                <CloseIcon/>
            </div>
        </div>
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleEditChange = useCallback( (field, newValue) => {
        console.log('Update',field, newValue)
        update({...ticket, [field]:newValue})
    },[ticket])
    return (
        <DxcBox>
            <Sections title={"Ticket detail"} actions={closePopupAction}>
                <Section id="actions" title="Actions">
                    {actions}
                </Section>
                <Section id="information" title="Information">
                    <DataLine label={<Label>Title</Label>}>
                        <EditableField
                            field="title"
                            type="input"
                            displayValue={<TitleValue/>}
                            value={ticket.title}
                            onChange={handleEditChange}>
                            <DxcInput
                                placeholder={ticket.title}
                                margin="xsmall"
                                size="fillParent"/>
                        </EditableField>
                    </DataLine>
                    <DataLine label={<Label>Received on</Label>}>
                        <DateValue date={ticket.receivedDate}/>
                    </DataLine>
                    <DataLine label={<Label>Deadline</Label>}>
                        <DateValue date={ticket.deadlineDate}/>
                    </DataLine>
                    <DataLine label={<Label>Created by</Label>}>
                        <EditableField
                            field="creatorId"
                            type="select"
                            value={ticket.creatorId}
                            displayValue={<PersonValue personId={ticket.creatorId}/>}
                            onChange={handleEditChange}>
                            <UserSelection />
                        </EditableField>
                    </DataLine>
                    <DataLine label={<Label>Person in charge</Label>}>
                        <EditableField
                            field="assignedTo"
                            type="select"
                            value={ticket.assignedTo}
                            displayValue={<PersonValue personId={ticket.assignedTo}/>}
                            onChange={handleEditChange}>
                            <UserSelection/>
                        </EditableField>
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
    showPopupIcon: PropTypes.bool,
    onPopupWindow: PropTypes.func,
    onClose: PropTypes.func,
    actions: PropTypes.any,
    date: PropTypes.instanceOf(Date),
    activity: PropTypes.string,
    activities: PropTypes.array,
    document: PropTypes.string,
    documents: PropTypes.array,
    description: PropTypes.string,
    receivedDate: PropTypes.instanceOf(Date)
}

export default TicketSummary;
