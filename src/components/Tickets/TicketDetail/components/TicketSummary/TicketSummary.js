import {CloseIcon, NewWindowIcon, AddIcon} from "../../../../../assets/svg";
import {
    DxcBox,
    DxcChip,
    DxcInput,
    DxcTextarea,
} from "@dxc-technology/halstack-react";
import DataLine from "./components/DataLine/DataLine";
import EditableField from "../../../../EditableField/EditableField";
import {formatValue} from "util/functions";
import Label from "./components/Label/Label";
import LinkedContract from "./components/LinkedContract/LinkedContract";
import moment from "moment";
import PropTypes from "prop-types";
import React, {useCallback} from "react";
import RelatedClient from './components/RelatedClient/RelatedClient';
import Section from "./components/Section/Section";
import Sections from "./components/Sections/Sections";
import { StyledButton } from '../../../../../../src/styles/global-style';
import {TextField} from "@material-ui/core";
import Upload from "../Upload/Upload";
import useDeskTickets from "data/hooks/useDeskTickets";
import useDeskUsers from "data/hooks/useDeskUsers";
import UserSelection from "./components/UserSelection/UserSelection";

const Divider = () => <hr className="solid"/>;

const TicketSummary = ({ticket, onClose, onPopupWindow, showPopupIcon = false, actions}) => {
    const {update, assignTo, createdBy} = useDeskTickets()
    const TitleValue = () => (<>{ticket.title}</>)
    const DateValue = ({date}) => (<>{formatValue(date, 'date')}</>)
    const PersonValue = ({personId}) => {
        const {getOne} = useDeskUsers()
        const person = useCallback(getOne(personId), [personId])
        return (<> {person && person.displayName}  </>)
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
                    margin="xxsmall"
                />
            </div>
        )
    }

    const SuggestedActivities = ({activities}) => (
        < > {activities && Object.keys(activities).map((activity, index) => (
            <SuggestedActivity key={index} activity={activity} />))
        }</>
    )

    const { addRelatedClients } = useDeskTickets();
    const handleAddRelatedClient = () => {
        addRelatedClients('OqMyhl637zmSrJPPCjQz', 'Pet')
    }


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
                <Document key={index} document={document} />))}
        </lu>
    )


    const Description = ({description}) => (<p style={{maxHeight:'200px'}}>{description}</p>)
    const DxcDate2 = ({date, id, ...rest}) => (<TextField
        id={id}
        type="date"
        defaultValue={moment(date).format("YYYY-MM-D")}
        InputLabelProps={{
            shrink: true,
        }}
        {...rest}
    />)

    DxcDate2.propTypes = {
        date: PropTypes.string,
        id: PropTypes.string,
        rest:PropTypes.any
    }


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
    const handleEditChange = useCallback((field, newValue) => {
        //console.log('handleEditChange',field, newValue)
        update({...ticket, [field]: newValue})
    }, [ticket])

    const handleAssignTo = useCallback((field, newValue) => {
        assignTo(ticket.id, newValue)
    }, [ticket])

    const handleCreatedBy = useCallback((field, newValue) => {
        createdBy(ticket.id, newValue)
    }, [ticket])

    return (
        <DxcBox size="large" padding={"xxsmall"} shadowDepth={2}>
            <Sections title={"Ticket detail"} actions={closePopupAction}>
                <Section id="actions" title="Actions">
                    {actions}
                </Section>
                <Divider/>
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
                        <EditableField
                            field="receivedDate"
                            type="date"
                            value={ticket.receivedDate}
                            displayValue={<DateValue date={ticket.receivedDate}/>}
                            onChange={handleEditChange}>
                            <DxcDate2 date={ticket.receivedDate} id="receivedDate"/>
                        </EditableField>
                    </DataLine>
                    <DataLine label={<Label>Deadline</Label>}>
                        <EditableField
                            field="deadlineDate"
                            type="date"
                            value={ticket.deadlineDate}
                            displayValue={<DateValue date={ticket.deadlineDate}/>}
                            onChange={handleEditChange}>
                            <DxcDate2 date={ticket.deadlineDate} id="deadlineDate"/>
                        </EditableField>
                    </DataLine>
                    <DataLine label={<Label>Created by</Label>}>
                        <EditableField
                            field="createdBy"
                            type="select"
                            value={ticket.createdBy}
                            displayValue={<PersonValue personId={ticket.createdBy}/>}
                            onChange={handleCreatedBy}>
                            <UserSelection/>
                        </EditableField>
                    </DataLine>
                    <DataLine label={<Label>Person in charge</Label>}>
                        <EditableField
                            field="assignedTo"
                            type="select"
                            value={ticket.assignedTo}
                            displayValue={<PersonValue personId={ticket.assignedTo}/>}
                            onChange={handleAssignTo}>
                            <UserSelection/>
                        </EditableField>
                    </DataLine>
                    <Divider/>
                </Section>
                <Section id="description" title="Description">
                    <EditableField
                        field="description"
                        type="textarea"
                        value={ticket.description}
                        displayValue={<Description description={ticket.description}/>}
                        onChange={handleEditChange}>
                        <DxcTextarea/>
                    </EditableField>
                </Section>
                <Divider/>
                <Section id="relatedClients" title="Related Client" actions={<StyledButton onClick={handleAddRelatedClient}><AddIcon /></StyledButton>}>
                        <DataLine label={<Label>Client</Label>}>
                        {/* <LinkedClient client={{displayName: ticket.relatedClients}} urj={"jkjk"} /> */}
                            <RelatedClient relatedClient={ticket.relatedClients} onClick={onclick} />
                        </DataLine>
                 </Section>

                <Divider/>
                <Section id="relatedContracts" title="Related Contracts">
                    <DataLine label={<Label> Contract </Label>}>
                        <LinkedContract
                            client={{
                                displayName: "UI01929821",
                            }}
                            urj={"jkjk"}
                        />
                    </DataLine>
                    <DataLine label={<Label> Contract </Label>}>
                        <LinkedContract
                            client={{
                                displayName: "UI07292093",
                            }}
                            urj={"jkjk"}
                        />
                    </DataLine>
                    <DataLine label={<Label> Contract </Label>}>
                        <LinkedContract
                            client={{
                                displayName: "MP27293032",
                            }}
                            urj={"jkjk"}
                        />
                    </DataLine>
                </Section>
                <Divider/>
                <Section id="suggestedActivities" title="Suggested activities">
                    <SuggestedActivities activities={ticket.suggestedActivities}/>
                </Section>
                <Divider/>
                <Section id="notes" title="Notes">
                    <lu className={"list-group"}>
                        <li className="list-group-item"> Note 1</li>
                        <li className="list-group-item"> Note 2</li>
                    </lu>
                </Section>
                <Divider/>
                <Section id="documents" title="Documents">
                    <Documents documents={ticket.documents}/>
                    <Upload ticketId={ticket.id}/>
                </Section>
            </Sections>
        </DxcBox>
    );
};

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
    receivedDate: PropTypes.instanceOf(Date),
};

export default TicketSummary;
